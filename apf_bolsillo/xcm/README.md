# XCM — Maduración por escala

Técnica de prompt engineering para llevar cualquier artefacto (código, `notas_base.md`, un roadmap, un raconto) a su mejor versión posible, forzando al modelo de IA a cambiar de escala de evaluación en tres iteraciones sucesivas. Igual que en la versión completa del framework — no se simplifica, porque el costo de aplicarla es bajo y el retorno es alto incluso para un proyecto chico.

## Prompts listos para copiar (reemplazar `[área]` y `[artefacto]`)

**Iteración X (1-10):**
> "Eres experto en [área]. Quiero que califiques del 1 al 10 este [artefacto] — siendo 1 lo más deficiente y 10 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 10."

**Iteración C (1-100), sobre el resultado ya mejorado de la iteración X:**
> "Ahora quiero que califiques del 1 al 100 este [artefacto] — siendo 1 lo más deficiente y 100 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 100."

**Iteración M (1-1000), sobre el resultado ya mejorado de la iteración C:**
> "Ahora quiero que califiques del 1 al 1000 este [artefacto] — siendo 1 lo más deficiente y 1000 lo más excelente — y me digas detalladamente en qué aspectos debe mejorar para llegar a 1000."

## Cuándo aplicarlo (versión de bolsillo)

No hace falta aplicarlo a todo. Reservalo para: el contenido de `notas_base.md` cuando trata temas sensibles (ver nota de "Fuentes de verdad" ahí), un roadmap antes de implementar algo que te genera dudas, y el código de los módulos más críticos antes de un release importante. No es necesario un registro formal de ciclos aplicados como en la versión completa — con un solo desarrollador, la aplicación misma ya deja rastro en el historial de conversación con la IA.
