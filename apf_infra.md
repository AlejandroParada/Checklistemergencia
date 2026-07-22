# apf_infra — Template de bootstrap del AI Pipeline Framework (APF)

**TEMPLATE_VERSION:** 1.1 · **Última actualización del template:** 2026-07-21 · **Fuente:** capítulos 17-26 de *La Expansión Caótica del Software*

> Este archivo es **portable**. Se copia tal cual a la raíz de cualquier otro repositorio. Cuando una IA de codificación (Cursor, u otra) lo lea y el usuario le pida "definir la arquitectura APF basada en este template", la IA debe crear la carpeta `apf_infra/` con todos sus artefactos, usando el contenido de este documento como fuente exclusiva de verdad.

Este archivo no es capítulo del libro *La Expansión Caótica del Software* — es una herramienta derivada de él. Vive en `docs-internos/` porque no forma parte del sitio VitePress ni requiere traducción i18n: es un artefacto de trabajo, no contenido editorial. El marco teórico completo está desarrollado en los capítulos 17 a 26 del libro (`docs/es/capitulos/17-el-ai-pipeline-framework.md` en adelante); este template es su traducción operativa a carpetas y archivos reales.

---

## 🧭 Qué es el APF, en una frase

El **AI Pipeline Framework (APF)** estructura el desarrollo de software asistido por IA en fases verificables (plan base → expansión → roadmap → auditoría V&BS → implementación DEV-QA), con tres roles fijos (BI, QA, DEV) y un conjunto de **artefactos persistentes** (BCM, Modelos Maestros, Roadmaps, Racontos, Migraciones, Logs/Feedback/CRITICAL_TASK, KPIs, XCM) que acumulan conocimiento institucional entre iteraciones. No reemplaza a Scrum/Kanban: vive como una capa de precisión sobre cualquier metodología ágil existente.

`apf_infra/` es el hogar físico de esos artefactos dentro de un proyecto concreto.

---

## 📖 Glosario mínimo (si nunca leíste el libro, empezá acá)

| Término | Qué significa |
|---|---|
| **BI / QA / DEV** | Los tres roles fijos del APF. BI traduce al cliente en casos de uso verificables. QA define y corre los juegos de prueba, y valida contra el BCM. DEV construye el roadmap, se autoaudita y implementa. Nunca se fusiona DEV con BI o QA. |
| **BCM** (Business Core Master) | La "constitución" del negocio: qué datos, roles, usuarios, operaciones y reglas de persistencia existen — en lenguaje agnóstico de tecnología. Fuente de verdad por encima de cualquier decisión de implementación. |
| **BCM-0** | La primera versión honesta del BCM cuando se adopta APF sobre un sistema que ya existe: incompleta a propósito, con lagunas y zonas grises marcadas explícitamente en vez de ocultas. |
| **Modelo maestro** | Documento de reglas que le dice a la IA qué hacer, qué no hacer, y cómo se evalúa si el resultado es correcto, en un área específica (dev, qa, ba, roadmap, audit, migración, raconto). Crece cada vez que un error no debería repetirse. |
| **Modelo `_esp`** | Un modelo maestro especializado que hereda de uno base y agrega reglas para un contexto recurrente (ej. `dev_esp_api`). |
| **Roadmap** | El plan de implementación de una iteración: detallado, eficiente, específico y alineado al BCM. Pasa por auditoría antes de que DEV escriba código. |
| **V&BS** | Vulnerabilidades y Puntos Ciegos (*Blind Spots*). La auditoría que revisa el roadmap antes de implementar — no es revisión de código, es revisión del plan. |
| **Raconto** | El documento narrativo de cada iteración cerrada: qué se hizo, quién, qué se descartó y por qué, impacto semafórico, patrones aplicados. Existe en versión `_simp` (no técnica) y `_tec` (técnica). |
| **CRITICAL_TASK** | Se crea cuando un patrón de error se repite o se propaga a varios módulos — no es una corrección puntual, sigue el pipeline completo y termina generando reglas nuevas en los modelos maestros. |
| **XCM** | Técnica de "maduración por escala": evaluar el mismo artefacto en escalas 1-10, 1-100 y 1-1000 sucesivas para forzar niveles de refinamiento que una única evaluación no alcanza. |
| **Análisis cruzado** | Técnica complementaria a XCM: una IA externa sin contexto analiza un artefacto, la IA habitual del proyecto verifica ese análisis, y luego ambas buscan juntas puntos ciegos que ninguna de las dos vería sola. |
| **HPer / MPer** | Clasificación de modelos de IA por capacidad: HPer (alta performance) para roadmap y auditoría, que requieren razonamiento profundo; MPer (performance media) para implementación, que requiere ejecución precisa y es más económica. |

---

## 🤖 Instrucciones para la IA — leer antes de actuar

Si estás leyendo este archivo porque el usuario te pidió instanciar, inicializar o "definir la arquitectura APF" en el proyecto actual, seguí este procedimiento exacto:

1. **Verificá si ya existe `apf_infra/`** en la raíz del repo. Si existe y tiene contenido, no sobreescribas archivos existentes: mostrá un diff/resumen de qué falta y proponé completarlo, no reemplazarlo.
2. **Detectá el contexto real del proyecto** antes de escribir ningún archivo: nombre del proyecto (`package.json`, `pyproject.toml`, `.csproj`, `go.mod`, README existente, nombre de la carpeta raíz), stack tecnológico principal, y si el proyecto ya tiene código (adopción sobre sistema existente → usar el flujo BCM-0 del apartado de BCM) o si nace desde cero (adopción greenfield → BCM directo, sin fase de ingeniería inversa).
3. **Creá exactamente el árbol de carpetas y archivos** listado en la sección "Árbol completo" más abajo, en la raíz del repositorio (sibling de `src/`, `docs/`, etc., no dentro de ellas). Todos los archivos se guardan en **UTF-8 sin BOM** — mismo estándar que el resto de este proyecto.
4. **Para cada archivo**, usá el contenido provisto en la sección correspondiente de este documento como base literal, reemplazando los placeholders entre corchetes (`[PROYECTO]`, `[STACK]`, `[FECHA]`, `[EQUIPO]`, `[DESCRIPCIÓN]`) por los valores reales que detectaste en el paso 2. Si no podés inferir un valor con confianza, dejá el placeholder y preguntale al usuario en el resumen final — no inventes datos de negocio.
5. **Creá también las dos reglas persistentes** descriptas en la sección "Regla persistente para la IA del proyecto destino": un puntero corto siempre activo y un checklist detallado que se activa solo sobre carpetas de código real (ajustá el `globs` de la segunda a la estructura real del proyecto). Si la herramienta de IA del proyecto destino no es Cursor, aplicá el mismo criterio de dos niveles al mecanismo equivalente (p. ej. `AGENTS.md` o `CLAUDE.md`). Esto es lo que garantiza que, de ahí en más, cualquier sesión de IA sobre ese proyecto consulte `apf_infra/` antes de generar código — sin inflar el contexto de tareas triviales.
6. **No implementes funcionalidad de negocio todavía.** Este paso solo crea el andamiaje (carpetas + modelos preliminares). El contenido real de negocio del BCM, las reglas específicas de los modelos maestros y los primeros roadmaps se completan en las siguientes iteraciones, con el usuario.
7. **Al terminar, mostrá al usuario:**
   - El árbol de carpetas creado.
   - Qué placeholders quedaron pendientes de completar y por qué.
   - Los próximos pasos sugeridos, en este orden: (a) completar `apf_infra/bcm/BCM.md` con las reglas de negocio conocidas, (b) revisar y ajustar `apf_infra/modelos_maestros/base/*.md` con las convenciones reales del stack, (c) escribir el primer plan base en `apf_infra/roadmaps/plan_base/`.
8. **Registrá la inicialización** agregando una entrada con la fecha de hoy en `apf_infra/modelos_maestros/CHANGELOG.md`, y anotá el `TEMPLATE_VERSION` de este archivo (ver cabecera arriba) en `apf_infra/README.md`. Eso permite, más adelante, saber si el `apf_infra/` de este proyecto quedó desactualizado respecto a versiones más nuevas del template y vale la pena resincronizar.

No preguntes permiso para crear la estructura de carpetas en sí — eso es lo que este template existe para hacer. Preguntá solo cuando falte información de negocio que no podés inferir del código o del pedido del usuario.

---

## 🌳 Árbol completo a crear

```
apf_infra/
├── README.md
├── 00-roles-y-proceso.md
├── bcm/
│   ├── BCM.md
│   ├── bcm-0-inicial.md
│   └── lagunas_zonas_grises.md
├── modelos_maestros/
│   ├── base/
│   │   ├── dev_maestro.md
│   │   ├── qa_maestro.md
│   │   ├── ba_maestro.md
│   │   ├── roadmap_maestro.md
│   │   ├── audit_maestro.md
│   │   ├── migracion_maestro.md
│   │   └── raconto_maestro.md
│   ├── especializados/
│   │   └── README.md
│   └── CHANGELOG.md
├── roadmaps/
│   ├── README.md
│   ├── plan_base/
│   │   └── _template_plan_base.md
│   ├── plan_expandido/
│   │   └── _template_plan_expandido.md
│   ├── activos/
│   │   └── _template_roadmap.md
│   └── completados/
│       └── .gitkeep
├── auditorias_vybs/
│   ├── README.md
│   ├── _template_auditoria.md
│   └── historico/
│       └── .gitkeep
├── migraciones/
│   ├── README.md
│   └── _template_migracion.md
├── racontos_del_sistema/
│   ├── shared/
│   │   ├── raconto.css
│   │   └── raconto.js
│   ├── index.html
│   ├── generar_index.js
│   ├── _template_simp.html
│   └── _template_tec.html
├── logs_feedback/
│   ├── README.md
│   └── critical_tasks/
│       └── _template_critical_task.md
├── kpis/
│   └── dashboard.md
└── xcm/
    ├── README.md
    └── analisis_cruzado.md
```

