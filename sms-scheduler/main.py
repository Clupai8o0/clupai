"""clupai SMS opener scheduler.

A tiny always-on FastAPI service whose only job is to trigger the Next.js
quiet-hours flush on a timer. Vercel's Hobby plan caps cron jobs at once-per-day,
so this service provides the sub-daily schedule instead.

It does NOT contain any SMS logic. It calls GET <FLUSH_TARGET_URL> (the Next route
/api/sms/flush-openers) with a shared bearer secret; that route owns the Redis
scan, the business-hours gate, and the Twilio send. One source of truth.

Env:
  FLUSH_TARGET_URL   e.g. https://clupai.com/api/sms/flush-openers   (required)
  CRON_SECRET        shared secret; sent as `Authorization: Bearer <secret>`
  FLUSH_INTERVAL_MIN how often to fire, in minutes (default 30)
"""

import logging
import os
from contextlib import asynccontextmanager

import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI, Header, HTTPException

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("sms-scheduler")

TARGET_URL = os.environ.get("FLUSH_TARGET_URL", "").strip()
CRON_SECRET = os.environ.get("CRON_SECRET", "").strip()
INTERVAL_MIN = max(1, int(os.environ.get("FLUSH_INTERVAL_MIN", "30")))


async def flush_once() -> dict:
    """Call the Next.js flush endpoint once. Never raises into the scheduler."""
    if not TARGET_URL:
        log.error("FLUSH_TARGET_URL is not set; skipping flush")
        return {"ok": False, "error": "FLUSH_TARGET_URL not set"}

    headers = {"Authorization": f"Bearer {CRON_SECRET}"} if CRON_SECRET else {}
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            res = await client.get(TARGET_URL, headers=headers)
            res.raise_for_status()
            data = res.json()
            log.info("flush ok: %s", data)
            return {"ok": True, "result": data}
    except Exception as err:  # noqa: BLE001 - log and keep the scheduler alive
        log.warning("flush failed: %s", err)
        return {"ok": False, "error": str(err)}


@asynccontextmanager
async def lifespan(_app: FastAPI):
    scheduler = AsyncIOScheduler()
    if TARGET_URL:
        scheduler.add_job(
            flush_once,
            "interval",
            minutes=INTERVAL_MIN,
            id="flush-openers",
            max_instances=1,
            coalesce=True,
        )
        scheduler.start()
        log.info("scheduler started: every %s min -> %s", INTERVAL_MIN, TARGET_URL)
    else:
        log.error("FLUSH_TARGET_URL not set; scheduler idle (set it and redeploy)")
    try:
        yield
    finally:
        if scheduler.running:
            scheduler.shutdown()


app = FastAPI(title="clupai SMS opener scheduler", lifespan=lifespan)


@app.get("/")
async def health():
    return {
        "ok": True,
        "service": "clupai-sms-scheduler",
        "interval_min": INTERVAL_MIN,
        "target_configured": bool(TARGET_URL),
    }


@app.post("/flush")
async def manual_flush(authorization: str | None = Header(default=None)):
    """Manual trigger for testing. Protected by CRON_SECRET when one is set."""
    if CRON_SECRET and authorization != f"Bearer {CRON_SECRET}":
        raise HTTPException(status_code=401, detail="unauthorized")
    return await flush_once()
