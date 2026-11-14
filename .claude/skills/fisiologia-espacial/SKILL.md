---
name: fisiologia-espacial
description: Criterio clínico del proyecto ORBITAL (monitoreo de salud de astronautas). Usar siempre que haya que definir o revisar umbrales, rangos, reglas de alerta o escalamiento, línea de base personal, escalas y tests (PVT, Amsler, VAS, diario de sueño), textos de recomendaciones, la capa de ML, preguntas del jurado sobre validez científica, o cuando se necesite una fuente o referencia bibliográfica de fisiología espacial o medicina aeroespacial.
---

# Fisiología espacial – criterio clínico de ORBITAL

Esta skill es la fuente de verdad clínica del proyecto. Todo número que entre al código o a un texto de la app sale de acá, con su fuente.

## Reglas

1. **No inventes valores.** Si un umbral, rango o dato no está en las referencias, decilo y proponé buscarlo. Nunca completes con memoria.
2. **Distinguí fuente y propuesta.** Los valores marcados como *Propuesta* son decisiones de diseño del equipo, sin una fuente que fije ese número. Decilo así en textos y ante el jurado.
3. **Citá la fuente primaria** (NASA-STD-3001, NASA HRP, guías clínicas de OMS, AHA, CDC, ADA, artículos revisados por pares). Las URL están en `references/bibliografia.md`.
4. **La app orienta, no diagnostica.** No es un dispositivo médico. Las decisiones clínicas son del médico de a bordo y del flight surgeon.
5. **Datos simulados se declaran como simulados.**
6. Etapa de foco: **vuelo de larga duración** (etapa 4 de la vida del astronauta).

## Mapa de referencias (leer solo lo que haga falta)

| Archivo | Cuándo leerlo |
| --- | --- |
| `references/umbrales.md` | Umbrales de 4 niveles (verde, amarillo, naranja, rojo), matriz de indicadores, MVP de 7 indicadores, límites del NASA-STD-3001 |
| `references/linea-base-y-ml.md` | Línea base personal, puntaje z, reglas de escalamiento, capa de ML y arranque en frío |
| `references/escalas-y-protocolos.md` | Cómo se hace y puntúa cada test, escala y medición con dispositivo |
| `references/contexto-fisiologico.md` | Cinco peligros, efectos en el cuerpo, cómo se monitorea hoy en la ISS, autonomía médica (EIMO) |
| `references/bibliografia.md` | Todas las referencias citadas en los documentos del proyecto, con URL |
| `references/libros-de-referencia.md` | Libros y fuentes de cabecera de medicina espacial para ampliar |

## Escalamiento

Cuatro niveles: Verde = seguir la rutina · Amarillo = aviso suave (vigilar, repetir la medición, autocuidado; **sin consulta**) · Naranja = consultar al médico de a bordo · Rojo = escalar al flight surgeon con un reporte listo para enviar. Un desvío de la línea base por sí solo nunca llega a rojo. Un valor se evalúa con dos capas: **umbral clínico fijo** y **desvío respecto de la línea base personal**. Gana el nivel más alto.