---

## 📄 `apf_infra/README.md`

```markdown
# apf_infra — Infraestructura APF de [PROYECTO]

Esta carpeta contiene todos los artefactos persistentes del AI Pipeline Framework (APF) aplicados a [PROYECTO]. Es la memoria institucional del proyecto: lo que no vive acá, no está garantizado que sobreviva a la rotación del equipo.

**Instanciado desde `apf_infra.md` versión:** [TEMPLATE_VERSION] · **Fecha de instanciación:** [FECHA]

**Regla de oro:** ninguna IA ni ningún desarrollador debería empezar a implementar sin haber consultado antes `bcm/BCM.md` y los modelos maestros relevantes en `modelos_maestros/base/`.

## Mapa de carpetas

| Carpeta | Qué contiene | Cuándo se toca |
|---|---|---|
| `bcm/` | La constitución del negocio: datos, roles, usuarios, operaciones, persistencia. Agnóstica de tecnología. | Cada vez que se descubre o cambia una regla de negocio. |
| `modelos_maestros/` | Reglas de comportamiento para la IA en cada rol/área (dev, qa, ba, roadmap, audit, migración, raconto), con herencia vía `_esp`. | Cada vez que un error no debería repetirse, o una instrucción se repite y conviene fijarla como regla. |
| `roadmaps/` | Plan base (fase 1) → plan expandido (fase 2) → roadmap auditado (fase 3-4) → completados. | Al iniciar cada nueva funcionalidad o iteración. |
| `auditorias_vybs/` | Auditorías de Vulnerabilidades y Puntos Ciegos sobre cada roadmap, antes de implementar. | Antes de que DEV escriba la primera línea de código de un roadmap. |
| `migraciones/` | Registro versionado y no destructivo de cambios de esquema. | Cada vez que un roadmap requiere un cambio de esquema. |
| `racontos_del_sistema/` | Memoria narrativa de cada iteración completada, en versión `_simp` y `_tec`. | Al cierre de cada iteración — una iteración no está "terminada" sin su raconto. |
| `logs_feedback/` | Política de logging defensivo, captura de feedback de usuario, y CRITICAL_TASKs derivadas de patrones. | Continuo (logging) y cuando aparece un patrón de error recurrente (CRITICAL_TASK). |
| `kpis/` | Tablero de indicadores del pipeline (iteraciones por caso de uso, tiempo de entrega, errores, reglas nuevas, etc.). | Al cierre de cada iteración/sprint. |
| `xcm/` | Técnica de maduración por escala (X→C→M) para llevar cualquier artefacto a su mejor versión. | Cuando un artefacto tiene alto impacto/larga vida y vale la pena pulirlo antes de fijarlo como referencia. |

## Quién mantiene qué (resumen — el detalle completo está en el encabezado `MANTENEDOR` de cada modelo)

| Modelo maestro | Mantenedor |
|---|---|
| `dev_maestro` | DEV |
| `qa_maestro` | QA |
| `ba_maestro` | BI |
| `roadmap_maestro` | DEV construye; BI+QA validan alineación en cada auditoría |
| `audit_maestro` | BI + QA (custodios de las reglas — no DEV, aunque DEV la ejecuta) |
| `migracion_maestro` | DEV |
| `raconto_maestro` | DEV redacta; BI valida accesibilidad de la versión `_simp` |

## Estado de madurez

Este `apf_infra/` fue inicializado el [FECHA] a partir del template `apf_infra.md`. Todos los artefactos parten de un **modelo preliminar (v0)**: son puntos de partida honestos, no versiones completas. Se espera que crezcan iteración a iteración — ver `00-roles-y-proceso.md` para la secuencia de adopción recomendada.
```

---

## 📄 `apf_infra/00-roles-y-proceso.md`

```markdown
# Roles y proceso APF — [PROYECTO]

## Los tres roles (no fusionar DEV con BI/QA)

- **BI (Business Intelligence)** — traduce los requerimientos del cliente/negocio en casos de uso secuenciales, detallados y verificables. Trabaja contra `../bcm/BCM.md`. No termina su trabajo hasta que un caso de uso es testeable.
- **QA (Quality Assurance)** — define y ejecuta los juegos de prueba alineados a los casos de uso de BI. Verifica también que la implementación no contradiga el BCM, no solo que cumpla el caso de uso. No termina hasta que los juegos de prueba cubren todos los casos definidos.
- **DEV (Development)** — construye el roadmap a partir del caso de uso, se autoaudita con `audit_maestro` (V&BS), implementa, y cierra el ciclo con evidencia. No implementa sin caso de uso listo. No adivina.

En equipos pequeños, BI y QA pueden fusionarse en una misma persona. **DEV nunca debe fusionarse con BI ni con QA.**

## Las fases del pipeline

1. **Plan base** (`roadmaps/plan_base/`) — intención en lenguaje natural, sin decisiones técnicas.
2. **Expansión del plan** (`roadmaps/plan_expandido/`) — la IA piensa, no implementa: pasos detallados, supuestos explícitos, dependencias.
3. **Roadmap** (`roadmaps/activos/`) — detallado, eficiente, específico, alineado al BCM.
4. **Auditoría V&BS** (`auditorias_vybs/`) — vulnerabilidades y puntos ciegos, antes de escribir código.
5. **Implementación DEV-QA** — ciclos cortos hasta que cada caso de uso pasa. Regla empírica: bien ejecutadas las fases 1-4, el 85-90% del desarrollo se completa en los primeros dos días de implementación.

Al cerrar una iteración: raconto en `racontos_del_sistema/`, actualización de `kpis/dashboard.md`, y nuevas reglas (si las hay) en `modelos_maestros/`.

## Secuencia de adopción (proyecto nuevo)

- **Semana 1:** roles definidos, `modelos_maestros/base/dev_maestro.md` y `qa_maestro.md` con la versión inicial real del stack.
- **Semana 2:** fases 1-3 sobre un caso de uso real, sin auditar todavía. Observar dónde aparece la ambigüedad.
- **Semana 3:** incorporar la auditoría V&BS. Cada hallazgo se convierte en regla nueva.
- **Semana 4:** primer raconto completo. Evaluar qué secciones costó más completar — son las áreas de mayor riesgo metodológico.

## Secuencia de adopción (sistema ya existente)

- **Etapa A — Mapeo:** construir `bcm/bcm-0-inicial.md` observando el sistema, entrevistando usuarios y, si es necesario, leyendo código para inferir intención (ingeniería inversa de procesos, no de implementación). Sin funcionalidad nueva en esta etapa.
- **Etapa B — Estructura:** roles formales, modelos maestros iniciales, todo trabajo nuevo pasa por el pipeline referenciando el BCM-0.
- **Etapa C — Iteración:** pipeline activo, racontos y modelos maestros crecen, lagunas del BCM-0 se van cerrando.
- **Etapa D — Maduración:** BCM con cobertura alta, modelos maestros reflejan el stack real, pipeline fluido.

No omitir la etapa A por presión de tiempo: un BCM-0 apresurado no es confiable y contamina todo lo que se construye sobre él.
```

---

## 📁 BCM (`bcm/`)

### `apf_infra/bcm/BCM.md`

```markdown
# Business Core Master (BCM) — [PROYECTO]

> Constitución del negocio. Agnóstica de tecnología. Ninguna decisión de implementación puede contradecir una regla de acá. Si algo del código contradice este documento, o el código está mal, o el BCM está desactualizado — pero no pueden convivir en contradicción.

**Versión:** v0 (preliminar) · **Última actualización:** [FECHA] · **Cobertura de documentación estimada:** desconocida (recién iniciado)

## 1. Datos

> Qué existe en el dominio del negocio y qué propiedades esenciales tiene. No hablar de tablas ni columnas — hablar del dominio.

- [ENTIDAD 1]: [propiedades esenciales, en lenguaje de negocio]
- _(completar a medida que se identifican entidades del dominio)_

## 2. Roles

> Quién interactúa con el sistema y con qué nivel de autoridad, en términos del negocio, no de la tecnología.

- [ROL 1]: [qué puede hacer, qué no puede hacer, a quién puede delegar]
- _(completar)_

## 3. Usuarios

> Cómo los roles interactúan en la práctica: flujos, decisiones, información necesaria, consecuencias de sus acciones.

- [FLUJO 1]: [descripción del proceso de negocio, no de pantallas]
- _(completar)_

## 4. Operaciones

> Transacciones de negocio con semántica propia: precondiciones, efectos, invariantes, comportamiento ante fallo.

- [OPERACIÓN 1]: precondiciones — [...]; efecto — [...]; si falla — [...]
- _(completar)_

## 5. Persistencia

> Qué información sobrevive, cuánto tiempo, y bajo qué condiciones puede modificarse o eliminarse.

- [DATO 1]: [política de retención y modificación]
- _(completar)_

---

## Cobertura de dominio

- **Cobertura de documentación:** % del dominio conocido que está capturado acá.
- **Cobertura de implementación:** % de las reglas documentadas que están efectivamente implementadas en el sistema actual.

Actualizar esta sección en cada revisión mensual del BCM.

## Historial de verificación con el negocio

| Fecha | Sección verificada | Verificado con | Resultado |
|---|---|---|---|
| [FECHA] | (versión inicial) | — | Documento recién creado, pendiente de primera verificación |
```

### `apf_infra/bcm/bcm-0-inicial.md`

