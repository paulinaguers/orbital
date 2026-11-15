# Official NASA risks and our indicators

Source: risk pages of the NASA Human Research Program (HRP), Space Apps 2026 challenge resources. Read on 13/11/2026. Use this file to answer "which NASA risk does this indicator cover?" and for the pitch.

Portal of all risks: https://www.nasa.gov/hrp/risks/
Evidence reports (one per risk): https://humanresearchroadmap.nasa.gov/evidence/

## Summary table

| Official NASA risk (HRP) | What NASA says, in short | ORBITAL indicator that covers it | Level in the MVP |
| --- | --- | --- | --- |
| Cardiovascular adaptations | Microgravity changes the heart and vessels: clots, arrhythmias, low blood pressure and fainting on landing | Blood pressure, resting heart rate | MVP (1 and 2) |
| Inadequate sleep and irregular schedules | About 16 sunrises a day on the ISS; LED lighting is used and caffeine is studied | Sleep hours, reaction test (PVT) | MVP (4 and 5) |
| Behavioral conditions and psychiatric disorders | Isolation and confinement: anxiety and depression; journals, plants and windows help; studied in HERA (45 days) | Mood scale (VAS), PVT | MVP (5) |
| SANS (neuro-ocular syndrome) | About 70 % of ISS astronauts have swelling at the back of the eye; higher risk on long missions; checked with a fundoscope | Amsler grid, acuity, visual symptoms | MVP (6) |
| Bone changes and fracture | 1–1.5 % of bone density is lost per month; scans before and after; bisphosphonates | Minutes of loaded exercise | Matrix (not MVP) |
| Cardiorespiratory and musculoskeletal fitness | Average loss of ~10–12 % of capacity; between 12 % and 38 % lose more than 20 %; ~1.5 h/day of exercise, 6–7 days a week; periodic self-assessments | Minutes of exercise, heart rate | Matrix (not MVP) |
| Altered immune response | Reactivation of latent viruses, cold sores, rashes, allergies; blood, saliva and urine samples | Temperature and symptoms | Matrix (not MVP) |
| Radiation (cancer and degenerative effects) | Risk of cancer and tissue damage; instruments on the ISS; personalized risk; shielding for Artemis | Cumulative radiation dose | MVP (7) |
| Inadequate food and nutrition | Menu fatigue; more than 200 foods available; less sodium | Body mass and intake | Matrix (not MVP) |
| Closed environment (CO₂) | See NASA-STD-3001 in `umbrales.md` | Cabin CO₂ and headache | MVP (7) |
| Metabolism (glucose) | Not an HRP risk of its own; the CSA describes insulin resistance in space; the challenge statement asks for it | Glucose | MVP (3) |

> If the jury asks about glucose: it is not listed as an independent HRP risk, but the CSA documents insulin resistance in space, with a risk of type 2 diabetes (see the CSA section). The challenge statement also asks for it. Clinical thresholds from the ADA.

## Detail per risk

### Cardiovascular
- **NASA:** the formal name is "Risk of Cardiovascular Adaptations Contributing to Adverse Mission Performance and Health Outcomes". It merges three earlier risks: orthostatic intolerance on return to gravity, heart rhythm problems and cardiovascular disease from radiation.
- **Key fact:** in an in-flight study, 6 of 11 crew members (55 %) had stagnant or reversed flow in the internal jugular vein by day 50, and one had a clot that needed treatment on board.
- **NASA countermeasures:** exercise, diet, compression garments, fluid loading.
- **Pitch line:** "ORBITAL watches blood pressure and heart rate against each astronaut's baseline, because NASA recognizes that the heart adapts and that the risk grows on long missions."
- Page: https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
- HRR page: https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179
- For Mars (730–1224 days), NASA rates it as "requires mitigation" (4x4 rating in operations, HSRB 5/2024).

### Sleep
- **NASA:** "Risk of Inadequate Sleep and Irregular Schedules". About 16 sunrises a day in orbit disrupt the circadian rhythm.
- **Key fact:** sessions of 6 h or less were linked to slower psychomotor speed, more stress and more tiredness (ISS sleep studies).
- **Artemis II:** 8 h of sleep were scheduled, with the four crew members sleeping at the same time.
- **Pitch line:** "We measure sleep hours and reaction time because NASA links sleeping 6 h or less with worse performance."
- ISS sleep source: https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/

