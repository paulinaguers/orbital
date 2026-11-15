# docs/

Supporting documentation for the project.

- `content/alert_texts.md`: the text of every alert (green, yellow, orange, red) and recommendation per indicator, written by thread C. The core reads these texts through `backend/core/alert_texts.py`.
- `content/clinical_test_cases.md`: the clinical answer key in readable form, generated from `backend/simulator/clinical_cases.py` (the same cases as `data/clinical_test_cases.csv`).

The clinical reference documents (thresholds, scales and protocols, NASA risks, bibliography) live in [`.claude/skills/fisiologia-espacial/references/`](../.claude/skills/fisiologia-espacial/references/).