```markdown
# BCM-0 — Snapshot inicial de [PROYECTO]

> Usar este archivo únicamente cuando se adopta APF sobre un sistema **ya existente**. Es la versión cero, honesta sobre sus propias limitaciones — no se pretende completa. Una vez que una regla de acá se verifica con el negocio, se promueve a `BCM.md` y se marca como migrada en la tabla de abajo.

## Fuentes usadas para este snapshot

- [ ] Observación directa del sistema en funcionamiento
- [ ] Conversaciones con usuarios/operadores actuales
- [ ] Lectura de código para inferir intención (ingeniería inversa de procesos)

## Reglas inferidas, pendientes de verificación

| Regla inferida | Fuente | Confianza | Verificada con negocio | Promovida a BCM.md |
|---|---|---|---|---|
| [ejemplo: "una transacción cancelada no puede modificar el saldo"] | código: `[archivo/función]` | alta/media/baja | no | no |

## Notas de ingeniería inversa

Registrar acá el razonamiento de observar → inferir → documentar para los casos no triviales, de forma que otra persona pueda auditar cómo se llegó a cada regla inferida.
```

### `apf_infra/bcm/lagunas_zonas_grises.md`

````markdown
# Lagunas, zonas grises y zonas de transición — [PROYECTO]

## Lagunas

> Áreas del negocio que el sistema no cubre, o cubre de forma tan incompleta que hay procesos manuales paralelos.

| # | Área | Evidencia | Prioridad | Estado |
|---|---|---|---|---|
| L-01 | [descripción] | [cómo se detectó] | alta/media/baja | abierta |

## Zonas grises

> Áreas donde el sistema hace algo pero nadie está seguro de si es correcto. No generan errores visibles — son las más peligrosas.

| # | Área | Evidencia | Prioridad | Estado |
|---|---|---|---|---|
| Z-01 | [descripción] | [cómo se detectó] | alta/media/baja | abierta |

## Zonas de transición (proyectos de migración)

> Usar solo si este proyecto reemplaza gradualmente a un sistema legacy. Cada regla del BCM en transición lleva este marcador.

```
Regla [ID]: [nombre]
  Zona: IN | OUT | BRIDGE
  Estado: EN TRANSICIÓN | RESUELTO EXTERNAMENTE | MIGRADO
  Resuelto hoy en: [sistema legacy / módulo]
  Migración prevista: [iteración/fecha]
  Dependencias BRIDGE: [servicios externos involucrados]
  Cobertura de implementación: [%] → objetivo [%] en [iteración]
```

**Cobertura sobre alcance acordado** = reglas implementadas / reglas dentro del alcance acordado (zona IN) × 100. No se mide contra "todo el negocio" — el denominador es lo que BI y el cliente acordaron explícitamente como alcance de esta iteración/proyecto.
````

---

## 📁 Modelos Maestros (`modelos_maestros/`)

### `apf_infra/modelos_maestros/base/dev_maestro.md`

```markdown
MODELO: dev_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Implementación de código
HEREDA DE: —
MANTENEDOR: DEV (quien lo ejecuta también lo mantiene — ver `raconto_maestro` para la excepción)

## Contexto del proyecto

[PROYECTO] usa [STACK]. [Completar: convenciones de carpetas, gestor de paquetes, versión de lenguaje/runtime, restricciones de entorno relevantes.]

## Reglas positivas

1. Todo código asume que habrá errores de ejecución (programación defensiva) — ver `../../logs_feedback/README.md`. Ninguna llamada a un servicio externo, base de datos o entrada de usuario queda sin manejo explícito de error.
2. [Completar con convenciones de nombrado, estructura de archivos, patrones arquitectónicos preferidos del stack real.]

## Restricciones explícitas

> Cada restricción documenta un error real que no debe repetirse. Formato: Error / Contexto / Regla. Vacío al inicio — se llena con la experiencia del equipo.

RESTRICCIÓN #1
Error: (ninguna todavía — este modelo acaba de crearse)
Contexto: —
Regla: —

## Criterios de aceptación — eficacia

- El código compila/corre sin advertencias nuevas respecto a la iteración anterior.
- Cumple el caso de uso tal como lo definió BI (condición necesaria pero no suficiente — ver eficiencia abajo).

## Criterios de aceptación — eficiencia (doble estándar del capítulo 22: no alcanza con que funcione, tiene que funcionar bien)

No están completos hasta tener números concretos del proyecto real, no solo la dimensión a medir:

1. **Tiempo de acceso a base de datos** — umbral objetivo: [Completar, ej. "consultas simples < 50ms"]. Toda consulta que recorre una tabla completa sin índice para un caso de uso frecuente es una vulnerabilidad de eficiencia, no un detalle menor.
2. **Uso de caché** — [Completar: qué datos se consultan repetidamente y deberían cachearse en este proyecto].
3. **Tiempo de renderizado** (si aplica interfaz de usuario) — umbral objetivo: [Completar, ej. "< 200ms entre respuesta del servidor y interacción posible"].
4. **Volumen de código** — un módulo que resuelve lo mismo con menos código, usando los patrones ya validados en este archivo, es preferible. No es una métrica de vanidad: menos código es menos superficie de error futuro.

Cada optimización real que se encuentre en el proyecto (no genérica) se documenta como regla nueva acá, con la métrica de referencia que la justifica — ver capítulo 22, "Las optimizaciones se vuelven reglas".
```

### `apf_infra/modelos_maestros/base/qa_maestro.md`

```markdown
MODELO: qa_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Verificación
HEREDA DE: —
MANTENEDOR: QA

## Contexto del proyecto

[Completar: framework de testing usado, entornos disponibles (dev/staging/prod), cómo se ejecutan los juegos de prueba.]

## Reglas positivas

1. Todo caso de uso recibido de BI debe tener al menos un flujo principal y un flujo de error cubierto por juegos de prueba antes de considerarse "listo para DEV".
2. QA verifica doble alineación: que la implementación cumple el caso de uso, y que no contradice `../../bcm/BCM.md`.
3. [Completar con formato esperado de reportes de QA y criterios de bloqueante/no bloqueante.]

## Restricciones explícitas

RESTRICCIÓN #1
Error: (ninguna todavía)
Contexto: —
Regla: —

## Criterios de aceptación — eficacia

- [Completar: qué constituye un caso de uso "correctamente cubierto".]

## Criterios de aceptación — eficiencia (doble estándar del capítulo 22, espejo de `dev_maestro`)

QA no aprueba solo por eficacia funcional. Verifica el desarrollo contra los mismos cuatro umbrales que `dev_maestro` declara en su sección de eficiencia — si DEV actualiza un umbral ahí, QA debe verificar contra el valor actualizado, no contra uno memorizado:

1. **Tiempo de acceso a base de datos** dentro del umbral vigente en `dev_maestro`.
2. **Uso de caché** donde `dev_maestro` lo especifica como esperado.
3. **Tiempo de renderizado** (si aplica interfaz de usuario) dentro del umbral vigente.
4. **Volumen de código** — no es criterio de rechazo por sí solo, pero un crecimiento injustificado respecto a soluciones ya validadas es señal para revisar.

Un desarrollo que cumple el caso de uso pero excede estos umbrales **no se aprueba**: se devuelve a DEV con los datos de medición concretos, no con una objeción genérica. Ver capítulo 22, "El doble criterio de aprobación de QA".
```

### `apf_infra/modelos_maestros/base/ba_maestro.md`

```markdown
MODELO: ba_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Análisis de negocio
HEREDA DE: —
MANTENEDOR: BI

## Contexto del proyecto

[Completar: quién es el cliente/stakeholder principal, canal habitual de comunicación de requerimientos.]

## Reglas positivas

1. Un caso de uso no está "listo para DEV" hasta tener: precondiciones, flujo principal, flujos alternativos y de error, y criterios de aceptación verificables.
2. Toda regla que emerge de una conversación con el cliente se evalúa contra `../../bcm/BCM.md`: si ya está documentada, si es nueva, o si contradice algo existente.
3. [Completar con el nivel de detalle mínimo esperado antes de cerrar una sesión con el cliente.]

## Restricciones explícitas

RESTRICCIÓN #1
Error: (ninguna todavía)
Contexto: —
Regla: —

## Criterios de aceptación

- [Completar.]
```

### `apf_infra/modelos_maestros/base/roadmap_maestro.md`

```markdown
MODELO: roadmap_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Construcción de roadmap
HEREDA DE: —
MANTENEDOR: DEV construye con base en él; BI y QA validan que esté alineado a `ba_maestro`/`qa_maestro` en cada auditoría (ver categoría 5 del `audit_maestro`)

## Contexto del proyecto

[Completar.]

## Modelo de IA recomendado para esta fase

**HPer (alta performance).** Construir un roadmap requiere síntesis de múltiples dimensiones a la vez (casos de uso, BCM, modelos maestros vigentes, restricciones del stack) y anticipar consecuencias de segundo orden — es la tarea de mayor exigencia analítica del pipeline. Un MPer tiende a simplificar donde debería profundizar y a omitir casos borde. No usar el modelo económico/rápido para esta fase, aunque parezca "solo redactar un documento".

## Reglas positivas

1. Todo roadmap debe ser simultáneamente detallado, eficiente, específico, y alineado a `../../bcm/BCM.md`.
2. Todo roadmap referencia el caso de uso de BI y el plan expandido que lo originaron.
3. Cada decisión técnica relevante lleva su justificación (no solo el "qué", también el "por qué").

## Restricciones explícitas

RESTRICCIÓN #1
Error: (ninguna todavía)
Contexto: —
Regla: —

## Criterios de aceptación

- El roadmap es suficientemente granular como para que DEV lo siga sin tener que adivinar decisiones de diseño no explicitadas.
```

### `apf_infra/modelos_maestros/base/audit_maestro.md`

