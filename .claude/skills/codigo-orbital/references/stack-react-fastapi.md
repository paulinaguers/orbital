# Stack A: React + FastAPI (elegido el 13/11)

Tres capas: **Motor · Python** calcula (línea base, z, niveles); **API · FastAPI** entrega esos resultados; **Pantalla · React** los muestra. La pantalla nunca calcula.

## Flujo

```text
simulator (Python) → núcleo (backend/core) → API (FastAPI) → pantallas (React)
                                    └→ demo.json ──────────────→ React (modo demo)
```

## API (backend/api/)

- `uvicorn backend.api.main:app --reload` para levantarla; documentación automática en `/docs`.
- Endpoints mínimos sugeridos:
  - `GET /astronauts/{id}/status?day=N` → nivel por sistema y por indicador
  - `GET /astronauts/{id}/series/{indicator}` → valores, línea base y z para gráficos
  - `GET /astronauts/{id}/alerts` → lista de alertas con motivo y origen (regla o ML)
- La API solo llama funciones del núcleo; no calcula.
- Habilitar CORS para el origen local de React.
- Tests con `fastapi.testclient`.

## Modo demo

- Script `backend/export_demo.py` que llama al núcleo para todos los escenarios y guarda `frontend/public/demo.json`.
- En React, una constante `DEMO_MODE` hace que lea el JSON en vez de la API. La demo ante el jurado no debe depender de que la API esté levantada.

## Pantallas (Google AI Studio → React)

- Pedir a AI Studio una pantalla por prompt, no la app entera. Guardar cada prompt en `docs/prompts-ai-studio.md` (va a la bitácora y a la declaración de SI).
- Exportar el código a `frontend/` después de cada paso que funcione.
- Componentes: figura humana (SVG) con color por sistema, semáforo por indicador, gráfico de evolución con la banda de línea base, panel de alertas y aviso "ML calibrando".
- React no decide colores por umbral: usa el nivel que devuelve la API.
