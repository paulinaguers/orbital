# Riesgos oficiales de NASA y nuestros indicadores

Fuente: páginas de riesgos del NASA Human Research Program (HRP), recursos del desafío Space Apps 2026. Leídas el 13/11/2026. Usar este archivo para responder "¿qué riesgo de NASA cubre este indicador?" y para el pitch.

Portal de todos los riesgos: https://www.nasa.gov/hrp/risks/
Evidence reports (informes de evidencia por riesgo): https://humanresearchroadmap.nasa.gov/evidence/

## Tabla resumen

| Riesgo oficial NASA (HRP) | Qué dice NASA, resumido | Indicador ORBITAL que lo cubre | Nivel en el MVP |
| --- | --- | --- | --- |
| Adaptaciones cardiovasculares | La microgravedad altera corazón y vasos: coágulos, arritmias, presión baja y desmayo al aterrizar | Presión arterial, FC en reposo | MVP (1 y 2) |
| Sueño insuficiente y horarios irregulares | En la ISS hay unos 16 amaneceres por día; se usa iluminación LED y se estudia la cafeína | Horas de sueño, test de reacción (PVT) | MVP (4 y 5) |
| Condiciones conductuales y trastornos psiquiátricos | Aislamiento y confinamiento: ansiedad y depresión; ayudan diarios, plantas, ventanas; se estudia en HERA (45 días) | Escala de ánimo (VAS), PVT | MVP (5) |
| SANS (síndrome neuro-ocular) | Cerca del 70 % de los astronautas de la ISS tiene inflamación en el fondo del ojo; más riesgo en misiones largas; se controla con fondoscopio | Rejilla de Amsler, agudeza, síntomas visuales | MVP (6) |
| Cambios óseos y fractura | Se pierde 1–1,5 % de densidad ósea por mes; escaneos antes y después; bifosfonatos | Minutos de ejercicio con carga | Matriz (no MVP) |
| Capacidad cardiorrespiratoria y musculoesquelética | Pérdida media de ~10–12 % de capacidad; entre 12 % y 38 % pierde más del 20 %; ~1,5 h/día de ejercicio, 6–7 días por semana; autoevaluaciones periódicas | Minutos de ejercicio, FC | Matriz (no MVP) |
| Respuesta inmune alterada | Reactivación de virus latentes, herpes labial, erupciones, alergias; muestras de sangre, saliva y orina | Temperatura y síntomas | Matriz (no MVP) |
| Radiación (cáncer y efectos degenerativos) | Riesgo de cáncer y daño de tejidos; instrumentos en la ISS; riesgo personalizado; blindaje para Artemis | Dosis acumulada de radiación | MVP (7) |
| Alimentación y nutrición inadecuadas | Fatiga de menú; más de 200 alimentos disponibles; menos sodio | Masa corporal e ingesta | Matriz (no MVP) |
| Ambiente cerrado (CO₂) | Ver NASA-STD-3001 en `umbrales.md` | CO₂ de cabina y dolor de cabeza | MVP (7) |
| Metabolismo (glucosa) | No es un riesgo HRP propio; la CSA describe resistencia a la insulina en el espacio; lo pide el enunciado | Glucosa | MVP (3) |

> Si el jurado pregunta por la glucosa: no figura como riesgo HRP independiente, pero la CSA documenta resistencia a la insulina en el espacio, con riesgo de diabetes tipo 2 (ver sección CSA). Además la pide el enunciado. Umbrales clínicos de la ADA.

## Detalle por riesgo

### Cardiovascular
- **NASA:** el formal es "Risk of Cardiovascular Adaptations Contributing to Adverse Mission Performance and Health Outcomes". Integra tres riesgos anteriores: intolerancia ortostática al volver a la gravedad, problemas de ritmo cardíaco y enfermedad cardiovascular por radiación.
- **Dato clave:** en un estudio en vuelo, 6 de 11 tripulantes (55 %) tuvieron flujo estancado o invertido en la vena yugular interna hacia el día 50, y uno tuvo un trombo que requirió tratamiento a bordo.
- **Contramedidas NASA:** ejercicio, dieta, prendas de compresión, carga de líquidos.
- **Frase de pitch:** "ORBITAL vigila presión y frecuencia contra la línea base de cada astronauta, porque NASA reconoce que el corazón se adapta y que el riesgo crece en misiones largas."
- Página: https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
- Ficha HRR: https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179
- Para Marte (730–1224 días), NASA lo califica como "requiere mitigación" (calificación 4x4 en operaciones, HSRB 5/2024).

