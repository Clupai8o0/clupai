"""Second batch of hand-crafted abstract logo marks (no AI API)."""

import math
from PIL import Image, ImageDraw

B = (0x4D, 0xA3, 0xFF, 255)
N = 400
SC = 4
OUT = "/Users/clupa/Documents/projects/clupai/branding"


def C():
    return Image.new("RGBA", (N, N), (0, 0, 0, 0))


def s(v):
    return v * SC


def cut(img, points):
    """Erase a polygon region (make transparent) from an RGBA image."""
    mask = Image.new("L", (N, N), 0)
    ImageDraw.Draw(mask).polygon([(s(x), s(y)) for x, y in points], fill=255)
    img.paste((0, 0, 0, 0), mask=mask)


def cut_circle(img, cx, cy, r):
    mask = Image.new("L", (N, N), 0)
    ImageDraw.Draw(mask).ellipse([s(cx - r), s(cy - r), s(cx + r), s(cy + r)], fill=255)
    img.paste((0, 0, 0, 0), mask=mask)


def hexpts(R, c=50, rot=-90):
    return [(c + R * math.cos(math.radians(rot + k * 60)),
             c + R * math.sin(math.radians(rot + k * 60))) for k in range(6)]


def hexagon():
    img = C(); d = ImageDraw.Draw(img)
    d.polygon([(s(x), s(y)) for x, y in hexpts(44)], fill=B)
    cut(img, hexpts(24))                       # hex ring
    return img


def chevrons():
    img = C(); d = ImageDraw.Draw(img)
    for dx in (-14, 8):
        d.line([(s(34 + dx), s(24)), (s(58 + dx), s(50)), (s(34 + dx), s(76))],
               fill=B, width=s(11), joint="curve")
    return img


def rings():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(12), s(12), s(88), s(88)], outline=B, width=s(9))
    d.ellipse([s(38), s(38), s(62), s(62)], fill=B)
    return img


def plus():
    img = C(); d = ImageDraw.Draw(img)
    d.rounded_rectangle([s(41), s(16), s(59), s(84)], radius=s(7), fill=B)
    d.rounded_rectangle([s(16), s(41), s(84), s(59)], radius=s(7), fill=B)
    return img


def wave():
    img = C(); d = ImageDraw.Draw(img)
    pts = []
    for i in range(0, 101):
        x = 16 + i / 100 * 68
        y = 50 - 15 * math.sin(i / 100 * math.pi * 3)
        pts.append((s(x), s(y)))
    d.line(pts, fill=B, width=s(12), joint="curve")
    return img


def delta():
    img = C(); d = ImageDraw.Draw(img)
    d.polygon([(s(50), s(16)), (s(84), s(82)), (s(16), s(82))], fill=B)
    cut(img, [(50, 40), (66, 74), (34, 74)])   # hollow triangle
    return img


def pin():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(26), s(16), s(74), s(64)], fill=B)
    d.polygon([(s(30), s(52)), (s(70), s(52)), (s(50), s(88))], fill=B)
    cut_circle(img, 50, 40, 11)
    return img


def pinwheel():
    img = C(); d = ImageDraw.Draw(img)
    box = [s(10), s(10), s(90), s(90)]
    for a in (0, 90, 180, 270):
        d.pieslice(box, a + 8, a + 78, fill=B)
    cut_circle(img, 50, 50, 17)
    return img


MARKS = [
    ("hexring", hexagon), ("chevrons", chevrons), ("rings", rings), ("plus", plus),
    ("wave", wave), ("delta", delta), ("pin", pin), ("pinwheel", pinwheel),
]

for name, fn in MARKS:
    fn().save(f"{OUT}/vec-{name}.png")

cols, big = 4, 200
cellw, cellh = 250, 285
sheet = Image.new("RGBA", (cols * cellw, 2 * cellh), (12, 12, 12, 255))
d = ImageDraw.Draw(sheet)
for idx, (name, fn) in enumerate(MARKS):
    master = fn()
    r, c = divmod(idx, cols)
    ox, oy = c * cellw, r * cellh
    sheet.alpha_composite(master.resize((big, big), Image.LANCZOS), (ox + 25, oy + 12))
    fav = master.resize((24, 24), Image.LANCZOS)
    sheet.paste((12, 12, 12, 255), (ox + 60, oy + 222, ox + 96, oy + 258))
    sheet.alpha_composite(fav, (ox + 66, oy + 228))
    sheet.paste((255, 255, 255, 255), (ox + 120, oy + 222, ox + 156, oy + 258))
    sheet.alpha_composite(fav, (ox + 126, oy + 228))
    d.text((ox + 25, oy + 232), name, fill=(210, 210, 210, 255))
sheet.convert("RGB").save(f"{OUT}/vector_ideas2.png")
print("wrote vector_ideas2.png + 8 vec-*.png masters")
