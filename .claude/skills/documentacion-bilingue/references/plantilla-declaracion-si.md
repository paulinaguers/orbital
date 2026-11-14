# Plantilla: declaración de uso de SI

El reglamento permite herramientas de SI (así llama el evento a la IA) y pide describir cómo se usaron. Primero en español, después en inglés. Completar solo con lo registrado en `BITACORA.md`.

---

## Declaración de uso de SI (español)

**Enfoque.** Desarrollamos ORBITAL con desarrollo asistido por IA con supervisión humana: la IA propuso y escribió partes del trabajo, y el equipo definió cada tarea, aprobó cada plan, revisó y probó cada resultado, y tomó todas las decisiones.

**Herramientas y uso**

| Herramienta | Para qué la usamos | Cómo revisamos el resultado |
| --- | --- | --- |
| Claude (chat, proyecto del equipo) | Investigación bibliográfica, documentos técnicos, metodología | Lectura y validación por el equipo; fuentes verificadas |
| Claude Code | Escritura de código por tareas chicas | Plan aprobado antes de ejecutar; tests; revisión humana |
| Subagente revisor (Claude Code) | Revisión de tests y coherencia clínica antes de cada commit | Informe leído por el equipo |
| Subagente coordinador (Claude Code) | Control de la agenda y registro de decisiones | Decisiones tomadas por el equipo |
| Skills del equipo | Contexto clínico, convenciones de código, documentación | Contenido escrito y revisado por el equipo |
| Google AI Studio | Generación de pantallas React a partir de prompts | Revisión visual y funcional |

**Qué hizo el equipo sin IA:** [completar desde la bitácora: decisiones clínicas, elección de umbrales, validación de casos, etc.]

**Qué generado por IA se descartó o corrigió:** [ejemplos de la bitácora]

**ML en el producto** (si aplica): [modelo, datos simulados o reales, evaluación, límites]. Es distinto del uso de IA para desarrollar.

---

## AI (SI) Use Statement (English)

[Same content and structure, in English.]
