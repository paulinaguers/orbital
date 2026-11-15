# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Checks for the simulated clinical test dataset (data/clinical_test_cases.csv).

These tests check the dataset itself, not the core: the core does not exist yet.
"""

import csv
import statistics

from backend.simulator import clinical_cases as cases
from backend.simulator import clinical_cases_markdown as markdown
from backend.simulator import generate_clinical_test_data as generator

LEVELS = {"green", "yellow", "orange", "red", "PENDING"}
CLINICAL_LEVELS = LEVELS | {"n/a"}
FIRST_TEST_DAY = 11  # after the baseline days 4-10

# Measurements with a baseline (z-score) layer, and their columns.
DEVIATION_COLUMNS = {
    "blood_pressure": ["blood_pressure_systolic_mmhg", "blood_pressure_diastolic_mmhg"],
    "heart_rate": ["heart_rate_bpm"],
    "spo2": ["spo2_pct"],
    "glucose": ["glucose_mg_dl"],
    "mood_vas": ["mood_vas_score"],
    "pvt_lapses": ["pvt_lapses"],
}


def read_committed_rows():
    """Reads the committed CSV as a list of dicts (all values are text).
    """
    with open(generator.OUTPUT_CSV, encoding="utf-8", newline="") as file:
        return list(csv.DictReader(file))


def as_text(rows):
    """Turns generated rows into text, like the CSV reader does.
    """
    return [{key: str(value) for key, value in row.items()} for row in rows]


def changed_columns(case_id):
    """Columns that a case changes on any of its days.
    """
    for case in all_cases():
        if case["case_id"] == case_id:
            return {col for day in case["days"] for col in day["values"]}
    return set()


def all_cases():
    """Every hand-written case in one list."""
    found = list(cases.NO_BASELINE_CASES) + list(cases.RADIATION_CASES)
    for group in list(cases.SINGLE_CASES.values()) + list(cases.SEQUENCE_CASES.values()):
        found.extend(group)
    return found


def test_csv_is_up_to_date_and_reproducible():
    """The committed CSV equals a fresh run, and two runs are equal.
    """
    first_run, second_run = generator.build_rows(), generator.build_rows()
    assert first_run == second_run
    assert read_committed_rows() == as_text(first_run)


def test_markdown_is_up_to_date_and_lists_every_case():
    """The committed .md equals a fresh run, and it lists every case of the CSV.
    """
    committed = markdown.OUTPUT_MD.read_text(encoding="utf-8")
    assert committed == markdown.build_markdown(generator.build_rows())
    for row in read_committed_rows():
        if not row["case_id"].startswith(("BASE-", "SEP-")):
            assert f"| {row['case_id']} | {row['flight_day']} |" in committed, row["case_id"]


def test_size_identity_and_simulated_flag():
    """188 rows, 43 columns, one fictional astronaut, all marked simulated.
    """
    rows = read_committed_rows()
    assert len(rows) == 188
    assert list(rows[0]) == generator.COLUMNS and len(generator.COLUMNS) == 43
    assert {row["astronaut_id"] for row in rows} == {"SIM-01"}
    assert {row["simulated"] for row in rows} == {"1"}
    assert [int(row["flight_day"]) for row in rows] == list(range(1, 189))


def test_case_ids_are_unique_and_contiguous():
    """Each case_id is used by one case only, on consecutive rows.
    """
    ids = [case["case_id"] for case in all_cases()]
    assert len(ids) == len(set(ids))
    seen, previous = set(), None
    for row in read_committed_rows():
        case_id = row["case_id"]
        if case_id != previous:
            assert case_id not in seen, f"{case_id} appears in two places"
            seen.add(case_id)
        previous = case_id


def test_expected_levels_are_valid_and_pending_names_a_decision():
    """Only known levels; every PENDING row names an open decision in its note.
    """
    for row in read_committed_rows():
        finals = [row["expected_level_" + m] for m in generator.MEASUREMENTS]
        clinicals = [row["expected_clinical_level_" + m] for m in generator.MEASUREMENTS]
        assert set(finals) <= CLINICAL_LEVELS and set(clinicals) <= CLINICAL_LEVELS
        if "PENDING" in finals + clinicals:
            assert any(code in row["note"] for code in cases.DECISIONS), row["case_id"]


def test_final_na_only_for_mood_and_pvt_before_the_baseline():
    """A final level of "n/a" appears only for mood and PVT before day 11,
    because they have no clinical layer and no baseline yet.
    """
    for row in read_committed_rows():
        for m in generator.MEASUREMENTS:
            if row["expected_level_" + m] == "n/a":
                assert m in cases.NO_CLINICAL_LAYER, (row["case_id"], m)
                assert int(row["flight_day"]) < cases.FIRST_DAY_WITH_BASELINE, (row["case_id"], m)


def test_final_level_never_below_clinical_and_red_needs_clinical_red():
    """The higher layer wins, so final >= clinical; and a baseline deviation
    alone never reaches red, so final red needs clinical red.
    """
    rank = {"green": 0, "yellow": 1, "orange": 2, "red": 3}
    for row in read_committed_rows():
        for m in generator.MEASUREMENTS:
            clinical = row["expected_clinical_level_" + m]
            final = row["expected_level_" + m]
            if clinical in rank and final in rank:
                assert rank[final] >= rank[clinical], (row["case_id"], m)
            if final == "red" and m not in cases.NO_CLINICAL_LAYER:
                assert clinical == "red", (row["case_id"], m)


def test_baseline_days_give_the_designed_mean_and_pstdev():
    """Days 4-10 give the planned mean and statistics.pstdev for each column.
    """
    rows = read_committed_rows()[3:10]
    assert [row["flight_day"] for row in rows] == [str(day) for day in range(4, 11)]
    for column, (mean, std_dev) in cases.BASELINE_DESIGN.items():
        values = [float(row[column]) for row in rows]
        assert statistics.mean(values) == mean, column
        assert statistics.pstdev(values) == std_dev, column


def test_radiation_never_goes_down():
    """The cumulative dose never decreases."""
    doses = [float(row["radiation_dose_cumulative_msv"]) for row in read_committed_rows()]
    assert doses == sorted(doses)


def test_columns_not_under_test_stay_at_baseline_mean():
    """From day 11 on, every column a case does not change is at its normal value.
    """
    for row in read_committed_rows()[FIRST_TEST_DAY - 1:]:
        changed = changed_columns(row["case_id"])
        for column, normal in cases.NORMAL_VALUES.items():
            if column not in changed:
                assert row[column] == str(normal), (row["case_id"], column)


def test_cases_do_not_touch_another_reading_of_the_same_measurement():
    """The rows just before and after a case have its columns at normal values,
    so no case adds to another one's streak (radiation excluded: it only goes up).
    """
    rows = read_committed_rows()
    for case in all_cases():
        days = [i for i, row in enumerate(rows) if row["case_id"] == case["case_id"]]
        if days[0] < FIRST_TEST_DAY or case["case_id"].startswith("RAD"):
            continue
        columns = changed_columns(case["case_id"])
        for neighbour in (days[0] - 1, days[-1] + 1):
            for column in columns:
                assert rows[neighbour][column] == str(cases.NORMAL_VALUES[column]), (case["case_id"], column)


def test_extreme_readings_on_green_or_yellow_are_pending():
    """From day 11 on, a reading with |z| >= 2 whose clinical level is green,
    yellow or n/a must have a PENDING final level (⚠7 or Q1).
    """
    for row in read_committed_rows()[FIRST_TEST_DAY - 1:]:
        for measurement, columns in DEVIATION_COLUMNS.items():
            # For blood pressure we take the larger of the two |z| (systolic or
            # diastolic). How they combine is open (Q5); taking the larger one
            # is the strictest check.
            z_values = []
            for column in columns:
                mean, std_dev = cases.BASELINE_DESIGN[column]
                z_values.append(abs(float(row[column]) - mean) / std_dev)
            clinical = row["expected_clinical_level_" + measurement]
            if max(z_values) >= 2 and clinical in ("green", "yellow", "n/a"):
                assert row["expected_level_" + measurement] == "PENDING", (row["case_id"], measurement)
