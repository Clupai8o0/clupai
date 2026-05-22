"""Render the canonical clupai mark (the same aperture-C as logo.svg) into every
icon asset the site needs, so raster and vector stay identical."""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]  # repo root
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

BRAND = (0x4D, 0xA3, 0xFF, 255)
OBSIDIAN = (0x05, 0x05, 0x05, 255)
SS = 4  # supersample factor for crisp edges


def render_mark(size: int, bg=None) -> Image.Image:
    """Transparent (or bg-filled) square with the azure aperture-C centered."""
    n = size * SS
    img = Image.new("RGBA", (n, n), bg if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = 0.33 * n
    w = int(round(0.20 * n))
    c = n / 2
    box = [c - r, c - r, c + r, c + r]
    # start=42, end=318 sweeps clockwise through the left -> gap faces right.
    d.arc(box, start=42, end=318, fill=BRAND, width=w)
    return img.resize((size, size), Image.LANCZOS)


# 1. Master transparent mark (footer, JSON-LD, general use).
render_mark(1024).save(PUBLIC / "logo.png")
print("public/logo.png")

# 2. Modern SVG favicon — copy the hand-authored vector.
(APP / "icon.svg").write_text((PUBLIC / "logo.svg").read_text())
print("src/app/icon.svg")

# 3. Legacy multi-size favicon.ico (transparent).
ico = render_mark(256)
ico.save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("src/app/favicon.ico")

# 4. Apple touch icon — needs an opaque tile (iOS turns alpha into black).
#    Obsidian background keeps it on-brand.
apple = render_mark(180, bg=OBSIDIAN)
apple.save(APP / "apple-icon.png")
print("src/app/apple-icon.png")

# 5. PWA / manifest icons (transparent).
for s in (192, 512):
    render_mark(s).save(PUBLIC / f"icon-{s}.png")
    print(f"public/icon-{s}.png")
