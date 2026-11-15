# Indicators and thresholds

Source: the team's document "Indicators and thresholds – Astronaut health monitoring" (rev. 1/11/2026). The thresholds are references for a hackathon prototype, not clinical criteria. They combine Earth clinical guidelines with published spaceflight data. All apply to the in-flight stage.

## Indicator selection criteria

An indicator is included if it meets at least 4 of 5:

1. Linked to a documented risk (radiation, isolation, distance, altered gravity, closed environment).
2. Measurable on board with existing equipment or with the app.
3. The astronaut can do it alone.
4. It has a clear threshold for the traffic light.
5. It leads to a concrete action.

## Indicator matrix (11 candidates)

| Risk (hazard) | Indicator | Data type | Frequency | Why it matters in space |
| --- | --- | --- | --- | --- |
| Cardiovascular (gravity) | Blood pressure | Device | Daily | On long flights, 24-hour ambulatory blood pressure drops 8–10 mmHg (Norsk 2015) |
| Cardiovascular (gravity) | Heart rate and SpO₂ | Device or wearable | Continuous or daily | Heart rate and its variability drop in flight (NASA); the Bio-Monitor (Astroskin) measures them on the ISS (CSA) |
| SANS: vision (gravity) | Visual acuity, Amsler grid, symptoms | In-app test + self-report | Weekly | They are the three vision tests scheduled on the ISS (Waisberg 2023) |
| Bone and muscle (gravity) | Minutes of loaded exercise | Self-report | Daily | Bone density falls 1–1.5 % per month (Stavnichuk 2020); the ISS crew trains ~1.5 h/day, 6–7 days a week (NASA HRP, physical fitness risk) |
| Nutrition (closed environment) | Body mass and intake | Device + self-report | Weekly | Mass loss is steady and often exceeds 5 % (Laurens 2019); the ISS uses a weekly food questionnaire (NASA) |
| Metabolism | Glucose | Device | Per protocol | On the ISS, astronauts developed insulin resistance and did not process glucose normally (CSA, Vascular study). The challenge also asks for it. Clinical thresholds (ADA) |
| Immune system (radiation, closed environment) | Temperature and symptoms | Device + self-report | Daily or when symptoms appear | Early detection of infections in a closed habitat |
| Sleep (isolation) | Sleep hours and quality | Self-report or wearable | Daily | They sleep ~6 h against 8.5 h scheduled (Barger 2014) |
| Behavioral and cognitive (isolation) | PVT and mood scale | In-app test + self-report | Every 3–4 days | On the ISS, the PVT and visual scales were taken every 4 days (Sleep 2022) |
| Closed environment | Cabin CO₂ and headache | Habitat sensor + self-report | Continuous | Symptoms reported from 2.3 mmHg (Law and Alexander, NASA) |
| Radiation | Cumulative dose | Dosimeter | Daily, cumulative | Career limit 600 mSv (NASA) |

## Alert thresholds (4 levels)

Green = keep the routine · Yellow = soft warning: monitor, repeat the measurement and self-care, **no consultation** · Orange = contact the onboard doctor · Red = escalate to the flight surgeon. Yellow mostly covers deviations from the personal baseline while the value is still inside the clinical range. *Proposal* = a design decision by the team, with no source that fixes that number.

