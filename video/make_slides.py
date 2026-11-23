#!/usr/bin/env python3
"""Briefly demo video slides — 1280x720 dark cards, PIL (adapted from Chimera)."""
from PIL import Image, ImageDraw, ImageFont
import os

D = "/home/hatch/workspace/hybridai/video"
BG = (11, 18, 32)
PANEL = (21, 32, 56)
ACCENT = (34, 211, 238)
GREEN = (52, 211, 153)
WHITE = (240, 244, 248)
MUTED = (148, 163, 184)
GOLD = (255, 209, 102)
PURPLE = (192, 132, 252)

FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def font(p, s):
    return ImageFont.truetype(p, s)

def base():
    img = Image.new("RGB", (1280, 720), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 1280, 6], fill=ACCENT)
    d.rectangle([0, 714, 1280, 720], fill=ACCENT)
    return img, d

def kicker(d, text, y=64):
    d.text((80, y), text, font=font(FB, 26), fill=ACCENT)

def headline(d, text, y=110, size=54):
    d.text((80, y), text, font=font(FB, size), fill=WHITE)

def panel(d, box, fill=PANEL):
    d.rounded_rectangle(box, radius=16, fill=fill)

def save(img, name):
    p = os.path.join(D, name)
    img.save(p)
    print("wrote", p)

# ---- 1. Title ----
img, d = base()
d.text((80, 170), "BRIEFLY", font=font(FB, 120), fill=WHITE)
d.text((82, 310), "Messy notes in, structured brief out.",
       font=font(FR, 38), fill=ACCENT)
d.text((82, 380), "Short notes run on-device. Long notes fall back",
       font=font(FR, 32), fill=MUTED)
d.text((82, 425), "to the cloud. One SDK decides the path.",
       font=font(FR, 32), fill=MUTED)
d.text((82, 540), "#BuildHybridAI 2026  ·  Best Web",
       font=font(FR, 28), fill=GOLD)
save(img, "slide-01-title.png")

# ---- 5. Hybrid routing ----
img, d = base()
kicker(d, "HYBRID INFERENCE")
headline(d, "One SDK, two paths")
rows = [
    ("ON-DEVICE", "Short notes (≤ 600 words) → Gemini Nano in Chrome", GREEN),
    ("CLOUD", "Long notes → Gemini in the cloud, same JSON schema", PURPLE),
    ("BADGE", "Every result names the path that actually ran", ACCENT),
    ("PRIVATE", "Quick notes never leave your device — free & offline", WHITE),
]
y = 230
for tag, desc, col in rows:
    panel(d, [80, y, 1200, y + 92])
    d.text((110, y + 28), tag, font=font(FB, 30), fill=col)
    d.text((330, y + 30), desc, font=font(FR, 26), fill=WHITE)
    y += 112
save(img, "slide-05-hybrid.png")

# ---- 6. How it's built ----
img, d = base()
kicker(d, "HOW IT'S BUILT")
headline(d, "Firebase AI Logic, for real")
rows = [
    ("SDK", "firebase@13 — getAI + GoogleAIBackend", ACCENT),
    ("MODE", "getGenerativeModel, PREFER_ON_DEVICE", GREEN),
    ("INIT", "initializeDeviceModel() on click, before generate", GOLD),
    ("PROOF", "inferenceSource read from the response", WHITE),
]
y = 230
for tag, desc, col in rows:
    panel(d, [80, y, 1200, y + 92])
    d.text((110, y + 28), tag, font=font(FB, 30), fill=col)
    d.text((330, y + 30), desc, font=font(FR, 26), fill=WHITE)
    y += 112
save(img, "slide-06-built.png")

# ---- 7. Close ----
img, d = base()
d.text((80, 220), "Briefly", font=font(FB, 96), fill=WHITE)
d.text((82, 350), "Messy notes in,",
       font=font(FR, 34), fill=ACCENT)
d.text((82, 395), "structured brief out.",
       font=font(FR, 34), fill=ACCENT)
d.text((82, 520), "github.com/nmhl21/briefly",
       font=font(FB, 32), fill=WHITE)
d.text((82, 570), "#BuildHybridAI 2026 — Best Web",
       font=font(FR, 26), fill=MUTED)
save(img, "slide-07-close.png")
