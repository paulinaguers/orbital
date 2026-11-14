# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Checks the core against the hand-written answer key (clinical_test_cases.csv).
Controla el núcleo contra la hoja de respuestas escrita a mano.

Rows marked PENDING (open team decision) or n/a are skipped, as the CSV's
README says. The answer key still uses the 0-100 mood scale (mood_vas_score);
z-scores are the same on any scale, so it is read as the core's mood_score.
Se saltean las filas PENDING o n/a. La hoja de respuestas todavía usa el ánimo
0-100; el puntaje z no depende de la escala, así que se lee como mood_score.
"""

import csv

from backend.core.escalation import evaluate_timeline
from backend.simulator import generate_clinical_test_data as generator

# CSV measurement name -> core measurement name.
# Nombre de medición del CSV -> nombre del núcleo.
CSV_TO_CORE = {m: m for m in generator.MEASUREMENTS}
CSV_TO_CORE["mood_vas"] = "mood_score"

SKIP = {"PENDING", "n/a"}


def number(text):
    """Text from the CSV to int or float. / Texto del CSV a int o float."""
    return float(text) if "." in text else int(text)


def row_to_day(row):
    """One CSV row to the core's day dict. / Una fila del CSV al día del núcleo."""
    return {
        "flight_day": int(row["flight_day"]),
        "systolic": number(row["blood_pressure_systolic_mmhg"]),
        "diastolic": number(row["blood_pressure_diastolic_mmhg"]),
        "heart_rate": number(row["heart_rate_bpm"]),
        "spo2": number(row["spo2_pct"]),
        "glucose": number(row["glucose_mg_dl"]),
        "sleep_hours": number(row["sleep_hours"]),
        "mood_score": number(row["mood_vas_score"]),
        "pvt_lapses": number(row["pvt_lapses"]),
        "vision_amsler": row["vision_amsler"],
        "cabin_co2_7d_avg": number(row["cabin_co2_7d_avg_mmhg"]),
        "cabin_co2_1h_avg_max": number(row["cabin_co2_1h_avg_max_mmhg"]),
        "radiation_dose_cumulative": number(row["radiation_dose_cumulative_msv"]),
        "solar_particle_event": row["solar_particle_event"] == "1",
        "symptoms": {
            "dizziness": row["symptom_dizziness"] == "1",
            "lightheaded_or_faint": row["symptom_lightheaded_or_faint"] == "1",
            "headache": row["symptom_headache"] == "1",
            "cold_sore_or_rash": row["symptom_cold_sore_or_rash"] == "1",
        },
    }


def compare(layer, prefix):
    """List of mismatches between the core and the answer key for one layer.
    Lista de diferencias entre el núcleo y la hoja de respuestas en una capa.
    """
    with open(generator.OUTPUT_CSV, encoding="utf-8", newline="") as file:
        rows = list(csv.DictReader(file))
    results = evaluate_timeline([row_to_day(row) for row in rows])
    mismatches, checked = [], 0
    for row, result in zip(rows, results):
        for csv_name, core_name in CSV_TO_CORE.items():
            expected = row[prefix + csv_name]
            if expected in SKIP:
                continue
            checked += 1
            got = result[layer][core_name]
            if got != expected:
                mismatches.append((row["case_id"], row["flight_day"], csv_name, expected, got))
    return mismatches, checked


def test_final_levels_match_the_answer_key():
    """Final level (both layers) matches every non-pending expected value.
    El nivel final coincide con cada valor esperado no pendiente.
    """
    mismatches, checked = compare("final", "expected_level_")
    assert checked > 1500
    assert mismatches == []


def test_clinical_layer_matches_the_answer_key():
    """Clinical layer alone matches every non-pending expected value.
    La capa clínica sola coincide con cada valor esperado no pendiente.
    """
    mismatches, checked = compare("clinical", "expected_clinical_level_")
    assert checked > 1400
    assert mismatches == []
