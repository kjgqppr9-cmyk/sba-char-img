# -*- coding: utf-8 -*-
"""기관·단체 위탁교육 배너 1장"""
import os, sys, io, base64, json, time, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
KEY = os.environ.get("OPENAI_API_KEY")
OUT = os.path.dirname(os.path.abspath(__file__))

PROMPT = (
    "A warm clay-style seminar room for an institutional training program: a friendly clay instructor "
    "in an emerald green shirt standing beside a large rounded presentation board that shows only "
    "abstract shapes and simple chart forms (absolutely no text), facing five seated clay adult "
    "participants at long wooden tables with notebooks. A subtle rounded podium and warm amber lighting. "
    "Organised, credible, official-but-warm. Centered composition with generous empty space above. "
    "Characters are friendly rounded 3D clay people WITH clearly modelled clothing and hair - shirts, "
    "knitwear and jackets in emerald green, cream and warm brown, simple sculpted hairstyles, warm skin "
    "tones, small dot eyes and gentle smiles. Never naked, never bald monochrome blobs. "
    "soft 3D claymorphism illustration, tactile matte clay surfaces, gently rounded forms, smooth soft "
    "studio lighting, soft long shadows, warm ivory-cream background (#F2F0EB), deep emerald green "
    "(#006241) and warm amber-gold (#F5A623) accents, premium editorial, 8k, polished. "
    "Absolutely NO text, NO letters, NO numbers, NO words, NO logos anywhere in the image."
)

body = json.dumps({"model": "gpt-image-1", "prompt": PROMPT,
                   "size": "1536x1024", "quality": "high", "n": 1}).encode()
req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body,
    headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
t0 = time.time()
with urllib.request.urlopen(req, timeout=600) as r:
    res = json.load(r)
raw = base64.b64decode(res["data"][0]["b64_json"])
tmp = os.path.join(OUT, "_tmp_gov.png")
open(tmp, "wb").write(raw)
from PIL import Image
Image.open(tmp).convert("RGB").save(os.path.join(OUT, "main-svc-gov.jpg"), "JPEG",
                                    quality=88, optimize=True, progressive=True)
os.remove(tmp)
print("OK main-svc-gov.jpg %.0fs" % (time.time() - t0))
