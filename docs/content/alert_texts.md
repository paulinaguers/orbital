# ORBITAL – Alert texts

> **AI use:** drafted with Claude Code (Opus 5.5) from the team's `fisiologia-espacial` skill; reviewed and approved by The Foxhole Court.

**Purpose.** What the astronaut sees on screen for each MVP measurement and each alert level, and the threshold that triggers it.

**Disclaimer.** ORBITAL guides; it does not diagnose. It is not a medical device. Clinical decisions belong to the crew medical officer and the flight surgeon. All data in the demo is simulated.

**Proposal** = a design decision by the team; no source fixes that exact number.

---

<a id="how-to-read"></a>

## How to read this file

### Fixed action per level

The action is the same for every measurement. The "Recommendation" column always contains it and only adds a short, measurement-specific detail. When the source requires a confirmation step first (blood pressure in red: AHA; low SpO₂: FDA), the cell starts with that step and then gives the fixed action.

| Level| Action |
| --- | --- |
| 🟢 green | Keep your routine. |
| 🟡 yellow | Soft warning: monitor. No consultation needed. |
| 🟠 orange | Contact the crew medical officer. |
| 🔴 red | Escalate to the flight surgeon. Your report is ready to send. |

### Two layers

Each value is checked against (1) a fixed clinical threshold and (2) the astronaut's personal baseline. The higher level wins.

- **Sustained deviation (yellow):** |z| ≥ 1.5 in 3 measurements in a row, with the value inside the clinical range. *Proposal.*
- **Marked sustained deviation (orange):** |z| ≥ 2 sustained. *Proposal.*
- **A baseline deviation alone never reaches red.** Red is only reached by crossing a clinical threshold.

Source: `fisiologia-espacial` → `linea-base-y-ml.md`, `escalas-y-protocolos.md`.

> ⚠ **Team decision needed:** the rules use \|z\|, so they count deviations in **both** directions. Some texts name only the worse side ("lower mood", "slower reaction", "lower SpO₂"). Options: (a) the core counts only the worse side (signed z), so the texts stay as they are; or (b) neutral texts ("different from your usual"). The core (thread A) must follow the same choice.

### Index

