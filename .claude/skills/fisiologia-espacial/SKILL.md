---
name: fisiologia-espacial
description: Clinical criteria of the ORBITAL project (astronaut health monitoring). Use it whenever thresholds, ranges, alert or escalation rules, the personal baseline, scales and tests (PVT, Amsler, VAS, sleep diary), recommendation texts or the ML layer need to be defined or reviewed, for jury questions on scientific validity, or when a source or reference on space physiology or aerospace medicine is needed.
---

# Space physiology – ORBITAL's clinical criteria

This skill is the project's clinical source of truth. Every number that goes into the code or into an app text comes from here, with its source.

## Rules

1. **Do not invent values.** If a threshold, range or fact is not in the references, say so and propose to look it up. Never fill in from memory.
2. **Separate source and proposal.** Values marked *Proposal* are design decisions by the team, with no source that fixes that number. Say so in texts and to the jury.
3. **Cite the primary source** (NASA-STD-3001, NASA HRP, clinical guidelines from WHO, AHA, CDC, ADA, peer-reviewed articles). The URLs are in `references/bibliografia.md`.
4. **The app guides; it does not diagnose.** It is not a medical device. Clinical decisions belong to the onboard doctor and the flight surgeon.
5. **Simulated data is declared as simulated.**
6. Stage in focus: **long-duration flight** (stage 4 of the astronaut's life).

## Reference map (read only what is needed)

| File | When to read it |
| --- | --- |
| `references/umbrales.md` | 4-level thresholds (green, yellow, orange, red), indicator matrix, 7-indicator MVP, NASA-STD-3001 limits |
| `references/linea-base-y-ml.md` | Personal baseline, z-score, escalation rules, ML layer and cold start |
| `references/escalas-y-protocolos.md` | How each test, scale and device measurement is done and scored |
| `references/contexto-fisiologico.md` | Five hazards, effects on the body, how the ISS monitors today, medical autonomy (EIMO) |
| `references/bibliografia.md` | Every reference cited in the project documents, with URLs |
| `references/riesgos-nasa.md` | Which official NASA HRP risk each indicator covers, key facts, pitch lines and how NASA measures today (ARCHeR, Standard Measures) |
| `references/libros-de-referencia.md` | Core space medicine books and sources for further reading |

## Escalation

Four levels: Green = keep the routine · Yellow = soft warning (monitor, repeat the measurement, self-care; **no consultation**) · Orange = contact the onboard doctor · Red = escalate to the flight surgeon with a report ready to send. A deviation from the baseline alone never reaches red. Each value is checked with two layers: a **fixed clinical threshold** and the **deviation from the personal baseline**. The higher level wins.
