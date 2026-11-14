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
5. **Bilingüe paralelo:** primero el texto completo en español, después el mismo en inglés. Usar `references/glosario-es-en.md` para términos técnicos.
6. **Claro para quien no es especialista:** oraciones cortas, tablas para comparar, sin jerga sin explicar.
7. Citar fuentes con la bibliografía de la skill clínica.

## Entregables y plantillas

| Entregable | Plantilla | Cuándo |
| --- | --- | --- |
| Documento de metodología (ES + EN) | `references/plantilla-metodologia.md` | Borrador en cada punto de control; cierre el domingo 12:00–14:30 |
| Declaración de uso de SI (ES + EN) | `references/plantilla-declaracion-si.md` | Domingo, antes de la carga |
| README del repo (ES + EN) | Sección "README" de la plantilla de metodología | Domingo antes de las 15:00 |
| Descripción para la plataforma y guion de video | Según la Project Submission Guide | Domingo |

## Trabajo progresivo

- En cada `/estado`, actualizar el borrador de metodología con las entradas nuevas de la bitácora (solo español).
- El domingo, completar, revisar y traducir al inglés.