```markdown
MODELO: audit_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Auditoría V&BS (Vulnerabilidades y Puntos Ciegos)
HEREDA DE: —
MANTENEDOR: BI + QA son los custodios de estas reglas (no DEV). DEV ejecuta la auditoría aplicando estas reglas, pero no decide qué buscar — eso lo definen BI y QA a partir de lo que cada uno detecta que faltó.

## Contexto del proyecto

[Completar.]

## Modelo de IA recomendado para esta fase

**HPer (alta performance).** Detectar vulnerabilidades no evidentes y, sobre todo, puntos ciegos (lo que no está escrito) requiere razonamiento adversarial profundo — lo mismo que justifica usar HPer para construir el roadmap en primer lugar. La implementación posterior (fase 5, ya con roadmap auditado) sí puede delegarse a un MPer: ejecutar instrucciones ya precisas es una tarea distinta y más económica.

## Categorías de revisión (punto de partida mínimo — ampliar con la experiencia del proyecto)

1. **Alineación con el BCM** — ¿el roadmap respeta todas las reglas relevantes de `../../bcm/BCM.md`?
2. **Cobertura de casos de uso** — ¿cubre flujo principal, alternativos y de error?
3. **Impacto en módulos existentes** — ¿qué módulos no-foco pueden verse afectados? ¿hay tests de regresión previstos?
4. **Dependencias y riesgos externos** — ¿qué servicios/librerías externas están involucradas? ¿tienen manejo de error y plan de contingencia?
5. **Consistencia con modelos maestros y alineación entre niveles** — ¿el roadmap respeta `dev_maestro`? ¿las reglas técnicas de DEV están alineadas con `ba_maestro`/`qa_maestro` (sin contradicciones)?
6. **Vulnerabilidades específicas de IA** — confianza excesiva en el flujo feliz, soluciones genéricas en contextos específicos, ambigüedades resueltas sin señalarlas, inconsistencias internas entre secciones del roadmap.

## Técnicas complementarias para profundizar la auditoría

Cuando el roadmap es crítico o la primera pasada de auditoría no convence: aplicar XCM (`../../xcm/README.md`) sobre el propio roadmap antes de auditar, para que llegue más maduro; y/o pedir un análisis cruzado (`../../xcm/analisis_cruzado.md`) con una IA distinta a la que redactó el roadmap, específicamente para la categoría 6 (puntos ciegos) — es la categoría donde más vale una mirada externa sin el contexto acumulado del roadmap.

## Desempate cuando BI y QA discrepan sobre una regla de auditoría

Ambos son custodios de estas reglas (ver `MANTENEDOR` arriba), así que un desacuerdo no lo resuelve ninguno de los dos por jerarquía. Orden de resolución:

1. **Volver al BCM.** La mayoría de los desacuerdos sobre una regla de auditoría en realidad son un desacuerdo sobre una regla de negocio no del todo explícita. Si `../../bcm/BCM.md` ya lo resuelve, se aplica eso y termina la discusión.
2. **Si el BCM no lo resuelve:** se documenta la discrepancia en la propia auditoría (`../../auditorias_vybs/_template_auditoria.md`, sección de hallazgos) como severidad **mayor**, no crítica — el roadmap avanza con la interpretación más conservadora de las dos (la que impone más restricciones), y la discrepancia queda anotada para resolverse antes de la iteración siguiente.
3. **Si la discrepancia se repite** en más de una auditoría (mismo tipo de desacuerdo, distinto roadmap): eso es en sí mismo un patrón — se escala como CRITICAL_TASK (`../../logs_feedback/critical_tasks/`) porque señala una ambigüedad estructural en `audit_maestro`, no un caso aislado.

No hay un tercer rol que arbitre por diseño — introducir uno rompería la regla de tres roles fijos. El BCM y, en última instancia, el cliente/negocio (a través de BI) son la autoridad final.

## Clasificación de severidad

- **Menor** — no bloquea, se resuelve en la siguiente iteración.
- **Mayor** — requiere ajuste del roadmap antes de implementar.
- **Crítica** — el roadmap no puede implementarse como está.

## Restricciones explícitas

RESTRICCIÓN #1
Error: (ninguna todavía)
Contexto: —
Regla: —

## Criterios de aceptación

- Un roadmap aprobado documenta en su encabezado: quién auditó, cuándo, qué observaciones se encontraron y cómo se resolvieron.
```

### `apf_infra/modelos_maestros/base/migracion_maestro.md`

```markdown
MODELO: migracion_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Migraciones de esquema
HEREDA DE: —
MANTENEDOR: DEV

## Contexto del proyecto

[Completar: motor de base de datos, herramienta de migraciones si existe una.]

## Reglas positivas

1. **No destructividad** — ninguna migración elimina datos ni estructuras sin una vía de reversión explícita.
2. **Trazabilidad colaborativa** — cada migración es atómica e independiente, versionada en git, para permitir trabajo en paralelo sin interferencia.
3. [Completar con convención de nombrado real: p. ej. `AAAA-MM-DD_descripcion-corta.sql`.]

## Restricciones explícitas

RESTRICCIÓN #1
Error: (ninguna todavía)
Contexto: —
Regla: —

## Criterios de aceptación

- Toda migración puede aplicarse de forma independiente y revertirse sin pérdida de datos previos.
```

### `apf_infra/modelos_maestros/base/raconto_maestro.md`

```markdown
MODELO: raconto_maestro
VERSIÓN: 0.1
ACTUALIZADO: [FECHA]
ÁREA: Documentación de iteraciones (racontos)
HEREDA DE: —
MANTENEDOR: DEV redacta, BI valida que la versión `_simp` sea genuinamente accesible para audiencias no técnicas (ver capítulo 20)

## Contexto del proyecto

[Completar: audiencia típica de la versión `_simp` en este proyecto — ¿quién la lee?]

## Reglas positivas

1. Las seis secciones son fijas y obligatorias: mejoras planeadas, actores y roles, glosario técnico, tradeoffs y comparativas, impacto en el sistema (semáforo), patrones aplicados.
2. `_simp` y `_tec` se escriben con la audiencia en mente desde el primer párrafo — `_simp` nunca es un resumen de `_tec`.
3. El raconto se produce al cierre de la iteración, con el contexto fresco — no días después.

## Criterios del semáforo de impacto

- 🟢 **Verde** — sin impacto significativo.
- 🟡 **Amarillo** — impacto moderado o potencial, requiere monitoreo.
- 🔴 **Rojo** — impacto alto/crítico, riesgo de regresión o atención inmediata.

## Restricciones explícitas

RESTRICCIÓN #1
Error: (ninguna todavía)
Contexto: —
Regla: —

## Criterios de aceptación

- Un raconto completo tiene sus dos versiones (`_simp.html`, `_tec.html`) publicadas en `../../racontos_del_sistema/`, vinculadas entre sí sección por sección.
```

### `apf_infra/modelos_maestros/especializados/README.md`

````markdown
# Modelos especializados (`_esp`)

Carpeta vacía por diseño. Un modelo especializado hereda de un modelo maestro base y agrega reglas para un contexto específico y recurrente.

## Cuándo crear uno

Cuando notás que le das las mismas instrucciones específicas a la IA cada vez que trabajás en un contexto particular (ej.: estilos CSS, endpoints de una API, un módulo de reportes). Ese es el momento de encapsularlas en un `_esp`.

## Convención de nombrado y encabezado

Archivo: `[area]_esp_[contexto].md` (ej.: `dev_esp_api.md`, `dev_esp_estilos.md`).

## Ejemplo real completo (no placeholder — para calibrar nivel de detalle esperado)

`dev_esp_api.md`, creado después de que el mismo error de paginación apareciera en tres endpoints distintos:

```
MODELO: dev_esp_api
VERSIÓN: 1.0
ACTUALIZADO: 2026-06-03
ÁREA: Implementación de endpoints REST
HEREDA DE: dev_maestro v0.3
MANTENEDOR: DEV (mismo mantenedor que dev_maestro — un _esp no cambia de dueño respecto a su base)

## Contexto del proyecto

Aplica a todo endpoint bajo `/api/v1/`. No aplica a los webhooks entrantes de terceros (esos siguen `dev_esp_webhooks.md`, si existe).

## Reglas positivas (además de las heredadas de dev_maestro)

1. Toda colección paginada devuelve `{ items: [...], total: N, page: N, pageSize: N }` — nunca un array desnudo. Origen: RESTRICCIÓN #1 de abajo.
2. Todo endpoint que muta estado devuelve el recurso actualizado completo, no solo `{ ok: true }` — evita un round-trip adicional del cliente.
3. Los errores de validación devuelven 422 con `{ campo: mensaje }`, nunca 400 genérico.

## Restricciones explícitas

RESTRICCIÓN #1
Error: tres endpoints distintos (`/pedidos`, `/clientes`, `/productos`) implementaron paginación con convenciones diferentes (`page`/`offset`, `pageSize`/`limit`), rompiendo el cliente que los consume de forma genérica.
Contexto: cada uno se implementó en un roadmap distinto, sin revisar cómo se había resuelto antes.
Regla: toda paginación nueva usa `page`/`pageSize` — ver regla positiva #1. Antes de implementar un endpoint nuevo, revisar si ya existe un patrón equivalente en este archivo.

## Criterios de aceptación

- Un endpoint nuevo bajo `/api/v1/` no introduce una convención de forma/paginación/error distinta a las ya vigentes acá, salvo justificación explícita registrada como nueva regla.
```

## Cuándo "promover" un `_esp` de vuelta al maestro base

Si una regla de un `_esp` deja de ser específica del contexto que le dio origen y aplica igual de bien a todo el área (ej.: la convención de paginación de `dev_esp_api` termina siendo la convención de paginación de *cualquier* colección, no solo REST), esa regla se mueve a `dev_maestro.md` y se borra del `_esp` — no se duplica en los dos lugares. El `_esp` queda entonces solo con lo que sigue siendo genuinamente específico de su contexto.

No es necesario anticipar modelos especializados desde el día uno. Crecen orgánicamente a partir de la experiencia real del equipo.
````

### `apf_infra/modelos_maestros/CHANGELOG.md`