| MVP group | Measurement| Official NASA risk or hazard (HRP)|
| --- | --- | --- |
| 1 | [Blood pressure](#1-blood-pressure) | Cardiovascular Adaptations |
| 2 | [Resting heart rate](#2a-heart-rate) | Cardiovascular Adaptations |
| 2 | [SpO₂](#2b-spo2) | Hypoxia |
| 3 | [Glucose](#3-glucose) | Not an HRP risk on its own (see section) |
| 4 | [Sleep](#4-sleep) | Inadequate Sleep and Irregular Schedules |
| 5 | [Mood (VAS)](#5a-mood) | Behavioral Conditions and Psychiatric Disorders |
| 5 | [Fatigue](#5c-fatigue) · [Stress](#5d-stress) · [Workload](#5e-workload) | Behavioral Conditions and Psychiatric Disorders |
| 5 | [Brief reaction test (PVT-inspired)](#5b-pvt) | Inadequate Sleep · Behavioral Conditions |
| 6 | [Vision (Amsler grid)](#6-vision) | SANS |
| 7 | [Cabin CO₂](#7a-co2) | Hostile closed environments (NASA-STD-3001) |
| 7 | [Cumulative radiation](#7b-radiation) | Space Radiation |
| — | [Symptoms](#symptoms) | Cardiovascular · Hostile closed environments (CO₂) · Immune |

---

<a id="1-blood-pressure"></a>

## 1. Blood pressure

**NASA risk:** Risk of Cardiovascular Adaptations Contributing to Adverse Mission Performance and Health Outcomes. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
In long flights, 24 h blood pressure drops 8–10 mmHg (Norsk 2015), so the personal baseline matters.

**Threshold source:** AHA, Understanding blood pressure readings (https://heart.org/bplevels); hypotension < 90/60: NHLBI (https://www.nhlbi.nih.gov/health/low-blood-pressure), NHS inform. When systolic and diastolic fall in different categories, the higher one applies (ACC/AHA 2017 guideline; AHA/ACC 2025 update): green needs both values in range; one value in the orange range is enough for orange.

| Level | Trigger · Source| Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | < 130 / < 80 mmHg · AHA | Blood pressure within your expected range. | Keep your routine. |
| 🟡 | < 130 / < 80 with sustained deviation from baseline · AHA + baseline (*Proposal*) | Your blood pressure is in range but has been moving away from your usual values. | Soft warning: monitor. No consultation needed. Repeat tomorrow with the full protocol (5 min rest, arm at heart level). |
| 🟠 | 130–180 / 80–120, or < 90/60 with symptoms, or \|z\| ≥ 2 sustained · AHA; NHLBI; baseline (*Proposal*) | Your blood pressure is outside the expected range. | Contact the crew medical officer. |
| 🔴 | > 180 and/or > 120 mmHg (repeat after 5 min) · AHA | Critical blood pressure reading. | Repeat the reading in 5 minutes. If it is still above the limit, escalate to the flight surgeon. Your report is ready to send. |

> ⚠ **Gap:** the skill does not define a level for < 90/60 **without** symptoms. Not filled here.

---

<a id="2a-heart-rate"></a>

## 2a. Resting heart rate

**NASA risk:** Risk of Cardiovascular Adaptations (same as above). Heart rate and its variability drop in flight. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/

**Threshold source:** AHA (normal 60–100; well-trained ~40). Green starts at 50 for an athletic profile. https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | 50–100 bpm · AHA | Resting heart rate within your expected range. | Keep your routine. |
| 🟡 | 50–100 with sustained deviation · AHA + baseline (*Proposal*) | Your resting heart rate is in range but differs from your usual values. | Soft warning: monitor. No consultation needed. Measure again tomorrow on waking. |
| 🟠 | 40–49 or 101–120, or \|z\| ≥ 2 sustained · AHA; baseline (*Proposal*) | Your resting heart rate is outside the expected range. | Contact the crew medical officer. |
| 🔴 | < 40 or > 120 bpm · AHA | Critical resting heart rate. | Escalate to the flight surgeon. Your report is ready to send. |

---

<a id="2b-spo2"></a>

## 2b. SpO₂

**NASA risk:** Risk of Hypoxia. Partial cabin depressurization for spacewalks can cause mild hypoxia: confusion, headache, vision changes, sleep problems. NASA gives no SpO₂ values. https://www.nasa.gov/hrp/risks/

**Threshold source:** WHO (normal 97–99 %, lower limit 94 %); < 90 % is an emergency (Myatt 2017, *Nursing Standard*). Red includes exactly 90 %: *Proposal*, more conservative than the source. FDA: look at the trend; a single low value needs a new reading before escalating.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | ≥ 95 % · WHO | Oxygen saturation within your expected range. | Keep your routine. |
| 🟡 | 94 %, or ≥ 95 % with sustained deviation · WHO + baseline (*Proposal*) | Your oxygen saturation is slightly lower than usual. | Soft warning: monitor. No consultation needed. Repeat with a warm, relaxed hand, below heart level, until the value is stable. |
| 🟠 | 91–93 %, or \|z\| ≥ 2 sustained · WHO; baseline (*Proposal*) | Your oxygen saturation is below the expected range. | Repeat the reading first: a single low value needs confirmation (FDA). If it stays low, contact the crew medical officer. |
| 🔴 | ≤ 90 % · Myatt 2017 (90 % exact: *Proposal*) | Critical oxygen saturation. | Repeat the reading at once. If it is still ≤ 90 %, escalate to the flight surgeon. Your report is ready to send. |

---

<a id="3-glucose"></a>

## 3. Glucose

**NASA risk:** not an independent HRP risk. The CSA documents insulin resistance in space, with a risk of type 2 diabetes (CSA, Vascular study), and the challenge statement asks for it. https://www.asc-csa.gc.ca/eng/sciences/vascular.asp https://www.asc-csa.gc.ca/eng/multimedia/search/image/8056

**Threshold source:** ADA definitions of hypo- and hyperglycemia (*Diabetes Therapy* 2019). https://pmc.ncbi.nlm.nih.gov/articles/PMC6531520/table/Tab1

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | 70–180 mg/dL · ADA | Glucose within your expected range. | Keep your routine. |
| 🟡 | 70–180 with sustained deviation · ADA + baseline (*Proposal*) | Your glucose is in range but has been moving away from your usual values. | Soft warning: monitor. No consultation needed. Log whether you were fasting or had just eaten. |
| 🟠 | 54–69 or 181–250, or \|z\| ≥ 2 sustained · ADA; baseline (*Proposal*) | Your glucose is outside the expected range. | Contact the crew medical officer. |
| 🔴 | < 54 or > 250 mg/dL · ADA | Critical glucose reading. | Escalate to the flight surgeon. Your report is ready to send. |

---

<a id="4-sleep"></a>

## 4. Sleep

**NASA risk:** Risk of Inadequate Sleep and Irregular Schedules. About 16 sunrises per day in orbit disrupt the circadian rhythm; sessions of 6 h or less were linked to slower psychomotor speed, more stress and more tiredness. https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/

**Threshold source:** *Sleep* 2022 (ISS, Reaction SelfTest), https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197. Yellow/orange cut: *Proposal*.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | ≥ 7 h per night · *Sleep* 2022 | You slept enough. | Keep your routine. |
| 🟡 | 6–7 h · *Sleep* 2022 (cut: *Proposal*) | You slept a bit less than recommended. | Soft warning: monitor. No consultation needed. Protect your next sleep period. |
| 🟠 | < 6 h one night · *Sleep* 2022 (cut: *Proposal*) | You slept less than 6 hours. | Contact the crew medical officer. |
| 🔴 | < 6 h on 2 or more nights in a row · *Sleep* 2022 | You have slept less than 6 hours for several nights in a row. | Escalate to the flight surgeon. Your report is ready to send. |

---

<a id="5a-mood"></a>

## 5a. Mood (VAS)

**NASA risk:** Risk of Behavioral Conditions and Psychiatric Disorders. Isolation and confinement favor anxiety and depression. On the ISS, visual analog scales were taken every 4 days (*Sleep* 2022). https://www.nasa.gov/hrp/risks/

**Threshold source:** all cuts are *Proposal*, against the personal baseline (`escalas-y-protocolos.md` §2.1). Score 0–100, inverted so that 100 is always the worst state.

The astronaut never sees z-scores; the screen uses words.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | Close to baseline · *Proposal* | Your mood is similar to your usual. | Keep your routine. |
| 🟡 | \|z\| ≥ 1.5 in 3 entries · *Proposal* | Your mood has been lower than usual in your last entries. | Soft warning: monitor. No consultation needed. Self-care NASA suggests: keep a journal, tend plants, look out the window. |
| 🟠 | \|z\| ≥ 2 sustained · *Proposal* | Your mood has been clearly lower than usual for several days. | Contact the crew medical officer. |
| 🔴 | Mood in the worst 10 % on several days · *Proposal* | Your mood has been very low for several days. | Escalate to the flight surgeon. Your report is ready to send. |

> ⚠ **Team decision needed:** the skill's red trigger ("worst 10 % on several days") is measured against the person's own history, not against a clinical threshold. That conflicts with the rule "red only by crossing a clinical threshold". Options: (a) cap mood at orange, or (b) keep the skill's trigger and say so to the jury. Not changed here.

---

<a id="5b-pvt"></a>

## 5b. Brief reaction test (PVT-inspired)

**NASA risk:** Risk of Inadequate Sleep and Irregular Schedules; Risk of Behavioral Conditions and Psychiatric Disorders. NASA uses a 10-minute self-test of vigilance; on the ISS it ran every 4 days (Reaction SelfTest). https://www.nasa.gov/hrp/risks/

**Threshold source:** lapse = reaction time ≥ 355 ms in the 3-min PVT-B (Basner 2011, https://pmc.ncbi.nlm.nih.gov/articles/PMC3197786); > 500 ms in the 10-min PVT (NASA). Level cuts against the personal baseline: *Proposal* (`escalas-y-protocolos.md` §1.1).

**App test (14/11):** 1-minute PVT-inspired experimental test, not the validated 3-minute PVT-B. A stimulus with no answer within 3 s is an omission and counts as a lapse; sessions are compared as a lapse rate (lapses per 15 stimuli, about one 1-minute session); fewer than 5 stimuli = not evaluable. All *Proposal*.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | Same as baseline · *Proposal* | Your reaction time is like your usual. | Keep your routine. |
| 🟡 | \|z\| ≥ 1.5 in one session · *Proposal* | Your reaction was slower than usual in this test. | Soft warning: monitor. No consultation needed. Repeat the test in your next scheduled session. |
| 🟠 | \|z\| ≥ 1.5 in 3 sessions in a row · *Proposal* | Your reaction has been slower than usual in your last 3 tests. | Contact the crew medical officer. |
| 🔴 | \|z\| ≥ 2 sustained **plus** symptoms or sleep in red · *Proposal* | Your reaction has been clearly slower for several sessions, along with poor sleep or symptoms. | Escalate to the flight surgeon. Your report is ready to send. |

> ⚠ **Team decision needed:** the PVT red needs a baseline deviation **plus** another signal. With "sleep in red" it crosses a fixed threshold; with "symptoms" it does not (symptoms have no threshold in the MVP). Also, `umbrales.md` describes the PVT levels as "more lapses" while `escalas-y-protocolos.md` uses z-scores; this file follows the more detailed `escalas-y-protocolos.md`. Confirm.

---

<a id="5c-fatigue"></a>

## 5c. Fatigue

**NASA risk:** Risk of Behavioral Conditions and Psychiatric Disorders; Inadequate Sleep. Fatigue was one of the visual analog scales taken every 4 days on the ISS (*Sleep* 2022).

**Threshold source:** no clinical threshold; only the personal baseline (`escalas-y-protocolos.md` §2.1). Simplified 0–10 self-report scale inspired by the VAS (10 = worst). All cuts *Proposal*. Texts written by thread A on 14/11, **pending thread C review**.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | Close to baseline · *Proposal* | Your fatigue is similar to your usual. | Keep your routine. |
| 🟡 | \|z\| ≥ 1.5 in 3 entries · *Proposal* | Your fatigue is higher than your usual. | Soft warning: monitor. No consultation needed. |
| 🟠 | \|z\| ≥ 2 in 3 entries · *Proposal* | Your fatigue has been much higher than your usual for several days. | Contact the crew medical officer. |

---

<a id="5d-stress"></a>

## 5d. Stress

**NASA risk:** Risk of Behavioral Conditions and Psychiatric Disorders. Visual analog scale on the ISS every 4 days (*Sleep* 2022).

**Threshold source:** same rules as fatigue (§5c). All *Proposal*, **pending thread C review**.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | Close to baseline · *Proposal* | Your stress is similar to your usual. | Keep your routine. |
| 🟡 | \|z\| ≥ 1.5 in 3 entries · *Proposal* | Your stress is higher than your usual. | Soft warning: monitor. No consultation needed. |
| 🟠 | \|z\| ≥ 2 in 3 entries · *Proposal* | Your stress has been much higher than your usual for several days. | Contact the crew medical officer. |

---

<a id="5e-workload"></a>

## 5e. Workload

**NASA risk:** Risk of Behavioral Conditions; Inadequate Sleep and Irregular Schedules. Visual analog scale on the ISS every 4 days (*Sleep* 2022).

**Threshold source:** same rules as fatigue (§5c). All *Proposal*, **pending thread C review**.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | Close to baseline · *Proposal* | Your workload is similar to your usual. | Keep your routine. |
| 🟡 | \|z\| ≥ 1.5 in 3 entries · *Proposal* | Your workload is higher than your usual. | Soft warning: monitor. No consultation needed. |
| 🟠 | \|z\| ≥ 2 in 3 entries · *Proposal* | Your workload has been much higher than your usual for several days. | Contact the crew medical officer. |

---

<a id="6-vision"></a>

## 6. Vision (Amsler grid)

**NASA risk:** Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS). About 70 % of ISS astronauts show swelling at the back of the eye; risk is higher on long missions. The app does not replace the fundoscope: it detects changes between check-ups. https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105

**Threshold source:** all cuts *Proposal* (`umbrales.md`, `escalas-y-protocolos.md` §1.2). Eye-care organizations advise consulting for any change (Canadian Association of Optometrists, https://opto.ca/sites/default/files/2024-02/cao_amslergrid_EN.pdf).

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | No change · *Proposal* | No changes in your vision test. | Keep your routine. |
| 🟡 | Mild change that does not repeat on a new test · *Proposal* | You marked a small change that did not show up again. | Soft warning: monitor. No consultation needed. Do the test again next week, one eye at a time, at 30–38 cm. |
| 🟠 | New change confirmed against baseline · *Proposal* | A change in your vision test was confirmed. | Contact the crew medical officer. |
| 🔴 | Sudden loss or distortion, or an area that grows · *Proposal* | Sudden change in your vision. | Escalate to the flight surgeon. Your report is ready to send. |

> ⚠ **Team decision needed:** eye-care organizations advise consulting for **any** change. Our yellow applies only to a change that did **not** show up again when the test was repeated right away; a change that repeats is orange. When the astronaut marks a change, the app should ask to repeat the test at once ("Repeat the test now, one eye at a time"

---

<a id="7a-co2"></a>

## 7a. Cabin CO₂

**NASA risk:** Hostile and closed environments hazard. NASA's hazard page gives no CO₂ values; the limits come from NASA-STD-3001 and the CO₂ technical brief. Symptoms have been reported from 2.3 mmHg (Law and Alexander, NASA). https://www.nasa.gov/hrp/hazard-hostile-closed-environments/

**Threshold source:** NASA-STD-3001 Vol. 1 Rev. C (https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf); OCHMO-TB-004 (https://www.nasa.gov/?p=841628). Yellow/orange cut by symptoms: *Proposal*. Cabin data in the demo is simulated.

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | < 2.5 mmHg (7-day average) · NASA-STD-3001 / OCHMO-TB-004 | Cabin CO₂ within limits. | Keep your routine. |
| 🟡 | 2.5–3 mmHg without symptoms · NASA-STD-3001 (cut: *Proposal*) | Cabin CO₂ is above the usual level. | Soft warning: monitor. No consultation needed. Log a headache if you get one. |
| 🟠 | 2.5–3 mmHg with headache · NASA-STD-3001 (cut: *Proposal*) | Cabin CO₂ is high and you reported a headache. | Contact the crew medical officer. |
| 🔴 | > 3 mmHg (1-hour average) · NASA-STD-3001 / OCHMO-TB-004 | Cabin CO₂ above the safety limit. | Escalate to the flight surgeon. Your report is ready to send. |

> ⚠ **Team decision needed:** the skill does not say which average (7-day or 1-hour) the yellow and orange levels use.

---

<a id="7b-radiation"></a>

## 7b. Cumulative radiation

**NASA risk:** Space radiation (cancer and degenerative effects). On the ISS, personal dosimeters are analyzed on Earth; there is no real-time personal reading. ORBITAL's continuous reading is **simulated** and points to autonomous monitors like CSA's CANS.**simulada** y apunta a monitores autónomos como el CANS de la CSA. https://www.nasa.gov/missions/analog-field-testing/why-space-radiation-matters/

**Threshold source:** percentages are *Proposal*, on top of NASA-STD-3001 limits: 600 mSv career (V1 4030) and 250 mSv per solar event (V1 4031).

| Level | Trigger · Source | Astronaut sees| Recommendation|
| --- | --- | --- | --- |
| 🟢 | < 50 % of the career limit · *Proposal* on NASA-STD-3001 | Cumulative dose well below your career limit. | Keep your routine. |
| 🟡 | 50–65 % · *Proposal* on NASA-STD-3001 | Your cumulative dose has passed half of your career limit. | Soft warning: monitor. No consultation needed. |
| 🟠 | ≥ 65 % of the career limit (the cumulative dose reaches orange at most) · *Proposal* on NASA-STD-3001 | Your cumulative dose is getting close to your career limit. | Contact the crew medical officer. |
| 🔴 | Solar particle event (solar storm) in progress: operational alert · *Proposal* on NASA-STD-3001 (250 mSv per solar event) | Solar storm in progress. | Escalate to the flight surgeon. Your report is ready to send. |

> **Team decision 14/11 (provisional, to confirm by thread C):** the cumulative dose is long-term exposure tracking, not an operational alarm: it reaches orange at most (from 65 %, so exactly 65 % is orange). Red is reserved for a solar storm in progress. Dose rate is future work.

---

<a id="symptoms"></a>

## Symptoms

Four checkboxes in the self-report (decided on 14/11). **They do not create new rules and do not set a level on their own**: they complete rules that already exist. Ticking a box only logs it and shows a confirmation.

Source: `escalas-y-protocolos.md` §2.3, `umbrales.md` (MVP).

| Checkbox| Astronaut sees when ticked| Feeds this rule| Why (source)|
| --- | --- | --- | --- |
| Dizziness or disorientation | Logged: dizziness or disorientation. It will be checked together with your blood pressure. | Blood pressure < 90/60 **with symptoms** → 🟠 | Orthostatic intolerance on return to gravity: low blood pressure and fainting on landing (NASA HRP, cardiovascular risk). The link between dizziness and low blood pressure is a *Proposal* (see ⚠ 1). |
| Lightheaded or faint | Logged: lightheaded or faint. It will be checked together with your blood pressure. | Blood pressure < 90/60 **with symptoms** → 🟠 | Orthostatic intolerance on return to gravity: up to 80 % feel lightheaded after long missions (CSA, BP Reg); low blood pressure and fainting on landing (NASA HRP, cardiovascular risk). Mars surface and LBNP: team decision, no source. Renamed by team decision, 14/11 (see note below). |
| Headache | Logged: headache. It will be checked together with cabin CO₂. | Cabin CO₂ 2.5–3 mmHg **with headache** → 🟠 (cut: *Proposal*) | High cabin CO₂ (hypercapnia): symptoms reported from 2.3 mmHg (Law and Alexander, NASA); CO₂ limits: OCHMO-TB-004 |
| Cold sore or rash | Logged: cold sore or rash. It will be checked together with your temperature. | Temperature 37.5–37.9 °C **with symptoms** → 🟠 (cut: *Proposal*) | Altered immunity causes cold sores and rashes (NASA HRP, immune risk) |

> **Team decision (14/11/2026):** the checkbox "Lightheaded on standing" is renamed "Lightheaded or faint", because orthostatic intolerance matters in gravity transitions (landing, Mars surface) and in LBNP (lower body negative pressure), which mimics the effect of standing. Mars surface and LBNP: no source (team decision).

> ⚠ **Team decision needed:**
> 1. **Mapping.** The skill fixes headache → cabin CO₂, but it does not say which boxes count as "symptoms" for low blood pressure and for temperature. The table above is our reading. The link between **dizziness** and low blood pressure is a *Proposal*: the skill has no source that ties dizziness to low blood pressure (NASA's gravity hazard page lists dizziness and fainting on landing, with no blood pressure value, https://www.nasa.gov/hrp/hazard-gravity-fields/; CSA BP Reg covers lightheadedness, not dizziness). Confirm.
> 2. **Temperature is not in the MVP.** Without it, "cold sore or rash" feeds no active rule. Options: add temperature to the MVP (thresholds exist: CDC, fever ≥ 38 °C, hypothermia < 35 °C), or keep the box as a log only. The on-screen text for this box ("checked together with your temperature") depends on that choice.
> 3. The skill also has a severity-based symptom scale (mild/moderate/severe, *Proposal*) in which a mild symptom alone is yellow. That conflicts with "symptoms do not set a level on their own" (`umbrales.md`, MVP). Intensity is listed as future work, so this file follows `umbrales.md`. Confirm.

---

<a id="sources"></a>

## Sources

Primary sources used in this file.

| Source| Used for | URL |
| --- | --- | --- |
| AHA – Understanding blood pressure readings | Blood pressure thresholds | https://heart.org/bplevels |
| ACC/AHA 2017 guideline – AFP summary (2018) | Systolic and diastolic in different categories: the higher category applies | https://www.aafp.org/afp/2018/0315/p413 |
| 2025 AHA/ACC/… blood pressure guideline (*Hypertension* 2025;82(10):e212–e316) | Update of the 2017 guideline | https://doi.org/10.1161/HYP.0000000000000249 |
| AHA – All About Heart Rate | Resting heart rate thresholds | https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse |
| ADA – definitions of hypo- and hyperglycemia (*Diabetes Therapy* 2019) | Glucose thresholds | https://pmc.ncbi.nlm.nih.gov/articles/PMC6531520/table/Tab1 |
| WHO – Oxygen therapy for children (2016) | SpO₂ normal range and lower limit (94 %) | https://who.int/publications-detail-redirect/9789241549554 |
| NHLBI – Low Blood Pressure | Hypotension below 90/60 | https://www.nhlbi.nih.gov/health/low-blood-pressure |
| CDC – Definitions of signs, symptoms, and conditions of ill travelers | Fever ≥ 38 °C (temperature, not in the MVP) | https://www.cdc.gov/port-health/php/definitions-symptoms-reportable-illness |
| CDC – Hypothermia-related deaths (*MMWR* 2006) | Hypothermia < 35 °C (temperature, not in the MVP) | https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5510a5.htm |
| Myatt 2017 – Pulse oximetry (*Nursing Standard*) | SpO₂ < 90 % is an emergency | https://journals.rcni.com/nursing-standard/pulse-oximetry-what-the-nurse-needs-to-know-ns.2017.e9940 |
| Basner 2011 – PVT-B (*Acta Astronautica*) | PVT-B lapse cut (355 ms) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3197786 |
| *Sleep* 2022 – Sleep deficiency in spaceflight | Sleep thresholds; VAS and PVT every 4 days on the ISS | https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197 |
| NASA-STD-3001 Vol. 1 Rev. C | CO₂ limits; radiation limits (600 mSv career, 250 mSv per solar event) | https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf |
| NASA OCHMO-TB-004 – Carbon Dioxide technical brief | Cabin CO₂ limits | https://www.nasa.gov/?p=841628 |
| Law and Alexander – Lower CO₂ levels on ISS (NASA) | CO₂ symptoms from 2.3 mmHg | https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20150019624.pdf |
| CSA – Vascular | Insulin resistance in space (why glucose is monitored) | https://www.asc-csa.gc.ca/eng/sciences/vascular.asp |
| NASA HRP – Risks of Human Spaceflight | Official NASA risk for each measurement | https://www.nasa.gov/hrp/risks/ |
