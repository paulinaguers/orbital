# Personal baseline, escalation and ML layer

## What is documented

There is no published official formula for computing alerts from a baseline. What is documented is how NASA builds it in research:

- **It is measured before flight, over several sessions.** Spaceflight Standard Measures records actigraphy with a sleep diary in two 2-week windows (270 and 180 days before launch) and the cognitive test 90 days before (Zwart 2018).
- **In flight, results are compared with that earlier value.** A study of 25 astronauts expressed each result as a z-score against the pre-flight mean and marked ≤ −1.5 standard deviations as an important change (Frontiers in Physiology 2024).
- **NASA-STD-3001 expresses limits as a percentage of the earlier value** (for example, strength ≥ 80 %).

## Engine rule (team proposal)

1. **Baseline:** mean and standard deviation of the pre-flight measurements. If there are none, flight days 4 to 10, to leave out the initial adaptation (days 1–3).
2. **Deviation:** z = (today's value − mean) / standard deviation.
3. **Deviation alert:** yellow if |z| ≥ 1.5 in 3 measurements in a row with the value inside the clinical range; orange if |z| ≥ 2 sustained. A deviation alone never reaches red: it does not escalate to Earth.
4. **Clinical alert:** the fixed threshold in `umbrales.md` (4 levels).
5. **Final level:** the higher of the clinical alert and the deviation alert.

## ML layer (optional, behind two cuts)

Source: the team's document "Machine learning layer in ORBITAL".

- **What it is:** unsupervised multivariate anomaly detection, on top of the rules. It looks for unusual combinations of several variables that stay green on their own. It does not replace the rules.
- **Model depending on the data:**
  - Hundreds of measurements per person (wearable-like): Isolation Forest (scikit-learn) trained on that person's baseline.
  - Few measurements (one or two per day): multivariate Mahalanobis distance over the z-scores. This is the expected case: today astronauts are measured intermittently.
- **Do not use:** supervised risk or diagnosis models trained on data simulated by the team (circular result, weak on the validity criterion). Real labels, if they existed, are for evaluating, not for diagnosing.
- **Cold start (stages):**

| Stage | Person's data | What it detects |
| --- | --- | --- |
| 0 · No data | None | Clinical thresholds only. ML off |
| 1 · Little data | A few days | Provisional baseline that starts from population values and adjusts with each measurement; Mahalanobis with caution |
| 2 · Enough data | Weeks | Full personal baseline; Isolation Forest only with hundreds of measurements |

- **On screen:** before stage 2, the notice "ML calibrating · day X of N". The ML alert is called "unusual combined pattern", shows which variables weighed in (z per variable) and **never goes above yellow** (soft warning, no consultation). If the pattern persists and a value leaves the clinical range, the rules raise it to orange or red.
- **Evaluation:** against anomalies injected on known dates in the simulator. Metrics: episodes detected, false alarms per week, days to detection. Compare rules alone with rules + ML. The ML stays only if it detects more without multiplying false alarms.
- **NASA and CSA support:** NASA's medical data architecture (Medical Data Architecture, HRP Investigators' Workshop 2020) aims at more autonomous clinical decision support, with or without ground support, and includes predicting medical events with machine learning. The CSA (Space Health study) uses an AI platform that looks for patterns and risks in Bio-Monitor data, but the analysis is done on Earth. https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20200000567.pdf · https://www.asc-csa.gc.ca/eng/sciences/space-flight-improve-monitor-health-earth.asp
- **Cuts:** Sat 19:00 (core and API with tests) and Sun 11:30 (metrics). If it is cut, it goes to a separate branch and future work.

## How astronauts are measured today (realistic context)

There is no routine continuous monitoring: vital signs are recorded mostly during exercise and spacewalks. There is a weekly private medical conference with the flight surgeon and periodic exams (ECG, ultrasound, OCT, blood tests). The Canadian Space Agency's Bio-Monitor/Astroskin exists (ECG, blood pressure, SpO₂, breathing, skin temperature, activity) but is used mostly in research.
