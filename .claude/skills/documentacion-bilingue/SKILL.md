---
name: documentacion-bilingue
description: Writes the ORBITAL project documentation - full methodology, AI (SI) and plugin use, README, description for the Space Apps platform, pitch and video script. Use it when the work needs to be documented, the submission prepared, the logbook consolidated or any text for the jury written.
---

# ORBITAL documentation

Produces the project documentation in a single chronological thread, from start to end. **Everything in the repo and everything linked from the submission is in English** (team decision, 14/11). Spanish versions are only for internal study material kept outside the repo.

## Sources (in this order)

1. `BITACORA.md`: what was done, when, with which AI and what the team reviewed. It is the main source.
2. `CRONOGRAMA.md`: plan, checkpoints, cuts and coordinator log.
3. `fisiologia-espacial` skill: clinical basis and bibliography.
4. `CLAUDE.md` and the `codigo-orbital` skill: architecture and way of working.
5. NASA's Project Submission Guide and Judging Guide (in `docs/`), which rule on format and length.

## Rules

1. **Do not invent facts.** Everything stated about the work must be in the logbook or the schedule. If something is missing, list it as a question for the team.
2. **Chronological order** from start to end: preparation → Saturday → Sunday → submission.
3. **Complete and honest AI use**, in two separate parts:
   - AI as a development tool (Claude chat, Claude Code, subagents, skills, Google AI Studio): what each one was used for and how its output was reviewed.
   - ML as part of the product (if implemented): model, data, evaluation and limits.
4. **Name of the approach:** "AI-assisted development with human oversight". Do not use "vibe coding".
5. **English in the repo and in everything linked from the submission** (README, methodology, AI-use statement, video, form): the guide requires English on the page and in all linked material. Use `references/glosario-es-en.md` for technical terms.
6. **Clear for non-specialists:** short sentences, tables to compare, no unexplained jargon.
7. Cite sources with the clinical skill's bibliography.
8. **Origin of the idea:** the guide forbids using AI to come up with the solution. Make clear that the idea, the clinical criteria and the decisions are the team's; AI was used to research, organize, code and document.
9. **AI marks visible to the jury:** generated code → mention in the README and a comment at the top of every file; generated images or videos (including the fictional avatar) → visible watermark. The answer to the "Use of SI" field is not seen by the judges; the marks inside the project are.
10. **No NASA or partner agency logos or marks** in any material.
11. **Complete references:** data, clinical sources, libraries (pandas, numpy, scikit-learn, FastAPI, React, Streamlit), Google AI Studio, Claude, images. Even if they are open.
12. **NASA data as a central part (Relevance criterion):** in every text, explain that the thresholds follow NASA-STD-3001, that each indicator watches an official NASA HRP risk and that the simulator uses numbers published by NASA. Mention the CSA (partner agency: Bio-Monitor, Space Health, Vascular).

## Deliverables and templates

| Deliverable | Template | When |
| --- | --- | --- |
| Methodology document | `references/plantilla-metodologia.md` | Draft at each checkpoint; closed on Sunday 12:00–14:30 |
| AI-use statement | `references/plantilla-declaracion-si.md` | Sunday, before the upload |
| Repo README | "README" section of the methodology template | Sunday before 15:00 |
| Form fields (in English) | `references/campos-formulario.md` | Sunday 15:00–16:00, submitted right after the jury |
| Demo video script (≤ 30 s, English subtitles) | `references/campos-formulario.md` | Sunday block 3 |

## Progressive work

- At each `/estado`, update the methodology draft with the new logbook entries.
- On Sunday, complete and review it.
