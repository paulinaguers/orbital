# Work logbook – ORBITAL

Chronological record of everything the team does during the hackathon: decisions, tasks, use of AI tools (SI) and plugins, and what a person reviewed. It is the raw material for the final documentation (skill `documentacion-bilingue`).

**Rules**

- One entry per finished task or decision. Entries are added at the end and never deleted.
- Log with `/bitacora` or by hand with the format below.
- "Human review" is mandatory: what was read, tested or corrected, and by whom.
- If an AI tool produced something that was discarded, log that too.

**Entry format**

```text
### [YYYY-MM-DD HH:MM] Short title
- Thread: A | B | C | General
- Type: task | decision | suggestion | problem | cut
- What was done:
- AI tools: (Claude chat / Claude Code / reviewer subagent / coordinator subagent / Google AI Studio / none) and what for
- Human review: what was read, tested or corrected, and by whom
- Why: reason for the decision (if any)
- Sources: documents or references used (if any)
- Commit: hash or "no commit"
```

Threads: **A** data and core (Python) · **B** screens and connection · **C** clinical content and documentation.

---

## Preparation (before the event)

### [2026-11-01 → 2026-11-13] Research and preparation
- Thread: General
- Type: decision
- What was done: research on indicators, thresholds, scales and rationale; definition of the working method with Claude (project, skills, agents, schedule). No solution code, as the event rules require.
- AI tools: Claude (chat) for literature search, document drafting and method design.
- Human review: the team reviewed and validated the documents: Indicators and thresholds, Project rationale, Scales tests and protocols, ML layer.
- Sources: see `.claude/skills/fisiologia-espacial/references/bibliografia.md`.
- Commit: no commit

---

## Saturday 14/11

<!-- Event entries go below, in chronological order -->

### [2026-11-14 12:41] 12:41 check: cuts proposed because Block 1 was late
- Thread: General
- Type: suggestion
- What was done: progress check. The repo had only the configuration (commits 2dc2d64 at 11:31 and 29730a9 at 12:25), with no `backend/` and no deliverables from B or C. Proposed: (1) simulator with CSV only, no SQLite and no `self_reports`; (2) A publishes the data format first (columns and a sample JSON) so B does not wait for it; (3) if the core tests are not green at 17:00, the ML layer is dropped right away. Pending team decision.
- AI tools: coordinator subagent (Claude Code) to measure progress against the schedule.
- Human review: pending; the team decides whether to apply the cuts.
- Why: about 130 min of delay in thread A put CUT 1 at risk (core and API with tests at 19:00).
- Commit: no commit

### [2026-11-14 12:56] MVP alert texts (EN/ES)
- Thread: C
- Type: task
- What was done: docs/content/alert_texts.md with, for the 10 measurements of the 7 MVP groups and the 4 levels, the text the astronaut sees and the recommendation (EN first, ES below), the threshold that triggers it with its source (marked "Proposal" where the skill says Propuesta) and the official NASA risk. Fixed action per level for every measurement; red only from a clinical threshold. Symptoms section with the 4 checkboxes and the rule each one feeds. 6 team decisions remain marked ⚠: mood red, PVT red, symptom mapping and temperature, pressure < 90/60 without symptoms, direction of the |z| deviation, and Amsler.
- AI tools: Claude Code (Opus 5.5) planned and drafted the file from the fisiologia-espacial skill; the reviewer subagent compared it with the skill (approved with changes); Claude Code applied the reviewer's 4 corrections and removed 3 tips that were not in the skill. Process note: one command ran in auto mode; it was set back to Manual.
- Human review: PENDING. Miguel (thread C) approved the plan, asked for the 3 additions (symptoms, fixed action per level, threshold with source) and checked there were no duplicates in 66f14f2. The full clinical reading of the file is still missing. The 6 ⚠ decisions remain open.
- Why: thread C deliverable, block 1. Screens (B) and core (A) use these texts and thresholds.
- Sources: fisiologia-espacial skill (umbrales.md, escalas-y-protocolos.md, linea-base-y-ml.md, riesgos-nasa.md, bibliografia.md).
- Commit: 66f14f2
- Correction: the committed file was truncated after section 6; restored in commit 5ab5c33.

