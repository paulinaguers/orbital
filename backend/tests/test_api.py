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


def test_slow_pvt_turns_reaction_yellow_live():
    """5 slow answers today: the core recalculates and PVT is yellow.
    5 respuestas lentas hoy: el núcleo recalcula y el PVT queda amarillo.
    """
    times = [300] * 15 + [600] * 5
    body = client.post("/astronauts/SIM-02/self_reports",
                       json={"flight_day": 42, "reaction_times_ms": times, "false_starts": 0, "duration_s": 60}).json()
    sleep_block = next(b for b in body["blocks"] if b["id"] == "sleep_cognition")
    pvt = next(i for i in sleep_block["indicators"] if i["id"] == "pvt_lapses")
    assert pvt["value"] == 5 and pvt["level"] == "yellow"
    assert next(t for t in body["tests"] if t["id"] == "pvt")["due"] is False


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
