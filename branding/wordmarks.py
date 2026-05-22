"""Render 'clupai' wordmark candidates in real typefaces for comparison.
Brief: lowercase, minimal/precise, premium, technical edge, pure type."""

from PIL import Image, ImageDraw, ImageFont

OUT = "/Users/clupa/Documents/projects/clupai/branding"
TEXT = "clupai"
ACCENT = (0x4D, 0xA3, 0xFF, 255)
WHITE = (245, 245, 245, 255)
SIZE = 150

SYS = "/System/Library/Fonts"
JBM = "/Library/Fonts" if __import__("os").path.exists("/Library/Fonts/JetBrainsMono-Medium.ttf") else SYS


def load(path, want_style=None, index=None):
    """Load a font; for variable fonts pick a named weight, for .ttc pick index."""
    try:
        if index is not None:
            f = ImageFont.truetype(path, SIZE, index=index)
        else:
            f = ImageFont.truetype(path, SIZE)
        if want_style:
            try:
                for n in f.get_variation_names():
                    if want_style.lower() == n.decode(errors="ignore").lower():
                        f.set_variation_by_name(n)
                        return f
                for n in f.get_variation_names():
                    if want_style.lower() in n.decode(errors="ignore").lower():
                        f.set_variation_by_name(n)
                        return f
            except Exception:
                pass
        return f
    except Exception as e:
        print("  ! could not load", path, want_style, index, e)
        return None


def ttc_index_for(path, style):
    """Find the .ttc face index whose style name matches."""
    for idx in range(30):
        try:
            f = ImageFont.truetype(path, 20, index=idx)
        except Exception:
            break
        if f.getname()[1].lower() == style.lower():
            return idx
    return None


def wordmark(font, tracking, dot_accent=False):
    asc, desc = font.getmetrics()
    h = asc + desc
    widths = [font.getlength(c) for c in TEXT]
    w = int(sum(widths) + tracking * (len(TEXT) - 1)) + 20
    img = Image.new("RGBA", (w, h + 20), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    x = 10
    for i, c in enumerate(TEXT):
        col = ACCENT if (dot_accent and c == "i") else WHITE
        d.text((x, 10), c, font=font, fill=col)
        x += widths[i] + tracking
    return img.crop(img.getbbox())


AN = f"{SYS}/../Fonts/Avenir Next.ttc"
AN = "/System/Library/Fonts/Avenir Next.ttc"
HN = "/System/Library/Fonts/HelveticaNeue.ttc"

candidates = []


def add(label, font, tracking, dot=False):
    if font:
        candidates.append((label, wordmark(font, tracking, dot)))


add("SF Pro · Regular", load(f"{SYS}/SFNS.ttf", "Regular"), -2)
add("SF Pro · Medium", load(f"{SYS}/SFNS.ttf", "Medium"), -2)
add("SF Pro Rounded · Medium", load(f"{SYS}/SFNSRounded.ttf", "Medium"), -1)
add("SF Pro Rounded · Semibold", load(f"{SYS}/SFNSRounded.ttf", "Semibold"), -1)

an_med = ttc_index_for(AN, "Medium")
an_demi = ttc_index_for(AN, "Demi Bold") or ttc_index_for(AN, "Demibold")
add("Avenir Next · Medium", load(AN, index=an_med) if an_med is not None else None, 0)
add("Avenir Next · Demi Bold", load(AN, index=an_demi) if an_demi is not None else None, 0)

hn_med = ttc_index_for(HN, "Medium")
add("Helvetica Neue · Medium", load(HN, index=hn_med) if hn_med is not None else None, -3)

add("SF Mono · Regular", load(f"{SYS}/SFNSMono.ttf", "Regular"), 4)
add("JetBrains Mono · ExtraLight", load(f"{JBM}/JetBrainsMono-ExtraLight.ttf"), 10)
add("JetBrains Mono · Medium", load(f"{JBM}/JetBrainsMono-Medium.ttf"), 6)
add("SF Pro · Medium + blue dot", load(f"{SYS}/SFNS.ttf", "Medium"), -2, dot=True)

# Compose dark contact sheet, one wordmark per row.
pad, rowh, labelw = 50, 150, 360
sheet_w = 1500
sheet_h = pad * 2 + rowh * len(candidates)
sheet = Image.new("RGBA", (sheet_w, sheet_h), (10, 10, 12, 255))
d = ImageDraw.Draw(sheet)
small = ImageFont.truetype(f"{SYS}/SFNS.ttf", 22)
y = pad
for label, mark in candidates:
    d.text((40, y + rowh // 2 - 12), label, font=small, fill=(150, 150, 155, 255))
    scale = min((sheet_w - labelw - 80) / mark.width, 96 / mark.height)
    m = mark.resize((int(mark.width * scale), int(mark.height * scale)), Image.LANCZOS)
    sheet.alpha_composite(m, (labelw, y + (rowh - m.height) // 2))
    y += rowh
    d.line([(40, y), (sheet_w - 40, y)], fill=(40, 40, 44, 255), width=1)
sheet.convert("RGB").save(f"{OUT}/wordmarks.png")
print(f"wrote wordmarks.png with {len(candidates)} candidates")
