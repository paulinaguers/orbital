# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Continuous 42-day demo data for one fictional astronaut, in 3 scenarios.
Datos continuos de 42 días de un astronauta ficticio, en 3 escenarios.

SIMULATED DATA - NOT REAL ASTRONAUT DATA.
DATOS SIMULADOS - NO SON DATOS REALES DE ASTRONAUTAS.

Unlike clinical_test_cases.csv (an answer key of isolated edge cases), this
set tells a story day by day, so the trend charts make sense:
A diferencia de clinical_test_cases.csv (hoja de respuestas con bordes
sueltos), este set cuenta una historia día a día para que las tendencias
tengan sentido:
- healthy: everything stays in the usual range / todo dentro de lo habitual.
- deterioration: from day 33 cabin CO2 rises, sleep gets shorter and the
  reaction test worsens (overall yellow on day 42) / desde el día 33 sube el
  CO2, se duerme menos y empeora el test de reacción (amarillo el día 42).
- emergency: deterioration plus two short nights and SpO2 89 % with a
  headache on day 42 (overall red) / deterioro más dos noches cortas y SpO2
  89 % con dolor de cabeza el día 42 (rojo).

The values are plausible but invented; the rates and spreads are not clinical
values. The levels are never written here: the core computes them.
Los valores son plausibles pero inventados; ritmos y dispersiones no son
valores clínicos. Los niveles nunca se escriben acá: los calcula el núcleo.

Run from the repo root / Correr desde la raíz del repo:
    python -m backend.simulator.demo_scenarios
