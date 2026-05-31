// Builds a /contact link that pre-fills the booking form via query params, so a
// lead clicking "Book a call" from an email never re-types what we already know.
// The param keys here must match what src/app/contact/page.tsx reads back.

const BASE = "https://clupai.com/contact";

export type BookingPrefill = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  currentSite?: string;
};

export function bookingUrl(p: BookingPrefill): string {
  const params: Record<string, string | undefined> = {
    name: p.name,
    email: p.email,
    type: p.projectType,
    budget: p.budget,
    timeline: p.timeline,
    site: p.currentSite,
  };
  const qs = Object.entries(params)
    .filter(([, v]) => v && v.trim() && v.trim() !== "—")
    .map(([k, v]) => `${k}=${encodeURIComponent(v!.trim())}`)
    .join("&");
  return qs ? `${BASE}?${qs}` : BASE;
}