### [2026-11-14 13:10] Thread B working method: screens with Google AI Studio
- Thread: B
- Type: decision
- What was done: the screens are generated with Google AI Studio (Build mode, Gemini 4 Hydrogen, free tier) from prompts written with Claude, one screen per prompt. Each working version is exported as a ZIP into `frontend/` and committed. AI Studio was not connected to GitHub, so it cannot overwrite the repo structure. The data shape was agreed with the code glossary (`flight_day`, `nasa_risk`, `threshold_source`, indicator ids).
- AI tools: Claude (project chat) to write the prompts and check them against the project skills; Google AI Studio to generate the React code.
- Human review: Paulina reviewed every preview with screenshots before exporting.
- Why: Stack A, decided on 13/11. A shared data shape lets A and B work in parallel.
- Commit: no commit

### [2026-11-14 13:29] Home screen with Orbi and app structure
- Thread: B
- Type: task
- What was done: React + TypeScript app with 5 routes, top bar (name, role, flight day, "SIMULATED DATA") and bottom navigation. Home with Orbi, an original SVG mascot whose color follows `overall_level`, and a speech bubble with the affected blocks, the recommendation and who was notified. Data read only through `source.ts` with `DEMO_MODE`.
- AI tools: Google AI Studio (Gemini 4 Hydrogen) with prompts written by Claude.
- Human review: key test done (setting `overall_level` to red turns Orbi red: the screen does not compute levels). A build error caused by a comment inside a JSON file was fixed, and a duplicated copy of the data was removed.
- Commit: c9b7bc7

### [2026-11-14 13:37] Clinical thresholds file (values only)
- Thread: C
- Type: task
- What was done: `backend/core/thresholds.py` with every threshold value and its source, plus the backend package files.
- AI tools: Claude Code (logged by thread A from the commit history).
- Human review: to be completed by thread C (Miguel).
- Commit: c73e3a3

### [2026-11-14 13:41] Body map with the five blocks
- Thread: B
- Type: task
- What was done: SVG silhouette with 5 cards (Cardiorespiratory & Oxygenation, Sleep & Cognition, Metabolic & Internal Balance, Environment Radiation & Vision, Mental Health), each linked by a line to its own point on the body and clickable to its detail page. Each card shows the official risk it watches; glucose shows "CSA: Insulin resistance in spaceflight" because it is not an HRP risk.
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: Paulina asked for one line per block from distinct points and for every card to be a button.
- Why: mood (VAS) moved from the sleep block to Mental Health to avoid showing it twice.
- Commit: a76336f

### [2026-11-14 13:47] Block detail template
- Thread: B
- Type: task
- What was done: one template for the 5 blocks with current value, level, threshold source, baseline range and a 14-day chart in plain SVG (baseline band, points colored by level). The baseline comes in the data; the screen does not compute it.
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: checked that each block shows its own indicators.
- Why: charts without a new library, so no unapproved dependency was added.
- Commit: c4da9cd

### [2026-11-14 13:56] Mental health: check-in, private journal and breathing
- Thread: B
- Type: task
- What was done: daily check-in (mood, fatigue, stress, workload); private journal stored only on the device and never sent; guided breathing exercise (4-4-6 rhythm) with a note that it does not replace professional support.
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: the 4-4-6 rhythm is a team Proposal, with no source in the project documents.
- Commit: b3d8fe2

### [2026-11-14 14:09] Alert texts restored and clinical review applied
- Thread: C
- Type: task
- What was done: the truncated sections of `alert_texts.md` were restored and the clinical review was applied.
- AI tools: Claude Code (logged by thread A from the commit history).
- Human review: to be completed by thread C (Miguel).
- Commit: 5ab5c33

