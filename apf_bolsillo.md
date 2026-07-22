# apf_bolsillo — Versión ligera del AI Pipeline Framework (APF) para un solo desarrollador

**TEMPLATE_VERSION:** 1.0 · **Última actualización del template:** 2026-07-21 · **Fuente:** capítulos 17-26 de *La Expansión Caótica del Software*, en particular 21 (adopción proporcional) y 22 (eficiencia como cultura) · **Versión completa:** `apf_infra.md` (mismo directorio)

> Este archivo es **portable**. Se copia tal cual a la raíz de cualquier proyecto chico o mediano. Cuando una IA de codificación (Cursor, u otra) lo lea y el usuario le pida "definir la arquitectura APF de bolsillo basada en este template", la IA debe crear la carpeta `apf_bolsillo/` con todos sus artefactos, usando el contenido de este documento como fuente exclusiva de verdad.

Este archivo no es capítulo del libro *La Expansión Caótica del Software* — es una herramienta derivada de él. Vive en `docs-internos/` junto a `apf_infra.md`, del que es una versión reducida, no una alternativa distinta: mismos principios, forma más liviana.

---

## 🧭 Qué es esto, en una frase

`apf_bolsillo/` conserva lo que del APF sigue dando valor cuando **una sola persona ocupa los tres roles** (BI, QA y DEV) — roadmap antes de código, acumulación de aprendizaje, maduración por escala (XCM) y memoria narrativa (racontos) — y descarta la ceremonia que existe específicamente para coordinar a *varias* personas: roles documentados por separado, modelos maestros fragmentados en siete archivos con dueños distintos, KPIs de tendencia de equipo, y una auditoría por cada roadmap en vez de una por release.

No es una versión "recortada a medias" del framework completo — es la aplicación literal de un principio que el propio libro nombra: *"la eficiencia no es una fase, es una cultura"* (capítulo 22) y *"el framework se adopta gradual y proporcionalmente al contexto"* (capítulo 21). Usar el checklist completo por reflejo en un proyecto de un solo desarrollador sería, en los términos del propio APF, ineficiente.

## 🤔 Cuándo usar esta versión en vez de `apf_infra.md` completo

Usá `apf_bolsillo/` si la mayoría de estas afirmaciones son ciertas para tu proyecto:

- Sos la única persona escribiendo casos de uso, construyendo el roadmap e implementando.
- No hay un cliente/negocio externo con quien BI necesite mediar formalmente — o si lo hay, la conversación es directa, no requiere traducción a un rol separado.
- El sistema no tiene (todavía) suficiente superficie — módulos, integraciones, volumen de reglas de negocio — como para que un BCM completo de cinco dimensiones sea más que un ejercicio formal.
- Preferís documentación mínima que efectivamente uses, sobre documentación completa que abandones a la tercera iteración.

Si en algún momento deja de cumplirse (se suma alguien más al equipo, el sistema crece, aparece un cliente formal con requerimientos complejos), la sección **"Cuándo y cómo graduar a `apf_infra.md`"** al final de este documento explica la migración — no hay que empezar de cero.

---

## 📖 Glosario mínimo

| Término | Qué significa acá |
|---|---|
| **Roadmap** | Un solo documento por funcionalidad: intención, plan y pasos de implementación juntos — no separado en fases como en la versión completa, porque no hay un "otro rol" esperando cada fase antes de seguir. |
| **XCM** | Técnica de "maduración por escala": evaluar el mismo artefacto en escalas 1-10, 1-100 y 1-1000 sucesivas. Igual que en la versión completa — es barata y de alto valor, no se simplifica. |
| **Raconto** | El resumen narrativo de un release: qué se hizo, qué se descartó y por qué, impacto, patrones aplicados. Una sola versión (no `_simp`/`_tec`) porque no hay audiencias técnicas y no técnicas distintas que atender. |
| **Auditoría pre-release** | Una revisión de vulnerabilidades y puntos ciegos antes de publicar, no antes de cada roadmap individual — la cadencia se ajusta a que sos una sola persona, no un equipo con handoffs. |
| **Notas base** | La versión mínima del BCM: los hechos y reglas que tu proyecto no puede contradecir, sin las cinco dimensiones formales de la versión completa. |

