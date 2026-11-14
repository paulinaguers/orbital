---
name: codigo-orbital
description: Convenciones de código y estructura del proyecto ORBITAL. Usar siempre que se escriba, modifique o revise código del proyecto (Python, FastAPI, React, Streamlit, simulador, tests), al crear archivos o carpetas, al elegir librerías o al preparar un commit.
---

# Código de ORBITAL

El equipo programa en Python a nivel inicial y supervisa lo que escribe la IA. El código tiene que poder explicarse al jurado.

## Estado del stack

> **Sin confirmar hasta el sábado 10:00.** Cuando se decida, borrar la variante que no se usa en `references/` y actualizar esta línea.

- Variante A, propuesta ORBITAL: `references/stack-react-fastapi.md`
- Variante B, plan de rescate: `references/stack-streamlit.md`

En ambas, el **núcleo es el mismo** y no depende de la interfaz.

## Estructura

```text
backend/
  core/              # núcleo: SIN imports de FastAPI, Streamlit ni React
    umbrales.py      # tabla de umbrales clínicos (valores de la skill fisiologia-espacial)
    linea_base.py    # media, desvío, puntaje z
    escalamiento.py  # verde / amarillo / naranja / rojo
    ml/              # capa opcional de anomalías (solo si pasa el corte 1)
  simulador/         # genera datos simulados + anomalías inyectadas con fecha
  api/               # FastAPI (variante A)
  tests/             # pytest, un archivo por módulo del núcleo
frontend/            # React de AI Studio (A) o app Streamlit (B)
datos/               # CSV/SQLite generados (simulados)
docs/
```

## Reglas

1. **Núcleo separado.** Todo cálculo clínico vive en `backend/core/`. La interfaz solo muestra lo que devuelve el núcleo.
2. **Umbrales en un solo lugar:** `backend/core/umbrales.py`, como diccionario con un comentario de fuente por valor. Nunca números sueltos en otros archivos.
3. **Funciones cortas** (idealmente < 30 líneas), con docstring en español que diga qué recibe, qué devuelve y por qué existe.
4. **Nombres en español**, descriptivos: `calcular_puntaje_z`, `nivel_por_umbral`.
5. **Tests obligatorios** para cada regla del núcleo: un caso verde, uno amarillo, uno rojo y los bordes. Usar `pytest`.
6. **Datos simulados** marcados: columna `simulado = True` o carpeta `datos/` con README.
7. **Librerías permitidas sin consultar:** Python estándar, pandas, numpy, pytest, scikit-learn (solo capa ML), plotly. Cualquier otra se consulta al equipo.
8. **Sin secretos en el repo.** Nada de claves de API.
9. **Commits chicos** en español, en imperativo: `agrega cálculo de puntaje z con tests`.
10. **Imports como paquete:** cada carpeta de `backend/` lleva un `__init__.py` vacío; los imports son absolutos desde la raíz (`from backend.core.linea_base import calcular_puntaje_z`); los tests se corren siempre desde la raíz del repo con `python -m pytest`. Así no dependen de la carpeta desde donde se ejecutan.
11. **Entorno:** conda `orbital` (Python 3.11). Antes de abrir Claude Code: `conda activate orbital`.
12. **Ramas:** `main` siempre funciona. La capa de ML va en la rama `ml` hasta que pase el corte 2.

## Checklist antes de cada commit (lo usa el subagente revisor)

- [ ] Tests pasan
- [ ] Ningún umbral fuera de `umbrales.py`, y todos coinciden con la skill clínica
- [ ] La interfaz no calcula nada clínico
- [ ] Docstrings en español
- [ ] Sin dependencias nuevas no aprobadas
- [ ] Datos simulados identificados
