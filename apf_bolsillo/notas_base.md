# Notas base — ChecklistEmergencia

> Versión mínima del BCM: no cinco dimensiones formales, solo lo que realmente necesitás no contradecir. Si en algún momento esto crece a un dominio complejo con roles/operaciones/persistencia diferenciados, es señal de que conviene graduar a un BCM completo (ver `apf_infra.md`).

## Reglas y hechos que el proyecto no puede contradecir

- Un vecino puede usar el checklist sin cuenta ni login: el progreso vive en el dispositivo/navegador.
- Cada ítem tiene un identificador estable (`data-id`); no se renombra ni se reutiliza sin plan de migración del estado guardado.
- El progreso se mide como ítems marcados / total de ítems visibles.
- Reiniciar marcados exige confirmación explícita del usuario; cancelar no cambia nada.
- La app debe seguir usable offline tras la primera visita (PWA / service worker).
- El contenido se organiza en categorías y tres etapas temporales (1 semana, 1 mes, 3 meses).
- El catálogo de ítems es una fuente de datos única (`data/checklist.js`); el DOM del checklist (y el menú, cuando exista) se deriva de ella.
- Las rutas de assets son relativas (`./`) para funcionar bajo el path de GitHub Pages (`usuario.github.io/<repo>/`).
- _(completar a medida que aparecen)_

## Fuentes de verdad del contenido (si el proyecto publica información factual/sensible)

> Si tu proyecto informa procedimientos, datos de seguridad, salud, o cualquier contenido donde un error tiene consecuencias reales (no solo estéticas), esta tabla es la pieza más importante de todo `apf_bolsillo/` — más que el roadmap. Cada afirmación de "cómo proceder" debería poder rastrearse hasta una fila de acá.

| Afirmación / procedimiento | Fuente (organismo, documento, URL) | Fecha de la fuente | Última verificación |
|---|---|---|---|
| Orientación general del checklist (etapas de preparación, categorías de insumos) | Footer del producto: "orientación de autosuficiencia de la Iglesia y buenas prácticas de gestión de riesgos" — [completar documento/URL concretos] | [pendiente] | 2026-07-21 |

## Decisiones de alcance

- Sin cuentas de usuario ni sincronización entre dispositivos (por ahora).
- Sin edición in-app del catálogo de ítems: el contenido se cambia en release (HTML), no por el usuario final.
- Sin backend: persistencia solo local (`localStorage`).
