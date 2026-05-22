"""Hand-crafted abstract logo marks as crisp vector geometry (no AI API).
Renders a contact sheet with large views + tiny favicon previews on dark/light."""

import math
from PIL import Image, ImageDraw

B = (0x4D, 0xA3, 0xFF, 255)
N = 400          # hi-res master canvas (100 units * 4)
SC = 4
OUT = "/Users/clupa/Documents/projects/clupai/branding"


def C():
    return Image.new("RGBA", (N, N), (0, 0, 0, 0))


def s(v):
    return v * SC


def rot(layer, deg, cx=N / 2, cy=N / 2):
    return layer.rotate(deg, resample=Image.BICUBIC, center=(cx, cy))


def orbit():
    img = C(); d = ImageDraw.Draw(img)
    L = C(); dl = ImageDraw.Draw(L)
    dl.ellipse([s(8), s(38), s(92), s(62)], outline=B, width=s(7))
    img.alpha_composite(rot(L, -28))
    d.ellipse([s(38), s(38), s(62), s(62)], fill=B)
    return img


def strata():
    img = C(); d = ImageDraw.Draw(img)
    W, H, sk = 54, 11, 9
    for cy in (28, 50, 72):
        pts = [(50 - W / 2 + sk, cy - H / 2), (50 + W / 2 + sk, cy - H / 2),
               (50 + W / 2 - sk, cy + H / 2), (50 - W / 2 - sk, cy + H / 2)]
        d.polygon([(s(x), s(y)) for x, y in pts], fill=B)
    return img


def arrow():
    img = C(); d = ImageDraw.Draw(img)
    pts = [(50, 14), (84, 48), (65, 48), (65, 86), (35, 86), (35, 48), (16, 48)]
    d.polygon([(s(x), s(y)) for x, y in pts], fill=B)
    return rot(img, -45)


def spark():
    img = C(); d = ImageDraw.Draw(img)
    R, r, c = 47, 13, 50
    pts = []
    for k in range(8):
        a = math.radians(k * 45 - 90)
        rad = R if k % 2 == 0 else r
        pts.append((c + rad * math.cos(a), c + rad * math.sin(a)))
    d.polygon([(s(x), s(y)) for x, y in pts], fill=B)
    return img


def tiles():
    img = C(); d = ImageDraw.Draw(img)
    sz, gap, start = 30, 6, 17
    coords = [(start, start), (start + sz + gap, start),
              (start, start + sz + gap), (start + sz + gap, start + sz + gap)]
    for i, (x, y) in enumerate(coords):
        if i == 1:
            L = C(); dl = ImageDraw.Draw(L)
            dl.rounded_rectangle([s(x), s(y), s(x + sz), s(y + sz)], radius=s(6), fill=B)
            img.alpha_composite(rot(L, 18, s(x + sz / 2), s(y + sz / 2)))
        else:
            d.rounded_rectangle([s(x), s(y), s(x + sz), s(y + sz)], radius=s(6), fill=B)
    return img


def signal():
    img = C(); d = ImageDraw.Draw(img)
    heights, w, gap, base = [26, 40, 54, 70], 13, 7, 80
    total = 4 * w + 3 * gap
    x = (100 - total) / 2
    for h in heights:
        d.rounded_rectangle([s(x), s(base - h), s(x + w), s(base)], radius=s(4), fill=B)
        x += w + gap
    return img


def notch():
    img = C()
    L = C(); dl = ImageDraw.Draw(L)
    dl.ellipse([s(14), s(14), s(86), s(86)], outline=B, width=s(15))
    L.paste((0, 0, 0, 0), (s(42), 0, s(58), s(30)))   # cut a square notch at top
    img.alpha_composite(L)
    return img


def diamond():
    img = C()
    L = C(); dl = ImageDraw.Draw(L)
    dl.rectangle([s(24), s(24), s(76), s(76)], outline=B, width=s(11))
    img.alpha_composite(rot(L, 45))
    L2 = C(); dl2 = ImageDraw.Draw(L2)
    dl2.rectangle([s(42), s(42), s(58), s(58)], fill=B)
    img.alpha_composite(rot(L2, 45))
    return img


MARKS = [
    ("orbit", orbit), ("strata", strata), ("arrow", arrow), ("spark", spark),
    ("tiles", tiles), ("signal", signal), ("notch-ring", notch), ("diamond", diamond),
]

# Save each as its own transparent master too.
for name, fn in MARKS:
    fn().save(f"{OUT}/vec-{name}.png")

# Contact sheet, 4 cols x 2 rows.
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
sheet.convert("RGB").save(f"{OUT}/vector_ideas.png")
print("wrote vector_ideas.png + 8 vec-*.png masters")