### Sueño
- **NASA:** "Risk of Inadequate Sleep and Irregular Schedules". Unos 16 amaneceres por día en órbita alteran el ritmo circadiano.
- **Dato clave:** sesiones de 6 h o menos se asociaron con menor velocidad psicomotora, más estrés y más cansancio (estudios de sueño en la ISS).
- **Artemis II:** se programaron 8 h de sueño, con los cuatro tripulantes durmiendo a la vez.
- **Frase de pitch:** "Medimos horas de sueño y tiempo de reacción porque NASA asocia dormir 6 h o menos con peor rendimiento."
- Fuente sueño ISS: https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/

### Conductual
- **NASA:** "Risk of Behavioral Conditions and Psychiatric Disorders". El aislamiento y el confinamiento favorecen ansiedad y depresión.
- **Contramedidas NASA:** llevar un diario, cuidar plantas, mirar por la ventana; investigación en el análogo HERA (misiones de 45 días).
- **Frase de pitch:** "La escala de ánimo de ORBITAL toma segundos y sigue el formato de escalas visuales que NASA ya usa."

### SANS
- **NASA:** "Risk of Spaceflight Associated Neuro-ocular Syndrome". Cerca del 70 % de los astronautas de la ISS presenta inflamación en la parte posterior del ojo. El riesgo es mayor en misiones largas.
- **Cómo se mide en la ISS:** fondoscopio, tomografía óptica, pruebas de agudeza.
- **Frase de pitch:** "La app no reemplaza el fondoscopio: con la rejilla de Amsler detecta cambios entre controles y avisa antes."
- Ficha HRR: https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105

### Hueso
- **NASA:** "Risk of Bone Fracture due to Spaceflight-induced Changes to Bone". Pérdida de 1–1,5 % de densidad por mes; por encima de 100 días de misión el riesgo aumenta.
- **Frase de pitch:** "Registramos los minutos de ejercicio con carga, la principal contramedida que NASA usa contra la pérdida ósea."
- Ficha HRR: https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=77

### Capacidad física
- **NASA:** "Risk of Reduced Cardiorespiratory and Musculoskeletal Fitness". Pérdida media de ~10–12 %; entre 12 % y 38 % de los tripulantes pierde más del 20 %. Ejercicio de ~1,5 h/día, 6–7 días por semana.
- **Artemis II (Orion):** dispositivo de volante de inercia (flywheel), unos 30 minutos por día por astronauta.
- **Nota para umbrales:** nuestra propuesta de ejercicio usa ~2 h/día (ISS). Si el escenario es Orion o Artemis, el objetivo diario es menor: decirlo así y no inventar un número nuevo.
- Ficha HRR: https://humanresearchroadmap.nasa.gov/risks/?i=180

### Inmune
- **NASA:** "Risk of Altered Immune Response". Reactivación de virus latentes, herpes labial, erupciones, alergias. Se analizan sangre, saliva y orina.
- **Artemis II:** estudio Immune Biomarkers con saliva seca y sangre.
- **Frase de pitch:** "La temperatura y los síntomas son la señal temprana que la tripulación puede registrar sin laboratorio."
- Ficha HRR: https://humanresearchroadmap.nasa.gov/risks/?i=85

### Radiación
- **NASA:** riesgo de cáncer y de efectos degenerativos. Hay instrumentos en la ISS; se trabaja en riesgo personalizado y en blindaje para Artemis.
- **CSA CANS:** los neutrones son cerca del 30 % de la radiación en la ISS; el monitor es continuo y autónomo.
- **Frase de pitch:** "ORBITAL muestra la dosis acumulada contra el límite de carrera del NASA-STD-3001."

### Nutrición
- **NASA:** "Risk of Performance Decrement and Crew Illness Due to Inadequate Food and Nutrition". Fatiga de menú; más de 200 alimentos; se redujo el sodio.
- **Frase de pitch:** "El peso semanal detecta la pérdida de masa que NASA documenta en vuelos largos."

## Cómo mide NASA hoy (para comparar con ORBITAL)

| Estudio NASA | Qué mide | Cuándo | Relación con ORBITAL |
| --- | --- | --- | --- |
| ARCHeR (Artemis II) | Bienestar, actividad, sueño e interacciones; actígrafo de muñeca | Antes, durante y después; en vuelo solo actigrafía | Mismo enfoque de sueño y actividad, más ánimo y reacción |
| Standard Measures (ISS) | Conjunto fijo de medidas fisiológicas y psicológicas; muestras de sangre, orina, heces, saliva | Antes, durante y después | Inspira nuestra línea base personal |
| Artemis II Standard Measures | Encuestas, saliva, equilibrio, músculo, ojo y cerebro, mareo | Desde ~6 meses antes hasta ~1 mes después | Mismo criterio: comparar contra el propio astronauta |
| Bio-Monitor / Astroskin (CSA) | FC, respiración, SpO₂, presión, temperatura, actividad | Sesiones de 48 h en la ISS | Fuente de nuestros datos simulados de wearable |

