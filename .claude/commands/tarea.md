---
description: Ejecuta una tarea con el ciclo completo del equipo - plan, aprobación, ejecución, tests, revisión, commit y bitácora.
argument-hint: [Hilo A|B|C] [descripción de la tarea]
---

Tarea: $ARGUMENTS

Seguí este ciclo sin saltear pasos:

1. **Plan.** Explicá en pocas líneas qué vas a hacer, qué archivos vas a crear o tocar y cómo se va a probar. Si la tarea es grande, proponé dividirla. Consultá la skill `codigo-orbital` y, si toca algo clínico, la skill `fisiologia-espacial`.
2. **Aprobación.** Esperá a que el equipo diga que sí. No escribas código antes.
3. **Ejecución.** Escribí el código, simple y comentado en español.
4. **Tests.** Escribí o actualizá los tests y corrélos. Mostrá el resultado.
5. **Revisión.** Usá el subagente `revisor` y mostrá su veredicto.
6. **Explicación.** Resumí en 3 líneas qué hace el código, para que el equipo pueda explicarlo al jurado.
7. **Commit.** Proponé un mensaje de commit corto en español y esperá confirmación.
8. **Bitácora.** Registrá la tarea con el formato de `BITACORA.md` (o recordá usar `/bitacora`).
9. Si la tarea figura en `CRONOGRAMA.md`, recordá al equipo marcarla con `[x]`.
