"""Explore parametric aperture/pinwheel marks; render a contact sheet at large
and favicon sizes to judge legibility before committing to SVG."""

import math
from PIL import Image, ImageDraw

BRAND = (0x4D, 0xA3, 0xFF, 255)
SS = 4


def blades(n, R, r, twist_deg, cx=50, cy=50):
    """Return a list of triangle polygons (one per blade) forming a swirling
    aperture: outer edge on a circle radius R, inner tip twisted by `twist`."""
    polys = []
    step = 360 / n
    tw = math.radians(twist_deg)
    for k in range(n):
        a0 = math.radians(k * step)
        a1 = math.radians((k + 1) * step)
        O0 = (cx + R * math.cos(a0), cy + R * math.sin(a0))
        O1 = (cx + R * math.cos(a1), cy + R * math.sin(a1))
        I = (cx + r * math.cos(a0 + tw), cy + r * math.sin(a0 + tw))
        polys.append([O0, O1, I])
    return polys


def render(n, R, r, twist, size):
    nn = size * SS
    img = Image.new("RGBA", (nn, nn), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = nn / 100
    for poly in blades(n, R, r, twist):
        d.polygon([(x * s, y * s) for x, y in poly], fill=BRAND)
    return img.resize((size, size), Image.LANCZOS)


configs = [
    (5, 46, 16, 30),
    (6, 46, 15, 30),
    (6, 46, 14, 22),
    (5, 47, 14, 38),
]

# Contact sheet: each config rendered at 220px (on dark) and 32px (favicon, on dark) + 32 on light.
cell = 220
pad = 24
sheet = Image.new("RGBA", (len(configs) * (cell + pad) + pad, cell + 120), (10, 10, 10, 255))
d = ImageDraw.Draw(sheet)
for i, (n, R, r, tw) in enumerate(configs):
    x = pad + i * (cell + pad)
    big = render(n, R, r, tw, cell)
    sheet.alpha_composite(big, (x, 10))
    fav = render(n, R, r, tw, 32)
    # dark swatch
    sheet.paste((10, 10, 10, 255), (x, cell + 30, x + 40, cell + 70))
    sheet.alpha_composite(fav, (x + 4, cell + 34))
    # light swatch
    sheet.paste((255, 255, 255, 255), (x + 60, cell + 30, x + 100, cell + 70))
    sheet.alpha_composite(fav, (x + 64, cell + 34))
    d.text((x + 4, cell + 80), f"#{i}: n={n} r={r} tw={tw}", fill=(200, 200, 200, 255))
sheet.convert("RGB").save("/Users/clupa/Documents/projects/clupai/branding/aperture_explore.png")
print("wrote aperture_explore.png")
