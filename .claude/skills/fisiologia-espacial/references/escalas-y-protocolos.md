# Escalas, tests y protocolos

Fuente: documento del equipo "Escalas, tests y protocolos" (2/11/2026). Convención: *Propuesta* = decisión de diseño sin fuente que fije el número. Semáforo de 4 niveles: verde (rutina), amarillo (vigilar, sin consulta), naranja (médico de a bordo), rojo (flight surgeon). Desvío: z respecto de la línea base; amarillo |z| ≥ 1,5 en 3 mediciones seguidas con valor en rango clínico; naranja |z| ≥ 2 sostenido; un desvío solo nunca llega a rojo.

## 1. Tests en la app

### 1.1 PVT-B (vigilancia psicomotora breve)
- **Mide:** atención sostenida y velocidad de reacción (empeoran con falta de sueño). Riesgo conductual/cognitivo. En la ISS, cada 4 días en el Reaction SelfTest.
- **Cómo:** 3 min mirando un punto; aparece un contador y se toca lo más rápido posible; intervalo aleatorio de 1 a 4 s; se muestra el TR un instante.
- **Puntaje:** lapsos = TR ≥ 355 ms (en el PVT de 10 min el corte es 500 ms); falsas alarmas = toque sin estímulo o TR < 130 ms; velocidad = promedio de 1/TR (la métrica más sensible a la falta de sueño).
- **Semáforo:** contra línea base personal; amarillo |z| ≥ 1,5 en una sesión; naranja |z| ≥ 1,5 en 3 sesiones seguidas; rojo |z| ≥ 2 sostenido junto con síntomas o sueño en rojo. *Propuesta.*
- **App:** 2–3 sesiones de práctica antes de fijar la línea base; mismo dispositivo y método de respuesta siempre; versión de 1 min para la demo.

### 1.2 Rejilla de Amsler
- **Mide:** distorsiones o zonas faltantes en la visión central (SANS). Una de las tres pruebas visuales de la ISS, junto con agudeza y encuesta; allí se hace en laptop.
- **Cómo:** anteojos de lectura si usa; 30–38 cm; tapar un ojo; mirar el punto central; ver si hay líneas onduladas, borrosas, oscuras o faltantes; repetir con el otro ojo.
- **Puntaje:** por ojo, sí/no y celdas marcadas.
- **Semáforo:** verde sin cambios; amarillo alteración leve que no se repite al medir de nuevo; naranja alteración nueva confirmada; rojo pérdida o distorsión súbita o zona que crece. *Propuesta.* Las organizaciones de oftalmología indican consultar ante cualquier cambio.
- **App:** 20 × 20 celdas, blanco y negro; instrucción de tapar un ojo antes de cada lado; semanal.

### 1.3 Agudeza visual (logMAR)
- **Cómo:** filas de 5 letras que se achican (tipo ETDRS), un ojo por vez, hasta no reconocer al menos 3 letras de una fila.
- **Puntaje:** logMAR; 0 = normal; cada fila 0,1 y cada letra 0,02. logMAR = mejor fila leída + 0,02 × letras falladas.
- **Semáforo:** amarillo empeora 0,1 una vez; naranja 0,1 o más confirmado al repetir; rojo ≥ 0,2 o caída súbita. *Propuesta.*
- **App:** sin calibración el valor absoluto no es confiable; para el MVP alcanza el cambio contra la línea base. Extra.

## 2. Autorreporte

### 2.1 Escalas visuales analógicas (VAS)
- **Mide:** ánimo, fatiga, estrés, carga de trabajo.
- **Cómo:** slider por estado entre dos extremos; sin números visibles.
- **Puntaje:** 0–100; el ánimo se invierte para que 100 sea siempre el peor estado.
- **Semáforo:** contra línea base; amarillo |z| ≥ 1,5 en 3 registros; naranja |z| ≥ 2 sostenido; rojo ánimo en el peor 10 % varios días. *Propuesta.*
- **App:** < 30 s; diaria, a la misma hora; uso libre.

### 2.2 Diario de sueño (Consensus Sleep Diary)
- **Cómo:** al despertar: hora de acostarse, hora de intentar dormir, latencia, despertares y tiempo despierto, hora de despertar y de levantarse, calidad percibida.
- **Puntaje:** tiempo en cama; tiempo total de sueño; eficiencia = sueño / tiempo en cama × 100.
- **Semáforo:** verde ≥ 7 h; amarillo 6–7 h; naranja < 6 h una noche; rojo < 6 h en 2 o más noches seguidas.
- **App:** selectores de hora y validaciones simples; si hay wearable, usar su dato y dejar el diario para la calidad.

