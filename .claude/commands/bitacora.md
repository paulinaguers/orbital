---
description: Registra una entrada en BITACORA.md con el formato del equipo (qué se hizo, IA usada, revisión humana, commit).
argument-hint: [descripción breve de lo que se hizo o decidió]
---

Agregá una entrada al final de la sección del día correspondiente en `BITACORA.md`, siguiendo exactamente el formato definido al principio del archivo.

Lo que hay que registrar: $ARGUMENTS

Pasos:
1. Obtené la fecha y hora con `date "+%Y-%m-%d %H:%M"` y el último commit con `git log -1 --pretty=format:"%h %s"`.
2. Completá cada campo con lo que sabés de esta sesión. Para "Herramientas de IA" sé específico: qué herramienta y para qué (por ejemplo, "Claude Code escribió la función de puntaje z; revisor corrió tests").
3. Si falta un dato que solo el equipo conoce (sobre todo "Revisión humana": quién revisó y qué), preguntalo antes de escribir. No lo inventes.
4. Mostrá la entrada antes de guardarla.
