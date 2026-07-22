/**
 * Fuente única del catálogo. Los `id` de ítem deben permanecer estables
 * (coinciden 1:1 con los data-id históricos) para no romper localStorage.
 */
var CHECKLIST = [
  {
    id: "agua",
    emoji: "💧",
    title: "Agua",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        items: [
          { id: "agua-s-1", text: "21 litros (3 L por día, para beber e higiene mínima)" },
          { id: "agua-s-2", text: "Envases resistentes y con tapa, lejos del sol" }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        items: [
          { id: "agua-m-1", text: "Lo de la semana, ampliado" },
          { id: "agua-m-2", text: "Pastillas potabilizadoras o filtro de agua" },
          { id: "agua-m-3", text: "Recipientes adicionales de 20 L para reserva" }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        items: [
          { id: "agua-t-1", text: "Lo del mes, ampliado" },
          { id: "agua-t-2", text: "Método de purificación confiable y duradero (filtro recambiable, hervido)" },
          { id: "agua-t-3", text: "Identificar 2 fuentes alternativas de agua conocidas" }
        ]
      }
    ]
  },
  {
    id: "alimentos",
    emoji: "🍚",
    title: "Alimentos",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        items: [
          { id: "alim-s-1", text: "Arroz, fideos, harina, aceite, sal, azúcar" },
          { id: "alim-s-2", text: "Enlatados (atún, vegetales), legumbres cocidas" },
          { id: "alim-s-3", text: "Yerba mate, leche en polvo, algo dulce" }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        items: [
          { id: "alim-m-1", text: "Lo de la semana × 4, con variedad" },
          { id: "alim-m-2", text: "Multivitamínico si hay dieta restringida" },
          { id: "alim-m-3", text: "Alimento especial para bebés o mascotas si corresponde" }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        items: [
          { id: "alim-t-1", text: "Base de granos secos: arroz, trigo, lentejas, porotos (duran años bien guardados)" },
          { id: "alim-t-2", text: "Aceite, sal y azúcar en cantidad mayor" },
          { id: "alim-t-3", text: "Rotación: consume y repone, no lo dejes vencer" }
        ]
      }
    ]
  },
  {
    id: "salud",
    emoji: "🩹",
    title: "Salud e higiene",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        items: [
          { id: "salud-s-1", text: "Medicación habitual (7 días) + botiquín básico" },
          { id: "salud-s-2", text: "Jabón, papel higiénico, cepillo y pasta dental" }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        items: [
          { id: "salud-m-1", text: "Medicación habitual (30 días)" },
          { id: "salud-m-2", text: "Higiene femenina y pañales según la familia" },
          { id: "salud-m-3", text: "Copia de recetas médicas actualizadas" }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        items: [
          { id: "salud-t-1", text: "Medicación (90 días, coordinado con tu médico)" },
          { id: "salud-t-2", text: "Botiquín ampliado: antiinflamatorios, suero oral, antisépticos" },
          { id: "salud-t-3", text: "Lentes o audífonos de repuesto si los usas" }
        ]
      }
    ]
  },
  {
    id: "energia",
    emoji: "🔦",
    title: "Energía y comunicación",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        items: [
          { id: "energ-s-1", text: "Linterna + pilas de repuesto, velas y fósforos" },
          { id: "energ-s-2", text: "Radio a pilas, cargador portátil (power bank)" }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        items: [
          { id: "energ-m-1", text: "Pilas y combustible de linterna adicional" },
          { id: "energ-m-2", text: "Cargador solar pequeño (opcional)" }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        items: [
          { id: "energ-t-1", text: "Fuente alternativa (generador o panel solar) si es posible" },
          { id: "energ-t-2", text: "Combustible almacenado con seguridad (ventilado, fuera de casa)" }
        ]
      }
    ]
  },
  {
    id: "documentos",
    emoji: "🗂️",
    title: "Documentos y dinero",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        items: [
          { id: "doc-s-1", text: "Cédula y documentos en bolsa impermeable" },
          { id: "doc-s-2", text: "Efectivo pequeño (el sistema electrónico puede fallar)" }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        items: [
          { id: "doc-m-1", text: "Copias digitales respaldadas (nube o pendrive)" },
          { id: "doc-m-2", text: "Efectivo equivalente a gastos básicos de una semana más" }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        items: [
          { id: "doc-t-1", text: "Reserva financiera de emergencia, ahorrada gradualmente" },
          { id: "doc-t-2", text: "Lista de contactos clave impresa (no solo en el celular)" }
        ]
      }
    ]
  },
  {
    id: "herramientas",
    emoji: "🧰",
    title: "Herramientas y otros",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        items: [
          { id: "herr-s-1", text: "Multiherramienta, cinta adhesiva, guantes, bolsas resistentes" },
          { id: "herr-s-2", text: "Muda de ropa de abrigo e impermeable" }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        items: [
          { id: "herr-m-1", text: "Kit de reparación básico (cuerda, sellador, herramientas de mano)" },
          { id: "herr-m-2", text: "Semillas de ciclo corto para huerta (opcional)" }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        items: [
          { id: "herr-t-1", text: "Recursos para mayor autosuficiencia (huerta, compostaje)" },
          { id: "herr-t-2", text: "Revisión anual de todo el equipo y reemplazo de lo vencido" }
        ]
      }
    ]
  }
];