**Mensaje para el jurado (aprobado el 14/11):** NASA y la CSA ya miden todo esto, pero lo analizan en Tierra o dependen de la conexión (Space Health, Tempus Pro, Polaris Dawn). ORBITAL analiza a bordo, contra la línea base de cada astronauta, y funciona sin conexión.

**Versión larga:** NASA ya mide todo esto, pero en sesiones separadas y muchos datos se analizan en Tierra. ORBITAL junta las señales en una sola vista a bordo, contra la línea base de cada persona, con escalamiento claro. Eso apunta a la autonomía que necesita una misión a Marte, con demoras de comunicación.


## Riesgos HRP restantes (leídos el 14/11, 00:00)

NASA lista **17 riesgos** en https://www.nasa.gov/hrp/risks/. Los que faltaban arriba:

| Riesgo | Qué dice NASA | Relación con ORBITAL |
| --- | --- | --- |
| Hipoxia | La despresurización parcial de cabina para caminatas espaciales puede causar hipoxia leve: confusión, dolor de cabeza, alteraciones de visión y problemas de sueño. NASA lo considera relativamente bajo y está armando protocolos de monitoreo. No da valores de SpO₂ | Refuerza SpO₂ como indicador del MVP, más síntomas (cefalea, visión, sueño). Nuestros cortes de SpO₂ siguen siendo clínicos (OMS) |
| Función sensoriomotora y vestibular | La mayoría de los astronautas tiene mareo espacial; el mareo en la Tierra no predice el del espacio; desorientación al cambiar de gravedad | La casilla "mareo o desorientación" ya está en el MVP (14/11). En ORBITAL se vincula sobre todo con la intolerancia ortostática (riesgo cardiovascular: presión baja y desmayo al aterrizar; peligro de campos de gravedad: mareo y desmayo al aterrizar), no solo con este riesgo sensoriomotor. La relación entre mareo y presión baja es *Propuesta* |
| Trabajo en equipo | Riesgo de que la cooperación y la comunicación del equipo fallen: demoras de comunicación, aislamiento, hábitat chico. NASA no describe cómo se mide | Trabajo a futuro: VAS opcional "conflicto con el equipo" |
| Interacción huésped–microorganismo | El microbioma de piel e intestino cambia en el espacio; impacto en enfermedad desconocido; muestras e hisopados; cuarentena previa de 2 semanas | Se cubre con temperatura y síntomas |
| Enfermedad por descompresión, caminatas espaciales (EVA), cargas dinámicas, soporte a operaciones | Riesgos de caminatas, aterrizaje y sistemas | Fuera del alcance del MVP |

## Estudios en curso relevantes (Ongoing HRP Research)

- **Tempus Pro:** dispositivo comercial de telemedicina que prueba si puede recolectar e integrar datos vitales e imágenes para diagnóstico casi en tiempo real en misiones lejanas, por las demoras de comunicación. Es el antecedente más cercano a ORBITAL: NASA ya busca integrar datos vitales a bordo. https://www.nasa.gov/reference/tempus-pro/
- **Venous Haemostasis (con ESA):** ecografía de yugular, análisis de sangre y **controles de presión arterial antes y durante el vuelo** para estudiar riesgo de coágulos; solo algunos astronautas tienen el problema y no se sabe por qué. Apoya la línea base personal. https://www.nasa.gov/reference/venous-haemostasis/
- **CIPHER:** 14 investigaciones sobre ojo, hueso, corazón, cerebro, equilibrio, músculo, telómeros e inmunidad, en misiones de hasta un año, con datos antes, durante y después. https://www.nasa.gov/reference/cipher/
- **Immune Biomarkers (Artemis II), Thigh Cuff, B-Complex, Zero T2:** listados en https://www.nasa.gov/hrp/ongoing-hrp-research/

## Agencia Espacial Canadiense (CSA)

- Infografía "How does space affect the human body?": en el espacio se puede desarrollar **resistencia a la insulina, que puede llevar a diabetes tipo 2**, y vasos que envejecen más rápido; hueso hasta 1,5 % por mes. **Esta es la justificación espacial de la glucosa.** https://www.asc-csa.gc.ca/eng/multimedia/search/image/8056
- "Why do we conduct science experiments in space?": misiones a la Luna y Marte implican más ingravidez, más radiación, aislamiento más largo, demoras de comunicación y menos posibilidad de depender de la Tierra para asistencia médica de emergencia. https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp


## Los 5 peligros (hazards) – datos clave (leídos el 14/11)

