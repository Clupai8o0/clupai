"""Final c* mark — dark (primary) + light (alt), reduced padding. Preview + masters."""

from PIL import Image, ImageDraw, ImageFont

OUT = "/Users/clupa/Documents/projects/clupai/branding"
ACCENT = (0x4D, 0xA3, 0xFF, 255)
WHITE = (245, 245, 246, 255)
INK = (10, 10, 12, 255)
OBSID = (5, 5, 5, 255)
PAPER = (250, 250, 250, 255)
HN = "/System/Library/Fonts/HelveticaNeue.ttc"
IDX_BOLD = 1


def group(c_color, sizeC=300, sizeStar=200, gap=6):
    fontC = ImageFont.truetype(HN, sizeC, index=IDX_BOLD)
    fontS = ImageFont.truetype(HN, sizeStar, index=IDX_BOLD)
    img = Image.new("RGBA", (900, 700), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    base = 460
    d.text((60, base - fontC.getmetrics()[0]), "c", font=fontC, fill=c_color)
    x = 60 + fontC.getlength("c") + gap
    d.text((x, base - fontS.getmetrics()[0]), "*", font=fontS, fill=ACCENT)
    return img.crop(img.getbbox())


def tile(size, mode="dark", rounded=True, fill=0.64):
    bg = OBSID if mode == "dark" else PAPER
    c_color = WHITE if mode == "dark" else INK
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        m = round(size * 0.02)
        d.rounded_rectangle([m, m, size - m, size - m], radius=round(size * 0.225), fill=bg)
    else:
        d.rectangle([0, 0, size, size], fill=bg)
    g = group(c_color)
    sc = min(fill * size / g.width, fill * size / g.height)
    gm = g.resize((int(g.width * sc), int(g.height * sc)), Image.LANCZOS)
    img.alpha_composite(gm, ((size - gm.width) // 2, (size - gm.height) // 2))
    return img


if __name__ == "__main__":
    # Preview sheet: dark + light, big tile + favicon sizes on dark and white.
    rows = [("dark · primary", "dark"), ("light · alt", "light")]
    rowh, sheet_w = 240, 1400
    sheet = Image.new("RGBA", (sheet_w, 60 + rowh * len(rows)), (28, 28, 30, 255))
    d = ImageDraw.Draw(sheet)
    lf = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 22)
    y = 40
    for label, mode in rows:
        m = tile(400, mode)
        d.text((40, y + 90), label, font=lf, fill=(180, 180, 185, 255))
        sheet.alpha_composite(m.resize((190, 190), Image.LANCZOS), (300, y))
        bx = 560
        for bg in [(0, 0, 0, 255), (255, 255, 255, 255)]:
            for px in (16, 24, 32, 48, 64):
                sheet.paste(bg, (bx, y + 70, bx + px + 22, y + 70 + px + 22))
                sheet.alpha_composite(m.resize((px, px), Image.LANCZOS), (bx + 11, y + 81))
                bx += px + 26
            bx += 26
        y += rowh
        d.line([(40, y - 24), (sheet_w - 40, y - 24)], fill=(55, 55, 60, 255), width=1)
    sheet.convert("RGB").save(f"{OUT}/cstar_final_preview.png")
    tile(512, "dark").save(f"{OUT}/cstar-dark.png")
    tile(512, "light").save(f"{OUT}/cstar-light.png")
    print("wrote cstar_final_preview.png + masters")