"""

import csv
import random
from pathlib import Path

SEED = 2031
DAYS = 42
SCENARIOS = ["healthy", "deterioration", "emergency"]
ASTRONAUT = {"id": "SIM-02", "name": "Alex Rivera", "role": "Flight Engineer",
             "mission": "Mars transit (simulated)"}
OUTPUT_CSV = Path(__file__).resolve().parents[2] / "data" / "demo_scenarios.csv"

# In-app test days. PVT: 4 practice sessions during the baseline, then every
# 4 days (ISS rhythm); next one is due on day 42. Amsler: weekly.
# Días de tests. PVT: 4 sesiones de práctica en la línea base y después cada
# 4 días (ritmo de la ISS); el próximo toca el día 42. Amsler: semanal.
PVT_DAYS = [4, 6, 8, 10, 14, 18, 22, 26, 30, 34, 38]
AMSLER_DAYS = [5, 12, 19, 26, 33, 40]
RADIATION_DAILY_MSV = 0.5  # arbitrary simulated rate / ritmo simulado arbitrario

COLUMNS = [
    "scenario", "flight_day", "astronaut_id", "simulated", "systolic", "diastolic",
    "heart_rate", "spo2", "glucose", "sleep_hours", "mood_score", "fatigue_score",
    "stress_score", "workload_score", "pvt_lapses", "vision_amsler", "cabin_co2_daily_avg",
    "cabin_co2_7d_avg", "cabin_co2_1h_avg_max", "radiation_dose_cumulative",
    "solar_particle_event", "symptom_dizziness", "symptom_lightheaded_or_faint",
    "symptom_headache", "symptom_cold_sore_or_rash",
]


# Usual value and day-to-day spread of each numeric measurement (invented).
# Valor habitual y variación diaria de cada medición numérica (inventados).
VITALS = {
    "systolic": (112, 3.5), "diastolic": (72, 2.5), "heart_rate": (60, 2.5),
    "glucose": (98, 6.0),
}
# Baseline days 4-10 spread like the rest of the mission (pstdev = spread).
# With only 7 random days the baseline can come out too narrow by chance and
# then normal days trigger false deviation alerts: worth telling the team.
# Los días 4-10 varían como el resto (pstdev = variación). Con solo 7 días al
# azar la línea base puede salir demasiado angosta y los días normales dan
# alertas falsas: conviene contárselo al equipo.
BASELINE_OFFSETS = [-1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5]
BASELINE_DISCRETE = {
    "spo2": [97, 98, 99, 98, 97, 99, 98], "mood_score": [1, 2, 3, 2, 1, 3, 2],
}
PVT_BASELINE = {4: 1, 6: 3, 8: 2, 10: 4}


def vital_value(rng, name, flight_day, offsets):
    """A numeric vital: spread pattern on baseline days, random after.
    Un signo vital: patrón de variación en la línea base, al azar después.
    """
    mean, spread = VITALS[name]
    if 4 <= flight_day <= 10:
        return round(mean + offsets[name][flight_day - 4] * spread)
    return round(rng.gauss(mean, 0.8 * spread))


def discrete_value(rng, name, flight_day, choices):
    """SpO2 or mood: fixed pattern on baseline days, random choice after.
    SpO2 o ánimo: patrón fijo en la línea base, elección al azar después.
    """
    if 4 <= flight_day <= 10:
        return BASELINE_DISCRETE[name][flight_day - 4]
    return rng.choice(choices)


def pvt_value(rng, flight_day):
    """Lapses on PVT days only (None on other days). / Lapsos solo en días de PVT."""
    if flight_day not in PVT_DAYS:
        return None
    return PVT_BASELINE.get(flight_day, rng.choice([1, 2, 2, 3, 3]))


def normal_day(rng, flight_day, offsets):
    """One ordinary day with small random variation.
    Un día común con variación aleatoria chica.
    """
    co2_daily = round(rng.gauss(2.05, 0.06), 2)
    day = {name: vital_value(rng, name, flight_day, offsets) for name in VITALS}
    day.update({
        "flight_day": flight_day,
        "spo2": discrete_value(rng, "spo2", flight_day, [97, 98, 98, 98, 99, 99]),
        "sleep_hours": min(8.4, max(7.1, round(rng.gauss(7.5, 0.25), 1))),
        "mood_score": discrete_value(rng, "mood_score", flight_day, [1, 2, 2, 2, 3, 3]),
        "fatigue_score": rng.choice([2, 3, 3, 4]),
        "stress_score": rng.choice([2, 2, 3, 3, 4]),
        "workload_score": rng.choice([3, 4, 4, 5]),
        "pvt_lapses": pvt_value(rng, flight_day),
        "vision_amsler": "no_change" if flight_day in AMSLER_DAYS else None,
        "cabin_co2_daily_avg": co2_daily,
        "cabin_co2_1h_avg_max": round(co2_daily + rng.uniform(0.15, 0.3), 2),
        "radiation_dose_cumulative": round(RADIATION_DAILY_MSV * flight_day, 1),
        "solar_particle_event": False,
        "symptoms": {"dizziness": False, "lightheaded_or_faint": False,
                     "headache": False, "cold_sore_or_rash": False},
    })
    return day


def apply_deterioration(day):
    """From day 33: CO2 rises, sleep shortens, PVT and fatigue worsen.
    Desde el día 33: sube el CO2, baja el sueño, empeoran PVT y fatiga.
    """
    d = day["flight_day"]
    if d >= 33:
        day["cabin_co2_daily_avg"] = round(2.15 + 0.065 * (d - 33), 2)
        day["cabin_co2_1h_avg_max"] = round(day["cabin_co2_daily_avg"] + 0.2, 2)
    short_nights = {36: 6.9, 37: 6.8, 38: 6.6, 39: 6.5, 40: 6.7, 41: 6.5, 42: 6.4}
    if d in short_nights:
        day["sleep_hours"] = short_nights[d]
        day["fatigue_score"] = 5 if d < 40 else 6
    if d == 38:
        day["pvt_lapses"] = 6


def apply_emergency(day):
    """Deterioration plus two nights under 6 h and low SpO2 with headache.
    Deterioro más dos noches de menos de 6 h y SpO2 baja con dolor de cabeza.
    """
    apply_deterioration(day)
    d = day["flight_day"]
    if d == 41:
        day["sleep_hours"], day["spo2"] = 5.7, 95
    if d == 42:
        day["sleep_hours"], day["spo2"], day["heart_rate"] = 5.4, 89, 74
        day["symptoms"]["headache"] = True


def add_seven_day_co2(days):
    """7-day average of the daily CO2 average (fewer days at the start).
    Promedio de 7 días del CO2 diario (menos días al principio).
    """
    for i, day in enumerate(days):
        window = [d["cabin_co2_daily_avg"] for d in days[max(0, i - 6): i + 1]]
        day["cabin_co2_7d_avg"] = round(sum(window) / len(window), 2)


def build_scenario(name):
    """All 42 days of one scenario (same random base for every scenario).
    Los 42 días de un escenario (misma base aleatoria para todos).
    """
    rng = random.Random(SEED)
    offsets = {name: rng.sample(BASELINE_OFFSETS, len(BASELINE_OFFSETS)) for name in VITALS}
    days = [normal_day(rng, d, offsets) for d in range(1, DAYS + 1)]
    changes = {"healthy": None, "deterioration": apply_deterioration, "emergency": apply_emergency}[name]
    for day in days:
        if changes:
            changes(day)
    add_seven_day_co2(days)
    return days


def to_row(scenario, day):
    """One day as a flat CSV row. / Un día como fila plana del CSV."""
    row = {k: v for k, v in day.items() if k != "symptoms"}
    row.update({"scenario": scenario, "astronaut_id": ASTRONAUT["id"], "simulated": 1})
    row["solar_particle_event"] = int(day["solar_particle_event"])
    for name, ticked in day["symptoms"].items():
        row["symptom_" + name] = int(ticked)
    return {col: ("" if row[col] is None else row[col]) for col in COLUMNS}


def write_csv(path=OUTPUT_CSV):
    """Writes every scenario to one CSV. / Escribe todos los escenarios en un CSV."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=COLUMNS, lineterminator="\n")
        writer.writeheader()
        for name in SCENARIOS:
            writer.writerows(to_row(name, day) for day in build_scenario(name))


if __name__ == "__main__":
    write_csv()
    print(f"Wrote {len(SCENARIOS) * DAYS} rows to {OUTPUT_CSV}")
