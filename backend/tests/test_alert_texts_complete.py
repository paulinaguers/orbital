# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Completeness check for docs/content/alert_texts.md.
Control de completitud de docs/content/alert_texts.md.

Why: on 14/11 the committed file lost its last sections (7a, 7b, Symptoms,
Sources) and nobody noticed. Then GitHub broke the index links to SpO₂ and CO₂,
because it drops the "₂" when it builds a heading's anchor. Each section now
has an explicit anchor, <a id="...">, and these tests check it.
Por qué: el 14/11 el archivo commiteado perdió sus últimas secciones (7a, 7b,
Síntomas, Fuentes) y nadie lo notó. Después GitHub rompió los enlaces del índice a SpO₂ y CO₂, porque saca
el "₂" al armar el ancla del título. Ahora cada sección tiene un ancla
explícita, <a id="...">, y estos tests la controlan.
"""

import re
from pathlib import Path

# Path to the file, built from this test's location so it works from any folder.
# Ruta al archivo, armada desde la ubicación de este test para que ande desde cualquier carpeta.
ALERT_TEXTS = Path(__file__).resolve().parents[2] / "docs" / "content" / "alert_texts.md"

# An anchor line looks exactly like: <a id="2b-spo2"></a>
# Una línea de ancla es exactamente así: <a id="2b-spo2"></a>
ANCHOR_LINE = re.compile(r'^<a id="([^"]+)"></a>$')


def read_lines():
    """Returns the file as a list of lines. / Devuelve el archivo como lista de líneas."""
    return ALERT_TEXTS.read_text(encoding="utf-8").splitlines()


def read_anchor_ids(lines):
    """Returns the ids of every <a id="..."></a> line, in file order.
    Devuelve los ids de cada línea <a id="..."></a>, en el orden del archivo.
    """
    anchor_ids = []
    for line in lines:
        match = ANCHOR_LINE.match(line)
        if match:
            anchor_ids.append(match.group(1))
    return anchor_ids


def read_index_links(lines):
    """Returns every in-file link target, like "2b-spo2" from "](#2b-spo2)".
    Today they are all in the index table.
    Devuelve el destino de cada enlace interno. Hoy están todos en el índice.
    """
    # The pattern reads: "](#", then the target (anything up to ")"), then ")".
    # El patrón se lee: "](#", después el destino (todo hasta ")"), después ")".
    return re.findall(r"\]\(#([^)]+)\)", "\n".join(lines))


def test_every_index_link_has_an_explicit_anchor():
    """Every index link points to an <a id="..."> that exists in the file.
    Cada enlace del índice apunta a un <a id="..."> que existe en el archivo.
    """
    lines = read_lines()
    anchor_ids = set(read_anchor_ids(lines))
    links = read_index_links(lines)
    assert links, "The index has no links"  # an empty index would pass otherwise
    missing = [target for target in links if target not in anchor_ids]
    assert missing == [], f"Index links without an anchor: {missing}"


def test_anchor_ids_are_unique_and_plain_ascii():
    """Ids use only lowercase ASCII letters, numbers and hyphens, so GitHub
    keeps them as they are; and no id is used twice.
    Los ids usan solo letras ASCII minúsculas, números y guiones, así GitHub
    los deja como están; y ningún id se repite.
    """
    anchor_ids = read_anchor_ids(read_lines())
    for anchor_id in anchor_ids:
        assert re.fullmatch(r"[a-z0-9-]+", anchor_id), anchor_id
    assert len(anchor_ids) == len(set(anchor_ids))


def test_every_heading_has_an_anchor_right_before_it():
    """Each "## " heading has its anchor two lines above, with a blank line in
    between. The blank line keeps the anchor apart from the heading, which is
    the safest layout across Markdown viewers.
    Cada título "## " tiene su ancla dos líneas arriba, con una línea en
    blanco en el medio. La línea en blanco deja el ancla separada del título:
    es la forma más segura entre distintos visores de Markdown.
    """
    lines = read_lines()
    # index = position in the list, starting at 0 (not the file's line number).
    # index = posición en la lista, empieza en 0 (no es el número de línea).
    for index, line in enumerate(lines):
        if line.startswith("## "):
            assert index >= 2 and ANCHOR_LINE.match(lines[index - 2]), line
            assert lines[index - 1] == "", line


def test_every_anchor_has_a_heading_right_after_it():
    """Each anchor is followed by a blank line and a "## " heading, so an
    anchor left behind by a deleted section is caught.
    Cada ancla va seguida de una línea en blanco y un título "## ": así se
    detecta un ancla que quedó sola después de borrar una sección.
    """
    lines = read_lines()
    for index, line in enumerate(lines):
        if ANCHOR_LINE.match(line):
            assert index + 2 < len(lines), line
            assert lines[index + 1] == "" and lines[index + 2].startswith("## "), line


def test_file_ends_with_sources():
    """The last section of the file is "Sources / Fuentes".
    La última sección del archivo es "Sources / Fuentes".
    """
    headings = [line[3:].strip() for line in read_lines() if line.startswith("## ")]
    assert headings[-1] == "Sources / Fuentes", f"Last heading is: {headings[-1]}"
