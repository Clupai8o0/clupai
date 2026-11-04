import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_KEYS = 5000;

export function clientIp(request: NextRequest): string | undefined
{
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    undefined
  );
}

// Called at module scope, so a malformed UPSTASH_REDIS_REST_URL would throw on import and take
// every request down with it. A failure here means "no shared rate limiting".
function sharedLimiter(prefix: string, perHour: number): Ratelimit | null
{
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  try {
    return new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(perHour, "1 h"),
      prefix,
    });
  } catch (err) {
    console.warn("Rate limiter could not be initialised, continuing without it:", err);
    return null;
  }
}

/**
 * Returns a check that answers true once an IP passes `perHour` requests. Uses Upstash when it can.
 * The in-memory fallback is per instance, so it blunts a single-IP flood without being airtight.
 */
export function hourlyLimiter(prefix: string, perHour: number): (ip: string) => Promise<boolean>
{
  const shared = sharedLimiter(prefix, perHour);
  const hits = new Map<string, number[]>();

  function limitedInMemory(key: string): boolean
  {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

    if (recent.length >= perHour) {
      hits.set(key, recent);
      return true;
    }

    recent.push(now);
    hits.set(key, recent);

    if (hits.size > MAX_KEYS) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= WINDOW_MS)) {
          hits.delete(k);
        }
        if (hits.size <= MAX_KEYS) {
          break;
        }
      }
      if (hits.size > MAX_KEYS) {
        hits.delete(hits.keys().next().value as string);
      }
    }

    return false;
  }

  return async (ip) => {
    if (shared) {
      try {
        const { success, reason } = await shared.limit(ip);
        // When Redis is slow the library answers success with reason "timeout". That isn't a real pass.
        if (reason !== "timeout") {
          return !success;
        }
      } catch (err) {
        console.warn("Rate limiter unavailable, using the in-memory one:", err);
      }
    }
    return limitedInMemory(ip);
  };
}
