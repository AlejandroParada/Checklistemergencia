# Roadmap — Refactor PWA: menú lateral, DRY y alineación GitHub Pages

**Fecha:** 2026-07-21 · **Estado:** en progreso

**Progreso por fase:** A–D hechas (2026-07-21) · E pendiente

**URL Pages prevista:** `https://AlejandroParada.github.io/Checklistemergencia/` — el `id` del manifest es `/Checklistemergencia/` (nombre real del repo en GitHub).

## Intención

Convertir el checklist monolítico actual en una PWA consultable en celular/tablet, con menú lateral responsive, contenido generado desde una sola fuente de datos (DRY), assets cacheables por separado, y ajustes de manifest/SW/GitHub Pages listos para publicar en el usuario de GitHub Pages — sin romper el progreso ya guardado en `localStorage`.

## Referencia a notas_base.md

Depende de (no contradice):

- Progreso solo en el dispositivo (`localStorage`), sin login.
- Identificadores estables por ítem (`data-id`); el refactor **debe preservar** los `data-id` actuales (o incluir plan de migración si se cambia la generación).
- Progreso = marcados / total de ítems visibles.
- Reiniciar exige confirmación explícita.
- Usable offline tras la primera visita (PWA / SW).
- Organización en categorías + tres etapas (1 semana, 1 mes, 3 meses).
- Sin edición in-app del catálogo: el contenido sigue cambiándose en release.
- Sin backend.

Reglas nuevas que conviene documentar en `notas_base.md` al implementar (o antes):

- El catálogo de ítems es una fuente de datos única (JS/JSON); el DOM del checklist y el menú se derivan de ella.
- Las rutas de assets deben ser relativas (`./`) para funcionar bajo el path de GitHub Pages (`usuario.github.io/<repo>/`).

## Supuestos y puntos de decisión abiertos

- Se mantiene stack vanilla (HTML/CSS/JS, sin bundler ni framework) para no complicar el deploy estático.
- El menú lateral apunta a anclas por categoría (`#agua`, etc.); no se introduce enrutado SPA.
- Los `data-id` actuales (`agua-s-1`, `alim-m-2`, …) se preservan literalmente en la estructura de datos (no regenerarlos al vuelo con índices que puedan desfasarse).
- Google Fonts: se decide en el paso de baja prioridad si se auto-hospedan o se dejan con `preconnect` + cache runtime; el offline “duro” de tipografía no bloquea el resto.
- Nombre del repo / path en GitHub Pages: `Checklistemergencia` (usuario `AlejandroParada`); el `id` del manifest es `/Checklistemergencia/`.
- No se agrega sincronización entre dispositivos ni cuentas.

## Prioridades (orden de trabajo)

| Prioridad | Tema | Criterio de hecho |
|---|---|---|
| Alta | Datos + render dinámico (DRY) | ✅ Hecho 2026-07-21 |
| Alta | Menú lateral responsive | ✅ Hecho 2026-07-21 |
| Media | Separar CSS/JS + actualizar SW | ✅ Hecho 2026-07-21 |
| Media | Ajustes `manifest.json` | ✅ Hecho 2026-07-21 |
| Baja | Offline tipografía, `.nojekyll`, ícono Apple, Open Graph | Mejoras de pulido; no bloquean el uso principal |

## Pasos de implementación (con justificación de las decisiones no obvias)

### Fase A — Fuente de datos DRY (prioridad alta) ✅ 2026-07-21

1. ✅ Extraer el catálogo a `data/checklist.js` (IDs literales preservados).
2. ✅ `renderChecklist` en `app.js` genera el mismo DOM semántico (`section.category` + `id` de categoría para anclas futuras, tiers, checkboxes con `data-id`).
3. ✅ Persistencia, progreso, reset, fuente, SW e install prompt migrados a `app.js` sin cambiar `STORAGE_KEY` (`checklistEmergenciaState`) ni el formato del estado.
4. ✅ Verificación 1:1 de 43 `data-id` históricos vs catálogo.
5. ⚠️ Adelanto mínimo de Fase C: `sw.js` → `checklist-emergencia-v2` precachea `./app.js` y `./data/checklist.js` (necesario para offline tras el split). CSS sigue inline hasta Fase C.

