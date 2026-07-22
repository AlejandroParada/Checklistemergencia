# apf_bolsillo — Infraestructura APF ligera de ChecklistEmergencia

Versión de bolsillo del AI Pipeline Framework: mismos principios (roadmap antes de código, aprendizaje acumulado, maduración por escala, cierre con raconto), sin la ceremonia de coordinar varios roles. Pensada para un solo desarrollador.

**Instanciado desde `apf_bolsillo.md` versión:** 1.0 · **Fecha de instanciación:** 2026-07-21

**Regla de oro:** no se implementa una funcionalidad sin un roadmap en `roadmaps/`, aunque sea de tres líneas. La disciplina no es el largo del documento — es que exista antes del código.

## Mapa de carpetas

| Carpeta/archivo | Qué contiene | Cuándo se toca |
|---|---|---|
| `notas_base.md` | Hechos y reglas que el proyecto no puede contradecir — la versión mínima del BCM. | Cada vez que se descubre o cambia una regla real. |
| `roadmaps/` | Un archivo por funcionalidad: intención + plan + pasos, todo junto. | Antes de implementar cualquier cosa que no sea trivial. |
| `racontos/` | Un archivo por release: qué se hizo, qué se descartó, impacto, patrones. | Al cerrar cada release. |
| `xcm/` | Técnica de maduración por escala (X→C→M). | Cuando algo tiene alto impacto/larga vida y vale pulirlo antes de fijarlo. |
| `reglas_aprendidas.md` | Errores que no deberían repetirse + historial de cuándo se agregó cada regla. | Cada vez que corregís algo que no debería volver a pasar. |
| `auditoria_pre_release.md` | Revisión de vulnerabilidades y puntos ciegos antes de publicar. | Antes de cada release, no antes de cada roadmap. |

## Estado de madurez

Este `apf_bolsillo/` fue inicializado el 2026-07-21 a partir del template `apf_bolsillo.md`. Ver la sección "Cuándo y cómo graduar a `apf_infra.md`" en el template si el proyecto crece más allá de lo que esta versión puede sostener con comodidad.

**Stack detectado:** PWA estática (HTML/CSS/JavaScript vanilla), Service Worker, localStorage, Web App Manifest — sin backend ni base de datos.
