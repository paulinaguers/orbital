---
name: codigo-orbital
description: Convenciones de código y estructura del proyecto ORBITAL. Usar siempre que se escriba, modifique o revise código del proyecto (Python, FastAPI, React, Streamlit, simulador, tests), al crear archivos o carpetas, al elegir librerías o al preparar un commit.
---

# Código de ORBITAL

El equipo programa en Python a nivel inicial y supervisa lo que escribe la IA. El código tiene que poder explicarse al jurado.

## Estado del stack

> **Decidido el 13/11: Stack A** (React generado con Google AI Studio + FastAPI + núcleo en Python, con `demo.json` de respaldo). **Stack B** (Streamlit) queda solo como rescate si React o la API no llegan.

- Stack A, el elegido: `references/stack-react-fastapi.md`
- Stack B, rescate: `references/stack-streamlit.md`

En ambas, el **núcleo es el mismo** y no depende de la interfaz.

## Estructura

```text
backend/
  core/              # núcleo: SIN imports de FastAPI, Streamlit ni React
    thresholds.py    # umbrales clínicos (valores de la skill fisiologia-espacial)
    baseline.py      # media, desvío, puntaje z
    escalation.py    # green / yellow / orange / red
    ml/              # capa opcional de anomalías (solo si pasa el corte 1)
  simulator/         # genera datos simulados + anomalías inyectadas con fecha
  api/               # FastAPI (variante A)
  tests/             # pytest, un archivo por módulo del núcleo
frontend/            # React de AI Studio (A) o app Streamlit (B)
data/                # SQLite generado (simulado): data/orbital.db
docs/
```

## Reglas

1. **Núcleo separado.** Todo cálculo clínico vive en `backend/core/`. La interfaz solo muestra lo que devuelve el núcleo.
2. **Umbrales en un solo lugar:** `backend/core/thresholds.py`, como diccionario con un comentario de fuente por valor. Nunca números sueltos en otros archivos.
3. **Funciones cortas** (idealmente < 30 líneas), con **docstring en dos idiomas, primero inglés y después español**: qué hace, qué recibe, qué devuelve y por qué existe. Ejemplo:
   ```python
   def calculate_z_score(value, mean, std_dev):
       """Measures how far a reading is from the astronaut's personal baseline.
       Calcula cuánto se aleja una medición de la línea base del astronauta.

       Returns the z-score: 0 = usual; 2 = far from usual.
       Devuelve el puntaje z: 0 = lo habitual; 2 = muy alejado.
       """
   ```
4. **Nombres en inglés** (archivos, funciones, variables, tablas, endpoints), descriptivos y con los términos de `references/glosario-codigo.md`. Comentarios que explican el porqué: inglés primero y español después.
5. **Tests obligatorios** para cada regla del núcleo: un caso verde, uno amarillo, uno rojo y los bordes. Usar `pytest`.
6. **Datos simulados** marcados: columna `simulated = 1` y carpeta `data/` con README.
7. **Librerías permitidas sin consultar:** Python estándar, pandas, numpy, pytest, scikit-learn (solo capa ML), plotly. Cualquier otra se consulta al equipo.
8. **Sin secretos en el repo.** Nada de claves de API.
9. **Commits chicos en inglés**, en imperativo: `add z-score calculation with tests`.
10. **Imports como paquete:** cada carpeta de `backend/` lleva un `__init__.py` vacío; los imports son absolutos desde la raíz (`from backend.core.baseline import calculate_z_score`); los tests se corren siempre desde la raíz del repo con `python -m pytest`. Así no dependen de la carpeta desde donde se ejecutan.
11. **Entorno:** conda `orbital` (Python 3.11). Antes de abrir Claude Code: `conda activate orbital`.
12. **Ramas:** `main` siempre funciona. La capa de ML va en la rama `ml` hasta que pase el corte 2.
13. **Marca de SI en cada archivo de código** (regla de la entrega): primera línea de comentario `# Generated with SI assistance (Claude), reviewed by the ORBITAL team.` (en JS/TS: `// ...`). Los commits ya llevan la firma de Claude.
14. **Licencia:** el repo lleva `LICENSE` Apache 2.0 en la raíz. Las librerías que se agreguen tienen que ser de código abierto.
15. **Interfaz:** sin logos de NASA ni de la CSA; textos visibles en inglés; cada tarjeta muestra el riesgo oficial de NASA que vigila (tabla en la skill `fisiologia-espacial`, `references/riesgos-nasa.md`).

## Checklist antes de cada commit (lo usa el subagente revisor)

- [ ] Tests pasan
- [ ] Ningún umbral fuera de `thresholds.py`, y todos coinciden con la skill clínica
- [ ] La interfaz no calcula nada clínico
- [ ] Nombres en inglés y docstrings en los dos idiomas (inglés primero)
- [ ] Sin dependencias nuevas no aprobadas
- [ ] Datos simulados identificados
- [ ] Comentario de marca de SI al inicio de cada archivo nuevo