### Behavioral
- **NASA:** "Risk of Behavioral Conditions and Psychiatric Disorders". Isolation and confinement favor anxiety and depression.
- **NASA countermeasures:** keeping a journal, tending plants, looking out the window; research in the HERA analog (45-day missions).
- **Pitch line:** "ORBITAL's mood scale takes seconds and follows the visual scale format NASA already uses."

### SANS
- **NASA:** "Risk of Spaceflight Associated Neuro-ocular Syndrome". About 70 % of ISS astronauts show swelling at the back of the eye. The risk is higher on long missions.
- **How it is measured on the ISS:** fundoscope, optical coherence tomography, acuity tests.
- **Pitch line:** "The app does not replace the fundoscope: with the Amsler grid it detects changes between check-ups and warns earlier."
- HRR page: https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105

### Bone
- **NASA:** "Risk of Bone Fracture due to Spaceflight-induced Changes to Bone". Loss of 1–1.5 % of density per month; above 100 days of mission the risk increases.
- **Pitch line:** "We log the minutes of loaded exercise, the main countermeasure NASA uses against bone loss."
- HRR page: https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=77

### Physical fitness
- **NASA:** "Risk of Reduced Cardiorespiratory and Musculoskeletal Fitness". Average loss of ~10–12 %; between 12 % and 38 % of crew members lose more than 20 %. Exercise of ~1.5 h/day, 6–7 days a week.
- **Artemis II (Orion):** a flywheel device, about 30 minutes a day per astronaut.
- **Note for thresholds:** since 14/11 our exercise proposal uses ~1.5 h/day, 6–7 days a week (this NASA HRP figure; see `umbrales.md`). If the scenario is Orion or Artemis, the daily target is lower: say so and do not invent a new number.
- HRR page: https://humanresearchroadmap.nasa.gov/risks/?i=180

### Immune
- **NASA:** "Risk of Altered Immune Response". Reactivation of latent viruses, cold sores, rashes, allergies. Blood, saliva and urine are analyzed.
- **Artemis II:** Immune Biomarkers study with dried saliva and blood.
- **Pitch line:** "Temperature and symptoms are the early signal the crew can log without a lab."
- HRR page: https://humanresearchroadmap.nasa.gov/risks/?i=85

### Radiation
- **NASA:** risk of cancer and of degenerative effects. There are instruments on the ISS; work is under way on personalized risk and on shielding for Artemis.
- **CSA CANS:** neutrons are about 30 % of the radiation on the ISS; the monitor is continuous and autonomous.
- **Pitch line:** "ORBITAL shows the cumulative dose against the NASA-STD-3001 career limit."

### Nutrition
- **NASA:** "Risk of Performance Decrement and Crew Illness Due to Inadequate Food and Nutrition". Menu fatigue; more than 200 foods; sodium was reduced.
- **Pitch line:** "Weekly weight detects the loss of mass NASA documents on long flights."

## How NASA measures today (to compare with ORBITAL)

| NASA study | What it measures | When | Relation to ORBITAL |
| --- | --- | --- | --- |
| ARCHeR (Artemis II) | Well-being, activity, sleep and interactions; wrist actigraph | Before, during and after; in flight only actigraphy | Same approach to sleep and activity, plus mood and reaction |
| Standard Measures (ISS) | Fixed set of physiological and psychological measures; blood, urine, stool, saliva samples | Before, during and after | Inspires our personal baseline |
| Artemis II Standard Measures | Surveys, saliva, balance, muscle, eye and brain, motion sickness | From ~6 months before to ~1 month after | Same criterion: compare against the astronaut themselves |
| Bio-Monitor / Astroskin (CSA) | Heart rate, breathing, SpO₂, blood pressure, temperature, activity | 48-hour sessions on the ISS | Source of our simulated wearable data |