---

## 🤖 Instrucciones para la IA — leer antes de actuar

Si estás leyendo este archivo porque el usuario te pidió instanciar o "definir la arquitectura APF de bolsillo" en el proyecto actual, seguí este procedimiento:

1. **Verificá si ya existe `apf_bolsillo/` o `apf_infra/`** en la raíz del repo. Si existe alguno de los dos con contenido, no sobreescribas: mostrá qué falta y proponé completarlo. Si existe `apf_infra/` completo, preguntá al usuario si realmente quiere una versión reducida en paralelo (inusual) o si más bien quiere simplificar el existente.
2. **Detectá el contexto real del proyecto**: nombre (`package.json`, `pyproject.toml`, README existente, carpeta raíz) y stack tecnológico principal.
3. **Creá exactamente el árbol de carpetas y archivos** de la sección "Árbol completo", en la raíz del repositorio. Todos los archivos en **UTF-8 sin BOM**.
4. **Para cada archivo**, usá el contenido de la sección correspondiente como base literal, reemplazando `[PROYECTO]`, `[STACK]`, `[FECHA]` por los valores reales detectados. Si no podés inferir un valor, dejá el placeholder.
5. **Creá la regla persistente única** descripta en "Regla persistente para la IA" — a diferencia de la versión completa, alcanza con una sola regla (no dos niveles): el volumen de contexto de este template es lo bastante chico como para que cargarlo siempre no sea un problema real de tokens.
6. **No implementes funcionalidad de negocio todavía.** Este paso solo crea el andamiaje.
7. **Al terminar, mostrá al usuario**: el árbol creado, los placeholders pendientes, y los próximos pasos sugeridos: (a) completar `notas_base.md` con las reglas/fuentes reales del proyecto, (b) escribir el primer roadmap.
8. **Registrá la inicialización** con la fecha de hoy en `apf_bolsillo/reglas_aprendidas.md`, y anotá el `TEMPLATE_VERSION` de este archivo en `apf_bolsillo/README.md`.

No preguntes permiso para crear la estructura en sí. Preguntá solo cuando falte información que no podés inferir.

---

## 🌳 Árbol completo a crear

```
apf_bolsillo/
├── README.md
├── notas_base.md
├── roadmaps/
│   └── _template_roadmap.md
├── racontos/
│   └── _template_raconto.md
├── xcm/
│   └── README.md
├── reglas_aprendidas.md
└── auditoria_pre_release.md
```

Siete piezas, contra las más de veinte de `apf_infra/` completo. Cada carpeta de `roadmaps/` y `racontos/` acumula un archivo nuevo por funcionalidad/release con convención de nombre `AAAA-MM-DD_nombre-corto.md` — no hay subcarpetas por fase porque no hay fases separadas que coordinar entre personas distintas.

---

## 📄 `apf_bolsillo/README.md`

