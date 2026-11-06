# Usage: python3 branding/site_icons.py <repo dir>
# The site icons are the c* mark (branding/cstar_final.py) on a full-bleed obsidian square. Platforms round the corners themselves.
import io, sys
from PIL import Image, ImageDraw, ImageFont
W = sys.argv[1]
HN = "/System/Library/Fonts/HelveticaNeue.ttc"
ACCENT, WHITE, OBSID = (0x4D, 0xA3, 0xFF, 255), (245, 245, 246, 255), (5, 5, 5, 255)
def group():
    fc, fs = ImageFont.truetype(HN, 1200, index=1), ImageFont.truetype(HN, 800, index=1)
    img = Image.new("RGBA", (3600, 2800), (0, 0, 0, 0)); d = ImageDraw.Draw(img); base = 1840
    d.text((240, base - fc.getmetrics()[0]), "c", font=fc, fill=WHITE)
    d.text((240 + fc.getlength("c") + 24, base - fs.getmetrics()[0]), "*", font=fs, fill=ACCENT)
    return img.crop(img.getbbox())
G = group()
def tile(size, fill=0.64):
    img = Image.new("RGBA", (size, size), OBSID)
    sc = min(fill * size / G.width, fill * size / G.height)
    g = G.resize((max(1, round(G.width * sc)), max(1, round(G.height * sc))), Image.LANCZOS)
    img.alpha_composite(g, ((size - g.width) // 2, (size - g.height) // 2))
    return img
tile(512).convert("RGB").save(f"{W}/src/app/icon.png")
tile(180).convert("RGB").save(f"{W}/src/app/apple-icon.png")
tile(192).convert("RGB").save(f"{W}/public/icon-192.png")
tile(512).convert("RGB").save(f"{W}/public/icon-512.png")
# Small sizes get a bigger mark so the c still reads at 16px.
ico = [tile(s, 0.74) for s in (16, 32, 48, 64)]
ico[-1].save(f"{W}/src/app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)], append_images=ico[:-1])
print("ok")