| Peligro | Dato clave | Uso en ORBITAL |
| --- | --- | --- |
| Distancia de la Tierra | Demora de comunicación de **hasta 20 minutos por tramo**; HERA simula hasta 5 minutos por tramo; las tripulaciones deben resolver emergencias médicas con ayuda limitada. https://www.nasa.gov/hrp/hazard-distance-from-earth/ | Argumento central del pitch: por eso ORBITAL decide el nivel a bordo y funciona sin conexión |
| Radiación | Dosis efectivas de astronautas de unos 50 a 2.000 mSv; 1 mSv equivale a unas 10 radiografías de tórax; los rayos cósmicos galácticos atraviesan prácticamente la nave. https://www.nasa.gov/missions/analog-field-testing/why-space-radiation-matters/ | Contexto para la dosis acumulada; el límite sigue siendo el del NASA-STD-3001 |
| Aislamiento y confinamiento | Pérdida de sueño, desfase circadiano y sobrecarga de trabajo pueden bajar el rendimiento; NASA desarrolla formas de monitorear salud conductual y detectar factores de riesgo temprano; usa diarios y luz terapéutica; HERA 45 días, CHAPEA un año. https://www.nasa.gov/hrp/hazard-isolation-and-confinement/ | Respalda sueño + ánimo + PVT como detección temprana |
| Campos de gravedad | Hueso −1 a −1,5 %/mes; desplazamiento de fluidos hacia la cabeza (visión); más riesgo de cálculos renales por deshidratación y calcio; al aterrizar, mareo y desmayo. https://www.nasa.gov/hrp/hazard-gravity-fields/ | Respalda visión, ejercicio y presión |
| Ambientes cerrados y hostiles | Temperatura, presión, luz, ruido y espacio; microbios que pasan más fácil entre personas; hormonas del estrés y cambios inmunes. No da valores de CO₂. https://www.nasa.gov/hrp/hazard-hostile-closed-environments/ | Temperatura y síntomas; el CO₂ sale del NASA-STD-3001 |

Standard Measures empezó en 2018 y reunió datos de más de 30 astronautas en la ISS; Artemis II los suma al mismo banco. https://www.nasa.gov/reference/artemis-ii-standard-measures/

## Antecedentes directos y respaldos (revisión completa del 14/11)

| Antecedente | Qué hace | Diferencia con ORBITAL |
| --- | --- | --- |
| CSA Space Health (2023–2028, 10 astronautas) | Bio-Monitor 48 h + plataforma de IA "Artemis" que busca patrones; datos bajados a Tierra; el análisis en vivo es un plan | ORBITAL analiza a bordo |
| CSA Bio-Monitor | Camiseta: pulso, ECG, presión, respiración, temperatura de piel, SpO₂, actividad | Fuente de los datos simulados |
| Tempus Pro / Polaris Dawn | Integran presión, FC, respiración y temperatura con telemedicina (Polaris usa Starlink) | Dependen de la conexión |
| CSA ACTIS | Riesgo de coágulos a bordo en ~15 min, resultado en el dispositivo | Misma lógica de "a bordo primero" |
| NASA Medical Data Architecture | Apoyo a decisiones clínicas autónomo, con o sin Tierra, con ML | ORBITAL es un prototipo de esa necesidad |

**Datos útiles:** presión: hasta 80 % de aturdimiento al volver (CSA BP Reg); arterias 17–30 % más rígidas en 6 meses (CSA Vascular). Glucosa: resistencia a la insulina documentada (CSA Vascular). PVT: NASA usa un autotest de vigilancia de 10 minutos. Radiación: ~150 µSv/día solo de neutrones en la ISS (CSA Radi-N2).

**Radiación, cómo presentarla:** en la ISS los dosímetros personales se analizan en Tierra; no hay lectura personal en tiempo real (NASA Space Radiation Analysis Group). La lectura continua de ORBITAL es **simulada** y apunta a monitores autónomos como CANS (CSA).

Inventario completo de la revisión: https://claude.ai/artifact/5S38cMgQtKpaTn85CtLshV

## Fuentes de esta referencia

- NASA HRP. Risks of Human Spaceflight. https://www.nasa.gov/hrp/risks/
- NASA. Risk of Cardiovascular Adaptations. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
- NASA HHP. CV Risk. https://www.nasa.gov/directorates/esdmd/hhp/cv-risk/
- NASA Human Research Roadmap: fichas de riesgo i=179 (CV), 105 (SANS), 77 (hueso), 180 (capacidad física), 85 (inmune).
- NASA. ARCHeR. https://www.nasa.gov/reference/archer/
- NASA. Artemis II Crew Both Subjects and Scientists in NASA Deep Space Research. https://www.nasa.gov/general/artemis-ii-crew-both-subjects-and-scientists-in-nasa-deep-space-research/
- NASA. Crew Systems (flywheel y sueño en Orion). https://www.nasa.gov/reference/crew-systems/
- NASA. Science in Space: Sleep on Station (2023). https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/
- CSA. CANS (monitor de neutrones), recurso del desafío.
