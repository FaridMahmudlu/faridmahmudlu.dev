"""
Builds static TTF instances of the variable web fonts for OG-image rendering
(Satori cannot read WOFF2 or variable axes). Run once after changing fonts:

    python scripts/make-og-fonts.py
"""
import tempfile
from pathlib import Path

from fontTools.merge import Merger
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
FILES = ROOT / "node_modules" / "@fontsource-variable"
OUT = ROOT / "src" / "assets" / "og-fonts"
OUT.mkdir(parents=True, exist_ok=True)

JOBS = [
    ("archivo", "archivo-{subset}-wdth-normal.woff2", {"wdth": 112, "wght": 640}, "Archivo-Display"),
    ("archivo", "archivo-{subset}-wdth-normal.woff2", {"wdth": 100, "wght": 400}, "Archivo-Text"),
    ("martian-mono", "martian-mono-{subset}-wdth-normal.woff2", {"wdth": 87.5, "wght": 400}, "MartianMono"),
]

# Satori picks one font per family/weight and does not fall back across
# subset files, so latin and latin-ext are merged into a single TTF.
with tempfile.TemporaryDirectory() as tmp:
    for package, pattern, axes, name in JOBS:
        parts = []
        for subset in ("latin", "latin-ext"):
            src = FILES / package / "files" / pattern.format(subset=subset)
            static = instantiateVariableFont(TTFont(src), axes, updateFontNames=False)
            static.flavor = None
            part = Path(tmp) / f"{name}-{subset}.ttf"
            static.save(part)
            parts.append(str(part))
        merged = Merger().merge(parts)
        target = OUT / f"{name}.ttf"
        merged.save(target)
        print(f"{target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB")

for stale in OUT.glob("*-latin*.ttf"):
    stale.unlink()
