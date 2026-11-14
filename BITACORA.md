# Bitácora de trabajo – ORBITAL

Registro cronológico de todo lo que hace el equipo durante el hackathon: decisiones, tareas, uso de herramientas de IA (SI) y plugins, y lo que revisó una persona. Es la materia prima de la documentación final en español e inglés (skill `documentacion-bilingue`).

**Reglas**

- Una entrada por tarea terminada o decisión tomada. Se agrega al final, nunca se borra.
- Se registra con `/bitacora` o a mano con el formato de abajo.
- "Revisión humana" es obligatoria: qué se leyó, probó o corrigió.
- Si una herramienta de IA generó algo que se descartó, también se anota.

**Formato de cada entrada**

```text
### [AAAA-MM-DD HH:MM] Título corto
- Hilo: A | B | C | General
- Tipo: tarea | decisión | sugerencia | problema | recorte
- Qué se hizo:
- Herramientas de IA: (Claude chat / Claude Code / subagente revisor / subagente coordinador / Google AI Studio / ninguna) y para qué
- Revisión humana: qué se leyó, probó o corrigió y quién
- Por qué: razón de la decisión (si aplica)
- Fuentes: documentos o referencias usadas (si aplica)
- Commit: hash o "sin commit"
```

---

## Preparación (antes del evento)

### [2026-11-01 → 2026-11-13] Investigación y preparación
- Hilo: General
- Tipo: decisión
- Qué se hizo: investigación de indicadores, umbrales, escalas y fundamentación; definición de la metodología de trabajo con Claude (proyecto, skills, agentes, cronograma). Sin código de la solución, según las reglas del evento.
- Herramientas de IA: Claude (chat) para búsqueda bibliográfica, redacción de documentos y diseño de la metodología.
- Revisión humana: el equipo revisó y validó los documentos: Indicadores y umbrales, Fundamentación del proyecto, Escalas tests y protocolos, Capa de ML.
- Fuentes: ver `.claude/skills/fisiologia-espacial/references/bibliografia.md`.
- Commit: sin commit

---

## Sábado 14/11

<!-- Las entradas del evento van debajo, en orden cronológico -->

### [2026-11-14 12:41] Control 12:41: recortes propuestos por atraso del Bloque 1
- Hilo: General
- Tipo: sugerencia
- Qué se hizo: control de avance. El repo tiene solo la configuración (commits 2dc2d64 a las 11:31 y 29730a9 a las 12:25), sin `backend/` ni entregables de B o C. Se propone: (1) simulador solo con CSV, sin SQLite ni `self_reports`; (2) A publica primero el formato de datos (columnas y un JSON de ejemplo) para que B no lo espere; (3) si el núcleo no tiene los tests en verde a las 17:00, la capa de ML queda afuera desde ya. Pendiente de decisión del equipo.
- Herramientas de IA: subagente coordinador (Claude Code) para medir el avance contra el cronograma.
- Revisión humana: pendiente; el equipo decide si aplica los recortes.
- Por qué: unos 130 min de atraso en el Hilo A ponen en riesgo el CORTE 1 (núcleo y API con tests a las 19:00).
- Commit: sin commit

### [2026-11-14 12:56] Textos de alerta del MVP (EN/ES)
- Hilo: C
- Tipo: tarea
- Qué se hizo: docs/content/alert_texts.md con, para las 10 mediciones de los 7 grupos del MVP y los 4 niveles, el texto que ve el astronauta y la recomendación (EN primero, ES debajo), el umbral que lo dispara con su fuente (marcado "Proposal" donde la skill dice Propuesta) y el riesgo oficial de NASA. Acción fija por nivel en todas las mediciones; rojo solo por umbral clínico. Sección Symptoms con las 4 casillas y la regla que alimenta cada una. Quedan 6 decisiones del equipo marcadas con ⚠: rojo del ánimo, rojo del PVT, mapeo de síntomas y temperatura, presión < 90/60 sin síntomas, dirección del desvío |z| y Amsler.
- Herramientas de IA: Claude Code (Opus 5.5) armó el plan y redactó el archivo desde la skill fisiologia-espacial; el subagente revisor lo comparó con la skill (aprobado con cambios); Claude Code aplicó las 4 correcciones del revisor y quitó 3 consejos que no estaban en la skill. Nota de proceso: un comando corrió en auto mode; se volvió a Manual.
- Revisión humana: PENDIENTE. Miguel (Hilo C) aprobó el plan, pidió los 3 agregados (síntomas, acción fija por nivel, umbral con fuente) y verificó que no hubiera duplicados en 66f14f2. Falta la lectura clínica completa del archivo. Las 6 decisiones ⚠ quedan abiertas.
- Por qué: entregable del Hilo C, bloque 1. Las pantallas (B) y el núcleo (A) usan estos textos y umbrales.
- Fuentes: skill fisiologia-espacial (umbrales.md, escalas-y-protocolos.md, linea-base-y-ml.md, riesgos-nasa.md, bibliografia.md).
- Commit: 66f14f2
- Correction: the committed file was truncated after section 6; restored in commit 5ab5c33.

## Domingo 15/11

<!-- -->
