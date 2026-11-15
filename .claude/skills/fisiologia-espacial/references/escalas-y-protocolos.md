# Scales, tests and protocols

Source: the team's document "Scales, tests and protocols" (2/11/2026). Convention: *Proposal* = a design decision with no source that fixes the number. 4-level traffic light: green (routine), yellow (monitor, no consultation), orange (onboard doctor), red (flight surgeon). Deviation: z against the baseline; yellow |z| ≥ 1.5 in 3 measurements in a row with the value in the clinical range; orange |z| ≥ 2 sustained; a deviation alone never reaches red.

## 1. In-app tests

### 1.1 PVT-B (brief psychomotor vigilance)
- **Measures:** sustained attention and reaction speed (they worsen with lack of sleep). Behavioral/cognitive risk. On the ISS, every 4 days in the Reaction SelfTest.
- **How:** 3 min looking at a point; a counter appears and is tapped as fast as possible; random interval of 1 to 4 s; the reaction time is shown for a moment.
- **Score:** lapses = reaction time ≥ 355 ms (in the 10-min PVT the cut is 500 ms); false alarms = a tap with no stimulus or a reaction time < 130 ms; speed = mean of 1/reaction time (the metric most sensitive to lack of sleep).
- **Traffic light:** against the personal baseline; yellow |z| ≥ 1.5 in one session; orange |z| ≥ 1.5 in 3 sessions in a row; red |z| ≥ 2 sustained together with symptoms or sleep in red. *Proposal.*
- **App:** 2–3 practice sessions before setting the baseline; always the same device and response method; 1-minute version for the demo.

### 1.2 Amsler grid
- **Measures:** distortions or missing areas in central vision (SANS). One of the three vision tests on the ISS, together with acuity and a questionnaire; there it is done on a laptop.
- **How:** reading glasses if used; 30–38 cm; cover one eye; look at the central dot; check for wavy, blurry, dark or missing lines; repeat with the other eye.
- **Score:** per eye, yes/no and marked cells.
- **Traffic light:** green no change; yellow mild change that does not repeat when measured again; orange new change confirmed; red sudden loss or distortion, or an area that grows. *Proposal.* Eye-care organizations advise consulting for any change.
- **App:** 20 × 20 cells, black and white; instruction to cover one eye before each side; weekly.

### 1.3 Visual acuity (logMAR)
- **How:** rows of 5 letters that get smaller (ETDRS-like), one eye at a time, until at least 3 letters of a row are not recognized.
- **Score:** logMAR; 0 = normal; each row 0.1 and each letter 0.02. logMAR = best row read + 0.02 × letters missed.
- **Traffic light:** yellow worsens by 0.1 once; orange 0.1 or more confirmed on repeating; red ≥ 0.2 or a sudden drop. *Proposal.*
- **App:** without calibration the absolute value is not reliable; for the MVP the change against the baseline is enough. Extra.

## 2. Self-report

### 2.1 Visual analog scales (VAS)
- **Measures:** mood, fatigue, stress, workload.
- **How:** a slider per state between two ends; no visible numbers.
- **Score:** 0–100; mood is inverted so that 100 is always the worst state.
- **Traffic light:** against the baseline; yellow |z| ≥ 1.5 in 3 entries; orange |z| ≥ 2 sustained; red mood in the worst 10 % on several days. *Proposal.*
- **App:** < 30 s; daily, at the same time; free use. (The app uses a simplified 0–10 scale inspired by the VAS.)

### 2.2 Sleep diary (Consensus Sleep Diary)
- **How:** on waking: time to bed, time trying to sleep, latency, awakenings and time awake, wake-up and get-up time, perceived quality.
- **Score:** time in bed; total sleep time; efficiency = sleep / time in bed × 100.
- **Traffic light:** green ≥ 7 h; yellow 6–7 h; orange < 6 h one night; red < 6 h on 2 or more nights in a row.
- **App:** time pickers and simple validations; if there is a wearable, use its data and keep the diary for quality.

