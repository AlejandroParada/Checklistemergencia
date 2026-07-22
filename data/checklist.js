/**
 * Fuente única del catálogo. Los `id` de ítem son estables (localStorage).
 * scale.kind:
 *   liters — litros = ceil(persEq * perDay * tier.days)
 *   equiv  — texto + hogar (+ timed → usa tier.days)
 *   heads  — por personas (+ timed → usa tier.days)
 *   none   — texto fijo
 * Cada tier tiene `days`: 7 | 30 | 90 | 180 | 365.
 * type: "contacts" — panel de teléfonos (sin checkboxes; no cuenta en progreso).
 */
var CHECKLIST = [
  {
    id: "agua",
    emoji: "💧",
    title: "Agua",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        days: 7,
        items: [
          { id: "agua-s-1", text: "para beber e higiene mínima", scale: { kind: "liters", perDay: 3 } },
          { id: "agua-s-2", text: "Envases resistentes y con tapa, lejos del sol", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "agua-m-1", text: "Reserva de agua ampliada", scale: { kind: "liters", perDay: 3 } },
          { id: "agua-m-2", text: "Pastillas potabilizadoras o filtro de agua", scale: { kind: "equiv" } },
          { id: "agua-m-3", text: "Recipientes adicionales de 20 L para reserva", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "agua-t-1", text: "Reserva de agua a largo plazo", scale: { kind: "liters", perDay: 3 } },
          { id: "agua-t-2", text: "Método de purificación confiable y duradero (filtro recambiable, hervido)", scale: { kind: "none" } },
          { id: "agua-t-3", text: "Identificar 2 fuentes alternativas de agua conocidas", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "agua-6-1", text: "Reserva de agua para medio año", scale: { kind: "liters", perDay: 3 } },
          { id: "agua-6-2", text: "Almacenamiento rotativo y revisión de envases cada 3 meses", scale: { kind: "equiv" } },
          { id: "agua-6-3", text: "Repuestos de filtro o potabilización para 6 meses", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "agua-a-1", text: "Reserva de agua anual (o plan equivalente con fuentes propias)", scale: { kind: "liters", perDay: 3 } },
          { id: "agua-a-2", text: "Plan de captación/almacenamiento a largo plazo (lluvia, pozo, etc.)", scale: { kind: "none" } },
          { id: "agua-a-3", text: "Revisión anual de toda la reserva y del sistema de purificación", scale: { kind: "none" } }
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
        days: 7,
        items: [
          { id: "alim-s-1", text: "Arroz, fideos, harina, aceite, sal, azúcar", scale: { kind: "equiv", timed: true } },
          { id: "alim-s-2", text: "Enlatados (atún, vegetales), legumbres cocidas", scale: { kind: "equiv", timed: true } },
          { id: "alim-s-3", text: "Yerba mate, leche en polvo, algo dulce", scale: { kind: "equiv", timed: true } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "alim-m-1", text: "Despensa ampliada con variedad", scale: { kind: "equiv", timed: true } },
          { id: "alim-m-2", text: "Proteínas secas o enlatadas adicionales", scale: { kind: "equiv", timed: true } },
          { id: "alim-m-3", text: "Especias y condimentos que ya usás", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "alim-t-1", text: "Despensa de largo plazo (granos, legumbres secas)", scale: { kind: "equiv", timed: true } },
          { id: "alim-t-2", text: "Rotación etiquetada (fecha de compra / vencimiento)", scale: { kind: "none" } },
          { id: "alim-t-3", text: "Comidas listas o de fácil preparación sin electricidad", scale: { kind: "equiv", timed: true } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "alim-6-1", text: "Despensa de medio año con rotación trimestral", scale: { kind: "equiv", timed: true } },
          { id: "alim-6-2", text: "Stock de condimentos, aceite y azúcar a largo plazo", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "alim-a-1", text: "Plan anual de despensa (lo que la familia realmente come)", scale: { kind: "equiv", timed: true } },
          { id: "alim-a-2", text: "Inventario y rotación completa una vez al año", scale: { kind: "none" } }
        ]
      }
    ]
  },
  {
    id: "salud",
    emoji: "🩹",
    title: "Salud",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        days: 7,
        items: [
          { id: "salud-s-1", text: "Medicación habitual de cada integrante", scale: { kind: "heads", timed: true } },
          { id: "bot-s-1", text: "Botiquín básico: gasas, vendas, cinta adhesiva médica, tijera", scale: { kind: "equiv" } },
          { id: "bot-s-2", text: "Antiséptico (alcohol/povisona), suero fisiológico, termómetro", scale: { kind: "equiv" } },
          { id: "bot-s-3", text: "Analgésicos / antipiréticos de uso habitual (paracetamol, ibuprofeno)", scale: { kind: "heads" } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "salud-m-1", text: "Medicación habitual", scale: { kind: "heads", timed: true } },
          { id: "salud-m-3", text: "Copia de recetas médicas actualizadas", scale: { kind: "heads" } },
          { id: "bot-m-1", text: "Botiquín: pinzas, guantes descartables, apósitos adhesivos varios tamaños", scale: { kind: "equiv" } },
          { id: "bot-m-2", text: "Suero oral, antiácido, antidiarreico según indicación", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "salud-t-1", text: "Medicación (coordinado con tu médico)", scale: { kind: "heads", timed: true } },
          { id: "salud-t-2", text: "Botiquín ampliado: antiinflamatorios, suero oral, antisépticos de reserva", scale: { kind: "equiv" } },
          { id: "salud-t-3", text: "Lentes o audífonos de repuesto si los usás", scale: { kind: "none" } },
          { id: "bot-t-1", text: "Manta térmica, férula improvisada / inmovilización básica", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "salud-6-1", text: "Medicación para 6 meses (coordinado con tu médico)", scale: { kind: "heads", timed: true } },
          { id: "salud-6-3", text: "Control médico / renovación de recetas a mitad de año", scale: { kind: "none" } },
          { id: "bot-6-1", text: "Reposición completa del botiquín (vencimientos y stock)", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "salud-a-1", text: "Plan anual de medicación con tu médico", scale: { kind: "heads", timed: true } },
          { id: "salud-a-3", text: "Chequeo de salud y actualización de documentos médicos", scale: { kind: "none" } },
          { id: "bot-a-1", text: "Auditoría anual del botiquín y cursos básicos de primeros auxilios", scale: { kind: "none" } }
        ]
      }
    ]
  },
  {
    id: "higiene",
    emoji: "🧼",
    title: "Higiene y limpieza",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        days: 7,
        items: [
          { id: "hig-s-1", text: "Jabón, shampoo, papel higiénico", scale: { kind: "heads", timed: true } },
          { id: "hig-s-2", text: "Cepillo y pasta dental; hilo dental", scale: { kind: "heads", timed: true } },
          { id: "hig-s-3", text: "Máquina de afeitar / toallas húmedas según necesidad", scale: { kind: "heads" } },
          { id: "hig-s-4", text: "Detergente, lavandina diluida, esponjas / paños", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "salud-m-2", text: "Higiene femenina y pañales según la familia", scale: { kind: "equiv", timed: true } },
          { id: "hig-m-1", text: "Desodorante, crema hidratante, peines", scale: { kind: "heads", timed: true } },
          { id: "hig-m-2", text: "Bolsas de residuos, trapo de piso, escoba/secador", scale: { kind: "equiv" } },
          { id: "hig-m-3", text: "Limpiavidrios o multiuso para superficies", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "hig-t-1", text: "Stock de higiene personal ampliado", scale: { kind: "heads", timed: true } },
          { id: "hig-t-2", text: "Productos de limpieza del hogar (baño, cocina, piso)", scale: { kind: "equiv", timed: true } },
          { id: "hig-t-3", text: "Guantes de limpieza y alcohol en gel de reserva", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "salud-6-2", text: "Stock de higiene y limpieza para medio año", scale: { kind: "equiv", timed: true } },
          { id: "hig-6-1", text: "Reposición de lavandina, detergente y papel", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "salud-a-2", text: "Reposición anual de higiene personal y limpieza", scale: { kind: "equiv" } },
          { id: "hig-a-1", text: "Inventario anual y descarte de productos vencidos", scale: { kind: "none" } }
        ]
      }
    ]
  },
  {
    id: "vestimenta",
    emoji: "👕",
    title: "Vestimenta y otros",
    tiers: [
      {
        tag: "Etapa 1 · 1 semana",
        days: 7,
        items: [
          { id: "vest-s-1", text: "Ropa interior y medias de repuesto", scale: { kind: "heads" } },
          { id: "vest-s-2", text: "Muda de ropa de la estación actual", scale: { kind: "heads" } },
          { id: "herr-s-2", text: "Abrigo e impermeable liviano", scale: { kind: "heads" } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "vest-m-1", text: "Ropa de cama: sábanas y frazada/manta extras", scale: { kind: "equiv" } },
          { id: "vest-m-2", text: "Calzado cómodo de repuesto", scale: { kind: "heads" } },
          { id: "vest-m-3", text: "Toallas y ropa de abrigo según estación", scale: { kind: "heads" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "vest-t-1", text: "Ropa de estación opuesta guardada y accesible", scale: { kind: "heads" } },
          { id: "vest-t-2", text: "Sábanas / fundas extras y bolsas para ropa limpia/sucia", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "vest-6-1", text: "Rotación de ropa de temporada y revisión de estado", scale: { kind: "heads" } },
          { id: "vest-6-2", text: "Repuesto de ropa interior y de cama a medio año", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "vest-a-1", text: "Inventario anual de ropa, calzado y ropa de cama", scale: { kind: "none" } },
          { id: "vest-a-2", text: "Donar / reemplazar lo que ya no sirve", scale: { kind: "none" } }
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
        days: 7,
        items: [
          { id: "energ-s-1", text: "Linterna + pilas de repuesto, velas y fósforos", scale: { kind: "equiv", timed: true } },
          { id: "energ-s-2", text: "Radio a pilas, cargador portátil (power bank)", scale: { kind: "heads" } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "energ-m-1", text: "Pilas y combustible de linterna adicional", scale: { kind: "equiv", timed: true } },
          { id: "energ-m-2", text: "Cargador solar pequeño (opcional)", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "energ-t-1", text: "Fuente alternativa (generador o panel solar) si es posible", scale: { kind: "none" } },
          { id: "energ-t-2", text: "Combustible almacenado con seguridad (ventilado, fuera de casa)", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "energ-6-1", text: "Capacidad de carga/pilas para medio año de uso ocasional", scale: { kind: "equiv", timed: true } },
          { id: "energ-6-2", text: "Mantenimiento del panel/generador y repuestos básicos", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "energ-a-1", text: "Plan energético anual del hogar (solar, generador, etc.)", scale: { kind: "none" } },
          { id: "energ-a-2", text: "Revisión anual de baterías, pilas y combustible almacenado", scale: { kind: "equiv" } }
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
        days: 7,
        items: [
          { id: "doc-s-1", text: "Cédula y documentos en bolsa impermeable", scale: { kind: "heads" } },
          { id: "doc-s-2", text: "Efectivo pequeño (el sistema electrónico puede fallar)", scale: { kind: "equiv", timed: true } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "doc-m-1", text: "Copias digitales respaldadas (nube o pendrive)", scale: { kind: "none" } },
          { id: "doc-m-2", text: "Efectivo para gastos básicos adicionales", scale: { kind: "equiv", timed: true } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "doc-t-1", text: "Reserva financiera de emergencia, ahorrada gradualmente", scale: { kind: "equiv", timed: true } },
          { id: "doc-t-2", text: "Lista de contactos clave impresa (no solo en el celular)", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "doc-6-1", text: "Reserva financiera orientada a medio año de gastos básicos", scale: { kind: "equiv", timed: true } },
          { id: "doc-6-2", text: "Actualizar respaldos digitales y documentos impresos", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "doc-a-1", text: "Fondo de emergencia anual revisado", scale: { kind: "equiv", timed: true } },
          { id: "doc-a-2", text: "Auditoría anual de documentos, contactos y respaldos", scale: { kind: "none" } }
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
        days: 7,
        items: [
          { id: "herr-s-1", text: "Multiherramienta, cinta adhesiva, guantes, bolsas resistentes", scale: { kind: "equiv" } }
        ]
      },
      {
        tag: "Etapa 2 · 1 mes",
        days: 30,
        items: [
          { id: "herr-m-1", text: "Kit de reparación básico (cuerda, sellador, herramientas de mano)", scale: { kind: "none" } },
          { id: "herr-m-2", text: "Semillas de ciclo corto para huerta (opcional)", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 3 · 3 meses",
        days: 90,
        items: [
          { id: "herr-t-1", text: "Recursos para mayor autosuficiencia (huerta, compostaje)", scale: { kind: "equiv" } },
          { id: "herr-t-2", text: "Revisión anual de todo el equipo y reemplazo de lo vencido", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 4 · 6 meses",
        days: 180,
        items: [
          { id: "herr-6-1", text: "Ampliar herramientas y materiales de reparación del hogar", scale: { kind: "equiv" } },
          { id: "herr-6-2", text: "Plan de huerta/temporada para medio año", scale: { kind: "none" } }
        ]
      },
      {
        tag: "Etapa 5 · 1 año",
        days: 365,
        items: [
          { id: "herr-a-1", text: "Kit completo de autosuficiencia revisado una vez al año", scale: { kind: "equiv" } },
          { id: "herr-a-2", text: "Calendario anual de mantenimiento y reemplazo de equipos", scale: { kind: "none" } }
        ]
      }
    ]
  },
  {
    id: "abastecimiento",
    emoji: "🛒",
    title: "Abastecimiento",
    type: "places",
    intro: "Supermercados de la zona. Tocá el nombre para abrir la ubicación en Google Maps.",
    places: [
      {
        label: "Mercado del Este",
        address: "Ruta 8 km 24.700, Barros Blancos",
        lat: -34.7606,
        lng: -56.013
      },
      {
        label: "Tres Hermanos",
        address: "Ruta 8 km 23.800, Barros Blancos",
        lat: -34.7639555,
        lng: -56.0190742
      },
      {
        label: "Tata",
        address: "Ruta 8 km 24.200, Barros Blancos",
        lat: -34.7612,
        lng: -56.0174,
        mapsQuery: "TaTa supermercado Ruta 8 Km 24.200 Barros Blancos Uruguay"
      }
    ]
  },
  {
    id: "que-hacer-si",
    emoji: "🆘",
    title: "Qué hacer si…",
    type: "guides",
    intro:
      "Orientación breve ante emergencias frecuentes. En peligro real llamá al 911. Esto no reemplaza a Bomberos, Policía ni personal de salud.",
    guides: [
      {
        id: "guia-inundacion",
        title: "Si se me inunda la casa",
        steps: [
          "Llamá al 911 y seguí las indicaciones de las autoridades.",
          "Si es seguro, cortá el interruptor general de electricidad y las llaves de gas y agua.",
          "Priorizá a niños, adultas/os mayores y personas con discapacidad; no los dejes solos.",
          "Evitá caminar o manejar por agua en movimiento; el agua puede estar electrificada o esconder pozos.",
          "Tomá solo agua embotellada o potabilizada hasta que confirmen que la red es segura.",
          "Si ordenan evacuar, llevá el bolso de emergencia y cumplí las directivas. No vuelvas hasta que indiquen que es seguro; limpiá y desinfectá antes de habitar."
        ]
      },
      {
        id: "guia-techo",
        title: "Si se me voló el techo",
        steps: [
          "Salí a un lugar seguro lejos de chapas, cables y escombros sueltos.",
          "Llamá al 911. No reingreses si la estructura se ve inestable.",
          "Si podés hacerlo sin riesgo, cortá la electricidad y el gas desde fuera o desde el tablero general.",
          "No toques cables caídos ni chapas en contacto con ellos.",
          "Cubrir solo si es seguro (lona temporal) y sin subir a techos resbaladizos o con viento fuerte.",
          "Avisá a vecinos/líderes del barrio y documentá daños con fotos cuando sea seguro."
        ]
      },
      {
        id: "guia-arbol",
        title: "Si se cayó un árbol arriba de mi casa",
        steps: [
          "Alejate de la zona del impacto; puede haber más ramas o cables comprometidos.",
          "Llamá al 911. Si hay cables de UTE involucrados, tratá el árbol como electrificado: no lo toques.",
          "Cortá la luz y el gas si es seguro acceder al tablero.",
          "No intentes cortar ni mover el árbol hasta que Bomberos/UTE evalúen el riesgo.",
          "Revisá si hay heridos y seguí la guía de persona herida.",
          "Avisá a UTE (0800 1930) si hay daño en la red eléctrica."
        ]
      },
      {
        id: "guia-encierro",
        title: "Si no puedo salir de mi casa",
        steps: [
          "Llamá al 911 y describí tu dirección exacta, cuántas personas hay y si alguien está herido.",
          "Señalizá tu ubicación (luz, tela en ventana, silbato o gritos a intervalos) sin agotar la voz.",
          "Conservá batería del celular: modo ahorro, mensajes cortos, ubicación compartida si funciona.",
          "Si hay humo o gas, no uses fósforos; tapá rendijas y buscá aire fresco cerca del piso o ventana.",
          "No fuerces puertas o muros si puede derrumbarse algo; esperá a Bomberos salvo peligro inmediato (fuego, inundación que sube).",
          "Avisá también a un vecino o líder del barrio por WhatsApp si tenés señal."
        ]
      },
      {
        id: "guia-sin-luz",
        title: "Si me quedé sin energía eléctrica",
        steps: [
          "Comprobá si es solo tu casa o todo el barrio (mirá vecinos / medidor).",
          "Reportá a UTE: 0800 1930 (o el canal que indiquen en el momento).",
          "Desconectá aparatos sensibles; al volver la luz, reconectá de a poco.",
          "Usá linternas; evitá velas cerca de cortinas o si hay olor a gas.",
          "Abrí la heladera/freezer lo mínimo; la comida dura más horas si no se abre.",
          "Si hay persona dependiente de equipos eléctricos médicos, llamá al 911 y tené un plan de respaldo (vecinos, batería)."
        ]
      },
      {
        id: "guia-herido",
        title: "Si hay una persona herida",
        steps: [
          "Protocolo PAS: Proteger la escena, Avisar al 911, Socorrer sin ponerte en riesgo.",
          "Al 911: dirección exacta, qué pasó, cantidad de heridos, si respiran / están conscientes.",
          "No muevas a la persona si hay trauma fuerte, dolor de cuello/espalda o quedó atrapada, salvo peligro inminente (fuego, derrumbe).",
          "Controlá hemorragias con presión directa con un paño limpio; no retires objetos clavados.",
          "Abrígala, hablale con calma y no le des comida ni agua si está grave o inconsciente.",
          "Si no respira y sabés RCP, iniciá compresiones; si no, pedí indicaciones al operador del 911."
        ]
      },
      {
        id: "guia-gas",
        title: "Si siento olor a gas",
        steps: [
          "No enciendas luces, interruptores, fósforos, encendedores ni teléfonos dentro del área con olor.",
          "Cerrá la llave de paso del gas / garrafa si podés hacerlo sin chispas.",
          "Ventilá abriendo puertas y ventanas; salí al aire libre.",
          "Alejá a todas las personas. Llamá al 911 / Bomberos (104) desde afuera.",
          "No reingreses ni busques la fuga con fuego; el chequeo con agua jabonosa lo hace personal capacitado.",
          "Si hay llama en un escape de gas, no apagues el fuego sin cortar antes el gas; prioritario cortar suministro y evacuar."
        ]
      },
      {
        id: "guia-fuego",
        title: "Si se está prendiendo fuego la casa",
        steps: [
          "Gritá «¡Fuego!», sacá a todas las personas y llamá al 911 de inmediato.",
          "Cortá electricidad y gas solo si podés hacerlo sin atravesar el fuego ni el humo.",
          "No pierdas tiempo juntando objetos. Gateá bajo el humo (aire más limpio cerca del piso).",
          "Si el fuego es eléctrico o de aceite/líquidos inflamables, no uses agua.",
          "Cerrá puertas a tu paso para demorar la propagación; tocá la puerta antes de abrirla (si está caliente, no abras).",
          "Una vez afuera, no vuelvas a entrar. Esperá a Bomberos y contá si falta alguien."
        ]
      },
      {
        id: "guia-accidente",
        title: "Si hubo un accidente de tránsito cerca mío",
        steps: [
          "Protegé la escena: no te expongas a un segundo choque; usá chaleco si tenés; balizas/triángulos a distancia segura (~50 m).",
          "Llamá al 911: ubicación exacta, tipo de vehículos, heridos (cantidad, si hay niños, atrapados o incendio).",
          "Apagá el motor de vehículos si es seguro; no fumes cerca si hay olor a combustible.",
          "No muevas heridos salvo peligro inminente; controlá sangrados visibles con presión y brindá calma.",
          "Si hay cables o peligro eléctrico, mantené distancia y avisá en la llamada.",
          "Quedate hasta que llegue ayuda si podés; colaborá con datos y no alteres la escena más de lo necesario para socorrer."
        ]
      },
      {
        id: "guia-auxilio",
        title: "Si escucho gritos de auxilio",
        steps: [
          "Evaluá tu propia seguridad antes de acercarte (fuego, cables, violencia, tráfico).",
          "Llamá al 911 de inmediato: dirección exacta, qué escuchás y si ves a alguien.",
          "Si es seguro, acercate, presentate y preguntá qué necesita; no asumas solo.",
          "Pedile a otra persona que guíe a la ambulancia/policía (luz, calle, portón).",
          "No realices maniobras para las que no estés entrenado; mantené la calma y seguí consignas del operador.",
          "Si no podés acercarte, seguí en línea con el 911 y describí lo que oís/ves desde un lugar seguro."
        ]
      },
      {
        id: "guia-disparos",
        title: "Si escucho ruidos de armas de fuego",
        steps: [
          "Buscá cobertura inmediatamente: tirate al piso, alejate de ventanas y puertas de vidrio.",
          "No salgas a mirar ni filmes cerca de la escena; priorizá no ser un blanco.",
          "Llamá al 911 desde un lugar cubierto: ubicación, dirección del ruido y si hay heridos a la vista.",
          "Cerrá puertas con llave si estás adentro; apagá luces que te expongan y silenciá el celular salvo la llamada.",
          "No confrontes a nadie. Esperá a la Policía y seguí sus instrucciones.",
          "Si hay heridos y la escena ya es segura (lo confirma la Policía), recién ahí asistí según la guía de persona herida."
        ]
      },
      {
        id: "guia-temblor",
        title: "Si siento que la tierra tiembla",
        steps: [
          "Mantener la calma. No corras ni uses ascensor.",
          "Dentro: agachate, cubrite y agarrate (bajo mesa firme o junto a muro interior); protegé cabeza y cuello.",
          "Alejate de ventanas, espejos, estantes y objetos que puedan caer.",
          "Al aire libre: alejate de edificios, postes, cables y árboles; no te quedes bajo aleros.",
          "Después: cortá gas/luz/agua si hay olor a gas o daños; usá linterna (no fósforos). Salí con cuidado y no reingreses hasta que indiquen que es seguro.",
          "Si quedás atrapado: cubrí boca y nariz del polvo; pedí auxilio golpeando (ahorrá la voz). Llamá o SMS al 911 si podés."
        ]
      },
      {
        id: "guia-serpiente-casa",
        title: "Si hay una serpiente o víbora en mi casa",
        steps: [
          "No te acerques, no la toques ni intentes matarla o atraparla (aunque parezca muerta).",
          "Alejá a personas y mascotas; cerrá la habitación si podés dejarle una vía de escape hacia afuera.",
          "Llamá al 911 / Bomberos (104) y describí el lugar; no improvises con palos o escopetas.",
          "No metás la mano en huecos, debajo de muebles o leña apilada para «sacarla».",
          "Mantené pasto corto y sin basura/roedores alrededor de la casa para prevenir (recomendación MSP).",
          "Si alguien fue mordido, seguí la guía de mordedura y trasladá a un centro de salud."
        ]
      },
      {
        id: "guia-mordedura",
        title: "Si he sido mordido por una serpiente",
        steps: [
          "Mantener la calma y llamá al 911. También podés orientar con CIAT 1722 (toxicología).",
          "Retirá anillos, reloj, calzado o ropa que comprima la zona (se inflama).",
          "Lavá con agua y jabón si podés; mantené el miembro en reposo, a la altura del cuerpo.",
          "Trasladate de inmediato al centro asistencial más cercano (hay suero antiofídico en el sistema de salud).",
          "Podés beber agua si lo necesitás; no alcohol ni otras bebidas. No caminés de más si hay quien te lleve.",
          "NO: torniquete, cortar, chupar el veneno, quemar, hielo, alcohol, queroseno ni barro sobre la herida."
        ]
      },
      {
        id: "guia-descarga",
        title: "Si alguien recibió una descarga eléctrica",
        steps: [
          "NO toques a la persona si sigue en contacto con la corriente.",
          "Cortá la energía en el interruptor/tablero. Si no podés, separala con un objeto seco no conductor (palo de madera, plástico seco); nunca con metal ni manos mojadas.",
          "Llamá al 911 aunque «parezca bien»: puede haber lesión interna.",
          "Comprobá si responde y respira. Si no respira y sabés RCP, iniciá; pedí indicaciones al operador.",
          "Tratá quemaduras visibles: enfriá con agua limpia y cubrí con paño limpio; no reventes ampollas.",
          "Dejala en reposo hasta que llegue la ambulancia; no le des de comer ni beber si está grave."
        ]
      },
      {
        id: "guia-aplastamiento",
        title: "Si estoy atrapado por un fuerte peso que no puedo moverme",
        steps: [
          "Pedí auxilio y llamá al 911 (o pedile a alguien que llame): dirección, qué te aplasta y si sentís las piernas/brazos.",
          "No intentes liberarte solo si el objeto puede caer peor o derrumbarse; esperá a Bomberos si el peso es grande.",
          "Si otra persona ayuda: solo muevan el peso si es liviano y seguro; no tironeen del cuerpo.",
          "Controlá hemorragias visibles con presión; abrigate y mantené la calma.",
          "Avisá si perdés sensibilidad o no podés mover una parte: no muevan el cuello/espalda si hay duda.",
          "Tras liberarte, no te pongas de pie de golpe; esperá evaluación médica (riesgo de lesión interna)."
        ]
      },
      {
        id: "guia-desmayo",
        title: "Si siento que me voy a desmayar",
        steps: [
          "Sentate o recostate de inmediato; no sigas de pie ni manejes.",
          "Aflojá ropa apretada; respirá lento. Si podés, elevá las piernas.",
          "Pedí ayuda o llamá al 911 si el mareo no pasa, hay dolor de pecho, dificultad para respirar o es la primera vez que te pasa así.",
          "Si otra persona se desmaya y respira: colocála de costado (posición de seguridad) y vigilá.",
          "No le des comida ni bebida hasta que esté plenamente consciente y estable.",
          "Si no responde o no respira, tratá como emergencia: 911 + RCP si corresponde."
        ]
      },
      {
        id: "guia-respirar",
        title: "Si siento que no puedo respirar",
        steps: [
          "Sentate erguido, aflojá ropa del cuello/pecho; intentá respirar lento por la nariz.",
          "Llamá al 911 de inmediato: decí «no puedo respirar» y tu dirección.",
          "Si es una crisis conocida (asma/alergia), usá tu medicación de rescate según tu plan médico.",
          "Si hay hinchazón de labios/lengua, picazón fuerte o sibilancias tras picadura/alimento, puede ser alergia grave: 911 sin demora.",
          "Si alguien se atraganta y no puede hablar ni toser: pedí ayuda y, si estás entrenado, maniobra de desobstrucción; si pierde el conocimiento, RCP.",
          "No te acuestes boca arriba si estás consciente y con falta de aire; mantené posición que te permita respirar mejor hasta la ambulancia."
        ]
      }
    ]
  },
  {
    id: "emergencias",
    emoji: "🚨",
    title: "Emergencias",
    type: "contacts",
    intro: "Números útiles en Uruguay. Tocá para llamar o abrir WhatsApp.",
    contacts: [
      { label: "Emergencias", tel: "911", note: "Policía y emergencias" },
      { label: "Bomberos", tel: "104", note: "Uruguay" },
      { label: "CIAT (toxicología)", tel: "1722", note: "Mordeduras / intoxicaciones" },
      { label: "UTE", tel: "08001930", display: "0800 1930", note: "Energía eléctrica" },
      { label: "OSE", tel: "08001871", display: "0800 1871", note: "Agua potable" },
      {
        label: "WhatsApp del barrio",
        whatsapp: "",
        note: "Completar con el número o enlace del grupo local",
        placeholder: true
      }
    ]
  },
  {
    id: "lideres",
    emoji: "🤝",
    title: "Líderes locales",
    type: "contacts",
    intro: "Tocá el ícono verde de WhatsApp para escribirle al líder.",
    contacts: [
      {
        label: "José Luis Rodrigues",
        whatsapp: "+59895540125",
        display: "095 540 125",
        note: "Obispo"
      },
      {
        label: "Danilo Donati",
        whatsapp: "+59894231738",
        display: "094 231 738",
        note: "Pte. del Quórum de Élderes"
      },
      {
        label: "Estefanía López",
        whatsapp: "+59891318368",
        display: "091 318 368",
        note: "Pta. de la Sociedad de Socorro"
      }
    ]
  }
];
