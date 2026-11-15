# Schedule – ORBITAL · NASA Space Apps 2026

Work plan for the event. It is read by the `coordinador` agent (`/estado` command). Each task is ticked with `[x]` when done, with the commit hash.

**How to read it**

- Three threads, one per Claude account, but all three members supervise all of them: the AI executes and the team directs, reviews and decides.
- Each thread keeps the same tool and logic from start to end, so nobody switches context.
- The **checkpoints** (`/estado`) are fixed. The **cuts** decide what is left out to protect the MVP.
- Event hours: Sat 10:00–13:00 and 14:00–19:00 · Sun 09:30–15:00 (mentoring 11:30) · repo frozen Sun 15:00 · jury Sun 16:00 · platform upload until Sun 23:59.
- **Submission rules (official guides of 13/11):** everything in English · demo = video ≤ 30 s with English subtitles (going over disqualifies the project from global judging) · repo and video public, no login · NASA data as a central part · AI declared and marked · no NASA or partner agency logos · Apache 2.0 license.

**Done before the event**

- [x] Repo created on GitHub. **It stays empty until Sat 10:00 by team decision**: it is normal that it has no commits or remote before then
- [x] Dashboard proposals (images), kept outside the repo; copied to `docs/dashboards/` on Sat 10:00
- [x] Technical documents: indicators, rationale, scales, ML layer
- [x] `.claude/` structure (skills, agents, commands), `CLAUDE.md`, this schedule and the logbook

---

## Friday 13/11 (preparation, no code)