```markdown
# apf_bolsillo — Infraestructura APF ligera de [PROYECTO]

Versión de bolsillo del AI Pipeline Framework: mismos principios (roadmap antes de código, aprendizaje acumulado, maduración por escala, cierre con raconto), sin la ceremonia de coordinar varios roles. Pensada para un solo desarrollador.

**Instanciado desde `apf_bolsillo.md` versión:** [TEMPLATE_VERSION] · **Fecha de instanciación:** [FECHA]

**Regla de oro:** no se implementa una funcionalidad sin un roadmap en `roadmaps/`, aunque sea de tres líneas. La disciplina no es el largo del documento — es que exista antes del código.

## Mapa de carpetas

| Carpeta/archivo | Qué contiene | Cuándo se toca |
|---|---|---|
| `notas_base.md` | Hechos y reglas que el proyecto no puede contradecir — la versión mínima del BCM. | Cada vez que se descubre o cambia una regla real. |
| `roadmaps/` | Un archivo por funcionalidad: intención + plan + pasos, todo junto. | Antes de implementar cualquier cosa que no sea trivial. |
| `racontos/` | Un archivo por release: qué se hizo, qué se descartó, impacto, patrones. | Al cerrar cada release. |
| `xcm/` | Técnica de maduración por escala (X→C→M). | Cuando algo tiene alto impacto/larga vida y vale pulirlo antes de fijarlo. |
| `reglas_aprendidas.md` | Errores que no deberían repetirse + historial de cuándo se agregó cada regla. | Cada vez que corregís algo que no debería volver a pasar. |
| `auditoria_pre_release.md` | Revisión de vulnerabilidades y puntos ciegos antes de publicar. | Antes de cada release, no antes de cada roadmap. |

## Estado de madurez

Este `apf_bolsillo/` fue inicializado el [FECHA] a partir del template `apf_bolsillo.md`. Ver la sección "Cuándo y cómo graduar a `apf_infra.md`" en el template si el proyecto crece más allá de lo que esta versión puede sostener con comodidad.
```

---

## 📄 `apf_bolsillo/notas_base.md`

```markdown
# Notas base — [PROYECTO]

> Versión mínima del BCM: no cinco dimensiones formales, solo lo que realmente necesitás no contradecir. Si en algún momento esto crece a un dominio complejo con roles/operaciones/persistencia diferenciados, es señal de que conviene graduar a un BCM completo (ver `apf_infra.md`).

## Reglas y hechos que el proyecto no puede contradecir

- [Regla 1: ejemplo — "un usuario anónimo puede leer todo el contenido, no hace falta cuenta para consultar información de emergencia."]
- _(completar a medida que aparecen)_

## Fuentes de verdad del contenido (si el proyecto publica información factual/sensible)

> Si tu proyecto informa procedimientos, datos de seguridad, salud, o cualquier contenido donde un error tiene consecuencias reales (no solo estéticas), esta tabla es la pieza más importante de todo `apf_bolsillo/` — más que el roadmap. Cada afirmación de "cómo proceder" debería poder rastrearse hasta una fila de acá.

| Afirmación / procedimiento | Fuente (organismo, documento, URL) | Fecha de la fuente | Última verificación |
|---|---|---|---|
| [ejemplo: "en caso de ola de calor, hidratarse cada 15-20 min"] | [ej. protocolo oficial de defensa civil / OMS] | [fecha del documento fuente] | [FECHA] |

## Decisiones de alcance

- [Qué está explícitamente fuera de alcance de este proyecto, para no re-discutirlo cada vez que aparece la tentación de agregarlo.]
```

---

## 📄 `apf_bolsillo/roadmaps/_template_roadmap.md`

```markdown
# Roadmap — [nombre de la funcionalidad]

**Fecha:** [FECHA] · **Estado:** planeado | en progreso | implementado | auditado

## Intención

[Qué necesito que exista y por qué, en una o dos frases. No hace falta traducir a "caso de uso formal" — alcanza con que sea inequívoco para vos mismo dentro de un mes.]

## Referencia a notas_base.md

¿Esto contradice o depende de alguna regla ya documentada en `../notas_base.md`? [completar — si la respuesta revela una regla nueva, agregala ahí primero.]

## Supuestos y puntos de decisión abiertos

- [Todo lo que estás asumiendo sin haber verificado. Si más adelante uno de estos resulta falso, es la primera fuente a revisar.]

## Pasos de implementación (con justificación de las decisiones no obvias)

1. [Paso] — Justificación: [por qué así y no de otra forma, solo si no es evidente]

## Riesgos identificados

- [ ]

## Estimación

- **Complejidad estimada:** baja/media/alta · **Tiempo estimado:** [...]
```