**Message for the jury (approved on 14/11; wording made more precise after the external review):** NASA and the CSA already collect several of these signals in specific studies and tools (e.g. Standard Measures, Bio-Monitor, Space Health, Tempus Pro, Polaris Dawn), often analyzed on the ground or dependent on a connection. ORBITAL is a proposal to bring them together on board, against each astronaut's baseline, working offline.

**Long version:** NASA already measures these signals, but in separate sessions, and many data are analyzed on Earth. ORBITAL brings the signals together in a single view on board, against each person's baseline, with clear escalation. That points to the autonomy a mission to Mars needs, with communication delays.

## Remaining HRP risks (read on 14/11, 00:00)

NASA lists **17 risks** at https://www.nasa.gov/hrp/risks/. The ones missing above:

| Risk | What NASA says | Relation to ORBITAL |
| --- | --- | --- |
| Hypoxia | Partial cabin depressurization for spacewalks can cause mild hypoxia: confusion, headache, vision changes and sleep problems. NASA considers it relatively low and is building monitoring protocols. It gives no SpO₂ values | Supports SpO₂ as an MVP indicator, plus symptoms (headache, vision, sleep). Our SpO₂ cuts remain clinical (WHO) |
| Sensorimotor and vestibular function | Most astronauts get space motion sickness; motion sickness on Earth does not predict it in space; disorientation when gravity changes | The "dizziness or disorientation" box is already in the MVP (14/11). In ORBITAL it is linked mainly to orthostatic intolerance (cardiovascular risk: low blood pressure and fainting on landing; gravity fields hazard: dizziness and fainting on landing), not only to this sensorimotor risk. The link between dizziness and low blood pressure is a *Proposal* |
| Teamwork | Risk that team cooperation and communication fail: communication delays, isolation, small habitat. NASA does not describe how it is measured | Future work: optional "conflict with the team" VAS |
| Host–microorganism interaction | Skin and gut microbiome change in space; impact on disease unknown; samples and swabs; 2-week quarantine before flight | Covered by temperature and symptoms |
| Decompression sickness, spacewalks (EVA), dynamic loads, operations support | Risks of spacewalks, landing and systems | Out of the MVP's scope |

## Relevant ongoing studies (Ongoing HRP Research)

- **Tempus Pro:** a commercial telemedicine device that tests whether it can collect and integrate vital data and images for near-real-time diagnosis on distant missions, because of communication delays. It is the closest precedent to ORBITAL: NASA is already looking to integrate vital data on board. https://www.nasa.gov/reference/tempus-pro/
- **Venous Haemostasis (with ESA):** jugular ultrasound, blood tests and **blood pressure checks before and during flight** to study clot risk; only some astronauts have the problem and it is not known why. Supports the personal baseline. https://www.nasa.gov/reference/venous-haemostasis/
- **CIPHER:** 14 investigations on eye, bone, heart, brain, balance, muscle, telomeres and immunity, on missions of up to a year, with data before, during and after. https://www.nasa.gov/reference/cipher/
- **Immune Biomarkers (Artemis II), Thigh Cuff, B-Complex, Zero T2:** listed at https://www.nasa.gov/hrp/ongoing-hrp-research/

## Canadian Space Agency (CSA)

- Infographic "How does space affect the human body?": in space, **insulin resistance can develop, which can lead to type 2 diabetes**, and vessels age faster; bone up to 1.5 % per month. **This is the space rationale for glucose.** https://www.asc-csa.gc.ca/eng/multimedia/search/image/8056
- "Why do we conduct science experiments in space?": missions to the Moon and Mars mean more weightlessness, more radiation, longer isolation, communication delays and less ability to rely on Earth for emergency medical help. https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp

## The 5 hazards – key facts (read on 14/11)

