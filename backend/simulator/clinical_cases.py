# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Hand-written clinical test cases for the simulated test dataset.
Casos de prueba clínicos escritos a mano para el set de datos simulado.

Every value and every expected level here is written by hand from
docs/content/alert_texts.md and the team's `fisiologia-espacial` skill.
Nothing is computed from backend/core/thresholds.py, so this file can be
used to test the core without repeating the core's own logic.
Cada valor y cada nivel esperado se escribe a mano desde alert_texts.md y la
skill. Nada se calcula desde thresholds.py: así este archivo sirve para
probar el núcleo sin repetir su lógica.

SIMULATED DATA - NOT REAL ASTRONAUT DATA.
DATOS SIMULADOS - NO SON DATOS REALES DE ASTRONAUTAS.

Expected levels / Niveles esperados:
- (clinical, final) for each measurement under test.
  (clínico, final) para cada medición que se prueba.
- clinical = level of the fixed clinical layer only; "n/a" for mood and PVT,
  which have no fixed clinical threshold.
  clínico = nivel de la capa clínica fija; "n/a" para ánimo y PVT.
- final = level after the baseline layer too (the higher one wins).
  final = nivel después de sumar la capa de línea base (gana el más alto).
- "PENDING" = depends on an open team decision; the note names it.
  "PENDING" = depende de una decisión pendiente; la nota la nombra.
