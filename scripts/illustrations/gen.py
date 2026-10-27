#!/usr/bin/env python3
"""Generate clupai illustrations with Gemini (Nano Banana Pro) and OpenAI gpt-image.

Usage: gen.py JOBS.json [--only id,id] [--models gemini,openai]
Each job: {"id": "tradies", "scene": "...", "aspect": "16:9"}
Writes raw/<id>.<model>.png. Keys come from the macOS keychain and are never printed.
"""
import base64
import json
import subprocess
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
RAW.mkdir(exist_ok=True)

STYLE = (
    "Editorial illustration for the website of a Melbourne web studio. "
    "Strict three-colour palette: a near-black ink ground (#050505 to #111111), one cool electric blue "
    "(#4da3ff) that is the only light in the scene, and soft off-white (#e5e5e5) for the brightest highlights. "
    "No other hues: no orange, no yellow, no warm street lights, no purple. "
    "Style: flat-shaded screenprint and gouache illustration built from solid shapes and soft steps of tone, "
    "fine risograph grain, crisp silhouettes, calm and quiet. Low-key night lighting: most of the frame is deep "
    "shadow, and the blue light falls on a few surfaces and edges. Cinematic wide composition with generous "
    "dark negative space. Absolutely no text, letters, numbers, signage, logos, watermarks or user-interface "
    "elements anywhere; screens show only a soft blue glow. No outlines, no line art, no grid lines, no borders, "
    "no frames, no dividers, no people's faces in detail."
)


def key(service: str) -> str:
    return subprocess.run(
        ["security", "find-generic-password", "-s", service, "-w"],
        capture_output=True, text=True, check=True,
    ).stdout.strip()


def post(url: str, body: dict, headers: dict, timeout: int = 300) -> dict:
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def gemini(job: dict) -> bytes:
    model = job.get("gemini_model", "gemini-3-pro-image")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    body = {
        "contents": [{"parts": [{"text": f"{STYLE}\n\nScene: {job['scene']}"}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": job.get("aspect", "16:9"), "imageSize": "2K"},
        },
    }
    out = post(url, body, {"Content-Type": "application/json", "x-goog-api-key": key("gemini-api")})
    for part in out["candidates"][0]["content"]["parts"]:
        data = part.get("inlineData") or part.get("inline_data")
        if data:
            return base64.b64decode(data["data"])
    raise RuntimeError(f"no image in gemini response: {json.dumps(out)[:400]}")


def openai(job: dict) -> bytes:
    sizes = {"16:9": "1536x1024", "3:2": "1536x1024", "4:5": "1024x1536", "1:1": "1024x1024"}
    body = {
        "model": job.get("openai_model", "gpt-image-2"),
        "prompt": f"{STYLE}\n\nScene: {job['scene']}",
        "size": sizes.get(job.get("aspect", "16:9"), "1536x1024"),
        "quality": "high",
        "n": 1,
    }
    out = post(
        "https://api.openai.com/v1/images/generations", body,
        {"Content-Type": "application/json", "Authorization": f"Bearer {key('openai-api')}"},
    )
    return base64.b64decode(out["data"][0]["b64_json"])


def run(job: dict, model: str) -> str:
    dest = RAW / f"{job['id']}.{model}.png"
    try:
        data = gemini(job) if model == "gemini" else openai(job)
    except urllib.error.HTTPError as e:
        return f"FAIL {dest.name}: HTTP {e.code} {e.read()[:300]!r}"
    except Exception as e:  # noqa: BLE001
        return f"FAIL {dest.name}: {e}"
    dest.write_bytes(data)
    return f"ok   {dest.name} ({len(data) // 1024} KB)"


def main() -> None:
    jobs = json.loads(Path(sys.argv[1]).read_text())
    only = models = None
    args = sys.argv[2:]
    if "--only" in args:
        only = set(args[args.index("--only") + 1].split(","))
    if "--models" in args:
        models = args[args.index("--models") + 1].split(",")
    tasks = [
        (j, m)
        for j in jobs
        if not only or j["id"] in only
        for m in (models or j.get("models", ["gemini"]))
    ]
    with ThreadPoolExecutor(max_workers=6) as pool:
        for line in pool.map(lambda t: run(*t), tasks):
            print(line, flush=True)


if __name__ == "__main__":
    main()
