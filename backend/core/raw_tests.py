# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Turns the raw results of the in-app tests into the values the core uses.
Convierte los resultados crudos de los tests de la app en valores del núcleo.

The screen only records raw data (reaction times, marked cells); the core
scores them here. / La pantalla solo guarda datos crudos; el núcleo los
puntúa acá.
"""

from backend.core.thresholds import THRESHOLDS


def count_pvt_lapses(reaction_times_ms):
    """Counts lapses in a brief PVT session (Basner 2011: 355 ms).
    Cuenta los lapsos de una sesión de PVT breve (Basner 2011: 355 ms).

    A response of exactly 355 ms counts as a lapse (">=", as in
    escalas-y-protocolos.md): PROVISIONAL, open decision PVT-355.
    Una respuesta de 355 ms exactos cuenta como lapso (">="): PROVISORIO,
    decisión PVT-355 abierta.
    """
    cut = THRESHOLDS["pvt_lapses"]["lapse_ms_3min"]
    return sum(1 for rt in reaction_times_ms if rt >= cut)


def classify_amsler(today_cells, previous_cells):
    """Category of an Amsler result for one eye, compared with the last test.
    Categoría de un resultado de Amsler de un ojo, comparado con el anterior.

    today_cells / previous_cells: sets of (row, col) marked as distorted;
    previous_cells is None if there is no earlier test.
    Returns a category of alert_texts.md §6 (all Proposal).
    Devuelve una categoría de alert_texts.md §6 (todo Proposal).
    """
    if not today_cells:
        return "no_change" if not previous_cells else "change_not_repeated"
    if not previous_cells:
        return "change_awaiting_retest"
    if len(today_cells) > len(previous_cells) and previous_cells <= today_cells:
        return "area_growing"
    return "change_confirmed"
