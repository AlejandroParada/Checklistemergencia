# Roadmap — Sección Abastecimiento (supermercados + Maps)

**Fecha:** 2026-07-21 · **Estado:** hecho (2026-07-21)

## Intención

Agregar al menú la categoría **Abastecimiento** con supermercados de la zona (Mercado del Este, Tres Hermanos, Tata). Al tocar el nombre se abre Google Maps en la ubicación del local.

## Referencia a notas_base.md

- Paneles de referencia sin checkboxes (como `contacts`); no cuentan en el progreso.
- Catálogo único en `data/checklist.js`; menú derivado del mismo.
- Coordenadas/direcciones documentadas en fuentes de verdad de `notas_base.md`.

## Pasos

1. ✅ Extender catálogo con `type: "places"` (Mercado del Este, Tres Hermanos, Tata).
2. ✅ `renderPlaces` + enlace Google Maps (nombre tappable).
3. ✅ SW `v18` / `?v=18`.
4. ✅ Fuentes de ubicación en `notas_base.md`.

## Riesgos

- Coordenadas aproximadas si no hay ficha oficial precisa → preferir query por dirección verificada.
- Ta-Ta: confirmar sucursal de la zona (puede haber varias).

## Estimación

- **Complejidad:** baja · **Tiempo:** ~30 min
