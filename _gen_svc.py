# -*- coding: utf-8 -*-
"""서비스 3종 배너 재생성 — 히어로 캐릭터 톤(옷·머리 있는 클레이 인물)에 맞춤"""
import os, sys, io, base64, json, time, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
KEY = os.environ.get("OPENAI_API_KEY")
OUT = os.path.dirname(os.path.abspath(__file__))

CHAR = ("Characters are friendly rounded 3D clay people WITH clearly modelled clothing and hair - "
        "shirts, aprons or knitwear in emerald green, cream and warm brown, simple sculpted hairstyles, "
        "warm skin tones, small dot eyes and gentle smiles (same character style as a premium Korean "
        "clay-illustration brand). Never naked, never bald monochrome blobs. ")

STYLE = ("soft 3D claymorphism illustration, tactile matte clay surfaces, gently rounded forms, "
         "smooth soft studio lighting, soft long shadows, warm ivory-cream background (#F2F0EB), "
         "deep emerald green (#006241) and warm amber-gold (#F5A623) accents, premium editorial, 8k, polished. "
         "Absolutely NO text, NO letters, NO numbers, NO words, NO logos anywhere in the image.")

JOBS = [
    ("main-svc-consulting.jpg",
     "A warm one-on-one business consulting scene: two clay people sitting across a small round cream table, "
     "the consultant in an emerald green shirt leaning in and listening attentively, the small-business owner "
     "in a cream shirt and brown apron talking, a soft emerald notebook and a small potted green sprout on the "
     "table between them. Intimate, reassuring, human. Centered, generous empty space above. " + CHAR + STYLE),

    ("main-svc-lecture.jpg",
     "A cozy small hands-on classroom: three clay adult learners wearing cream and emerald shirts sitting at "
     "warm wooden desks with open laptops, smiling and focused, facing a soft rounded emerald presentation "
     "board displaying only abstract shapes and simple bar-chart forms (absolutely no text). Warm amber light. "
     "Practical, encouraging. Centered, generous empty space above. " + CHAR + STYLE),

    ("main-svc-youtube.jpg",
     "A friendly content-creation corner: one clay creator wearing an emerald green shirt and brown apron "
     "standing beside a rounded clay camera on a tripod, a soft rounded coral-red play-button shape floating "
     "in the air beside them, a small studio light and a potted green sprout. Creative, approachable. "
     "Centered, generous empty space above. " + CHAR + STYLE),
]


def gen(fname, prompt):
    body = json.dumps({"model": "gpt-image-1", "prompt": prompt,
                       "size": "1536x1024", "quality": "high", "n": 1}).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations", data=body,
        headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        res = json.load(r)
    raw = base64.b64decode(res["data"][0]["b64_json"])
    tmp = os.path.join(OUT, "_tmp_svc.png")
    open(tmp, "wb").write(raw)
    from PIL import Image
    Image.open(tmp).convert("RGB").save(os.path.join(OUT, fname), "JPEG",
                                        quality=88, optimize=True, progressive=True)
    os.remove(tmp)
    print("OK  %-26s %.0fs" % (fname, time.time() - t0))


for fname, prompt in JOBS:
    try:
        gen(fname, prompt)
    except Exception as e:
        print("FAIL %-26s %s" % (fname, e))
print("done")