| Indicator | Green | Yellow (monitor) | Orange (onboard doctor) | Red (flight surgeon) | Basis |
| --- | --- | --- | --- | --- | --- |
| Blood pressure (mmHg) | < 130 / < 80 | < 130 / < 80 with sustained deviation from the baseline | 130–180 / 80–120, or < 90/60 with symptoms | > 180 and/or > 120: repeat after 5 min | AHA; hypotension < 90/60 (NHLBI; NHS) |
| Glucose (mg/dL) | 70–180 | 70–180 with sustained deviation | 54–69 or 181–250 | < 54 or > 250 | ADA |
| SpO₂ (%) | ≥ 95 | 94, or ≥ 95 with sustained deviation | 91–93 | ≤ 90 | WHO: normal 97–99 %, lower limit 94 %; < 90 % is an emergency (Myatt 2017, Nursing Standard). *Proposal:* red includes exactly 90 %, more conservative than the source |
| Temperature (°C) | 36–37.4 | 37.5–37.9 without symptoms | 37.5–37.9 with symptoms | ≥ 38 or < 35 | CDC: fever ≥ 38 °C; hypothermia < 35 °C. *Proposal:* yellow/orange cut |
| Resting heart rate (bpm) | 50–100 | 50–100 with sustained deviation | 40–49 or 101–120 | < 40 or > 120 | AHA: normal 60–100; very well trained ~40; green from 50 for an athletic profile |
| Cabin CO₂ (mmHg) | < 2.5 (7-day average) | 2.5–3 without symptoms | 2.5–3 with headache | > 3 (1-hour average) | NASA-STD-3001 / OCHMO-TB-004. *Proposal:* yellow/orange cut by symptoms |
| Sleep (h per night) | ≥ 7 | 6–7 | < 6 one night | < 6 on 2 or more nights in a row | Sleep 2022. *Proposal:* yellow/orange cut |
| Reaction test (PVT) | Same as the baseline | More lapses in one session | More lapses in 3 sessions in a row | Marked and sustained increase | Lapse > 500 ms (10-min PVT, NASA); > 355 ms in the 3-min version (Basner 2011) |
| Cumulative radiation | < 50 % of the limit | 50–65 % | 65–80 % | > 80 %, or a solar storm | *Proposal*, on 600 mSv career and 250 mSv per solar event (NASA-STD-3001). **Team decision 14/11 (provisional, pending thread C):** the code caps cumulative dose at orange (from 65 %); red only for a solar storm in progress (see `docs/content/alert_texts.md` §7b) |
| Body mass (change) | Loss < 2 % | 2–3.5 % | 3.5–5 % | > 5 % | *Proposal*; the loss often exceeds 5 % (Laurens 2019) |
| Exercise (min/day) | ≥ 90 | 60–89 | 30–59 | < 30 on several days | *Proposal*, on ~1.5 h/day, 6–7 days a week (NASA HRP). Changed on 14/11 (before: ≥ 120 on ~2 h/day) |
| Vision (Amsler and acuity) | No change | Mild change that does not repeat when measured again | Change confirmed against the baseline | Sudden loss or distortion | *Proposal* |

Besides the fixed ranges, each value is compared with the astronaut's own baseline (see `linea-base-y-ml.md`). In flight, blood pressure drops and heart rate falls: a sustained deviation from their own average can be more informative than an Earth range.

## What NASA-STD-3001 says (Vol. 1, Rev. C)

It does not set numeric ranges for vital signs. It requires vital signs to be assessed, recorded, monitored and trended in flight (V1 3004) and points to the clinical standards in force in the US (V1 3000). That is why WHO, AHA, CDC and ADA are the right source for the values. It does set limits as a percentage of the pre-mission value:

| Parameter | In-flight limit | Requirement |
| --- | --- | --- |
| Aerobic capacity (VO₂max) | ≥ 80 % of the earlier value; ≥ 32.9 ml/min/kg for spacewalks | V1 4003 and V1 4001 |
| Muscle strength | ≥ 80 % of the baseline | V1 4024 |
| Bone density | ≥ 95 % of the earlier value at hip and spine; ≥ 90 % at the femoral neck | V1 4027 |
| Nutrition | 100 % of the calculated energy and nutrients | V1 4020 |
| Radiation | < 600 mSv over the career; < 250 mSv per solar event | V1 4030 and V1 4031 |
| Sleep and work shifts | Must have set limits, no fixed number | V1 4014 |

## MVP: 7 indicators

1. Blood pressure: manual entry.
2. Heart rate and SpO₂: simulated wearable.
3. Glucose: manual entry.
   - Symptoms (self-report, since 14/11): dizziness or disorientation, lightheaded or feeling faint, headache, cold sore or rash. They create no new rules: they feed "blood pressure < 90/60 with symptoms", "CO₂ with headache" and "temperature with symptoms".
4. Sleep: self-report.
5. Mood and reaction test: in-app test.
6. Vision with the Amsler grid: in-app test.
7. Radiation and CO₂: simulated habitat data.

## Mood scales used by NASA

| Scale | What it measures | Where and how often |
| --- | --- | --- |
| Visual analog scales (VAS) | Mood, fatigue, stress, workload | ISS, Reaction SelfTest, every 4 days (Sleep 2022) |
| POMS, 37 items | Six mood states and total disturbance | NASA standard measures (Williams and Cromwell 2017) |
| BDI-II | Depressive symptoms | Weekly in analogs (Bell 2026) |
| Sleep and team questionnaire | Sleep and team functioning | Monthly on the ISS (Zwart 2018) |

For the MVP: VAS (sliders 0–100, seconds, no license). POMS and BDI-II are commercial: they are only cited. (The app uses a simplified 0–10 self-report inspired by the VAS.)
