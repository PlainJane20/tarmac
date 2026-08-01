#!/usr/bin/env python3
"""Parse Foundation HTML/XML/JSON and validate workflow/PNG structure without third-party packages."""

import json
import struct
import sys
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
errors = []


class FoundationHTMLParser(HTMLParser):
    pass


try:
    parser = FoundationHTMLParser(convert_charrefs=True)
    parser.feed((ROOT / "site" / "index.html").read_text(encoding="utf-8"))
    parser.close()
except Exception as exc:
    errors.append(f"HTML parse failed: {exc}")

for svg in sorted((ROOT / "architecture" / "svg").glob("*.svg")):
    try:
        root = ElementTree.parse(svg).getroot()
        if not root.tag.endswith("svg"):
            errors.append(f"Unexpected XML root in {svg.relative_to(ROOT)}")
    except ElementTree.ParseError as exc:
        errors.append(f"SVG/XML parse failed for {svg.relative_to(ROOT)}: {exc}")

for json_file in ["package.json", "package-lock.json", "tsconfig.json"]:
    try:
        json.loads((ROOT / json_file).read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"JSON parse failed for {json_file}: {exc}")

for workflow in sorted((ROOT / ".github" / "workflows").glob("*.yml")):
    content = workflow.read_text(encoding="utf-8")
    if "\t" in content:
        errors.append(f"YAML workflow contains a tab: {workflow.relative_to(ROOT)}")
    for key in ["name:", "on:", "jobs:"]:
        if key not in content:
            errors.append(f"YAML workflow missing {key} in {workflow.relative_to(ROOT)}")

preview = ROOT / "brand" / "social-preview.png"
try:
    with preview.open("rb") as stream:
        signature = stream.read(8)
        length, chunk_type = struct.unpack(">I4s", stream.read(8))
        width, height = struct.unpack(">II", stream.read(8))
    if signature != b"\x89PNG\r\n\x1a\n" or chunk_type != b"IHDR" or length != 13:
        errors.append("Social preview is not a valid PNG header.")
    if (width, height) != (1280, 640):
        errors.append(f"Social preview dimensions are {width}x{height}, expected 1280x640.")
except Exception as exc:
    errors.append(f"Social preview validation failed: {exc}")

if errors:
    print("Artifact validation failed:\n" + "\n".join(f"- {error}" for error in errors), file=sys.stderr)
    raise SystemExit(1)

print("Artifacts parsed: HTML, SVG/XML, JSON, workflow structure, and 1280x640 PNG header.")
