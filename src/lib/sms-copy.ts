// Client-safe SMS copy. Kept free of any server-only imports (no node:crypto)
// so form components can import the consent wording without pulling server code
// into the browser bundle. sms.ts re-exports this for server use.

/**
 * The exact consent text shown next to the opt-in checkbox on every form, and
 * stored verbatim in the durable consent record for the Spam Act audit trail.
 * One source of truth so UI and record never drift.
 */
export const SMS_CONSENT_WORDING =
  "I agree clupai can text me, including via an automated assistant, about my enquiry. Reply STOP anytime to opt out.";
