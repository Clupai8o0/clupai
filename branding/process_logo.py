"""Isolate the flat azure logo mark, remove the (checkerboard/white) background,
and export a transparent master PNG plus favicon sizes."""

from pathlib import Path
import numpy as np
from PIL import Image

SRC = Path(__file__).parent / "final-mark.png"
OUT = Path(__file__).parent / "out"
OUT.mkdir(exist_ok=True)

BRAND = (0x4D, 0xA3, 0xFF)  # #4DA3FF

img = Image.open(SRC).convert("RGBA")
arr = np.asarray(img).astype(np.int16)
r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]

# A pixel belongs to the mark if it is clearly "blue": blue channel dominates
# red and green by a margin and is reasonably bright. The background here is a
# gray checkerboard / white, where r ~= g ~= b, so those get rejected.
is_blue = (b > r + 25) & (b > g + 10) & (b > 90)

# Build clean output: solid brand color where blue, fully transparent elsewhere.
out = np.zeros((*arr.shape[:2], 4), dtype=np.uint8)
out[..., 0], out[..., 1], out[..., 2] = BRAND
out[..., 3] = np.where(is_blue, 255, 0)
mark = Image.fromarray(out, "RGBA")

# Anti-alias the hard 1px edge so it doesn't look jagged: downscale-friendly.
# Crop to the mark's bounding box, then pad to a centered square.
bbox = mark.getbbox()
mark = mark.crop(bbox)
w, h = mark.size
side = int(max(w, h) * 1.18)  # ~9% padding on each side
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(mark, ((side - w) // 2, (side - h) // 2), mark)

master = canvas.resize((1024, 1024), Image.LANCZOS)
master.save(OUT / "logo-mark.png")
print(f"master logo-mark.png  ({master.size[0]}x{master.size[1]}) bbox={bbox}")

# Favicon / app-icon sizes (transparent).
for size in (16, 32, 48, 180, 192, 512):
    master.resize((size, size), Image.LANCZOS).save(OUT / f"icon-{size}.png")
    print(f"  icon-{size}.png")

# Multi-resolution .ico for legacy favicon.ico.
master.save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("favicon.ico (16/32/48)")
