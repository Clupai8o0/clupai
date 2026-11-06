# The c* mark as SVG paths, laid out the way cstar_final.py draws it. Writes JSON for src/components/logo.tsx: python3 branding/cstar_svg.py out.json
from fontTools.ttLib import TTCollection
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
import json, sys
f = TTCollection("/System/Library/Fonts/HelveticaNeue.ttc").fonts[1]
assert "Bold" in f["name"].getDebugName(4), f["name"].getDebugName(4)
gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f["head"].unitsPerEm
cC, cS = gs[cmap[ord("c")]], gs[cmap[ord("*")]]
sC, sS, gap = 300 / upm, 200 / upm, 6
xS = cC.width * sC + gap
# font units are y-up; flip to y-down with the baseline at 0
parts = [(cC, (sC, 0, 0, -sC, 0, 0)), (cS, (sS, 0, 0, -sS, xS, 0))]
bb = [1e9, 1e9, -1e9, -1e9]
for g, t in parts:
    bp = BoundsPen(gs); g.draw(TransformPen(bp, t)); b = bp.bounds
    bb = [min(bb[0], b[0]), min(bb[1], b[1]), max(bb[2], b[2]), max(bb[3], b[3])]
w, h = bb[2] - bb[0], bb[3] - bb[1]
def paths(fill):
    sc = min(fill * 100 / w, fill * 100 / h)
    ox, oy = (100 - w * sc) / 2 - bb[0] * sc, (100 - h * sc) / 2 - bb[1] * sc
    out = []
    for g, (a, b_, c, d, e, f_) in parts:
        pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
        g.draw(TransformPen(pen, (a * sc, 0, 0, d * sc, e * sc + ox, oy)))
        out.append(pen.getCommands())
    return out
tile = paths(0.64)
bare = paths(1.0)
json.dump({"tile": tile, "bare": bare, "bareAspect": w / h}, open(sys.argv[1], "w"))
print(w, h, len(tile[0]), len(tile[1]))
