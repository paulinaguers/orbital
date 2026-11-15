---
description: Runs a task with the team's full cycle - plan, approval, execution, tests, review, commit and logbook.
argument-hint: [Thread A|B|C] [task description]
---

Task: $ARGUMENTS

Follow this cycle without skipping steps:

1. **Plan.** Explain in a few lines what you will do, which files you will create or change and how it will be tested. If the task is big, propose how to split it. Check the `codigo-orbital` skill and, if it touches anything clinical, the `fisiologia-espacial` skill.
2. **Approval.** Wait for the team to say yes. Do not write code before that.
3. **Execution.** Write the code, simple and commented in English.
4. **Tests.** Write or update the tests and run them. Show the result.
5. **Review.** Use the `revisor` subagent and show its verdict.
6. **Explanation.** Summarize in 3 lines what the code does, so the team can explain it to the jury.
7. **Commit.** Propose a short commit message in English and wait for confirmation.
8. **Logbook.** Log the task in the `BITACORA.md` format (or remind the team to use `/bitacora`).
9. If the task is in `CRONOGRAMA.md`, remind the team to tick it with `[x]`.
