---
name: codigo-orbital
description: Code conventions and structure of the ORBITAL project. Use it whenever project code is written, changed or reviewed (Python, FastAPI, React, Streamlit, simulator, tests), when creating files or folders, when choosing libraries or when preparing a commit.
---

# ORBITAL code

The team codes in Python at a beginner level and supervises what the AI writes. The code must be explainable to the jury.

## Stack status

> **Decided on 13/11: Stack A** (React generated with Google AI Studio + FastAPI + Python core, with `demo.json` as a backup). **Stack B** (Streamlit) is only a fallback if React or the API do not make it.

- Stack A, the chosen one: `references/stack-react-fastapi.md`
- Stack B, fallback: `references/stack-streamlit.md`

In both, the **core is the same** and does not depend on the interface.

## Structure

```text
backend/
  core/              # core: NO imports from FastAPI, Streamlit or React
    thresholds.py    # clinical thresholds (values from the fisiologia-espacial skill)
    baseline.py      # mean, standard deviation, z-score
    escalation.py    # green / yellow / orange / red
    ml/              # optional anomaly layer (only if cut 1 is passed)
  simulator/         # generates simulated data + dated injected anomalies
  api/               # FastAPI (variant A)
  tests/             # pytest, one file per core module
frontend/            # React from AI Studio (A) or Streamlit app (B)
data/                # demo database (simulated)
docs/
```

## Rules

1. **Separate core.** Every clinical computation lives in `backend/core/`. The interface only shows what the core returns.
2. **Thresholds in one place:** `backend/core/thresholds.py`, as a dictionary with a source comment for each value. Never loose numbers in other files.
3. **Short functions** (ideally < 30 lines), with an **English docstring**: what it does, what it takes, what it returns and why it exists. Example:
   ```python
   def calculate_z_score(value, mean, std_dev):
       """Measures how far a reading is from the astronaut's personal baseline.

       Returns the z-score: 0 = usual; 2 = far from usual.
       """
   ```
4. **English names** (files, functions, variables, tables, endpoints), descriptive and using the terms in `references/glosario-codigo.md`. Comments explain the why, in English.
5. **Mandatory tests** for every core rule: a green case, a yellow one, a red one and the boundaries. Use `pytest`.
6. **Simulated data** marked: column `simulated = 1` and a `data/` folder with a README.
7. **Libraries allowed without asking:** Python standard library, pandas, numpy, pytest, scikit-learn (ML layer only), plotly. Any other one is checked with the team.
8. **No secrets in the repo.** No API keys.
9. **Small commits in English**, in the imperative: `add z-score calculation with tests`.
10. **Imports as a package:** every `backend/` folder has an empty `__init__.py`; imports are absolute from the root (`from backend.core.baseline import calculate_z_score`); tests always run from the repo root with `python -m pytest`, so they do not depend on the folder they are run from.
11. **Environment:** conda `orbital` (Python 3.11). Before opening Claude Code: `conda activate orbital`.
12. **Branches:** `main` always works. The ML layer lives in the `ml` branch until it passes cut 2.
13. **AI mark in every code file** (submission rule): first comment line `# Generated with SI assistance (Claude), reviewed by the ORBITAL team.` (in JS/TS: `// ...`). Commits already carry Claude's signature.
14. **License:** the repo has an Apache 2.0 `LICENSE` at the root. Any library added must be open source.
15. **Interface:** no NASA or CSA logos; visible texts in English; every card shows the official NASA risk it watches (table in the `fisiologia-espacial` skill, `references/riesgos-nasa.md`).

## Checklist before each commit (used by the revisor subagent)

- [ ] Tests pass
- [ ] No threshold outside `thresholds.py`, and all of them match the clinical skill
- [ ] The interface computes nothing clinical
- [ ] English names, docstrings and comments
- [ ] No unapproved new dependencies
- [ ] Simulated data identified
- [ ] AI-mark comment at the top of every new file
