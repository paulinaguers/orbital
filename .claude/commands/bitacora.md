---
description: Adds an entry to BITACORA.md in the team's format (what was done, AI used, human review, commit).
argument-hint: [short description of what was done or decided]
---

Add an entry at the end of the section for the right day in `BITACORA.md`, following exactly the format defined at the top of the file.

What to log: $ARGUMENTS

Steps:
1. Get the date and time with `date "+%Y-%m-%d %H:%M"` and the last commit with `git log -1 --pretty=format:"%h %s"`.
2. Fill in each field with what you know from this session. For "AI tools" be specific: which tool and what for (for example, "Claude Code wrote the z-score function; revisor ran the tests").
3. If a piece of information only the team knows is missing (especially "Human review": who reviewed what), ask before writing. Do not make it up.
4. Show the entry before saving it.
