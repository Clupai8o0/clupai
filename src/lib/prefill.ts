// What a lead already told us, carried to the booking form for this browser tab.
// Same format as the #p= link built by src/lib/booking-link.ts: base64url JSON, UTF-8.

export const PREFILL_KEY = "clupai-prefill";

export type Prefill = {
  name?: string;
  email?: string;
  phone?: string;
  /** The results email didn't go out, so the page tells them to keep the link. */
  notSent?: boolean;
};

function encode(value: Prefill): string
{
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodePrefill(raw: string | null | undefined): Prefill
{
  if (!raw) {
    return {};
  }
  try {
    const padded = raw.replace(/-/g, "+").replace(/_/g, "/");
    const binary = window.atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (typeof parsed !== "object" || parsed === null) {
      return {};
    }
    const p = parsed as Record<string, unknown>;
    return {
      name: typeof p.name === "string" ? p.name : undefined,
      email: typeof p.email === "string" ? p.email : undefined,
      phone: typeof p.phone === "string" ? p.phone : undefined,
      notSent: p.notSent === true,
    };
  } catch {
    return {};
  }
}

export function writePrefill(value: Prefill): void
{
  try {
    window.sessionStorage.setItem(PREFILL_KEY, encode(value));
  } catch {
    // Private mode can refuse storage. The form just arrives empty.
  }
}
