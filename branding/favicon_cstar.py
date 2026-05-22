"""'c*' favicon — c (white) + asterisk (accent blue), padded fit."""

from PIL import Image, ImageDraw, ImageFont

OUT = "/Users/clupa/Documents/projects/clupai/branding"
ACCENT = (0x4D, 0xA3, 0xFF, 255)
WHITE = (245, 245, 246, 255)
OBSID = (5, 5, 5, 255)
HN = "/System/Library/Fonts/HelveticaNeue.ttc"
N, IDX_BOLD, RADIUS = 400, 1, 92


def group(letter="c", sizeC=300, sizeStar=200, gap=6, star_dy=0):
    fontC = ImageFont.truetype(HN, sizeC, index=IDX_BOLD)
    fontS = ImageFont.truetype(HN, sizeStar, index=IDX_BOLD)
    img = Image.new("RGBA", (900, 700), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    base, ascC, ascS = 450, fontC.getmetrics()[0], fontS.getmetrics()[0]
    x = 60
    d.text((x, base - ascC), letter, font=fontC, fill=WHITE)
    x += fontC.getlength(letter) + gap
    d.text((x, base - ascS + star_dy), "*", font=fontS, fill=ACCENT)
    return img.crop(img.getbbox())


def tile(g, fw=0.56, fh=0.56):
    img = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    ImageDraw.Draw(img).rounded_rectangle([8, 8, N - 8, N - 8], radius=RADIUS, fill=OBSID)
    scale = min(fw * N / g.width, fh * N / g.height)
    gm = g.resize((int(g.width * scale), int(g.height * scale)), Image.LANCZOS)
    img.alpha_composite(gm, ((N - gm.width) // 2, (N - gm.height) // 2))
    return img


variants = [
    ("c* · star 200 (high)", "c", 300, 200, 6, 0),
    ("c* · star 165", "c", 300, 165, 6, 0),
    ("c* · star 240 big", "c", 280, 240, 4, 0),
    ("C* · capital", "C", 300, 200, 6, 0),
    ("c* · star dropped", "c", 300, 200, 6, 60),
]

rowh, sheet_w = 230, 1500
sheet = Image.new("RGBA", (sheet_w, 60 + rowh * len(variants)), (22, 22, 24, 255))
d = ImageDraw.Draw(sheet)
lf = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 22)

y = 40
for label, ltr, sc, ss, gap, dy in variants:
    m = tile(group(ltr, sc, ss, gap, dy))
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

sheet.convert("RGB").save(f"{OUT}/favicon_cstar.png")
print("wrote favicon_cstar.png")
