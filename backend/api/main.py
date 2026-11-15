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
from pydantic import BaseModel, Field, ValidationError, model_validator

from backend.core.alert_texts import read_texts
from backend.core.clinical import AMSLER_LEVELS, amsler_level
from backend.core.levels import LEVELS
from backend.core.raw_tests import classify_amsler, score_pvt_session
from backend.core.thresholds import THRESHOLDS
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


WINDOW_MS = THRESHOLDS["pvt_lapses"]["response_window_ms"]


class Symptoms(BaseModel):
    """Symptom boxes of the check-in (unticked = False).
    Casillas de síntomas del check-in (sin marcar = False).

    Dizziness and feeling faint feed the low blood pressure rule; headache
    feeds the CO2 rule. Cold sore or rash is only recorded: it would feed the
    temperature rule, which is not in the MVP.
    Mareo y desmayo alimentan la regla de presión baja; dolor de cabeza, la de
    CO2. Herpes o erupción solo se registra (temperatura no está en el MVP).
    """
    dizziness: bool = False
    lightheaded_or_faint: bool = False
    headache: bool = False
    cold_sore_or_rash: bool = False


class CheckIn(BaseModel):
    """Daily check-in, 0-10 (10 = worst), plus symptoms.
    Check-in diario, 0-10 (10 = peor), más síntomas.
    """
    flight_day: int = Field(ge=1)
    mood_score: int = Field(ge=0, le=10)
    fatigue_score: int = Field(ge=0, le=10)
    stress_score: int = Field(ge=0, le=10)
    workload_score: int = Field(ge=0, le=10)
    symptoms: Symptoms = Symptoms()


class PvtSession(BaseModel):
    """One brief PVT session: answered reaction times plus all stimuli shown.
    Una sesión breve de PVT: tiempos respondidos más todos los estímulos.

    A stimulus with no answer inside the response window is an omission.
    Un estímulo sin respuesta dentro de la ventana es una omisión.
    """
    flight_day: int = Field(ge=1)
    reaction_times_ms: List[float] = Field(max_length=500)
    stimuli_count: int = Field(ge=0, le=500)
    false_starts: int = Field(0, ge=0, le=500)
    duration_s: int = Field(60, ge=10, le=600)

    @model_validator(mode="after")
    def check_times(self):
        """Times must be positive, inside the window, and not more than the stimuli.
        Los tiempos deben ser positivos, dentro de la ventana y no más que los estímulos.
        """
        if any(rt <= 0 or rt > WINDOW_MS for rt in self.reaction_times_ms):
            raise ValueError(f"Reaction times must be between 0 and {WINDOW_MS} ms.")
        if len(self.reaction_times_ms) > self.stimuli_count:
            raise ValueError("More answers than stimuli shown.")
        return self


class AmslerResult(BaseModel):
    """Marked cells for one eye, and whether the change appeared suddenly.
    Celdas marcadas de un ojo, y si el cambio apareció de golpe.
    """
    flight_day: int = Field(ge=1)
    eye: Literal["right", "left"]
    distortion: bool
    sudden_change: bool = False
    cells: List[List[int]] = []


# Which model a payload is, by its key field. / Qué modelo es, por su campo clave.
REPORT_MODELS = [("reaction_times_ms", PvtSession), ("eye", AmslerResult), ("mood_score", CheckIn)]


def start_session(scenario):
    """Loads a scenario from the demo database and forgets new results.
    Carga un escenario de la base de la demo y olvida los resultados nuevos.
    """
    SESSION.update({"scenario": scenario, "days": load_scenario(scenario),
                    "amsler_cells": {"right": set(), "left": set()}})


def today(flight_day):
    """The stored day with that number; an unknown day is an error (422).
    El día guardado con ese número; un día que no existe es un error (422).
    """
    for day in SESSION["days"]:
        if day["flight_day"] == flight_day:
            return day
    raise HTTPException(status_code=422, detail=f"Flight day {flight_day} is not in the mission data.")


def current():
    """Status and series of the session, freshly computed by the core.
    Estado y series de la sesión, recién calculados por el núcleo.
    """
    return scenario_entry(SESSION["days"], TEXTS)


def store_pvt(day, report):
    """Scores a PVT session in the core and stores it in the day.
    Puntúa una sesión de PVT en el núcleo y la guarda en el día.
    """
    score = score_pvt_session(report.reaction_times_ms, report.stimuli_count)
    day.update({"pvt_lapses": score["lapses"], "pvt_stimuli": score["stimuli"],
                "pvt_omissions": score["omissions"], "pvt_session_invalid": not score["valid"],
                # False starts are stored but not scored yet (future work).
                # Las anticipaciones se guardan pero todavía no se puntúan.
                "pvt_false_starts": report.false_starts})


def store_amsler(day, report):
    """Classifies an Amsler result against the last one of that eye.
    Clasifica un Amsler contra el anterior de ese ojo.
    """
    cells = {tuple(c) for c in report.cells} if report.distortion else set()
    category = classify_amsler(cells, SESSION["amsler_cells"][report.eye], report.sudden_change)
    SESSION["amsler_cells"][report.eye] = cells
    previous = day.get("vision_amsler") if day.get("vision_amsler") in AMSLER_LEVELS else "no_change"
    day["vision_amsler"] = max(previous, category, key=lambda c: LEVELS.index(amsler_level(c)))


def apply_report(payload):
    """Validates one test result and stores it in the right day.
    Valida un resultado de test y lo guarda en el día que corresponde.

    Invalid values (negative times, more answers than stimuli...) give 422.
    Valores inválidos (tiempos negativos, más respuestas que estímulos...) dan 422.
    """
    model = next((m for key, m in REPORT_MODELS if key in payload), None)
    if model is None:
        raise HTTPException(status_code=422, detail="Not a check-in, PVT session or Amsler result.")
    try:
        report = model.model_validate(payload)
    except ValidationError as error:
        raise HTTPException(status_code=422, detail=error.errors(include_url=False, include_context=False))
    day = today(report.flight_day)
    if isinstance(report, CheckIn):
        day.update(report.model_dump(exclude={"flight_day", "symptoms"}))
        day["symptoms"] = report.symptoms.model_dump()
    elif isinstance(report, PvtSession):
        store_pvt(day, report)
    else:
        store_amsler(day, report)


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