```markdown
# Changelog de modelos maestros — [PROYECTO]

Registro cronológico de cada versión de cada modelo: qué cambió, cuándo, y por qué. Es la bitácora de aprendizaje del equipo — leerla de punta a punta es, en sí mismo, un proceso de onboarding.

## [FECHA]

- Inicialización de `apf_infra/` a partir del template `apf_infra.md`. Se crean las versiones 0.1 de los siete modelos maestros base, todas sin restricciones explícitas todavía (proyecto recién instrumentado).
```

---

## 📁 Roadmaps (`roadmaps/`)

### `apf_infra/roadmaps/README.md`

````markdown
# Roadmaps — flujo de carpetas

```
plan_base/        Fase 1 — intención en lenguaje natural, sin decisiones técnicas.
plan_expandido/    Fase 2 — la IA piensa (no implementa): pasos, supuestos, dependencias.
activos/           Fase 3-4 — roadmap construido + auditado, vigente, en implementación.
completados/       Roadmap cuya iteración cerró y generó su raconto correspondiente.
```

Convención de nombrado en las cuatro carpetas: `AAAA-MM-DD_nombre-corto-de-la-funcionalidad.md`. Mismo nombre de archivo en las cuatro etapas facilita rastrear la trazabilidad completa de una funcionalidad, de la intención a la entrega.
````

### `apf_infra/roadmaps/plan_base/_template_plan_base.md`

```markdown
# Plan base — [nombre de la funcionalidad]

**Fecha:** [FECHA] · **Solicitado por:** [cliente/negocio] · **Recibido por (BI):** [nombre]

## Intención (lenguaje natural, sin decisiones técnicas)

[Qué necesita el negocio, en las palabras más fieles posibles a como fue planteado. No traducir todavía a lenguaje técnico.]

## Preguntas abiertas para el cliente

- [ ]

## Referencia al BCM

¿Esta funcionalidad cae dentro de una regla ya documentada en `../../bcm/BCM.md`, o revela una laguna? [completar]
```

### `apf_infra/roadmaps/plan_expandido/_template_plan_expandido.md`

```markdown
# Plan expandido — [nombre de la funcionalidad]

**Basado en:** `../plan_base/[archivo].md` · **Fecha:** [FECHA]

> Instrucción para la IA en esta fase: pensar, no ejecutar. Desarrollar el plan en pasos detallados sin implementar nada todavía.

## Supuestos explícitos

- [ ]

## Dependencias identificadas

- [ ]

## Puntos de decisión

- [ ]

## Secuencia de pasos propuesta

1. [ ]
```

### `apf_infra/roadmaps/activos/_template_roadmap.md`

```markdown
# Roadmap — [nombre de la funcionalidad]

**Basado en:** `../plan_expandido/[archivo].md` · **Caso de uso BI:** [referencia] · **Fecha:** [FECHA]

## Contexto y objetivo

[...]

## Pasos detallados (con justificación de cada decisión relevante)

1. [Paso] — Justificación: [...]

## Estimación de esfuerzo

> El BCM vuelve esto un cálculo, no una conjetura (capítulo 18): apoyate en cuántas entidades/operaciones nuevas o modificadas del BCM están involucradas y en el historial de roadmaps similares ya completados, no solo en intuición.

- **Entidades/operaciones del BCM involucradas:** [...]
- **Roadmaps previos comparables:** [referencia, si existe]
- **Estimación:** [Completar, ej. "3-5 días"] · **Confianza:** alta/media/baja

## Riesgos identificados

- [ ]

## Auditoría V&BS

- **Estado:** pendiente | en revisión | aprobado
- **Referencia:** `../../auditorias_vybs/[archivo correspondiente].md`

## Estado de implementación

- **Ciclos DEV-QA:** 0
- **Estado:** no iniciado
```

---

## 📁 Auditoría V&BS (`auditorias_vybs/`)

### `apf_infra/auditorias_vybs/README.md`

```markdown
# Auditorías V&BS

Una auditoría por roadmap, antes de que exista una sola línea de código. La ejecuta DEV sobre su propio roadmap, aplicando las reglas de `../modelos_maestros/base/audit_maestro.md` — no criterio subjetivo. BI y QA son quienes mantienen y hacen evolucionar esas reglas.

Proceso: 1) lectura completa sin juzgar, 2) revisión por categorías del `audit_maestro`, 3) búsqueda activa de puntos ciegos (qué falta, no qué está mal), 4) clasificación de severidad, 5) ajuste del roadmap, 6) aprobación con trazabilidad.

Una vez aprobado, mover copia/referencia a `historico/` con fecha.
```

### `apf_infra/auditorias_vybs/_template_auditoria.md`

```markdown
# Auditoría V&BS — [nombre de la funcionalidad]

**Roadmap auditado:** `../roadmaps/activos/[archivo].md` · **Auditor (DEV):** [nombre] · **Fecha:** [FECHA]

## 1. Alineación con el BCM
- Observaciones: [...]

## 2. Cobertura de casos de uso
- Observaciones: [...]

## 3. Impacto en módulos existentes
- Observaciones: [...]

## 4. Dependencias y riesgos externos
- Observaciones: [...]

## 5. Consistencia con modelos maestros y alineación entre niveles
- Observaciones: [...]

## 6. Vulnerabilidades específicas de IA
- Observaciones: [...]

## Puntos ciegos (qué no está en el roadmap que debería estar)
- [...]

## Clasificación de hallazgos

| # | Descripción | Severidad (menor/mayor/crítica) | Resolución |
|---|---|---|---|
| 1 | | | |

## Resultado

- **Aprobado:** sí | no — ajustar y volver a auditar
```

---

## 📁 Migraciones (`migraciones/`)

### `apf_infra/migraciones/README.md`

```markdown
# Migraciones — [PROYECTO]

Dos principios inviolables: **no destructividad** y **trazabilidad colaborativa**. Ver `../modelos_maestros/base/migracion_maestro.md` para las reglas completas.

Las migraciones se acumulan gradualmente (aproximadamente una por semana en proyectos activos) y se sincronizan por pull/merge. Cada migración es atómica e independiente — múltiples desarrolladores pueden avanzar en paralelo sin interferencia.
```

### `apf_infra/migraciones/_template_migracion.md`

```markdown
# Migración — [AAAA-MM-DD]_[descripción-corta]

**Roadmap origen:** `../roadmaps/activos/[archivo].md` · **Autor:** [nombre] · **Fecha:** [FECHA]

## Cambio propuesto

[...]

## Es no destructivo porque

[...]

## Vía de reversión

[...]

## Script / definición

[pegar acá el script real de migración, o referenciar su ubicación en el repositorio de código]
```

---

## 📁 Racontos del sistema (`racontos_del_sistema/`)

> El índice (`index.html`) se genera automáticamente ejecutando `generar_index.js` — no se edita a mano. Si el proyecto destino no usa Node.js, portá la lógica del script (leer el directorio, agrupar `_simp`/`_tec` por nombre base, ordenar por fecha, reescribir el `<tbody>`) al lenguaje del stack real; el contrato importante es la convención de nombres, no el lenguaje del script.

### `apf_infra/racontos_del_sistema/shared/raconto.css`

```css
:root {
  --raconto-bg: #0f172a;
  --raconto-fg: #e2e8f0;
  --raconto-accent: #38bdf8;
  --raconto-verde: #22c55e;
  --raconto-amarillo: #eab308;
  --raconto-rojo: #ef4444;
  --raconto-card-bg: #1e293b;
  --raconto-border: #334155;
  --raconto-max-width: 880px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
  background: var(--raconto-bg);
  color: var(--raconto-fg);
  line-height: 1.6;
}

.raconto-container {
  max-width: var(--raconto-max-width);
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.raconto-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--raconto-border);
  padding-bottom: 1.25rem;
}

.raconto-header h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

.raconto-meta {
  font-size: 0.9rem;
  opacity: 0.75;
}

.raconto-nav-version {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.85rem;
}

.raconto-nav-version a {
  color: var(--raconto-accent);
  text-decoration: none;
}

.raconto-section {
  background: var(--raconto-card-bg);
  border: 1px solid var(--raconto-border);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.raconto-section h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--raconto-accent);
}

.raconto-section a.raconto-crosslink {
  font-size: 0.8rem;
  color: var(--raconto-accent);
  text-decoration: underline;
}

.semaforo {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.semaforo.verde { background: rgba(34,197,94,0.15); color: var(--raconto-verde); }
.semaforo.amarillo { background: rgba(234,179,8,0.15); color: var(--raconto-amarillo); }
.semaforo.rojo { background: rgba(239,68,68,0.15); color: var(--raconto-rojo); }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

th, td {
  text-align: left;
  padding: 0.5rem 0.6rem;
  border-bottom: 1px solid var(--raconto-border);
}

tr.raconto-incompleto {
  opacity: 0.7;
}

tr.raconto-incompleto td:last-child {
  color: var(--raconto-amarillo);
}

@media (max-width: 600px) {
  .raconto-container { padding: 1.25rem 1rem 3rem; }
  .raconto-header h1 { font-size: 1.4rem; }
}
```

### `apf_infra/racontos_del_sistema/shared/raconto.js`

```javascript
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".semaforo").forEach(function (el) {
    var nivel = el.getAttribute("data-nivel");
    if (nivel) el.classList.add(nivel);
  });

  document.querySelectorAll("a.raconto-crosslink").forEach(function (a) {
    a.addEventListener("click", function () {
      window.location.href = a.getAttribute("href");
    });
  });
});
```

### `apf_infra/racontos_del_sistema/index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Racontos del sistema — [PROYECTO]</title>
  <link rel="stylesheet" href="shared/raconto.css">
