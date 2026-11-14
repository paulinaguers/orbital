# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Unit tests for the core rules that the answer key cannot show.
Tests unitarios de reglas del núcleo que la hoja de respuestas no muestra.
"""

from backend.core.baseline import baseline_band, calculate_baseline, calculate_z_score
from backend.core.escalation import NOTIFIED_BY_LEVEL, deviation_level, escalation_for
from backend.core.levels import highest
from backend.core.raw_tests import classify_amsler, count_pvt_lapses


def test_baseline_uses_population_std_dev():
    """Mean and pstdev, as proposed by thread C. / Media y pstdev."""
    assert calculate_baseline([54, 56, 58, 60, 62, 64, 66]) == (60, 4)
    assert calculate_baseline([7.5]) is None


def test_z_score_never_divides_by_zero():
    """A flat baseline (std 0) gives no z. / Una línea base plana no da z."""
    assert calculate_z_score(66, 60, 4) == 1.5
    assert calculate_z_score(7.0, 7.5, 0) is None


def test_baseline_band_is_mean_plus_minus_yellow_cut():
    """Usual range = mean ± 1.5 SD. / Rango habitual = media ± 1,5 DE."""
    assert baseline_band(60, 4) == (54, 66)


def test_deviation_alone_never_reaches_red():
    """Even very large sustained z stays orange. / Aunque z sea enorme, naranja."""
    assert deviation_level("heart_rate", [9.0, 9.0, 9.0]) == "orange"
    assert deviation_level("pvt_lapses", [9.0, 9.0, 9.0]) == "orange"


def test_single_extreme_reading_sets_no_deviation_alert():
    """PROVISIONAL ⚠7: one extreme reading alone stays green.
    PROVISORIO ⚠7: una lectura extrema aislada queda verde.
    """
    assert deviation_level("glucose", [0.1, 0.2, 5.0]) == "green"


def test_pvt_355_ms_counts_as_lapse():
    """PROVISIONAL PVT-355: [354, 355, 356] gives 2 lapses (">=").
    PROVISORIO PVT-355: [354, 355, 356] da 2 lapsos.
    """
    assert count_pvt_lapses([354, 355, 356]) == 2


def test_amsler_categories():
    """Raw marked cells to Amsler categories. / Celdas marcadas a categorías."""
    assert classify_amsler(set(), None) == "no_change"
    assert classify_amsler({(3, 4)}, None) == "change_awaiting_retest"
    assert classify_amsler({(3, 4)}, {(3, 4)}) == "change_confirmed"
    assert classify_amsler({(3, 4), (3, 5)}, {(3, 4)}) == "area_growing"
    assert classify_amsler(set(), {(3, 4)}) == "change_not_repeated"


def test_escalation_follows_team_scheme():
    """Yellow notifies no one; orange the doctors; red adds a crewmate.
    Amarillo no avisa; naranja a los médicos; rojo suma un compañero.
    """
    assert escalation_for("yellow") == []
    assert "Flight surgeon (Earth)" in escalation_for("orange")
    assert "Crewmate on board" in NOTIFIED_BY_LEVEL["red"]


def test_highest_level_wins_and_ignores_missing():
    """The higher level wins; None means no level yet. / Gana el más alto."""
    assert highest("green", "orange", None) == "orange"
    assert highest(None, None) is None
