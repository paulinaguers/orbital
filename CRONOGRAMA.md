# Cronograma – ORBITAL · NASA Space Apps 2026

Agenda de trabajo del evento. La lee el agente `coordinador` (comando `/estado`). Se marca cada tarea con `[x]` al terminarla y se anota el hash del commit.

**Cómo leerlo**

- Tres hilos, uno por cuenta de Claude, pero los tres integrantes supervisan todos: la IA ejecuta y el equipo dirige, revisa y decide.
- Cada hilo mantiene la misma herramienta y lógica de punta a punta, para no cambiar de contexto.
- Los **puntos de control** (`/estado`) son fijos. Los **cortes** deciden qué se deja afuera para proteger el MVP.
- Horarios del evento: sáb 10:00–13:00 y 14:00–19:00 · dom 09:30–15:00 (mentoría 11:30) · repo congelado dom 15:00 · jurado dom 16:00 · carga en plataforma hasta dom 23:59.
- **Reglas de entrega (guías oficiales del 13/11):** todo en inglés · demo = video ≤ 30 s con subtítulos en inglés (pasarse descalifica para el juicio global) · repo y video públicos sin login · datos de NASA como parte central · SI declarada y marcada · sin logos de NASA ni de agencias socias · licencia Apache 2.0.

**Ya hecho antes del evento**

- [x] Repo creado en GitHub. **Queda vacío hasta el sáb 10:00 por decisión del equipo**: es normal que no tenga commits ni remoto antes de esa hora
- [x] Propuestas de dashboards (imágenes), guardadas fuera del repo; se copian a `docs/dashboards/` el sáb 10:00
- [x] Documentos técnicos: indicadores, fundamentación, escalas, capa de ML
- [x] Estructura `.claude/` (skills, agentes, comandos), `CLAUDE.md`, este cronograma y la bitácora

---

## Viernes 13/11 (preparación, sin código)

- [ ] Cada integrante: proyecto de Claude con instrucciones y documentos
- [ ] Cada integrante: subir las 3 skills a claude.ai
- [ ] Instalar Claude Code (al menos cuenta del Hilo A) y probarlo
- [x] Leer Project Submission Guide, Judging Guide y recursos del desafío (revisión completa del 14/11, 01:00)
- [x] Pasada única de ajuste a documentos y skill clínica según las guías
- [ ] Subir los PDF de las dos guías al proyecto de Claude de cada integrante

---

## Sábado 14/11

### 10:00–10:30 · Arranque (los tres juntos)

- [ ] Una persona clona el repo, copia la carpeta de configuración (`.claude/`, `CLAUDE.md`, `CRONOGRAMA.md`, `BITACORA.md`, `docs/`) más dashboards, documentos y guías NASA en `docs/`, hace commit y push; los otros dos clonan y verifican que ven las skills y los agentes
- [x] Stack A decidido el 13/11 (Streamlit como rescate)
- [ ] Agregar `LICENSE` (Apache 2.0) desde GitHub: Add file → Create new file → `LICENSE` → Choose a license template → Apache License 2.0 → commit
- [ ] Copiar los PDF de las guías de NASA a `docs/guias-nasa/`
- [ ] Confirmar los 7 indicadores del MVP y el alcance (revisar contra las guías de NASA)
- [ ] Elegir el dashboard base entre las propuestas existentes
- [ ] Entrada en bitácora: decisiones de arranque

### 10:30–13:00 · Bloque 1

| Hilo | Tareas | Entregable |
| --- | --- | --- |
| A · Datos y motor | Estructura `backend/`; formato de datos (tablas `measurements`, `self_reports`, `baselines`, `alerts`, `injected_anomalies`; nombres en inglés); simulador con ruido realista, ritmo día/noche y **anomalías inyectadas con fecha** | Simulador que genera un CSV/SQLite de un astronauta de 60+ días, con test |
| B · Pantallas | Maqueta de la pantalla principal desde el dashboard elegido (artifact de diseño); prompts para Google AI Studio. **Cada tarjeta muestra el riesgo oficial de NASA que vigila** (ej. "NASA HRP risk: SANS") y su umbral con fuente. **Sin logos de NASA ni de la CSA.** Textos de la app en inglés | Maqueta aprobada por el equipo |
| C · Contenido | Textos de cada alerta (verde/amarillo/naranja/rojo) y recomendación por indicador, desde la skill clínica; criterios de los casos de prueba clínicos | Archivo de textos de alertas y lista de casos de prueba |

