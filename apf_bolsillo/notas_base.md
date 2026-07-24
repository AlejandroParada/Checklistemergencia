# Notas base — ChecklistEmergencia

> Versión mínima del BCM: no cinco dimensiones formales, solo lo que realmente necesitás no contradecir. Si en algún momento esto crece a un dominio complejo con roles/operaciones/persistencia diferenciados, es señal de que conviene graduar a un BCM completo (ver `apf_infra.md`).

## Reglas y hechos que el proyecto no puede contradecir

- Un vecino puede usar el checklist sin cuenta ni login: el progreso vive en el dispositivo/navegador.
- Cada ítem tiene un identificador estable (`data-id`); no se renombra ni se reutiliza sin plan de migración del estado guardado.
- El progreso se mide como ítems marcados / total de ítems del catálogo (global; los paneles de tab ocultos siguen contando).
- La navegación entre categorías es por tabs derivados del catálogo: una categoría visible a la vez.
- Hay paneles `type: "contacts"`, `type: "places"` y `type: "guides"` («Qué hacer si…», «Esencial precaución») sin checkboxes; no cuentan en el progreso global.
- Los textos de `guides` son orientación; en emergencia real corresponde llamar al 911. Fuentes en la tabla de abajo.
- "Salud" (botiquín/medicación) e "Higiene y limpieza" son categorías distintas; "Vestimenta y otros" es categoría propia.
- En `contacts` con `whatsapp`, el ícono abre `https://api.whatsapp.com/send?phone=<598…>&text=hola`. En Android se usa `intent://…;package=com.whatsapp` para preferir WhatsApp normal (no Business).
- En `places`, tocar el nombre abre Google Maps (`lat`/`lng` o `mapsQuery`).
- El tamaño del hogar (`adultos`, `menores`) vive en el dispositivo (`localStorage`); no reinicia el progreso de checkboxes.
- Un menor cuenta como **0,75** persona-equivalente frente a un adulto (agua y demás ítems escalables).
- Agua base: **3 L** por persona-equivalente y por día.
- Solo ítems con `scale` en el catálogo recalculan cantidades; `kind: "none"` es texto fijo.
- Mínimo 1 adulto; menores ≥ 0; tope 20 por contador.
- Copy de ayuda y ajustes de tipografía viven en el panel Info (no en el header mobile).
- Preferencia de tema claro/oscuro en `localStorage` (`checklistTheme`); default oscuro.
- Las etapas del catálogo son 1 semana, 1 mes, 3 meses, 6 meses y 1 año (`tier.days`: 7/30/90/180/365); las cantidades temporales usan los días de su etapa.
- Reiniciar marcados exige confirmación explícita del usuario; cancelar no cambia nada.
- La app debe seguir usable offline tras la primera visita (PWA / service worker).
- El contenido se organiza en categorías y cinco etapas temporales (1 semana, 1 mes, 3 meses, 6 meses, 1 año).
- El catálogo de ítems es una fuente de datos única (`data/checklist.js`); el DOM del checklist y el menú se derivan de ella.
- Las rutas de assets son relativas (`./`) para funcionar bajo el path de GitHub Pages (`usuario.github.io/<repo>/`).
- _(completar a medida que aparecen)_

## Fuentes de verdad del contenido (si el proyecto publica información factual/sensible)

> Si tu proyecto informa procedimientos, datos de seguridad, salud, o cualquier contenido donde un error tiene consecuencias reales (no solo estéticas), esta tabla es la pieza más importante de todo `apf_bolsillo/` — más que el roadmap. Cada afirmación de "cómo proceder" debería poder rastrearse hasta una fila de acá.

| Afirmación / procedimiento | Fuente (organismo, documento, URL) | Fecha de la fuente | Última verificación |
|---|---|---|---|
| Orientación general del checklist (etapas de preparación, categorías de insumos) | Footer del producto: "orientación de autosuficiencia de la Iglesia y buenas prácticas de gestión de riesgos" — [completar documento/URL concretos] | [pendiente] | 2026-07-21 |
| Mercado del Este — Ruta 8 km 24.700, Barros Blancos (−34.7606, −56.013) | Sitio oficial + ficha 1122.com.uy (schema GeoCoordinates) | 2026-07-21 | 2026-07-21 |
| Tres Hermanos — Ruta 8 km 23.800, Barros Blancos (−34.7639555, −56.0190742) | guiacomercial.uy / near-place.com | 2026-07-21 | 2026-07-21 |
| Tata — Ruta 8 km 24.200, Barros Blancos | LinkedIn TaTa S.A. (ubicación) + zona Ruta 8/74; pin aproximado | 2026-07-21 | 2026-07-21 |
| Líderes locales — Obispo J. L. Rodrigues (095 540 125); Danilo Donati, Pte. Quórum de Élderes (094 231 738); Estefanía López, Pta. S.S. (091 318 368) | Confirmado por el responsable del barrio (usuario del proyecto) | 2026-07-21 | 2026-07-21 |
| Qué hacer si… — inundación, incendio, gas, techo | Guía familiar para la reducción de riesgos (SINAE) | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — olor a gas / garrafa | Manual operadores uso seguro de energía (MIEM) | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — persona herida (PAS) | Buenas prácticas primeros auxilios (PAS: Proteger, Avisar, Socorrer) | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — accidente de tránsito | UNACEV — Qué hacer frente a un siniestro de tránsito | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — sin electricidad | UTE atención 0800 1930 + prácticas habituales de corte | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — sismo / temblor | [SINAE — Sismos en Uruguay](https://www.gub.uy/sistema-nacional-emergencias/sismos) | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — serpiente / mordedura | [MSP — recomendaciones ofidismo](https://www.gub.uy/ministerio-salud-publica/comunicacion/noticias/recomendaciones-del-msp-por-caso-de-mordedura-de-ofidio); CIAT 1722 | 2026-07-22 | 2026-07-22 |
| Qué hacer si… — descarga, aplastamiento, desmayo, respirar, auxilio, disparos | PAS + buenas prácticas de primeros auxilios; 911 | 2026-07-22 | 2026-07-22 |
| Esencial precaución — principios de prevención | Guía familiar para la reducción de riesgos (SINAE) + buenas prácticas de gestión de riesgos | 2026-07-24 | 2026-07-24 |
| Esencial precaución — preparación para inundaciones | Guía familiar para la reducción de riesgos (SINAE) + Plan de Contingencia Municipal | 2026-07-24 | 2026-07-24 |
| Esencial precaución — cuidado de personas vulnerables | MSP protocolos de emergencias + IMPO normativas de accesibilidad | 2026-07-24 | 2026-07-24 |
| Esencial precaución — prevención estructural y arbórea | Bomberos procedimientos + intendencia normativas de construcción | 2026-07-24 | 2026-07-24 |
| Esencial precaución — orientación para extranjeros | Dirección Nacional de Migración + consulados + MIDES | 2026-07-24 | 2026-07-24 |
| Esencial precaución — clima extremo y servicios | INUMET alertas meteorológicas + protocolos UTE/OSE | 2026-07-24 | 2026-07-24 |

## Decisiones de alcance

- Sin cuentas de usuario ni sincronización entre dispositivos (por ahora).
- Sin edición in-app del catálogo de ítems: el contenido se cambia en release (HTML), no por el usuario final.
- Sin backend: persistencia solo local (`localStorage`).
