# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Writes data/clinical_test_cases.csv from the hand-written clinical cases.
Escribe data/clinical_test_cases.csv a partir de los casos clínicos escritos a mano.

SIMULATED DATA - NOT REAL ASTRONAUT DATA.
DATOS SIMULADOS - NO SON DATOS REALES DE ASTRONAUTAS.

Run from the repo root / Correr desde la raíz del repo:
    python -m backend.simulator.generate_clinical_test_data

Layout of the 188 rows / Orden de las 188 filas:
    days 1-3     no baseline yet (3 cases)
    days 4-10    baseline days (order shuffled with a fixed seed)
    day 11       separator (every measurement at its baseline mean)
    single-day cases, alternating between measurements, with separators
    separator
    multi-day sequences, alternating between measurements
    radiation cases (last, because the cumulative dose can only go up)
"""

import csv
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path

from backend.simulator import clinical_cases as cases

# Fixed seed: the same seed always gives the same CSV.
# Semilla fija: la misma semilla siempre da el mismo CSV.
SEED = 2026
ASTRONAUT_ID = "SIM-01"  # fictional / ficticio
MISSION_START = datetime(2031, 1, 1, 7, 0, tzinfo=timezone.utc)  # fictional / ficticio
OUTPUT_CSV = Path(__file__).resolve().parents[2] / "data" / "clinical_test_cases.csv"

MEASUREMENTS = list(cases.MEASUREMENT_COLUMNS)
VALUE_COLUMNS = [col for cols in cases.MEASUREMENT_COLUMNS.values() for col in cols]
COLUMNS = (
    ["flight_day", "timestamp", "astronaut_id", "simulated"]
    + VALUE_COLUMNS
    + cases.SYMPTOM_COLUMNS
    + ["case_id"]
    + ["expected_level_" + m for m in MEASUREMENTS]
    + ["expected_clinical_level_" + m for m in MEASUREMENTS]
    + ["note"]
)


def radiation_on_day(flight_day):
    """Cumulative dose on a day that does not test radiation (simulated rate).
    Dosis acumulada en un día que no prueba radiación (ritmo simulado).
    """
    return round(cases.RADIATION_START_MSV + cases.RADIATION_DAILY_MSV * (flight_day - 1), 1)


def default_expected(flight_day):
    """Expected levels when nothing is under test: green, or "n/a" for the
    clinical layer of mood and PVT. Before the baseline exists, mood and PVT
    have no level at all, so their final level is "n/a" too.
    Niveles esperados cuando no se prueba nada: verde, o "n/a" en la capa
    clínica de ánimo y PVT. Antes de que exista la línea base, ánimo y PVT no
    tienen nivel, así que su nivel final también es "n/a".
    """
    expected = {}
    for m in MEASUREMENTS:
        if m not in cases.NO_CLINICAL_LAYER:
            expected[m] = ("green", "green")
        elif flight_day < cases.FIRST_DAY_WITH_BASELINE:
            expected[m] = ("n/a", "n/a")
        else:
            expected[m] = ("n/a", "green")
    return expected


def make_spec(case_id, values, expected, note):
    """One row before it gets its flight day. / Una fila antes de tener su día."""
    return {"case_id": case_id, "values": values, "expected": expected, "note": note}


def case_to_specs(case):
    """Turns a case (one or more days) into row specs.
    Convierte un caso (uno o más días) en filas.
    """
    return [make_spec(case["case_id"], d["values"], d["expected"], d["note"]) for d in case["days"]]


def separator_spec():
    """A normal day between cases, so no case leaks into the next one. It gets
    its number later (see number_separators).
    Un día normal entre casos, para que ningún caso se mezcle con el siguiente.
    Recibe su número después (ver number_separators).
    """
    note = "Separator: every measurement at its baseline mean."
    return make_spec("SEP", {}, {}, note)


def number_separators(specs):
    """Names the separators SEP-01, SEP-02, ... in order.
    Nombra los separadores SEP-01, SEP-02, ... en orden.
    """
    number = 0
    for spec in specs:
        if spec["case_id"] == "SEP":
            number += 1
            spec["case_id"] = f"SEP-{number:02d}"
    return specs


def baseline_specs(rng):
    """Days 4-10: the baseline values, each column shuffled with the seed.
    Días 4-10: los valores de línea base, cada columna mezclada con la semilla.
    """
    shuffled = {}
    for column, values in cases.BASELINE_DAY_VALUES.items():
        values = list(values)
        rng.shuffle(values)
        shuffled[column] = values
    specs = []
    for i in range(7):
        values = {column: shuffled[column][i] for column in shuffled}
        note = "Baseline day (flight days 4-10, team rule: Proposal). No deviation layer yet."
        specs.append(make_spec(f"BASE-{i + 1:02d}", values, {}, note))
    return specs


def interleave(groups):
    """Takes one case from each group in turn (round robin). If two cases of
    the same group would touch, puts a separator between them.
    Toma un caso de cada grupo por turno. Si dos casos del mismo grupo
    quedarían pegados, pone un separador entre ellos.
    """
    specs, last_group = [], None
    longest = max(len(group_cases) for group_cases in groups.values())
    for turn in range(longest):
        for group, group_cases in groups.items():
            if turn >= len(group_cases):
                continue
            if group == last_group:
                specs.append(separator_spec())
            specs.extend(case_to_specs(group_cases[turn]))
            last_group = group
    return specs


def build_specs():
    """All rows in order, without flight days yet.
    Todas las filas en orden, todavía sin día de vuelo.
    """
    rng = random.Random(SEED)
    specs = [spec for case in cases.NO_BASELINE_CASES for spec in case_to_specs(case)]
    specs += baseline_specs(rng)
    specs.append(separator_spec())
    specs += interleave(cases.SINGLE_CASES)
    specs.append(separator_spec())
    specs += interleave(cases.SEQUENCE_CASES)
    specs += [spec for case in cases.RADIATION_CASES for spec in case_to_specs(case)]
    return number_separators(specs)


def spec_to_row(flight_day, spec):
    """Fills one CSV row: normal values first, then the case's own values.
    Llena una fila: primero los valores normales, después los del caso.
    """
    row = {
        "flight_day": flight_day,
        "timestamp": (MISSION_START + timedelta(days=flight_day - 1)).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "astronaut_id": ASTRONAUT_ID,
        "simulated": 1,
    }
    row.update(cases.NORMAL_VALUES)
    row["radiation_dose_cumulative_msv"] = radiation_on_day(flight_day)
    row.update(spec["values"])
    expected = default_expected(flight_day)
    expected.update(spec["expected"])
    row["case_id"] = spec["case_id"]
    for m in MEASUREMENTS:
        row["expected_clinical_level_" + m], row["expected_level_" + m] = expected[m]
    row["note"] = spec["note"]
    return row


def build_rows():
    """All 188 rows, numbered by flight day. / Las 188 filas, numeradas por día."""
    return [spec_to_row(day, spec) for day, spec in enumerate(build_specs(), start=1)]


def write_csv(rows, path=OUTPUT_CSV):
    """Writes the rows as UTF-8 CSV. / Escribe las filas como CSV UTF-8."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=COLUMNS, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    all_rows = build_rows()
    write_csv(all_rows)
    print(f"Wrote {len(all_rows)} rows to {OUTPUT_CSV}")
