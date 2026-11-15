# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Unit tests for the core rules that the answer key cannot show.
Tests unitarios de reglas del núcleo que la hoja de respuestas no muestra.
"""

from backend.core.baseline import baseline_band, calculate_baseline, calculate_z_score
from backend.core.escalation import NOTIFIED_BY_LEVEL, deviation_level, escalation_for
from backend.core.levels import highest
from backend.core.escalation import field_value
from backend.core.raw_tests import classify_amsler, count_pvt_lapses, score_pvt_session


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


def flat_days(field, baseline_values, later_value):
    """Days 1-12 where `field` takes the given baseline values on days 4-10.
    Días 1-12 donde `field` toma los valores de línea base dados en 4-10.
    """
    days = []
    for d in range(1, 13):
        value = baseline_values[d - 4] if 4 <= d <= 10 and d - 4 < len(baseline_values) else None
        if d > 10:
            value = later_value
        days.append({"flight_day": d, field: value})
    return days


def test_flat_baseline_is_not_evaluable_never_green():
    """No spread in the baseline: mood is 'not_evaluable', not green.
    Línea base sin variación: el ánimo es 'not_evaluable', no verde.
    """
    from backend.core.escalation import evaluate_timeline
    results = evaluate_timeline(flat_days("mood_score", [2] * 7, 2))
    assert results[-1]["final"]["mood_score"] == "not_evaluable"


def test_too_few_baseline_days_is_not_evaluable():
    """Only 4 of 7 baseline days measured (< 5): not evaluable.
    Solo 4 de 7 días medidos (< 5): no evaluable.
    """
    from backend.core.escalation import evaluate_timeline
    results = evaluate_timeline(flat_days("stress_score", [1, 3, 5, 2], 3))
    assert results[-1]["final"]["stress_score"] == "not_evaluable"


def test_clinical_layer_still_works_without_baseline():
    """Heart rate without a usable baseline keeps its clinical level and says so.
    FC sin línea base utilizable mantiene su nivel clínico y lo indica.
    """
    from backend.core.escalation import evaluate_timeline
    results = evaluate_timeline(flat_days("heart_rate", [60] * 7, 125))
    assert results[-1]["final"]["heart_rate"] == "red"
    assert results[-1]["baseline_available"]["heart_rate"] is False


def test_cumulative_radiation_reaches_orange_at_most():
    """Team decision 14/11: cumulative dose max orange; red only for a solar storm.
    Decisión 14/11: dosis acumulada máximo naranja; rojo solo por tormenta solar.
    """
    from backend.core.clinical import radiation_level
    assert radiation_level(390.0, False) == "orange"
    assert radiation_level(590.0, False) == "orange"
    assert radiation_level(20.0, True) == "red"
    assert radiation_level(299.9, False) == "green"


def test_pvt_omissions_count_as_lapses():
    """2 slow + 3 unanswered of 10 stimuli = 5 lapses, rate 0.5.
    2 lentas + 3 sin respuesta de 10 estímulos = 5 lapsos, tasa 0,5.
    """
    score = score_pvt_session([300] * 5 + [400, 500], 10)
    assert (score["lapses"], score["omissions"], score["lapse_rate"], score["valid"]) == (5, 3, 0.5, True)
    assert score_pvt_session([300, 300], 4)["valid"] is False


def test_pvt_is_compared_per_reference_session():
    """6 lapses in 30 stimuli count like 3 in a 15-stimulus session.
    6 lapsos en 30 estímulos cuentan como 3 en una sesión de 15.
    """
    assert field_value({"pvt_lapses": 6, "pvt_stimuli": 30}, "pvt_lapses_per_reference") == 3
    assert field_value({"pvt_lapses": 5}, "pvt_lapses_per_reference") == 5


def test_amsler_needs_the_same_area_to_confirm():
    """Distortion in a different area waits for a retest; overlap confirms.
    Una distorsión en otra zona espera un nuevo test; si se superpone, se confirma.
    """
    assert classify_amsler({(1, 1)}, {(9, 9)}) == "change_awaiting_retest"
    assert classify_amsler({(9, 9)}, {(9, 9)}) == "change_confirmed"
    assert classify_amsler(set(), set(), sudden_change=True) == "sudden_loss_or_distortion"
