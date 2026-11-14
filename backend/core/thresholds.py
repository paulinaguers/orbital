# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Clinical thresholds for the ORBITAL alert levels (values only, no logic).
Umbrales clínicos de los niveles de alerta de ORBITAL (solo valores, sin lógica).

Every value comes from the team's `fisiologia-espacial` skill
(references/umbrales.md, escalas-y-protocolos.md, linea-base-y-ml.md)
and carries its source. "Proposal" = a team design decision; no source
fixes that exact number.
Cada valor sale de la skill `fisiologia-espacial` del equipo y lleva su
fuente. "Proposal" = decisión de diseño del equipo; ninguna fuente fija
ese número exacto.

How to read the names / Cómo leer los nombres:
- "_range" = (low, high) tuple that includes both ends, exactly as the skill
  writes it ("130–180" -> (130, 180)).
  "_range" = tupla (bajo, alto) que incluye los dos extremos, como la skill.
- "_below" = strictly less than / menor estricto.
- "_above" = strictly greater than / mayor estricto.
- "_min" = greater than or equal / mayor o igual.
- "_max" = less than or equal / menor o igual.

Where two levels share a boundary (sleep 7 h, radiation 65 %), both are kept
as written: the overlap is an open team decision, not solved here.
Donde dos niveles comparten un borde (sueño 7 h, radiación 65 %), se dejan
tal cual: el solapamiento es una decisión pendiente del equipo, no se
resuelve acá.

