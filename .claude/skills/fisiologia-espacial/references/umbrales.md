# Indicadores y umbrales

Fuente: documento del equipo "Indicadores y umbrales – Monitoreo de salud de astronautas" (rev. 1/11/2026). Los umbrales son referencias para un prototipo de hackathon, no criterios clínicos. Combinan guías clínicas terrestres con datos publicados de vuelo espacial. Todos aplican a la etapa en vuelo.

## Criterios de selección de indicadores

Un indicador entra si cumple al menos 4 de 5:

1. Vinculado a un riesgo documentado (radiación, aislamiento, distancia, gravedad alterada, ambiente cerrado).
2. Medible a bordo con equipo existente o con la app.
3. Lo puede hacer el astronauta solo.
4. Tiene un umbral claro para el semáforo.
5. Lleva a una acción concreta.

## Matriz de indicadores (11 candidatos)

| Riesgo (peligro) | Indicador | Tipo de dato | Frecuencia | Por qué importa en el espacio |
| --- | --- | --- | --- | --- |
| Cardiovascular (gravedad) | Presión arterial | Dispositivo | Diaria | En vuelos largos la presión ambulatoria de 24 h baja 8–10 mmHg (Norsk 2015) |
| Cardiovascular (gravedad) | FC y SpO₂ | Dispositivo o wearable | Continua o diaria | La FC y su variabilidad bajan en vuelo (NASA); el Bio-Monitor (Astroskin) las mide en la ISS (CSA) |
| SANS: visión (gravedad) | Agudeza visual, rejilla de Amsler, síntomas | Test en la app + autorreporte | Semanal | Son las tres pruebas visuales programadas en la ISS (Waisberg 2023) |
| Hueso y músculo (gravedad) | Minutos de ejercicio con carga | Autorreporte | Diaria | La densidad ósea cae 1–1,5 % por mes (Stavnichuk 2020); la tripulación de la ISS entrena ~1,5 h/día, 6–7 días por semana (NASA HRP, riesgo de capacidad física) |
| Nutrición (ambiente cerrado) | Masa corporal e ingesta | Dispositivo + autorreporte | Semanal | La pérdida de masa es constante y suele superar el 5 % (Laurens 2019); la ISS usa cuestionario semanal de alimentos (NASA) |
| Metabolismo | Glucosa | Dispositivo | Según protocolo | En la ISS los astronautas desarrollaron resistencia a la insulina y no procesaron la glucosa con normalidad (CSA, estudio Vascular). También la pide el desafío. Umbrales clínicos (ADA) |
| Sistema inmune (radiación, ambiente cerrado) | Temperatura y síntomas | Dispositivo + autorreporte | Diaria o ante síntomas | Detección temprana de infecciones en hábitat cerrado |
| Sueño (aislamiento) | Horas y calidad de sueño | Autorreporte o wearable | Diaria | Duermen ~6 h contra 8,5 h programadas (Barger 2014) |
| Conductual y cognitivo (aislamiento) | PVT y escala de ánimo | Test en la app + autorreporte | Cada 3–4 días | En la ISS se tomaron PVT y escalas visuales cada 4 días (Sleep 2022) |
| Ambiente cerrado | CO₂ de cabina y dolor de cabeza | Sensor del hábitat + autorreporte | Continua | Síntomas reportados desde 2,3 mmHg (Law y Alexander, NASA) |
| Radiación | Dosis acumulada | Dosímetro | Diaria, acumulada | Límite de carrera 600 mSv (NASA) |

## Umbrales de alerta (4 niveles)

Verde = seguir la rutina · Amarillo = aviso suave: vigilar, repetir la medición y autocuidado, **sin consulta** · Naranja = consultar al médico de a bordo · Rojo = escalar al flight surgeon. El amarillo cubre sobre todo desvíos de la línea base personal con el valor todavía dentro del rango clínico. *Propuesta* = decisión de diseño del equipo, sin fuente que fije ese número.

