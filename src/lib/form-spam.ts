/**
 * Contact / lead form spam checks. Run before Resend or Telegram.
 * Blocked submissions return success to the client (no signal to bots).
 */

export type ContactSpamPayload = {
  name: string;
  company?: string;
  email: string;
  message: string;
  /** Honeypot — must stay empty */
  website?: string;
  /** ms since form mounted (client clock) */
  formLoadedAt?: number;
  /** Cloudflare Turnstile token when configured */
  turnstileToken?: string;
};

export type SpamVerdict = { spam: true; reason: string } | { spam: false };

const MIN_SUBMIT_MS = 4000;

/** Long random tokens like fSIHDZAsRPpKHAoRYjQqVvH */
export function looksLikeGibberish(text: string): boolean {
  const s = text.trim();
  if (s.length < 10) return false;

  if (/\s/.test(s)) {
    const words = s.split(/\s+/).filter(Boolean);
    if (words.length === 0) return false;
    const randomWords = words.filter((w) => isRandomToken(w));
    return randomWords.length >= 2 || (words.length === 1 && isRandomToken(words[0]!));
  }

  return isRandomToken(s);
}

function isRandomToken(s: string): boolean {
  if (s.length < 10) return false;
  if (!/^[A-Za-z0-9][A-Za-z0-9._'-]*$/.test(s)) return false;

  const len = s.length;
  const vowels = (s.match(/[aeiouAEIOU]/g) || []).length;
  const vowelRatio = vowels / len;

  let caseChanges = 0;
  for (let i = 1; i < len; i++) {
    const a = s[i - 1]!;
    const b = s[i]!;
    if (/[a-z]/.test(a) && /[A-Z]/.test(b)) caseChanges++;
    if (/[A-Z]/.test(a) && /[a-z]/.test(b)) caseChanges++;
  }

  const uniqueRatio = new Set(s.toLowerCase()).size / len;

  if (len >= 12 && vowelRatio < 0.2 && caseChanges >= 3) return true;
  if (len >= 18 && vowelRatio < 0.28 && uniqueRatio > 0.5) return true;
  if (len >= 15 && vowels === 0) return true;
  if (len >= 14 && caseChanges >= Math.max(4, Math.floor(len / 5))) return true;

  return false;
}

function isTooFast(formLoadedAt?: number): boolean {
  if (formLoadedAt == null || !Number.isFinite(formLoadedAt)) return false;
  const elapsed = Date.now() - formLoadedAt;
  return elapsed >= 0 && elapsed < MIN_SUBMIT_MS;
}

export function assessContactSpam(payload: ContactSpamPayload): SpamVerdict {
  const name = payload.name.trim();
  const company = payload.company?.trim() ?? "";
  const message = payload.message.trim();

  if (payload.website?.trim()) {
    return { spam: true, reason: "honeypot" };
  }

  if (isTooFast(payload.formLoadedAt)) {
    return { spam: true, reason: "too_fast" };
  }

  const gibberishFields: string[] = [];
  if (looksLikeGibberish(name)) gibberishFields.push("name");
  if (company && looksLikeGibberish(company)) gibberishFields.push("company");
  if (looksLikeGibberish(message)) gibberishFields.push("message");

  if (gibberishFields.includes("name") && gibberishFields.includes("message")) {
    return { spam: true, reason: "gibberish_name_message" };
  }

  if (gibberishFields.length >= 2) {
    return { spam: true, reason: `gibberish_${gibberishFields.join("_")}` };
  }

  return { spam: false };
}

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | undefined
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token?.trim()) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function assessContactSpamWithCaptcha(
  payload: ContactSpamPayload,
  remoteIp: string | undefined
): Promise<SpamVerdict> {
  const base = assessContactSpam(payload);
  if (base.spam) return base;

  if (!process.env.TURNSTILE_SECRET_KEY) return { spam: false };

  const ok = await verifyTurnstile(payload.turnstileToken, remoteIp);
  if (!ok) return { spam: true, reason: "turnstile_failed" };

  return { spam: false };
}
