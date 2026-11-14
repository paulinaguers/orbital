# data/

> **Simulated data – not real astronaut data.**
> **Datos simulados – no son datos reales de astronautas.**

> **AI use / Uso de SI:** cases, generator and this file drafted with Claude Code (Opus 5.5) from the team's skills; clinical criteria and review by The Foxhole Court. / Casos, generador y este archivo redactados con Claude Code (Opus 5.5) a partir de las skills del equipo; criterio clínico y revisión de The Foxhole Court.

## clinical_test_cases.csv

**What it is.** A test dataset for one fictional astronaut (`SIM-01`, 188 flight days) that exercises every alert level and the main threshold boundaries (just below, at and just above each cut) of the 10 MVP measurements. Each row carries the level the core should return, written by hand from `docs/content/alert_texts.md` and the team's `fisiologia-espacial` skill. Thread A's core tests can use it as the answer key.
**Qué es.** Un set de datos de prueba de un astronauta ficticio (`SIM-01`, 188 días de vuelo) que recorre todos los niveles de alerta y los bordes principales de cada umbral (justo debajo, en el corte y justo encima) de las 10 mediciones del MVP. Cada fila trae el nivel que el núcleo debería devolver, escrito a mano desde `alert_texts.md` y la skill. Los tests del núcleo (hilo A) lo pueden usar como respuesta correcta.

It is **not** a realistic mission timeline: every measurement is daily on purpose, and radiation jumps in its last block. The realistic demo simulator is a separate task (thread A).
**No** es una línea de tiempo realista: todas las mediciones son diarias a propósito y la radiación salta en su último bloque. El simulador realista de la demo es otra tarea (hilo A).

**How to regenerate / Cómo regenerarlo** (from the repo root / desde la raíz del repo):

```bash
python -m backend.simulator.generate_clinical_test_data
python -m pytest backend/tests -q
```

The cases live in `backend/simulator/clinical_cases.py`; values and expected levels are written there by hand. If a threshold changes, update the cases there and regenerate. The fixed seed only shuffles the order of the baseline days, so every run gives the same file.
Los casos están en `backend/simulator/clinical_cases.py`, escritos a mano. Si cambia un umbral, se actualizan ahí y se regenera. La semilla fija solo mezcla el orden de los días de línea base: cada corrida da el mismo archivo.

### Layout / Orden

| Flight days | Block / Bloque |
| --- | --- |
| 1–3 | No baseline yet: only clinical thresholds apply / Sin línea base: solo umbrales clínicos |
| 4–10 | Baseline days / Días de línea base |
| 11–177 | Single-day cases (alternating measurements) and multi-day sequences, with separator days / Casos de un día y secuencias, con días separadores |
| 178–188 | Radiation (last, because the dose can only go up) / Radiación (al final: la dosis solo sube) |

Every column that a row does not test stays at its baseline mean (radiation rises 0.5 mSv per day, an arbitrary simulated rate).
Toda columna que una fila no prueba queda en su media de línea base (la radiación sube 0,5 mSv por día, un ritmo simulado arbitrario).

**Baseline formula / Fórmula de línea base:** mean and `statistics.pstdev` (population standard deviation) of flight days 4–10. Proposed by thread C on 14/11/2026, to confirm with thread A; it must match the core's `baseline.py`.
Media y `statistics.pstdev` (desvío poblacional) de los días 4–10. Propuesta del hilo C del 14/11/2026, a confirmar con el hilo A; tiene que coincidir con el `baseline.py` del núcleo.

### Columns (43) / Columnas (43)

| Columns | Meaning / Significado |
| --- | --- |
| `flight_day`, `timestamp`, `astronaut_id`, `simulated` | Day 1–188, fictional date, `SIM-01`, always 1 / Día, fecha ficticia, astronauta ficticio, siempre 1 |
| `blood_pressure_systolic_mmhg`, `blood_pressure_diastolic_mmhg`, `heart_rate_bpm`, `spo2_pct`, `glucose_mg_dl`, `sleep_hours`, `mood_vas_score`, `pvt_lapses` | Measurements with units. `mood_vas_score` is 0–100 with 100 = worst / Mediciones con unidad; en el ánimo, 100 = peor |
| `vision_amsler` | `no_change`, `change_not_repeated`, `change_awaiting_retest`, `change_confirmed`, `sudden_loss_or_distortion`, `area_growing` |
| `cabin_co2_7d_avg_mmhg`, `cabin_co2_1h_avg_max_mmhg` | CO₂ 7-day average and highest 1-hour average of the day, given row by row as the habitat would report them (the 7-day value jumps between rows on purpose; it is not recomputed from earlier rows) / Promedio de 7 días y mayor promedio de 1 hora del día, cargados fila por fila como los daría el hábitat (el de 7 días salta entre filas a propósito; no se recalcula con las filas anteriores) |
| `radiation_dose_cumulative_msv`, `solar_particle_event` | Cumulative dose (mSv) and solar storm in progress (0/1) / Dosis acumulada y tormenta solar en curso |
| `symptom_dizziness`, `symptom_lightheaded_or_faint`, `symptom_headache`, `symptom_cold_sore_or_rash` | Self-report checkboxes (0/1) / Casillas del autorreporte |
| `case_id` | Test case (`BP-01`, `HR-S4`, …); `BASE-` baseline days, `SEP-` separator days / Caso de prueba; `BASE-` línea base, `SEP-` separadores |
| `expected_level_<measurement>` | Final level the core should return / Nivel final que debería devolver el núcleo |
| `expected_clinical_level_<measurement>` | Level of the fixed clinical layer only; `n/a` for mood and PVT / Nivel de la capa clínica sola; `n/a` en ánimo y PVT |
| — | On days 1–10 the final level of mood and PVT is also `n/a`: no clinical layer and no baseline yet / En los días 1–10 el nivel final de ánimo y PVT también es `n/a`: sin capa clínica y todavía sin línea base |
| `note` | Source of the threshold, *Proposal* marks and, for `PENDING`, the open decision / Fuente, marcas *Proposal* y, si es `PENDING`, la decisión pendiente |

**Levels / Niveles:** `green`, `yellow`, `orange`, `red`, or `PENDING` when the level depends on an open team decision (named in `note`; the list is `DECISIONS` in `clinical_cases.py`). Tests of the core should skip `PENDING` cells.
`PENDING` = depende de una decisión pendiente del equipo (nombrada en `note`; la lista es `DECISIONS` en `clinical_cases.py`). Los tests del núcleo tienen que saltear esas celdas.
