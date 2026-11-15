# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Reads the demo database (data/demo_scenarios.csv) into the core's day dicts.

The simulator only creates the CSV; the core and the API always read it from
here, so editing the CSV changes what the app shows.

SIMULATED DATA - NOT REAL ASTRONAUT DATA.
"""

import csv
from pathlib import Path

DEMO_CSV = Path(__file__).resolve().parents[1] / "data" / "demo_scenarios.csv"

INTEGER_FIELDS = ["flight_day", "systolic", "diastolic", "heart_rate", "spo2", "glucose",
                  "mood_score", "fatigue_score", "stress_score", "workload_score", "pvt_lapses"]
DECIMAL_FIELDS = ["sleep_hours", "cabin_co2_daily_avg", "cabin_co2_7d_avg",
                  "cabin_co2_1h_avg_max", "radiation_dose_cumulative"]
SYMPTOMS = ["dizziness", "lightheaded_or_faint", "headache", "cold_sore_or_rash"]


def parse(text, kind):
    """CSV text to int, float or None (empty cell = not measured that day).
    """
    if text == "":
        return None
    return int(text) if kind is int else float(text)


def row_to_day(row):
    """One CSV row to the core's day dict."""
    day = {name: parse(row[name], int) for name in INTEGER_FIELDS}
    day.update({name: parse(row[name], float) for name in DECIMAL_FIELDS})
    day["vision_amsler"] = row["vision_amsler"] or None
    day["solar_particle_event"] = row["solar_particle_event"] == "1"
    day["symptoms"] = {name: row["symptom_" + name] == "1" for name in SYMPTOMS}
    return day


def list_scenarios(path=DEMO_CSV):
    """Scenario names in file order."""
    with open(path, encoding="utf-8", newline="") as file:
        names = [row["scenario"] for row in csv.DictReader(file)]
    return list(dict.fromkeys(names))


def load_scenario(name, path=DEMO_CSV):
    """All days of one scenario, ordered by flight day.
    """
    with open(path, encoding="utf-8", newline="") as file:
        days = [row_to_day(row) for row in csv.DictReader(file) if row["scenario"] == name]
    if not days:
        raise KeyError(f"Unknown scenario: {name}")
    return sorted(days, key=lambda day: day["flight_day"])
