# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Checks the API with FastAPI's test client (no server needed).
Controla la API con el cliente de prueba de FastAPI (sin levantar servidor).
"""

import json

from fastapi.testclient import TestClient

from backend import export_demo
from backend.api.main import app

client = TestClient(app)


def setup_function():
    """Every test starts from the stored deterioration scenario.
    Cada test arranca del escenario de deterioro guardado.
    """
    client.post("/scenarios/deterioration")


def test_status_equals_demo_json():
    """The API and demo.json show the same thing. / La API y demo.json muestran lo mismo."""
    demo = json.loads(export_demo.OUTPUT_JSON.read_text(encoding="utf-8"))
    body = client.get("/astronauts/SIM-02/status").json()
    assert body == demo["scenarios"]["deterioration"]["status"]
    assert body["overall_level"] == "yellow"


def test_series_and_unknown_indicator():
    """A series has 14 days or fewer; unknown ids give 404. / Serie y 404."""
    assert len(client.get("/astronauts/SIM-02/series/heart_rate").json()["points"]) == 14
    assert client.get("/astronauts/SIM-02/series/nope").status_code == 404


def test_passenger_profile_is_not_served():
    """Passenger stays on the screen's mocks. / El pasajero usa los datos fijos."""
    assert client.get("/astronauts/P1/status?profile=passenger").status_code == 404


def pvt_indicator(body):
    """The PVT indicator of a status. / El indicador de PVT de un estado."""
    sleep_block = next(b for b in body["blocks"] if b["id"] == "sleep_cognition")
    return next(i for i in sleep_block["indicators"] if i["id"] == "pvt_lapses")


def send_pvt(times, stimuli):
    """Posts one PVT session for day 42. / Envía una sesión de PVT del día 42."""
    return client.post("/astronauts/SIM-02/self_reports",
                       json={"flight_day": 42, "reaction_times_ms": times, "stimuli_count": stimuli,
                             "false_starts": 0, "duration_s": 60})


def test_slow_pvt_turns_reaction_yellow_live():
    """3 slow answers and 2 unanswered stimuli = 5 lapses: PVT is yellow.
    3 respuestas lentas y 2 estímulos sin respuesta = 5 lapsos: amarillo.
    """
    body = send_pvt([300] * 10 + [600] * 3, 15).json()
    assert pvt_indicator(body)["value"] == 5 and pvt_indicator(body)["level"] == "yellow"
    assert next(t for t in body["tests"] if t["id"] == "pvt")["due"] is False


def test_pvt_without_answers_is_not_green():
    """No answers at all: every stimulus is an omission, never "0 lapses, green".
    Sin ninguna respuesta: cada estímulo es una omisión, nunca "0 lapsos, verde".
    """
    body = send_pvt([], 15).json()
    assert pvt_indicator(body)["value"] == 15 and pvt_indicator(body)["level"] != "green"


def test_pvt_with_too_few_stimuli_is_not_evaluable():
    """Fewer than 5 stimuli: the session cannot be scored.
    Menos de 5 estímulos: la sesión no se puede puntuar.
    """
    assert pvt_indicator(send_pvt([300, 300], 3).json())["level"] == "not_evaluable"


def test_pvt_rejects_impossible_values():
    """Negative or too long times, or more answers than stimuli, give 422.
    Tiempos negativos o demasiado largos, o más respuestas que estímulos, dan 422.
    """
    assert send_pvt([-5, 300, 300, 300, 300], 10).status_code == 422
    assert send_pvt([300, 99999, 300, 300, 300], 10).status_code == 422
    assert send_pvt([300] * 6, 5).status_code == 422


def test_checkin_headache_with_high_co2_turns_orange():
    """A ticked headache changes the CO2 rule (deterioration: CO2 yellow).
    Un dolor de cabeza marcado cambia la regla de CO2 (deterioro: CO2 amarillo).
    """
    body = client.post("/astronauts/SIM-02/self_reports",
                       json={"flight_day": 42, "mood_score": 2, "fatigue_score": 3, "stress_score": 2,
                             "workload_score": 3, "symptoms": {"headache": True}}).json()
    env = next(b for b in body["blocks"] if b["id"] == "environment")
    assert env["indicators"][0]["level"] == "orange"


def test_checkin_updates_mood():
    """A check-in replaces today's self-report. / El check-in reemplaza el de hoy."""
    body = client.post("/astronauts/SIM-02/self_reports",
                       json={"flight_day": 42, "mood_score": 1, "fatigue_score": 2,
                             "stress_score": 2, "workload_score": 3}).json()
    mental = next(b for b in body["blocks"] if b["id"] == "mental_health")
    assert mental["indicators"][0]["value"] == 1


def test_amsler_distortion_then_confirmed():
    """New distortion waits for a retest (yellow); repeated, it is confirmed (orange).
    Una distorsión nueva espera repetición (amarillo); repetida, se confirma (naranja).
    """
    result = {"flight_day": 42, "eye": "right", "distortion": True, "cells": [[9, 10]]}
    first = client.post("/astronauts/SIM-02/self_reports", json=result).json()
    second = client.post("/astronauts/SIM-02/self_reports", json=result).json()
    level = lambda body: next(b for b in body["blocks"] if b["id"] == "environment")["indicators"][2]["level"]
    assert level(first) == "yellow" and level(second) == "orange"


def test_amsler_sudden_change_is_red():
    """"Appeared suddenly" makes the red category reachable.
    "Apareció de golpe" hace alcanzable la categoría roja.
    """
    result = {"flight_day": 42, "eye": "left", "distortion": True, "sudden_change": True, "cells": [[3, 3]]}
    body = client.post("/astronauts/SIM-02/self_reports", json=result).json()
    assert next(b for b in body["blocks"] if b["id"] == "environment")["indicators"][2]["level"] == "red"


def test_bad_payload_and_reset():
    """Unknown payloads give 422; reset brings back the stored data.
    Un envío desconocido da 422; reset vuelve a los datos guardados.
    """
    assert client.post("/astronauts/SIM-02/self_reports", json={"foo": 1}).status_code == 422
    unknown_day = {"flight_day": 99, "mood_score": 1, "fatigue_score": 1, "stress_score": 1, "workload_score": 1}
    assert client.post("/astronauts/SIM-02/self_reports", json=unknown_day).status_code == 422
    assert client.post("/reset").json()["overall_level"] == "yellow"
    assert client.get("/scenarios").json()["active"] == "deterioration"
    assert client.post("/scenarios/emergency").json()["overall_level"] == "red"
