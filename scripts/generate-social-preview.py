#!/usr/bin/env python3
"""Generate the deterministic TARMAC Foundation v0.1.0 social preview."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "brand" / "social-preview.png"
WIDTH, HEIGHT = 1280, 640

NIGHT = "#07111f"
DECK = "#0d1b2a"
PANEL = "#12263a"
RUNWAY = "#f4f1e8"
MIST = "#a9b7c6"
SIGNAL = "#5eead4"
BEACON = "#f5b942"
SKY = "#7dd3fc"

FONT_CANDIDATES = [
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
FONT_BOLD_CANDIDATES = [
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def font(size: int, bold: bool = False):
    candidates = FONT_BOLD_CANDIDATES if bold else FONT_CANDIDATES
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


image = Image.new("RGB", (WIDTH, HEIGHT), NIGHT)
draw = ImageDraw.Draw(image)

# Aligned operating grid.
for x in range(0, WIDTH, 64):
    draw.line((x, 0, x, HEIGHT), fill="#0c2133", width=1)
for y in range(0, HEIGHT, 64):
    draw.line((0, y, WIDTH, y), fill="#0c2133", width=1)

# TARMAC mark.
draw.rounded_rectangle((72, 64, 136, 128), radius=14, fill=DECK, outline=SIGNAL, width=2)
draw.line((104, 72, 104, 120), fill=SIGNAL, width=2)
draw.line((80, 96, 128, 96), fill=SIGNAL, width=2)
t_font = font(30, bold=True)
t_box = draw.textbbox((0, 0), "T", font=t_font)
tw, th = t_box[2] - t_box[0], t_box[3] - t_box[1]
draw.rectangle((104 - tw / 2 - 4, 96 - th / 2 - 5, 104 + tw / 2 + 4, 96 + th / 2 + 5), fill=DECK)
draw.text((104 - tw / 2, 96 - th / 2 - 5), "T", fill=RUNWAY, font=t_font)

draw.text((158, 76), "TARMAC", fill=RUNWAY, font=font(34, bold=True))
draw.text((158, 111), "FOUNDATION v0.1.0", fill=SIGNAL, font=font(13, bold=True))

draw.text((72, 190), "THE ENTERPRISE", fill=MIST, font=font(22, bold=True))
draw.text((72, 222), "DELIVERY CONTROL PLANE", fill=RUNWAY, font=font(55, bold=True))
draw.text((72, 296), "From idea to impact. Governed by design.", fill=SIGNAL, font=font(25, bold=True))

# Delivery spine.
line_y = 414
stage_x = [100, 372, 644, 916]
labels = ["TRIAGE", "ARCHITECTURE", "RELEASE", "MONITORING"]
letters = ["T", "A", "R", "M"]
draw.line((stage_x[0], line_y, stage_x[-1], line_y), fill=SIGNAL, width=4)
for x, label, letter in zip(stage_x, labels, letters):
    draw.ellipse((x - 13, line_y - 13, x + 13, line_y + 13), fill=SIGNAL, outline=NIGHT, width=4)
    draw.text((x - 4, line_y - 7), letter, fill=NIGHT, font=font(12, bold=True))
    label_box = draw.textbbox((0, 0), label, font=font(16, bold=True))
    draw.text((x - (label_box[2] - label_box[0]) / 2, line_y + 28), label, fill=RUNWAY, font=font(16, bold=True))
draw.arc((70, 368, 1010, 525), start=5, end=175, fill="#2b5368", width=2)

# Cross-cutting capability strip.
draw.rounded_rectangle((72, 510, 1208, 584), radius=16, fill=PANEL, outline="#23435b", width=1)
draw.rounded_rectangle((92, 528, 124, 560), radius=8, fill="#103c4a", outline=SKY, width=1)
draw.text((103, 535), "A", fill=SKY, font=font(16, bold=True))
draw.text((142, 527), "AUTOMATION & CI/CD", fill=SKY, font=font(17, bold=True))
draw.text((142, 551), "accelerates and evidences every pillar", fill=MIST, font=font(13))

draw.line((630, 526, 630, 568), fill="#315066", width=1)
draw.rounded_rectangle((662, 528, 694, 560), radius=8, fill="#3b2b0d", outline=BEACON, width=1)
draw.text((673, 535), "C", fill=BEACON, font=font(16, bold=True))
draw.text((712, 527), "COMPLIANCE & GOVERNANCE", fill=BEACON, font=font(17, bold=True))
draw.text((712, 551), "controls and assures every pillar", fill=MIST, font=font(13))

draw.text((1055, 616), "ALL RIGHTS RESERVED", fill="#6e8193", font=font(11, bold=True))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, format="PNG", optimize=True)
print(f"Generated {OUTPUT} ({WIDTH}x{HEIGHT})")
