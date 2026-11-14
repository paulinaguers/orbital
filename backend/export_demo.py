# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Runs the core over the demo scenarios and writes frontend/src/data/demo.json.
Corre el núcleo sobre los escenarios de demo y escribe demo.json.

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
from backend.core.levels import GREEN, highest
from backend.core.thresholds import THRESHOLDS
from backend.simulator.demo_scenarios import ASTRONAUT, SCENARIOS, build_scenario

OUTPUT_JSON = Path(__file__).resolve().parents[1] / "frontend" / "src" / "data" / "demo.json"
DEFAULT_SCENARIO = "deterioration"
SERIES_DAYS = 14

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
    ("mental_health", "Mental Health", ["mood_score"], ["NASA HRP: Behavioral Conditions"]),
]

# Display name, unit, source label and the day field shown on screen.
# Nombre, unidad, fuente y campo del día que se muestra en pantalla.
INDICATORS = {
    "blood_pressure": ("Blood pressure", "mmHg", "AHA", None),
    "heart_rate": ("Resting heart rate", "bpm", "AHA", "heart_rate"),
    "spo2": ("SpO₂", "%", "WHO", "spo2"),
    "glucose": ("Glucose", "mg/dL", "ADA", "glucose"),
    "sleep_hours": ("Sleep", "h", "Sleep 2022 (ISS study)", "sleep_hours"),
    "pvt_lapses": ("Reaction test (PVT)", "lapses", "Personal baseline", "pvt_lapses"),
    "cabin_co2": ("Cabin CO₂ (7-day average)", "mmHg", "NASA-STD-3001", "cabin_co2_7d_avg"),
    "radiation_dose": ("Cumulative radiation", "mSv", "NASA-STD-3001 (career limit 600 mSv)",
                       "radiation_dose_cumulative"),
    "vision_amsler": ("Vision (Amsler grid)", "", "Personal baseline", "vision_amsler"),
    "mood_score": ("Mood", "/10 (10 = worst)", "Personal baseline", "mood_score"),
}

# In-app tests: (id, name, route, frequency in days, day field). Frequencies
# from escalas-y-protocolos.md (PVT every 4 days as on the ISS; Amsler weekly).
# Tests de la app: frecuencias del documento de escalas.
TESTS = [
    ("checkin", "Daily check-in", "/mental/checkin", 1, "mood_score"),
    ("pvt", "Reaction test (PVT)", "/tests/pvt", 4, "pvt_lapses"),
    ("amsler", "Amsler grid test", "/tests/amsler", 7, "vision_amsler"),
]

OVERALL_MESSAGES = {
    "green": "Everything looks good today.",
    "yellow": "Mostly good today. {n} area(s) need a little attention.",
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


def indicator_entry(m, days, level):
    """One indicator as the screen expects it. / Un indicador como lo espera la pantalla."""
    name, unit, source, field = INDICATORS[m]
    entry = {"id": m, "name": name, "unit": unit, "level": level, "threshold_source": source}
    if m == "blood_pressure":
        entry["systolic"], entry["diastolic"] = days[-1]["systolic"], days[-1]["diastolic"]
    elif m == "vision_amsler":
        entry["value"] = "No distortion" if last_value(days, field)[1] == "no_change" else "Distortion reported"
    else:
        entry["value"] = last_value(days, field)[1]
    return entry


def block_entry(block, days, levels, texts):
    """One body-map block: level = worst indicator; texts from alert_texts.md.
    Un bloque: nivel = peor indicador; textos desde alert_texts.md.
    """
    block_id, name, members, risks = block
    level = highest(*(levels[m] for m in members))
    worst = next(m for m in members if levels[m] == level)
    if level == GREEN:
        recommendation = "All stable. Keep your routine."
    else:
        sees, action = texts[worst][level]
        recommendation = f"{sees} {action}"
    return {"id": block_id, "name": name, "level": level, "nasa_risk": risks,
            "recommendation": recommendation,
            "indicators": [indicator_entry(m, days, levels[m]) for m in members]}


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


def status_entry(days, results, texts):
    """The whole status for the last day (same shape as mockStatus.ts).
    El estado completo del último día (misma forma que mockStatus.ts).
    """
    levels = latest_levels(results)
    blocks = [block_entry(block, days, levels, texts) for block in BLOCKS]
    overall = highest(*(b["level"] for b in blocks))
    affected = sum(1 for b in blocks if b["level"] != GREEN)
    astronaut = dict(ASTRONAUT, flight_day=days[-1]["flight_day"])
    return {"profile": "crew", "simulated": True, "astronaut": astronaut, "overall_level": overall,
            "overall_message": OVERALL_MESSAGES[overall].format(n=affected),
            "escalation": {"notified": escalation_for(overall)}, "blocks": blocks,
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
    baseline = calculate_baseline([d.get(field) for d in days if is_baseline_day(d["flight_day"])])
    low, high = baseline_band(*baseline)
    return round(baseline[0], 1), round(low, 1), round(high, 1)


def series_entry(m, days, results):
    """Last 14 days of one indicator (same shape as mockSeries.ts).
    Últimos 14 días de un indicador (misma forma que mockSeries.ts).
    """
    window = list(zip(days, results))[-SERIES_DAYS:]
    field = INDICATORS[m][3]
    measured = [(d, r["final"][m]) for d, r in window if r["final"][m] is not None]
    if m == "vision_amsler":
        return {"indicator": m, "points": [
            {"flight_day": d["flight_day"], "level": lvl,
             "result": "No distortion" if d[field] == "no_change" else "Distortion reported"}
            for d, lvl in measured]}
    if m == "blood_pressure":
        entry = {"indicator": m, "points": [
            {"flight_day": d["flight_day"], "systolic": d["systolic"], "diastolic": d["diastolic"],
             "level": lvl} for d, lvl in measured]}
        for side in ("systolic", "diastolic"):
            mean, low, high = band_for(m, side, days)
            entry.update({f"baseline_mean_{side}": mean, f"baseline_low_{side}": low,
                          f"baseline_high_{side}": high})
        return entry
    mean, low, high = band_for(m, field, days)
    return {"indicator": m, "baseline_mean": mean, "baseline_low": low, "baseline_high": high,
            "points": [{"flight_day": d["flight_day"], "value": d[field], "level": lvl}
                       for d, lvl in measured]}


def build_demo():
    """Status and series for every scenario. / Estado y series de cada escenario."""
    texts = read_texts()
    scenarios = {}
    for name in SCENARIOS:
        days = build_scenario(name)
        results = evaluate_timeline(days)
        scenarios[name] = {"status": status_entry(days, results, texts),
                           "series": {m: series_entry(m, days, results) for m in INDICATORS}}
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
