// ========== MOD: EGEMOLO ==========
// Autor: ChatGPT
// Descripción: Añade el criatura-elemento "egemolo", su comportamiento,
// reacciones y una herramienta especial para generarlo.

// Asegurar que existe el objeto elementos
if (typeof(elements) === "undefined") elements = {};

// ========== ELEMENTO PRINCIPAL: EGEMOLO ==========
elements.egemolo = {
    color: ["#5ad1ff", "#4cb4e6", "#6ad9ff"], // Variación visual
    category: "criaturas",
    state: "solid",
    density: 900,

    behavior: [
        "XX|M1|XX",
        "M1|CH|M1",
        "XX|M1|XX"
    ],
    // “CH” significa movimiento tipo criatura
    // “M1/M2” significa movimiento de arena/polvo modificable

    // Sonido / comportamiento personalizado
    tick: function(pixel) {
        // Egemolo flota ligeramente hacia arriba a veces
        if (Math.random() < 0.02) {
            tryMove(pixel, pixel.x, pixel.y - 1);
        }

        // Egemolo deja un pequeño rastro de "gel azul"
        if (Math.random() < 0.05 && isEmpty(pixel.x, pixel.y+1)) {
            createPixel("gel_azul", pixel.x, pixel.y+1);
        }
    }
};

// ========== SUB-ELEMENTO: GEL AZUL ==========
elements.gel_azul = {
    color: "#74cfff",
    behavior: behaviors.LIQUID,
    category: "líquidos",
    state: "liquid",
    viscosity: 15000,
    density: 1100,
};

// ========== REACCIONES ==========
elements.egemolo.reactions = {
    "fuego": { elem1: "vapor_egemolo", elem2: null, chance: 0.4 },
    "hielo": { elem1: "egemolo_congelado", elem2: null }
};

elements.vapor_egemolo = {
    color: "#b9f2ff",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1
};

elements.egemolo_congelado = {
    color: "#d7f9ff",
    behavior: behaviors.SOLID,
    category: "sólidos",
    state: "solid",
    density: 1300,
};

// ========== HERRAMIENTA: EGEMOLO SPAWNER ==========
elements.egemolo_spawner = {
    color: "#008cff",
    tool: function(pixel) {
        if (isEmpty(pixel.x, pixel.y)) {
            createPixel("egemolo", pixel.x, pixel.y);
        }
    },
    category: "herramientas",
};

// ========== RENDERER PERSONALIZADO ==========
elements.egemolo.renderer = function(pixel, ctx) {
    // cuerpo azul claro
    drawSquare(ctx, "#5ad1ff", pixel.x, pixel.y);

    // ojitos blancos
    drawSquare(ctx, "#ffffff", pixel.x-1, pixel.y-1);
    drawSquare(ctx, "#ffffff", pixel.x+1, pixel.y-1);

    // pupilas
    drawSquare(ctx, "#000000", pixel.x-1, pixel.y-1);
    drawSquare(ctx, "#000000", pixel.x+1, pixel.y-1);
};

// ========== FIN DEL MOD ==========
