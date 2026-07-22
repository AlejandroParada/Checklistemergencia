# Auditoría pre-release — ChecklistEmergencia

Una revisión antes de cada release (no antes de cada roadmap individual — esa cadencia es de equipo, no de un solo desarrollador). Se hace releyendo lo implementado desde afuera, como si lo hubiera escrito otra persona.

## Categorías de revisión (ajustar según el proyecto)

1. **Alineación con `notas_base.md`** — ¿algo de lo implementado contradice una regla ya documentada?
2. **Cobertura de casos borde** — ¿qué pasa si falla la red, si el dato viene vacío, si el usuario hace algo inesperado? (p. ej. `localStorage` lleno, SW desactualizado, reinicio cancelado).
3. **Vulnerabilidades específicas de IA** — confianza excesiva en el flujo feliz, soluciones genéricas donde el proyecto necesitaba algo específico, ambigüedades que quedaron sin resolver.
4. **Si el proyecto publica contenido factual/sensible: exactitud de fuentes** — ¿toda afirmación de procedimiento en esta iteración tiene una fuente citada en `notas_base.md`, y esa fuente sigue vigente? Esta categoría no existe en la auditoría genérica de la versión completa — se agrega acá porque, para un sitio informativo sobre procedimientos de seguridad, es la categoría de mayor impacto real, más que cualquier vulnerabilidad técnica.

## Registro de auditorías

| Fecha | Release | Hallazgos | ¿Bloquea el release? |
|---|---|---|---|
| 2026-07-22 | v1.7 | Alineación con `notas_base` OK (guides/contacts/places fuera del progreso). Fuentes de «Qué hacer si…» citadas. SW network-first en shell + `force-refresh.html`. Tipografía aún depende de Google Fonts (documentado; no bloquea uso principal). Números de líderes cargados por el barrio. | No |
