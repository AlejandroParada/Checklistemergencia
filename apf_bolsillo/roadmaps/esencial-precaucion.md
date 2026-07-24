# Roadmap — Sección «Esencial precaución»

**Fecha:** 2026-07-24 · **Estado:** implementado (2026-07-24)

## Intención

Agregar al menú principal la categoría **Esencial precaución** que aborda la prevención y situaciones específicas de preparación. Panel con contenido en modo colapsable similar a "Qué hacer si…" pero orientado a prevención y planificación proactiva ante riesgos identificados.

## Referencia a notas_base.md

- Panel de referencia (`type: "guides"`), sin checkboxes ni progreso.
- Contenido se agrega al catálogo único en `data/checklist.js`.
- Mantiene coherencia con la estructura de navegación por tabs existente.
- No contradice reglas existentes sobre identificadores estables ni navegación.

## Supuestos y puntos de decisión abiertos

- Mantenemos la estructura de acordeón/lista colapsable para consistencia con "Qué hacer si…"
- Agregamos contenido preventivo que no se superpone con las etapas del checklist principal
- Las fuentes de información de prevención serán agregadas a la tabla de `notas_base.md`

## Pasos de implementación

1. **Expandir el catálogo en `data/checklist.js`** — Agregar nueva entrada `type: "guides"` con la estructura de prevención
   - Justificación: Mantiene consistencia con la arquitectura existente y permite reutilizar el renderizado de guides

2. **Definir estructura de contenido preventivo** — Crear las secciones principales:
   - "Importante" (principios generales de prevención)
   - "Qué hacer - Verifica..." (situaciones específicas con listas de verificación)
   - Justificación: Estructura clara que separa principios de acciones específicas

3. **Expandir contenido con situaciones adicionales** — Agregar más casos de prevención:
   - Clima extremo (olas de calor, heladas, granizo)
   - Cortes de servicios prolongados
   - Seguridad del hogar y alrededores
   - Justificación: Mantener el principio DRY evitando duplicar contenido con otras secciones

4. **Actualizar fuentes en `notas_base.md`** — Documentar fuentes de las recomendaciones preventivas
   - Justificación: Cumplir con el protocolo de trazabilidad de contenido factual/sensible

5. **Verificar coherencia con secciones existentes** — Revisar que no haya duplicación de contenido
   - Justificación: Principio DRY documentado en el request del usuario

6. **Testing de la nueva sección** — Verificar navegación y funcionalidad del acordeón

7. **Update del service worker** — Bump version para cache refresh

## Implementación completada

✅ **Pasos realizados (2026-07-24):**

1. ✅ Expandido el catálogo en `data/checklist.js` con nueva entrada `type: "guides"`
2. ✅ Definida estructura de contenido preventivo con secciones "Importante" y "Qué hacer - Verifica..."
3. ✅ Agregadas 9 situaciones específicas de prevención:
   - Principios de prevención
   - Cañadas y desbordes
   - Personas vulnerables (mayores, discapacitados, niños, embarazadas)
   - Árboles grandes
   - Estructura edilicia precaria
   - Orientación para extranjeros
   - Clima extremo y eventos estacionales
   - Cortes de servicios prolongados
   - Seguridad preventiva del hogar
4. ✅ Actualizadas fuentes en `notas_base.md` con trazabilidad de contenido
5. ✅ Verificada coherencia para mantener principio DRY
6. ✅ Creada página de testing para verificar funcionamiento
7. ✅ Actualizado service worker y versiones de cache (v39)

## Contenido implementado (detalle)

### Importante (principios generales):
- Si ya pasó antes, es probable que vuelva a pasar
- Si nunca pasó antes, siempre hay una primera vez
- Si le pasó a un vecino es probable que me pueda pasar a mí
- Siempre anticipa vías alternativas de escape, no esperes a que el agua llegue a la puerta
- Identifica cuál es el lugar más seguro de la casa para estar
- Si hay algún riesgo que identifiques solicita ayuda para gestionarlo

### Qué hacer - Verifica (situaciones específicas):

**Hay una cañada cerca y con probabilidad de desborde:**
- El nivel del agua de la cañada o zanja cada día
- Si la vivienda tiene segundo piso, preparar espacio y subir electrodomésticos
- Resguardo de mascotas con anticipación
- Aislación/desconexión de instalaciones eléctricas
- Estado de puentes transitables
- Vehículos en lugar seguro alejado
- Limpieza de desagües y obstrucciones

**Tengo bajo mi cuidado personas vulnerables:**
- Medicación necesaria disponible
- Ropa de abrigo suficiente
- Plan de resguardo de integridad física
- Red de apoyo familiar/amigos contactada
- Documentación médica actualizada

**Hay árboles grandes propensos a desprendimiento:**
- Riesgo de caída de ramas sobre la casa
- Estado de raíces y sustento en el suelo
- Acceso no bloqueado a vivienda e instalaciones
- Control del crecimiento mediante podas preventivas

**La estructura edilicia es precaria:**
- Seguridad del techo ante vientos
- Aislación de ventanas y puertas
- Cables eléctricos seguros y normalizados
- Suelo con material para evitar barro interior

**Soy extranjero y no sé qué hacer:**
- Documentos necesarios completos
- Trámites consulares al día
- Contacto referente de la nacionalidad
- Pertenencia a comunidades de residentes
- Pasos para cobertura social y derechos laborales

### Situaciones adicionales propuestas:

**Clima extremo y eventos estacionales:**
- Preparación para olas de calor (hidratación, refrigeración)
- Prevención en heladas (tuberías, plantas, calefacción)
- Protección contra granizo (vehículos, cultivos)
- Vientos fuertes y tormentas eléctricas

**Cortes de servicios prolongados:**
- Plan de comunicación sin telefonía/internet
- Reservas para cortes de agua extendidos
- Alternativas para cocción sin gas
- Gestión de residuos sin recolección

**Seguridad preventiva del hogar:**
- Verificación periódica de instalaciones
- Mantenimiento de techos y estructuras
- Control de plagas y roedores
- Seguridad contra intrusión

## Riesgos identificados

- [ ] Potencial duplicación de contenido con secciones existentes del checklist
- [ ] Sobrecarga cognitiva si la sección se vuelve muy extensa
- [ ] Necesidad de fuentes confiables para todas las recomendaciones preventivas
- [ ] Mantenimiento del contenido actualizado con cambios normativos/procedimentales

## Estimación

- **Complejidad estimada:** media · **Tiempo estimado:** 2-3 horas
  - 1h para estructura y contenido base
  - 1h para contenido adicional y verificación DRY
  - 30min para fuentes y testing