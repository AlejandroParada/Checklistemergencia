# Roadmap — Header mobile + hogar (adultos/menores) con cantidades dinámicas

**Fecha:** 2026-07-21 · **Estado:** implementado

## Intención

Header compacto en celular + panel Info/ajustes; contadores Adultos/Menores en barra inferior; cantidades del checklist recalculadas desde JS según el hogar.

## Decisiones confirmadas (2026-07-21)

1. Título corto: **Checklist de emergencia**
2. Menor = **0,75** adulto-equivalente
3. Escalado en **todas** las categorías (con `scale.kind`; fijos = `none`)
4. Controles de tamaño de letra → panel **Info y ajustes**

## Hecho

- ✅ `data/ui.js` — `APP_COPY` + `HOGAR_RULES`
- ✅ Catálogo con `scale` (`liters` | `equiv` | `heads` | `none`); `data-id` intactos
- ✅ Header compacto; subtítulo/principio en panel Info (`ⓘ`)
- ✅ Barra inferior Adultos/Menores (`+`/`−`); clave `checklistEmergenciaHogar`
- ✅ `refreshQuantities` sin perder checks
- ✅ Cache SW `v8` (+ `data/ui.js`)
- ✅ `notas_base.md` actualizado

## Criterios de hecho

- [x] Header mobile compacto
- [x] Panel Info con explicación + fuente
- [x] Steppers persisten
- [x] Cantidades se actualizan; checks no se pierden
- [x] Contenido desde JS