### [2026-11-14 15:05] In-app tests: PVT and Amsler grid
- Thread: B
- Type: task
- What was done: 1-minute demo PVT (stimulus every 1–4 s, times measured with `performance.now()`) and 20 × 20 Amsler grid, one eye at a time, following the scales and protocols document. The screen stores only raw data; lapses and levels are computed by the core.
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: checked that no screen shows a score or a level for the tests.
- Commit: f0f2a94

### [2026-11-14 15:08] My Circle
- Thread: B
- Type: task
- What was done: messenger with 4 fictional contacts, link status with a countdown to the next communication window, and queued messages while offline. Simulated signal delay of 12 min each way (NASA: up to 20 min each way to Mars).
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: contacts and messages are marked as simulated.
- Commit: 5713edf

### [2026-11-14 15:14] Daily check-in on a 0–10 numeric scale
- Thread: B
- Type: decision
- What was done: the check-in changed from a visual analog scale to a 0–10 numeric scale with faces (10 = worst). New fields: `mood_score`, `fatigue_score`, `stress_score`, `workload_score`; indicator `mood_vas` became `mood_score`.
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: team decision.
- Why: the judges asked for a numeric scale. Pending: thread C to migrate the answer key and the scales document; the mood red "worst 10 %" becomes 9–10 (to confirm).
- Commit: 0fa5bc3

### [2026-11-14 15:22 → 15:55] Clinical answer key for the core
- Thread: C
- Type: task
- What was done: symptom sources fixed in the skill and the "lightheaded" checkbox renamed; bilingual comments and open decisions added to the thresholds; blood pressure rule resolved with the ACC/AHA source (the higher category wins); simulated clinical test dataset with hand-written cases and its tests (`data/clinical_test_cases.csv`, 188 rows).
- AI tools: Claude Code (logged by thread A from the commit history).
- Human review: to be completed by thread C (Miguel).
- Commits: d85a522, 44612bb, 64b9f20, f223c75

### [2026-11-14 15:45] How alerts work and data sources
- Thread: B
- Type: decision
- What was done: "How alerts work" screen with the 4 levels and who each one notifies; a "Measured with" line on every indicator (sensors, in-app tests, self-report); the manual sleep log was removed (sleep comes from the wearable).
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: alert scheme decided by the team: yellow = self-care, no one notified; orange = onboard doctor and flight surgeon on Earth; red = both, marked URGENT, plus a crewmate on board.
- Why: this changes the scheme in the documents (orange adds the flight surgeon; red adds the onboard doctor and a crewmate). Pending: thread C to update the rationale, thresholds and `alert_texts.md`.
- Commit: 812999a

### [2026-11-14 16:02] Test reminders
- Thread: B
- Type: task
- What was done: "Today's tasks" on Home, bell with a counter and a toast for overdue tests. Frequencies from the scales document: daily check-in, PVT every 4 days, Amsler weekly. Whether a test is due comes in the data; the screen does not compute it.
- AI tools: Google AI Studio with prompts written by Claude.
- Commit: 789752e

### [2026-11-14 16:17] Self-care tips and privacy notes
- Thread: B
- Type: task
- What was done: tips panel with concrete steps per indicator (`tips.ts`); steps backed by NASA practice carry the label "Based on NASA practice", the rest are team Proposals. End-to-end encryption note in My Circle, stated as part of the design and not implemented in the prototype.
- AI tools: Google AI Studio with prompts written by Claude; Claude checked each tip against the fisiologia-espacial skill.
- Human review: Paulina asked for concrete steps. Pending: thread C to validate the steps marked "team".
- Commit: e3af498

