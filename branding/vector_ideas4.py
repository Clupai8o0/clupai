"""Fourth batch of hand-crafted abstract logo marks (no AI API)."""

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
    mask = Image.new("L", (N, N), 0)
    ImageDraw.Draw(mask).polygon([(s(x), s(y)) for x, y in points], fill=255)
    img.paste((0, 0, 0, 0), mask=mask)


def cut_circle(img, cx, cy, r):
    mask = Image.new("L", (N, N), 0)
    ImageDraw.Draw(mask).ellipse([s(cx - r), s(cy - r), s(cx + r), s(cy + r)], fill=255)
    img.paste((0, 0, 0, 0), mask=mask)


def crescent():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(12), s(12), s(88), s(88)], fill=B)
    cut_circle(img, 64, 40, 36)
    return img


def venn():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(16), s(26), s(64), s(74)], outline=B, width=s(8))
    d.ellipse([s(36), s(26), s(84), s(74)], outline=B, width=s(8))
    return img


def squircle():
    img = C(); d = ImageDraw.Draw(img)
    d.rounded_rectangle([s(16), s(16), s(84), s(84)], radius=s(22), fill=B)
    cut(img, [(60, 12), (88, 12), (88, 40)])   # dog-ear corner
    return img


def steps():
    img = C(); d = ImageDraw.Draw(img)
    pts = [(16, 82), (16, 60), (40, 60), (40, 43), (64, 43), (64, 26), (84, 26), (84, 82)]
    d.polygon([(s(x), s(y)) for x, y in pts], fill=B)
    return img


def droplet():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(28), s(44), s(72), s(86)], fill=B)
    d.polygon([(s(50), s(14)), (s(31), s(58)), (s(69), s(58))], fill=B)
    return img


def crosshair():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(24), s(24), s(76), s(76)], outline=B, width=s(8))
    d.rounded_rectangle([s(46), s(8), s(54), s(28)], radius=s(4), fill=B)
    d.rounded_rectangle([s(46), s(72), s(54), s(92)], radius=s(4), fill=B)
    d.rounded_rectangle([s(8), s(46), s(28), s(54)], radius=s(4), fill=B)
    d.rounded_rectangle([s(72), s(46), s(92), s(54)], radius=s(4), fill=B)
    d.ellipse([s(44), s(44), s(56), s(56)], fill=B)
    return img


def cube():
    img = C(); d = ImageDraw.Draw(img)
    c = 50
    pts = [(c + 40 * math.cos(math.radians(k * 60)),
            c + 40 * math.sin(math.radians(k * 60))) for k in range(6)]
    d.polygon([(s(x), s(y)) for x, y in pts], outline=B, width=s(8))
    for k in (1, 3, 5):
        d.line([(s(c), s(c)), (s(pts[k][0]), s(pts[k][1]))], fill=B, width=s(8))
    return img


def shield():
    img = C(); d = ImageDraw.Draw(img)
    pts = [(50, 14), (82, 26), (80, 54), (50, 88), (20, 54), (18, 26)]
    d.polygon([(s(x), s(y)) for x, y in pts], fill=B)
    return img


MARKS = [
    ("crescent", crescent), ("venn", venn), ("squircle", squircle), ("steps", steps),
    ("droplet", droplet), ("crosshair", crosshair), ("cube-iso", cube), ("shield", shield),
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
sheet.convert("RGB").save(f"{OUT}/vector_ideas4.png")
print("wrote vector_ideas4.png + 8 vec-*.png masters")
