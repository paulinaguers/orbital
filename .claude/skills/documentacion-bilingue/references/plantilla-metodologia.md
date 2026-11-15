# Template: methodology document

Written in English.

---

## 1. Summary
What ORBITAL is, who it is for, what problem it solves and what we deliver, in 5 lines.

## 2. Challenge and guiding question
NASA's challenge and the project's question.

## 3. Rationale
Five hazards, gaps in current monitoring, medical autonomy (EIMO). With references.

## 4. Team and organization
- Members and background (no fixed roles; all three supervise the three threads).
- Work threads A, B, C and why they were organized that way (continuity of tool and logic).
- Accounts and tools: a Claude project per member, a shared repo, an account with Claude Code.

## 5. Working methodology
- AI-assisted development with human oversight.
- Cycle of each task: plan → approval → execution → tests → review (revisor subagent) → commit → logbook.
- Checkpoints and cuts (coordinator, `/estado`).
- Rules: nobody commits code they do not understand; thresholds only from the clinical skill; simulated data declared.

## 6. Timeline
Preparation → Saturday by block → Sunday by block → submission. For each block: what was planned, what was done, what was cut and why. Source: logbook and coordinator log.

## 7. Technical solution
- Architecture: input → core → outputs; chosen stack and why.
- MVP indicators and thresholds (table with source or "Proposal").
- Personal baseline and escalation.
- ML layer (if implemented): cold start, model, evaluation. If not: future work.

## 8. AI and plugin use
Summary; details go in the AI-use statement.

## 9. Validation
Tests, clinical test cases, evaluation of the ML against injected anomalies.

## 10. Limitations and future work

## 11. References

---

## README (for the repo)

1. What ORBITAL is (3 lines) · 2. How to run it (exact steps) · 3. Demo mode · 4. Repo structure · 5. Simulated data (note) · 6. Use of AI (link to the statement) · 7. Team · 8. License.
