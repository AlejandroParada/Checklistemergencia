# Reglas aprendidas — ChecklistEmergencia

Fusiona lo que en la versión completa serían `dev_maestro.md` + `CHANGELOG.md`: un registro cronológico de errores que no deberían repetirse y las reglas que generaron. Es la razón principal por la que "un solo desarrollador" no significa "sin memoria institucional" — la memoria simplemente cabe en un archivo en vez de siete.

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