### [2026-11-14 16:34] Space passenger profile
- Thread: B
- Type: decision
- What was done: "Crew member | Space passenger" switch. The passenger version is simplified: friendly texts, no NASA risk tags or sources, no PVT, Amsler or journal; resting heart rate green 60–100 (AHA) instead of 50–100 (athletic profile); baseline from preflight days only.
- AI tools: Google AI Studio with prompts written by Claude.
- Human review: team decision after the mentoring session.
- Why: the mentors suggested scaling ORBITAL to commercial spaceflight. Age and pre-existing conditions are future work. Passenger data stays fixed in the screen (not computed by the core).
- Correction: the first passenger mock had 5.8 h of sleep marked yellow; under the thresholds less than 6 h is orange. Changed to 6.4 h (yellow) in 826d75e.
- Commits: 9721cb6, 826d75e

### [2026-11-14 16:44] Orbi rewards
- Thread: B
- Type: task
- What was done: stars orbiting Orbi, streak counter, celebration when a test is saved, unlockable items. Rewards are for completing tests, never for the results.
- AI tools: Google AI Studio with prompts written by Claude.
- Why: routine and gamification support regular measurements (project rationale); rewarding results would push for dishonest self-reports.
- Commit: 331da2c

### [2026-11-14 16:58] Deep space visual style
- Thread: B
- Type: task
- What was done: visual restyle (space background, glass cards, Earth limb drawn with gradients) and the tagline "Your health, our mission". Same structure and logic.
- AI tools: Google AI Studio with prompts written by Claude, from a reference image provided by Paulina.
- Human review: the NASA logo and the photos in the reference image were left out on purpose (event rules; the app works offline).
- Commit: ff57459

### [2026-11-14 17:14] Frontend cleaned for local use
- Thread: B
- Type: problem
- What was done: `npm install` failed on a fresh copy (esbuild 0.25 conflicted with Vite 8). Unused dependencies left by AI Studio were removed (`@google/genai`, `express`, `dotenv`, `esbuild`, `tsx`), and `.env.example` and the frontend README no longer mention a Gemini key.
- AI tools: Claude found the problem by installing the repo from scratch; the fix was applied with a prompt in AI Studio.
- Human review: Paulina reinstalled and ran the app.
- Commit: 1e75b45

### [2026-11-14 17:21] Apache 2.0 license
- Thread: General
- Type: task
- What was done: `LICENSE` with the official Apache License 2.0 text.
- AI tools: Claude provided the official text with the team copyright line.
- Commit: 833f13a

### [2026-11-14 17:43] Core, demo data and demo.json (CUT 1)
- Thread: A
- Type: task
- What was done: core in `backend/core/`: personal baseline (flight days 4–10, mean and pstdev), z-score, clinical layer per measurement, deviation layer (3 in a row), final level (the higher wins; a deviation alone never reaches red), who is notified, PVT lapses and Amsler category from raw data. Continuous 42-day demo database (`data/demo_scenarios.csv`). Export to `frontend/src/data/demo.json` with the screen's data shape; on-screen texts read from `alert_texts.md` without rewriting them.
- AI tools: Claude (project chat, Opus 5.5) wrote the code and the tests and wrote the files into Paulina's local copy.
- Human review: Paulina ran the tests on her computer and reviewed the changes before committing. The core matches every non-pending row of `clinical_test_cases.csv` (more than 1,500 comparisons).
- Why: CUT 1 of the schedule.
- Finding: with only 7 baseline days the standard deviation can come out too narrow by chance, and then normal days trigger false deviation alerts (in a first version the healthy scenario raised orange blood pressure alerts). The demo data avoids it; it stays as an open point (minimum spread or a longer baseline).
- Commit: 4f2c18e

