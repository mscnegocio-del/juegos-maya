// Catálogo de cuadros ilustrados del Rompecabezas (SPEC-018). Una imagen por cuadro, 3:2 horizontal (1536×1024), WebP o PNG:
//   assets/img/rompecabezas/<tema>/<id>.webp
// El juego solo ofrece los cuadros cuyo archivo existe de verdad; mientras haya menos de 8, completa con los dibujos
// provisionales hechos por código (se retiran solos cuando llegan las ilustraciones). Qué falta: assets/img/rompecabezas/LEEME.md
const RompecabezasCatalogo = [
  // --- Dinosaurios bebé (8) ---
  { id: "trex", tema: "dinosaurios", nombre: "el tiranosaurio", dino: true },
  { id: "trice", tema: "dinosaurios", nombre: "el tricerátops", dino: true },
  { id: "bronto", tema: "dinosaurios", nombre: "el braquiosaurio", dino: true },
  { id: "estego", tema: "dinosaurios", nombre: "el estegosaurio", dino: true },
  { id: "rapto", tema: "dinosaurios", nombre: "el velociraptor", dino: true },
  { id: "anqui", tema: "dinosaurios", nombre: "el anquilosaurio", dino: true },
  { id: "ptero", tema: "dinosaurios", nombre: "el pterodáctilo", dino: true },
  { id: "espino", tema: "dinosaurios", nombre: "el espinosaurio", dino: true },
  // --- Ya existe (imagen con fondo transparente: el juego le pone un fondo suave) ---
  { id: "michi", tema: "michi", nombre: "Michi", archivo: "../../assets/img/michi/feliz.webp", transparente: true, sonido: "michi/ronroneo.mp3", vida: "latir" },
];