### 2.3 Registro de síntomas
- **MVP (4 casillas, decidido el 14/11):** mareo o desorientación · aturdimiento al pararse · dolor de cabeza · herpes labial o erupciones. Fuentes: la mayoría de los astronautas tiene mareo espacial (NASA HRP, riesgo sensoriomotor); hasta 80 % tiene aturdimiento al volver de misiones largas (CSA, BP Reg); la hipoxia leve da dolor de cabeza (NASA HRP, riesgo de hipoxia); el sistema inmune alterado da herpes labial y erupciones (NASA HRP, riesgo inmune).
- **Uso en el motor:** completan reglas que ya existen (presión < 90/60 con síntomas → naranja; CO₂ con dolor de cabeza → naranja; temperatura 37,5–37,9 con síntomas → naranja). No hay reglas nuevas.
- **Lista ampliada (futuro):** visión borrosa, náuseas, congestión, fiebre; intensidad leve/moderada/intensa y desde cuándo.
- **Semáforo:** amarillo síntoma leve; naranja síntoma moderado o leve > 2 días; rojo síntoma intenso o que coincide con un indicador en rojo (ej.: dolor de cabeza con CO₂ alto; visión borrosa con cambio en Amsler). *Propuesta.*

## 3. Mediciones con dispositivo

Adaptación al espacio: medir siempre en la misma postura, sujeto y en reposo. *Propuesta.*

| Medición | Protocolo | Semáforo |
| --- | --- | --- |
| Presión arterial | 30 min sin ejercicio ni cafeína; 5 min de reposo en silencio; brazo a la altura del corazón, manguito sobre la piel; sin hablar; 2 lecturas con 1 min de diferencia; se usa el promedio | Ver `umbrales.md` (4 niveles); si rojo, repetir a los 5 min |
| FC en reposo | Mismo momento del día (al despertar), del mismo dispositivo que presión o SpO₂ | Verde 50–100 · amarillo 50–100 con desvío · naranja 40–49 o 101–120 · rojo < 40 o > 120 |
| SpO₂ | Mano tibia, relajada, bajo el nivel del corazón; sin esmalte; quieto hasta que el valor se estabilice | Verde ≥ 95 · amarillo 94 o desvío · naranja 91–93 · rojo ≤ 90. FDA: mirar la tendencia; un valor bajo aislado pide nueva medición antes de escalar |
| Temperatura | Termómetro oral, siempre el mismo método | Verde 36–37,4 · amarillo 37,5–37,9 sin síntomas · naranja con síntomas · rojo ≥ 38 o < 35 |
| Glucosa | Manos limpias y secas; pinchar el costado de la yema | Verde 70–180 · amarillo 70–180 con desvío · naranja 54–69 o 181–250 · rojo < 54 o > 250; registrar ayunas o posprandial |
| Masa corporal | En la ISS, SLAMMD (fuerza conocida con resortes, masa por aceleración) | Pérdida < 2 % · 2–3,5 % · 3,5–5 % · > 5 % (*Propuesta*); suele caer los primeros 30 días y luego estabilizarse |

## 4. Escalas de referencia (no se implementan)

- **POMS (37 ítems):** seis estados de ánimo, 0–4 por ítem, correlación > 0,95 con la versión de 65. Medidas estándar de NASA y análogos. Comercial y extenso.
- **BDI-II:** 21 ítems 0–3, total 0–63 (0–13 mínima, 14–19 leve, 20–28 moderada, 29–63 severa). Semanal en análogos. Clínico y comercial: lo interpreta un profesional.
- **Cognition (batería):** 10 tests, ~16 min en la ISS; incluye PVT de 3 min; Spaceflight Standard Measures (prevuelo, ~día 30 de vuelo, 30 días antes del regreso). Demasiado extensa para el MVP.

## 5. Resumen

| Escala, test o protocolo | Tipo | Frecuencia | Tiempo | MVP |
| --- | --- | --- | --- | --- |
| PVT-B | Test en la app | Cada 3–4 días | 3 min | Sí |
| Rejilla de Amsler | Test en la app | Semanal | 1 min | Sí |
| Agudeza visual (logMAR) | Test en la app | Semanal | 2 min | Extra |
| VAS | Autorreporte | Diaria | < 30 s | Sí |
| Diario de sueño | Autorreporte | Diaria | 1 min | Sí |
| Registro de síntomas | Autorreporte | Cuando haga falta | < 30 s | Extra |
| Presión arterial | Dispositivo | Diaria | 7 min con reposo | Sí |
| FC en reposo | Dispositivo | Diaria | Con otra medición | Sí |
| SpO₂ | Dispositivo | Diaria | 1 min | Sí |
| Temperatura | Dispositivo | Diaria o con síntomas | 1 min | Extra |
| Glucosa | Dispositivo | Según protocolo | 2 min | Sí |
| Masa corporal | Dispositivo | Semanal | 2 min | Extra |
| POMS, BDI-II, Cognition | Referencia | — | — | No |
