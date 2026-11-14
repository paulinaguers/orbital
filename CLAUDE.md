# ORBITAL – Contexto para Claude Code

## Qué es este proyecto

ORBITAL es el proyecto del equipo **The Foxhole Court** en el **NASA Space Apps Challenge 2026** (sede UCEL Rosario, 14 y 15 de noviembre de 2026), desafío *"Create Health Monitoring Software for Astronauts on Space Missions"*.

Es una app que registra indicadores de salud de un astronauta en un vuelo de larga duración, calcula su **línea de base personal** y escala alertas en cuatro niveles:

| Nivel | Significado | Acción |
| --- | --- | --- |
| Verde | Dentro de lo esperado | Seguir la rutina |
| Amarillo | Desvío de la línea base personal con el valor dentro del rango clínico | Aviso suave: vigilar, repetir, autocuidado (sin consulta) |
| Naranja | Fuera de rango clínico o desvío marcado y sostenido | Consultar al médico de a bordo |
| Rojo | Valor crítico | Escalar al flight surgeon en Tierra |

Tiene que funcionar **sin conexión con la Tierra** (en Marte la señal tarda hasta 22 min por tramo).

## Equipo y forma de trabajo

- 3 integrantes, todos con nivel inicial de Python. Los tres supervisan los tres hilos; la IA ejecuta y el equipo dirige, revisa y decide.
- Hilos de trabajo: **A** datos y motor (Python), **B** pantallas y conexión, **C** contenido clínico y documentación. Ver `CRONOGRAMA.md`.
- Cada tarea sigue el ciclo: **plan → aprobación humana → ejecución → tests → revisión (subagente `revisor`) → commit chico → entrada en `BITACORA.md`**. El comando `/tarea` guía este ciclo.
- Desarrollo asistido por IA con supervisión humana. **Nadie sube código que no puede explicar al jurado.**

## Reglas para Claude Code

1. **Una tarea chica por pedido.** Si el pedido es grande ("hacé la app"), proponé cómo dividirlo y esperá aprobación.
2. **Siempre plan primero.** Antes de escribir código, mostrá los pasos y los archivos que vas a tocar.
3. **Código para juniors:** simple, comentado en español, sin dependencias nuevas sin avisar. Seguí la skill `codigo-orbital`.
4. **Valores clínicos solo desde la skill `fisiologia-espacial`.** No inventes umbrales, rangos ni fuentes. Si un valor no está, decilo.
5. **El núcleo de cálculo va separado de la interfaz** (`backend/core/`), con tests propios. La interfaz nunca calcula umbrales.
6. **Datos simulados y declarados como tales.** Nunca presentes datos simulados como reales.
7. Al terminar cada tarea, recordá registrarla con `/bitacora`.

## Stack

> Se confirma el sábado 10:00. Hasta entonces, la skill `codigo-orbital` describe las dos variantes.

- **Opción A (propuesta ORBITAL):** núcleo Python → API FastAPI → pantallas React generadas con Google AI Studio. Modo demo: el núcleo exporta `demo.json` y React lo lee si la API falla.
- **Opción B (plan de rescate):** el mismo núcleo Python mostrado con Streamlit.

## Estructura del repo (prevista)

```text
backend/
  core/          # núcleo: línea de base, z, umbrales, escalamiento (sin interfaz)
  simulador/     # datos simulados de astronautas + anomalías inyectadas
  api/           # FastAPI (opción A)
  tests/
frontend/        # React de AI Studio (opción A) o app Streamlit (opción B)
docs/            # documentos del proyecto, dashboards propuestos, guías NASA
CRONOGRAMA.md    # agenda del evento (la lee el coordinador)
BITACORA.md      # registro cronológico de trabajo y uso de IA
.claude/         # skills, agentes y comandos del equipo
```

## Comandos y agentes disponibles

| Nombre | Tipo | Para qué |
| --- | --- | --- |
| `/tarea` | Comando | Guía el ciclo completo de una tarea |
| `/estado` | Comando | Llama al coordinador: avance contra el cronograma, atrasos, recortes |
| `/bitacora` | Comando | Registra una entrada en `BITACORA.md` |
| `revisor` | Subagente | Corre tests y revisa coherencia clínica antes del commit |
| `coordinador` | Subagente | Controla la agenda, registra sugerencias del equipo |
| `fisiologia-espacial` | Skill | Criterio clínico, umbrales, escalas y bibliografía |
| `codigo-orbital` | Skill | Convenciones de código y estructura |
| `documentacion-bilingue` | Skill | Metodología, README y declaración de SI en ES/EN |

## Reglas del evento que no se pueden romper

- No se trabaja en la solución antes del hackathon: el código se escribe del 14/11 en adelante.
- El uso de herramientas de SI (así llama el evento a la IA) está permitido, pero la entrega debe explicar cómo se usaron → todo queda en `BITACORA.md`.
- Repo congelado el **domingo 15:00**. Jurado **16:00**. Carga en la plataforma hasta **23:59**.
