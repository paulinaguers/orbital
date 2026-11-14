# ORBITAL – Alert texts / Textos de alerta

> **AI use / Uso de SI:** drafted with Claude Code (Opus 5.5) from the team's `fisiologia-espacial` skill; reviewed and approved by The Foxhole Court. / Redactado con Claude Code (Opus 5.5) a partir de la skill `fisiologia-espacial` del equipo; revisado y aprobado por The Foxhole Court.

**Purpose.** What the astronaut sees on screen for each MVP measurement and each alert level, and the threshold that triggers it.
**Para qué sirve.** Qué ve el astronauta en pantalla para cada medición del MVP y cada nivel de alerta, y qué umbral lo dispara.

**Disclaimer.** ORBITAL guides; it does not diagnose. It is not a medical device. Clinical decisions belong to the crew medical officer and the flight surgeon. All data in the demo is simulated.
**Aviso.** ORBITAL orienta, no diagnostica. No es un dispositivo médico. Las decisiones clínicas son del médico de a bordo y del flight surgeon. Todos los datos de la demo son simulados.

**Proposal** = a design decision by the team; no source fixes that exact number. / **Proposal** = decisión de diseño del equipo; ninguna fuente fija ese número exacto.

---

## How to read this file / Cómo leer este archivo

### Fixed action per level / Acción fija por nivel

The action is the same for every measurement. The "Recommendation" column always contains it and only adds a short, measurement-specific detail. When the source requires a confirmation step first (blood pressure in red: AHA; low SpO₂: FDA), the cell starts with that step and then gives the fixed action.
La acción es la misma en todas las mediciones. La columna "Recomendación" siempre la incluye y solo suma un detalle corto propio de cada medición. Cuando la fuente pide antes un paso de confirmación (presión en rojo: AHA; SpO₂ baja: FDA), la celda empieza con ese paso y después da la acción fija.

| Level / Nivel | Action (EN) | Acción (ES) |
| --- | --- | --- |
| 🟢 green | Keep your routine. | Seguí con tu rutina. |
| 🟡 yellow | Soft warning: monitor. No consultation needed. | Aviso suave: vigilá. No hace falta consultar. |
| 🟠 orange | Contact the crew medical officer. | Consultá al médico de a bordo. |
| 🔴 red | Escalate to the flight surgeon. Your report is ready to send. | Escalá al flight surgeon. Tu reporte está listo para enviar. |

### Two layers / Dos capas

Each value is checked against (1) a fixed clinical threshold and (2) the astronaut's personal baseline. The higher level wins.
Cada valor se evalúa contra (1) un umbral clínico fijo y (2) la línea base personal del astronauta. Gana el nivel más alto.

- **Sustained deviation (yellow)** / **Desvío sostenido (amarillo):** |z| ≥ 1.5 in 3 measurements in a row, with the value inside the clinical range. *Proposal.* / \|z\| ≥ 1,5 en 3 mediciones seguidas, con el valor dentro del rango clínico. *Proposal.*
- **Marked sustained deviation (orange)** / **Desvío marcado y sostenido (naranja):** |z| ≥ 2 sustained. *Proposal.* / \|z\| ≥ 2 sostenido. *Proposal.*
- **A baseline deviation alone never reaches red.** Red is only reached by crossing a clinical threshold. / **Un desvío de la línea base por sí solo nunca llega a rojo.** Solo se llega a rojo al cruzar un umbral clínico.

Source / Fuente: `fisiologia-espacial` → `linea-base-y-ml.md`, `escalas-y-protocolos.md`.

> ⚠ **Team decision needed / Decisión pendiente del equipo:** the rules use \|z\|, so they count deviations in **both** directions. Some texts name only the worse side ("lower mood", "slower reaction", "lower SpO₂"). Options: (a) the core counts only the worse side (signed z), so the texts stay as they are; or (b) neutral texts ("different from your usual"). The core (thread A) must follow the same choice.
> Las reglas usan \|z\|: cuentan desvíos en **las dos** direcciones. Algunos textos nombran solo el lado peor ("ánimo más bajo", "reacción más lenta", "SpO₂ más baja"). Opciones: (a) que el núcleo cuente solo el lado peor (z con signo) y los textos quedan así; o (b) textos neutros ("distinto de lo habitual"). El núcleo (hilo A) tiene que seguir la misma decisión.

### Index / Índice

