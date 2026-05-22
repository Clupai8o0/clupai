"""Explore a 'c.ai' favicon mark in Helvetica Neue (c neutral + .ai accent)."""

from PIL import Image, ImageDraw, ImageFont

OUT = "/Users/clupa/Documents/projects/clupai/branding"
ACCENT = (0x4D, 0xA3, 0xFF, 255)
WHITE = (245, 245, 246, 255)
OBSID = (5, 5, 5, 255)
HN = "/System/Library/Fonts/HelveticaNeue.ttc"
N = 400


def hn_index(style):
    for idx in range(20):
        try:
            f = ImageFont.truetype(HN, 20, index=idx)
        except Exception:
            break
        if f.getname()[1].lower() == style.lower():
            return idx
    return 0


IDX_BOLD = hn_index("Bold")
IDX_MED = hn_index("Medium")


def tile(segments, idx, fill_size=210, tracking=-4, tile_bg=OBSID, radius=92):
    """Render segments=[(char,color),...] centered on a rounded obsidian tile."""
    font = ImageFont.truetype(HN, fill_size, index=idx)
    img = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if tile_bg:
        d.rounded_rectangle([8, 8, N - 8, N - 8], radius=radius, fill=tile_bg)
    widths = [font.getlength(c) for c in [s[0] for s in segments]]
    total = sum(widths) + tracking * (len(segments) - 1)
    asc, desc = font.getmetrics()
    x = (N - total) / 2
    # optical vertical centering on cap/x-height
    y = (N - (asc + desc)) / 2 - desc * 0.15
    for (c, col), w in zip(segments, widths):
        d.text((x, y), c, font=font, fill=col)
        x += w + tracking
    return img


W = WHITE
A = ACCENT
variants = [
    ("c.ai  — .ai blue, bold", [("c", W), (".", A), ("a", A), ("i", A)], IDX_BOLD, 200),
    ("c.ai  — ai blue, dot white", [("c", W), (".", W), ("a", A), ("i", A)], IDX_BOLD, 200),
    ("C.ai  — capital C", [("C", W), (".", A), ("a", A), ("i", A)], IDX_BOLD, 190),
    ("c.ai  — medium weight", [("c", W), (".", A), ("a", A), ("i", A)], IDX_MED, 200),
    ("c•  — c + blue dot (ultra-mini)", [("c", W), ("•", A)], IDX_BOLD, 250),
    (".ai  — accent only", [(".", A), ("a", A), ("i", A)], IDX_BOLD, 240),
]

rowh, sheet_w = 230, 1500
sheet = Image.new("RGBA", (sheet_w, 60 + rowh * len(variants)), (22, 22, 24, 255))
d = ImageDraw.Draw(sheet)
label_font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 22)

y = 40
for label, segs, idx, fs in variants:
    master = tile(segs, idx, fill_size=fs)
    d.text((40, y + 80), label, font=label_font, fill=(170, 170, 175, 255))
    sheet.alpha_composite(master.resize((180, 180), Image.LANCZOS), (470, y))
    # favicon previews on dark and white strips
    bx = 700
    for bg in [(0, 0, 0, 255), (255, 255, 255, 255)]:
        for px in (16, 24, 32, 48):
            sheet.paste(bg, (bx, y + 70, bx + px + 24, y + 70 + px + 24))
            fav = master.resize((px, px), Image.LANCZOS)
            sheet.alpha_composite(fav, (bx + 12, y + 82))
            bx += px + 30
        bx += 30
    y += rowh
    d.line([(40, y - 20), (sheet_w - 40, y - 20)], fill=(50, 50, 54, 255), width=1)

sheet.convert("RGB").save(f"{OUT}/favicon_cai.png")
print(f"wrote favicon_cai.png (HN bold idx={IDX_BOLD}, medium idx={IDX_MED})")