Not a medical device: thresholds for a hackathon prototype.
No es un dispositivo médico: umbrales para un prototipo de hackathon.
"""

THRESHOLDS = {
    # ------------------------------------------------------------------
    # Personal baseline / Línea base personal
    # Source: linea-base-y-ml.md, team rule (Proposal).
    # ------------------------------------------------------------------
    "baseline": {
        # Without preflight data, the baseline uses flight days 4 to 10;
        # days 1-3 are left out as adaptation. Proposal.
        # Sin datos prevuelo, la línea base usa los días de vuelo 4 a 10;
        # los días 1-3 quedan afuera por adaptación. Proposal.
        "first_flight_day": 4,
        "last_flight_day": 10,
        # PROPOSED FORMULA (thread C, 14/11/2026, to confirm with thread A):
        # the baseline standard deviation is statistics.pstdev (population
        # standard deviation). Thread A's baseline.py should use it once
        # confirmed, so it matches the clinical test cases in
        # data/clinical_test_cases.csv.
        # FÓRMULA PROPUESTA (hilo C, 14/11/2026, a confirmar con el hilo A):
        # el desvío estándar de la línea base es statistics.pstdev (desvío
        # poblacional). El baseline.py del hilo A debería usarla una vez
        # confirmada, para coincidir con los casos de prueba clínicos.
    },
    # ------------------------------------------------------------------
    # Deviation from the baseline (z-score) / Desvío de la línea base (z)
    # Source: linea-base-y-ml.md, team rule (Proposal).
    # A deviation alone never reaches red (skill rule).
    # Un desvío por sí solo nunca llega a rojo (regla de la skill).
    # ------------------------------------------------------------------
    "deviation": {
        # Yellow: |z| >= 1.5 in 3 measurements in a row, with the value
        # still inside the clinical range. Proposal.
        # Amarillo: |z| >= 1,5 en 3 mediciones seguidas, con el valor
        # dentro del rango clínico. Proposal.
        "yellow_abs_z_min": 1.5,
        "yellow_consecutive_count": 3,
        # Orange: |z| >= 2 "sustained". Proposal. How many measurements
        # count as "sustained" is not defined yet: open team decision.
        # Naranja: |z| >= 2 "sostenido". Proposal. Cuántas mediciones
        # son "sostenido" todavía no está definido: decisión pendiente.
        "orange_abs_z_min": 2.0,
    },
    # ------------------------------------------------------------------
    # 1. Blood pressure / Presión arterial (mmHg)
    # Source: AHA, Understanding blood pressure readings (heart.org/bplevels);
    # hypotension: NHLBI, NHS inform.
    # ------------------------------------------------------------------
    "blood_pressure": {
        # Systolic and diastolic in different categories: the higher category
        # wins (ACC/AHA 2017 guideline, AFP summary
        # https://www.aafp.org/afp/2018/0315/p413; 2025 update, Hypertension
        # 2025;82(10):e212-e316, https://doi.org/10.1161/HYP.0000000000000249).
        # So green = systolic < 130 AND diastolic < 80;
        # orange = systolic 130-180 OR diastolic 80-120.
        # Sistólica y diastólica en categorías distintas: gana la más alta
        # (guía ACC/AHA 2017, resumen de AFP; actualización 2025). Entonces
        # verde = sistólica < 130 Y diastólica < 80; naranja = sistólica
        # 130-180 O diastólica 80-120.
        "green_systolic_below": 130,  # AHA
        "green_diastolic_below": 80,  # AHA
        "orange_systolic_range": (130, 180),  # AHA
        "orange_diastolic_range": (80, 120),  # AHA
        "red_systolic_above": 180,  # AHA ("and/or" with diastolic)
        "red_diastolic_above": 120,  # AHA ("and/or" with systolic)
        # A red reading is repeated after 5 minutes (AHA). It is the action,
        # not the trigger. / Una lectura roja se repite a los 5 minutos
        # (AHA). Es la acción, no el disparador.
        "red_repeat_after_minutes": 5,
        # Hypotension below 90/60 WITH symptoms -> orange. NHLBI; NHS inform.
        # Open decisions: the level WITHOUT symptoms is not defined, and
        # "< 90/60" may mean systolic OR diastolic, or both.
        # Hipotensión por debajo de 90/60 CON síntomas -> naranja.
        # Decisiones pendientes: el nivel SIN síntomas no está definido, y
        # "< 90/60" puede ser sistólica O diastólica, o las dos.
        "hypotension_systolic_below": 90,
        "hypotension_diastolic_below": 60,
    },
    # ------------------------------------------------------------------
    # 2a. Resting heart rate / FC en reposo (bpm)
    # Source: AHA (normal 60-100; well-trained ~40). Green starts at 50
    # for an athletic profile (skill). / Verde desde 50 por perfil atlético.
    # ------------------------------------------------------------------
    "heart_rate": {
        "green_range": (50, 100),  # AHA + athletic profile (skill)
        "orange_low_range": (40, 49),  # AHA
        "orange_high_range": (101, 120),  # AHA
        "red_below": 40,  # AHA
        "red_above": 120,  # AHA
    },
    # ------------------------------------------------------------------
    # 2b. SpO2 / Saturación de oxígeno (%)
    # Source: WHO (normal 97-99 %, lower limit 94 %); Myatt 2017,
    # Nursing Standard (< 90 % is an emergency).
    # ------------------------------------------------------------------
    "spo2": {
        "green_min": 95,  # WHO
        # A one-value range, so every level uses the same "_range" name.
        # Un rango de un solo valor, para que todos los niveles usen "_range".
        "yellow_range": (94, 94),  # WHO lower limit
        "orange_range": (91, 93),  # WHO / Myatt 2017
        # Red includes exactly 90 %: Proposal, more conservative than the
        # source (< 90 %). / Rojo incluye el 90 % exacto: Proposal, más
        # conservador que la fuente.
        "red_max": 90,  # Myatt 2017 + Proposal
    },
    # ------------------------------------------------------------------
    # 3. Glucose / Glucosa (mg/dL)
    # Source: ADA definitions of hypo- and hyperglycemia (Diabetes Therapy 2019).
    # ------------------------------------------------------------------
    "glucose": {
        "green_range": (70, 180),  # ADA
        "orange_low_range": (54, 69),  # ADA
        "orange_high_range": (181, 250),  # ADA
        "red_below": 54,  # ADA
        "red_above": 250,  # ADA
    },
    # ------------------------------------------------------------------
    # 4. Sleep / Sueño (hours per night / horas por noche)
    # Source: Sleep 2022 (ISS, Reaction SelfTest). Yellow/orange cut: Proposal.
    # Fuente: Sleep 2022 (ISS, Reaction SelfTest). Corte amarillo/naranja: Proposal.
    # ------------------------------------------------------------------
    "sleep_hours": {
        "green_min": 7,  # Sleep 2022
        # Overlaps green at exactly 7 h: open team decision.
        # Se superpone con verde en 7 h exactas: decisión pendiente.
        "yellow_range": (6, 7),  # Sleep 2022; cut / corte: Proposal
        # One night; Sleep 2022; cut: Proposal.
        # Una noche; Sleep 2022; corte: Proposal.
        "orange_below": 6,
        "red_below": 6,  # Sleep 2022
        # 2 or more nights in a row / 2 o más noches seguidas; Sleep 2022
        "red_consecutive_nights": 2,
    },
    # ------------------------------------------------------------------
    # 5a. Mood VAS / Ánimo VAS (score 0-100, inverted so 100 = worst)
    # Source: escalas-y-protocolos.md §2.1. All cuts: Proposal.
    # Yellow and orange use the "deviation" values above (same numbers).
    # Amarillo y naranja usan los valores de "deviation" (mismos números).
    # ------------------------------------------------------------------
    "mood_vas": {
        # Red: mood in the worst 10 % on several days. Proposal.
        # Open decisions: this red is measured against the person's own
        # history, not a clinical threshold; "several days" is not defined.
        # Rojo: ánimo en el peor 10 % varios días. Proposal. Decisiones
        # pendientes: se mide contra la propia historia, no contra un
        # umbral clínico; "varios días" no está definido.
        "red_worst_fraction": 0.10,
    },
    # ------------------------------------------------------------------
    # 5b. Reaction test (PVT) / Test de reacción (PVT)
    # Lapse cut-offs: Basner 2011 (3-min PVT-B); NASA (10-min PVT).
    # Levels against the personal baseline: escalas-y-protocolos.md §1.1,
    # all Proposal. umbrales.md describes the levels as "more lapses"
    # instead of z-scores: open team decision on which file rules.
    # Niveles contra la línea base: escalas-y-protocolos.md §1.1, todos
    # Proposal. umbrales.md los describe como "más lapsos": decisión
    # pendiente sobre qué archivo manda.
    # ------------------------------------------------------------------
    "pvt_lapses": {
        # Whether a response of exactly 355 ms is a lapse is an open
        # decision: escalas-y-protocolos.md says ">= 355", umbrales.md "> 355".
        # Si una respuesta de 355 ms exactos es lapso es una decisión
        # pendiente: escalas dice ">= 355", umbrales dice "> 355".
        "lapse_ms_3min": 355,  # Basner 2011
        # Open decision: umbrales.md says "> 500 ms"; escalas-y-protocolos.md
        # only says the cut is 500 ms (">=" or ">").
        # Decisión pendiente: umbrales.md dice "> 500 ms"; escalas-y-protocolos.md
        # solo dice que el corte es 500 ms (">=" o ">").
        "lapse_ms_10min": 500,  # NASA
        "yellow_abs_z_min": 1.5,  # in one session / en una sesión; Proposal
        # in 3 sessions in a row / en 3 sesiones seguidas; Proposal
        "orange_abs_z_min": 1.5,
        "orange_consecutive_sessions": 3,  # Proposal
        # Red: |z| >= 2 sustained, together with symptoms or sleep in red.
        # Proposal. Open decision ("sustained" and "symptoms").
        # Rojo: |z| >= 2 sostenido, junto con síntomas o sueño en rojo.
        # Proposal. Decisión pendiente ("sostenido" y "síntomas").
        "red_abs_z_min": 2.0,  # Proposal
    },
    # ------------------------------------------------------------------
    # 6. Vision (Amsler grid) / Visión (rejilla de Amsler)
    # No numeric thresholds: the levels are categories (no change, change
    # not repeated, change confirmed, sudden loss or distortion, area that
    # grows). All Proposal. See docs/content/alert_texts.md.
    # Sin umbrales numéricos: los niveles son categorías. Todos Proposal.
    # ------------------------------------------------------------------
    # ------------------------------------------------------------------
    # 7a. Cabin CO2 / CO2 de cabina (mmHg)
    # Source: NASA-STD-3001 Vol. 1 Rev. C; OCHMO-TB-004.
    # Open decision: the skill does not say which average (7-day or
    # 1-hour) the yellow and orange levels use.
    # Decisión pendiente: la skill no dice qué promedio (7 días o 1 hora)
    # usan amarillo y naranja.
    # ------------------------------------------------------------------
    "cabin_co2": {
        # 7-day average / promedio de 7 días; NASA-STD-3001 / OCHMO-TB-004
        "green_below": 2.5,
        # Without symptoms; cut by symptoms: Proposal.
        # Sin síntomas; corte por síntomas: Proposal.
        "yellow_range": (2.5, 3.0),
        # With headache; cut by symptoms: Proposal.
        # Con dolor de cabeza; corte por síntomas: Proposal.
        "orange_range": (2.5, 3.0),
        # 1-hour average / promedio de 1 hora; NASA-STD-3001 / OCHMO-TB-004
        "red_above": 3.0,
    },
    # ------------------------------------------------------------------
    # 7b. Cumulative radiation / Radiación acumulada
    # Limits: NASA-STD-3001 Vol. 1 Rev. C. Level percentages: Proposal.
    # Límites: NASA-STD-3001 Vol. 1 Rev. C. Porcentajes de nivel: Proposal.
    # Open decision: the skill bases the percentages on both limits (600 mSv
    # career and 250 mSv per solar event) but does not say how they combine.
    # Decisión pendiente: la skill basa los porcentajes en los dos límites
    # (600 mSv de carrera y 250 mSv por evento solar), pero no dice cómo se
    # combinan.
    # ------------------------------------------------------------------
    "radiation_dose": {
        "career_limit_msv": 600,  # NASA-STD-3001 V1 4030
        "solar_event_limit_msv": 250,  # NASA-STD-3001 V1 4031
        "green_below_pct": 50,  # Proposal
        "yellow_range_pct": (50, 65),  # Proposal
        # Overlaps yellow at exactly 65 %: open team decision.
        # Se superpone con amarillo en 65 % exacto: decisión pendiente.
        "orange_range_pct": (65, 80),  # Proposal
        # Or any solar storm; Proposal. / O cualquier tormenta solar; Proposal.
        "red_above_pct": 80,
    },
    # Temperature is not in the MVP (open team decision). Its CDC values
    # (fever >= 38 °C, hypothermia < 35 °C) are in the skill.
    # La temperatura no está en el MVP (decisión pendiente). Sus valores
    # del CDC están en la skill.
}
