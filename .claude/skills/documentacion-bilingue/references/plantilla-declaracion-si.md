# Template: AI (SI) use statement

The rules allow AI tools ("SI" in the event's wording) and ask to describe how they were used. Fill it in only with what is recorded in `BITACORA.md`.

---

## AI (SI) Use Statement

**Approach.** We built ORBITAL with AI-assisted development with human oversight: the AI proposed and wrote parts of the work, and the team defined each task, approved each plan, reviewed and tested each result, and made every decision.

**Tools and use**

| Tool | What we used it for | How we reviewed the result |
| --- | --- | --- |
| Claude (chat, team project) | Literature research, technical documents, methodology | Read and checked by the team; sources verified |
| Claude Code | Writing code in small tasks | Plan approved before running; tests; human review |
| Revisor subagent (Claude Code) | Review of tests and clinical consistency before each commit | Report read by the team |
| Coordinator subagent (Claude Code) | Schedule tracking and decision log | Decisions made by the team |
| Team skills | Clinical context, code conventions, documentation | Content written and reviewed by the team |
| Google AI Studio | Generating React screens from prompts | Visual and functional review |

**What the team did without AI:** [fill in from the logbook: clinical decisions, choice of thresholds, checking the cases, etc.]

**What AI-generated work was discarded or corrected:** [examples from the logbook]

**ML in the product** (if it applies): [model, simulated or real data, evaluation, limits]. This is different from using AI to develop.
