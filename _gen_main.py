# -*- coding: utf-8 -*-
"""메인 페이지 AI 이미지 생성 (gpt-image-2, high quality)"""
import os, sys, io, base64, json, time, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
KEY = os.environ.get("OPENAI_API_KEY")
OUT = os.path.dirname(os.path.abspath(__file__))

STYLE = ("soft 3D claymorphism illustration, tactile matte clay surfaces, gently rounded forms, "
         "smooth soft studio lighting, soft long shadows, subtle depth of field, "
         "warm ivory-cream background (#F2F0EB), deep emerald green (#006241) primary, "
         "warm amber-gold (#F5A623) accent, premium editorial quality, 8k, crisp, polished. "
         "Absolutely NO text, NO letters, NO numbers, NO words, NO logos anywhere in the image.")

JOBS = [
    # (filename, size, prompt)
    ("main-hero-pc.jpg", "1536x1024",
     "Wide hero key visual for a Korean small-business growth consultancy. "
     "LEFT 45% of the frame is calm empty cream space reserved for a headline (keep it clear and uncluttered). "
     "RIGHT side: a warm clay scene of a friendly small-business owner standing confidently beside a large "
     "glowing hexagon made of six connected soft-clay facets, each facet a slightly different pastel tone "
     "(emerald, amber, indigo, pink, red, navy), with a small green sprout and a gentle upward growth arrow "
     "rising from the hexagon. Hopeful, warm, reassuring, premium. " + STYLE),

    ("main-hero-mobile.jpg", "1024x1536",
     "Vertical hero key visual for a Korean small-business growth consultancy. "
     "TOP 45% is calm empty cream space reserved for a headline (keep clear). "
     "BOTTOM: a warm clay scene of a friendly small-business owner beside a large glowing six-facet hexagon "
     "in pastel tones (emerald, amber, indigo, pink, red, navy), with a green sprout and upward growth arrow. "
     "Hopeful, warm, premium. " + STYLE),

    ("main-diag.jpg", "1536x1024",
     "A clay-style smartphone floating at a slight angle, its screen showing an abstract six-sided radar "
     "(hexagon) chart glowing softly in emerald green with amber highlights - shown as pure shapes and "
     "lines only, no readable text. Around the phone, six small floating clay hexagon tokens in pastel tones. "
     "Calm cream background with generous empty space on the left. Diagnostic, insightful, premium. " + STYLE),

    ("main-svc-consulting.jpg", "1536x1024",
     "Two friendly clay figures sitting across a small round table in a warm one-on-one consulting moment, "
     "one listening attentively, a soft emerald document and a small potted sprout on the table. "
     "Intimate, reassuring, human. Centered composition. " + STYLE),

    ("main-svc-lecture.jpg", "1536x1024",
     "A cozy clay-style small classroom scene: three rounded clay adult learners at desks with open laptops, "
     "facing a soft emerald presentation board showing abstract shapes only (no text), warm amber desk lamps. "
     "Practical, hands-on, encouraging. Centered composition. " + STYLE),

    ("main-svc-youtube.jpg", "1536x1024",
     "A clay-style content creation desk: a rounded clay camera on a tripod, a soft red rounded play-button "
     "shape floating above, a laptop and small studio light, a green sprout in a pot beside them. "
     "Friendly, creative, approachable. Centered composition. " + STYLE),

    ("main-cta.jpg", "1536x1024",
     "An atmospheric wide background in deep emerald green: a large softly glowing clay hexagon at the "
     "center-right made of six facets, with gentle light rays and small floating hexagon particles, "
     "and a subtle green sprout silhouette. The LEFT and CENTER are calm and darker, reserved for a "
     "headline overlay. Rich, cinematic, premium, dark emerald tones with warm amber glow accents. "
     "soft 3D claymorphism, smooth lighting, 8k, polished. "
     "Absolutely NO text, NO letters, NO numbers, NO words, NO logos anywhere."),
]


def gen(fname, size, prompt):
    body = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": size,
        "quality": "high",
        "n": 1,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"},
    )
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        res = json.load(r)
    b64 = res["data"][0]["b64_json"]
    raw = base64.b64decode(b64)
    tmp = os.path.join(OUT, "_tmp.png")
    open(tmp, "wb").write(raw)
    from PIL import Image
    im = Image.open(tmp).convert("RGB")
    path = os.path.join(OUT, fname)
    im.save(path, "JPEG", quality=88, optimize=True, progressive=True)
    os.remove(tmp)
    print("OK  %-26s %s  %.0fs  %dKB" % (fname, size, time.time() - t0, os.path.getsize(path) // 1024))


def main():
    if not KEY:
        print("NO KEY"); return
    only = sys.argv[1:] if len(sys.argv) > 1 else None
    for fname, size, prompt in JOBS:
        if only and fname not in only:
            continue
        try:
            gen(fname, size, prompt)
        except Exception as e:
            print("FAIL %-26s %s" % (fname, e))
    print("done")


if __name__ == "__main__":
    main()
