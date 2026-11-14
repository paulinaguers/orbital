# Plantilla: documento de metodología

Se escribe primero completo en español y después el mismo documento en inglés. Los títulos en inglés van entre paréntesis como guía.

---

## 1. Resumen (Summary)
Qué es ORBITAL, para quién, qué problema resuelve y qué entregamos, en 5 líneas.

## 2. El desafío y nuestra pregunta (Challenge and guiding question)
Desafío de NASA y la pregunta del proyecto.

## 3. Fundamentación (Rationale)
Cinco peligros, brechas del monitoreo actual, autonomía médica (EIMO). Con referencias.

## 4. Equipo y organización (Team and organization)
- Integrantes y formación (sin roles fijos; los tres supervisan los tres hilos).
- Hilos de trabajo A, B, C y por qué se organizaron así (continuidad de herramienta y lógica).
- Cuentas y herramientas: proyecto de Claude por integrante, repo común, cuenta con Claude Code.

## 5. Metodología de trabajo (Working methodology)
- Desarrollo asistido por IA con supervisión humana.
- Ciclo de cada tarea: plan → aprobación → ejecución → tests → revisión (subagente revisor) → commit → bitácora.
- Puntos de control y cortes (coordinador, `/estado`).
- Reglas: nadie sube código que no entiende; umbrales solo desde la skill clínica; datos simulados declarados.

## 6. Cronología (Timeline)
Preparación → sábado por bloques → domingo por bloques → entrega. Para cada bloque: qué se planeó, qué se hizo, qué se recortó y por qué. Fuente: bitácora y registro del coordinador.

## 7. Solución técnica (Technical solution)
- Arquitectura: entrada → núcleo → salidas; stack elegido y por qué.
- Indicadores del MVP y umbrales (tabla con fuente o "propuesta").
- Línea base personal y escalamiento.
- Capa de ML (si se implementó): arranque en frío, modelo, evaluación. Si no: trabajo futuro.

## 8. Uso de SI y plugins (AI and plugin use)
Resumen; el detalle va en la declaración de SI.

## 9. Validación (Validation)
Tests, casos clínicos de prueba, evaluación del ML contra anomalías inyectadas.

## 10. Limitaciones y trabajo futuro (Limitations and future work)

## 11. Referencias (References)

---

## README (para el repo)

1. Qué es ORBITAL (3 líneas) · 2. Cómo correrlo (pasos exactos) · 3. Modo demo · 4. Estructura del repo · 5. Datos simulados (aclaración) · 6. Uso de IA (link a la declaración) · 7. Equipo · 8. Licencia.