### [2026-11-14 17:43] Provisional decisions taken by the core
- Thread: A
- Type: decision
- What was done: the core needed an answer for each open decision. Rule used: when in doubt, the higher level. All are marked PROVISIONAL in the code and can be changed in one place.
  - Q1 "sustained" = 3 measurements in a row. ⚠7: a single extreme reading inside the clinical range sets no deviation alert.
  - ⚠5: mood and PVT count only when they get worse (higher); SpO₂ only when it drops; the rest in both directions.
  - Sleep at exactly 7 h = yellow; radiation at exactly 65 % = orange; a PVT response of exactly 355 ms is a lapse (≥).
  - ⚠1 / ⚠2: mood and PVT reach orange at most.
  - Q3: CO₂ yellow and orange use the 7-day average; red uses the highest 1-hour average.
  - ⚠3 / ⚠4 / Q2: low blood pressure is orange only with dizziness or feeling faint.
  - ⚠6: an Amsler change not repeated, or awaiting a retest, is yellow.
- AI tools: Claude proposed the provisional answers.
- Human review: PENDING: the whole team must confirm or change them.
- Commit: 4f2c18e

### [2026-11-14 17:51] The core reads the database, and the FastAPI API
- Thread: A
- Type: task
- What was done: the core now always reads `data/demo_scenarios.csv` through `backend/storage.py` (the simulator only creates the CSV; editing it changes what the app shows). FastAPI API (`backend/api/main.py`): status, 14-day series, scenarios, and `self_reports` that receives a check-in, a PVT session or an Amsler result and recalculates the status live. New results stay in memory until the API restarts. CORS for the local screen; tests with FastAPI's test client.
- AI tools: Claude wrote the code and the tests.
- Human review: Paulina ran the 43 tests (all green) and started the API on her computer.
- Commit: 9fce4e7

### [2026-11-14 17:58] Screen connected to the core with automatic fallback
- Thread: B
- Type: task
- What was done: the screen first tries the API (only on localhost), then `demo.json`, then the mocks. "Data source" indicator and "Demo scenario" selector under the settings gear. After a test, the screen refreshes with the status returned by the core.
- AI tools: Google AI Studio with a prompt written by Claude.
- Human review: Paulina checked on localhost that the screen shows the core's data (59 stars, 42-day streak, texts from `alert_texts.md`) and that the scenarios switch.
- Why: the demo must not depend on the API being up (codigo-orbital skill).
- Commit: d7b667e