| Indicador | Verde | Amarillo (vigilar) | Naranja (médico de a bordo) | Rojo (flight surgeon) | Base |
| --- | --- | --- | --- | --- | --- |
| Presión arterial (mmHg) | < 130 / < 80 | < 130 / < 80 con desvío sostenido de la línea base | 130–180 / 80–120, o < 90/60 con síntomas | > 180 y/o > 120: repetir a los 5 min | AHA; hipotensión < 90/60 (NHLBI; NHS) |
| Glucosa (mg/dL) | 70–180 | 70–180 con desvío sostenido | 54–69 o 181–250 | < 54 o > 250 | ADA |
| SpO₂ (%) | ≥ 95 | 94, o ≥ 95 con desvío sostenido | 91–93 | ≤ 90 | OMS: normal 97–99 %, límite inferior 94 %; < 90 % es emergencia (Myatt 2017, Nursing Standard). *Propuesta:* rojo incluye el 90 % exacto, más conservador que la fuente |
| Temperatura (°C) | 36–37,4 | 37,5–37,9 sin síntomas | 37,5–37,9 con síntomas | ≥ 38 o < 35 | CDC: fiebre ≥ 38 °C; hipotermia < 35 °C. *Propuesta:* corte amarillo/naranja |
| FC en reposo (lpm) | 50–100 | 50–100 con desvío sostenido | 40–49 o 101–120 | < 40 o > 120 | AHA: normal 60–100; muy entrenados ~40; verde desde 50 por perfil atlético |
| CO₂ de cabina (mmHg) | < 2,5 (promedio 7 días) | 2,5–3 sin síntomas | 2,5–3 con dolor de cabeza | > 3 (promedio 1 h) | NASA-STD-3001 / OCHMO-TB-004. *Propuesta:* corte amarillo/naranja por síntomas |
| Sueño (h por noche) | ≥ 7 | 6–7 | < 6 una noche | < 6 en 2 o más noches seguidas | Sleep 2022. *Propuesta:* corte amarillo/naranja |
| Test de reacción (PVT) | Igual a la línea base | Más lapsos en una sesión | Más lapsos en 3 sesiones seguidas | Aumento marcado y sostenido | Lapso > 500 ms (PVT 10 min, NASA); > 355 ms en versión de 3 min (Basner 2011) |
| Radiación acumulada | < 50 % del límite | 50–65 % | 65–80 % | > 80 %, o una tormenta solar | *Propuesta*, sobre 600 mSv carrera y 250 mSv por evento solar (NASA-STD-3001) |
| Masa corporal (variación) | Pérdida < 2 % | 2–3,5 % | 3,5–5 % | > 5 % | *Propuesta*; la pérdida suele superar el 5 % (Laurens 2019) |
| Ejercicio (min/día) | ≥ 90 | 60–89 | 30–59 | < 30 varios días | *Propuesta*, sobre ~1,5 h/día, 6–7 días por semana (NASA HRP). Cambiado el 14/11 (antes ≥ 120 sobre ~2 h/día) |
| Visión (Amsler y agudeza) | Sin cambios | Cambio leve que no se repite al medir de nuevo | Cambio confirmado respecto de la línea base | Pérdida súbita o distorsión | *Propuesta* |

Además de los rangos fijos, cada valor se compara con la línea base del propio astronauta (ver `linea-base-y-ml.md`). En vuelo la presión baja y la FC se reduce: un desvío sostenido respecto de su propio promedio puede ser más informativo que un rango terrestre.

## Qué dice el NASA-STD-3001 (Vol. 1, Rev. C)

No fija rangos numéricos para signos vitales. Exige evaluar, registrar, monitorear y analizar la tendencia de los signos vitales en vuelo (V1 3004) y remite a los estándares clínicos vigentes en EE. UU. (V1 3000). Por eso OMS, AHA, CDC y ADA son la fuente correcta para los valores. Sí fija límites como porcentaje del valor previo a la misión:

| Parámetro | Límite en vuelo | Requisito |
| --- | --- | --- |
| Capacidad aeróbica (VO₂máx) | ≥ 80 % del valor previo; ≥ 32,9 ml/min/kg si hace caminatas espaciales | V1 4003 y V1 4001 |
| Fuerza muscular | ≥ 80 % de la línea base | V1 4024 |
| Densidad ósea | ≥ 95 % del valor previo en cadera y columna; ≥ 90 % en cuello femoral | V1 4027 |
| Nutrición | 100 % de la energía y nutrientes calculados | V1 4020 |
| Radiación | < 600 mSv en la carrera; < 250 mSv por evento solar | V1 4030 y V1 4031 |
| Sueño y jornada | Deben tener límites establecidos, sin número fijo | V1 4014 |

## MVP: 7 indicadores

1. Presión arterial: carga manual.
2. FC y SpO₂: wearable simulado.
3. Glucosa: carga manual.
   - Síntomas (autorreporte, desde el 14/11): mareo o desorientación, aturdimiento al pararse, dolor de cabeza, herpes labial o erupciones. No crean reglas nuevas: alimentan "presión < 90/60 con síntomas", "CO₂ con dolor de cabeza" y "temperatura con síntomas".
4. Sueño: autorreporte.
5. Ánimo y test de reacción: test en la app.
6. Visión con rejilla de Amsler: test en la app.
7. Radiación y CO₂: datos del hábitat simulados.

## Escalas de ánimo usadas por NASA

| Escala | Qué mide | Dónde y con qué frecuencia |
| --- | --- | --- |
| Escalas visuales analógicas (VAS) | Ánimo, fatiga, estrés, carga de trabajo | ISS, Reaction SelfTest, cada 4 días (Sleep 2022) |
| POMS, 37 ítems | Seis estados de ánimo y alteración total | Medidas estándar de NASA (Williams y Cromwell 2017) |
| BDI-II | Síntomas depresivos | Semanal en análogos (Bell 2026) |
| Cuestionario de sueño y equipo | Sueño y funcionamiento del equipo | Mensual en la ISS (Zwart 2018) |

Para el MVP: VAS (sliders 0–100, segundos, sin licencia). POMS y BDI-II son comerciales: solo se citan.
