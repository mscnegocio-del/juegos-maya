// Dibujos para colorear (solo los usa juegos/pintar). Cada dibujo tiene:
//  - zonas: elementos SVG rellenables (se dibujan dos veces: relleno abajo y contorno arriba)
//  - detalles: líneas y puntos fijos que no se pintan (ojos, boca, bigotes)
// viewBox 200x200, mismo trazo que dibujos.js. Las zonas que se superponen: la última queda encima.

const Colorear = (() => {
  const T = "#3b2a4a";
  const ojos = (y, sep = 22, cx = 100, r = 8) => `
    <circle cx="${cx - sep}" cy="${y}" r="${r}" fill="${T}" stroke="none"/><circle cx="${cx - sep + r * .35}" cy="${y - r * .35}" r="${r * .3}" fill="#fff" stroke="none"/>
    <circle cx="${cx + sep}" cy="${y}" r="${r}" fill="${T}" stroke="none"/><circle cx="${cx + sep + r * .35}" cy="${y - r * .35}" r="${r * .3}" fill="#fff" stroke="none"/>`;
  const sonrisa = (y, w = 12, cx = 100) => `<path d="M${cx - w} ${y} Q${cx} ${y + w} ${cx + w} ${y}" fill="none"/>`;
  const petalos = (n, cx, cy, dist, rx, ry) =>
    Array.from({ length: n }, (_, i) => `ellipse cx="${cx}" cy="${cy - dist}" rx="${rx}" ry="${ry}" transform="rotate(${i * 360 / n} ${cx} ${cy})"`);

  const DIBUJOS = [
    { id: "vaca", nombre: "la vaca", sonido: "vaca", zonas: [
        'path d="M58 58 Q44 30 34 38 Q40 52 56 66Z"', 'path d="M142 58 Q156 30 166 38 Q160 52 144 66Z"',
        'ellipse cx="36" cy="88" rx="24" ry="13" transform="rotate(-20 36 88)"',
        'ellipse cx="164" cy="88" rx="24" ry="13" transform="rotate(20 164 88)"',
        'ellipse cx="100" cy="100" rx="62" ry="58"',
        'path d="M60 66 Q78 60 82 76 Q78 94 60 88 Q50 76 60 66Z"', 'path d="M134 118 Q150 106 158 118 Q156 134 140 132Z"',
        'ellipse cx="100" cy="140" rx="46" ry="30"' ],
      detalles: `${ojos(96)}<ellipse cx="84" cy="134" rx="6" ry="8" fill="${T}"/><ellipse cx="116" cy="134" rx="6" ry="8" fill="${T}"/>${sonrisa(150)}` },

    { id: "perro", nombre: "el perrito", sonido: "perro", zonas: [
        'path d="M52 62 Q20 68 26 122 Q34 138 52 118Z"', 'path d="M148 62 Q180 68 174 122 Q166 138 148 118Z"',
        'ellipse cx="100" cy="106" rx="60" ry="60"', 'ellipse cx="126" cy="86" rx="20" ry="18"',
        'ellipse cx="100" cy="136" rx="30" ry="22"', 'ellipse cx="100" cy="124" rx="11" ry="8"' ],
      detalles: `${ojos(96)}${sonrisa(142, 11)}` },

    { id: "gato", nombre: "el gatito Michi", sonido: "gato", zonas: [
        'path d="M46 86 L52 30 L92 58Z"', 'path d="M154 86 L148 30 L108 58Z"',
        'ellipse cx="100" cy="112" rx="64" ry="56"', 'path d="M93 124 L107 124 L100 132Z"' ],
      detalles: `${ojos(106)}<path d="M44 122 L72 126 M44 138 L72 134 M156 122 L128 126 M156 138 L128 134" stroke-width="3"/>${sonrisa(138, 10)}` },

    { id: "pez", nombre: "el pez", zonas: [
        'path d="M140 100 L184 66 L178 100 L184 134Z"', 'path d="M70 66 Q96 36 120 64Z"',
        'ellipse cx="96" cy="100" rx="62" ry="42"', 'path d="M96 100 Q112 112 98 126 Q90 112 96 100Z"',
        'circle cx="34" cy="50" r="10"', 'circle cx="50" cy="26" r="7"' ],
      detalles: `<circle cx="64" cy="92" r="8" fill="${T}"/><circle cx="67" cy="89" r="2.5" fill="#fff"/>${sonrisa(110, 9, 52)}` },

    { id: "mariposa", nombre: "la mariposa", zonas: [
        'ellipse cx="62" cy="70" rx="40" ry="34" transform="rotate(-20 62 70)"',
        'ellipse cx="138" cy="70" rx="40" ry="34" transform="rotate(20 138 70)"',
        'ellipse cx="68" cy="134" rx="30" ry="26" transform="rotate(20 68 134)"',
        'ellipse cx="132" cy="134" rx="30" ry="26" transform="rotate(-20 132 134)"',
        'circle cx="58" cy="70" r="12"', 'circle cx="142" cy="70" r="12"',
        'ellipse cx="100" cy="106" rx="13" ry="56"' ],
      detalles: `<path d="M94 54 Q80 26 70 22 M106 54 Q120 26 130 22" fill="none"/><circle cx="70" cy="22" r="5" fill="${T}"/><circle cx="130" cy="22" r="5" fill="${T}"/>
        <circle cx="94" cy="72" r="4" fill="${T}"/><circle cx="106" cy="72" r="4" fill="${T}"/>` },

    { id: "flor", nombre: "la flor", zonas: [
        'path d="M94 120 L106 120 L106 194 L94 194Z"',
        'path d="M100 168 Q70 140 46 150 Q66 178 100 168Z"', 'path d="M100 156 Q130 128 154 138 Q134 166 100 156Z"',
        ...petalos(6, 100, 72, 38, 20, 26), 'circle cx="100" cy="72" r="28"' ],
      detalles: `${ojos(66, 10, 100, 5)}${sonrisa(78, 7)}` },

    { id: "casa", nombre: "la casa", zonas: [
        'path d="M130 34 L152 34 L152 80 L130 64Z"', 'path d="M40 96 L160 96 L160 182 L40 182Z"',
        'path d="M26 100 L100 30 L174 100Z"', 'path d="M86 182 L86 132 Q100 120 114 132 L114 182Z"',
        'path d="M52 112 L76 112 L76 136 L52 136Z"', 'path d="M124 112 L148 112 L148 136 L124 136Z"' ],
      detalles: `<path d="M64 112 L64 136 M52 124 L76 124 M136 112 L136 136 M124 124 L148 124" stroke-width="3"/><circle cx="108" cy="158" r="3" fill="${T}"/>` },

    { id: "sol", nombre: "el sol", zonas: [
        ...Array.from({ length: 8 }, (_, i) => `path d="M100 8 L114 36 L86 36Z" transform="rotate(${i * 45} 100 100)"`),
        'circle cx="100" cy="100" r="54"' ],
      detalles: `${ojos(92, 20)}<ellipse cx="68" cy="112" rx="9" ry="5" fill="#ff9fb8" stroke="none"/><ellipse cx="132" cy="112" rx="9" ry="5" fill="#ff9fb8" stroke="none"/>${sonrisa(114, 16)}` },

    { id: "auto", nombre: "el auto", zonas: [
        'path d="M18 132 L18 108 Q20 96 40 94 L60 94 L78 62 Q82 56 92 56 L136 56 Q146 56 152 64 L170 94 Q186 96 186 112 L186 132Z"',
        'path d="M84 92 L96 66 L114 66 L114 92Z"', 'path d="M124 66 L140 66 L154 92 L124 92Z"',
        'circle cx="58" cy="138" r="22"', 'circle cx="148" cy="138" r="22"',
        'circle cx="58" cy="138" r="9"', 'circle cx="148" cy="138" r="9"' ],
      detalles: `<circle cx="176" cy="108" r="4" fill="${T}"/>` },

    { id: "globos", nombre: "los globos", zonas: [
        'ellipse cx="76" cy="74" rx="44" ry="52"', 'ellipse cx="132" cy="92" rx="40" ry="48"',
        'path d="M68 126 L84 126 L76 116Z"', 'path d="M124 140 L140 140 L132 130Z"' ],
      detalles: `<path d="M76 126 Q66 160 84 196 M132 140 Q142 170 122 196" fill="none" stroke-width="3"/>${ojos(66, 14, 76)}${sonrisa(84, 8, 76)}${ojos(86, 13, 132)}${sonrisa(102, 8, 132)}` },

    { id: "estrella", nombre: "la estrella", zonas: [
        'path d="M100 22 L122 72 L176 76 L134 112 L148 166 L100 138 L52 166 L66 112 L24 76 L78 72Z"',
        'path d="M30 150 L36 164 L50 166 L39 174 L42 188 L30 180 L18 188 L21 174 L10 166 L24 164Z"',
        'path d="M170 18 L175 30 L188 31 L178 39 L181 52 L170 45 L159 52 L162 39 L152 31 L165 30Z"' ],
      detalles: `${ojos(98, 16)}${sonrisa(116, 10)}` },

    { id: "pastel", nombre: "el pastel", zonas: [
        'path d="M30 128 L170 128 L170 186 L30 186Z"', 'path d="M44 86 L156 86 L156 128 L44 128Z"',
        'path d="M44 86 L156 86 L156 100 Q142 112 128 100 Q114 112 100 100 Q86 112 72 100 Q58 112 44 100Z"',
        'path d="M94 46 L106 46 L106 86 L94 86Z"', 'path d="M100 14 Q114 30 100 42 Q86 30 100 14Z"',
        'circle cx="140" cy="78" r="9"' ],
      detalles: `${ojos(152, 18)}${sonrisa(164, 10)}` },
  ];

  // Íconos de herramientas (sin carita, se leen como símbolos)
  const icono = cuerpo => `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${cuerpo}</svg>`;
  const ICONOS = {
    balde: icono(`<path d="M22 40 L70 40 L64 88 L28 88Z" fill="#3fa7ff"/><path d="M26 40 Q46 14 66 40" fill="none"/>
      <path d="M70 46 Q90 54 84 74 Q80 84 76 74 Q74 62 70 58" fill="#ff5a5f"/>`),
    pincel: icono(`<path d="M62 14 L82 34 L48 68 L32 52Z" fill="#ffd23f"/><path d="M32 52 L48 68 Q40 86 16 88 Q18 64 32 52Z" fill="#ff5a5f"/>`),
    estrellas: icono(`<path d="M50 10 L61 36 L88 38 L67 56 L74 84 L50 68 L26 84 L33 56 L12 38 L39 36Z" fill="#ffd23f"/>`),
    goma: icono(`<path d="M14 62 L52 24 L84 56 L58 82 L34 82Z" fill="#ff9fb8"/><path d="M34 42 L66 74" fill="none"/>`),
    deshacer: icono(`<path d="M30 40 Q66 22 80 52 Q86 74 62 84" fill="none" stroke-width="9"/><path d="M14 40 L38 22 L40 52Z" fill="${T}"/>`),
    listo: icono(`<circle cx="50" cy="50" r="40" fill="#4cd17a"/><path d="M30 52 L44 66 L72 36" fill="none" stroke="#fff" stroke-width="10"/>`),
    hoja: icono(`<path d="M24 10 L64 10 L80 26 L80 90 L24 90Z" fill="#fff"/><path d="M64 10 L64 26 L80 26" fill="none"/>`),
  };

  return { DIBUJOS, ICONOS };
})();
