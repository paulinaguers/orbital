# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Completeness check for docs/content/alert_texts.md.
Control de completitud de docs/content/alert_texts.md.

Why: on 14/11 the committed file lost its last sections (7a, 7b, Symptoms,
Sources) and nobody noticed. These tests catch that kind of cut.
Por qué: el 14/11 el archivo commiteado perdió sus últimas secciones (7a, 7b,
Síntomas, Fuentes) y nadie lo notó. Estos tests detectan ese tipo de corte.
"""

import re
from pathlib import Path

# Path to the file, built from this test's location so it works from any folder.
# Ruta al archivo, armada desde la ubicación de este test para que ande desde cualquier carpeta.
ALERT_TEXTS = Path(__file__).resolve().parents[2] / "docs" / "content" / "alert_texts.md"


def make_anchor(heading):
    """Turns a Markdown heading into its GitHub link anchor.
    Convierte un título de Markdown en el ancla de enlace de GitHub.

    Example / Ejemplo: "1. Blood pressure / Presión arterial"
    -> "1-blood-pressure--presión-arterial"
    """
    text = heading.strip().lower()
    # GitHub drops punctuation and turns each space into a hyphen.
    # GitHub saca la puntuación y cambia cada espacio por un guion.
    text = re.sub(r"[^\w\- ]", "", text)
    return text.replace(" ", "-")


def read_headings(text):
    """Returns the level-2 headings ("## ...") in file order.
    Devuelve los títulos de nivel 2 ("## ...") en el orden del archivo.
    """
    return [line[3:].strip() for line in text.splitlines() if line.startswith("## ")]


def read_index_anchors(text):
    """Returns every in-file link anchor, like "(#2a-...)". Today they are
    all in the index table.
    Devuelve todas las anclas de enlaces internos, como "(#2a-...)". Hoy
    están todas en la tabla del índice.
    """
    # The pattern reads: "](#", then the anchor (anything up to ")"), then ")".
    # El patrón se lee: "](#", después el ancla (todo hasta ")"), después ")".
    return re.findall(r"\]\(#([^)]+)\)", text)


def test_every_index_link_has_a_heading():
    """Every section linked from the index exists in the file.
    Cada sección enlazada desde el índice existe en el archivo.
    """
    text = ALERT_TEXTS.read_text(encoding="utf-8")
    existing_anchors = {make_anchor(heading) for heading in read_headings(text)}
    missing = [anchor for anchor in read_index_anchors(text) if anchor not in existing_anchors]
    assert missing == [], f"Index links without a heading: {missing}"


def test_file_ends_with_sources():
    """The last section of the file is "Sources / Fuentes".
    La última sección del archivo es "Sources / Fuentes".
    """
    text = ALERT_TEXTS.read_text(encoding="utf-8")
    headings = read_headings(text)
    assert headings[-1] == "Sources / Fuentes", f"Last heading is: {headings[-1]}"