### [2026-11-14 18:16] Fourth demo scenario: Attention (orange)
- Thread: A
- Type: task
- What was done: 4 scenarios, one per level: healthy (green), deterioration (yellow: sleep, CO₂, PVT), attention (orange: resting heart rate 66–67 bpm, clinically normal but a sustained marked deviation from Alex's own baseline), emergency (red: SpO₂ 89 % and two nights under 6 h). Overall message now says "2 areas need" instead of "2 area(s)".
- AI tools: Claude wrote the scenario, the tests and the docs; AI Studio added the fourth button.
- Human review: Paulina asked for one scenario per level and ran the tests (44 green).
- Why: Attention shows the personal baseline at work: a generic app would call 66 bpm normal.
- Commit: 3e169cd

### [2026-11-14 18:19] ML layer dropped from the MVP
- Thread: General
- Type: cut
- What was done: the optional ML anomaly layer is not built; it goes to the pitch and the README as future work.
- AI tools: none.
- Human review: team decision.
- Why: priority to a stable demo, documentation and pitch. The baseline finding above (too narrow with 7 days) is the kind of problem a future ML layer with more history would address.
- Commit: no commit

### [2026-11-14 18:36] Passenger-specific My Circle
- Thread: B
- Type: task
- What was done: the Space passenger profile has its own fictional contacts (family, business partner, flight concierge) and a signal delay of under 1 second (low Earth orbit), instead of the crew's contacts and Mars delay.
- AI tools: Google AI Studio with a prompt written by Claude.
- Human review: Paulina asked for separate data so the profiles do not look the same.
- Commits: 6e66b18, 61560e9 (`demo.json` restored after the export)

### [2026-11-14 18:40] Repository check
- Thread: General
- Type: task
- What was done: full check of the latest version on GitHub: 44 tests green; clean install and build of the frontend; `demo.json` present; the API is only tried on localhost; Apache 2.0 license; SI mark on every code file; no keys or `.env` files; README without Gemini instructions.
- AI tools: Claude cloned the public repo and ran the checks.
- Human review: Paulina asked for the check.
- Pending: update the code glossary (sent, it must be copied into `.claude/` by hand), team confirmation of the provisional decisions, thread C updates to `alert_texts.md` and the answer key.
- Commit: no commit

### [2026-11-14 20:30] Corrections after an external review
- Thread: A
- Type: decision
- What was done: an external AI review (ChatGPT) of the repo was read point by point and checked against the code and the project documents. Applied:
  - **Not evaluable, never green:** a baseline needs at least 5 of the 7 baseline days (PVT: 3 sessions). With too few values or no spread, the check-in scales and the PVT show `not_evaluable` instead of green; other measurements keep their clinical level and flag `baseline_available: false`.
  - **Fatigue, stress and workload** are now separate indicators in the Mental Health block, each with a baseline layer (escalas-y-protocolos.md §2.1). The deterioration scenario now also shows higher fatigue (yellow).
  - **Radiation as exposure tracking:** the cumulative dose reaches orange at most (from 65 % of the career limit); red only for a solar storm in progress. Answer key updated (RAD-07 and RAD-11 now orange) and alert_texts.md §7b updated. RAD-65 resolved.
  - **Brief PVT:** presented as a 1-minute PVT-inspired experimental test, not the validated 3-minute PVT-B; false starts are stored but not scored.
  - **API:** an unknown flight day returns 422 instead of using the last day.
  - **README:** "Validation" renamed "Verification", with an explicit note that the tests prove internal consistency, not clinical validity; limitations completed; why the public link uses demo.json.
- Not applied, with reasons: (1) "glucose, CO₂ and Amsler were not in the MVP" is not correct: the project document on NASA risks marks them MVP (3), (6) and (7), and the challenge asks for glucose; (2) deploying the API publicly now would share one in-memory session among all visitors and add cold starts, so the public link keeps demo.json and the live recalculation is shown locally; (3) the frontend build was verified with a clean install and builds on every Vercel deploy.
- AI tools: ChatGPT (external review); Claude evaluated each point, changed the code, data, tests and docs.
- Human review: Paulina read the review, approved the plan and the two decisions (radiation as exposure tracking; brief PVT presentation). Thread C (Miguel) to confirm the radiation change in alert_texts.md and the answer key, and to review the fallback texts for fatigue, stress and workload in export_demo.py.
- Commit: (complete with hash)

### [2026-11-14 21:05] Internal study documents for the jury
- Thread: General (A + C)
- Type: documentation
- What was done: three internal documents in Spanish (not part of the submission) so the whole team can explain and defend the project: (1) folder structure, stack and how the parts connect, including the data and the API; (2) the statistical engine: baseline days 4–10, z-score, sustained deviation rules, the two layers, not evaluable, with worked examples from the demo data and a decision diagram; (3) clinical basis: what NASA-STD-3001 sets and does not set, each indicator with its NASA risk, thresholds and source, tests and scales with their limitations, a sourced-vs-proposal table, key facts for the pitch, bibliography with links and likely jury questions.
- AI tools: Claude (Claude Docs), from the code, the project documents and the fisiologia-espacial skill.
- Human review: Paulina requested and reads them. To check: the 5 indicator-selection criteria named in document 3, and the radiation rule pending Miguel's confirmation (umbrales.md in the skill still has the old 65–80 % / > 80 % table).
- Commit: no commit (documents live outside the repo)

### [2026-11-14 21:40] Corrections after a second external review
- Thread: A + B
- Type: decision
- What was done: a second external AI review (ChatGPT) was checked against the code; its main findings were confirmed and fixed:
  - **PVT omissions:** a stimulus with no answer within 3 s is an omission and counts as a lapse; the screen now sends the number of stimuli shown and says "No answer"; sessions are compared as a lapse rate (scaled to a 15-stimulus reference session, so the stored demo data keeps the same z-scores); fewer than 5 stimuli = not evaluable. Before, a session with no answers was "0 lapses, green".
  - **API validation:** reaction times must be between 0 and 3,000 ms, no more answers than stimuli, no negative counts or durations, flight day ≥ 1; invalid payloads give 422 with the reason.
  - **Symptoms:** the check-in now has the four symptom boxes and the API receives them (dizziness and feeling faint feed the low blood pressure rule, headache the CO₂ rule; cold sore or rash is only recorded). The README already promised them.
  - **Amsler:** new question "This appeared suddenly" makes the red category reachable; a change is confirmed only if the same area is marked again (a distortion elsewhere waits for a retest).
  - **Consistency:** PVT named "Brief reaction test (PVT-inspired)" everywhere; Amsler source "Compared with your previous test"; sleep and CO₂ chart bands labeled as descriptive reference (they do not trigger alerts); each block reports how many indicators were evaluated; fatigue, stress and workload texts moved into alert_texts.md §5c–5e (pending thread C review); the frontend build now runs the TypeScript check.
  - **Documented as limitations (not changed):** repeat of red BP / low SpO₂ readings, glucose context, radiation past 100 % and the 250 mSv per-event limit, minimum spread of the baseline, no de-escalation rule, no PVT practice phase, 0–10 scale as a simplified VAS-inspired self-report, SpO₂ source from a pediatric WHO guideline, HR green from 50 as a team adaptation, and a more precise wording of what NASA and CSA measure today.
- AI tools: ChatGPT (external review); Claude verified each point, changed the core, API, screen, tests and docs. The screen was edited directly in the code (not regenerated in Google AI Studio).
- Human review: Paulina asked to fix everything tonight. All 56 backend tests pass; TypeScript check and frontend build pass. All four scenarios keep their overall level. To check by the team: the 3 s response window, the 15-stimulus reference and the 5-stimulus minimum (all Proposal); thread C to review the scale texts and the Amsler "same area" rule.
- Commit: (complete with hash)

### [2026-11-14 22:30] Machine learning layer kept as a documented proposal
- Thread: A + C
- Type: decision
- What was done: the team decided not to implement the ML layer and to present it as future work. README §12 now has a detailed proposal: purpose (combinations of small changes), what it would never do (yellow at most, never replaces the rules, unsupervised, explains its drivers), input (daily z-scores), cold start by stages (0 rules only; 1 combined chi-square score of squared z-scores; 2 Mahalanobis with shrinkage covariance; 2b Isolation Forest with dense wearable data), pre-flight data as a way to skip the cold start, evaluation against injected anomalies with the "cut 2" acceptance rule, where it would live in the code, and why it is not in the MVP (7 baseline days are too few).
- AI tools: Claude explained the statistical limits (Isolation Forest needs hundreds of readings; Mahalanobis covariance is near-singular with 9 measurements and 7 days) and wrote the README section, based on the team's ML proposal document.
- Human review: Paulina chose to keep it as a proposal and asked for a detailed description.
- Commit: (complete with hash)

### [2026-11-14 23:30] Whole repo translated to English
- Thread: General
- Type: decision
- What was done: every file with Spanish content was moved to English only. Code (Python): the Spanish half of each bilingual docstring and comment was removed, keeping the English one (no logic changed). Bilingual documents (`docs/content/alert_texts.md`, `data/README.md`, `docs/content/clinical_test_cases.md` and its generator): Spanish columns, lines and labels removed. Spanish-only files translated: `CLAUDE.md`, `CRONOGRAMA.md`, `docs/README.md`, `.gitignore`/`.gitattributes` comments, and everything in `.claude/` (agents, commands, the three skills and their references, including the bibliography). The code rule in `codigo-orbital` and `CLAUDE.md` now asks for English-only docstrings and comments. Kept on purpose: `glosario-es-en.md` (a Spanish–English glossary) and the logbook entries that mention the internal Spanish study documents. While translating, `umbrales.md` got a note on the provisional radiation decision of 14/11, to match the code.
- AI tools: Claude, with a script that removed the Spanish halves of bilingual lines plus a line-by-line review of every change; Spanish-only files translated by hand.
- Human review: Paulina asked for the whole repo in English. All 56 tests pass; `demo.json` is unchanged (the screen already used the English texts only).
- Commit: (complete with hash)

### [2026-11-14 23:15] README visual redesign
- Thread: C
- Type: task
- What was done: the README got a new visual layout, keeping all of its content. Added: a banner (`assets/orbital-banner.png`), a centered header with links and badges, a two-column contents table, three app screenshots in §6 (`assets/home.png`, `assets/body-map.png`, `assets/dashboard.png`, each labeled with its scenario), the architecture diagram in Mermaid, a `git clone` step, a team table and a closing block. §13 now lists ChatGPT.
- Discarded from the ChatGPT proposal: dropping the Source column and the "NASA HRP:" prefixes, shortened sections (PVT, rolling baseline, ML layer, code links, open clinical decisions), invented levels for the PVT/check-in row, an extra "Explainability" metric, LaTeX that GitHub does not render (and broke a table), headings that broke every contents link, a link to a missing `#documentation` anchor, the NASA logo inside a badge (the rules forbid NASA logos) and a placeholder "alerts" screenshot.
- AI tools: ChatGPT (OpenAI) proposed the layout and generated the banner image; Claude compared it with the previous README section by section, kept the previous content where they disagreed, added an "AI-generated image (ChatGPT, OpenAI)" watermark to the banner, created `assets/` and checked that all internal links resolve.
- Human review: Paulina provided the proposal and the screenshots and asked that the current content win in any contradiction. To check: that the banner and the Mermaid diagram render on GitHub.
- Commit: (complete with hash)

## Sunday 15/11

<!-- -->

### [2026-11-15 09:15] Consistency fixes across the clinical references
- Thread: C
- Type: decision
- What was done: an index of the 13 files in the team's Claude project found inconsistent figures; the ones present in the repo were unified:
  - **Communication delay:** "up to 22 minutes each way" changed to **up to 20 minutes each way** (NASA HRP, Distance from Earth) in `CLAUDE.md` and `contexto-fisiologico.md`, to match the README and `riesgos-nasa.md`.
  - **Number of NASA risks:** "about 30 risks" (Francisco 2016) changed to **17 risks** as NASA HRP lists them today, in `contexto-fisiologico.md`.
  - **Daily exercise:** `contexto-fisiologico.md` and the note in `riesgos-nasa.md` still said ~2 h/day; both now say ~1.5 h/day, 6–7 days a week (NASA HRP), matching the thresholds changed on 14/11 in `umbrales.md`.
  - **Not changed on purpose:** the PVT threshold (it would touch the core and the tests before the freeze).
  - Outside the repo: the duplicate copy of the NASA risks document was removed from the Claude project. The other inconsistencies found (three vs. four levels, Spanish table names, baseline as a Sunday extra, one vs. two live tests) are only in the pre-event project PDFs; the repo already follows the newer decision.
- AI tools: Claude (chat) compared the project documents with the repo files and edited the three Markdown files; no code, data or tests were touched.
- Human review: Paulina approved the list of fixes and asked to leave the PVT threshold as it is.
- Sources: NASA HRP, Risks of Human Spaceflight (https://www.nasa.gov/hrp/risks/); NASA HRP, Hazard: Distance from Earth (https://www.nasa.gov/hrp/hazard-distance-from-earth/).
- Commit: (complete with hash)
