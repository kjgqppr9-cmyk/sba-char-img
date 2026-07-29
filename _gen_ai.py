# -*- coding: utf-8 -*-
"""AI 섹션 강조박스용 이미지 (딥그린 배경)"""
import os, sys, io, base64, json, time, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
KEY = os.environ.get("OPENAI_API_KEY")
OUT = os.path.dirname(os.path.abspath(__file__))

PROMPT = (
    "A cinematic wide scene on a DEEP EMERALD GREEN background (#00543A to #00754A gradient). "
    "On the RIGHT side: a friendly rounded 3D clay small-business owner wearing a cream shirt and "
    "brown apron, sitting at a small clay desk with an open laptop, smiling gently, with soft glowing "
    "amber-gold sparkles and a few small floating hexagon particles rising from the laptop screen, "
    "plus a tiny green sprout in a pot on the desk. The LEFT HALF of the frame is calm, darker emerald "
    "and completely empty - reserved for a text overlay. Warm rim lighting on the character. "
    "soft 3D claymorphism, tactile matte clay surfaces, smooth soft studio lighting, soft long shadows, "
    "rich deep emerald tones with warm amber glow accents, premium editorial, 8k, polished. "
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
tmp = os.path.join(OUT, "_tmp_ai.png")
open(tmp, "wb").write(raw)
from PIL import Image
Image.open(tmp).convert("RGB").save(os.path.join(OUT, "main-ai-hl.jpg"), "JPEG",
                                    quality=88, optimize=True, progressive=True)
os.remove(tmp)
print("OK main-ai-hl.jpg %.0fs" % (time.time() - t0))
