// Builds the link a lead uses to reach the booking form with what we already know
// filled in, so they never re-type it.
//
// Name and email go in the URL fragment, encoded, because a fragment never reaches a
// server. The inline script in src/app/layout.tsx moves it to sessionStorage and clears
// it from the address bar before analytics load, so it's never sent to GA or the pixel.

const BASE = "https://clupai.com/start";

export type BookingPrefill = {
  /** Answer code from the Build Risk Check. Without one, the link goes to the check. */
  code?: string;
  name?: string;
  email?: string;
};

export function bookingUrl(p: BookingPrefill): string {
  if (!p.code) {
    return BASE;
  }
  const url = `${BASE}/result?r=${encodeURIComponent(p.code)}`;
  const name = p.name?.trim();
  const email = p.email?.trim();
  if (!name && !email) {
    return url;
  }
  const prefill = Buffer.from(JSON.stringify({ name, email }), "utf8").toString("base64url");
  return `${url}#p=${prefill}`;
}
