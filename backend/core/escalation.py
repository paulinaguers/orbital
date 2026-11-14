# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Layer 2 (baseline deviation), final level per measurement and escalation.
Capa 2 (desvío de la línea base), nivel final por medición y escalamiento.

Input: one dict per flight day, in order, with the core names below. A value
of None means "not measured that day" (e.g. the PVT is every few days).
Entrada: un diccionario por día de vuelo, en orden, con los nombres de abajo.
None significa "no se midió ese día" (por ejemplo, el PVT es cada algunos días).

Rules (alert_texts.md, "Two layers"): the higher level wins and a deviation
alone never reaches red. Mood and PVT have no clinical layer, so they have no
level until the baseline exists (flight day 11).
Reglas: gana el nivel más alto y un desvío solo nunca llega a rojo. Ánimo y
PVT no tienen capa clínica: no tienen nivel hasta que existe la línea base.
"""

from backend.core import clinical
from backend.core.baseline import baseline_is_ready, calculate_baseline, calculate_z_score, is_baseline_day
from backend.core.levels import GREEN, NOT_EVALUABLE, ORANGE, RED, YELLOW, highest
from backend.core.thresholds import THRESHOLDS

MEASUREMENTS = [
    "blood_pressure", "heart_rate", "spo2", "glucose", "sleep_hours",
    "mood_score", "fatigue_score", "stress_score", "workload_score",
    "pvt_lapses", "vision_amsler", "cabin_co2", "radiation_dose",
]

# Measurements with a baseline layer: (day fields, direction). Direction +1 =
# only higher is worse, -1 = only lower is worse, 0 = both sides count.
# Signed directions for mood, PVT and SpO2 follow their one-sided texts:
# PROVISIONAL (open ⚠5). Blood pressure uses the worse of its two z (Q5).
# Mediciones con capa de línea base: (campos, dirección). +1 = solo peor si
# sube, -1 = solo peor si baja, 0 = cuentan los dos lados. Ánimo, PVT y SpO2
# con signo según sus textos: PROVISORIO (⚠5). La presión usa el peor z (Q5).
DEVIATION_FIELDS = {
    "blood_pressure": (["systolic", "diastolic"], 0),
    "heart_rate": (["heart_rate"], 0),
    "spo2": (["spo2"], -1),
    "glucose": (["glucose"], 0),
    "mood_score": (["mood_score"], +1),
    "fatigue_score": (["fatigue_score"], +1),
    "stress_score": (["stress_score"], +1),
    "workload_score": (["workload_score"], +1),
    "pvt_lapses": (["pvt_lapses"], +1),
}
# The four check-in scales have no clinical threshold: they are compared only
# with the personal baseline (escalas-y-protocolos.md §2.1), like the PVT.
# Las cuatro escalas del check-in no tienen umbral clínico: solo se comparan
# con la línea base personal, como el PVT.
NO_CLINICAL_LAYER = ("mood_score", "fatigue_score", "stress_score", "workload_score", "pvt_lapses")

# Who is notified for the overall level (team decision, 14/11/2026).
# A quién se avisa según el nivel general (decisión del equipo, 14/11/2026).
NOTIFIED_BY_LEVEL = {
    GREEN: [],
    YELLOW: [],
    ORANGE: ["Onboard doctor", "Flight surgeon (Earth)"],
    RED: ["Onboard doctor", "Flight surgeon (Earth) – URGENT", "Crewmate on board"],
}


def is_measured(day, measurement):
    """True if the day has a value for this measurement.
    Verdadero si el día tiene valor para esta medición.
    """
    fields = {
        "blood_pressure": "systolic", "cabin_co2": "cabin_co2_7d_avg",
        "radiation_dose": "radiation_dose_cumulative",
    }
    return day.get(fields.get(measurement, measurement)) is not None


def clinical_level(measurement, day, previous_sleep):
    """Layer 1 for one measurement on one day (None for mood and PVT).
    Capa 1 de una medición en un día (None para ánimo y PVT).
    """
    symptoms = day.get("symptoms", {})
    rules = {
        "blood_pressure": lambda: clinical.blood_pressure_level(day["systolic"], day["diastolic"], symptoms),
        "heart_rate": lambda: clinical.heart_rate_level(day["heart_rate"]),
        "spo2": lambda: clinical.spo2_level(day["spo2"]),
        "glucose": lambda: clinical.glucose_level(day["glucose"]),
        "sleep_hours": lambda: clinical.sleep_level(day["sleep_hours"], previous_sleep),
        "vision_amsler": lambda: clinical.amsler_level(day["vision_amsler"]),
        "cabin_co2": lambda: clinical.cabin_co2_level(
            day["cabin_co2_7d_avg"], day["cabin_co2_1h_avg_max"], symptoms.get("headache")),
        "radiation_dose": lambda: clinical.radiation_level(
            day["radiation_dose_cumulative"], day.get("solar_particle_event")),
    }
    return rules[measurement]() if measurement in rules else None


def build_baselines(days):
    """(mean, std_dev) per day field, from the baseline days 4-10.
    (media, desvío) por campo, a partir de los días de línea base 4-10.
    """
    baselines = {}
    for fields, _ in DEVIATION_FIELDS.values():
        for field in fields:
            values = [day.get(field) for day in days if is_baseline_day(day["flight_day"])]
            minimum = THRESHOLDS["pvt_lapses"]["min_baseline_sessions"] if field == "pvt_lapses" else None
            baselines[field] = calculate_baseline(values, minimum)
    return baselines


def effective_z(measurement, day, baselines):
    """Signed or absolute z for the deviation rules (worse field for BP).
    z con signo o absoluto para las reglas de desvío (peor campo en presión).

    Returns None if any field has no usable baseline.
    Devuelve None si algún campo no tiene línea base utilizable.
    """
    fields, direction = DEVIATION_FIELDS[measurement]
    scores = []
    for field in fields:
        if baselines.get(field) is None:
            return None
        z = calculate_z_score(day[field], *baselines[field])
        if z is None:
            return None
        scores.append(abs(z) if direction == 0 else z * direction)
    return max(scores)


def last_n_reach(history, count, cut):
    """True if the last `count` z-scores all reach the cut.
    Verdadero si los últimos `count` puntajes z llegan todos al corte.
    """
    recent = history[-count:]
    return len(recent) == count and all(z is not None and z >= cut for z in recent)


def deviation_level(measurement, history):
    """Layer 2 from the z history of one measurement (never red).
    Capa 2 a partir del historial de z de una medición (nunca rojo).
    """
    if measurement == "pvt_lapses":
        t = THRESHOLDS["pvt_lapses"]
        if last_n_reach(history, t["orange_consecutive_sessions"], t["orange_abs_z_min"]):
            return ORANGE
        return YELLOW if last_n_reach(history, 1, t["yellow_abs_z_min"]) else GREEN
    t = THRESHOLDS["deviation"]
    if last_n_reach(history, t["orange_consecutive_count"], t["orange_abs_z_min"]):
        return ORANGE
    if last_n_reach(history, t["yellow_consecutive_count"], t["yellow_abs_z_min"]):
        return YELLOW
    return GREEN


def final_level(m, clinical, deviation, z, ready):
    """Final level: the higher layer wins; no usable baseline is never green.
    Nivel final: gana la capa más alta; sin línea base utilizable nunca es verde.
    """
    if m in NO_CLINICAL_LAYER:
        if not ready:
            return None
        return NOT_EVALUABLE if z is None else deviation
    return highest(clinical, deviation)


def evaluate_day(day, state):
    """Clinical, deviation and final level of every measurement on one day.
    Nivel clínico, de desvío y final de cada medición en un día.

    `state` keeps the baselines, the z histories and last night's sleep.
    `baseline_available[m]` is False when the measurement has a baseline layer
    but no usable baseline (only the clinical layer could be applied).
    `state` guarda las líneas base, los historiales de z y el sueño anterior.
    `baseline_available[m]` es False si la medición tiene capa de línea base
    pero no hay una utilizable (solo se pudo aplicar la capa clínica).
    """
    result = {"flight_day": day["flight_day"], "clinical": {}, "final": {}, "z": {},
              "baseline_available": {}}
    ready = baseline_is_ready(day["flight_day"])
    for m in MEASUREMENTS:
        if not is_measured(day, m):
            result["clinical"][m] = result["final"][m] = None
            continue
        level = clinical_level(m, day, state["previous_sleep"])
        result["clinical"][m] = level
        deviation, z = None, None
        if m in DEVIATION_FIELDS and ready:
            z = effective_z(m, day, state["baselines"])
            state["history"][m].append(z)
            result["z"][m] = z
            result["baseline_available"][m] = z is not None
            deviation = deviation_level(m, state["history"][m]) if z is not None else None
        result["final"][m] = final_level(m, level, deviation, z, ready)
    if day.get("sleep_hours") is not None:
        state["previous_sleep"] = day["sleep_hours"]
    return result


def evaluate_timeline(days):
    """Runs the core over a whole mission, day by day, in order.
    Corre el núcleo sobre toda una misión, día por día, en orden.

    Returns one result per day (see evaluate_day).
    Devuelve un resultado por día (ver evaluate_day).
    """
    state = {"baselines": build_baselines(days), "previous_sleep": None,
             "history": {m: [] for m in DEVIATION_FIELDS}}
    return [evaluate_day(day, state) for day in days]


def latest_levels(results):
    """Most recent final level of each measurement (its last measured day).
    Último nivel final de cada medición (su último día medido).
    """
    latest = {}
    for result in results:
        for m, level in result["final"].items():
            if level is not None:
                latest[m] = level
    return latest


def escalation_for(overall_level):
    """Who is notified for an overall level. / A quién se avisa según el nivel."""
    return list(NOTIFIED_BY_LEVEL[overall_level])
