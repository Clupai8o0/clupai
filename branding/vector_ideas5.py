"""Fifth batch of hand-crafted abstract logo marks (no AI API)."""

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


def P(pts):
    return [(s(x), s(y)) for x, y in pts]


def bolt():
    img = C(); d = ImageDraw.Draw(img)
    d.polygon(P([(58, 12), (30, 54), (48, 54), (42, 88), (70, 44), (52, 44)]), fill=B)
    return img


def gem():
    img = C(); d = ImageDraw.Draw(img)
    d.polygon(P([(38, 18), (62, 18), (74, 40), (50, 84), (26, 40)]), outline=B, width=s(7))
    d.line(P([(26, 40), (74, 40)]), fill=B, width=s(6))
    d.line(P([(38, 18), (50, 40)]), fill=B, width=s(6))
    d.line(P([(62, 18), (50, 40)]), fill=B, width=s(6))
    d.line(P([(50, 40), (50, 84)]), fill=B, width=s(6))
    return img


def molecule():
    img = C(); d = ImageDraw.Draw(img)
    nodes = [(50, 24), (26, 70), (74, 70)]
    for a in range(3):
        for b in range(a + 1, 3):
            d.line(P([nodes[a], nodes[b]]), fill=B, width=s(7))
    for x, y in nodes:
        d.ellipse([s(x - 11), s(y - 11), s(x + 11), s(y + 11)], fill=B)
    return img


def play():
    img = C(); d = ImageDraw.Draw(img)
    d.ellipse([s(14), s(14), s(86), s(86)], outline=B, width=s(8))
    d.polygon(P([(42, 33), (42, 67), (70, 50)]), fill=B)
    return img


def leaf():
    img = C(); d = ImageDraw.Draw(img)
    right, left = [], []
    for i in range(0, 51):
        t = i / 50
        y = 16 + 68 * t
        dx = 30 * math.sin(math.pi * t)
        right.append((50 + dx, y))
        left.append((50 - dx, y))
    d.polygon(P(right + left[::-1]), fill=B)
    return img


def peaks():
    img = C(); d = ImageDraw.Draw(img)
    d.polygon(P([(60, 28), (92, 80), (28, 80)]), fill=B)
    d.polygon(P([(38, 44), (66, 80), (10, 80)]), fill=B)
    return img


def frame():
    img = C(); d = ImageDraw.Draw(img)
    L, S2, t = 16, 40, 8
    for cx, cy, hx, vy in [(L, L, 1, 1), (100 - L, L, -1, 1),
                           (L, 100 - L, 1, -1), (100 - L, 100 - L, -1, -1)]:
        hx0, hx1 = sorted([cx, cx + hx * (S2 - L)])
        vy0, vy1 = sorted([cy, cy + vy * (S2 - L)])
        d.rounded_rectangle([s(min(cx, cx + hx * (S2 - L)) - 0), s(cy - t / 2 + (0)),
                             s(hx1), s(cy + t / 2)], radius=s(3), fill=B)
        d.rounded_rectangle([s(cx - t / 2), s(vy0), s(cx + t / 2), s(vy1)], radius=s(3), fill=B)
    d.ellipse([s(44), s(44), s(56), s(56)], fill=B)
    return img


def check():
    img = C(); d = ImageDraw.Draw(img)
    d.line(P([(26, 52), (44, 70), (76, 30)]), fill=B, width=s(12), joint="curve")
    return img


MARKS = [
    ("bolt", bolt), ("gem", gem), ("molecule", molecule), ("play", play),
    ("leaf", leaf), ("peaks", peaks), ("frame", frame), ("check", check),
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
sheet.convert("RGB").save(f"{OUT}/vector_ideas5.png")
print("wrote vector_ideas5.png + 8 vec-*.png masters")