### 2.3 Symptom log
- **MVP (4 checkboxes, decided on 14/11):** dizziness or disorientation · lightheaded or feeling faint · headache · cold sore or rash. Sources: dizziness is linked to orthostatic intolerance on return to gravity: low blood pressure and fainting on landing (NASA HRP, cardiovascular risk), not to space motion sickness; the link between dizziness and low blood pressure is a *Proposal*, with no source that fixes it. Up to 80 % feel lightheaded after long missions (CSA, BP Reg). Headache with high CO₂ is hypercapnia, not hypoxia: symptoms from 2.3 mmHg (Law and Alexander, NASA) and CO₂ limits from OCHMO-TB-004. An altered immune system causes cold sores and rashes (NASA HRP, immune risk).
- **Name change (team decision, 14/11):** "lightheaded on standing" becomes "lightheaded or feeling faint" (in the code, `symptom_lightheaded_or_faint`). Orthostatic intolerance matters in gravity transitions (landing, Mars surface) and in LBNP (lower body negative pressure), which mimics the effect of standing. Mars surface and LBNP: no source, *Proposal*.
- **Use in the engine:** they complete rules that already exist (blood pressure < 90/60 with symptoms → orange; CO₂ with headache → orange; temperature 37.5–37.9 with symptoms → orange). No new rules.
- **Extended list (future):** blurred vision, nausea, congestion, fever; intensity mild/moderate/severe and since when.
- **Traffic light:** yellow mild symptom; orange moderate symptom, or mild for > 2 days; red severe symptom or one that coincides with an indicator in red (e.g. headache with high CO₂; blurred vision with an Amsler change). *Proposal.*

## 3. Device measurements

Adaptation to space: always measure in the same posture, restrained and at rest. *Proposal.*

| Measurement | Protocol | Traffic light |
| --- | --- | --- |
| Blood pressure | 30 min without exercise or caffeine; 5 min of quiet rest; arm at heart level, cuff on bare skin; no talking; 2 readings 1 min apart; the average is used | See `umbrales.md` (4 levels); if red, repeat after 5 min |
| Resting heart rate | Same time of day (on waking), from the same device as blood pressure or SpO₂ | Green 50–100 · yellow 50–100 with deviation · orange 40–49 or 101–120 · red < 40 or > 120 |
| SpO₂ | Warm, relaxed hand, below heart level; no nail polish; still until the value is stable | Green ≥ 95 · yellow 94 or deviation · orange 91–93 · red ≤ 90. FDA: look at the trend; a single low value needs a new reading before escalating |
| Temperature | Oral thermometer, always the same method | Green 36–37.4 · yellow 37.5–37.9 without symptoms · orange with symptoms · red ≥ 38 or < 35 |
| Glucose | Clean, dry hands; prick the side of the fingertip | Green 70–180 · yellow 70–180 with deviation · orange 54–69 or 181–250 · red < 54 or > 250; record fasting or after a meal |
| Body mass | On the ISS, SLAMMD (known force with springs, mass from acceleration) | Loss < 2 % · 2–3.5 % · 3.5–5 % · > 5 % (*Proposal*); it usually drops in the first 30 days and then stabilizes |

## 4. Reference scales (not implemented)

- **POMS (37 items):** six mood states, 0–4 per item, correlation > 0.95 with the 65-item version. NASA standard measures and analogs. Commercial and long.
- **BDI-II:** 21 items 0–3, total 0–63 (0–13 minimal, 14–19 mild, 20–28 moderate, 29–63 severe). Weekly in analogs. Clinical and commercial: interpreted by a professional.
- **Cognition (battery):** 10 tests, ~16 min on the ISS; includes a 3-min PVT; Spaceflight Standard Measures (pre-flight, ~flight day 30, 30 days before return). Too long for the MVP.

## 5. Summary

| Scale, test or protocol | Type | Frequency | Time | MVP |
| --- | --- | --- | --- | --- |
| PVT-B | In-app test | Every 3–4 days | 3 min | Yes |
| Amsler grid | In-app test | Weekly | 1 min | Yes |
| Visual acuity (logMAR) | In-app test | Weekly | 2 min | Extra |
| VAS | Self-report | Daily | < 30 s | Yes |
| Sleep diary | Self-report | Daily | 1 min | Yes |
| Symptom log | Self-report | When needed | < 30 s | Extra |
| Blood pressure | Device | Daily | 7 min with rest | Yes |
| Resting heart rate | Device | Daily | With another measurement | Yes |
| SpO₂ | Device | Daily | 1 min | Yes |
| Temperature | Device | Daily or with symptoms | 1 min | Extra |
| Glucose | Device | Per protocol | 2 min | Yes |
| Body mass | Device | Weekly | 2 min | Extra |
| POMS, BDI-II, Cognition | Reference | — | — | No |
