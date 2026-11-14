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

- **Sustained deviation (yellow)** / **Desvío sostenido (amarillo):** |z| ≥ 1.5 in 3 measurements in a row, with the value inside the clinical range. *Proposal.*
- **Marked sustained deviation (orange)** / **Desvío marcado y sostenido (naranja):** |z| ≥ 2 sustained. *Proposal.*
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
| — | [Symptoms](#symptoms--síntomas) | Sensorimotor · Cardiovascular · Hypoxia · Immune |

---

## 1. Blood pressure / Presión arterial

**NASA risk / Riesgo NASA:** Risk of Cardiovascular Adaptations Contributing to Adverse Mission Performance and Health Outcomes. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
In long flights, 24 h blood pressure drops 8–10 mmHg (Norsk 2015), so the personal baseline matters. / En vuelos largos la presión de 24 h baja 8–10 mmHg (Norsk 2015): por eso importa la línea base personal.

**Threshold source / Fuente de umbrales:** AHA, Understanding blood pressure readings (https://heart.org/bplevels); hypotension < 90/60: NHLBI (https://www.nhlbi.nih.gov/health/low-blood-pressure), NHS inform.

| Level | Trigger · Source / Disparador · Fuente | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | < 130 / < 80 mmHg · AHA | Blood pressure within your expected range.<br>*Presión dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | < 130 / < 80 with sustained deviation from baseline · AHA + baseline (*Proposal*) | Your blood pressure is in range but has been moving away from your usual values.<br>*Tu presión está en rango, pero se viene alejando de tus valores habituales.* | Soft warning: monitor. No consultation needed. Repeat tomorrow with the full protocol (5 min rest, arm at heart level).<br>*Aviso suave: vigilá. No hace falta consultar. Repetí mañana con el protocolo completo (5 min de reposo, brazo a la altura del corazón).* |
| 🟠 | 130–180 / 80–120, or < 90/60 with symptoms, or \|z\| ≥ 2 sustained · AHA; NHLBI; baseline (*Proposal*) | Your blood pressure is outside the expected range.<br>*Tu presión está fuera del rango esperado.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | > 180 and/or > 120 mmHg (repeat after 5 min) · AHA | Critical blood pressure reading.<br>*Lectura de presión crítica.* | Repeat the reading in 5 minutes. If it is still above the limit, escalate to the flight surgeon. Your report is ready to send.<br>*Repetí la medición en 5 minutos. Si sigue por encima del límite, escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Gap / Hueco:** the skill does not define a level for < 90/60 **without** symptoms. Not filled here. / La skill no define nivel para < 90/60 **sin** síntomas. No se completa acá.

---

## 2a. Resting heart rate / Frecuencia cardíaca en reposo

**NASA risk / Riesgo NASA:** Risk of Cardiovascular Adaptations (same as above). Heart rate and its variability drop in flight. / La FC y su variabilidad bajan en vuelo. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/

**Threshold source / Fuente de umbrales:** AHA (normal 60–100; well-trained ~40). Green starts at 50 for an athletic profile. / AHA (normal 60–100; muy entrenados ~40). El verde empieza en 50 por perfil atlético. https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | 50–100 bpm · AHA | Resting heart rate within your expected range.<br>*FC en reposo dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 50–100 with sustained deviation · AHA + baseline (*Proposal*) | Your resting heart rate is in range but differs from your usual values.<br>*Tu FC en reposo está en rango, pero es distinta de tus valores habituales.* | Soft warning: monitor. No consultation needed. Measure again tomorrow on waking.<br>*Aviso suave: vigilá. No hace falta consultar. Volvé a medir mañana al despertar.* |
| 🟠 | 40–49 or 101–120, or \|z\| ≥ 2 sustained · AHA; baseline (*Proposal*) | Your resting heart rate is outside the expected range.<br>*Tu FC en reposo está fuera del rango esperado.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | < 40 or > 120 bpm · AHA | Critical resting heart rate.<br>*FC en reposo crítica.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 2b. SpO₂ / Saturación de oxígeno

**NASA risk / Riesgo NASA:** Risk of Hypoxia. Partial cabin depressurization for spacewalks can cause mild hypoxia: confusion, headache, vision changes, sleep problems. NASA gives no SpO₂ values. / Riesgo de hipoxia: la despresurización parcial para caminatas espaciales puede causar hipoxia leve. NASA no da valores de SpO₂. https://www.nasa.gov/hrp/risks/

**Threshold source / Fuente de umbrales:** WHO (normal 97–99 %, lower limit 94 %); < 90 % is an emergency (Myatt 2017, *Nursing Standard*). Red includes exactly 90 %: *Proposal*, more conservative than the source. FDA: look at the trend; a single low value needs a new reading before escalating.
OMS (normal 97–99 %, límite inferior 94 %); < 90 % es emergencia (Myatt 2017). Rojo incluye el 90 % exacto: *Proposal*, más conservador que la fuente. FDA: mirar la tendencia; un valor bajo aislado pide nueva medición antes de escalar.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | ≥ 95 % · WHO | Oxygen saturation within your expected range.<br>*Saturación dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 94 %, or ≥ 95 % with sustained deviation · WHO + baseline (*Proposal*) | Your oxygen saturation is slightly lower than usual.<br>*Tu saturación está un poco más baja que lo habitual.* | Soft warning: monitor. No consultation needed. Repeat with a warm, relaxed hand, below heart level, until the value is stable.<br>*Aviso suave: vigilá. No hace falta consultar. Repetí con la mano tibia y relajada, debajo del corazón, hasta que el valor se estabilice.* |
| 🟠 | 91–93 %, or \|z\| ≥ 2 sustained · WHO; baseline (*Proposal*) | Your oxygen saturation is below the expected range.<br>*Tu saturación está debajo del rango esperado.* | Repeat the reading first: a single low value needs confirmation (FDA). If it stays low, contact the crew medical officer.<br>*Repetí la medición primero: un valor bajo aislado necesita confirmarse (FDA). Si sigue bajo, consultá al médico de a bordo.* |
| 🔴 | ≤ 90 % · Myatt 2017 (90 % exact: *Proposal*) | Critical oxygen saturation.<br>*Saturación crítica.* | Repeat the reading at once. If it is still ≤ 90 %, escalate to the flight surgeon. Your report is ready to send.<br>*Repetí la medición ya. Si sigue en 90 % o menos, escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 3. Glucose / Glucosa

**NASA risk / Riesgo NASA:** not an independent HRP risk. The CSA documents insulin resistance in space, with a risk of type 2 diabetes (CSA, Vascular study), and the challenge statement asks for it. / No es un riesgo HRP independiente. La CSA documenta resistencia a la insulina en el espacio, con riesgo de diabetes tipo 2, y lo pide el enunciado. https://www.asc-csa.gc.ca/eng/sciences/vascular.asp · https://www.asc-csa.gc.ca/eng/multimedia/search/image/8056

**Threshold source / Fuente de umbrales:** ADA definitions of hypo- and hyperglycemia (*Diabetes Therapy* 2019). https://pmc.ncbi.nlm.nih.gov/articles/PMC6531520/table/Tab1

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | 70–180 mg/dL · ADA | Glucose within your expected range.<br>*Glucosa dentro de lo esperado.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 70–180 with sustained deviation · ADA + baseline (*Proposal*) | Your glucose is in range but has been moving away from your usual values.<br>*Tu glucosa está en rango, pero se viene alejando de tus valores habituales.* | Soft warning: monitor. No consultation needed. Log whether you were fasting or had just eaten.<br>*Aviso suave: vigilá. No hace falta consultar. Anotá si estabas en ayunas o recién comido.* |
| 🟠 | 54–69 or 181–250, or \|z\| ≥ 2 sustained · ADA; baseline (*Proposal*) | Your glucose is outside the expected range.<br>*Tu glucosa está fuera del rango esperado.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | < 54 or > 250 mg/dL · ADA | Critical glucose reading.<br>*Lectura de glucosa crítica.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 4. Sleep / Sueño

**NASA risk / Riesgo NASA:** Risk of Inadequate Sleep and Irregular Schedules. About 16 sunrises per day in orbit disrupt the circadian rhythm; sessions of 6 h or less were linked to slower psychomotor speed, more stress and more tiredness. / Unos 16 amaneceres por día alteran el ritmo circadiano; dormir 6 h o menos se asoció con peor rendimiento. https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/

**Threshold source / Fuente de umbrales:** *Sleep* 2022 (ISS, Reaction SelfTest), https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197. Yellow/orange cut: *Proposal*.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | ≥ 7 h per night · *Sleep* 2022 | You slept enough.<br>*Dormiste lo suficiente.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | 6–7 h · *Sleep* 2022 (cut: *Proposal*) | You slept a bit less than recommended.<br>*Dormiste un poco menos de lo recomendado.* | Soft warning: monitor. No consultation needed. Protect your next sleep period.<br>*Aviso suave: vigilá. No hace falta consultar. Cuidá tu próximo período de sueño.* |
| 🟠 | < 6 h one night · *Sleep* 2022 (cut: *Proposal*) | You slept less than 6 hours.<br>*Dormiste menos de 6 horas.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | < 6 h on 2 or more nights in a row · *Sleep* 2022 | You have slept less than 6 hours for several nights in a row.<br>*Llevás varias noches seguidas durmiendo menos de 6 horas.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

---

## 5a. Mood (VAS) / Ánimo (VAS)

**NASA risk / Riesgo NASA:** Risk of Behavioral Conditions and Psychiatric Disorders. Isolation and confinement favor anxiety and depression. On the ISS, visual analog scales were taken every 4 days (*Sleep* 2022). / Aislamiento y confinamiento favorecen ansiedad y depresión. En la ISS se tomaron escalas visuales cada 4 días. https://www.nasa.gov/hrp/risks/

**Threshold source / Fuente de umbrales:** all cuts are *Proposal*, against the personal baseline (`escalas-y-protocolos.md` §2.1). Score 0–100, inverted so that 100 is always the worst state. / Todos los cortes son *Proposal*, contra la línea base personal. Puntaje 0–100, invertido para que 100 sea siempre el peor estado.

The astronaut never sees z-scores; the screen uses words. / El astronauta nunca ve el puntaje z; la pantalla usa palabras.

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | Close to baseline · *Proposal* | Your mood is similar to your usual.<br>*Tu ánimo es parecido al de siempre.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | \|z\| ≥ 1.5 in 3 entries · *Proposal* | Your mood has been lower than usual in your last entries.<br>*Tu ánimo viene más bajo que lo habitual en tus últimos registros.* | Soft warning: monitor. No consultation needed. Self-care NASA suggests: keep a journal, tend plants, look out the window.<br>*Aviso suave: vigilá. No hace falta consultar. Autocuidado que sugiere NASA: llevar un diario, cuidar plantas, mirar por la ventana.* |
| 🟠 | \|z\| ≥ 2 sustained · *Proposal* | Your mood has been clearly lower than usual for several days.<br>*Tu ánimo viene claramente más bajo que lo habitual hace varios días.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | Mood in the worst 10 % on several days · *Proposal* | Your mood has been very low for several days.<br>*Tu ánimo viene muy bajo hace varios días.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** the skill's red trigger ("worst 10 % on several days") is measured against the person's own history, not against a clinical threshold. That conflicts with the rule "red only by crossing a clinical threshold". Options: (a) cap mood at orange, or (b) keep the skill's trigger and say so to the jury. Not changed here.
> El rojo de la skill ("peor 10 % varios días") se mide contra la propia historia, no contra un umbral clínico. Choca con la regla "rojo solo al cruzar un umbral clínico". Opciones: (a) que el ánimo llegue como máximo a naranja, o (b) mantener el disparador de la skill y decirlo al jurado. No se cambia acá.

---

## 5b. Reaction test (PVT) / Test de reacción (PVT)

**NASA risk / Riesgo NASA:** Risk of Inadequate Sleep and Irregular Schedules; Risk of Behavioral Conditions and Psychiatric Disorders. NASA uses a 10-minute self-test of vigilance; on the ISS it ran every 4 days (Reaction SelfTest). / NASA usa un autotest de vigilancia de 10 minutos; en la ISS, cada 4 días. https://www.nasa.gov/hrp/risks/

**Threshold source / Fuente de umbrales:** lapse = reaction time ≥ 355 ms in the 3-min PVT-B (Basner 2011, https://pmc.ncbi.nlm.nih.gov/articles/PMC3197786); > 500 ms in the 10-min PVT (NASA). Level cuts against the personal baseline: *Proposal* (`escalas-y-protocolos.md` §1.1).

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | Same as baseline · *Proposal* | Your reaction time is like your usual.<br>*Tu tiempo de reacción es como el de siempre.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | \|z\| ≥ 1.5 in one session · *Proposal* | Your reaction was slower than usual in this test.<br>*Tu reacción fue más lenta que lo habitual en este test.* | Soft warning: monitor. No consultation needed. Repeat the test in your next scheduled session.<br>*Aviso suave: vigilá. No hace falta consultar. Repetí el test en tu próxima sesión.* |
| 🟠 | \|z\| ≥ 1.5 in 3 sessions in a row · *Proposal* | Your reaction has been slower than usual in your last 3 tests.<br>*Tu reacción viene más lenta que lo habitual en tus últimos 3 tests.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | \|z\| ≥ 2 sustained **plus** symptoms or sleep in red · *Proposal* | Your reaction has been clearly slower for several sessions, along with poor sleep or symptoms.<br>*Tu reacción viene claramente más lenta hace varias sesiones, junto con poco sueño o síntomas.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** the PVT red needs a baseline deviation **plus** another signal. With "sleep in red" it crosses a fixed threshold; with "symptoms" it does not (symptoms have no threshold in the MVP). Also, `umbrales.md` describes the PVT levels as "more lapses" while `escalas-y-protocolos.md` uses z-scores; this file follows the more detailed `escalas-y-protocolos.md`. Confirm.
> El rojo del PVT pide desvío de la línea base **más** otra señal. Con "sueño en rojo" cruza un umbral fijo; con "síntomas", no (en el MVP los síntomas no tienen umbral). Además, `umbrales.md` describe los niveles como "más lapsos" y `escalas-y-protocolos.md` usa z; este archivo sigue a `escalas-y-protocolos.md`, que es más detallado. Confirmar.

---

## 6. Vision (Amsler grid) / Visión (rejilla de Amsler)

**NASA risk / Riesgo NASA:** Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS). About 70 % of ISS astronauts show swelling at the back of the eye; risk is higher on long missions. The app does not replace the fundoscope: it detects changes between check-ups. / Cerca del 70 % de los astronautas de la ISS tiene inflamación en el fondo del ojo. La app no reemplaza al fondoscopio: detecta cambios entre controles. https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105

**Threshold source / Fuente de umbrales:** all cuts *Proposal* (`umbrales.md`, `escalas-y-protocolos.md` §1.2). Eye-care organizations advise consulting for any change (Canadian Association of Optometrists, https://opto.ca/sites/default/files/2024-02/cao_amslergrid_EN.pdf).

| Level | Trigger · Source | Astronaut sees / Ve el astronauta | Recommendation / Recomendación |
| --- | --- | --- | --- |
| 🟢 | No change · *Proposal* | No changes in your vision test.<br>*Sin cambios en tu test de visión.* | Keep your routine.<br>*Seguí con tu rutina.* |
| 🟡 | Mild change that does not repeat on a new test · *Proposal* | You marked a small change that did not show up again.<br>*Marcaste un cambio leve que no volvió a aparecer.* | Soft warning: monitor. No consultation needed. Do the test again next week, one eye at a time, at 30–38 cm.<br>*Aviso suave: vigilá. No hace falta consultar. Repetí el test la semana próxima, un ojo por vez, a 30–38 cm.* |
| 🟠 | New change confirmed against baseline · *Proposal* | A change in your vision test was confirmed.<br>*Se confirmó un cambio en tu test de visión.* | Contact the crew medical officer.<br>*Consultá al médico de a bordo.* |
| 🔴 | Sudden loss or distortion, or an area that grows · *Proposal* | Sudden change in your vision.<br>*Cambio súbito en tu visión.* | Escalate to the flight surgeon. Your report is ready to send.<br>*Escalá al flight surgeon. Tu reporte está listo para enviar.* |

> ⚠ **Team decision needed / Decisión pendiente del equipo:** eye-care organizations advise consulting for **any** change. Our yellow applies only to a change that did **not** show up again when the test was repeated right away; a change that repeats is orange. When the astronaut marks a change, the app should ask to repeat the test at once ("Repeat the test now, one eye at a time" / "Repetí el test ahora, un ojo por vez"). Confirm this reading, or make every marked change orange.
> Las organizaciones de oftalmología indican consultar ante **cualquier** cambio. Nuestro amarillo aplica solo a un cambio que **no** volvió a aparecer al repetir el test enseguida; un cambio que se repite es naranja. Cuando el astronauta marca un cambio, la app debería pedir repetir el test en el momento. Confirmar esta lectura, o que todo cambio marcado sea naranja.
