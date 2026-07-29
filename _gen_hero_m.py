# -*- coding: utf-8 -*-
"""히어로 C안 모바일(세로) 버전"""
import os, sys, io, base64, json, time, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
KEY = os.environ.get("OPENAI_API_KEY")
OUT = os.path.dirname(os.path.abspath(__file__))

PROMPT = (
    "Vertical composition. The TOP 45% of the frame is calm empty cream space reserved for a headline - "
    "keep it completely clear. In the LOWER half: a friendly rounded 3D clay small-business owner seen "
    "from the waist up, centered, cradling a HEXAGONAL clay flower pot with both hands close to his body, "
    "looking down at the sprout tenderly with a warm gentle smile. "
    "The pot is a clean regular six-sided hexagon and each of its SIX facets is a different matte clay "
    "colour: emerald green, amber gold, indigo blue, pink, red, and deep navy. From the soil inside the "
    "hexagonal pot a healthy GREEN SPROUT with two rounded leaves grows upward, glowing softly and "
    "catching the warm light. "
    "He has a simple sculpted hairstyle, warm skin tone, small dot eyes. He wears a cream long-sleeve "
    "shirt and a DEEP EMERALD GREEN apron; on the apron chest there is one simple bold UPWARD-POINTING "
    "ARROW symbol in warm amber-gold, embossed like clay (a clean arrow shape only, not a letter). "
    "soft 3D claymorphism illustration, tactile matte clay surfaces, gently rounded forms, smooth soft "
    "studio lighting, soft long shadows, warm ivory-cream background (#F2F0EB), premium editorial, 8k, polished. "
    "Absolutely NO text, NO letters, NO numbers, NO words, NO logos anywhere in the image."
)

body = json.dumps({"model": "gpt-image-1", "prompt": PROMPT,
                   "size": "1024x1536", "quality": "high", "n": 1}).encode()
req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body,
    headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
t0 = time.time()
with urllib.request.urlopen(req, timeout=600) as r:
    res = json.load(r)
raw = base64.b64decode(res["data"][0]["b64_json"])
tmp = os.path.join(OUT, "_tmp_hm.png")
open(tmp, "wb").write(raw)
from PIL import Image
Image.open(tmp).convert("RGB").save(os.path.join(OUT, "hero3-c-mobile.jpg"), "JPEG",
                                    quality=90, optimize=True, progressive=True)
os.remove(tmp)
print("OK hero3-c-mobile.jpg %.0fs" % (time.time() - t0))