</head>
<body>
  <div class="raconto-container">
    <header class="raconto-header">
      <h1>Racontos del sistema — [PROYECTO]</h1>
      <p class="raconto-meta">Línea de tiempo de decisiones e iteraciones. No editar esta lista a mano — se regenera ejecutando <code>generar_index.js</code> cada vez que se publica un raconto nuevo.</p>
    </header>
    <div class="raconto-section">
      <h2>Iteraciones</h2>
      <table>
        <thead>
          <tr><th>Fecha</th><th>Iteración</th><th>Resumen</th><th>Versiones</th></tr>
        </thead>
        <tbody>
          <!-- No editar a mano: este bloque lo reescribe generar_index.js -->
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
```

### `apf_infra/racontos_del_sistema/generar_index.js`

```javascript
#!/usr/bin/env node
/**
 * Regenera index.html a partir de los archivos *_simp.html / *_tec.html presentes
 * en esta carpeta. Ejecutar con: node generar_index.js (sin dependencias externas).
 *
 * Convención de nombre esperada: AAAA-MM-DD_iter-NN_descripcion_simp.html / _tec.html
 * (la misma convención descripta en el capítulo 20 del libro).
 *
 * Si este proyecto no usa Node.js, portá esta misma lógica —no el lenguaje— a lo
 * que corresponda: agrupar por nombre base, ordenar por fecha descendente, y
 * reescribir únicamente el contenido de <tbody> en index.html.
 */
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const PATRON = /^(\d{4}-\d{2}-\d{2})_(iter-\d+)_(.+)_(simp|tec)\.html$/;

function generar() {
  const archivos = fs.readdirSync(DIR).filter((f) => PATRON.test(f));
  const iteraciones = new Map();

  for (const archivo of archivos) {
    const [, fecha, iter, descripcion, version] = archivo.match(PATRON);
    const clave = `${fecha}_${iter}_${descripcion}`;
    if (!iteraciones.has(clave)) {
      iteraciones.set(clave, { fecha, iter, descripcion: descripcion.replace(/-/g, " ") });
    }
    iteraciones.get(clave)[version] = archivo;
  }

  // Validación: cada iteración debería tener su par _simp + _tec. Si falta uno,
  // no se descarta la fila (mejor un raconto incompleto visible que invisible),
  // pero se advierte fuerte en consola para que no pase inadvertido.
  const incompletas = [];
  for (const [clave, it] of iteraciones) {
    if (!it.simp || !it.tec) {
      incompletas.push(`${clave} → falta ${!it.simp ? "_simp" : "_tec"}`);
    }
  }
  if (incompletas.length > 0) {
    console.warn("⚠  Iteraciones con un raconto incompleto (falta una de las dos versiones):");
    incompletas.forEach((linea) => console.warn(`   - ${linea}`));
    console.warn("   Ver raconto_maestro.md — un raconto no se considera cerrado sin ambas versiones.");
  }

  const filas = Array.from(iteraciones.values())
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
    .map(
      (it) => `          <tr${!it.simp || !it.tec ? ' class="raconto-incompleto"' : ""}>
            <td>${it.fecha}</td>
            <td>${it.iter}</td>
            <td>${it.descripcion}</td>
            <td>${it.simp ? `<a href="${it.simp}">simple</a>` : "⚠ falta"} / ${it.tec ? `<a href="${it.tec}">técnica</a>` : "⚠ falta"}</td>
          </tr>`
    )
    .join("\n");

  const rutaIndex = path.join(DIR, "index.html");
  const html = fs.readFileSync(rutaIndex, "utf8");
  const nuevoHtml = html.replace(
    /<tbody>[\s\S]*?<\/tbody>/,
    `<tbody>\n${filas || "          <!-- Todavía no hay racontos publicados -->"}\n        </tbody>`
  );
  fs.writeFileSync(rutaIndex, nuevoHtml, "utf8");
  console.log(`index.html actualizado con ${iteraciones.size} iteración(es)${incompletas.length ? ` (${incompletas.length} incompleta(s), ver advertencias arriba)` : ""}.`);
}

generar();
```

### `apf_infra/racontos_del_sistema/_template_simp.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raconto (simple) — [nombre de la iteración]</title>
  <link rel="stylesheet" href="shared/raconto.css">
</head>
<body>
  <div class="raconto-container">
    <header class="raconto-header">
      <h1>[Nombre de la iteración] — versión simple</h1>
      <p class="raconto-meta">[FECHA] · Para audiencias no técnicas: gerencia, cliente, mandos medios.</p>
      <div class="raconto-nav-version"><a href="[archivo]_tec.html">Ver versión técnica →</a></div>
    </header>

    <section class="raconto-section">
      <h2>1. Mejoras planeadas</h2>
      <p>[Qué puede hacer el sistema ahora que antes no podía, en términos de valor para el negocio/usuario.]</p>
      <a class="raconto-crosslink" href="[archivo]_tec.html#mejoras">Ver detalle técnico →</a>
    </section>

    <section class="raconto-section">
      <h2>2. Actores y roles involucrados</h2>
      <p>[Quién participó y en qué capacidad.]</p>
    </section>

    <section class="raconto-section">
      <h2>3. Glosario técnico</h2>
      <p>[Términos traducidos al lenguaje del negocio.]</p>
    </section>

    <section class="raconto-section">
      <h2>4. Tradeoffs y comparativas</h2>
      <p>[Qué se eligió y cuál es el beneficio para el negocio, en términos de impacto (más rápido pero más costoso, etc.).]</p>
      <a class="raconto-crosslink" href="[archivo]_tec.html#tradeoffs">Ver criterios técnicos →</a>
    </section>

    <section class="raconto-section">
      <h2>5. Impacto en el sistema</h2>
      <p><span class="semaforo" data-nivel="verde">🟢 Verde</span> — [área]: sin impacto significativo.</p>
    </section>

    <section class="raconto-section">
      <h2>6. Patrones aplicados</h2>
      <p>[Decisiones de diseño, explicadas en términos accesibles.]</p>
    </section>
  </div>
  <script src="shared/raconto.js"></script>
</body>
</html>
```

### `apf_infra/racontos_del_sistema/_template_tec.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raconto (técnico) — [nombre de la iteración]</title>
  <link rel="stylesheet" href="shared/raconto.css">
</head>
<body>
  <div class="raconto-container">
    <header class="raconto-header">
      <h1>[Nombre de la iteración] — versión técnica</h1>
      <p class="raconto-meta">[FECHA] · Para el equipo de desarrollo y perfiles técnicos.</p>
      <div class="raconto-nav-version"><a href="[archivo]_simp.html">← Ver versión simple</a></div>
    </header>

    <section class="raconto-section" id="mejoras">
      <h2>1. Mejoras planeadas</h2>
      <p>Caso de uso BI: [referencia] · Roadmap auditado: [referencia] · Especificación: [...]</p>
    </section>

    <section class="raconto-section">
      <h2>2. Actores y roles involucrados</h2>
      <p>[Quién decidió qué, con qué información disponible.]</p>
    </section>

    <section class="raconto-section">
      <h2>3. Glosario técnico</h2>
      <p>[Definiciones precisas específicas del proyecto.]</p>
    </section>

    <section class="raconto-section" id="tradeoffs">
      <h2>4. Tradeoffs y comparativas</h2>
      <p>[Alternativas evaluadas, métricas comparadas, por qué se descartaron.]</p>
    </section>

    <section class="raconto-section">
      <h2>5. Impacto en el sistema</h2>
      <p><span class="semaforo" data-nivel="verde">🟢 Verde</span> — [área]: [detalle técnico del impacto].</p>
    </section>

    <section class="raconto-section">
      <h2>6. Patrones aplicados</h2>
      <p>[Patrones de diseño/arquitectónicos con justificación técnica.]</p>
    </section>
  </div>
  <script src="shared/raconto.js"></script>
</body>
</html>
```

---

## 📁 Logs, feedback y CRITICAL_TASK (`logs_feedback/`)

### `apf_infra/logs_feedback/README.md`

```markdown
# Logs, feedback y CRITICAL_TASK — [PROYECTO]

## Principio de partida: programación defensiva

Todo código asume que **habrá** errores de ejecución, no que "puede haber". Ninguna operación que interactúa con el mundo real (red, disco, entrada de usuario, servicios externos) queda sin manejo explícito de error. Esto se verifica en `audit_maestro` y se confirma en QA.

## Estructura mínima de una entrada de log

Cada entrada debe responder cinco preguntas: **qué** (descripción del error/evento), **cuándo** (timestamp, precisión al milisegundo si hay concurrencia), **dónde** (módulo/función/línea), **con qué datos** (contexto/parámetros/estado), **quién** (usuario o proceso que lo desencadenó).

Dos canales: log persistente (todos los entornos, fuente de auditoría) y consola en modo desarrollo únicamente (nunca en producción — riesgo de exposición de información).

## Feedback del usuario

El sistema debe permitir reportar un problema desde cualquier punto de la interfaz, en el momento en que se encuentra, sin requerir conocimiento técnico del usuario. Reporte mínimo: acción que intentaba, datos usados, resultado obtenido vs. esperado, módulo/pantalla, timestamp + usuario.

Esto captura una categoría de problemas que ningún log puede detectar: cuando el sistema funciona técnicamente bien pero el resultado no es el que el negocio necesita.

## CRITICAL_TASK

Se crea una CRITICAL_TASK — no una corrección puntual — cuando: un mismo error se repite con frecuencia significativa, un patrón defectuoso se replicó en múltiples módulos, el feedback de usuario revela una contradicción con `../bcm/BCM.md`, o una inconsistencia en un área tiene implicaciones en otras.

Una CRITICAL_TASK sigue el pipeline completo: formulación → roadmap (`../roadmaps/`) → auditoría V&BS (`../auditorias_vybs/`) → implementación → **nuevas reglas en los modelos maestros** (paso obligatorio: no solo se corrige, se previene la recurrencia).

Ver template en `critical_tasks/_template_critical_task.md`.
```

### `apf_infra/logs_feedback/critical_tasks/_template_critical_task.md`

```markdown
# CRITICAL_TASK — [nombre del patrón identificado]

