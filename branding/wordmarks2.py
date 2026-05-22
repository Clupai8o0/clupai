"""'clupai' wordmark with the 'ai' highlighted in accent blue (the AI read)."""

import os
from PIL import Image, ImageDraw, ImageFont

OUT = "/Users/clupa/Documents/projects/clupai/branding"
TEXT = "clupai"
ACCENT = (0x4D, 0xA3, 0xFF, 255)
SIZE = 150
SYS = "/System/Library/Fonts"
JBM = "/Library/Fonts" if os.path.exists("/Library/Fonts/JetBrainsMono-Medium.ttf") else SYS
AN = "/System/Library/Fonts/Avenir Next.ttc"
HN = "/System/Library/Fonts/HelveticaNeue.ttc"


def load(path, want=None, index=None):
    try:
        f = ImageFont.truetype(path, SIZE, index=index) if index is not None else ImageFont.truetype(path, SIZE)
        if want:
            try:
                names = [n.decode(errors="ignore") for n in f.get_variation_names()]
                pick = next((n for n in names if n.lower() == want.lower()), None) or \
                       next((n for n in names if want.lower() in n.lower()), None)
                if pick:
                    f.set_variation_by_name(pick)
            except Exception:
                pass
        return f
    except Exception as e:
        print("  ! load fail", path, e)
        return None


def ttc_index(path, style):
    for idx in range(30):
        try:
            f = ImageFont.truetype(path, 20, index=idx)
        except Exception:
            break
        if f.getname()[1].lower() == style.lower():
            return idx
    return None


def wordmark(font, tracking, base):
    colors = [base, base, base, base, ACCENT, ACCENT]   # clup + ai
    asc, desc = font.getmetrics()
    widths = [font.getlength(c) for c in TEXT]
    w = int(sum(widths) + tracking * 5) + 24
    img = Image.new("RGBA", (w, asc + desc + 24), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    x = 12
    for i, c in enumerate(TEXT):
        d.text((x, 12), c, font=font, fill=colors[i])
        x += widths[i] + tracking
    return img.crop(img.getbbox())


an_med = ttc_index(AN, "Medium")
hn_med = ttc_index(HN, "Medium")

faces = [
    ("SF Pro · Medium", load(f"{SYS}/SFNS.ttf", "Medium"), -2),
    ("SF Pro Rounded · Medium", load(f"{SYS}/SFNSRounded.ttf", "Medium"), -1),
    ("Avenir Next · Medium", load(AN, index=an_med) if an_med is not None else None, 0),
    ("Helvetica Neue · Medium", load(HN, index=hn_med) if hn_med is not None else None, -3),
    ("SF Mono · Regular", load(f"{SYS}/SFNSMono.ttf", "Regular"), 4),
    ("JetBrains Mono · ExtraLight", load(f"{JBM}/JetBrainsMono-ExtraLight.ttf"), 10),
    ("JetBrains Mono · Medium", load(f"{JBM}/JetBrainsMono-Medium.ttf"), 6),
]
faces = [(l, f, t) for l, f, t in faces if f]

sheet_w = 1500
labelw, rowh, pad = 360, 150, 50
# dark rows + 2 light cards at the bottom
light_faces = [faces[0], faces[5]]
sheet_h = pad * 2 + rowh * len(faces) + 60 + rowh * len(light_faces)
sheet = Image.new("RGBA", (sheet_w, sheet_h), (10, 10, 12, 255))
d = ImageDraw.Draw(sheet)
small = ImageFont.truetype(f"{SYS}/SFNS.ttf", 22)

y = pad
for label, font, tr in faces:
    mark = wordmark(font, tr, (245, 245, 245, 255))
    d.text((40, y + rowh // 2 - 12), label, font=small, fill=(150, 150, 155, 255))
    sc = min((sheet_w - labelw - 80) / mark.width, 96 / mark.height)
    m = mark.resize((int(mark.width * sc), int(mark.height * sc)), Image.LANCZOS)
    sheet.alpha_composite(m, (labelw, y + (rowh - m.height) // 2))
    y += rowh
    d.line([(40, y), (sheet_w - 40, y)], fill=(40, 40, 44, 255), width=1)

y += 30
d.text((40, y), "on light background:", font=small, fill=(150, 150, 155, 255))
y += 30
for label, font, tr in light_faces:
    card = Image.new("RGBA", (sheet_w - 80, rowh - 20), (250, 250, 250, 255))
    mark = wordmark(font, tr, (12, 12, 14, 255))
    sc = min((card.width - labelw) / mark.width, 96 / mark.height)
    m = mark.resize((int(mark.width * sc), int(mark.height * sc)), Image.LANCZOS)
    cd = ImageDraw.Draw(card)
    cd.text((30, card.height // 2 - 12), label, font=small, fill=(120, 120, 125, 255))
    card.alpha_composite(m, (labelw - 40, (card.height - m.height) // 2))
    sheet.alpha_composite(card, (40, y))
    y += rowh

sheet.convert("RGB").save(f"{OUT}/wordmarks_ai.png")
print(f"wrote wordmarks_ai.png ({len(faces)} faces)")
