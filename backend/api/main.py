# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""ORBITAL API: serves the core's results to the screen and recalculates when
the astronaut completes a test.
API de ORBITAL: entrega los resultados del núcleo a la pantalla y recalcula
cuando el astronauta completa un test.

The API only calls the core; it never computes a level itself.
La API solo llama al núcleo; nunca calcula un nivel por su cuenta.

Run from the repo root / Correr desde la raíz del repo:
    uvicorn backend.api.main:app --reload
Docs / Documentación: http://localhost:8000/docs

Demo limits: one fictional astronaut (any id is accepted), crew profile only,
new test results live in memory until the API restarts or /reset is called.
Límites de la demo: un astronauta ficticio (se acepta cualquier id), solo
perfil tripulante; los tests nuevos quedan en memoria hasta reiniciar o /reset.
"""

from typing import List, Literal

from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError

from backend.core.alert_texts import read_texts
from backend.core.clinical import AMSLER_LEVELS, amsler_level
from backend.core.levels import LEVELS
from backend.core.raw_tests import classify_amsler, count_pvt_lapses
from backend.export_demo import DEFAULT_SCENARIO, scenario_entry
from backend.storage import list_scenarios, load_scenario

app = FastAPI(title="ORBITAL API", description="Simulated data. ORBITAL guides, it does not diagnose.")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"],
    allow_methods=["*"], allow_headers=["*"],
)

TEXTS = read_texts()
SESSION = {}


class CheckIn(BaseModel):
    """Daily check-in, 0-10 (10 = worst). / Check-in diario, 0-10 (10 = peor)."""
    flight_day: int
    mood_score: int = Field(ge=0, le=10)
    fatigue_score: int = Field(ge=0, le=10)
    stress_score: int = Field(ge=0, le=10)
    workload_score: int = Field(ge=0, le=10)


class PvtSession(BaseModel):
    """Raw reaction times of one PVT session. / Tiempos crudos de una sesión de PVT."""
    flight_day: int
    reaction_times_ms: List[float]
    false_starts: int = 0
    duration_s: int = 60


class AmslerResult(BaseModel):
    """Marked cells for one eye. / Celdas marcadas de un ojo."""
    flight_day: int
    eye: Literal["right", "left"]
    distortion: bool
    cells: List[List[int]] = []


def start_session(scenario):
    """Loads a scenario from the demo database and forgets new results.
    Carga un escenario de la base de la demo y olvida los resultados nuevos.
    """
    SESSION.update({"scenario": scenario, "days": load_scenario(scenario),
                    "amsler_cells": {"right": set(), "left": set()}})


def today(flight_day):
    """The stored day with that number, or the last day if it is not stored.
    El día guardado con ese número, o el último si no está.
    """
    for day in SESSION["days"]:
        if day["flight_day"] == flight_day:
            return day
    return SESSION["days"][-1]


def current():
    """Status and series of the session, freshly computed by the core.
    Estado y series de la sesión, recién calculados por el núcleo.
    """
    return scenario_entry(SESSION["days"], TEXTS)


def apply_report(payload):
    """Stores one test result in the right day (check-in, PVT or Amsler).
    Guarda un resultado de test en el día que corresponde.
    """
    for model in (CheckIn, PvtSession, AmslerResult):
        try:
            report = model.model_validate(payload)
        except ValidationError:
            continue
        day = today(report.flight_day)
        if isinstance(report, CheckIn):
            day.update(report.model_dump(exclude={"flight_day"}))
        elif isinstance(report, PvtSession):
            day["pvt_lapses"] = count_pvt_lapses(report.reaction_times_ms)
        else:
            cells = {tuple(c) for c in report.cells} if report.distortion else set()
            category = classify_amsler(cells, SESSION["amsler_cells"][report.eye])
            SESSION["amsler_cells"][report.eye] = cells
            previous = day.get("vision_amsler") if day.get("vision_amsler") in AMSLER_LEVELS else "no_change"
            day["vision_amsler"] = max(previous, category, key=lambda c: LEVELS.index(amsler_level(c)))
        return
    raise HTTPException(status_code=422, detail="Not a check-in, PVT session or Amsler result.")


def crew_only(profile):
    """The API serves the crew profile; passenger data stays in the screen's mocks.
    La API sirve el perfil tripulante; el pasajero usa los datos fijos de la pantalla.
    """
    if profile != "crew":
        raise HTTPException(status_code=404, detail="Only the crew profile is served by the API.")


@app.get("/health")
def health():
    """Quick check that the API is up. / Control rápido de que la API está levantada."""
    return {"ok": True, "scenario": SESSION["scenario"], "simulated": True}


@app.get("/scenarios")
def scenarios():
    """Available demo scenarios and the active one. / Escenarios y el activo."""
    return {"scenarios": list_scenarios(), "active": SESSION["scenario"]}


@app.post("/scenarios/{name}")
def choose_scenario(name: str):
    """Switches scenario and resets new results. / Cambia de escenario y reinicia."""
    if name not in list_scenarios():
        raise HTTPException(status_code=404, detail=f"Unknown scenario: {name}")
    start_session(name)
    return current()["status"]


@app.post("/reset")
def reset():
    """Back to the stored data of the active scenario. / Vuelve a los datos guardados."""
    start_session(SESSION["scenario"])
    return current()["status"]


@app.get("/astronauts/{astronaut_id}/status")
def status(astronaut_id: str, profile: str = "crew"):
    """Current status (same shape as mockStatus.ts). / Estado actual."""
    crew_only(profile)
    return current()["status"]


@app.get("/astronauts/{astronaut_id}/series/{indicator}")
def series(astronaut_id: str, indicator: str, profile: str = "crew"):
    """Last 14 days of one indicator (same shape as mockSeries.ts). / Últimos 14 días."""
    crew_only(profile)
    all_series = current()["series"]
    if indicator not in all_series:
        raise HTTPException(status_code=404, detail=f"Unknown indicator: {indicator}")
    return all_series[indicator]


@app.post("/astronauts/{astronaut_id}/self_reports")
def self_report(astronaut_id: str, payload: dict = Body(...)):
    """Receives a check-in, PVT session or Amsler result and returns the new status.
    Recibe un check-in, PVT o Amsler y devuelve el estado recalculado.
    """
    apply_report(payload)
    return current()["status"]


start_session(DEFAULT_SCENARIO)
