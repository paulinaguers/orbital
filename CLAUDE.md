# ORBITAL – Context for Claude Code

## What this project is

ORBITAL is the project of team **The Foxhole Court** at the **NASA Space Apps Challenge 2026** (UCEL Rosario site, 14–15 November 2026), challenge *"Create Health Monitoring Software for Astronauts on Space Missions"*.

It is an app that records an astronaut's health indicators on a long-duration flight, computes their **personal baseline** and escalates alerts on four levels:

| Level | Meaning | Action |
| --- | --- | --- |
| Green | Within what is expected | Keep the routine |
| Yellow | Deviation from the personal baseline with the value inside the clinical range | Soft warning: monitor, repeat, self-care (no consultation) |
| Orange | Outside the clinical range, or a marked and sustained deviation | Contact the onboard doctor |
| Red | Critical value | Escalate to the flight surgeon on Earth |

It must work **without a connection to Earth** (from Mars, the signal takes up to 22 minutes each way).

## Team and way of working

- 3 members, all at a beginner Python level. All three supervise the three threads; the AI executes and the team directs, reviews and decides.
- Work threads: **A** data and engine (Python), **B** screens and connection, **C** clinical content and documentation. See `CRONOGRAMA.md`.
- Every task follows the cycle: **plan → human approval → execution → tests → review (`revisor` subagent) → small commit → entry in `BITACORA.md`**. The `/tarea` command guides this cycle.
- AI-assisted development with human oversight. **Nobody commits code they cannot explain to the jury.**

## Rules for Claude Code

1. **One small task per request.** If the request is big ("build the app"), propose how to split it and wait for approval.
2. **Always plan first.** Before writing code, show the steps and the files you will touch.
3. **Code for juniors:** simple, commented in English, no new dependencies without warning. Follow the `codigo-orbital` skill.
4. **Clinical values only from the `fisiologia-espacial` skill.** Do not invent thresholds, ranges or sources. If a value is not there, say so.
5. **The computing core is separate from the interface** (`backend/core/`), with its own tests. The interface never computes thresholds.
6. **Simulated data, declared as such.** Never present simulated data as real.
7. When a task is done, remember to log it with `/bitacora`.

## Stack

> **Decided on 13/11: Stack A**, with Streamlit as a fallback (B). Details in the `codigo-orbital` skill.

- **Stack A (chosen):** Python core → FastAPI API → React screens generated with Google AI Studio. Demo mode: the core exports `demo.json` and React reads it if the API fails.
- **Stack B (fallback):** the same Python core shown with Streamlit.

## Repo structure

```text
backend/
  core/          # core: baseline, z-score, thresholds, escalation (no interface)
  simulator/     # simulated astronaut data + injected anomalies
  api/           # FastAPI (option A)
  tests/
frontend/        # React from AI Studio (option A) or Streamlit app (option B)
docs/            # project documents, proposed dashboards, NASA guides
CRONOGRAMA.md    # event schedule (read by the coordinator)
BITACORA.md      # chronological log of the work and of AI use
.claude/         # the team's skills, agents and commands
```

## Available commands and agents

| Name | Type | What for |
| --- | --- | --- |
| `/tarea` | Command | Guides the full cycle of a task |
| `/estado` | Command | Calls the coordinator: progress against the schedule, delays, cuts |
| `/bitacora` | Command | Adds an entry to `BITACORA.md` |
| `revisor` | Subagent | Runs the tests and checks clinical consistency before a commit |
| `coordinador` | Subagent | Tracks the schedule and logs the team's suggestions |
| `fisiologia-espacial` | Skill | Clinical criteria, thresholds, scales and bibliography |
| `codigo-orbital` | Skill | Code conventions and structure |
| `documentacion-bilingue` | Skill | Methodology, README and AI-use statement |

## Event rules that cannot be broken

- No work on the solution before the hackathon: code is written from 14/11 on.
- AI tools ("SI" in the event's wording) are allowed, but the submission must explain how they were used → everything goes in `BITACORA.md`.
- Repo frozen on **Sunday 15:00**. Jury at **16:00**. Upload to the platform until **23:59**.

## Submission rules (official guides of 13/11/2026)

- Everything linked from the submission is in English.
- Demo: video of 30 s at most, with English subtitles. Going over disqualifies the project from global judging.
- Public repo when submitting (paulinaguers changes it on Sunday 15:00). Apache 2.0 license.
- AI declared and marked: a comment at the top of every code file; a watermark on generated images or videos. The idea and the criteria are the team's.
- No NASA or partner agency logos.
- NASA data as a central part: every indicator shows its official NASA risk and its thresholds with their source.
- Details: `documentacion-bilingue` skill, `references/campos-formulario.md`.
- Code: names, docstrings, comments and commits in English (team decision 14/11: the whole repo is in English). Glossary in the `codigo-orbital` skill, `references/glosario-codigo.md`.