- [ ] **11:00 · `/estado`**
- [ ] **13:00 · `/estado`** (antes del almuerzo)

### 13:00–14:00 · Almuerzo

### 14:00–19:00 · Bloque 2

| Hilo | Tareas | Entregable |
| --- | --- | --- |
| A · Datos y motor | Núcleo: umbrales clínicos, línea de base (prevuelo o días 4–10), puntaje z, escalamiento; tests por regla; **API básica** (opción A) o funciones listas para Streamlit (opción B) | Núcleo con tests verdes + API mínima |
| B · Pantallas | Pantallas con datos de ejemplo: figura humana con colores por sistema, semáforo, detalle por indicador | Pantallas navegables con datos fijos |
| C · Contenido | Validar resultados del núcleo contra los casos clínicos; arrancar README (ES) | Casos validados + borrador README |

- [ ] **16:00 · `/estado`**
- [ ] **19:00 · `/estado` + CORTE 1**: ¿núcleo y API básica pasan sus tests? Si no, la capa de ML queda afuera y el domingo se usa para cerrar el MVP. Revisión completa del núcleo con el subagente `revisor`.
- [ ] Entrada en bitácora: estado de cierre del sábado

---

## Domingo 15/11

### 09:30–11:30 · Bloque 3

| Hilo | Tareas | Entregable |
| --- | --- | --- |
| A · Datos y motor | **Si pasó el corte 1:** capa de ML con arranque en frío (etapas 0/1/2, aviso "ML calibrando"), Mahalanobis o Isolation Forest según datos, evaluación contra anomalías inyectadas. **Si no:** terminar núcleo y API | Tabla de evaluación reglas vs. reglas + ML, o núcleo cerrado |
| B · Pantallas | Gráficos de evolución; conexión con la API | App conectada |
| C · Contenido | Guion del pitch (jurado local) y del **video demo de 30 s** con subtítulos en inglés (pauta de la Submission Guide: 0:00 equipo · 0:02 desafío · 0:05 nombre y lema · 0:10 cómo funciona y datos de NASA/CSA · 0:20–0:30 futuro); validar textos en pantalla | Guion v1 |

- [ ] **11:30 · Mentoría + CORTE 2**: ¿el ML detecta mejor que las reglas sin más falsas alarmas? ¿El Hilo B está al día? Si no, el ML se apaga y queda como trabajo futuro (rama aparte).

### 11:30–15:00 · Bloque 4

| Hilo | Tareas | Entregable |
| --- | --- | --- |
| A · Datos y motor | Escenarios de demo (sano, deterioro, emergencia, y calibración del ML si aplica); `demo.json` | Escenarios listos |
| B · Pantallas | Modo demo; alerta ML en pantalla si aplica; pulido visual | Demo estable sin depender de la API |
| C · Contenido | README final **inglés primero**, metodología y declaración de SI con la skill `documentacion-bilingue`; textos del formulario en inglés; lista completa de referencias; grabar y subtitular el video de 30 s (sin pasarse); ensayo del pitch | Documentación y video listos |

- [ ] **13:30 · `/estado`** (última revisión antes del congelado)
- [ ] **14:30 · Prueba completa de la demo de punta a punta**
- [ ] **15:00 · REPO CONGELADO**
- [ ] **15:00 · paulinaguers** (dueña del repo) lo pasa a público: Settings → General → Danger Zone → Change visibility → Make public
- [ ] Otro integrante prueba en ventana de incógnito: link del repo y link del video (YouTube o Drive, público, sin login)

### 15:00–16:00 · Preparación del jurado

- [ ] Ensayo final del pitch; cada integrante puede explicar su hilo

### 16:00 · Jurado

### Desde las 16:00 · Carga en la plataforma (cierra 23:59, hora de Rosario)

- [ ] **Primer envío completo apenas termina el jurado** (se puede reenviar hasta las 23:59; vale el último)
- [ ] Campos en inglés: Project Name · High-Level Summary · Link to Demo · Link to Final Project · Detailed Description · Use of SI · NASA Data · Partner Data and References
- [ ] Tildar Terms and Conditions y Confirm All Work is Original; verificar el banner de confirmación
- [ ] Entrada final en bitácora

---

## Registro del coordinador

<!-- El agente coordinador agrega aquí un resumen breve en cada punto de control -->