**Fecha de identificación:** [FECHA] · **Identificada por:** [nombre/rol]

## Patrón identificado

[Descripción precisa del patrón, no de un incidente aislado.]

## Evidencia

- Logs: [referencias]
- Feedback de usuario: [referencias]
- Racontos previos relacionados: [referencias]

## Áreas del sistema afectadas

- [ ]

## Impacto en el negocio

[...]

## Roadmap de corrección

- Referencia: `../../roadmaps/activos/[archivo].md`

## Nuevas reglas generadas (paso obligatorio)

| Modelo maestro afectado | Regla nueva |
|---|---|
| | |

## Estado

- [ ] Formulada
- [ ] Roadmap construido
- [ ] Auditoría V&BS aprobada
- [ ] Implementada
- [ ] Reglas incorporadas a modelos maestros
```

---

## 📁 KPIs (`kpis/`)

### `apf_infra/kpis/dashboard.md`

````markdown
# Tablero de KPIs — [PROYECTO]

Actualizar al cierre de cada iteración/sprint. La lectura conjunta de estas filas a lo largo de las iteraciones es lo que hace visible si el pipeline está madurando.

| Iteración | Fecha | Iteraciones DEV-QA por caso de uso | Tiempo roadmap aprobado → entrega verificada | Errores en la iteración | Reglas nuevas en modelos maestros | Frecuencia de errores por módulo (top 1) | Tasa de feedback por funcionalidad (top 1) |
|---|---|---|---|---|---|---|---|
| iter-01 | [FECHA] | | | | | | |

## Cómo leer las tendencias

- **Iteraciones DEV-QA por caso de uso ↓** — los requerimientos llegan cada vez más claros a DEV.
- **Tiempo de entrega verificada ↓** — el pipeline completo es cada vez más eficiente (efecto pit stop maduro).
- **Errores por iteración ↓** — los modelos maestros y roles están funcionando con precisión creciente.
- **Reglas nuevas ↑ al principio, luego se estabiliza** — es señal de aprendizaje sano, no de inestabilidad.

## Cuando la tabla crece demasiado para leerse de un vistazo

Esta tabla plana funciona bien hasta unas 15-20 iteraciones. Pasado ese punto, archivá el trimestre/release cerrado en un archivo separado (ver formato abajo) y dejá en este archivo solo el trimestre/release en curso más una fila de resumen por cada período ya archivado. El objetivo es que este archivo siga siendo legible en 30 segundos, no un registro histórico completo — para eso están los archivos archivados.

## Formato del archivo archivado (`dashboard-AAAA-T[1-4].md`, o `dashboard-v[X].md` si el proyecto versiona por release)

Es una copia literal de la tabla de ese período, sin resumir — el resumen (promedios) vive en `dashboard.md`, el detalle fila por fila vive acá:

```markdown
# KPIs archivados — 2026-T1 (enero-marzo)

Archivado el [FECHA] desde `dashboard.md`. Ver ahí el resumen agregado de este período.

| Iteración | Fecha | Iteraciones DEV-QA por caso de uso | Tiempo roadmap aprobado → entrega verificada | Errores en la iteración | Reglas nuevas en modelos maestros | Frecuencia de errores por módulo (top 1) | Tasa de feedback por funcionalidad (top 1) |
|---|---|---|---|---|---|---|---|
| iter-01 | 2026-01-12 | | | | | | |
```

Y en `dashboard.md` queda, en lugar de esas filas, una sola fila de resumen: `2026-T1 (archivado) | promedio de cada columna numérica | ver dashboard-2026-T1.md`.
````

---

## 📁 XCM (`xcm/`)

### `apf_infra/xcm/README.md`

```markdown
# XCM — Maduración por escala

Técnica de prompt engineering para llevar cualquier artefacto (código, un modelo maestro, un raconto, una sección del BCM, un roadmap) a su mejor versión posible, forzando al modelo de IA a cambiar de escala de evaluación en tres iteraciones sucesivas.

## Prompts listos para copiar (reemplazar `[área]` y `[artefacto]`)

**Iteración X (1-10):**
> "Eres experto en [área]. Quiero que califiques del 1 al 10 este [artefacto] — siendo 1 lo más deficiente y 10 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 10."

**Iteración C (1-100), sobre el resultado ya mejorado de la iteración X:**
> "Ahora quiero que califiques del 1 al 100 este [artefacto] — siendo 1 lo más deficiente y 100 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 100."

**Iteración M (1-1000), sobre el resultado ya mejorado de la iteración C:**
> "Ahora quiero que califiques del 1 al 1000 este [artefacto] — siendo 1 lo más deficiente y 1000 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 1000."

## Cuándo aplicarlo

Artefactos de alto impacto y larga vida útil (el BCM es candidato permanente), cuando la calidad actual "se siente insuficiente" pero no se puede nombrar por qué, y antes de fijar un patrón como regla nueva en un modelo maestro.

## Registro de ciclos aplicados

| Fecha | Artefacto | Área de expertise usada | Resultado (observaciones → ¿se convirtieron en regla nueva?) |
|---|---|---|---|
| | | | |

## Técnica complementaria

XCM profundiza usando la **misma** IA que ya conoce el sistema, cambiando la escala de exigencia. Para el punto ciego que ni la escala 1000 detecta —porque la familiaridad con el proyecto lo oculta— existe una técnica hermana: ver `analisis_cruzado.md`.
```

### `apf_infra/xcm/analisis_cruzado.md`

```markdown
# Análisis cruzado — la segunda opinión entre IAs

> Complementa a XCM. XCM hace que la misma IA se exija más sobre el mismo objeto. El análisis cruzado usa una IA *sin* el contexto acumulado del proyecto — precisamente para detectar lo que la familiaridad con el sistema ya no permite ver. Es pair programming aplicado a la IA: el costo de la segunda perspectiva es de minutos, no de horas.

## El proceso en tres pasos

**Paso 1 — Análisis externo.** Tomá el artefacto (un log, un fragmento de código, un modelo maestro, una sección del BCM) y presentalo a una IA externa —sin el contexto del proyecto— con esta instrucción:

> "Analiza este [artefacto] exhaustivamente. Identifica vulnerabilidades, patrones problemáticos, inconsistencias y posibles causas de errores. Produce un reporte detallado."

**Paso 2 — Verificación cruzada.** Llevá ese reporte a la IA habitual del proyecto —la que sí tiene el contexto— con esta instrucción:

> "Este es un análisis externo de nuestro sistema. Verifica cada punto contra el código real y dime cuáles son correctos, cuáles son incorrectos o imprecisos, y cuáles requieren más contexto para evaluarse."

**Paso 3 — Búsqueda de puntos ciegos.** Con el resultado ya verificado, la pregunta más valiosa de las tres:

> "Con todo lo que ahora sabemos —el análisis externo, la verificación, el contexto del sistema— ¿qué no se está viendo? ¿Qué puntos ciegos quedan que no han sido identificados todavía?"

## Cuándo aplicarlo

- Cuando los logs (`../logs_feedback/`) o el feedback de usuario sugieren un problema cuya causa no es evidente tras una revisión interna.
- Antes de una decisión arquitectónica importante, para una segunda opinión sin el sesgo del contexto acumulado.
- Sobre un módulo que lleva tiempo en uso y nunca fue revisado con profundidad.
- Antes de cerrar una `CRITICAL_TASK` (ver `../logs_feedback/critical_tasks/`), para verificar que la solución propuesta no tiene puntos ciegos propios.

## Registro de ciclos aplicados

| Fecha | Artefacto | ¿Qué encontró el análisis externo que la IA habitual no había visto? | ¿Se convirtió en regla nueva? |
|---|---|---|---|
| | | | |
```

---

## 🔒 Regla persistente para la IA del proyecto destino

Se crean **dos** reglas, no una, para no cargar el contexto completo del APF en cada interacción trivial (renombrar una variable, arreglar un typo, leer un log) — solo en las que efectivamente van a tocar lógica de negocio.

### Regla 1 — puntero liviano, siempre activo

`.cursor/rules/apf-infra.mdc`:

```markdown
---
description: Puntero a la infraestructura APF del proyecto (apf_infra/)
alwaysApply: true
---

Este proyecto usa el AI Pipeline Framework (APF). Si la tarea implica lógica de negocio, datos, reglas o flujos de usuario (no un cambio puramente cosmético o de infraestructura técnica), leé primero `.cursor/rules/apf-infra-detallada.mdc` y `apf_infra/bcm/BCM.md` antes de proponer código.
```

### Regla 2 — checklist completo, se activa solo cuando corresponde

`.cursor/rules/apf-infra-detallada.mdc`. Ajustá el campo `globs` a las carpetas de código real del proyecto (en un monorepo, apuntá solo a las apps/paquetes que implementan negocio — no a `apf_infra/` en sí ni a configuración):

```markdown
---
description: Checklist completo del pipeline APF antes de implementar
globs: [PATRÓN DE CARPETAS DE CÓDIGO DEL PROYECTO, ej. "src/**", "apps/*/src/**"]
alwaysApply: false
---

# APF — [PROYECTO]

1. Consultá `apf_infra/bcm/BCM.md` — ninguna implementación puede contradecir una regla ahí documentada.
2. Consultá los modelos maestros relevantes en `apf_infra/modelos_maestros/base/` (y sus `_esp` en `especializados/` si aplican al contexto). Fijate primero quién es el `MANTENEDOR` de cada uno antes de proponer cambiarlo.
3. Si la tarea es nueva funcionalidad de negocio, verificá si existe un roadmap auditado en `apf_infra/roadmaps/activos/`. Si no existe, sugerí crear primero el plan base (`apf_infra/roadmaps/plan_base/`) antes de implementar.
4. Si encontrás o corregís un error que no debería repetirse, proponé agregar la regla correspondiente en el modelo maestro apropiado y registrar el cambio en `apf_infra/modelos_maestros/CHANGELOG.md`.
5. Al cerrar una iteración significativa, recordá que corresponde un raconto en `apf_infra/racontos_del_sistema/` (ver `apf_infra/modelos_maestros/base/raconto_maestro.md`).

