# clupai SMS opener scheduler

A tiny always-on FastAPI service that triggers the quiet-hours opener flush in the
main Next.js app on a timer. It exists only because Vercel's **Hobby** plan caps
cron jobs at once-per-day, and we want to flush openers that were queued overnight
more frequently than that.

It holds **no SMS logic**. Every `FLUSH_INTERVAL_MIN` it sends:

```
GET <FLUSH_TARGET_URL>            # e.g. https://clupai.com/api/sms/flush-openers
Authorization: Bearer <CRON_SECRET>
```

That Next route owns the Redis scan, the 9am-8pm Melbourne business-hours gate, and
the Twilio send. So firing every 30 min is safe: outside business hours it simply
returns `{ "sent": 0 }`.

## ⚠️ Must be hosted always-on

The schedule runs **in-process** (APScheduler). If the host **sleeps on idle**, the
timer stops. So a free tier that pauses inactive services (e.g. Render free web
services) will silently stop flushing. Pick a host that stays running:

| Host | Notes |
|------|-------|
| **Fly.io** (recommended) | `fly.toml` here pins `min_machines_running = 1`, region `syd`. ~free-to-a-few-dollars for one 256MB machine. |
| **Railway** | Easiest: deploys from the repo (Nixpacks, no Docker needed). ~$5/mo. Set the root directory to `sms-scheduler`. |
| **Koyeb** | Has a free instance that stays on. Point it at this folder's Dockerfile. |
| **Any VPS** (Hetzner / DigitalOcean ~$5/mo) | Run the Docker image, or `uvicorn` under systemd. Most control. |

## Env vars

Copy `.env.example` → set in your host's dashboard:

- `FLUSH_TARGET_URL` — `https://clupai.com/api/sms/flush-openers`
- `CRON_SECRET` — **must equal** `CRON_SECRET` in the Next app (`.env.local` / Vercel).
- `FLUSH_INTERVAL_MIN` — default `30`.

## Run locally

```bash
cd sms-scheduler
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export FLUSH_TARGET_URL=http://localhost:3000/api/sms/flush-openers
export CRON_SECRET=dev-secret          # match the Next app
uvicorn main:app --reload --port 8080
```

- `GET http://localhost:8080/` → health + config check.
- `POST http://localhost:8080/flush` (with `Authorization: Bearer <CRON_SECRET>`) → trigger a flush immediately for testing.

## Deploy to Fly.io

```bash
# one-time: install flyctl, then from the sms-scheduler/ folder
fly launch --no-deploy            # accept/adjust the app name; keep this fly.toml
fly secrets set \
  FLUSH_TARGET_URL=https://clupai.com/api/sms/flush-openers \
  CRON_SECRET=<same-as-next-app> \
  FLUSH_INTERVAL_MIN=30
fly deploy
```

Then confirm: `fly logs` should show `scheduler started: every 30 min -> ...` and a
`flush ok:` line every 30 minutes.

## How it connects to the site

1. The Next app queues an opener (`pendingOpener` on the conversation record) when a
   lead opts in **outside** 9am-8pm Melbourne.
2. This service pings `/api/sms/flush-openers`, which sends any queued openers that
   are now inside business hours and clears them.
3. Submissions **during** business hours don't touch this service at all — their
   opener sends immediately from the form route.
