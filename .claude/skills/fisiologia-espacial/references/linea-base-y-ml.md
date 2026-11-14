# Línea base personal, escalamiento y capa de ML

## Qué está documentado

No hay una fórmula oficial publicada para calcular alertas desde la línea base. Lo documentado es cómo la construye NASA en investigación:

- **Se mide antes del vuelo, en varias sesiones.** Spaceflight Standard Measures registra actigrafía con diario de sueño en dos ventanas de 2 semanas (270 y 180 días antes del lanzamiento) y el test cognitivo 90 días antes (Zwart 2018).
- **En vuelo se compara contra ese valor previo.** Un estudio con 25 astronautas expresó cada resultado como puntaje z respecto del promedio prevuelo y marcó como cambio importante ≤ −1,5 desviaciones estándar (Frontiers in Physiology 2024).
- **El NASA-STD-3001 expresa límites como porcentaje del valor previo** (por ejemplo, fuerza ≥ 80 %).

## Regla del motor (propuesta del equipo)

1. **Línea base:** media y desviación estándar de las mediciones prevuelo. Si no hay, días 4 a 10 de vuelo, para excluir la adaptación inicial (días 1–3).
2. **Desvío:** z = (valor de hoy − media) / desviación estándar.
3. **Alerta por desvío:** amarillo si |z| ≥ 1,5 en 3 mediciones seguidas con el valor dentro del rango clínico; naranja si |z| ≥ 2 sostenido. Un desvío por sí solo nunca llega a rojo: no escala a la Tierra.
4. **Alerta clínica:** el umbral fijo de `umbrales.md` (4 niveles).
5. **Nivel final:** el más alto entre la alerta clínica y la de desvío.

## Capa de ML (opcional, detrás de dos cortes)

Fuente: documento del equipo "Capa de machine learning en ORBITAL".

- **Qué es:** detección de anomalías multivariada no supervisada, encima de las reglas. Busca combinaciones raras de varias variables que por separado siguen en verde. No reemplaza las reglas.
- **Modelo según datos:**
  - Cientos de mediciones por persona (tipo wearable): Isolation Forest (scikit-learn) entrenado con la línea base de esa persona.
  - Pocas mediciones (una o dos por día): distancia multivariada de Mahalanobis sobre los puntajes z. Es el caso esperable: hoy los astronautas se miden de forma intermitente.
- **No usar:** modelos supervisados de riesgo o diagnóstico entrenados con datos simulados por el equipo (resultado circular, débil ante el criterio de validez). Etiquetas reales, si existieran, sirven para evaluar, no para diagnosticar.
- **Arranque en frío (etapas):**

| Etapa | Datos de la persona | Qué detecta |
| --- | --- | --- |
| 0 · Sin datos | Ninguno | Solo umbrales clínicos. ML apagado |
| 1 · Pocos datos | Algunos días | Línea base provisional que parte de valores de población y se ajusta con cada medición; Mahalanobis con cautela |
| 2 · Datos suficientes | Semanas | Línea base personal completa; Isolation Forest solo si hay cientos de mediciones |

- **En pantalla:** antes de la etapa 2, aviso "ML calibrando · día X de N". La alerta ML se llama "patrón combinado inusual", muestra qué variables pesaron (z por variable) y **nunca supera amarillo** (aviso suave, sin consulta). Si el patrón se sostiene y un valor sale del rango clínico, las reglas lo suben a naranja o rojo.
- **Evaluación:** contra anomalías inyectadas con fecha conocida en el simulador. Métricas: episodios detectados, falsas alarmas por semana, días hasta detectar. Comparar reglas solas contra reglas + ML. El ML se queda solo si detecta más sin multiplicar falsas alarmas.
- **Respaldo de NASA y CSA:** la arquitectura de datos médicos de NASA (Medical Data Architecture, HRP Investigators' Workshop 2020) apunta a apoyo a decisiones clínicas más autónomo, con o sin soporte de Tierra, e incluye predicción de eventos médicos con aprendizaje automático. La CSA (estudio Space Health) usa una plataforma de IA que busca patrones y riesgos en datos del Bio-Monitor, pero el análisis se hace en Tierra. https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20200000567.pdf · https://www.asc-csa.gc.ca/eng/sciences/space-flight-improve-monitor-health-earth.asp
- **Cortes:** sáb 19:00 (núcleo y API con tests) y dom 11:30 (métricas). Si se corta, rama aparte y trabajo futuro.

## Cómo se mide hoy a los astronautas (contexto realista)

No hay monitoreo continuo de rutina: los signos vitales se registran sobre todo en ejercicio y caminatas espaciales. Hay una consulta médica privada semanal con el flight surgeon y exámenes periódicos (ECG, ecografía, OCT, análisis de sangre). El Bio-Monitor/Astroskin de la Agencia Espacial Canadiense existe (ECG, presión, SpO₂, respiración, temperatura de piel, actividad) pero se usa sobre todo en investigación.
