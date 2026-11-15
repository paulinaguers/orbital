# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Clinical thresholds for the ORBITAL alert levels (values only, no logic).

Every value comes from the team's `fisiologia-espacial` skill
(references/umbrales.md, escalas-y-protocolos.md, linea-base-y-ml.md)
and carries its source. "Proposal" = a team design decision; no source
fixes that exact number.

How to read the names
- "_range" = (low, high) tuple that includes both ends, exactly as the skill
  writes it ("130–180" -> (130, 180)).
- "_below" = strictly less than
- "_above" = strictly greater than
- "_min" = greater than or equal
- "_max" = less than or equal

Where two levels share a boundary (sleep 7 h, radiation 65 %), both are kept
as written: the overlap is an open team decision, not solved here.

Not a medical device: thresholds for a hackathon prototype.
"""

THRESHOLDS = {
    # ------------------------------------------------------------------
    # Personal baseline
    # Source: linea-base-y-ml.md, team rule (Proposal).
    # ------------------------------------------------------------------
    "baseline": {
        # Without preflight data, the baseline uses flight days 4 to 10;
        # days 1-3 are left out as adaptation. Proposal.
        "first_flight_day": 4,
        "last_flight_day": 10,
        # PROPOSED FORMULA (thread C, 14/11/2026, to confirm with thread A):
        # the baseline standard deviation is statistics.pstdev (population
        # standard deviation). Thread A's baseline.py should use it once
        # confirmed, so it matches the clinical test cases in
        # data/clinical_test_cases.csv.
        # Minimum valid values before a baseline is used (thread A, 14/11,
        # Proposal): 5 of the 7 daily baseline days. Fewer values, or a
        # baseline with no spread, means "not evaluable", never green.
        "min_daily_observations": 5,
    },
    # ------------------------------------------------------------------
    # Deviation from the baseline (z-score)
    # Source: linea-base-y-ml.md, team rule (Proposal).
    # A deviation alone never reaches red (skill rule).
    # ------------------------------------------------------------------
    "deviation": {
        # Yellow: |z| >= 1.5 in 3 measurements in a row, with the value
        # still inside the clinical range. Proposal.
        "yellow_abs_z_min": 1.5,
        "yellow_consecutive_count": 3,
        # Orange: |z| >= 2 "sustained". Proposal. How many measurements
        # count as "sustained" is not defined yet: open team decision.
        "orange_abs_z_min": 2.0,
        # PROVISIONAL (thread A, 14/11/2026), pending team decision Q1:
        # "sustained" = the same 3 measurements in a row as yellow. With this,
        # a single extreme reading inside the clinical range sets no deviation
        # alert (open decision ⚠7).
        "orange_consecutive_count": 3,
    },
    # ------------------------------------------------------------------
    # 1. Blood pressure (mmHg)
    # Source: AHA, Understanding blood pressure readings (heart.org/bplevels);
    # hypotension: NHLBI, NHS inform.
    # ------------------------------------------------------------------
    "blood_pressure": {
        # Systolic and diastolic in different categories: the higher category
        # wins (ACC/AHA 2017 guideline, AFP summary
        # https://www.aafp.org/afp/2018/0315/p413; 2025 AHA/ACC update, Hypertension
        # 2025;82(10):e212-e316, https://doi.org/10.1161/HYP.0000000000000249).
        # So green = systolic < 130 AND diastolic < 80;
        # orange = systolic 130-180 OR diastolic 80-120.
        "green_systolic_below": 130,  # AHA
        "green_diastolic_below": 80,  # AHA
        "orange_systolic_range": (130, 180),  # AHA
        "orange_diastolic_range": (80, 120),  # AHA
        "red_systolic_above": 180,  # AHA ("and/or" with diastolic)
        "red_diastolic_above": 120,  # AHA ("and/or" with systolic)
        # A red reading is repeated after 5 minutes (AHA). It is the action,
        # not the trigger.
        "red_repeat_after_minutes": 5,
        # Hypotension below 90/60 WITH symptoms -> orange. NHLBI; NHS inform.
        # Open decisions: the level WITHOUT symptoms is not defined, and
        # "< 90/60" may mean systolic OR diastolic, or both.
        "hypotension_systolic_below": 90,
        "hypotension_diastolic_below": 60,
    },
    # ------------------------------------------------------------------
    # 2a. Resting heart rate (bpm)
    # Source: AHA (normal 60-100; well-trained ~40). Green starts at 50
    # for an athletic profile (skill).
    # ------------------------------------------------------------------
    "heart_rate": {
        "green_range": (50, 100),  # AHA + athletic profile (skill)
        "orange_low_range": (40, 49),  # AHA
        "orange_high_range": (101, 120),  # AHA
        "red_below": 40,  # AHA
        "red_above": 120,  # AHA
    },
    # ------------------------------------------------------------------
    # 2b. SpO2 (%)
    # Source: WHO (normal 97-99 %, lower limit 94 %); Myatt 2017,
    # Nursing Standard (< 90 % is an emergency).
    # ------------------------------------------------------------------
    "spo2": {
        "green_min": 95,  # WHO
        # A one-value range, so every level uses the same "_range" name.
        "yellow_range": (94, 94),  # WHO lower limit
        "orange_range": (91, 93),  # WHO / Myatt 2017
        # Red includes exactly 90 %: Proposal, more conservative than the
        # source (< 90 %).
        "red_max": 90,  # Myatt 2017 + Proposal
    },
    # ------------------------------------------------------------------
    # 3. Glucose (mg/dL)
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
    # 4. Sleep
    # Source: Sleep 2022 (ISS, Reaction SelfTest). Yellow/orange cut: Proposal.
    # ------------------------------------------------------------------
    "sleep_hours": {
        "green_min": 7,  # Sleep 2022
        # Overlaps green at exactly 7 h: open team decision.
        "yellow_range": (6, 7),  # Sleep 2022; cut: Proposal
        # One night; Sleep 2022; cut: Proposal.
        "orange_below": 6,
        "red_below": 6,  # Sleep 2022
        # 2 or more nights in a row; Sleep 2022
        "red_consecutive_nights": 2,
    },
    # ------------------------------------------------------------------
    # 5a. Mood VAS (score 0-100, inverted so 100 = worst)
    # Source: escalas-y-protocolos.md §2.1. All cuts: Proposal.
    # Yellow and orange use the "deviation" values above (same numbers).
    # ------------------------------------------------------------------
    "mood_vas": {
        # Red: mood in the worst 10 % on several days. Proposal.
        # Open decisions: this red is measured against the person's own
        # history, not a clinical threshold; "several days" is not defined.
        "red_worst_fraction": 0.10,
    },
    # ------------------------------------------------------------------
    # 5b. Reaction test (PVT)
    # Lapse cut-offs: Basner 2011 (3-min PVT-B); NASA (10-min PVT).
    # Levels against the personal baseline: escalas-y-protocolos.md §1.1,
    # all Proposal. umbrales.md describes the levels as "more lapses"
    # instead of z-scores: open team decision on which file rules.
    # ------------------------------------------------------------------
    "pvt_lapses": {
        # Whether a response of exactly 355 ms is a lapse is an open
        # decision: escalas-y-protocolos.md says ">= 355", umbrales.md "> 355".
        "lapse_ms_3min": 355,  # Basner 2011
        # Open decision: umbrales.md says "> 500 ms"; escalas-y-protocolos.md
        # only says the cut is 500 ms (">=" or ">").
        "lapse_ms_10min": 500,  # NASA
        "yellow_abs_z_min": 1.5,  # in one session; Proposal
        # in 3 sessions in a row; Proposal
        "orange_abs_z_min": 1.5,
        "orange_consecutive_sessions": 3,  # Proposal
        # The PVT is every few days: its baseline needs at least 3 sessions,
        # after the 2-3 practice sessions the protocol asks for (Proposal).
        "min_baseline_sessions": 3,
        # Omissions (review 14/11): a stimulus with no answer inside the
        # response window is an omission and counts as a lapse (any late
        # answer would be >= 355 ms anyway). Window length: Proposal.
        "response_window_ms": 3000,  # Proposal
        # Sessions are compared as a lapse RATE (lapses / stimuli), because
        # the random interval gives each session a different number of
        # stimuli. Data without a stimulus count (stored demo days, answer
        # key) assumes this reference count, so their z-scores do not change.
        # The app's 1-minute test shows about 15 stimuli (1-4 s wait + answer +
        # 1 s feedback).
        "reference_stimuli": 15,  # Proposal
        # Fewer stimuli than this = invalid session, not evaluable (Proposal).
        "min_valid_stimuli": 5,  # Proposal
        # Red: |z| >= 2 sustained, together with symptoms or sleep in red.
        # Proposal. Open decision ("sustained" and "symptoms").
        "red_abs_z_min": 2.0,  # Proposal
    },
    # ------------------------------------------------------------------
    # 6. Vision (Amsler grid)
    # No numeric thresholds: the levels are categories (no change, change
    # not repeated, change confirmed, sudden loss or distortion, area that
    # grows). All Proposal. See docs/content/alert_texts.md.
    # ------------------------------------------------------------------
    # ------------------------------------------------------------------
    # 7a. Cabin CO2 (mmHg)
    # Source: NASA-STD-3001 Vol. 1 Rev. C; OCHMO-TB-004.
    # Open decision: the skill does not say which average (7-day or
    # 1-hour) the yellow and orange levels use.
    # ------------------------------------------------------------------
    "cabin_co2": {
        # 7-day average; NASA-STD-3001 / OCHMO-TB-004
        "green_below": 2.5,
        # Without symptoms; cut by symptoms: Proposal.
        "yellow_range": (2.5, 3.0),
        # With headache; cut by symptoms: Proposal.
        "orange_range": (2.5, 3.0),
        # 1-hour average; NASA-STD-3001 / OCHMO-TB-004
        "red_above": 3.0,
    },
    # ------------------------------------------------------------------
    # 7b. Cumulative radiation
    # Limits: NASA-STD-3001 Vol. 1 Rev. C. Level percentages: Proposal.
    # Open decision: the skill bases the percentages on both limits (600 mSv
    # career and 250 mSv per solar event) but does not say how they combine.
    # ------------------------------------------------------------------
    "radiation_dose": {
        "career_limit_msv": 600,  # NASA-STD-3001 V1 4030
        "solar_event_limit_msv": 250,  # NASA-STD-3001 V1 4031
        "green_below_pct": 50,  # Proposal
        "yellow_range_pct": (50, 65),  # Proposal
        # Overlaps yellow at exactly 65 %: open team decision.
        # Team decision 14/11 (PROVISIONAL, to confirm with thread C): the
        # cumulative dose is long-term exposure tracking, not an operational
        # alarm, so it reaches orange at most (orange from 65 % of the career
        # limit). Red is reserved for an operational event: a solar particle
        # event in progress. Dose rate is future work.
        "orange_from_pct": 65,  # Proposal
        "red_only_for_solar_particle_event": True,
    },
    # Temperature is not in the MVP (open team decision). Its CDC values
    # (fever >= 38 °C, hypothermia < 35 °C) are in the skill.
}
