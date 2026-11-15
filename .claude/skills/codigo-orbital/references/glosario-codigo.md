# Code glossary

Names used in the code. If a new one is needed, it is added here.

| In the code | Meaning |
| --- | --- |
| `baseline` | personal baseline (the astronaut's usual values, flight days 4–10) |
| `z_score` | z-score (how far a value is from the usual) |
| `mean` / `std_dev` | mean / standard deviation |
| `threshold` | clinical threshold |
| `clinical_range` | clinical range |
| `escalation` | who is notified for a level |
| `level`: `green`, `yellow`, `orange`, `red`, `not_evaluable` | alert level; `not_evaluable` = no usable baseline, never shown as green |
| `alert` | alert |
| `reason` / `source` (`rule`, `ml`) | reason / origin (rule or ML) |
| `measurement` | measurement |
| `self_report` | self-report (check-in) |
| `symptom` | symptom (`dizziness`, `lightheaded_or_faint`, `headache`, `cold_sore_or_rash`); column `symptom_<name>`, e.g. `symptom_lightheaded_or_faint` |
| `indicator` | indicator shown on screen |
| `astronaut` | astronaut |
| `simulator` | simulator |
| `injected_anomaly` | injected anomaly |
| `flight_day` | flight day |
| `preflight` | before the flight |
| `calibrating` | calibrating (ML) |
| `blood_pressure` (`systolic`, `diastolic`) | blood pressure (systolic, diastolic) |
| `heart_rate` | resting heart rate |
| `spo2` | oxygen saturation |
| `glucose` | glucose |
| `sleep_hours` | hours of sleep |
| `mood_score`, `fatigue_score`, `stress_score`, `workload_score` | check-in scales, 0–10 (10 = worst) |
| `mood_vas` | visual analog mood scale, 0–100 (answer key only) |
| `pvt_lapses` | lapses in the brief reaction test (PVT-inspired) |
| `pvt_stimuli`, `pvt_omissions` | stimuli shown and stimuli without an answer in a PVT session |
| `vision_amsler` | Amsler grid result category |
| `radiation_dose` | radiation dose |
| `cabin_co2` | cabin CO₂ |
| `exercise_minutes` | minutes of exercise |
| `nasa_risk` | official NASA risk the indicator watches |
| `coverage` | how many indicators of a block were evaluated |

## Data tables (planned)

| Table | What it stores |
| --- | --- |
| `astronauts` | fictional astronauts |
| `measurements` | every measurement with its date and `simulated = 1` |
| `self_reports` | sleep, mood, symptoms |
| `baselines` | mean and standard deviation per indicator and person |
| `alerts` | level, reason and origin |
| `injected_anomalies` | simulator anomalies with their date, for evaluation |