"""

# ----------------------------------------------------------------------
# Open decisions named in the notes / Decisiones pendientes de las notas
# ----------------------------------------------------------------------
# The ⚠ numbers are the team's list of open decisions, not the numbers inside
# alert_texts.md; the section where each one appears is given in brackets.
# Los números ⚠ son la lista de decisiones del equipo, no la numeración de
# alert_texts.md; entre corchetes, la sección donde aparece cada una.
DECISIONS = {
    "⚠1": "Mood red ('worst 10 % on several days') is not a clinical threshold; this set counts 'several days' inside the current episode, so day 1 of an episode stays firm [alert_texts 5a]",
    "⚠2": "PVT: which skill file rules (umbrales 'more lapses' vs escalas z) and red with symptoms [5b]",
    "⚠3": "Symptoms: which boxes count for low BP and temperature; temperature not in the MVP [Symptoms 1-2]",
    "⚠4": "Blood pressure below 90/60 without symptoms has no level [1, Gap]",
    "⚠5": "Direction of the deviation (only the worse side, or both); only mood, PVT and SpO2 have one-sided texts [Two layers]",
    "⚠6": "Amsler: yellow only for a change not repeated, or every marked change orange [6]",
    "⚠7": "Single extreme reading without sustained deviation [team list, 14/11]",
    "Q1": "'Sustained' is not defined",
    "Q2": "'< 90/60': systolic or diastolic, or both",
    "Q3": "CO2: which average (7-day or 1-hour) yellow and orange use [7a]",
    "Q5": "BP baseline layer: whether a systolic deviation alone is enough, or how the two z-scores combine",
    "RAD-LIMITS": "Radiation: how the 600 mSv career and 250 mSv solar-event limits combine [thresholds.py, radiation]",
    # Q4 (systolic/diastolic AND or OR) was resolved on 14/11 with the ACC/AHA
    # 2017 guideline (and its 2025 AHA/ACC update): the higher category wins.
    # Q4 se resolvió el 14/11 con la guía ACC/AHA 2017 (y su actualización
    # AHA/ACC 2025): gana la categoría más alta.
    "SLEEP-7H": "Sleep at exactly 7 h is both green and yellow",
    "RAD-65": "Radiation at exactly 65 % is both yellow and orange [7b]",
    "PVT-355": "PVT: whether exactly 355 ms is a lapse (>= or >)",
}

# ----------------------------------------------------------------------
# Measurements and their CSV columns / Mediciones y sus columnas
# ----------------------------------------------------------------------
MEASUREMENT_COLUMNS = {
    "blood_pressure": ["blood_pressure_systolic_mmhg", "blood_pressure_diastolic_mmhg"],
    "heart_rate": ["heart_rate_bpm"],
    "spo2": ["spo2_pct"],
    "glucose": ["glucose_mg_dl"],
    "sleep_hours": ["sleep_hours"],
    "mood_vas": ["mood_vas_score"],
    "pvt_lapses": ["pvt_lapses"],
    "vision_amsler": ["vision_amsler"],
    "cabin_co2": ["cabin_co2_7d_avg_mmhg", "cabin_co2_1h_avg_max_mmhg"],
    "radiation_dose": ["radiation_dose_cumulative_msv", "solar_particle_event"],
}

# Mood and PVT have no fixed clinical threshold: clinical level is "n/a".
# Ánimo y PVT no tienen umbral clínico fijo: su nivel clínico es "n/a".
NO_CLINICAL_LAYER = ["mood_vas", "pvt_lapses"]

SYMPTOM_COLUMNS = [
    "symptom_dizziness",
    "symptom_lightheaded_or_faint",
    "symptom_headache",
    "symptom_cold_sore_or_rash",
]

# Sleep, cabin CO2, Amsler and radiation have no baseline (z-score) layer in
# alert_texts.md. Sleep, CO2 and Amsler stay constant on baseline days
# (standard deviation 0); radiation rises every day. Thread A's baseline.py
# must not divide by a standard deviation of 0.
# Sueño, CO2, Amsler y radiación no tienen capa de línea base en alert_texts.md.
# Sueño, CO2 y Amsler quedan constantes en la línea base (desvío 0); la
# radiación sube cada día. El baseline.py del hilo A no tiene que dividir por 0.

# First flight day with a baseline (days 4-10 are the baseline days). Before
# it, mood and PVT have no level at all: final level "n/a".
# Primer día con línea base. Antes, ánimo y PVT no tienen nivel: final "n/a".
FIRST_DAY_WITH_BASELINE = 11

# Value of every column when it is NOT under test: the baseline mean.
# Valor de cada columna cuando NO se prueba: la media de la línea base.
# Radiation is cumulative, so it uses a daily rise instead (see below).
# La radiación es acumulada: usa una suba diaria (ver abajo).
NORMAL_VALUES = {
    "blood_pressure_systolic_mmhg": 110,
    "blood_pressure_diastolic_mmhg": 70,
    "heart_rate_bpm": 60,
    "spo2_pct": 98,
    "glucose_mg_dl": 100,
    "sleep_hours": 7.5,
    "mood_vas_score": 30,
    "pvt_lapses": 4,
    "vision_amsler": "no_change",
    "cabin_co2_7d_avg_mmhg": 2.00,
    "cabin_co2_1h_avg_max_mmhg": 2.00,
    "solar_particle_event": 0,
    "symptom_dizziness": 0,
    "symptom_lightheaded_or_faint": 0,
    "symptom_headache": 0,
    "symptom_cold_sore_or_rash": 0,
}

# Radiation on days that do not test radiation: arbitrary simulated rate,
# not a clinical value. / Radiación en los días que no la prueban: ritmo
# simulado arbitrario, no es un valor clínico.
RADIATION_START_MSV = 10.0
RADIATION_DAILY_MSV = 0.5

# Baseline days 4-10 (7 values each). The seed only shuffles their order.
# Chosen so mean and statistics.pstdev are round numbers (see BASELINE_DESIGN).
# Días de línea base 4-10 (7 valores cada uno). La semilla solo mezcla el
# orden. Elegidos para que la media y statistics.pstdev den números redondos.
BASELINE_DAY_VALUES = {
    "blood_pressure_systolic_mmhg": [104, 106, 108, 110, 112, 114, 116],
    "blood_pressure_diastolic_mmhg": [67, 68, 69, 70, 71, 72, 73],
    "heart_rate_bpm": [54, 56, 58, 60, 62, 64, 66],
    "spo2_pct": [95, 95, 98, 99, 99, 100, 100],
    "glucose_mg_dl": [88, 92, 96, 100, 104, 108, 112],
    "mood_vas_score": [21, 24, 27, 30, 33, 36, 39],
    "pvt_lapses": [1, 2, 3, 4, 5, 6, 7],
}

# (mean, pstdev) that BASELINE_DAY_VALUES must give. Checked by a test.
# (media, pstdev) que tienen que dar los valores de línea base. Lo controla un test.
BASELINE_DESIGN = {
    "blood_pressure_systolic_mmhg": (110, 4),
    "blood_pressure_diastolic_mmhg": (70, 2),
    "heart_rate_bpm": (60, 4),
    "spo2_pct": (98, 2),
    "glucose_mg_dl": (100, 8),
    "mood_vas_score": (30, 6),
    "pvt_lapses": (4, 2),
}


def single(case_id, values, expected, note):
    """Builds a one-day case. / Arma un caso de un día.

    values: columns that change that day, e.g. {"heart_rate_bpm": 39}.
    expected: {measurement: (clinical, final)} for the measurement(s) under test.
    values: columnas que cambian ese día, por ejemplo {"heart_rate_bpm": 39}.
    expected: {medición: (clínico, final)} de la(s) medición(es) que se prueban.
    """
    return {"case_id": case_id, "days": [{"values": values, "expected": expected, "note": note}]}


def sequence(case_id, days):
    """Builds a multi-day case from a list of (values, expected, note).
    Arma un caso de varios días a partir de una lista de (valores, esperado, nota).
    """
    return {
        "case_id": case_id,
        "days": [{"values": v, "expected": e, "note": n} for v, e, n in days],
    }


def bp(systolic, diastolic, **symptoms):
    """Blood pressure values plus optional symptom boxes (set to 1).
    Valores de presión más casillas de síntomas opcionales (en 1).
    """
    values = {"blood_pressure_systolic_mmhg": systolic, "blood_pressure_diastolic_mmhg": diastolic}
    for name, ticked in symptoms.items():
        if ticked:
            values["symptom_" + name] = 1
    return values


# ----------------------------------------------------------------------
# Flight days 1-3: no baseline yet / Días 1-3: todavía sin línea base
# ----------------------------------------------------------------------
NO_BASELINE_CASES = [
    single("NB-01", {"heart_rate_bpm": 75}, {"heart_rate": ("green", "green")},
           "No baseline yet (flight day 1): only clinical thresholds apply. Later this would be z = +3.75 · AHA."),
    single("NB-02", {"spo2_pct": 92}, {"spo2": ("orange", "orange")},
           "No baseline yet: clinical thresholds work without a baseline · WHO."),
    single("NB-03", {"glucose_mg_dl": 251}, {"glucose": ("red", "red")},
           "No baseline yet: clinical thresholds work without a baseline · ADA."),
]

# ----------------------------------------------------------------------
# Single-day cases, grouped by measurement / Casos de un día por medición
# ----------------------------------------------------------------------
P = "PENDING"

SINGLE_CASES = {
    "blood_pressure": [
        single("BP-01", bp(129, 70), {"blood_pressure": ("green", P)},
               "Systolic just below 130 · AHA. Final PENDING ⚠7 and Q5 (single reading, systolic z = +4.75)."),
        single("BP-02", bp(130, 70), {"blood_pressure": ("orange", "orange")},
               "Systolic at 130 · AHA; different categories, the higher wins (ACC/AHA 2017 guideline)."),
        single("BP-03", bp(131, 70), {"blood_pressure": ("orange", "orange")},
               "Systolic just above 130 · AHA; higher category wins (ACC/AHA 2017)."),
        single("BP-04", bp(179, 70), {"blood_pressure": ("orange", "orange")},
               "Systolic just below 180 · AHA; higher category wins (ACC/AHA 2017)."),
        single("BP-05", bp(180, 70), {"blood_pressure": ("orange", "orange")},
               "Systolic at 180 (top of 130-180) · AHA; higher category wins (ACC/AHA 2017)."),
        single("BP-06", bp(181, 70), {"blood_pressure": ("red", "red")},
               "Systolic above 180 · AHA ('and/or'). Repeat after 5 min is the action, not the trigger."),
        single("BP-07", bp(110, 79), {"blood_pressure": ("green", P)},
               "Diastolic just below 80 · AHA. Final PENDING ⚠7 and Q5 (diastolic z = +4.5)."),
        single("BP-08", bp(110, 80), {"blood_pressure": ("orange", "orange")},
               "Diastolic at 80 · AHA; different categories, the higher wins (ACC/AHA 2017 guideline)."),
        single("BP-09", bp(110, 81), {"blood_pressure": ("orange", "orange")},
               "Diastolic just above 80 · AHA; higher category wins (ACC/AHA 2017)."),
        single("BP-10", bp(110, 119), {"blood_pressure": ("orange", "orange")},
               "Diastolic just below 120 · AHA; higher category wins (ACC/AHA 2017)."),
        single("BP-11", bp(110, 120), {"blood_pressure": ("orange", "orange")},
               "Diastolic at 120 (top of 80-120) · AHA; higher category wins (ACC/AHA 2017)."),
        single("BP-12", bp(110, 121), {"blood_pressure": ("red", "red")},
               "Diastolic above 120 · AHA ('and/or')."),
        single("BP-13", bp(89, 59), {"blood_pressure": (P, P)},
               "Below 90/60 without symptoms: no level in the skill · NHLBI. PENDING ⚠4 (and ⚠7)."),
        single("BP-14", bp(89, 59, lightheaded_or_faint=1), {"blood_pressure": (P, P)},
               "Below 90/60 with 'lightheaded or faint': orange if this box counts as a symptom for low BP · NHLBI. PENDING ⚠3 (and ⚠7)."),
        single("BP-15", bp(89, 59, dizziness=1), {"blood_pressure": (P, P)},
               "Below 90/60 with dizziness; the dizziness-low BP link is a Proposal · NHLBI. PENDING ⚠3 (and ⚠7)."),
        single("BP-16", bp(89, 62, lightheaded_or_faint=1), {"blood_pressure": (P, P)},
               "Only systolic below 90 · NHLBI. PENDING Q2 (and ⚠3, ⚠7)."),
        single("BP-17", bp(90, 60, lightheaded_or_faint=1), {"blood_pressure": ("green", P)},
               "At 90/60: not below 90/60, so the hypotension rule does not apply · NHLBI. Final PENDING ⚠7 (z = -5.0 / -5.0)."),
        single("BP-18", bp(91, 61, lightheaded_or_faint=1), {"blood_pressure": ("green", P)},
               "Above 90/60 · NHLBI. Final PENDING ⚠7 (z = -4.75 / -4.5)."),
    ],
    "heart_rate": [
        single("HR-01", {"heart_rate_bpm": 39}, {"heart_rate": ("red", "red")}, "Below 40 · AHA."),
        single("HR-02", {"heart_rate_bpm": 40}, {"heart_rate": ("orange", "orange")}, "At 40 (bottom of 40-49) · AHA."),
        single("HR-03", {"heart_rate_bpm": 41}, {"heart_rate": ("orange", "orange")}, "Just above 40 · AHA."),
        single("HR-04", {"heart_rate_bpm": 49}, {"heart_rate": ("orange", "orange")}, "At 49 (top of 40-49) · AHA."),
        single("HR-05", {"heart_rate_bpm": 50}, {"heart_rate": ("green", P)},
               "At 50 (bottom of green, athletic profile) · AHA. Final PENDING ⚠7 (z = -2.5)."),
        single("HR-06", {"heart_rate_bpm": 51}, {"heart_rate": ("green", P)},
               "Just above 50 · AHA. Final PENDING ⚠7 (z = -2.25)."),
        single("HR-07", {"heart_rate_bpm": 99}, {"heart_rate": ("green", P)},
               "Just below 100 · AHA. Final PENDING ⚠7 (z = +9.75)."),
        single("HR-08", {"heart_rate_bpm": 100}, {"heart_rate": ("green", P)},
               "At 100 (top of green) · AHA. Final PENDING ⚠7 (z = +10.0)."),
        single("HR-09", {"heart_rate_bpm": 101}, {"heart_rate": ("orange", "orange")}, "At 101 (bottom of 101-120) · AHA."),
        single("HR-10", {"heart_rate_bpm": 119}, {"heart_rate": ("orange", "orange")}, "Just below 120 · AHA."),
        single("HR-11", {"heart_rate_bpm": 120}, {"heart_rate": ("orange", "orange")}, "At 120 (top of 101-120) · AHA."),
        single("HR-12", {"heart_rate_bpm": 121}, {"heart_rate": ("red", "red")}, "Above 120 · AHA."),
    ],
    "spo2": [
        single("SPO-01", {"spo2_pct": 96}, {"spo2": ("green", "green")}, ">= 95 · WHO. z = -1.0."),
        single("SPO-02", {"spo2_pct": 95}, {"spo2": ("green", "green")},
               "At 95 · WHO. z = -1.5 on a single reading: no deviation alert (needs 3 in a row)."),
        single("SPO-03", {"spo2_pct": 94}, {"spo2": ("yellow", P)},
               "At 94 · WHO lower limit. Final PENDING ⚠7 (z = -2.0); at least yellow."),
        single("SPO-04", {"spo2_pct": 93}, {"spo2": ("orange", "orange")}, "At 93 (top of 91-93) · WHO."),
        single("SPO-05", {"spo2_pct": 92}, {"spo2": ("orange", "orange")}, "Inside 91-93 · WHO."),
        single("SPO-06", {"spo2_pct": 91}, {"spo2": ("orange", "orange")}, "At 91 (bottom of 91-93) · WHO."),
        single("SPO-07", {"spo2_pct": 90}, {"spo2": ("red", "red")},
               "At 90 · Myatt 2017 (< 90); red at exactly 90 is a Proposal."),
        single("SPO-08", {"spo2_pct": 89}, {"spo2": ("red", "red")}, "Below 90 · Myatt 2017."),
    ],
    "glucose": [
        single("GLU-01", {"glucose_mg_dl": 53}, {"glucose": ("red", "red")}, "Below 54 · ADA."),
        single("GLU-02", {"glucose_mg_dl": 54}, {"glucose": ("orange", "orange")}, "At 54 (bottom of 54-69) · ADA."),
        single("GLU-03", {"glucose_mg_dl": 55}, {"glucose": ("orange", "orange")}, "Just above 54 · ADA."),
        single("GLU-04", {"glucose_mg_dl": 69}, {"glucose": ("orange", "orange")}, "At 69 (top of 54-69) · ADA."),
        single("GLU-05", {"glucose_mg_dl": 70}, {"glucose": ("green", P)},
               "At 70 (bottom of green) · ADA. Final PENDING ⚠7 (z = -3.75)."),
        single("GLU-06", {"glucose_mg_dl": 71}, {"glucose": ("green", P)},
               "Just above 70 · ADA. Final PENDING ⚠7 (z = -3.625)."),
        single("GLU-07", {"glucose_mg_dl": 179}, {"glucose": ("green", P)},
               "Just below 180 · ADA. Final PENDING ⚠7 (z = +9.875)."),
        single("GLU-08", {"glucose_mg_dl": 180}, {"glucose": ("green", P)},
               "At 180 (top of green) · ADA. Final PENDING ⚠7 (z = +10.0)."),
        single("GLU-09", {"glucose_mg_dl": 181}, {"glucose": ("orange", "orange")}, "At 181 (bottom of 181-250) · ADA."),
        single("GLU-10", {"glucose_mg_dl": 249}, {"glucose": ("orange", "orange")}, "Just below 250 · ADA."),
        single("GLU-11", {"glucose_mg_dl": 250}, {"glucose": ("orange", "orange")}, "At 250 (top of 181-250) · ADA."),
        single("GLU-12", {"glucose_mg_dl": 251}, {"glucose": ("red", "red")}, "Above 250 · ADA."),
    ],
    "sleep_hours": [
        single("SLP-01", {"sleep_hours": 7.1}, {"sleep_hours": ("green", "green")}, ">= 7 h · Sleep 2022."),
        single("SLP-02", {"sleep_hours": 7.0}, {"sleep_hours": (P, P)},
               "Exactly 7 h is both green (>= 7) and yellow (6-7). PENDING SLEEP-7H."),
        single("SLP-03", {"sleep_hours": 6.9}, {"sleep_hours": ("yellow", "yellow")}, "6-7 h · Sleep 2022; cut: Proposal."),
        single("SLP-04", {"sleep_hours": 6.1}, {"sleep_hours": ("yellow", "yellow")}, "6-7 h · Sleep 2022; cut: Proposal."),
        single("SLP-05", {"sleep_hours": 6.0}, {"sleep_hours": ("yellow", "yellow")},
               "6.0 h is not < 6 · Sleep 2022; cut: Proposal."),
        single("SLP-06", {"sleep_hours": 5.9}, {"sleep_hours": ("orange", "orange")},
               "< 6 h on one night only (the next night is 7.5 h) · Sleep 2022; cut: Proposal."),
    ],
    "pvt_lapses": [
        single("PVT-01", {"pvt_lapses": 4}, {"pvt_lapses": ("n/a", "green")}, "Same as the baseline mean · Proposal."),
        single("PVT-02", {"pvt_lapses": 5}, {"pvt_lapses": ("n/a", P)},
               "z = +0.5: green by escalas (z), yellow by umbrales ('more lapses'). PENDING ⚠2."),
        single("PVT-03", {"pvt_lapses": 6}, {"pvt_lapses": ("n/a", P)},
               "z = +1.0: green by escalas (z), yellow by umbrales ('more lapses'). PENDING ⚠2."),
        single("PVT-04", {"pvt_lapses": 7}, {"pvt_lapses": ("n/a", "yellow")},
               "z = +1.5 in one session · Proposal. Both skill files agree."),
        single("PVT-05", {"pvt_lapses": 8}, {"pvt_lapses": ("n/a", P)},
               "z = +2.0 in one session: at least yellow (one-session rule). PENDING ⚠7."),
        single("PVT-06", {"pvt_lapses": 1}, {"pvt_lapses": ("n/a", P)},
               "z = -1.5: fewer lapses than usual (better). PENDING ⚠5."),
    ],
    "vision_amsler": [
        single("AMS-01", {"vision_amsler": "no_change"}, {"vision_amsler": ("green", "green")}, "No change · Proposal."),
        single("AMS-02", {"vision_amsler": "change_not_repeated"}, {"vision_amsler": (P, P)},
               "Mild change that did not repeat on a new test: yellow under the current reading. PENDING ⚠6."),
        single("AMS-03", {"vision_amsler": "change_awaiting_retest"}, {"vision_amsler": (P, P)},
               "Change marked, retest not done yet. PENDING ⚠6."),
        single("AMS-04", {"vision_amsler": "change_confirmed"}, {"vision_amsler": ("orange", "orange")},
               "New change confirmed against baseline · Proposal."),
        single("AMS-05", {"vision_amsler": "sudden_loss_or_distortion"}, {"vision_amsler": ("red", "red")},
               "Sudden loss or distortion · Proposal."),
        single("AMS-06", {"vision_amsler": "area_growing"}, {"vision_amsler": ("red", "red")},
               "Area that grows · Proposal."),
    ],
    "cabin_co2": [
        single("CO2-01", {"cabin_co2_7d_avg_mmhg": 2.49, "cabin_co2_1h_avg_max_mmhg": 2.49},
               {"cabin_co2": ("green", "green")}, "7-day average < 2.5 · NASA-STD-3001 / OCHMO-TB-004."),
        single("CO2-02", {"cabin_co2_7d_avg_mmhg": 2.50, "cabin_co2_1h_avg_max_mmhg": 2.50},
               {"cabin_co2": ("yellow", "yellow")}, "At 2.5, no symptoms · NASA-STD-3001; cut by symptoms: Proposal."),
        single("CO2-03", {"cabin_co2_7d_avg_mmhg": 2.51, "cabin_co2_1h_avg_max_mmhg": 2.51},
               {"cabin_co2": ("yellow", "yellow")}, "Just above 2.5, no symptoms · NASA-STD-3001; cut: Proposal."),
        single("CO2-04", {"cabin_co2_7d_avg_mmhg": 3.00, "cabin_co2_1h_avg_max_mmhg": 3.00},
               {"cabin_co2": ("yellow", "yellow")}, "At 3.0, which is not > 3 · NASA-STD-3001; cut: Proposal."),
        single("CO2-05", {"cabin_co2_7d_avg_mmhg": 2.40, "cabin_co2_1h_avg_max_mmhg": 3.01},
               {"cabin_co2": ("red", "red")},
               "1-hour average > 3 · NASA-STD-3001 / OCHMO-TB-004. A green 7-day average does not hide it."),
        single("CO2-06", {"cabin_co2_7d_avg_mmhg": 2.40, "cabin_co2_1h_avg_max_mmhg": 3.00},
               {"cabin_co2": (P, P)},
               "Yellow if yellow uses the 1-hour average, green if it uses the 7-day one. PENDING Q3."),
        single("CO2-07", {"cabin_co2_7d_avg_mmhg": 2.50, "cabin_co2_1h_avg_max_mmhg": 2.50, "symptom_headache": 1},
               {"cabin_co2": ("orange", "orange")}, "At 2.5 with headache · NASA-STD-3001; cut by symptoms: Proposal."),
        single("CO2-08", {"cabin_co2_7d_avg_mmhg": 3.00, "cabin_co2_1h_avg_max_mmhg": 3.00, "symptom_headache": 1},
               {"cabin_co2": ("orange", "orange")}, "At 3.0 with headache · NASA-STD-3001; cut: Proposal."),
        single("CO2-09", {"cabin_co2_7d_avg_mmhg": 2.49, "cabin_co2_1h_avg_max_mmhg": 2.49, "symptom_headache": 1},
               {"cabin_co2": ("green", "green")}, "Below 2.5 with headache: headache alone sets no level."),
        single("CO2-10", {"cabin_co2_7d_avg_mmhg": 2.40, "cabin_co2_1h_avg_max_mmhg": 3.01, "symptom_headache": 1},
               {"cabin_co2": ("red", "red")}, "1-hour average > 3 with headache · NASA-STD-3001."),
    ],
    "symptoms": [
        single("SYM-01", {"symptom_dizziness": 1}, {},
               "Dizziness alone, every measurement normal: symptoms set no level on their own (umbrales.md, MVP)."),
        single("SYM-02", {"symptom_lightheaded_or_faint": 1}, {},
               "Lightheaded or faint alone, every measurement normal: no level."),
        single("SYM-03", {"symptom_headache": 1}, {},
               "Headache alone; cabin CO2 2.00 is below 2.5, so the CO2 rule does not apply."),
        single("SYM-04", {"symptom_cold_sore_or_rash": 1}, {},
               "Cold sore or rash alone: it feeds the temperature rule, which is not in the MVP (⚠3)."),
    ],
}

# ----------------------------------------------------------------------
# Multi-day sequences, grouped by measurement / Secuencias por medición
# ----------------------------------------------------------------------


def three_days(column, value, measurement, levels, note):
    """Three days with the same value; levels = 3 (clinical, final) pairs.
    Tres días con el mismo valor; levels = 3 pares (clínico, final).
    """
    return [({column: value}, {measurement: level}, note) for level in levels]


SYS = "blood_pressure_systolic_mmhg"
# Short names for (clinical, final) pairs used below.
# Nombres cortos para pares (clínico, final) que se usan abajo.
G = ("green", "green")    # clinical green, final green
Y = ("green", "yellow")   # clinical green, final yellow (from the baseline layer)
O = ("orange", "orange")  # clinical orange, final orange (letter O, not zero)
R = ("red", "red")        # clinical red, final red
GP = ("green", P)         # clinical green, final pending

SEQUENCE_CASES = {
    "blood_pressure": [
        sequence("BP-S1", three_days(SYS, 116, "blood_pressure", [G, G, GP],
                 "Systolic z = +1.5 three times in a row (diastolic z = 0): yellow on day 3 if systolic alone is enough · Proposal. PENDING Q5 on day 3.")),
        sequence("BP-S2", three_days(SYS, 115, "blood_pressure", [G, G, G],
                 "Systolic z = +1.25, below 1.5: no deviation alert · Proposal.")),
        sequence("BP-S3", three_days(SYS, 104, "blood_pressure", [G, G, GP],
                 "Systolic z = -1.5 three times (BP text is neutral, both directions count): yellow on day 3 if systolic alone is enough · Proposal. PENDING Q5 on day 3.")),
        sequence("BP-S4", [
            ({SYS: 116}, {"blood_pressure": G}, "Systolic z = +1.5, day 1 of 2."),
            ({SYS: 116}, {"blood_pressure": G}, "Systolic z = +1.5, day 2 of 2."),
            ({SYS: 110}, {"blood_pressure": G}, "Back to the mean: the streak breaks, no alert."),
        ]),
        sequence("BP-S5", [
            ({SYS: 118}, {"blood_pressure": GP}, "Systolic z = +2.0, day 1. PENDING ⚠7 and Q5."),
            ({SYS: 118}, {"blood_pressure": GP}, "Systolic z = +2.0, day 2. PENDING Q1 and Q5."),
            ({SYS: 118}, {"blood_pressure": GP},
             "Systolic z = +2.0, day 3: yellow or orange if systolic alone is enough. PENDING Q1 and Q5."),
        ]),
    ],
    "heart_rate": [
        sequence("HR-S1", three_days("heart_rate_bpm", 66, "heart_rate", [G, G, Y],
                 "z = +1.5 three times in a row: yellow on day 3 · Proposal.")),
        sequence("HR-S2", three_days("heart_rate_bpm", 65, "heart_rate", [G, G, G],
                 "z = +1.25, below 1.5: no deviation alert · Proposal.")),
        sequence("HR-S3", three_days("heart_rate_bpm", 54, "heart_rate", [G, G, Y],
                 "z = -1.5 three times: yellow on day 3 (neutral text, both directions) · Proposal.")),
        sequence("HR-S4", [
            ({"heart_rate_bpm": 68}, {"heart_rate": GP}, "z = +2.0, day 1. PENDING ⚠7."),
            ({"heart_rate_bpm": 68}, {"heart_rate": GP}, "z = +2.0, day 2. PENDING Q1."),
            ({"heart_rate_bpm": 68}, {"heart_rate": GP}, "z = +2.0, day 3: at least yellow. PENDING Q1."),
        ]),
    ],
    "spo2": [
        sequence("SPO-S1", three_days("spo2_pct", 95, "spo2", [G, G, Y],
                 "z = -1.5 three times with SpO2 >= 95: yellow on day 3 · WHO + Proposal.")),
        sequence("SPO-S2", three_days("spo2_pct", 96, "spo2", [G, G, G],
                 "z = -1.0: no deviation alert · Proposal.")),
        sequence("SPO-S3", [
            ({"spo2_pct": 94}, {"spo2": ("yellow", P)}, "94 % (yellow · WHO), z = -2.0, day 1. PENDING ⚠7."),
            ({"spo2_pct": 94}, {"spo2": ("yellow", P)}, "94 %, z = -2.0, day 2. PENDING Q1."),
            ({"spo2_pct": 94}, {"spo2": ("yellow", P)}, "94 %, z = -2.0, day 3. PENDING Q1."),
        ]),
    ],
    "glucose": [
        sequence("GLU-S1", three_days("glucose_mg_dl", 112, "glucose", [G, G, Y],
                 "z = +1.5 three times in a row: yellow on day 3 · Proposal.")),
        sequence("GLU-S2", three_days("glucose_mg_dl", 111, "glucose", [G, G, G],
                 "z = +1.375, below 1.5: no deviation alert · Proposal.")),
        sequence("GLU-S3", three_days("glucose_mg_dl", 88, "glucose", [G, G, Y],
                 "z = -1.5 three times: yellow on day 3 (neutral text, both directions) · Proposal.")),
        sequence("GLU-S4", [
            ({"glucose_mg_dl": 116}, {"glucose": GP}, "z = +2.0, day 1. PENDING ⚠7."),
            ({"glucose_mg_dl": 116}, {"glucose": GP}, "z = +2.0, day 2. PENDING Q1."),
            ({"glucose_mg_dl": 116}, {"glucose": GP}, "z = +2.0, day 3: at least yellow. PENDING Q1."),
        ]),
    ],
    "sleep_hours": [
        sequence("SLP-S1", three_days("sleep_hours", 5.9, "sleep_hours", [O, R, R],
                 "< 6 h nights in a row: orange on night 1, red from night 2 · Sleep 2022.")),
        sequence("SLP-S2", [
            ({"sleep_hours": 5.9}, {"sleep_hours": O}, "< 6 h, night 1 · Sleep 2022."),
            ({"sleep_hours": 6.0}, {"sleep_hours": ("yellow", "yellow")}, "6.0 h breaks the streak · Sleep 2022."),
            ({"sleep_hours": 5.9}, {"sleep_hours": O}, "< 6 h again, not 2 nights in a row: orange · Sleep 2022."),
        ]),
    ],
    "mood_vas": [
        sequence("MOOD-S1", [
            ({"mood_vas_score": 39}, {"mood_vas": ("n/a", "green")}, "z = +1.5 (worse mood), day 1 · Proposal."),
            ({"mood_vas_score": 39}, {"mood_vas": ("n/a", P)},
             "z = +1.5, day 2: green unless 39 counts as 'worst 10 %' of own history. PENDING ⚠1."),
            ({"mood_vas_score": 39}, {"mood_vas": ("n/a", P)},
             "z = +1.5 in 3 entries: at least yellow; red if 'worst 10 %' of own history. PENDING ⚠1."),
        ]),
        sequence("MOOD-S2", [
            ({"mood_vas_score": 38}, {"mood_vas": ("n/a", "green")}, "z = +1.33, below 1.5, day 1 · Proposal."),
            ({"mood_vas_score": 38}, {"mood_vas": ("n/a", P)},
             "z = +1.33, day 2: green unless 38 counts as 'worst 10 %' of own history. PENDING ⚠1."),
            ({"mood_vas_score": 38}, {"mood_vas": ("n/a", P)},
             "z = +1.33, day 3: green unless 'worst 10 %' of own history. PENDING ⚠1."),
        ]),
        sequence("MOOD-S3", [
            ({"mood_vas_score": 21}, {"mood_vas": ("n/a", "green")}, "z = -1.5 (better mood), day 1."),
            ({"mood_vas_score": 21}, {"mood_vas": ("n/a", "green")}, "z = -1.5 (better mood), day 2."),
            ({"mood_vas_score": 21}, {"mood_vas": ("n/a", P)}, "z = -1.5 (better mood), day 3. PENDING ⚠5."),
        ]),
        sequence("MOOD-S4", [
            ({"mood_vas_score": 42}, {"mood_vas": ("n/a", P)}, "z = +2.0, day 1. PENDING ⚠7."),
            ({"mood_vas_score": 42}, {"mood_vas": ("n/a", P)}, "z = +2.0, day 2. PENDING Q1."),
            ({"mood_vas_score": 42}, {"mood_vas": ("n/a", P)}, "z = +2.0, day 3: at least yellow. PENDING Q1."),
        ]),
        sequence("MOOD-S5", [
            ({"mood_vas_score": 95}, {"mood_vas": ("n/a", P)}, "Very low mood (95), day 1: single extreme entry. PENDING ⚠7."),
            ({"mood_vas_score": 95}, {"mood_vas": ("n/a", P)}, "Very low mood, day 2. PENDING ⚠1 and Q1."),
            ({"mood_vas_score": 95}, {"mood_vas": ("n/a", P)}, "Very low mood, day 3: at least yellow. PENDING ⚠1 and Q1."),
        ]),
    ],
    "pvt_lapses": [
        sequence("PVT-S1", three_days("pvt_lapses", 7, "pvt_lapses",
                 [("n/a", "yellow"), ("n/a", "yellow"), ("n/a", "orange")],
                 "z = +1.5 in each session: yellow, then orange at 3 sessions in a row · Proposal.")),
        sequence("PVT-S2", [
            ({"pvt_lapses": 8, "sleep_hours": 5.9}, {"pvt_lapses": ("n/a", P), "sleep_hours": O},
             "PVT z = +2.0 with < 6 h sleep, day 1: PVT at least yellow. PENDING ⚠7."),
            ({"pvt_lapses": 8, "sleep_hours": 5.9}, {"pvt_lapses": ("n/a", P), "sleep_hours": R},
             "PVT z = +2.0, sleep now red. PVT red needs 'sustained'. PENDING ⚠2 and Q1."),
            ({"pvt_lapses": 8, "sleep_hours": 5.9}, {"pvt_lapses": ("n/a", P), "sleep_hours": R},
             "PVT 3 sessions >= 1.5: at least orange; red if sustained. PENDING ⚠2 and Q1."),
        ]),
        sequence("PVT-S3", [
            ({"pvt_lapses": 8, "symptom_headache": 1}, {"pvt_lapses": ("n/a", P)},
             "PVT z = +2.0 with headache, day 1: at least yellow. PENDING ⚠7."),
            ({"pvt_lapses": 8, "symptom_headache": 1}, {"pvt_lapses": ("n/a", P)},
             "PVT red with symptoms is an open decision. PENDING ⚠2 and Q1."),
            ({"pvt_lapses": 8, "symptom_headache": 1}, {"pvt_lapses": ("n/a", P)},
             "PVT 3 sessions >= 1.5: at least orange. PENDING ⚠2 and Q1."),
        ]),
    ],
}

# ----------------------------------------------------------------------
# Radiation (last: the dose can only go up) / Radiación (al final: solo sube)
# Percent of the 600 mSv career limit (NASA-STD-3001 V1 4030). Cuts: Proposal.
# This set has no per-event dose, so the 250 mSv solar-event limit is not
# tested (how the two limits combine is open: RAD-LIMITS).
# Porcentaje del límite de carrera de 600 mSv. Cortes: Proposal. Este set no
# tiene dosis por evento, así que el límite de 250 mSv no se prueba.
# ----------------------------------------------------------------------
RAD = "radiation_dose_cumulative_msv"

RADIATION_CASES = [
    single("RAD-01", {RAD: 200.0, "solar_particle_event": 1}, {"radiation_dose": R},
           "Solar storm in progress: red at any dose · Proposal on NASA-STD-3001."),
    single("RAD-02", {RAD: 200.0}, {"radiation_dose": G}, "Storm over, 33 %: back to green · Proposal."),
    single("RAD-03", {RAD: 299.9}, {"radiation_dose": G}, "49.98 %, just below 50 % · Proposal."),
    single("RAD-04", {RAD: 300.0}, {"radiation_dose": ("yellow", "yellow")}, "Exactly 50 % · Proposal."),
    single("RAD-05", {RAD: 300.1}, {"radiation_dose": ("yellow", "yellow")}, "Just above 50 % · Proposal."),
    single("RAD-06", {RAD: 389.9}, {"radiation_dose": ("yellow", "yellow")}, "Just below 65 % · Proposal."),
    single("RAD-07", {RAD: 390.0}, {"radiation_dose": (P, P)},
           "Exactly 65 % is both yellow (50-65) and orange (65-80). PENDING RAD-65."),
    single("RAD-08", {RAD: 390.1}, {"radiation_dose": O}, "Just above 65 % · Proposal."),
    single("RAD-09", {RAD: 479.9}, {"radiation_dose": O}, "Just below 80 % · Proposal."),
    single("RAD-10", {RAD: 480.0}, {"radiation_dose": O}, "Exactly 80 %, which is not > 80 % · Proposal."),
    single("RAD-11", {RAD: 480.1}, {"radiation_dose": R}, "Just above 80 % · Proposal."),
]
