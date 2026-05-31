// Best-effort Telegram push so form submissions ping a phone instantly,
// alongside the Resend email. This never throws and never blocks for long —
// a failed or slow notification must not break the form response.
//
// We use node:https with `family: 4` rather than global fetch on purpose:
// some networks (and the dev machine here) have no IPv6 route to Telegram, and
// Node's fetch/undici races IPv6 first and fails with ETIMEDOUT instead of
// falling back. Forcing IPv4 for this one call is safe everywhere Telegram is
// reachable (including Vercel), without touching any other outbound request.

import { request as httpsRequest } from "node:https";

const TIMEOUT_MS = 6000;

/** Escape dynamic text for Telegram's HTML parse mode. */
export function tgEsc(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Send an HTML-formatted message to the configured Telegram chat.
 * No-op when env vars are missing. Resolves to `false` on any failure
 * (it logs a warning but does not throw).
 */
export function notifyTelegram(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return Promise.resolve(false);

  const payload = JSON.stringify({
    chat_id: chatId,
    text: html,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  return new Promise<boolean>((resolve) => {
    const req = httpsRequest(
      {
        host: "api.telegram.org",
        path: `/bot${token}/sendMessage`,
        method: "POST",
        family: 4, // force IPv4 — see file header
        timeout: TIMEOUT_MS,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          const status = res.statusCode ?? 0;
          if (status >= 200 && status < 300) {
            resolve(true);
          } else {
            console.warn("Telegram notify failed:", status, body.slice(0, 300));
            resolve(false);
          }
        });
      }
    );

    req.on("timeout", () => {
      console.warn("Telegram notify timed out");
      req.destroy();
      resolve(false);
    });
    req.on("error", (err) => {
      console.warn("Telegram notify error:", err.message);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}
