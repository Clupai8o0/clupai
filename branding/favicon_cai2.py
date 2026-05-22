"""'C.ai' favicon — big capital C (white) + smaller .ai (accent blue), HN Bold."""

from PIL import Image, ImageDraw, ImageFont

OUT = "/Users/clupa/Documents/projects/clupai/branding"
ACCENT = (0x4D, 0xA3, 0xFF, 255)
WHITE = (245, 245, 246, 255)
OBSID = (5, 5, 5, 255)
HN = "/System/Library/Fonts/HelveticaNeue.ttc"
N = 400
IDX_BOLD = 1


def render(sizeC, sizeAI, gap, vmode="baseline", track=-3):
    fontC = ImageFont.truetype(HN, sizeC, index=IDX_BOLD)
    fontA = ImageFont.truetype(HN, sizeAI, index=IDX_BOLD)
    img = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([8, 8, N - 8, N - 8], radius=92, fill=OBSID)

    ai = [(".", ACCENT), ("a", ACCENT), ("i", ACCENT)]
    wC = fontC.getlength("C")
    wAI = sum(fontA.getlength(c) for c, _ in ai) + track * (len(ai) - 1)
    total = wC + gap + wAI
    x = (N - total) / 2 + 6
    ascC = fontC.getmetrics()[0]
    ascA = fontA.getmetrics()[0]
    baseline = N * 0.64

    d.text((x, baseline - ascC), "C", font=fontC, fill=WHITE)
    xa = x + wC + gap
    if vmode == "baseline":
        ya = baseline - ascA
    else:  # center .ai on the C's optical middle
        capC, capA = 0.72 * sizeC, 0.52 * sizeAI
        midC = (baseline - capC / 2)
        ya = midC + capA / 2 - ascA
    for c, col in ai:
        d.text((xa, ya), c, font=fontA, fill=col)
        xa += fontA.getlength(c) + track
    return img


variants = [
    ("C 300 / .ai 130 · baseline", 300, 130, 6, "baseline"),
    ("C 330 / .ai 120 · baseline", 330, 120, 4, "baseline"),
    ("C 280 / .ai 150 · baseline", 280, 150, 8, "baseline"),
    ("C 330 / .ai 120 · centered", 330, 120, 6, "center"),
    ("C 360 / .ai 110 · baseline", 360, 110, 2, "baseline"),
]

rowh, sheet_w = 230, 1500
sheet = Image.new("RGBA", (sheet_w, 60 + rowh * len(variants)), (22, 22, 24, 255))
d = ImageDraw.Draw(sheet)
lf = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 22)

y = 40
masters = []
for label, sc, sa, gap, vm in variants:
    m = render(sc, sa, gap, vm)
    masters.append((label, m))
    d.text((40, y + 80), label, font=lf, fill=(170, 170, 175, 255))
    sheet.alpha_composite(m.resize((180, 180), Image.LANCZOS), (470, y))
    bx = 700
    for bg in [(0, 0, 0, 255), (255, 255, 255, 255)]:
        for px in (16, 24, 32, 48):
            sheet.paste(bg, (bx, y + 70, bx + px + 24, y + 70 + px + 24))
            sheet.alpha_composite(m.resize((px, px), Image.LANCZOS), (bx + 12, y + 82))
            bx += px + 30
        bx += 30
    y += rowh
    d.line([(40, y - 20), (sheet_w - 40, y - 20)], fill=(50, 50, 54, 255), width=1)

sheet.convert("RGB").save(f"{OUT}/favicon_cai2.png")
print("wrote favicon_cai2.png")
