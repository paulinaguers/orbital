# Variant B: Streamlit (fallback plan)

Streamlit builds a web page with charts and buttons using only Python. It is used if React or the connection to FastAPI get stuck, or if the team chooses it from the start.

## Flow

```text
simulator (Python) → core (backend/core) → Streamlit app (frontend/app.py)
```

A single process, no API: the app imports the core directly.

## Rules

- Start it with `streamlit run frontend/app.py`.
- `frontend/app.py` only builds the interface and calls functions from `backend/core/`.
- Charts with plotly (`st.plotly_chart`), with the baseline band and the points colored by level.
- Human figure: an embedded SVG colored by system (`st.components.v1.html` or a generated image), or a grid of cards per system if time runs short.
- Astronaut, day and demo-scenario selector in the sidebar.
- Cache data loading with `@st.cache_data`.
- To publish a link for the jury: Streamlit Community Cloud (free) from the repo.
