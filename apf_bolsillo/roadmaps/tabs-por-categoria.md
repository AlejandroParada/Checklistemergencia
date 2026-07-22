# Roadmap — Tabs por categoría (sin scroll entre secciones)

**Fecha:** 2026-07-21 · **Estado:** implementado

## Intención

Cada categoría del menú lateral es un tab independiente: solo se muestra una a la vez (sin scrollear el listado completo de categorías). Contenido y menú siguen saliendo de `CHECKLIST` en JS (DRY).

## Referencia a notas_base.md

- Depende de: catálogo único en `data/checklist.js`, `data-id` estables, progreso en `localStorage`, offline PWA.
- ✅ Progreso global documentado en `notas_base.md`; navegación por tabs documentada.

## Hecho

1. ✅ Roadmap.
2. ✅ Paneles `role="tabpanel"`; solo uno activo (`hidden`).
3. ✅ Menú `role="tablist"` / `role="tab"`; `showTab` + hash `#id` + flechas.
4. ✅ Sin IntersectionObserver.
5. ✅ CSS paneles + estilos de tab button.
6. ✅ Cache SW `v7`.

## Estimación

- **Complejidad:** baja–media · **Tiempo:** una sesión corta
