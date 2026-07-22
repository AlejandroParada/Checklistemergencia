# Roadmap — Reorganización de secciones de contenido

**Fecha:** 2026-07-21 · **Estado:** hecho (2026-07-21)

## Intención

Separar y ampliar el catálogo para consulta clara en móvil/tablet: Salud (botiquín detallado) vs Higiene y limpieza; añadir Vestimenta; e incluir secciones de referencia con teléfonos de emergencias y líderes locales.

## Referencia a notas_base.md

- Depende del catálogo único en `data/checklist.js` y de IDs estables.
- Emergencias y Líderes locales son paneles de referencia (enlaces `tel:` / WhatsApp), no checkboxes; el progreso global solo cuenta ítems con `data-id`.
- Teléfonos de líderes: placeholders hasta cargar números reales del barrio.

## Pasos

1. ✅ Actualizar `data/checklist.js`: "Salud" + "Higiene y limpieza" + "Vestimenta y otros" + `type: "contacts"` (Emergencias, Líderes).
2. ✅ Extender `renderChecklist` / menú para paneles de contactos (sin checkboxes).
3. ✅ Quitar dropdown de horizonte; cantidades por `tier.days` de cada etapa.
4. ✅ CSS de contactos; SW `v17` + query `?v=17` en assets.

## Riesgos

- IDs nuevos no chocan con estado viejo; ítems movidos de sección pueden dejar keys huérfanas en `localStorage` (inocuo).
- Números de líderes incorrectos si se publican placeholders sin reemplazar.

## Estimación

- **Complejidad:** media · **Tiempo:** ~1 sesión
