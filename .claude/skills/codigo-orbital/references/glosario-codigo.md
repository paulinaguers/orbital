# Glosario del código (inglés → español)

Nombres que se usan en el código. Si hace falta uno nuevo, se agrega acá.

| En el código | Significa |
| --- | --- |
| `baseline` | línea base personal |
| `z_score` | puntaje z (cuánto se aleja de lo habitual) |
| `mean` / `std_dev` | media / desvío estándar |
| `threshold` | umbral |
| `clinical_range` | rango clínico |
| `escalation` | escalamiento |
| `level`: `green`, `yellow`, `orange`, `red` | nivel: verde, amarillo, naranja, rojo |
| `alert` | alerta |
| `reason` / `source` (`rule`, `ml`) | motivo / origen (regla o ML) |
| `measurement` | medición |
| `self_report` | autorreporte |
| `symptom` | síntoma (`dizziness`, `lightheaded_or_faint`, `headache`, `cold_sore_or_rash`); columna `symptom_<nombre>`, por ejemplo `symptom_lightheaded_or_faint` |
| `indicator` | indicador |
| `astronaut` | astronauta |
| `simulator` | simulador |
| `injected_anomaly` | anomalía inyectada |
| `flight_day` | día de vuelo |
| `preflight` | antes del vuelo |
| `calibrating` | calibrando (ML) |
| `blood_pressure` (`systolic`, `diastolic`) | presión arterial (sistólica, diastólica) |
| `heart_rate` | frecuencia cardíaca |
| `spo2` | saturación de oxígeno |
| `glucose` | glucosa |
| `sleep_hours` | horas de sueño |
| `mood_vas` | escala visual de ánimo |
| `pvt_lapses` | lapsos del test de reacción (PVT) |
| `vision_amsler` | rejilla de Amsler |
| `radiation_dose` | dosis de radiación |
| `cabin_co2` | CO₂ de cabina |
| `exercise_minutes` | minutos de ejercicio |
| `nasa_risk` | riesgo oficial de NASA que vigila el indicador |

## Tablas de la base (`data/orbital.db`)

| Tabla | Antes | Qué guarda |
| --- | --- | --- |
| `astronauts` | astronautas | astronautas ficticios |
| `measurements` | mediciones | cada medición con fecha y `simulated = 1` |
| `self_reports` | autorreportes | sueño, ánimo, síntomas |
| `baselines` | lineas_base | media y desvío por indicador y persona |
| `alerts` | alertas | nivel, motivo y origen |
| `injected_anomalies` | anomalias_inyectadas | anomalías del simulador con fecha, para evaluar |
