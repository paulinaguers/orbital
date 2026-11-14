# Variante B: Streamlit (plan de rescate)

Streamlit arma una página web con gráficos y botones escribiendo solo Python. Se usa si React o la conexión con FastAPI se traban, o si el equipo lo elige desde el inicio.

## Flujo

```text
simulator (Python) → núcleo (backend/core) → app Streamlit (frontend/app.py)
```

Un solo proceso, sin API: la app importa el núcleo directamente.

## Reglas

- Levantar con `streamlit run frontend/app.py`.
- `frontend/app.py` solo arma la interfaz y llama funciones de `backend/core/`.
- Gráficos con plotly (`st.plotly_chart`), con la banda de línea base y los puntos coloreados por nivel.
- Figura humana: un SVG embebido con colores por sistema (`st.components.v1.html` o imagen generada), o una grilla de tarjetas por sistema si el tiempo no alcanza.
- Selector de astronauta, día y escenario de demo en la barra lateral.
- Cachear la carga de datos con `@st.cache_data`.
- Para publicar un link para el jurado: Streamlit Community Cloud (gratis) desde el repo.
