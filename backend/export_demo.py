# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Runs the core over the demo database and writes frontend/src/data/demo.json.
Corre el núcleo sobre la base de la demo y escribe demo.json.

Data in: data/demo_scenarios.csv (read through backend/storage.py).
Datos de entrada: data/demo_scenarios.csv (leído con backend/storage.py).

The JSON has the same shape as the screen's mock data (mockStatus.ts and
mockSeries.ts), so the demo does not depend on the API being up.
El JSON tiene la misma forma que los datos de prueba de la pantalla, así la
demo no depende de que la API esté levantada.

Run from the repo root / Correr desde la raíz del repo:
    python -m backend.export_demo
"""

import json
from pathlib import Path

from backend.core.alert_texts import read_texts
from backend.core.baseline import baseline_band, calculate_baseline, is_baseline_day
from backend.core.escalation import escalation_for, evaluate_timeline, latest_levels
from backend.core.levels import GREEN, NOT_EVALUABLE, highest
from backend.core.thresholds import THRESHOLDS
from backend.simulator.demo_scenarios import ASTRONAUT
from backend.storage import list_scenarios, load_scenario

OUTPUT_JSON = Path(__file__).resolve().parents[1] / "frontend" / "src" / "data" / "demo.json"
DEFAULT_SCENARIO = "deterioration"
SERIES_DAYS = 14

# What the chart band means. Sleep and CO2 have no deviation layer: their band
# is a descriptive reference only and does not trigger alerts.
# Qué significa la banda del gráfico. Sueño y CO2 no tienen capa de desvío:
# su banda es solo una referencia descriptiva y no dispara alertas.
BAND_TYPES = {"sleep_hours": "descriptive", "cabin_co2": "descriptive",
              "radiation_dose": "green_zone", "vision_amsler": "none"}
BAND_LABELS = {
    "personal_baseline": "Your usual range (flight days 4-10). Used for alerts.",
    "descriptive": "Your usual range, for reference only. Alerts use fixed clinical thresholds.",
    "green_zone": "Green zone: under 50 % of the career limit.",
    "none": "",
}

# Blocks of the body map (same ids, names and risks as the screen).
# Bloques del mapa del cuerpo (mismos ids, nombres y riesgos que la pantalla).
BLOCKS = [
    ("cardio", "Cardiorespiratory & Oxygenation", ["blood_pressure", "heart_rate", "spo2"],
     ["NASA HRP: Cardiovascular Adaptations", "NASA HRP: Hypoxia"]),
    ("sleep_cognition", "Sleep & Cognition", ["sleep_hours", "pvt_lapses"],
     ["NASA HRP: Inadequate Sleep and Irregular Schedules"]),
    ("metabolic", "Metabolic & Internal Balance", ["glucose"],
     ["CSA: Insulin resistance in spaceflight"]),
    ("environment", "Environment, Radiation & Vision", ["cabin_co2", "radiation_dose", "vision_amsler"],
     ["NASA-STD-3001: Closed environment (CO₂)", "NASA HRP: Radiation", "NASA HRP: SANS"]),
    ("mental_health", "Mental Health", ["mood_score", "fatigue_score", "stress_score", "workload_score"],
     ["NASA HRP: Behavioral Conditions"]),
]

# Display name, unit, source label and the day field shown on screen.
# Nombre, unidad, fuente y campo del día que se muestra en pantalla.
INDICATORS = {
    "blood_pressure": ("Blood pressure", "mmHg", "AHA", None),
    "heart_rate": ("Resting heart rate", "bpm", "AHA", "heart_rate"),
    "spo2": ("SpO₂", "%", "WHO", "spo2"),
    "glucose": ("Glucose", "mg/dL", "ADA", "glucose"),
    "sleep_hours": ("Sleep", "h", "Sleep 2022 (ISS study)", "sleep_hours"),
    "pvt_lapses": ("Brief reaction test (PVT-inspired)", "lapses", "Personal baseline (lapse rate)", "pvt_lapses"),
    "cabin_co2": ("Cabin CO₂ (7-day average)", "mmHg", "NASA-STD-3001", "cabin_co2_7d_avg"),
    "radiation_dose": ("Cumulative radiation", "mSv", "NASA-STD-3001 (career limit 600 mSv)",
                       "radiation_dose_cumulative"),
    "vision_amsler": ("Vision (Amsler grid)", "", "Compared with your previous test", "vision_amsler"),
    "mood_score": ("Mood", "/10 (10 = worst)", "Personal baseline", "mood_score"),
    "fatigue_score": ("Fatigue", "/10 (10 = worst)", "Personal baseline", "fatigue_score"),
    "stress_score": ("Stress", "/10 (10 = worst)", "Personal baseline", "stress_score"),
    "workload_score": ("Workload", "/10 (10 = worst)", "Personal baseline", "workload_score"),
}

# Fallback only: the scale texts now live in alert_texts.md §5c-5e (14/11).
# Solo de respaldo: los textos de las escalas ahora están en alert_texts.md.
SCALE_TEXTS = {
    "yellow": ("Your {name} is higher than your usual.", "Soft warning: monitor. No consultation needed."),
    "orange": ("Your {name} has been much higher than your usual for several days.",
               "Contact the crew medical officer."),
}

# In-app tests: (id, name, route, frequency in days, day field). Frequencies
# from escalas-y-protocolos.md (PVT every 4 days as on the ISS; Amsler weekly).
# Tests de la app: frecuencias del documento de escalas.
TESTS = [
    ("checkin", "Daily check-in", "/mental/checkin", 1, "mood_score"),
    ("pvt", "Brief reaction test (PVT-inspired)", "/tests/pvt", 4, "pvt_lapses"),
    ("amsler", "Amsler grid test", "/tests/amsler", 7, "vision_amsler"),
]

OVERALL_MESSAGES = {
    NOT_EVALUABLE: "Still learning your usual values. Keep measuring every day.",
    "green": "Everything looks good today.",
    "yellow": "Mostly good today. {areas} a little attention.",
    "orange": "Some values need attention. Your onboard doctor and the flight surgeon have been notified.",
    "red": "Urgent: your onboard doctor and the flight surgeon have been notified. A crewmate is on the way.",
}


def last_value(days, field):
    """(flight_day, value) of the last day that has this field.
    (día, valor) del último día que tiene este campo.
    """
    for day in reversed(days):
        if day.get(field) is not None:
            return day["flight_day"], day[field]
    return None, None


def indicator_entry(m, days, level, baseline_available):
    """One indicator as the screen expects it. / Un indicador como lo espera la pantalla.

    `baseline_available` is False when the personal baseline could not be used.
    `baseline_available` es False si no se pudo usar la línea base personal.
    """
    name, unit, source, field = INDICATORS[m]
    entry = {"id": m, "name": name, "unit": unit, "level": level or NOT_EVALUABLE,
             "threshold_source": source, "baseline_available": baseline_available.get(m, True)}
    if m == "blood_pressure":
        entry["systolic"], entry["diastolic"] = days[-1]["systolic"], days[-1]["diastolic"]
    elif m == "vision_amsler":
        entry["value"] = "No distortion" if last_value(days, field)[1] == "no_change" else "Distortion reported"
    else:
        entry["value"] = last_value(days, field)[1]
    if m == "pvt_lapses":
        last = next((d for d in reversed(days) if d.get("pvt_lapses") is not None), None)
        if last and last.get("pvt_stimuli"):
            entry["stimuli"], entry["omissions"] = last["pvt_stimuli"], last.get("pvt_omissions", 0)
            entry["session_valid"] = not last.get("pvt_session_invalid", False)
    return entry


def recommendation_for(m, level, texts):
    """Astronaut text + action for one indicator and level (alert_texts.md).
    Texto y acción para un indicador y nivel (alert_texts.md).
    """
    if m in texts and level in texts[m]:
        sees, action = texts[m][level]
    else:
        sees, action = SCALE_TEXTS[level]
        sees = sees.format(name=INDICATORS[m][0].lower())
    return f"{sees} {action}"


def block_entry(block, days, levels, available, texts):
    """One body-map block: level = worst indicator; texts from alert_texts.md.
    Un bloque: nivel = peor indicador; textos desde alert_texts.md.

    If no indicator of the block could be evaluated, the block is "not_evaluable".
    Si ningún indicador del bloque se pudo evaluar, el bloque es "not_evaluable".
    """
    block_id, name, members, risks = block
    level = highest(*(levels.get(m) for m in members))
    if level is None:
        level, recommendation = NOT_EVALUABLE, "Not enough data yet to compare with your usual values."
    elif level == GREEN:
        recommendation = "All stable. Keep your routine."
    else:
        worst = next(m for m in members if levels.get(m) == level)
        recommendation = recommendation_for(worst, level, texts)
    evaluated = sum(1 for m in members if levels.get(m) not in (None, NOT_EVALUABLE))
    return {"id": block_id, "name": name, "level": level, "nasa_risk": risks,
            "recommendation": recommendation,
            # Coverage: a green block with unevaluated indicators is a partial result.
            # Cobertura: un bloque verde con indicadores sin evaluar es un resultado parcial.
            "coverage": {"evaluated": evaluated, "total": len(members)},
            "indicators": [indicator_entry(m, days, levels.get(m), available) for m in members]}


def tests_entry(days):
    """Due and overdue flags for each in-app test (computed here, not on screen).
    Si toca o está vencido cada test (se calcula acá, no en la pantalla).
    """
    today = days[-1]["flight_day"]
    entries = []
    for test_id, name, route, every, field in TESTS:
        last, _ = last_value(days, field)
        next_due = last + every
        entries.append({"id": test_id, "name": name, "route": route, "frequency_days": every,
                        "last_done_flight_day": last, "next_due_flight_day": next_due,
                        "due": today >= next_due, "overdue": today > next_due})
    return entries


def rewards_entry(days):
    """Stars = tests completed; streak = days in a row with a check-in.
    Estrellas = tests hechos; racha = días seguidos con check-in.
    """
    stars = sum(1 for day in days for _, _, _, _, f in TESTS if day.get(f) is not None)
    streak = 0
    for day in reversed(days):
        if day.get("mood_score") is None:
            break
        streak += 1
    return {"stars": stars, "streak_days": streak}


def areas_text(count):
    """ "1 area needs" / "2 areas need", for the overall message.
    "1 area needs" / "2 areas need", para el mensaje general.
    """
    return "1 area needs" if count == 1 else f"{count} areas need"


def latest_baseline_flags(results):
    """Whether the baseline could be used on each measurement's last day.
    Si la línea base se pudo usar en el último día de cada medición.
    """
    flags = {}
    for result in results:
        flags.update(result["baseline_available"])
    return flags


def status_entry(days, results, texts):
    """The whole status for the last day (same shape as mockStatus.ts).
    El estado completo del último día (misma forma que mockStatus.ts).
    """
    levels = latest_levels(results)
    available = latest_baseline_flags(results)
    blocks = [block_entry(block, days, levels, available, texts) for block in BLOCKS]
    overall = highest(*(b["level"] for b in blocks)) or NOT_EVALUABLE
    affected = sum(1 for b in blocks if b["level"] not in (GREEN, NOT_EVALUABLE))
    astronaut = dict(ASTRONAUT, flight_day=days[-1]["flight_day"])
    return {"profile": "crew", "simulated": True, "astronaut": astronaut, "overall_level": overall,
            "overall_message": OVERALL_MESSAGES[overall].format(areas=areas_text(affected)),
            "escalation": {"notified": escalation_for(overall) if overall != NOT_EVALUABLE else []},
            "blocks": blocks,
            "tests": tests_entry(days), "rewards": rewards_entry(days)}


def band_for(m, field, days):
    """(mean, low, high) shown as "your usual range" on the chart.
    (media, bajo, alto) que el gráfico muestra como "tu rango habitual".

    Radiation is cumulative, so its band is the green zone (under 50 % of the
    career limit) instead of a personal baseline.
    La radiación es acumulada: su banda es la zona verde (menos del 50 % del
    límite de carrera) en lugar de una línea base personal.
    """
    if m == "radiation_dose":
        t = THRESHOLDS["radiation_dose"]
        high = t["career_limit_msv"] * t["green_below_pct"] / 100
        return high / 2, 0, high
    minimum = THRESHOLDS["pvt_lapses"]["min_baseline_sessions"] if field == "pvt_lapses" else None
    baseline = calculate_baseline([d.get(field) for d in days if is_baseline_day(d["flight_day"])], minimum)
    if baseline is None:
        return None, None, None
    low, high = baseline_band(*baseline)
    return round(baseline[0], 1), round(low, 1), round(high, 1)


def series_entry(m, days, results):
    """Last 14 days of one indicator (same shape as mockSeries.ts).
    Últimos 14 días de un indicador (misma forma que mockSeries.ts).
    """
    window = list(zip(days, results))[-SERIES_DAYS:]
    field = INDICATORS[m][3]
    measured = [(d, r["final"][m]) for d, r in window if r["final"][m] is not None]
    band = BAND_TYPES.get(m, "personal_baseline")
    if m == "vision_amsler":
        return {"indicator": m, "band_type": band, "band_label": BAND_LABELS[band], "points": [
            {"flight_day": d["flight_day"], "level": lvl,
             "result": "No distortion" if d[field] == "no_change" else "Distortion reported"}
            for d, lvl in measured]}
    if m == "blood_pressure":
        entry = {"indicator": m, "band_type": band, "band_label": BAND_LABELS[band], "points": [
            {"flight_day": d["flight_day"], "systolic": d["systolic"], "diastolic": d["diastolic"],
             "level": lvl} for d, lvl in measured]}
        for side in ("systolic", "diastolic"):
            mean, low, high = band_for(m, side, days)
            entry.update({f"baseline_mean_{side}": mean, f"baseline_low_{side}": low,
                          f"baseline_high_{side}": high})
        return entry
    mean, low, high = band_for(m, field, days)
    return {"indicator": m, "band_type": band, "band_label": BAND_LABELS[band],
            "baseline_mean": mean, "baseline_low": low, "baseline_high": high,
            "points": [{"flight_day": d["flight_day"], "value": d[field], "level": lvl}
                       for d, lvl in measured]}


def scenario_entry(days, texts):
    """Status and series of one list of days (used by the API too).
    Estado y series de una lista de días (también lo usa la API).
    """
    results = evaluate_timeline(days)
    return {"status": status_entry(days, results, texts),
            "series": {m: series_entry(m, days, results) for m in INDICATORS}}


def build_demo():
    """Status and series for every scenario of the demo database.
    Estado y series de cada escenario de la base de la demo.
    """
    texts = read_texts()
    scenarios = {name: scenario_entry(load_scenario(name), texts) for name in list_scenarios()}
    return {"simulated": True, "generated_by": "backend/export_demo.py",
            "default_scenario": DEFAULT_SCENARIO, "scenarios": scenarios}


def write_demo(path=OUTPUT_JSON):
    """Writes demo.json (UTF-8, LF). / Escribe demo.json."""
    path.parent.mkdir(parents=True, exist_ok=True)
    text = json.dumps(build_demo(), ensure_ascii=False, indent=2) + "\n"
    path.write_text(text, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    write_demo()
    print(f"Wrote {OUTPUT_JSON}")