| Hazard | Key fact | Use in ORBITAL |
| --- | --- | --- |
| Distance from Earth | Communication delay of **up to 20 minutes each way**; HERA simulates up to 5 minutes each way; crews must solve medical emergencies with limited help. https://www.nasa.gov/hrp/hazard-distance-from-earth/ | Central argument of the pitch: that is why ORBITAL decides the level on board and works offline |
| Radiation | Astronauts' effective doses of about 50 to 2,000 mSv; 1 mSv equals about 10 chest X-rays; galactic cosmic rays go through the spacecraft almost entirely. https://www.nasa.gov/missions/analog-field-testing/why-space-radiation-matters/ | Context for the cumulative dose; the limit is still the NASA-STD-3001 one |
| Isolation and confinement | Sleep loss, circadian misalignment and work overload can lower performance; NASA develops ways to monitor behavioral health and detect risk factors early; it uses journals and light therapy; HERA 45 days, CHAPEA one year. https://www.nasa.gov/hrp/hazard-isolation-and-confinement/ | Supports sleep + mood + PVT as early detection |
| Gravity fields | Bone −1 to −1.5 %/month; fluid shift toward the head (vision); higher risk of kidney stones from dehydration and calcium; on landing, dizziness and fainting. https://www.nasa.gov/hrp/hazard-gravity-fields/ | Supports vision, exercise and blood pressure |
| Hostile and closed environments | Temperature, pressure, light, noise and space; microbes pass more easily between people; stress hormones and immune changes. It gives no CO₂ values. https://www.nasa.gov/hrp/hazard-hostile-closed-environments/ | Temperature and symptoms; CO₂ comes from NASA-STD-3001 |

Standard Measures started in 2018 and gathered data from more than 30 astronauts on the ISS; Artemis II adds them to the same database. https://www.nasa.gov/reference/artemis-ii-standard-measures/

## Direct precedents and support (full review of 14/11)

| Precedent | What it does | Difference with ORBITAL |
| --- | --- | --- |
| CSA Space Health (2023–2028, 10 astronauts) | Bio-Monitor 48 h + "Artemis" AI platform that looks for patterns; data downloaded to Earth; live analysis is a plan | ORBITAL analyzes on board |
| CSA Bio-Monitor | Shirt: pulse, ECG, blood pressure, breathing, skin temperature, SpO₂, activity | Source of the simulated data |
| Tempus Pro / Polaris Dawn | Integrate blood pressure, heart rate, breathing and temperature with telemedicine (Polaris uses Starlink) | Depend on the connection |
| CSA ACTIS | Clot risk on board in ~15 min, result on the device | Same "on board first" logic |
| NASA Medical Data Architecture | Autonomous clinical decision support, with or without Earth, with ML | ORBITAL is a prototype for that need |

**Useful facts:** blood pressure: up to 80 % feel lightheaded on return (CSA BP Reg); arteries 17–30 % stiffer in 6 months (CSA Vascular). Glucose: documented insulin resistance (CSA Vascular). PVT: NASA uses a 10-minute vigilance self-test. Radiation: ~150 µSv/day from neutrons alone on the ISS (CSA Radi-N2).

**Radiation, how to present it:** on the ISS, personal dosimeters are analyzed on Earth; there is no real-time personal reading (NASA Space Radiation Analysis Group). ORBITAL's continuous reading is **simulated** and points to autonomous monitors like CANS (CSA).

Full inventory of the review: https://claude.ai/artifact/5S38cMgQtKpaTn85CtLshV

## Sources of this reference

- NASA HRP. Risks of Human Spaceflight. https://www.nasa.gov/hrp/risks/
- NASA. Risk of Cardiovascular Adaptations. https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/
- NASA HHP. CV Risk. https://www.nasa.gov/directorates/esdmd/hhp/cv-risk/
- NASA Human Research Roadmap: risk pages i=179 (CV), 105 (SANS), 77 (bone), 180 (physical fitness), 85 (immune).
- NASA. ARCHeR. https://www.nasa.gov/reference/archer/
- NASA. Artemis II Crew Both Subjects and Scientists in NASA Deep Space Research. https://www.nasa.gov/general/artemis-ii-crew-both-subjects-and-scientists-in-nasa-deep-space-research/
- NASA. Crew Systems (flywheel and sleep on Orion). https://www.nasa.gov/reference/crew-systems/
- NASA. Science in Space: Sleep on Station (2023). https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023-sleep-on-station/
- CSA. CANS (neutron monitor), challenge resource.