| MVP group | Measurement / Medición | Official NASA risk or hazard (HRP) / Riesgo o peligro oficial NASA |
| --- | --- | --- |
| 1 | [Blood pressure](#1-blood-pressure--presión-arterial) | Cardiovascular Adaptations |
| 2 | [Resting heart rate](#2a-resting-heart-rate--frecuencia-cardíaca-en-reposo) | Cardiovascular Adaptations |
| 2 | [SpO₂](#2b-spo₂--saturación-de-oxígeno) | Hypoxia |
| 3 | [Glucose](#3-glucose--glucosa) | Not an HRP risk on its own (see section) |
| 4 | [Sleep](#4-sleep--sueño) | Inadequate Sleep and Irregular Schedules |
| 5 | [Mood (VAS)](#5a-mood-vas--ánimo-vas) | Behavioral Conditions and Psychiatric Disorders |
| 5 | [Reaction test (PVT)](#5b-reaction-test-pvt--test-de-reacción-pvt) | Inadequate Sleep · Behavioral Conditions |
| 6 | [Vision (Amsler grid)](#6-vision-amsler-grid--visión-rejilla-de-amsler) | SANS |
| 7 | [Cabin CO₂](#7a-cabin-co₂--co₂-de-cabina) | Hostile closed environments (NASA-STD-3001) |
| 7 | [Cumulative radiation](#7b-cumulative-radiation--radiación-acumulada) | Space Radiation |
| — | [Symptoms](#symptoms--síntomas) | Cardiovascular · Hostile closed environments (CO₂) · Immune |

---

## 1. Blood pressure / Presión arterial

**NASA risk / Riesgo NASA:** Risk of Cardiovascular Adaptations Contributing to Adverse Mission Performance and Health Outcomes. / Riesgo de adaptaciones cardiovasculares que afectan el rendimiento y la salud en la misión. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
In long flights, 24 h blood pressure drops 8–10 mmHg (Norsk 2015), so the personal baseline matters. / En vuelos largos la presión de 24 h baja 8–10 mmHg (Norsk 2015): por eso importa la línea base personal.

**Threshold source / Fuente de umbrales:** AHA, Understanding blood pressure readings (https://heart.org/bplevels); hypotension < 90/60: NHLBI (https://www.nhlbi.nih.gov/health/low-blood-pressure), NHS inform. When systolic and diastolic fall in different categories, the higher one applies (ACC/AHA guideline): green needs both values in range; one value in the orange range is enough for orange. / AHA, Understanding blood pressure readings; hipotensión por debajo de 90/60: NHLBI, NHS inform. Si la sistólica y la diastólica caen en categorías distintas, vale la más alta (guía ACC/AHA): el verde pide los dos valores en rango; alcanza con un valor en el rango naranja para que sea naranja.

| Level | Trigger · Source / Disparador · Fuente | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | < 130 / < 80 mmHg · AHA | Blood pressure within your expected range.<br>*Presión dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | < 130 / < 80 with sustained deviation from baseline · AHA + baseline (*Proposal*)<br>*< 130 / < 80 con desvío sostenido de la línea base* | Your blood pressure is in range but has been moving away from your usual values.<br>*Tu presión está en rango, pero se viene alejando de tus valores habituales.* | Soft warning: monitor. No consultation needed. Repeat tomorrow with the full protocol (5 min rest, arm at heart level).<br>*Aviso suave: vigilá. No hace falta consultar. Repetí mañana con el protocolo completo (5 min de reposo, brazo a la altura del corazón).* |
| 🟠 | 130–180 / 80–120, or < 90/60 with symptoms, or \|z\| ≥ 2 sustained · AHA; NHLBI; baseline (*Proposal*)<br>*130–180 / 80–120, o < 90/60 con síntomas, o \|z\| ≥ 2 sostenido* | Your blood pressure is outside the expected range.<br>*Tu presión está fuera del rango esperado.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | > 180 and/or > 120 mmHg (repeat after 5 min) · AHA<br>*> 180 y/o > 120 mmHg (repetir a los 5 min)* | Critical blood pressure reading.<br>*Lectura de presión crítica.* | Repeat the reading in 5 minutes. If it is still above the limit, escalate to the flight surgeon. Your report is ready to send.<br>*Repetí la medición en 5 minutos. Si sigue por encima del límite, escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Gap / Hueco:** the skill does not define a level for < 90/60 **without** symptoms. Not filled here. / La skill no define nivel para < 90/60 **sin** síntomas. No se completa acá.

---

## 2a. Resting heart rate / Frecuencia cardíaca en reposo

**NASA risk / Riesgo NASA:** Risk of Cardiovascular Adaptations (same as above). Heart rate and its variability drop in flight. / Riesgo de adaptaciones cardiovasculares (el mismo de arriba). La FC y su variabilidad bajan en vuelo. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/

**Threshold source / Fuente de umbrales:** AHA (normal 60–100; well-trained ~40). Green starts at 50 for an athletic profile. / AHA (normal 60–100; muy entrenados ~40). El verde empieza en 50 por perfil atlético. https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | 50–100 bpm · AHA | Resting heart rate within your expected range.<br>*FC en reposo dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 50–100 with sustained deviation · AHA + baseline (*Proposal*)<br>*50–100 con desvío sostenido* | Your resting heart rate is in range but differs from your usual values.<br>*Tu FC en reposo está en rango, pero es distinta de tus valores habituales.* | Soft warning: monitor. No consultation needed. Measure again tomorrow on waking.<br>*Aviso suave: vigilá. No hace falta consultar. Volvé a medir mañana al despertar.* |
| 🟠 | 40–49 or 101–120, or \|z\| ≥ 2 sustained · AHA; baseline (*Proposal*)<br>*40–49 o 101–120, o \|z\| ≥ 2 sostenido* | Your resting heart rate is outside the expected range.<br>*Tu FC en reposo está fuera del rango esperado.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | < 40 or > 120 bpm · AHA<br>*< 40 o > 120 lpm* | Critical resting heart rate.<br>*FC en reposo crítica.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 2b. SpO₂ / Saturación de oxígeno

**NASA risk / Riesgo NASA:** Risk of Hypoxia. Partial cabin depressurization for spacewalks can cause mild hypoxia: confusion, headache, vision changes, sleep problems. NASA gives no SpO₂ values. / Riesgo de hipoxia: la despresurización parcial de la cabina para caminatas espaciales puede causar hipoxia leve: confusión, dolor de cabeza, alteraciones de la visión y problemas de sueño. NASA no da valores de SpO₂. https://www.nasa.gov/hrp/risks/

**Threshold source / Fuente de umbrales:** WHO (normal 97–99 %, lower limit 94 %); < 90 % is an emergency (Myatt 2017, *Nursing Standard*). Red includes exactly 90 %: *Proposal*, more conservative than the source. FDA: look at the trend; a single low value needs a new reading before escalating.
OMS (normal 97–99 %, límite inferior 94 %); < 90 % es emergencia (Myatt 2017, *Nursing Standard*). Rojo incluye el 90 % exacto: *Proposal*, más conservador que la fuente. FDA: mirar la tendencia; un valor bajo aislado pide nueva medición antes de escalar.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | ≥ 95 % · WHO | Oxygen saturation within your expected range.<br>*Saturación dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 94 %, or ≥ 95 % with sustained deviation · WHO + baseline (*Proposal*)<br>*94 %, o ≥ 95 % con desvío sostenido* | Your oxygen saturation is slightly lower than usual.<br>*Tu saturación está un poco más baja que lo habitual.* | Soft warning: monitor. No consultation needed. Repeat with a warm, relaxed hand, below heart level, until the value is stable.<br>*Aviso suave: vigilá. No hace falta consultar. Repetí con la mano tibia y relajada, debajo del corazón, hasta que el valor se estabilice.* |
| 🟠 | 91–93 %, or \|z\| ≥ 2 sustained · WHO; baseline (*Proposal*)<br>*91–93 %, o \|z\| ≥ 2 sostenido* | Your oxygen saturation is below the expected range.<br>*Tu saturación está debajo del rango esperado.* | Repeat the reading first: a single low value needs confirmation (FDA). If it stays low, contact the crew medical officer.<br>*Repetí la medición primero: un valor bajo aislado necesita confirmarse (FDA). Si sigue bajo, consultá al médico de a bordo.* |
| 🔴 | ≤ 90 % · Myatt 2017 (90 % exact: *Proposal*)<br>*≤ 90 % (90 % exacto: Proposal)* | Critical oxygen saturation.<br>*Saturación crítica.* | Repeat the reading at once. If it is still ≤ 90 %, escalate to the flight surgeon. Your report is ready to send.<br>*Repetí la medición ya. Si sigue en 90 % o menos, escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 3. Glucose / Glucosa

**NASA risk / Riesgo NASA:** not an independent HRP risk. The CSA documents insulin resistance in space, with a risk of type 2 diabetes (CSA, Vascular study), and the challenge statement asks for it. / No es un riesgo HRP independiente. La CSA documenta resistencia a la insulina en el espacio, con riesgo de diabetes tipo 2 (CSA, estudio Vascular), y lo pide el enunciado. https://www.asc-csa.gc.ca/eng/sciences/vascular.asp · https://www.asc-csa.gc.ca/eng/multimedia/search/image/8056

**Threshold source / Fuente de umbrales:** ADA definitions of hypo- and hyperglycemia (*Diabetes Therapy* 2019). / Definiciones de hipo e hiperglucemia de la ADA (*Diabetes Therapy* 2019). https://pmc.ncbi.nlm.nih.gov/articles/PMC6531520/table/Tab1

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | 70–180 mg/dL · ADA | Glucose within your expected range.<br>*Glucosa dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 70–180 with sustained deviation · ADA + baseline (*Proposal*)<br>*70–180 con desvío sostenido* | Your glucose is in range but has been moving away from your usual values.<br>*Tu glucosa está en rango, pero se viene alejando de tus valores habituales.* | Soft warning: monitor. No consultation needed. Log whether you were fasting or had just eaten.<br>*Aviso suave: vigilá. No hace falta consultar. Anotá si estabas en ayunas o recién comido.* |
| 🟠 | 54–69 or 181–250, or \|z\| ≥ 2 sustained · ADA; baseline (*Proposal*)<br>*54–69 o 181–250, o \|z\| ≥ 2 sostenido* | Your glucose is outside the expected range.<br>*Tu glucosa está fuera del rango esperado.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | < 54 or > 250 mg/dL · ADA<br>*< 54 o > 250 mg/dL* | Critical glucose reading.<br>*Lectura de glucosa crítica.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 4. Sleep / Sueño

**NASA risk / Riesgo NASA:** Risk of Inadequate Sleep and Irregular Schedules. About 16 sunrises per day in orbit disrupt the circadian rhythm; sessions of 6 h or less were linked to slower psychomotor speed, more stress and more tiredness. / Riesgo de sueño insuficiente y horarios irregulares. Unos 16 amaneceres por día en órbita alteran el ritmo circadiano; dormir 6 h o menos se asoció con menor velocidad psicomotora, más estrés y más cansancio. https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/

**Threshold source / Fuente de umbrales:** *Sleep* 2022 (ISS, Reaction SelfTest), https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197. Yellow/orange cut: *Proposal*. / *Sleep* 2022 (ISS, Reaction SelfTest). Corte amarillo/naranja: *Proposal*.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | ≥ 7 h per night · *Sleep* 2022<br>*≥ 7 h por noche* | You slept enough.<br>*Dormiste lo suficiente.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 6–7 h · *Sleep* 2022 (cut: *Proposal*)<br>*6–7 h (corte: Proposal)* | You slept a bit less than recommended.<br>*Dormiste un poco menos de lo recomendado.* | Soft warning: monitor. No consultation needed. Protect your next sleep period.<br>*Aviso suave: vigilá. No hace falta consultar. Cuidá tu próximo período de sueño.* |
| 🟠 | < 6 h one night · *Sleep* 2022 (cut: *Proposal*)<br>*< 6 h una noche (corte: Proposal)* | You slept less than 6 hours.<br>*Dormiste menos de 6 horas.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | < 6 h on 2 or more nights in a row · *Sleep* 2022<br>*< 6 h en 2 o más noches seguidas* | You have slept less than 6 hours for several nights in a row.<br>*Llevás varias noches seguidas durmiendo menos de 6 horas.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 5a. Mood (VAS) / Ánimo (VAS)

**NASA risk / Riesgo NASA:** Risk of Behavioral Conditions and Psychiatric Disorders. Isolation and confinement favor anxiety and depression. On the ISS, visual analog scales were taken every 4 days (*Sleep* 2022). / Riesgo de condiciones conductuales y trastornos psiquiátricos. El aislamiento y el confinamiento favorecen la ansiedad y la depresión. En la ISS se tomaron escalas visuales analógicas cada 4 días (*Sleep* 2022). https://www.nasa.gov/hrp/risks/

**Threshold source / Fuente de umbrales:** all cuts are *Proposal*, against the personal baseline (`escalas-y-protocolos.md` §2.1). Score 0–100, inverted so that 100 is always the worst state. / Todos los cortes son *Proposal*, contra la línea base personal (`escalas-y-protocolos.md` §2.1). Puntaje 0–100, invertido para que 100 sea siempre el peor estado.

The astronaut never sees z-scores; the screen uses words. / El astronauta nunca ve el puntaje z; la pantalla usa palabras.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | Close to baseline · *Proposal*<br>*Cerca de la línea base* | Your mood is similar to your usual.<br>*Tu ánimo es parecido al de siempre.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | \|z\| ≥ 1.5 in 3 entries · *Proposal*<br>*\|z\| ≥ 1,5 en 3 registros* | Your mood has been lower than usual in your last entries.<br>*Tu ánimo viene más bajo que lo habitual en tus últimos registros.* | Soft warning: monitor. No consultation needed. Self-care NASA suggests: keep a journal, tend plants, look out the window.<br>*Aviso suave: vigilá. No hace falta consultar. Autocuidado que sugiere NASA: llevar un diario, cuidar plantas, mirar por la ventana.* |
| 🟠 | \|z\| ≥ 2 sustained · *Proposal*<br>*\|z\| ≥ 2 sostenido* | Your mood has been clearly lower than usual for several days.<br>*Tu ánimo viene claramente más bajo que lo habitual hace varios días.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | Mood in the worst 10 % on several days · *Proposal*<br>*Ánimo en el peor 10 % varios días* | Your mood has been very low for several days.<br>*Tu ánimo viene muy bajo hace varios días.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** the skill's red trigger ("worst 10 % on several days") is measured against the person's own history, not against a clinical threshold. That conflicts with the rule "red only by crossing a clinical threshold". Options: (a) cap mood at orange, or (b) keep the skill's trigger and say so to the jury. Not changed here.
> El rojo de la skill ("peor 10 % varios días") se mide contra la propia historia, no contra un umbral clínico. Choca con la regla "rojo solo al cruzar un umbral clínico". Opciones: (a) que el ánimo llegue como máximo a naranja, o (b) mantener el disparador de la skill y decirlo al jurado. No se cambia acá.

---

## 5b. Reaction test (PVT) / Test de reacción (PVT)

**NASA risk / Riesgo NASA:** Risk of Inadequate Sleep and Irregular Schedules; Risk of Behavioral Conditions and Psychiatric Disorders. NASA uses a 10-minute self-test of vigilance; on the ISS it ran every 4 days (Reaction SelfTest). / Riesgo de sueño insuficiente y horarios irregulares; riesgo de condiciones conductuales y trastornos psiquiátricos. NASA usa un autotest de vigilancia de 10 minutos; en la ISS se hacía cada 4 días (Reaction SelfTest). https://www.nasa.gov/hrp/risks/

**Threshold source / Fuente de umbrales:** lapse = reaction time ≥ 355 ms in the 3-min PVT-B (Basner 2011, https://pmc.ncbi.nlm.nih.gov/articles/PMC3197786); > 500 ms in the 10-min PVT (NASA). Level cuts against the personal baseline: *Proposal* (`escalas-y-protocolos.md` §1.1). / Lapso = tiempo de reacción ≥ 355 ms en el PVT-B de 3 min (Basner 2011); > 500 ms en el PVT de 10 min (NASA). Cortes de nivel contra la línea base personal: *Proposal* (`escalas-y-protocolos.md` §1.1).

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | Same as baseline · *Proposal*<br>*Igual a la línea base* | Your reaction time is like your usual.<br>*Tu tiempo de reacción es como el de siempre.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | \|z\| ≥ 1.5 in one session · *Proposal*<br>*\|z\| ≥ 1,5 en una sesión* | Your reaction was slower than usual in this test.<br>*Tu reacción fue más lenta que lo habitual en este test.* | Soft warning: monitor. No consultation needed. Repeat the test in your next scheduled session.<br>*Aviso suave: vigilá. No hace falta consultar. Repetí el test en tu próxima sesión.* |
| 🟠 | \|z\| ≥ 1.5 in 3 sessions in a row · *Proposal*<br>*\|z\| ≥ 1,5 en 3 sesiones seguidas* | Your reaction has been slower than usual in your last 3 tests.<br>*Tu reacción viene más lenta que lo habitual en tus últimos 3 tests.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | \|z\| ≥ 2 sustained **plus** symptoms or sleep in red · *Proposal*<br>*\|z\| ≥ 2 sostenido **más** síntomas o sueño en rojo* | Your reaction has been clearly slower for several sessions, along with poor sleep or symptoms.<br>*Tu reacción viene claramente más lenta hace varias sesiones, junto con poco sueño o síntomas.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** the PVT red needs a baseline deviation **plus** another signal. With "sleep in red" it crosses a fixed threshold; with "symptoms" it does not (symptoms have no threshold in the MVP). Also, `umbrales.md` describes the PVT levels as "more lapses" while `escalas-y-protocolos.md` uses z-scores; this file follows the more detailed `escalas-y-protocolos.md`. Confirm.
> El rojo del PVT pide desvío de la línea base **más** otra señal. Con "sueño en rojo" cruza un umbral fijo; con "síntomas", no (en el MVP los síntomas no tienen umbral). Además, `umbrales.md` describe los niveles como "más lapsos" y `escalas-y-protocolos.md` usa z; este archivo sigue a `escalas-y-protocolos.md`, que es más detallado. Confirmar.

---

## 6. Vision (Amsler grid) / Visión (rejilla de Amsler)

**NASA risk / Riesgo NASA:** Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS). About 70 % of ISS astronauts show swelling at the back of the eye; risk is higher on long missions. The app does not replace the fundoscope: it detects changes between check-ups. / Riesgo de síndrome neuro-ocular asociado al vuelo espacial (SANS). Cerca del 70 % de los astronautas de la ISS tiene inflamación en el fondo del ojo; el riesgo es mayor en misiones largas. La app no reemplaza al fondoscopio: detecta cambios entre controles. https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105

**Threshold source / Fuente de umbrales:** all cuts *Proposal* (`umbrales.md`, `escalas-y-protocolos.md` §1.2). Eye-care organizations advise consulting for any change (Canadian Association of Optometrists, https://opto.ca/sites/default/files/2024-02/cao_amslergrid_EN.pdf). / Todos los cortes son *Proposal* (`umbrales.md`, `escalas-y-protocolos.md` §1.2). Las organizaciones de oftalmología indican consultar ante cualquier cambio (Canadian Association of Optometrists).

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | No change · *Proposal*<br>*Sin cambios* | No changes in your vision test.<br>*Sin cambios en tu test de visión.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | Mild change that does not repeat on a new test · *Proposal*<br>*Cambio leve que no se repite al medir de nuevo* | You marked a small change that did not show up again.<br>*Marcaste un cambio leve que no volvió a aparecer.* | Soft warning: monitor. No consultation needed. Do the test again next week, one eye at a time, at 30–38 cm.<br>*Aviso suave: vigilá. No hace falta consultar. Repetí el test la semana próxima, un ojo por vez, a 30–38 cm.* |
| 🟠 | New change confirmed against baseline · *Proposal*<br>*Cambio nuevo confirmado respecto de la línea base* | A change in your vision test was confirmed.<br>*Se confirmó un cambio en tu test de visión.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | Sudden loss or distortion, or an area that grows · *Proposal*<br>*Pérdida o distorsión súbita, o zona que crece* | Sudden change in your vision.<br>*Cambio súbito en tu visión.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** eye-care organizations advise consulting for **any** change. Our yellow applies only to a change that did **not** show up again when the test was repeated right away; a change that repeats is orange. When the astronaut marks a change, the app should ask to repeat the test at once ("Repeat the test now, one eye at a time" / "Repetí el test ahora, un ojo por vez"). Confirm this reading, or make every marked change orange.
> Las organizaciones de oftalmología indican consultar ante **cualquier** cambio. Nuestro amarillo aplica solo a un cambio que **no** volvió a aparecer al repetir el test enseguida; un cambio que se repite es naranja. Cuando el astronauta marca un cambio, la app debería pedir repetir el test en el momento. Confirmar esta lectura, o que todo cambio marcado sea naranja.

---

## 7a. Cabin CO₂ / CO₂ de cabina

**NASA risk / Riesgo NASA:** Hostile and closed environments hazard. NASA's hazard page gives no CO₂ values; the limits come from NASA-STD-3001 and the CO₂ technical brief. Symptoms have been reported from 2.3 mmHg (Law and Alexander, NASA). / Peligro de ambientes cerrados y hostiles. La página de NASA sobre este peligro no da valores de CO₂; los límites salen del NASA-STD-3001 y del informe técnico de CO₂. Se reportaron síntomas desde 2,3 mmHg (Law y Alexander, NASA). https://www.nasa.gov/hrp/hazard-hostile-closed-environments/

**Threshold source / Fuente de umbrales:** NASA-STD-3001 Vol. 1 Rev. C (https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf); OCHMO-TB-004 (https://www.nasa.gov/?p=841628). Yellow/orange cut by symptoms: *Proposal*. Cabin data in the demo is simulated. / NASA-STD-3001 Vol. 1 Rev. C; OCHMO-TB-004. Corte amarillo/naranja por síntomas: *Proposal*. Los datos de cabina de la demo son simulados.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | < 2.5 mmHg (7-day average) · NASA-STD-3001 / OCHMO-TB-004<br>*< 2,5 mmHg (promedio de 7 días)* | Cabin CO₂ within limits.<br>*CO₂ de cabina dentro del límite.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 2.5–3 mmHg without symptoms · NASA-STD-3001 (cut: *Proposal*)<br>*2,5–3 mmHg sin síntomas (corte: Proposal)* | Cabin CO₂ is above the usual level.<br>*El CO₂ de cabina está por encima de lo habitual.* | Soft warning: monitor. No consultation needed. Log a headache if you get one.<br>*Aviso suave: vigilá. No hace falta consultar. Si te duele la cabeza, registralo.* |
| 🟠 | 2.5–3 mmHg with headache · NASA-STD-3001 (cut: *Proposal*)<br>*2,5–3 mmHg con dolor de cabeza (corte: Proposal)* | Cabin CO₂ is high and you reported a headache.<br>*El CO₂ de cabina está alto y reportaste dolor de cabeza.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | > 3 mmHg (1-hour average) · NASA-STD-3001 / OCHMO-TB-004<br>*> 3 mmHg (promedio de 1 hora)* | Cabin CO₂ above the safety limit.<br>*CO₂ de cabina por encima del límite de seguridad.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** the skill does not say which average (7-day or 1-hour) the yellow and orange levels use. / La skill no dice qué promedio (7 días o 1 hora) usan el amarillo y el naranja.

---

## 7b. Cumulative radiation / Radiación acumulada

**NASA risk / Riesgo NASA:** Space radiation (cancer and degenerative effects). On the ISS, personal dosimeters are analyzed on Earth; there is no real-time personal reading. ORBITAL's continuous reading is **simulated** and points to autonomous monitors like CSA's CANS. / Radiación espacial (cáncer y efectos degenerativos). En la ISS los dosímetros personales se analizan en Tierra; no hay lectura personal en tiempo real. La lectura continua de ORBITAL es **simulada** y apunta a monitores autónomos como el CANS de la CSA. https://www.nasa.gov/missions/analog-field-testing/why-space-radiation-matters/

**Threshold source / Fuente de umbrales:** percentages are *Proposal*, on top of NASA-STD-3001 limits: 600 mSv career (V1 4030) and 250 mSv per solar event (V1 4031). / Los porcentajes son *Proposal*, sobre los límites del NASA-STD-3001: 600 mSv en la carrera (V1 4030) y 250 mSv por evento solar (V1 4031).

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | < 50 % of the career limit · *Proposal* on NASA-STD-3001<br>*< 50 % del límite de carrera* | Cumulative dose well below your career limit.<br>*Dosis acumulada muy por debajo de tu límite de carrera.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 50–65 % · *Proposal* on NASA-STD-3001 | Your cumulative dose has passed half of your career limit.<br>*Tu dosis acumulada pasó la mitad de tu límite de carrera.* | Soft warning: monitor. No consultation needed.<br>*Aviso suave: vigilá. No hace falta consultar.* |
| 🟠 | 65–80 % · *Proposal* on NASA-STD-3001 | Your cumulative dose is getting close to your career limit.<br>*Tu dosis acumulada se acerca a tu límite de carrera.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | > 80 %, or a solar storm · *Proposal* on NASA-STD-3001 (600 mSv career; 250 mSv per solar event)<br>*> 80 %, o una tormenta solar (600 mSv de carrera; 250 mSv por evento solar)* | Cumulative dose near the limit, or solar storm in progress.<br>*Dosis acumulada cerca del límite, o tormenta solar en curso.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** yellow (50–65 %) and orange (65–80 %) share exactly 65 %. / Amarillo (50–65 %) y naranja (65–80 %) comparten el 65 % exacto.

---

## Symptoms / Síntomas

Four checkboxes in the self-report (decided on 14/11). **They do not create new rules and do not set a level on their own**: they complete rules that already exist. Ticking a box only logs it and shows a confirmation.
Cuatro casillas del autorreporte (decidido el 14/11). **No crean reglas nuevas ni ponen un nivel por sí solas**: completan reglas que ya existen. Marcar una casilla solo la registra y muestra una confirmación.

Source / Fuente: `escalas-y-protocolos.md` §2.3, `umbrales.md` (MVP).

| Checkbox / Casilla | Astronaut sees when ticked / Ve el astronauta al marcarla | Feeds this rule / Alimenta esta regla | Why (source) / Por qué (fuente) |
| --- | --- | --- | --- |
| Dizziness or disorientation<br>*Mareo o desorientación* | Logged: dizziness or disorientation. It will be checked together with your blood pressure.<br>*Registrado: mareo o desorientación. Se va a evaluar junto con tu presión.* | Blood pressure < 90/60 **with symptoms** → 🟠<br>*Presión < 90/60 **con síntomas** → 🟠* | Orthostatic intolerance on return to gravity: low blood pressure and fainting on landing (NASA HRP, cardiovascular risk). The link between dizziness and low blood pressure is a *Proposal* (see ⚠ 1).<br>*Intolerancia ortostática al volver a la gravedad: presión baja y desmayo al aterrizar (NASA HRP, riesgo cardiovascular). La relación entre mareo y presión baja es Proposal (ver ⚠ 1).* |
| Lightheaded or faint<br>*Aturdimiento o sensación de desmayo* | Logged: lightheaded or faint. It will be checked together with your blood pressure.<br>*Registrado: aturdimiento o sensación de desmayo. Se va a evaluar junto con tu presión.* | Blood pressure < 90/60 **with symptoms** → 🟠<br>*Presión < 90/60 **con síntomas** → 🟠* | Orthostatic intolerance on return to gravity: up to 80 % feel lightheaded after long missions (CSA, BP Reg); low blood pressure and fainting on landing (NASA HRP, cardiovascular risk). Mars surface and LBNP: team decision, no source. Renamed by team decision, 14/11 (see note below).<br>*Intolerancia ortostática al volver a la gravedad: hasta 80 % tiene aturdimiento al volver de misiones largas (CSA, BP Reg); presión baja y desmayo al aterrizar (NASA HRP, riesgo cardiovascular). Superficie de Marte y LBNP: decisión del equipo, sin fuente. Nombre cambiado por decisión del equipo, 14/11 (ver nota abajo).* |
| Headache<br>*Dolor de cabeza* | Logged: headache. It will be checked together with cabin CO₂.<br>*Registrado: dolor de cabeza. Se va a evaluar junto con el CO₂ de cabina.* | Cabin CO₂ 2.5–3 mmHg **with headache** → 🟠 (cut: *Proposal*)<br>*CO₂ de cabina 2,5–3 mmHg **con dolor de cabeza** → 🟠 (corte: Proposal)* | High cabin CO₂ (hypercapnia): symptoms reported from 2.3 mmHg (Law and Alexander, NASA); CO₂ limits: OCHMO-TB-004<br>*CO₂ de cabina alto (hipercapnia): síntomas reportados desde 2,3 mmHg (Law y Alexander, NASA); límites de CO₂: OCHMO-TB-004* |
| Cold sore or rash<br>*Herpes labial o erupciones* | Logged: cold sore or rash. It will be checked together with your temperature.<br>*Registrado: herpes labial o erupciones. Se va a evaluar junto con tu temperatura.* | Temperature 37.5–37.9 °C **with symptoms** → 🟠 (cut: *Proposal*)<br>*Temperatura 37,5–37,9 °C **con síntomas** → 🟠 (corte: Proposal)* | Altered immunity causes cold sores and rashes (NASA HRP, immune risk)<br>*El sistema inmune alterado da herpes labial y erupciones (NASA HRP, riesgo inmune)* |

> **Team decision (14/11/2026) / Decisión del equipo (14/11/2026):** the checkbox "Lightheaded on standing" is renamed "Lightheaded or faint", because orthostatic intolerance matters in gravity transitions (landing, Mars surface) and in LBNP (lower body negative pressure), which mimics the effect of standing. Mars surface and LBNP: no source (team decision). / La casilla "Aturdimiento al pararse" pasa a llamarse "Aturdimiento o sensación de desmayo", porque la intolerancia ortostática importa en los cambios de gravedad (aterrizaje, superficie de Marte) y en el LBNP (presión negativa en la parte inferior del cuerpo), que imita el efecto de estar de pie. Superficie de Marte y LBNP: sin fuente (decisión del equipo).

> ⚠ **Team decision needed / Decisión pendiente del equipo:**
> 1. **Mapping.** The skill fixes headache → cabin CO₂, but it does not say which boxes count as "symptoms" for low blood pressure and for temperature. The table above is our reading. The link between **dizziness** and low blood pressure is a *Proposal*: the skill has no source that ties dizziness to low blood pressure (NASA's gravity hazard page lists dizziness and fainting on landing, with no blood pressure value, https://www.nasa.gov/hrp/hazard-gravity-fields/; CSA BP Reg covers lightheadedness, not dizziness). Confirm. / La skill fija dolor de cabeza → CO₂ de cabina, pero no dice qué casillas cuentan como "síntomas" para la presión baja y para la temperatura. La tabla es nuestra lectura. La relación entre **mareo** y presión baja es *Proposal*: la skill no tiene una fuente que una el mareo con la presión baja (la página de NASA sobre el peligro de los campos de gravedad menciona mareo y desmayo al aterrizar, sin un valor de presión; CSA BP Reg habla de aturdimiento, no de mareo). Confirmar.
> 2. **Temperature is not in the MVP.** Without it, "cold sore or rash" feeds no active rule. Options: add temperature to the MVP (thresholds exist: CDC, fever ≥ 38 °C, hypothermia < 35 °C), or keep the box as a log only. The on-screen text for this box ("checked together with your temperature") depends on that choice. / **La temperatura no está en el MVP.** Sin ella, "herpes labial o erupciones" no alimenta ninguna regla activa. Opciones: sumar temperatura al MVP (los umbrales existen: CDC) o dejar la casilla solo como registro. Umbrales CDC: fiebre ≥ 38 °C, hipotermia < 35 °C. El texto en pantalla de esta casilla ("se va a evaluar junto con tu temperatura") depende de esa elección.
> 3. The skill also has a severity-based symptom scale (mild/moderate/severe, *Proposal*) in which a mild symptom alone is yellow. That conflicts with "symptoms do not set a level on their own" (`umbrales.md`, MVP). Intensity is listed as future work, so this file follows `umbrales.md`. Confirm. / La skill tiene además una escala por intensidad (leve/moderada/intensa, *Proposal*) en la que un síntoma leve solo ya es amarillo. Eso choca con "los síntomas no ponen un nivel por sí solos" (`umbrales.md`, MVP). La intensidad figura como trabajo futuro, así que este archivo sigue a `umbrales.md`. Confirmar.

---

## Sources / Fuentes

Primary sources used in this file. / Fuentes primarias usadas en este archivo.

| Source / Fuente | Used for | Se usa para | URL |
| --- | --- | --- | --- |
| AHA – Understanding blood pressure readings | Blood pressure thresholds | Umbrales de presión arterial | https://heart.org/bplevels |
| ACC/AHA 2017 guideline – AFP summary (2018) | Systolic and diastolic in different categories: the higher category applies | Sistólica y diastólica en categorías distintas: vale la más alta | https://www.aafp.org/afp/2018/0315/p413 |
| ACC/AHA 2025 blood pressure guideline (*Hypertension* 2025;82(10):e212–e316) | Update of the 2017 guideline | Actualización de la guía 2017 | https://doi.org/10.1161/HYP.0000000000000249 |
| AHA – All About Heart Rate | Resting heart rate thresholds | Umbrales de FC en reposo | https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse |
| ADA – definitions of hypo- and hyperglycemia (*Diabetes Therapy* 2019) | Glucose thresholds | Umbrales de glucosa | https://pmc.ncbi.nlm.nih.gov/articles/PMC6531520/table/Tab1 |
| WHO – Oxygen therapy for children (2016) | SpO₂ normal range and lower limit (94 %) | Rango normal de SpO₂ y límite inferior (94 %) | https://who.int/publications-detail-redirect/9789241549554 |
| NHLBI – Low Blood Pressure | Hypotension below 90/60 | Hipotensión por debajo de 90/60 | https://www.nhlbi.nih.gov/health/low-blood-pressure |
| CDC – Definitions of signs, symptoms, and conditions of ill travelers | Fever ≥ 38 °C (temperature, not in the MVP) | Fiebre ≥ 38 °C (temperatura, fuera del MVP) | https://www.cdc.gov/port-health/php/definitions-symptoms-reportable-illness |
| CDC – Hypothermia-related deaths (*MMWR* 2006) | Hypothermia < 35 °C (temperature, not in the MVP) | Hipotermia < 35 °C (temperatura, fuera del MVP) | https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5510a5.htm |
| Myatt 2017 – Pulse oximetry (*Nursing Standard*) | SpO₂ < 90 % is an emergency | SpO₂ < 90 % es una emergencia | https://journals.rcni.com/nursing-standard/pulse-oximetry-what-the-nurse-needs-to-know-ns.2017.e9940 |
| Basner 2011 – PVT-B (*Acta Astronautica*) | PVT-B lapse cut (355 ms) | Corte de lapso del PVT-B (355 ms) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3197786 |
| *Sleep* 2022 – Sleep deficiency in spaceflight | Sleep thresholds; VAS and PVT every 4 days on the ISS | Umbrales de sueño; VAS y PVT cada 4 días en la ISS | https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197 |
| NASA-STD-3001 Vol. 1 Rev. C | CO₂ limits; radiation limits (600 mSv career, 250 mSv per solar event) | Límites de CO₂; límites de radiación (600 mSv de carrera, 250 mSv por evento solar) | https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf |
| NASA OCHMO-TB-004 – Carbon Dioxide technical brief | Cabin CO₂ limits | Límites de CO₂ de cabina | https://www.nasa.gov/?p=841628 |
| Law and Alexander – Lower CO₂ levels on ISS (NASA) | CO₂ symptoms from 2.3 mmHg | Síntomas de CO₂ desde 2,3 mmHg | https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20150019624.pdf |
| CSA – Vascular | Insulin resistance in space (why glucose is monitored) | Resistencia a la insulina en el espacio (por qué se mide la glucosa) | https://www.asc-csa.gc.ca/eng/sciences/vascular.asp |
| NASA HRP – Risks of Human Spaceflight | Official NASA risk for each measurement | Riesgo oficial de NASA de cada medición | https://www.nasa.gov/hrp/risks/ |
