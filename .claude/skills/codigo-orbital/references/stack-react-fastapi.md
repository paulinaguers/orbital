# Stack A: React + FastAPI (chosen on 13/11)

Three layers: **Engine · Python** computes (baseline, z-score, levels); **API · FastAPI** serves those results; **Screen · React** shows them. The screen never computes.

## Flow

```text
simulator (Python) → core (backend/core) → API (FastAPI) → screens (React)
                                  └→ demo.json ──────────────→ React (demo mode)
```

## API (backend/api/)

- Start it with `uvicorn backend.api.main:app --reload`; automatic documentation at `/docs`.
- Suggested minimum endpoints:
  - `GET /astronauts/{id}/status?day=N` → level per system and per indicator
  - `GET /astronauts/{id}/series/{indicator}` → values, baseline and z for the charts
  - `GET /astronauts/{id}/alerts` → list of alerts with reason and origin (rule or ML)
- The API only calls core functions; it does not compute.
- Enable CORS for React's local origin.
- Tests with `fastapi.testclient`.

## Demo mode

- Script `backend/export_demo.py` calls the core for every scenario and writes `frontend/src/data/demo.json`.
- React reads the JSON when the API is not available. The demo in front of the jury must not depend on the API being up.

## Screens (Google AI Studio → React)

- Ask AI Studio for one screen per prompt, not the whole app. Keep every prompt in `docs/prompts-ai-studio.md` (it goes to the logbook and to the AI-use statement).
- Export the code to `frontend/` after every step that works.
- Components: human figure (SVG) colored by system, traffic light per indicator, trend chart with the baseline band, alert panel and "ML calibrating" notice.
- React does not choose colors by threshold: it uses the level returned by the API.
