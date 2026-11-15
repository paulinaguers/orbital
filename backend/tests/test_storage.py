# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Checks that the core reads the demo database (CSV) and not the simulator.
"""

import shutil

from backend import storage
from backend.core.escalation import evaluate_timeline, latest_levels
from backend.simulator import demo_scenarios as demo


def test_csv_round_trip_equals_simulator():
    """Reading the CSV gives exactly the simulated days."""
    for name in demo.SCENARIOS:
        assert storage.load_scenario(name) == demo.build_scenario(name)
    assert storage.list_scenarios() == demo.SCENARIOS


def test_editing_the_csv_changes_the_result(tmp_path):
    """If someone edits the database, the core sees it."""
    copy = tmp_path / "demo.csv"
    shutil.copy(storage.DEMO_CSV, copy)
    lines = copy.read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines):
        if line.startswith("healthy,42,"):
            cells = line.split(",")
            cells[7] = "89"  # spo2 column
            lines[i] = ",".join(cells)
    copy.write_text("\n".join(lines) + "\n", encoding="utf-8")
    levels = latest_levels(evaluate_timeline(storage.load_scenario("healthy", copy)))
    assert levels["spo2"] == "red"
