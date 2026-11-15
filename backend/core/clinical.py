# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Layer 1: fixed clinical thresholds, one function per measurement.

Every number comes from backend/core/thresholds.py. Ranges are read as
continuous (e.g. heart rate 49.5 is orange, not a gap), and where two levels
share a boundary the higher one wins (PROVISIONAL, conservative choice of
thread A on 14/11, pending team decision SLEEP-7H). Radiation at exactly 65 %
is orange.
"""

from backend.core.levels import GREEN, ORANGE, RED, YELLOW
from backend.core.thresholds import THRESHOLDS

# Symptom boxes that count for low blood pressure. PROVISIONAL (open ⚠3).
LOW_BP_SYMPTOMS = ("lightheaded_or_faint", "dizziness")

# Amsler categories to levels (alert_texts.md §6). "Change not repeated" and
# "awaiting retest" are yellow: PROVISIONAL (open ⚠6).
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

    Low pressure (< 90 or < 60) is orange only with a low-BP symptom
    (NHLBI; PROVISIONAL for open decisions ⚠3, ⚠4 and Q2).
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
    """
    t = THRESHOLDS["heart_rate"]
    if bpm < t["red_below"] or bpm > t["red_above"]:
        return RED
    if bpm < t["green_range"][0] or bpm > t["green_range"][1]:
        return ORANGE
    return GREEN


def spo2_level(percent):
    """Clinical level of SpO2 (WHO; Myatt 2017; red at 90 % is a Proposal).
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
    """Clinical level of glucose (ADA)."""
    t = THRESHOLDS["glucose"]
    if mg_dl < t["red_below"] or mg_dl > t["red_above"]:
        return RED
    if mg_dl < t["green_range"][0] or mg_dl > t["green_range"][1]:
        return ORANGE
    return GREEN


def sleep_level(hours, previous_night_hours):
    """Clinical level of last night's sleep (Sleep 2022; cuts: Proposal).

    Under 6 h is orange; two nights in a row under 6 h is red. Exactly 7 h
    is yellow (shared boundary, the higher wins: PROVISIONAL, SLEEP-7H).
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

    Red uses the highest 1-hour average of the day; yellow and orange use the
    7-day average (PROVISIONAL, open decision Q3).
    """
    t = THRESHOLDS["cabin_co2"]
    if avg_1h_max > t["red_above"]:
        return RED
    if avg_7d >= t["yellow_range"][0]:
        return ORANGE if headache else YELLOW
    return GREEN


def radiation_level(cumulative_msv, solar_particle_event):
    """Level of radiation: long-term exposure tracking plus solar storms.

    Limits: NASA-STD-3001; percentages: Proposal. The cumulative dose (as % of
    the career limit) reaches orange at most; red only for a solar particle
    event in progress (team decision 14/11, PROVISIONAL).
    """
    t = THRESHOLDS["radiation_dose"]
    if solar_particle_event:
        return RED
    percent = 100 * cumulative_msv / t["career_limit_msv"]
    if percent >= t["orange_from_pct"]:
        return ORANGE
    if percent >= t["yellow_range_pct"][0]:
        return YELLOW
    return GREEN


def amsler_level(category):
    """Clinical level of an Amsler grid result category (all Proposal).
    """
    return AMSLER_LEVELS[category]
