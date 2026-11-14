# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Checks the demo scenarios and the exported demo.json.
Controla los escenarios de demo y el demo.json exportado.

If test_files_are_up_to_date fails after replacing frontend/ with a new
AI Studio export, run: python -m backend.export_demo
Si falla después de reemplazar frontend/ con un export nuevo de AI Studio,
correr: python -m backend.export_demo
"""

import csv
import json

from backend import export_demo
from backend.core.escalation import evaluate_timeline, latest_levels
from backend.core.levels import highest
from backend.simulator import demo_scenarios as demo

STATUS_KEYS = {"profile", "simulated", "astronaut", "overall_level", "overall_message",
               "escalation", "blocks", "tests", "rewards"}


def day42(name):
    """Latest levels and overall level of a scenario. / Niveles finales de un escenario."""
    levels = latest_levels(evaluate_timeline(demo.build_scenario(name)))
    return levels, highest(*levels.values())


def test_scenarios_are_reproducible():
    """Same seed, same data. / Misma semilla, mismos datos."""
    assert demo.build_scenario("emergency") == demo.build_scenario("emergency")


def test_files_are_up_to_date():
    """The committed CSV and demo.json equal a fresh run.
    El CSV y el demo.json commiteados son iguales a una corrida nueva.
    """
    with open(demo.OUTPUT_CSV, encoding="utf-8", newline="") as file:
        rows = list(csv.DictReader(file))
    fresh = [demo.to_row(n, d) for n in demo.SCENARIOS for d in demo.build_scenario(n)]
    assert rows == [{k: str(v) for k, v in row.items()} for row in fresh]
    assert all(row["simulated"] == "1" for row in rows)
    committed = json.loads(export_demo.OUTPUT_JSON.read_text(encoding="utf-8"))
    assert committed == json.loads(json.dumps(export_demo.build_demo(), ensure_ascii=False))


def test_healthy_scenario_has_no_alerts_at_all():
    """No false alarms in 42 healthy days. / Sin falsas alarmas en 42 días sanos."""
    for result in evaluate_timeline(demo.build_scenario("healthy")):
        assert set(result["final"].values()) <= {"green", None}, result["flight_day"]


def test_deterioration_ends_yellow_in_sleep_co2_and_pvt():
    """The demo story: soft warnings, no consultation. / Avisos suaves, sin consulta."""
    levels, overall = day42("deterioration")
    assert overall == "yellow"
    assert {m for m, lvl in levels.items() if lvl != "green"} == {"sleep_hours", "cabin_co2", "pvt_lapses"}


def test_attention_ends_orange_from_the_personal_baseline():
    """Heart rate 66-67 is clinically normal (green) but orange against Alex's own
    baseline: the personal baseline at work.
    FC 66-67 es normal clínicamente (verde) pero naranja contra la línea base
    propia de Alex: la línea base personal en acción.
    """
    results = evaluate_timeline(demo.build_scenario("attention"))
    assert results[-1]["clinical"]["heart_rate"] == "green"
    assert results[-1]["final"]["heart_rate"] == "orange"
    assert day42("attention")[1] == "orange"
    status = export_demo.build_demo()["scenarios"]["attention"]["status"]
    assert status["escalation"]["notified"] == ["Onboard doctor", "Flight surgeon (Earth)"]


def test_emergency_ends_red_and_notifies_the_team():
    """SpO2 89 % and two short nights: red, with the red notification list.
    SpO2 89 % y dos noches cortas: rojo, con la lista de aviso rojo.
    """
    levels, overall = day42("emergency")
    assert overall == "red" and levels["spo2"] == "red" and levels["sleep_hours"] == "red"
    status = export_demo.build_demo()["scenarios"]["emergency"]["status"]
    assert "Crewmate on board" in status["escalation"]["notified"]


def test_demo_json_has_the_screen_shape():
    """Every scenario has the keys of mockStatus.ts and a series per indicator.
    Cada escenario tiene las claves de mockStatus.ts y una serie por indicador.
    """
    data = export_demo.build_demo()
    assert data["simulated"] is True and data["default_scenario"] in data["scenarios"]
    for scenario in data["scenarios"].values():
        assert set(scenario["status"]) == STATUS_KEYS
        assert set(scenario["series"]) == set(export_demo.INDICATORS)
        assert [b["id"] for b in scenario["status"]["blocks"]] == [b[0] for b in export_demo.BLOCKS]
