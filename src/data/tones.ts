// The colour chapter for each case. Classes are in src/app/inner.css.
const CASE_TONES: Record<string, string> = {
  "hoddle-melbourne": "tone-navy",
  "king-double-glazing": "tone-yellow",
  "krishnaveni-school": "tone-red",
  tempo: "tone-blue",
  flowerpress: "tone-red",
  govchat: "tone-paper",
  "acknowledgement-force": "tone-red",
  cstack: "tone-ink",
  kairos: "tone-navy",
  tapcraft: "tone-yellow",
  nmmun: "tone-blue",
  nomnom: "tone-blue",
  "glow-up": "tone-yellow",
  morgue: "tone-ink",
  visatrack: "tone-red",
};

export function caseTone(slug: string): string
{
  return CASE_TONES[slug] ?? "tone-ink";
}