- [ ] Each member: Claude project with instructions and documents
- [ ] Each member: upload the 3 skills to claude.ai
- [ ] Install Claude Code (at least thread A's account) and test it
- [x] Read the Project Submission Guide, Judging Guide and challenge resources (full review on 14/11, 01:00)
- [x] Single pass adjusting the documents and the clinical skill to the guides
- [ ] Upload the PDFs of both guides to each member's Claude project

---

## Saturday 14/11

### 10:00–10:30 · Kick-off (all three together)

- [ ] One person clones the repo, copies the setup folder (`.claude/`, `CLAUDE.md`, `CRONOGRAMA.md`, `BITACORA.md`, `docs/`) plus dashboards, documents and NASA guides into `docs/`, commits and pushes; the other two clone and check that they see the skills and agents
- [x] Stack A decided on 13/11 (Streamlit as a fallback)
- [ ] Add `LICENSE` (Apache 2.0) from GitHub: Add file → Create new file → `LICENSE` → Choose a license template → Apache License 2.0 → commit
- [ ] Copy the NASA guide PDFs to `docs/guias-nasa/`
- [ ] Confirm the 7 MVP indicators and the scope (check against the NASA guides)
- [ ] Choose the base dashboard among the existing proposals
- [ ] Logbook entry: kick-off decisions

### 10:30–13:00 · Block 1

| Thread | Tasks | Deliverable |
| --- | --- | --- |
| A · Data and engine | `backend/` structure; data format (tables `measurements`, `self_reports`, `baselines`, `alerts`, `injected_anomalies`; English names); simulator with realistic noise, day/night rhythm and **dated injected anomalies** | Simulator that generates a CSV/SQLite of one astronaut over 60+ days, with a test |
| B · Screens | Mockup of the main screen from the chosen dashboard (design artifact); prompts for Google AI Studio. **Every card shows the official NASA risk it watches** (e.g. "NASA HRP risk: SANS") and its threshold with its source. **No NASA or CSA logos.** App texts in English | Mockup approved by the team |
| C · Content | Texts for each alert (green/yellow/orange/red) and recommendation per indicator, from the clinical skill; criteria for the clinical test cases | [x] Alert texts file (`docs/content/alert_texts.md`, `5ab5c33`) · [x] Test case list (`data/clinical_test_cases.csv`, `f223c75`) (13 open team decisions) |

- [ ] **11:00 · `/estado`**
- [ ] **13:00 · `/estado`** (before lunch)

### 13:00–14:00 · Lunch

### 14:00–19:00 · Block 2

| Thread | Tasks | Deliverable |
| --- | --- | --- |
| A · Data and engine | Core: clinical thresholds, baseline (pre-flight or days 4–10), z-score, escalation; tests per rule; **basic API** (option A) or functions ready for Streamlit (option B) | Core with green tests + minimal API |
| B · Screens | Screens with sample data: human figure colored by system, traffic light, detail per indicator | Navigable screens with fixed data |
| C · Content | Check the core's results against the clinical cases; start the README | Checked cases + README draft |

- [ ] **16:00 · `/estado`**
- [ ] **19:00 · `/estado` + CUT 1**: do the core and the basic API pass their tests? If not, the ML layer is left out and Sunday is used to close the MVP. Full review of the core with the `revisor` subagent.
- [ ] Logbook entry: status at the end of Saturday

---

## Sunday 15/11

### 09:30–11:30 · Block 3

| Thread | Tasks | Deliverable |
| --- | --- | --- |
| A · Data and engine | **If cut 1 was passed:** ML layer with cold start (stages 0/1/2, "ML calibrating" notice), Mahalanobis or Isolation Forest depending on the data, evaluation against injected anomalies. **If not:** finish the core and the API | Evaluation table rules vs. rules + ML, or a closed core |
| B · Screens | Trend charts; connection to the API | Connected app |
| C · Content | Script for the pitch (local jury) and for the **30-second demo video** with English subtitles (Submission Guide outline: 0:00 team · 0:02 challenge · 0:05 name and tagline · 0:10 how it works and NASA/CSA data · 0:20–0:30 future); check on-screen texts | Script v1 |

- [ ] **11:30 · Mentoring + CUT 2**: does the ML detect better than the rules without more false alarms? Is thread B up to date? If not, the ML is switched off and stays as future work (separate branch).

### 11:30–15:00 · Block 4

| Thread | Tasks | Deliverable |
| --- | --- | --- |
| A · Data and engine | Demo scenarios (healthy, deterioration, emergency, and ML calibration if it applies); `demo.json` | Scenarios ready |
| B · Screens | Demo mode; ML alert on screen if it applies; visual polish | Stable demo that does not depend on the API |
| C · Content | Final README, methodology and AI-use statement with the `documentacion-bilingue` skill; form texts in English; full list of references; record and subtitle the 30-second video (without going over); pitch rehearsal | Documentation and video ready |

- [ ] **13:30 · `/estado`** (last check before the freeze)
- [ ] **14:30 · Full end-to-end test of the demo**
- [ ] **15:00 · REPO FROZEN**
- [ ] **15:00 · paulinaguers** (repo owner) makes it public: Settings → General → Danger Zone → Change visibility → Make public
- [ ] Another member tests in an incognito window: repo link and video link (YouTube or Drive, public, no login)

### 15:00–16:00 · Jury preparation

- [ ] Final pitch rehearsal; each member can explain their thread

### 16:00 · Jury

### From 16:00 · Upload to the platform (closes 23:59, Rosario time)

- [ ] **First complete submission right after the jury** (it can be resubmitted until 23:59; the last one counts)
- [ ] Fields in English: Project Name · High-Level Summary · Link to Demo · Link to Final Project · Detailed Description · Use of SI · NASA Data · Partner Data and References
- [ ] Tick Terms and Conditions and Confirm All Work is Original; check the confirmation banner
- [ ] Final logbook entry

---

## Coordinator log

<!-- The coordinator agent adds a short summary here at each checkpoint -->

**[Sat 12:41] Checkpoint (Block 1, 19 min left; the 11:00 checkpoint was not done)**
- Kick-off half done: the setup was pushed at 11:31 (about 60 min late) and the NASA context at 12:25. Missing: `LICENSE`, `docs/guias-nasa/`, dashboards, the 7 indicators, the base dashboard and the logbook entry.
- A: no `backend/` and no simulator yet (about 130 min behind). B and C: nothing in the repo; cannot be checked.
- High risk for CUT 1 (19:00). Proposed cuts: CSV only (no SQLite), no `self_reports` in the simulator, and ML out if the core does not have green tests by 17:00.
- Action: close the kick-off before 13:00, A defines the data format for B and everything is pushed to the repo. Next checkpoint: 13:00.
