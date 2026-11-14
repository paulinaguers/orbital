---
name: documentacion-bilingue
description: Redacta la documentación del proyecto ORBITAL en español e inglés - metodología completa, uso de SI (inteligencia artificial) y plugins, README, descripción para la plataforma de Space Apps, guion del pitch y del video. Usar cuando haya que documentar lo hecho, preparar la entrega, consolidar la bitácora o escribir cualquier texto para el jurado.
---

# Documentación bilingüe de ORBITAL

Produce la documentación en **español y en inglés**, con el mismo contenido y la misma estructura en ambos idiomas, en un hilo cronológico de principio a fin.

## Fuentes (en este orden)

1. `BITACORA.md`: qué se hizo, cuándo, con qué IA y qué revisó el equipo. Es la fuente principal.
2. `CRONOGRAMA.md`: plan, puntos de control, cortes y registro del coordinador.
3. Skill `fisiologia-espacial`: fundamentos clínicos y bibliografía.
4. `CLAUDE.md` y la skill `codigo-orbital`: arquitectura y forma de trabajo.
5. Project Submission Guide y Judging Guide de NASA (en `docs/`), que mandan sobre formato y largo.

## Reglas

1. **No inventes hechos.** Todo lo que se afirma sobre el trabajo tiene que estar en la bitácora o el cronograma. Si falta algo, listalo como pregunta para el equipo.
2. **Orden cronológico** de principio a fin: preparación → sábado → domingo → entrega.
3. **Uso de SI completo y honesto**, en dos apartados separados:
   - IA como herramienta de desarrollo (Claude chat, Claude Code, subagentes, skills, Google AI Studio): para qué se usó cada una y cómo se revisó lo que generó.
   - ML como parte del producto (si se implementó): modelo, datos, evaluación y límites.
4. **Nombre del enfoque:** "desarrollo asistido por IA con supervisión humana" / "AI-assisted development with human oversight". No usar "vibe coding".
5. **Bilingüe paralelo:** para trabajo interno, primero español y después inglés. **Todo lo que se enlaza desde la entrega (README, metodología, declaración de SI, video, formulario) va con el inglés primero**: la guía exige inglés en la página y en todo material enlazado. Usar `references/glosario-es-en.md` para términos técnicos.
6. **Claro para quien no es especialista:** oraciones cortas, tablas para comparar, sin jerga sin explicar.
7. Citar fuentes con la bibliografía de la skill clínica.
8. **Origen de la idea:** la guía prohíbe usar SI para que se le ocurra la solución. Dejar claro que la idea, el criterio clínico y las decisiones son del equipo; la SI se usó para investigar, ordenar, programar y documentar.
9. **Marcas de SI visibles para el jurado:** código generado → mención en el README y comentario al inicio de cada archivo; imágenes o videos generados (incluido el avatar ficticio) → marca de agua visible. La respuesta del campo "Use of SI" no la ven los jueces; las marcas dentro del proyecto sí.
10. **Sin logos ni marcas de NASA** ni de agencias socias en ningún material.
11. **Referencias completas:** datos, fuentes clínicas, librerías (pandas, numpy, scikit-learn, FastAPI, React, Streamlit), Google AI Studio, Claude, imágenes. Aunque sean abiertas.
12. **Datos de NASA como parte central (criterio Relevance):** en todos los textos, explicar que los umbrales salen del NASA-STD-3001, que cada indicador vigila un riesgo oficial del NASA HRP y que el simulador usa números publicados por NASA. Mencionar la CSA (agencia socia: Bio-Monitor, Space Health, Vascular).

## Entregables y plantillas

| Entregable | Plantilla | Cuándo |
| --- | --- | --- |
| Documento de metodología (ES + EN) | `references/plantilla-metodologia.md` | Borrador en cada punto de control; cierre el domingo 12:00–14:30 |
| Declaración de uso de SI (ES + EN) | `references/plantilla-declaracion-si.md` | Domingo, antes de la carga |
| README del repo (ES + EN) | Sección "README" de la plantilla de metodología | Domingo antes de las 15:00 |
| Campos del formulario (en inglés) | `references/campos-formulario.md` | Domingo 15:00–16:00, envío apenas termina el jurado |
| Guion del video demo (≤ 30 s, subtítulos en inglés) | `references/campos-formulario.md` | Domingo bloque 3 |

## Trabajo progresivo

- En cada `/estado`, actualizar el borrador de metodología con las entradas nuevas de la bitácora (solo español).
- El domingo, completar, revisar y traducir al inglés.
