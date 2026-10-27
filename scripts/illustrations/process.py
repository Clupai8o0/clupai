"""Trim paper borders, crop to 16:9, write optimised webp into the site."""
from pathlib import Path
from PIL import Image, ImageStat

HERE = Path(__file__).resolve().parent
RAW = HERE / 'raw'
OUT = HERE.parents[1] / 'public' / 'illustrations'
# Raw file stem (<job id>.<model>, as gen.py names it) -> path under public/illustrations.
# Every shipped image is a Gemini render; change the suffix to ship another model's.
MAP = {
    'tradies.gemini': 'industries/tradies-trades', 'schools.gemini': 'industries/schools',
    'professional.gemini': 'industries/professional-services',
    'web.gemini': 'services/web', 'seo.gemini': 'services/seo', 'automation.gemini': 'services/automation',
    'web-melbourne.gemini': 'services/web-melbourne', 'seo-melbourne.gemini': 'services/seo-melbourne',
    'automation-melbourne.gemini': 'services/automation-melbourne',
    **{f'{s}.gemini': f'suburbs/{s}' for s in
       ['brunswick', 'carlton', 'richmond', 'fitzroy', 'collingwood', 'northcote', 'coburg']},
    'case-kdg.gemini': 'work/king-double-glazing', 'case-hoddle.gemini': 'work/hoddle-melbourne',
    'case-kairos.gemini': 'work/kairos', 'case-krishnaveni.gemini': 'work/krishnaveni-school',
    'case-nmmun.gemini': 'work/nmmun', 'case-cuts.gemini': 'work/cuts-and-shavez',
    'case-thurman.gemini': 'work/thurman', 'studio.gemini': 'studio',
}


def light(im, box):
    return ImageStat.Stat(im.crop(box).convert('L')).mean[0] > 110


def trim(im):
    w, h = im.size
    l, t, r, b = 0, 0, w, h
    while l < w * 0.12 and light(im, (l, t, l + 2, b)):
        l += 2
    while r > w * 0.88 and light(im, (r - 2, t, r, b)):
        r -= 2
    while t < h * 0.12 and light(im, (l, t, r, t + 2)):
        t += 2
    while b > h * 0.88 and light(im, (l, b - 2, r, b)):
        b -= 2
    if (l, t, r, b) != (0, 0, w, h):
        # step past the soft edge where paper meets ink
        pad = 10
        l, t, r, b = l + pad * (l > 0), t + pad * (t > 0), r - pad * (r < w), b - pad * (b < h)
    return im.crop((l, t, r, b)), (l, t, w - r, h - b)


def to_169(im):
    w, h = im.size
    if w / h > 16 / 9:
        nw = round(h * 16 / 9)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w * 9 / 16)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))


for src, dest in MAP.items():
    if not (RAW / f'{src}.png').exists():
        print(f'{dest:32} skipped: no raw/{src}.png')
        continue
    im = Image.open(RAW / f'{src}.png').convert('RGB')
    im, cut = trim(im)
    im = to_169(im)
    if im.width > 2400:
        im = im.resize((2400, 1350), Image.LANCZOS)
    path = OUT / f'{dest}.webp'
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, 'WEBP', quality=80, method=6)
    print(f'{dest:32} trimmed={cut} -> {im.size} {path.stat().st_size // 1024} KB')
