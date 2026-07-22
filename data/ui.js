/**
 * Copy de UI + reglas de hogar (fuente única, no HTML).
 * Factor menor: 0.75 adulto-equivalente (confirmado 2026-07-21).
 */
var APP_COPY = {
  title: "Checklist de emergencia",
  eyebrow: "Preparación familiar · ",
  eyebrowTag: "Barrio Los Ceibos",
  infoTitle: "Info y ajustes",
  intro:
    "Construí tu reserva por etapas: 1 semana, 1 mes, 3 meses, 6 meses y 1 año. Las cantidades se ajustan al tamaño del hogar. No hace falta comprar todo de una vez.",
  principleTitle: "Cómo calcular",
  principle:
    "Las cantidades se ajustan según adultos y menores (un menor cuenta como 0,75 de un adulto). Agua: 3 L por persona-equivalente y por día, según la etapa. Guardá alimentos que ya comés y rotá el stock.",
  fontLabel: "Tamaño de letra",
  householdHint: "Las cantidades se recalculan al cambiar la cantidad de adultos o menores."
};

var HOGAR_RULES = {
  minorFactor: 0.75,
  waterLitersPerDay: 3,
  minAdults: 1,
  maxAdults: 20,
  minMinors: 0,
  maxMinors: 20,
  defaultAdults: 1,
  defaultMinors: 0
};

var TIER_DAY_LABELS = {
  7: "1 semana",
  30: "1 mes",
  90: "3 meses",
  180: "6 meses",
  365: "1 año"
};
