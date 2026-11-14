# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Reads the on-screen texts from docs/content/alert_texts.md (thread C).
Lee los textos de pantalla desde docs/content/alert_texts.md (hilo C).

That file is the single source of truth for what the astronaut sees; the core
never rewrites those texts. Only the English line (before "<br>") is used.
Ese archivo es la única fuente de lo que ve el astronauta; el núcleo nunca
reescribe esos textos. Solo se usa la línea en inglés (antes de "<br>").
"""

import re
from pathlib import Path

ALERT_TEXTS = Path(__file__).resolve().parents[2] / "docs" / "content" / "alert_texts.md"

# Core measurement -> anchor of its section in alert_texts.md.
# Medición del núcleo -> ancla de su sección en alert_texts.md.
SECTIONS = {
    "blood_pressure": "1-blood-pressure", "heart_rate": "2a-heart-rate", "spo2": "2b-spo2",
    "glucose": "3-glucose", "sleep_hours": "4-sleep", "mood_score": "5a-mood",
    "pvt_lapses": "5b-pvt", "vision_amsler": "6-vision", "cabin_co2": "7a-co2",
    "radiation_dose": "7b-radiation",
}
EMOJI_LEVELS = {"🟢": "green", "🟡": "yellow", "🟠": "orange", "🔴": "red"}
ANCHOR = re.compile(r'^<a id="([^"]+)"></a>$')
# Split a table row on "|" but not on an escaped "\|".
# Parte una fila de tabla en "|" pero no en "\|" escapado.
CELL_SPLIT = re.compile(r"(?<!\\)\|")


def english(cell):
    """English part of a bilingual cell (text before the first <br>).
    Parte en inglés de una celda bilingüe (texto antes del primer <br>).
    """
    return cell.split("<br>")[0].strip()


def read_texts(path=ALERT_TEXTS):
    """{measurement: {level: (astronaut_sees, recommendation)}}, first row per level.
    {medición: {nivel: (lo que ve, recomendación)}}, primera fila por nivel.
    """
    by_anchor, current = {}, None
    for line in path.read_text(encoding="utf-8").splitlines():
        match = ANCHOR.match(line)
        if match:
            current = match.group(1)
            continue
        cells = [cell.strip() for cell in CELL_SPLIT.split(line)]
        if current and len(cells) >= 6 and cells[1] in EMOJI_LEVELS:
            level = EMOJI_LEVELS[cells[1]]
            by_anchor.setdefault(current, {}).setdefault(level, (english(cells[3]), english(cells[4])))
    return {m: by_anchor.get(anchor, {}) for m, anchor in SECTIONS.items()}
