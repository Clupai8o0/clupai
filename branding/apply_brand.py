"""Write the final c* mark into all site icon assets (dark primary + light alt)."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cstar_final import tile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
APP = os.path.join(ROOT, "src", "app")
PUB = os.path.join(ROOT, "public")

F = 0.70  # locked padding

# Primary (dark) — browser/app icons.
tile(256, "dark", fill=F).save(os.path.join(APP, "favicon.ico"),
                               sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
tile(512, "dark", fill=F).save(os.path.join(APP, "icon.png"))
tile(180, "dark", rounded=False, fill=F).save(os.path.join(APP, "apple-icon.png"))  # iOS masks corners
tile(192, "dark", fill=F).save(os.path.join(PUB, "icon-192.png"))
tile(512, "dark", fill=F).save(os.path.join(PUB, "icon-512.png"))
tile(512, "dark", fill=F).save(os.path.join(PUB, "logo.png"))         # footer + JSON-LD
tile(512, "light", fill=F).save(os.path.join(PUB, "logo-light.png"))  # alt for light surfaces
print("wrote favicon.ico, icon.png, apple-icon.png, icon-192/512, logo.png, logo-light.png")

# Remove obsolete aperture assets.
for stale in [os.path.join(APP, "icon.svg"), os.path.join(PUB, "logo.svg")]:
    if os.path.exists(stale):
        os.remove(stale)
        print("removed", os.path.relpath(stale, ROOT))
