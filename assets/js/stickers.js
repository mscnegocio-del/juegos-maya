// Stickers del álbum (SPEC-015): una página por juego con niveles. Se ganan al completar un nivel
// (Juegos.progreso.acierto llama a Stickers.ganar) y se guardan en Juegos.progreso, campo "stickers".
// Requiere common.js y dibujos.js.

const Stickers = (() => {
  const A = Dibujos.ANIMALES;
  const animal = (id, nombre) => ({ id, nombre, dibujo: A[id], sonido: `animales/${id}.mp3` });
  const COLOR = { rojo: "#ff5a5f", azul: "#3fa7ff", amarillo: "#ffd23f", verde: "#4cd17a", morado: "#a66bff", naranja: "#ff9f43", rosado: "#ff7eb6" };
  const objeto = (forma, color, nombre) => ({ id: `${forma}-${color}`, nombre, dibujo: Dibujos[forma](COLOR[color]) });

  const PAGINAS = [
    // Globos: animales sorpresa (el nivel 6 de Globos esconde animales dentro de los globos)
    { juego: "globos", nombre: "Globos", icono: Dibujos.globo(COLOR.rojo), stickers: [
      animal("pato", "el pato"), animal("vaca", "la vaca"), animal("perro", "el perrito"), animal("gato", "el gatito"),
      animal("chancho", "el chanchito"), animal("gallina", "la gallina"), animal("oveja", "la ovejita"), animal("rana", "la ranita"),
      animal("caballo", "el caballo"), animal("gallo", "el gallo"), animal("leon", "el león"), animal("elefante", "el elefante"),
    ] },
    { juego: "colores", nombre: "Colores", icono: Dibujos.paleta, stickers: [
      objeto("estrella", "rojo", "la estrella roja"), objeto("flor", "azul", "la flor azul"), objeto("pelota", "amarillo", "la pelota amarilla"),
      objeto("globo", "verde", "el globo verde"), objeto("estrella", "morado", "la estrella morada"), objeto("flor", "naranja", "la flor naranja"),
      objeto("pelota", "rosado", "la pelota rosada"), objeto("globo", "azul", "el globo azul"), objeto("flor", "rojo", "la flor roja"),
      objeto("estrella", "verde", "la estrella verde"), objeto("pelota", "morado", "la pelota morada"), objeto("globo", "amarillo", "el globo amarillo"),
    ] },
  ];

  const pagina = juego => PAGINAS.find(p => p.juego === juego);
  const tiene = juego => Juegos.progreso.leer(juego).stickers;

  // Da el siguiente sticker que falta de la página del juego, lo guarda y lo muestra volando a la casita
  function ganar(juego) {
    const p = pagina(juego);
    if (!p) return null;
    const ya = tiene(juego), s = p.stickers.find(x => !ya.includes(x.id));
    if (!s) return null; // página completa: el nivel igual se celebra
    Juegos.progreso.guardar(juego, { stickers: [...ya, s.id] });
    Juegos.premio(s.dibujo, document.querySelector(".btn-casa"));
    return s;
  }

  return { PAGINAS, pagina, tiene, ganar };
})();
