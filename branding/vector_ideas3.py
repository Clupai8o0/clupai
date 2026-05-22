"""Third batch of hand-crafted abstract logo marks (no AI API)."""

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


def rot(layer, deg):
    return layer.rotate(deg, resample=Image.BICUBIC, center=(N / 2, N / 2))


def asterisk():
    img = C()
    for a in (0, 60, 120):
        L = C(); dl = ImageDraw.Draw(L)
        dl.rounded_rectangle([s(45), s(12), s(55), s(88)], radius=s(5), fill=B)
        img.alpha_composite(rot(L, a))
    return img


def brackets():
    img = C(); d = ImageDraw.Draw(img)
    d.line([(s(44), s(22)), (s(22), s(50)), (s(44), s(78))], fill=B, width=s(10), joint="curve")
    d.line([(s(56), s(22)), (s(78), s(50)), (s(56), s(78))], fill=B, width=s(10), joint="curve")
    return img


def cycle():
    img = C(); d = ImageDraw.Draw(img)
    box = [s(18), s(18), s(82), s(82)]
    R, c = 32, 50
    d.arc(box, 40, 210, fill=B, width=s(9))
    d.arc(box, 220, 390, fill=B, width=s(9))
    for te in (210, 30):
        th = math.radians(te)
        rad = (math.cos(th), math.sin(th))
        tan = (-math.sin(th), math.cos(th))
        Pe = (c + R * rad[0], c + R * rad[1])
        tip = (Pe[0] + 13 * tan[0], Pe[1] + 13 * tan[1])
        b1 = (Pe[0] + 9 * rad[0], Pe[1] + 9 * rad[1])
        b2 = (Pe[0] - 9 * rad[0], Pe[1] - 9 * rad[1])
        d.polygon([(s(tip[0]), s(tip[1])), (s(b1[0]), s(b1[1])), (s(b2[0]), s(b2[1]))], fill=B)
    return img


def radiate():
    img = C(); d = ImageDraw.Draw(img)
    cx, cy = 50, 76
    for r in (16, 30, 44):
        d.arc([s(cx - r), s(cy - r), s(cx + r), s(cy + r)], 218, 322, fill=B, width=s(7))
    d.ellipse([s(cx - 6), s(cy - 6), s(cx + 6), s(cy + 6)], fill=B)
    return img


def dotgrid():
    img = C(); d = ImageDraw.Draw(img)
    for gx in (28, 50, 72):
        for gy in (28, 50, 72):
            r = 9 if gx == gy else 7   # accent the diagonal
            d.ellipse([s(gx - r), s(gy - r), s(gx + r), s(gy + r)], fill=B)
    return img


def lens():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(14), s(33), s(86), s(67)], outline=B, width=s(9))
    d.ellipse([s(40), s(40), s(60), s(60)], fill=B)
    return img


def triquetra():
    img = C(); d = ImageDraw.Draw(img)
    for a in (-90, 30, 150):
        cx = 50 + 15 * math.cos(math.radians(a))
        cy = 50 + 15 * math.sin(math.radians(a))
        r = 23
        d.ellipse([s(cx - r), s(cy - r), s(cx + r), s(cy + r)], outline=B, width=s(7))
    return img


def carets():
    img = C(); d = ImageDraw.Draw(img)
    for oy in (0, 22):
        d.line([(s(28), s(40 + oy)), (s(50), s(20 + oy)), (s(72), s(40 + oy))],
               fill=B, width=s(10), joint="curve")
    return img


MARKS = [
    ("asterisk", asterisk), ("brackets", brackets), ("cycle", cycle), ("radiate", radiate),
    ("dotgrid", dotgrid), ("lens", lens), ("triquetra", triquetra), ("carets", carets),
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
sheet.convert("RGB").save(f"{OUT}/vector_ideas3.png")
print("wrote vector_ideas3.png + 8 vec-*.png masters")
