# Reglas aprendidas — ChecklistEmergencia

Fusiona lo que en la versión completa serían `dev_maestro.md` + `CHANGELOG.md`: un registro cronológico de errores que no deberían repetirse y las reglas que generaron. Es la razón principal por la que "un solo desarrollador" no significa "sin memoria institucional" — la memoria simplemente cabe en un archivo en vez de siete.

## 2026-07-22 — No escapar & en URLs de href

Error: enlaces WhatsApp salían con `&amp;` y la app quedaba buscando / no abría el chat.
Contexto: `escapeHtml(href)` convertía los `&` de query string.
Regla: no pasar URLs construidas (phone solo dígitos) por `escapeHtml`; usar `encodeURIComponent` solo en valores de parámetros.

## 2026-07-21 — Comillas rotas en HTML dentro de strings JS


Error: el botón del menú no respondía; `app.js` no cargaba.
Contexto: en `renderContacts` se usó `"...class="contact-number"..."` (comillas dobles anidadas) y rompió el parseo de todo el archivo.
Regla: en concatenaciones HTML dentro de JS, usar comillas simples para el string JS (`'...class="x"...'`) o escapar `\"`.

## 2026-07-21 — Cache SW oculta cambios de menú


Error: el usuario no veía secciones nuevas en el menú tras cambios locales.
Contexto: Service Worker con stale-while-revalidate servía HTML/JS viejos; además el menú solo cambia si cambia `CHECKLIST`.
Regla: ante cambios de catálogo/menú, bump `CACHE_NAME`, query `?v=` en assets, `updateViaCache: "none"`, y ofrecer `force-refresh.html` para unregister + clear caches.

## 2026-07-21 — Inicialización


- Inicialización de `apf_bolsillo/` a partir del template `apf_bolsillo.md` (TEMPLATE_VERSION 1.0). Sin reglas todavía — proyecto recién instrumentado. Reemplaza la instanciación previa de `apf_infra/` (revertida el mismo día).

## Formato para cada regla nueva

```
[FECHA] — [Título corto de la regla]
Error: qué pasó.
Contexto: en qué situación pasó.
Regla: qué se hace distinto de ahora en más.
```

Agregar cada entrada nueva arriba de las anteriores (orden cronológico descendente), para que lo más reciente y probablemente más relevante esté siempre primero.
