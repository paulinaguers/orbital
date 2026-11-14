# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Layer 1: fixed clinical thresholds, one function per measurement.
Capa 1: umbrales clínicos fijos, una función por medición.

Every number comes from backend/core/thresholds.py. Ranges are read as
continuous (e.g. heart rate 49.5 is orange, not a gap), and where two levels
share a boundary the higher one wins (PROVISIONAL, conservative choice of
thread A on 14/11, pending team decisions SLEEP-7H and RAD-65).
Cada número sale de thresholds.py. Los rangos se leen continuos (FC 49,5 es
naranja, no un hueco) y donde dos niveles comparten un borde gana el más alto
(PROVISORIO, criterio conservador del hilo A el 14/11; decisiones pendientes
SLEEP-7H y RAD-65).
"""

from backend.core.levels import GREEN, ORANGE, RED, YELLOW
from backend.core.thresholds import THRESHOLDS

# Symptom boxes that count for low blood pressure. PROVISIONAL (open ⚠3).
# Casillas de síntomas que cuentan para presión baja. PROVISORIO (⚠3 abierta).
LOW_BP_SYMPTOMS = ("lightheaded_or_faint", "dizziness")

# Amsler categories to levels (alert_texts.md §6). "Change not repeated" and
# "awaiting retest" are yellow: PROVISIONAL (open ⚠6).
# Categorías de Amsler a niveles. "Cambio no repetido" y "esperando repetir"
# son amarillo: PROVISORIO (⚠6 abierta).
AMSLER_LEVELS = {
    "no_change": GREEN,
    "change_not_repeated": YELLOW,
    "change_awaiting_retest": YELLOW,
    "change_confirmed": ORANGE,
    "sudden_loss_or_distortion": RED,
    "area_growing": RED,
}


def blood_pressure_level(systolic, diastolic, symptoms):
    """Clinical level of a blood pressure reading (AHA; higher category wins).
    Nivel clínico de una presión (AHA; gana la categoría más alta).

    Low pressure (< 90 or < 60) is orange only with a low-BP symptom
    (NHLBI; PROVISIONAL for open decisions ⚠3, ⚠4 and Q2).
    La presión baja es naranja solo con un síntoma de presión baja.
    """
    t = THRESHOLDS["blood_pressure"]
    if systolic > t["red_systolic_above"] or diastolic > t["red_diastolic_above"]:
        return RED
    if systolic >= t["orange_systolic_range"][0] or diastolic >= t["orange_diastolic_range"][0]:
        return ORANGE
    is_low = systolic < t["hypotension_systolic_below"] or diastolic < t["hypotension_diastolic_below"]
    if is_low and any(symptoms.get(name) for name in LOW_BP_SYMPTOMS):
        return ORANGE
    return GREEN


def heart_rate_level(bpm):
    """Clinical level of resting heart rate (AHA, athletic green from 50).
    Nivel clínico de la FC en reposo (AHA, verde desde 50 por perfil atlético).
    """
    t = THRESHOLDS["heart_rate"]
    if bpm < t["red_below"] or bpm > t["red_above"]:
        return RED
    if bpm < t["green_range"][0] or bpm > t["green_range"][1]:
        return ORANGE
    return GREEN


def spo2_level(percent):
    """Clinical level of SpO2 (WHO; Myatt 2017; red at 90 % is a Proposal).
    Nivel clínico de SpO2 (OMS; Myatt 2017; rojo en 90 % es Proposal).
    """
    t = THRESHOLDS["spo2"]
    if percent <= t["red_max"]:
        return RED
    if percent < t["yellow_range"][0]:
        return ORANGE
    if percent < t["green_min"]:
        return YELLOW
    return GREEN


def glucose_level(mg_dl):
    """Clinical level of glucose (ADA). / Nivel clínico de glucosa (ADA)."""
    t = THRESHOLDS["glucose"]
    if mg_dl < t["red_below"] or mg_dl > t["red_above"]:
        return RED
    if mg_dl < t["green_range"][0] or mg_dl > t["green_range"][1]:
        return ORANGE
    return GREEN


def sleep_level(hours, previous_night_hours):
    """Clinical level of last night's sleep (Sleep 2022; cuts: Proposal).
    Nivel clínico del sueño de anoche (Sleep 2022; cortes: Proposal).

    Under 6 h is orange; two nights in a row under 6 h is red. Exactly 7 h
    is yellow (shared boundary, the higher wins: PROVISIONAL, SLEEP-7H).
    Menos de 6 h es naranja; dos noches seguidas es rojo. 7 h exactas es
    amarillo (borde compartido, gana el más alto: PROVISORIO, SLEEP-7H).
    """
    t = THRESHOLDS["sleep_hours"]
    if hours < t["red_below"] and previous_night_hours is not None and previous_night_hours < t["red_below"]:
        return RED
    if hours < t["orange_below"]:
        return ORANGE
    if hours <= t["yellow_range"][1]:
        return YELLOW
    return GREEN


def cabin_co2_level(avg_7d, avg_1h_max, headache):
    """Clinical level of cabin CO2 (NASA-STD-3001; symptom cut: Proposal).
    Nivel clínico del CO2 de cabina (NASA-STD-3001; corte por síntomas: Proposal).

    Red uses the highest 1-hour average of the day; yellow and orange use the
    7-day average (PROVISIONAL, open decision Q3).
    El rojo usa el mayor promedio de 1 hora del día; amarillo y naranja usan
    el promedio de 7 días (PROVISORIO, decisión Q3 abierta).
    """
    t = THRESHOLDS["cabin_co2"]
    if avg_1h_max > t["red_above"]:
        return RED
    if avg_7d >= t["yellow_range"][0]:
        return ORANGE if headache else YELLOW
    return GREEN


def radiation_level(cumulative_msv, solar_particle_event):
    """Clinical level of cumulative radiation, as % of the career limit.
    Nivel clínico de la radiación acumulada, como % del límite de carrera.

    Limits: NASA-STD-3001; percentages: Proposal. A solar storm in progress
    is red. Exactly 65 % is orange (the higher wins: PROVISIONAL, RAD-65).
    Límites: NASA-STD-3001; porcentajes: Proposal. Tormenta solar = rojo.
    65 % exacto es naranja (gana el más alto: PROVISORIO, RAD-65).
    """
    t = THRESHOLDS["radiation_dose"]
    percent = 100 * cumulative_msv / t["career_limit_msv"]
    if solar_particle_event or percent > t["red_above_pct"]:
        return RED
    if percent >= t["orange_range_pct"][0]:
        return ORANGE
    if percent >= t["yellow_range_pct"][0]:
        return YELLOW
    return GREEN


def amsler_level(category):
    """Clinical level of an Amsler grid result category (all Proposal).
    Nivel clínico de una categoría de resultado de Amsler (todo Proposal).
    """
    return AMSLER_LEVELS[category]
