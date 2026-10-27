# Illustrations

The site's art is one series, "Melbourne after dark". It shows the client's world. Real screenshots are the proof of our work.

## Rules

| Rule | Why |
|---|---|
| Art never stands in for proof | Results and product shots are real screenshots in `public/work/` |
| Alt text starts with "Illustration:" | Screen-reader users know it is art, not a photo of a real place or client |
| No text, logos, UI, outlines or dividers in the art | Keeps the series consistent and follows the no-dividers rule |
| Palette is near-black, one blue light (`#4da3ff`), off-white | Same tokens as the site |

## Where each image is used

| File (`public/illustrations/`) | Used on |
|---|---|
| `industries/*.webp` | `/industries/*`, through `SceneBand` |
| `services/{web,seo,automation}.webp` | Home services cards, `/services/[slug]` |
| `services/*-melbourne.webp` | `/services/*/melbourne` |
| `suburbs/*.webp` | `/melbourne/[suburb]` |
| `work/*.webp` | The brief section of each `/work/[slug]` (the `art` field in `src/data/cases.ts`) |
| `studio.webp` | Home studio section |

## Make or replace one

1. Edit or add the job in `scripts/illustrations/jobs.json` (`id`, `scene`, optional `aspect`).
2. `python3 scripts/illustrations/gen.py scripts/illustrations/jobs.json --only <id>`. This calls Gemini `gemini-3-pro-image` at 2K, 16:9. The key comes from the keychain (`gemini-api`).
3. Add the `id` to `MAP` in `process.py` if it is new, then run `python3 scripts/illustrations/process.py`. It trims paper borders, centre-crops to 16:9 and writes a 2400x1350 webp at quality 80.
4. Review it next to the others before shipping. The shared style prompt is `STYLE` in `gen.py`.

Raw renders go to `scripts/illustrations/raw/`, which git ignores.
