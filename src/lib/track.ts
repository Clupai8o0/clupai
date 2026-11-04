// Conversion events for the Meta pixel and GA. Both are optional and fail quietly when
// the scripts are blocked or switched off. Never pass personal details here.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_NAMES = { Lead: "generate_lead", Schedule: "schedule_call" } as const;

export function track(event: keyof typeof GA_NAMES): void
{
  window.fbq?.("track", event);
  window.gtag?.("event", GA_NAMES[event]);
}