No implementes sin caso de uso claro. Si falta contexto de negocio, preguntá — no asumas.
```

Si el proyecto destino no usa Cursor, aplicá el mismo criterio de dos niveles (puntero corto + checklist detallado activado por contexto) al mecanismo equivalente de esa herramienta — por ejemplo, un párrafo corto en `AGENTS.md`/`CLAUDE.md` que enlace a una sección más larga, en vez de volcar todo el checklist en el archivo que se carga siempre.

---

## 🧪 Ejemplo de punta a punta (calibración de nivel de detalle — no copiar literal)

> Todo lo anterior está en placeholders. Esto es lo opuesto: un hilo conductor completo, con un caso ficticio, para que quede claro qué nivel de especificidad se espera en cada artefacto. Es de un proyecto inventado ("TiendaSimple", un e-commerce) — no lo copies en un proyecto real, usalo solo como vara de medir.

**Caso de uso:** el cliente pide "que se pueda cancelar un pedido antes de que salga del depósito".

**1) `bcm/BCM.md` — se agrega a la dimensión Operaciones:**
> Cancelar pedido: precondición — el pedido existe y su estado es `PENDIENTE` o `EN_PREPARACION` (no `ENVIADO` ni `ENTREGADO`). Efecto — el estado pasa a `CANCELADO`, se libera el stock reservado, se notifica al cliente. Si falla — la operación no cambia ningún estado parcialmente; si el pedido ya está `ENVIADO`, la operación se rechaza con un mensaje explícito, nunca en silencio.

**2) `roadmaps/plan_base/2026-07-21_cancelacion-pedidos.md`:**
> Intención: el cliente quiere poder arrepentirse de una compra mientras todavía hay margen operativo para hacerlo sin costo de logística. Pregunta abierta para el cliente: ¿el cliente ve el motivo de cancelación o es un campo interno? Referencia BCM: nueva operación, no existía.

**3) `roadmaps/plan_expandido/2026-07-21_cancelacion-pedidos.md`:**
> Supuesto explícito: "en preparación" se puede cancelar sin aprobación de un supervisor (a confirmar con el cliente). Dependencia: el módulo de inventario debe exponer una función de liberar stock reservado — ya existe, se reutiliza. Punto de decisión: si el pedido tenía un cupón aplicado, ¿el cupón se devuelve al cliente o se pierde? Al expandir el plan aparece algo fuera de alcance: los pedidos con envío internacional tienen una política de cancelación distinta (el transportista ya cobra un fee no reversible) que nadie había documentado — no se resuelve ahora, se registra como laguna (ver punto 8).

**4) `roadmaps/activos/2026-07-21_cancelacion-pedidos.md` (fragmento):**
> Paso 3 — Endpoint `POST /pedidos/{id}/cancelar`. Justificación: se modela como una transacción atómica (no como un `PATCH` de estado) porque además de cambiar el estado dispara dos efectos secundarios (liberar stock, notificar) que deben ocurrir todos o ninguno — ver regla BCM de Operaciones. Riesgo identificado: condición de carrera si el pedido pasa a `ENVIADO` en el instante entre que el usuario abre la pantalla y confirma la cancelación → se resuelve con verificación de estado dentro de la misma transacción, no antes.
> Paso 4 — Requiere migración: la tabla `pedidos` no tiene dónde guardar por qué se canceló un pedido. Se referencia `migraciones/2026-07-21_agregar-motivo-cancelacion.md` (ver punto 5) como prerequisito de este paso, no como algo posterior a la implementación.

**5) `migraciones/2026-07-21_agregar-motivo-cancelacion.md`:**
> Cambio propuesto: agregar columnas `motivo_cancelacion` (texto, nullable) y `fecha_cancelacion` (timestamp, nullable) a la tabla `pedidos`. Es no destructivo porque: son columnas nuevas y nullable — ningún dato ni estructura existente se modifica o elimina; todo pedido histórico queda con ambas en `NULL`, que es semánticamente correcto ("nunca fue cancelado"). Vía de reversión: `DROP COLUMN` de ambas, seguro porque ningún otro proceso las lee todavía en el momento de aplicar esta migración.

**6) `auditorias_vybs/2026-07-21_cancelacion-pedidos.md` (hallazgo real, no genérico):**
> Categoría 6 (vulnerabilidades específicas de IA) — el roadmap generado originalmente no contemplaba qué pasa con el cupón aplicado (punto de decisión que quedó abierto en el plan expandido y nadie lo cerró). Severidad: mayor. Resolución: se agrega el paso "el cupón vuelve a estar disponible para el cliente, con la misma fecha de expiración original" y se cierra con BI.

**7) Raconto — las seis secciones, versión `_simp` (tono no técnico, para que se note la diferencia con `_tec`):**

- *Mejoras planeadas:* ahora se puede cancelar un pedido antes de que salga del depósito, sin tener que llamar a soporte.
- *Actores y roles involucrados:* BI relevó el caso con el cliente; QA definió los juegos de prueba de cancelación con y sin cupón aplicado; DEV implementó y se autoauditó antes de pasar a QA.
- *Glosario técnico:* "stock reservado" — la cantidad de producto que ya está comprometida con un pedido pero todavía no salió físicamente del depósito.
- *Tradeoffs y comparativas:* evaluamos permitir cancelar pedidos en cualquier estado, incluso ya enviados, con logística de devolución automática. Lo descartamos para esta iteración: implica coordinar con el transportista externo, agrega semanas de desarrollo, y el cliente solo pidió resolver el caso más frecuente. Queda como mejora futura, ya registrada como laguna conocida.
- *Impacto en el sistema:* 🟡 Amarillo en el módulo de inventario (se agrega un nuevo camino que libera stock reservado — vale monitorear la próxima semana); 🟢 Verde en el resto.
- *Patrones aplicados:* la cancelación se implementó como *Unit of Work* (todos los efectos secundarios ocurren en una sola transacción o ninguno) — el mismo patrón que ya usa el módulo de pagos, por consistencia.

*(La versión `_tec` de la misma iteración desarrollaría cada punto con referencias de código, la métrica exacta de la condición de carrera resuelta, y el nombre real de la clase que implementa el patrón — no simplemente repetir esto con otras palabras.)*

**8) `bcm/lagunas_zonas_grises.md` — la laguna detectada en el paso 3, ahora formalizada:**
> L-01 | Política de cancelación para pedidos con envío internacional (el transportista cobra un fee no reversible que la cancelación actual no contempla) | Detectada durante la expansión del plan de "cancelación de pedidos", el 2026-07-21 | Prioridad: media (bajo volumen de pedidos internacionales por ahora) | Estado: abierta

**9) `modelos_maestros/CHANGELOG.md`:**
> 2026-07-21 — Se agrega RESTRICCIÓN #1 a `roadmap_maestro`: todo roadmap que involucre cancelación o reversión de una operación de negocio debe declarar explícitamente qué pasa con beneficios asociados (cupones, puntos, descuentos), no solo con el estado principal. Origen: hallazgo de auditoría en "cancelación de pedidos".

Nota lo que pasó en el paso 9: un punto ciego real de una iteración se convirtió en una regla permanente. Ese es, literalmente, el mecanismo completo del APF funcionando — no una explicación teórica de él.

**10) Dos iteraciones después — `logs_feedback/critical_tasks/2026-08-04_liberacion-stock-sin-verificacion.md`:**
> El mismo tipo de condición de carrera resuelta en el paso 4 (verificar estado dentro de la misma transacción, no antes) reapareció en el roadmap de "devolución de producto" — otro flujo que también libera stock reservado — porque ese roadmap se construyó sin revisar cómo se había resuelto en cancelación de pedidos. Patrón identificado: no un bug puntual, sino que **liberar stock reservado sin verificación de estado en la misma transacción** es un error que se repite cada vez que aparece un flujo nuevo con ese efecto secundario. Sigue el pipeline completo (roadmap de corrección → auditoría → implementación) y cierra con una regla nueva en `dev_maestro`: "toda operación que libera stock reservado verifica el estado del pedido dentro de la misma transacción que hace la liberación — nunca antes, nunca en un paso separado." Esta es la razón por la que el paso 4 no era un detalle aislado de "cancelación de pedidos": era la primera aparición de una regla que el proyecto todavía no tenía.

---

## ✅ Checklist de inicialización

- [ ] Árbol de `apf_infra/` creado completo.
- [ ] Placeholders `[PROYECTO]`, `[STACK]`, `[FECHA]` reemplazados donde había información disponible.
- [ ] `.cursor/rules/apf-infra.mdc` (puntero corto) y `.cursor/rules/apf-infra-detallada.mdc` (checklist, con `globs` ajustado al proyecto real) creados — o el equivalente de dos niveles si la herramienta de IA no es Cursor.
- [ ] Entrada inicial registrada en `apf_infra/modelos_maestros/CHANGELOG.md`.
- [ ] Resumen presentado al usuario con próximos pasos (BCM real → modelos maestros ajustados al stack → primer plan base).

## 🔁 Mantenimiento — esto no es "configurar una vez y olvidar"

Todo lo creado acá es un **modelo preliminar (v0)**. El valor real del APF no está en el día uno — está en la disciplina de: cerrar cada iteración con su raconto, convertir cada error repetible en una regla de modelo maestro, mantener el BCM honesto sobre sus lagunas, y auditar cada roadmap antes de implementar. Revisar este `apf_infra/` completo con una cadencia mensual es la práctica recomendada para que no acumule deuda de documentación de la misma forma en que el código acumula deuda técnica.