---

## 📄 `apf_bolsillo/racontos/_template_raconto.md`

```markdown
# Raconto — [nombre del release]

**Fecha:** [FECHA] · **Roadmaps incluidos:** [referencias a `../roadmaps/*.md`]

## Qué cambió

[Qué puede hacer el sistema ahora que antes no podía.]

## Qué se descartó y por qué

[Alternativas evaluadas y no elegidas, con el motivo real — no genérico.]

## Impacto

- 🟢 Verde / 🟡 Amarillo / 🔴 Rojo — [área]: [detalle. Amarillo o rojo significa "vale la pena mirar esto de nuevo en el próximo release", no es una alarma grave por sí sola.]

## Patrones aplicados

[Decisiones de diseño relevantes, para no tener que releer el código para recordarlas dentro de seis meses.]

## Lecciones (si alguna se convirtió en regla nueva)

- Ver `../reglas_aprendidas.md` — [referencia a la entrada agregada, si corresponde]
```

---

## 📄 `apf_bolsillo/xcm/README.md`

```markdown
# XCM — Maduración por escala

Técnica de prompt engineering para llevar cualquier artefacto (código, `notas_base.md`, un roadmap, un raconto) a su mejor versión posible, forzando al modelo de IA a cambiar de escala de evaluación en tres iteraciones sucesivas. Igual que en la versión completa del framework — no se simplifica, porque el costo de aplicarla es bajo y el retorno es alto incluso para un proyecto chico.

## Prompts listos para copiar (reemplazar `[área]` y `[artefacto]`)

**Iteración X (1-10):**
> "Eres experto en [área]. Quiero que califiques del 1 al 10 este [artefacto] — siendo 1 lo más deficiente y 10 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 10."

**Iteración C (1-100), sobre el resultado ya mejorado de la iteración X:**
> "Ahora quiero que califiques del 1 al 100 este [artefacto] — siendo 1 lo más deficiente y 100 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 100."

**Iteración M (1-1000), sobre el resultado ya mejorado de la iteración C:**
> "Ahora quiero que califiques del 1 al 1000 este [artefacto] — siendo 1 lo más deficiente y 1000 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 1000."

## Cuándo aplicarlo (versión de bolsillo)

No hace falta aplicarlo a todo. Reservalo para: el contenido de `notas_base.md` cuando trata temas sensibles (ver nota de "Fuentes de verdad" ahí), un roadmap antes de implementar algo que te genera dudas, y el código de los módulos más críticos antes de un release importante. No es necesario un registro formal de ciclos aplicados como en la versión completa — con un solo desarrollador, la aplicación misma ya deja rastro en el historial de conversación con la IA.
```

---

## 📄 `apf_bolsillo/reglas_aprendidas.md`

````markdown
# Reglas aprendidas — [PROYECTO]

Fusiona lo que en la versión completa serían `dev_maestro.md` + `CHANGELOG.md`: un registro cronológico de errores que no deberían repetirse y las reglas que generaron. Es la razón principal por la que "un solo desarrollador" no significa "sin memoria institucional" — la memoria simplemente cabe en un archivo en vez de siete.

## [FECHA] — Inicialización

- Inicialización de `apf_bolsillo/` a partir del template `apf_bolsillo.md`. Sin reglas todavía — proyecto recién instrumentado.

## Formato para cada regla nueva

```
[FECHA] — [Título corto de la regla]
Error: qué pasó.
Contexto: en qué situación pasó.
Regla: qué se hace distinto de ahora en más.
```

Agregar cada entrada nueva arriba de las anteriores (orden cronológico descendente), para que lo más reciente y probablemente más relevante esté siempre primero.
````

---

## 📄 `apf_bolsillo/auditoria_pre_release.md`

````markdown
# Auditoría pre-release — [PROYECTO]

Una revisión antes de cada release (no antes de cada roadmap individual — esa cadencia es de equipo, no de un solo desarrollador). Se hace releyendo lo implementado desde afuera, como si lo hubiera escrito otra persona.

## Categorías de revisión (ajustar según el proyecto)

1. **Alineación con `notas_base.md`** — ¿algo de lo implementado contradice una regla ya documentada?
2. **Cobertura de casos borde** — ¿qué pasa si falla la red, si el dato viene vacío, si el usuario hace algo inesperado?
3. **Vulnerabilidades específicas de IA** — confianza excesiva en el flujo feliz, soluciones genéricas donde el proyecto necesitaba algo específico, ambigüedades que quedaron sin resolver.
4. **Si el proyecto publica contenido factual/sensible: exactitud de fuentes** — ¿toda afirmación de procedimiento en esta iteración tiene una fuente citada en `notas_base.md`, y esa fuente sigue vigente? Esta categoría no existe en la auditoría genérica de la versión completa — se agrega acá porque, para un sitio informativo sobre procedimientos de seguridad, es la categoría de mayor impacto real, más que cualquier vulnerabilidad técnica.

## Registro de auditorías

| Fecha | Release | Hallazgos | ¿Bloquea el release? |
|---|---|---|---|
| [FECHA] | [nombre] | [...] | sí/no |
````

---

## 🔒 Regla persistente para la IA del proyecto destino

A diferencia de `apf_infra.md`, acá alcanza con **una sola regla**, no dos niveles: el contenido de `apf_bolsillo/` es chico, y cargarlo siempre no infla el contexto de forma significativa.

`.cursor/rules/apf-bolsillo.mdc`:

```markdown
---
description: Infraestructura APF de bolsillo del proyecto (apf_bolsillo/)
alwaysApply: true
---

Este proyecto usa una versión ligera del AI Pipeline Framework (APF), pensada para un solo desarrollador. Antes de implementar algo que no sea trivial (no un typo, no un cambio cosmético):

1. Consultá `apf_bolsillo/notas_base.md` — nada puede contradecir una regla ahí documentada.
2. Verificá si existe un roadmap en `apf_bolsillo/roadmaps/`. Si no existe para lo que se está pidiendo, proponé crear uno primero — aunque sea breve.
3. Consultá `apf_bolsillo/reglas_aprendidas.md` antes de proponer un patrón — puede que ya exista una regla sobre esto por un error previo.
4. Si corregís un error que no debería repetirse, proponé agregar la regla en `apf_bolsillo/reglas_aprendidas.md`.
5. Antes de un release, recordá que corresponde `apf_bolsillo/auditoria_pre_release.md` y un raconto en `apf_bolsillo/racontos/`.

No implementes sin roadmap para cambios no triviales. Si falta contexto, preguntá.
```

---

## 🧪 Ejemplo mínimo de punta a punta

> Caso ficticio, pensado para el tipo de proyecto donde esta versión de bolsillo brilla: una PWA informativa sobre emergencias climáticas.

**Pedido:** agregar una sección "qué hacer durante una ola de calor".

**1) `notas_base.md` — se agrega a "Fuentes de verdad del contenido":**
> "Hidratarse cada 15-20 minutos aunque no se sienta sed; evitar exposición solar entre 11 y 17hs; nunca dejar personas o mascotas en vehículos cerrados" — fuente: protocolo oficial de la autoridad de defensa civil correspondiente, [fecha del documento] · última verificación: [FECHA].

**2) `roadmaps/2026-07-21_ola-de-calor.md`:**
> Intención: cubrir el escenario climático más frecuente en la región que hoy no tiene sección propia. Referencia a notas_base: nueva entrada, no existía. Punto de decisión abierto: ¿esta sección necesita traducción a otros idiomas desde el día uno, o eso es un roadmap aparte? → se decide: aparte, se documenta como fuera de alcance de este roadmap. Paso único: nueva página estática + entrada en el índice de emergencias existente.

**3) `auditoria_pre_release.md` (antes de publicar):**
> Categoría 4 (exactitud de fuentes) — la recomendación sobre vehículos cerrados no tenía fuente citada en el borrador inicial, solo "sentido común". Hallazgo: no se publica sin fuente verificable aunque el contenido "suene correcto" — se busca y se agrega la fuente antes de aprobar el release.

**4) `racontos/2026-07-21_release-emergencias-clima.md`:**
> Qué cambió: nueva sección de ola de calor, con fuentes citadas y verificadas. Qué se descartó: traducción a otros idiomas — queda como roadmap futuro. Impacto: 🟢 Verde — contenido nuevo, no modifica nada existente. Lecciones: ver `reglas_aprendidas.md`.

**5) `reglas_aprendidas.md` — nueva entrada:**
> 2026-07-21 — No publicar contenido de procedimiento sin fuente citada. Error: una recomendación entró al borrador sin fuente, detectada solo en la auditoría pre-release, no antes. Contexto: sonaba correcta por sentido común, lo que hizo que nadie la cuestionara al escribirla. Regla: toda afirmación de "cómo proceder" se escribe junto con su fuente en `notas_base.md` en el mismo momento en que se agrega al roadmap, no después.

Nota lo que pasó en el paso 5: exactamente el mismo mecanismo del APF completo — un punto ciego real se convierte en una regla permanente — con un cuarto del aparato documental.

---

## ⬆️ Cuándo y cómo graduar a `apf_infra.md` completo

Señales de que conviene migrar: se suma otra persona al proyecto (aunque sea part-time), el número de reglas en `notas_base.md` empieza a necesitar categorías (roles, operaciones, persistencia) para no volverse una lista inmanejable, o `reglas_aprendidas.md` supera unas 15-20 entradas y se vuelve difícil de escanear.

La migración es incremental, no un "empezar de cero":

| En `apf_bolsillo/` | Se convierte en (`apf_infra/`) |
|---|---|
| `notas_base.md` | `bcm/BCM.md`, reorganizado en las cinco dimensiones formales |
| `roadmaps/*.md` (fusionados) | Se separan en `plan_base/` + `plan_expandido/` + `activos/` por funcionalidad |
| `reglas_aprendidas.md` | Se reparte entre `modelos_maestros/base/*.md` según el área de cada regla |
| `racontos/*.md` (versión única) | `racontos_del_sistema/` con `_simp` + `_tec` separados |
| `auditoria_pre_release.md` | `auditorias_vybs/` con una auditoría por roadmap en vez de por release |
| `xcm/` | Se copia igual — no cambia |

No hace falta migrar todo el historial acumulado — alcanza con seguir el proceso completo desde la próxima iteración y dejar lo viejo de `apf_bolsillo/` como archivo histórico dentro de `apf_infra/` si vale la pena conservarlo.

---

## ✅ Checklist de inicialización

- [ ] Árbol de `apf_bolsillo/` creado completo (siete piezas).
- [ ] Placeholders `[PROYECTO]`, `[STACK]`, `[FECHA]` reemplazados donde había información disponible.
- [ ] `.cursor/rules/apf-bolsillo.mdc` creado.
- [ ] Entrada inicial registrada en `apf_bolsillo/reglas_aprendidas.md`.
- [ ] Si el proyecto publica contenido factual/sensible: primera pasada de `notas_base.md` con al menos las fuentes más críticas citadas.

## 🔁 Mantenimiento

El riesgo específico de esta versión de bolsillo no es la falta de estructura — es que, precisamente por ser liviana, es fácil dejarla de lado "por esta vez". La disciplina mínima no negociable son dos hábitos: ningún roadmap se salta, y ningún release sale sin su entrada en `racontos/`. Todo lo demás (XCM, auditoría con categoría de fuentes) se aplica con el criterio de cuánto importa el error en ese caso concreto — que es, después de todo, el principio de proporcionalidad que justifica esta versión del template.