### Fase B — Menú lateral responsive (prioridad alta) ✅ 2026-07-21

5. ✅ `renderNav` desde `CHECKLIST` (emoji + título + anclas `#id`); secciones ya tenían `id` desde Fase A.
6. ✅ Drawer mobile: botón hamburguesa ≥44px, overlay, Escape, `aria-expanded` / `aria-label`, foco al primer link al abrir y al botón al cerrar con Escape; cierre al elegir categoría.
7. ✅ Desktop (`min-width: 900px`): nav fijo a la izquierda + `.app-content` con `margin-left`; hamburguesa/overlay ocultos.
8. ✅ `IntersectionObserver` marca `.is-active` en el link de la categoría visible.
9. Cache SW bump a `checklist-emergencia-v3` (HTML/JS del menú).

### Fase C — Separación de assets y Service Worker (prioridad media) ✅ 2026-07-21

9. ✅ Estilos en `styles.css`; `index.html` queda como shell (meta + markup + links a assets).
10. ✅ `sw.js` → `checklist-emergencia-v4`; `ASSETS` incluye `./styles.css` (+ JS/datos/íconos previos).
11. ✅ Fallback de navegación: `request.mode === 'navigate'` intenta red y, si falla, sirve `./index.html` (o `./`) desde cache.
12. ✅ `.nojekyll` en la raíz del repo.

### Fase D — Manifest y metadatos PWA (prioridad media) ✅ 2026-07-21

13. ✅ `manifest.json`: `id` = `/Checklistemergencia/` (alineado al repo real); `orientation` = `"any"`; `dir` = `"ltr"`.
14. ✅ `start_url` (`./index.html`) y `scope` (`./`) relativos confirmados para project pages; URL prevista documentada en el encabezado del roadmap (detalle final en raconto al release).
15. ⏭️ `screenshots` omitidos (sin capturas reales aún); se pueden agregar en Fase E o al publicar si hace falta enriquecer el diálogo de instalación.
16. Cache SW bump a `checklist-emergencia-v5` (manifest en precache).

### Fase E — Pulido (prioridad baja)

16. `preconnect` a `fonts.gstatic.com` y/o auto-hospedar `.woff2` locales + precache — Justificación: tipografía offline y menos dependencia de Google.
17. Ícono Apple dedicado 180×180 con fondo sólido; meta Open Graph básicas para compartir por WhatsApp.
18. Revisar áreas táctiles (checkboxes vía padding de `li`, botones de fuente ≥ 44px).

### Cierre APF (antes de publicar)

19. Pasar `apf_bolsillo/auditoria_pre_release.md`.
20. Escribir raconto en `apf_bolsillo/racontos/` (qué se hizo, qué se descartó, impacto).
21. Si durante la implementación aparece un error que no debería repetirse (p. ej. regenerar `data-id` y borrar progreso), agregar entrada en `reglas_aprendidas.md`.

## Riesgos identificados

- **Pérdida de progreso:** regenerar o renombrar `data-id` rompe el estado en `localStorage` → mitigar con checklist 1:1 de IDs y prueba con estado preexistente.
- **Cache stale del SW:** usuarios con `v1` pueden quedar con HTML viejo → bump de `CACHE_NAME` y `skipWaiting` + `clients.claim` (ya presentes); verificar en DevTools tras deploy.
- **Path de GitHub Pages:** `id` / `start_url` incorrectos si el repo no se llama como se asume → confirmar nombre del repo antes del paso D.
- **Fuentes externas offline:** sin auto-hospedar, la tipografía puede caer a fallback sin red → aceptable en v1 del refactor; documentar en Fase E.
- **Accesibilidad del drawer:** foco atrapado / Escape / `aria` incompletos → incluir en criterio de hecho de Fase B, no solo el CSS.

## Estimación

- **Complejidad estimada:** media · **Tiempo estimado:** 1–2 sesiones de trabajo (Fases A–B el núcleo; C–D en la misma o siguiente; E diferible)
- **Orden sugerido de commits lógicos (cuando se pida commit):** A → B → C → D → E, para poder revertir por fase si hace falta.
