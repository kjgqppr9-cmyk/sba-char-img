# -*- coding: utf-8 -*-
"""히어로 신규 컨셉 3안 — 육각형 화분 + 새싹 + 상승 화살표 앞치마 (16:9)"""
import os, sys, io, base64, json, time, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
KEY = os.environ.get("OPENAI_API_KEY")
OUT = os.path.dirname(os.path.abspath(__file__))

BASE = (
    "A friendly rounded 3D clay small-business owner with a simple sculpted hairstyle, warm skin tone, "
    "small dot eyes and a gentle confident smile. He wears a cream long-sleeve shirt and a DEEP EMERALD "
    "GREEN apron; on the apron chest there is one simple bold UPWARD-POINTING ARROW symbol in warm "
    "amber-gold, embossed like clay (a clean arrow shape only, not a letter). "
    "He holds a HEXAGONAL clay flower pot. The pot is a clean regular six-sided hexagon and each of its "
    "SIX facets is a different matte clay colour: emerald green, amber gold, indigo blue, pink, red, and "
    "deep navy. From the soil inside the hexagonal pot a healthy small GREEN SPROUT with two rounded "
    "leaves grows upward, glowing softly. "
    "The LEFT 45% of the frame is calm empty cream space reserved for a headline - keep it clear and uncluttered. "
    "soft 3D claymorphism illustration, tactile matte clay surfaces, gently rounded forms, smooth soft studio "
    "lighting, soft long shadows, subtle depth of field, warm ivory-cream background (#F2F0EB), premium "
    "editorial quality, 8k, crisp, polished. "
    "Absolutely NO text, NO letters, NO numbers, NO words, NO logos anywhere in the image."
)

VARIANTS = [
    ("hero3-a.jpg",
     "The owner stands on the RIGHT side of the frame, facing the viewer, holding the hexagonal pot with "
     "BOTH HANDS at chest height, presenting it proudly toward the viewer. Full upper body visible. " + BASE),
    ("hero3-b.jpg",
     "The owner stands on the RIGHT side, turned slightly three-quarter, lifting the hexagonal pot up with "
     "ONE HAND at shoulder height while looking at the sprout with a warm smile. " + BASE),
    ("hero3-c.jpg",
     "The owner is seen from the waist up on the RIGHT side, cradling the hexagonal pot with both hands "
     "close to his body at waist height, looking down at the sprout tenderly. The sprout is slightly larger "
     "and catches the warm light. " + BASE),
]


def gen(fname, prompt):
    body = json.dumps({"model": "gpt-image-1", "prompt": prompt,
                       "size": "1536x1024", "quality": "high", "n": 1}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body,
        headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        res = json.load(r)
    raw = base64.b64decode(res["data"][0]["b64_json"])
    tmp = os.path.join(OUT, "_tmp_h.png")
    open(tmp, "wb").write(raw)
    from PIL import Image
    im = Image.open(tmp).convert("RGB")
    w, h = im.size                      # 1536x1024 (3:2)
    th = int(round(w * 9 / 16))         # 864  → 16:9
    top = int(round((h - th) * 0.42))   # 위쪽을 조금 더 남겨 얼굴이 잘리지 않게
    im = im.crop((0, top, w, top + th))
    im.save(os.path.join(OUT, fname), "JPEG", quality=90, optimize=True, progressive=True)
    os.remove(tmp)
    print("OK  %-14s %dx%d  %.0fs" % (fname, im.size[0], im.size[1], time.time() - t0))


for fname, prompt in VARIANTS:
    try:
        gen(fname, prompt)
    except Exception as e:
        print("FAIL %-14s %s" % (fname, e))
print("done")
