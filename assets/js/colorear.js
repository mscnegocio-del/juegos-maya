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
    { id: "vaca", tema: "animales", nivel: 3, vida: "saltar", nombre: "la vaca", sonido: "vaca", zonas: [
        'path d="M58 58 Q44 30 34 38 Q40 52 56 66Z"', 'path d="M142 58 Q156 30 166 38 Q160 52 144 66Z"',
        'ellipse cx="36" cy="88" rx="24" ry="13" transform="rotate(-20 36 88)"',
        'ellipse cx="164" cy="88" rx="24" ry="13" transform="rotate(20 164 88)"',
        'ellipse cx="100" cy="100" rx="62" ry="58"',
        'path d="M60 66 Q78 60 82 76 Q78 94 60 88 Q50 76 60 66Z"', 'path d="M134 118 Q150 106 158 118 Q156 134 140 132Z"',
        'ellipse cx="100" cy="140" rx="46" ry="30"' ],
      detalles: `${ojos(96)}<ellipse cx="84" cy="134" rx="6" ry="8" fill="${T}"/><ellipse cx="116" cy="134" rx="6" ry="8" fill="${T}"/>${sonrisa(150)}` },

    { id: "perro", tema: "animales", nivel: 2, vida: "saltar", nombre: "el perrito", sonido: "perro", zonas: [
        'path d="M52 62 Q20 68 26 122 Q34 138 52 118Z"', 'path d="M148 62 Q180 68 174 122 Q166 138 148 118Z"',
        'ellipse cx="100" cy="106" rx="60" ry="60"', 'ellipse cx="126" cy="86" rx="20" ry="18"',
        'ellipse cx="100" cy="136" rx="30" ry="22"', 'ellipse cx="100" cy="124" rx="11" ry="8"' ],
      detalles: `${ojos(96)}${sonrisa(142, 11)}` },

    { id: "gato", tema: "michi", nivel: 1, vida: "latir", nombre: "el gatito Michi", sonido: "gato", zonas: [
        'path d="M46 86 L52 30 L92 58Z"', 'path d="M154 86 L148 30 L108 58Z"',
        'ellipse cx="100" cy="112" rx="64" ry="56"', 'path d="M93 124 L107 124 L100 132Z"' ],
      detalles: `${ojos(106)}<path d="M44 122 L72 126 M44 138 L72 134 M156 122 L128 126 M156 138 L128 134" stroke-width="3"/>${sonrisa(138, 10)}` },

    { id: "pez", tema: "mar", nivel: 2, vida: "nadar", nombre: "el pez", zonas: [
        'path d="M140 100 L184 66 L178 100 L184 134Z"', 'path d="M70 66 Q96 36 120 64Z"',
        'ellipse cx="96" cy="100" rx="62" ry="42"', 'path d="M96 100 Q112 112 98 126 Q90 112 96 100Z"',
        'circle cx="34" cy="50" r="10"', 'circle cx="50" cy="26" r="7"' ],
      detalles: `<circle cx="64" cy="92" r="8" fill="${T}"/><circle cx="67" cy="89" r="2.5" fill="#fff"/>${sonrisa(110, 9, 52)}` },

    { id: "mariposa", tema: "naturaleza", nivel: 2, vida: "aletear", nombre: "la mariposa", zonas: [
        'ellipse cx="62" cy="70" rx="40" ry="34" transform="rotate(-20 62 70)"',
        'ellipse cx="138" cy="70" rx="40" ry="34" transform="rotate(20 138 70)"',
        'ellipse cx="68" cy="134" rx="30" ry="26" transform="rotate(20 68 134)"',
        'ellipse cx="132" cy="134" rx="30" ry="26" transform="rotate(-20 132 134)"',
        'circle cx="58" cy="70" r="12"', 'circle cx="142" cy="70" r="12"',
        'ellipse cx="100" cy="106" rx="13" ry="56"' ],
      detalles: `<path d="M94 54 Q80 26 70 22 M106 54 Q120 26 130 22" fill="none"/><circle cx="70" cy="22" r="5" fill="${T}"/><circle cx="130" cy="22" r="5" fill="${T}"/>
        <circle cx="94" cy="72" r="4" fill="${T}"/><circle cx="106" cy="72" r="4" fill="${T}"/>` },

    { id: "flor", tema: "naturaleza", nivel: 3, vida: "balancear", nombre: "la flor", zonas: [
        'path d="M94 120 L106 120 L106 194 L94 194Z"',
        'path d="M100 168 Q70 140 46 150 Q66 178 100 168Z"', 'path d="M100 156 Q130 128 154 138 Q134 166 100 156Z"',
        ...petalos(6, 100, 72, 38, 20, 26), 'circle cx="100" cy="72" r="28"' ],
      detalles: `${ojos(66, 10, 100, 5)}${sonrisa(78, 7)}` },

    { id: "casa", tema: "michi", nivel: 2, vida: "latir", nombre: "la casa", zonas: [
        'path d="M130 34 L152 34 L152 80 L130 64Z"', 'path d="M40 96 L160 96 L160 182 L40 182Z"',
        'path d="M26 100 L100 30 L174 100Z"', 'path d="M86 182 L86 132 Q100 120 114 132 L114 182Z"',
        'path d="M52 112 L76 112 L76 136 L52 136Z"', 'path d="M124 112 L148 112 L148 136 L124 136Z"' ],
      detalles: `<path d="M64 112 L64 136 M52 124 L76 124 M136 112 L136 136 M124 124 L148 124" stroke-width="3"/><circle cx="108" cy="158" r="3" fill="${T}"/>` },

    { id: "sol", tema: "naturaleza", nivel: 2, vida: "girar", nombre: "el sol", zonas: [
        ...Array.from({ length: 8 }, (_, i) => `path d="M100 8 L114 36 L86 36Z" transform="rotate(${i * 45} 100 100)"`),
        'circle cx="100" cy="100" r="54"' ],
      detalles: `${ojos(92, 20)}<ellipse cx="68" cy="112" rx="9" ry="5" fill="#ff9fb8" stroke="none"/><ellipse cx="132" cy="112" rx="9" ry="5" fill="#ff9fb8" stroke="none"/>${sonrisa(114, 16)}` },

    { id: "auto", tema: "vehiculos", nivel: 3, vida: "avanzar", nombre: "el auto", zonas: [
        'path d="M18 132 L18 108 Q20 96 40 94 L60 94 L78 62 Q82 56 92 56 L136 56 Q146 56 152 64 L170 94 Q186 96 186 112 L186 132Z"',
        'path d="M84 92 L96 66 L114 66 L114 92Z"', 'path d="M124 66 L140 66 L154 92 L124 92Z"',
        'circle cx="58" cy="138" r="22"', 'circle cx="148" cy="138" r="22"',
        'circle cx="58" cy="138" r="9"', 'circle cx="148" cy="138" r="9"' ],
      detalles: `<circle cx="176" cy="108" r="4" fill="${T}"/>` },

    { id: "globos", tema: "naturaleza", nivel: 1, vida: "flotar", nombre: "los globos", zonas: [
        'ellipse cx="76" cy="74" rx="44" ry="52"', 'ellipse cx="132" cy="92" rx="40" ry="48"',
        'path d="M68 126 L84 126 L76 116Z"', 'path d="M124 140 L140 140 L132 130Z"' ],
      detalles: `<path d="M76 126 Q66 160 84 196 M132 140 Q142 170 122 196" fill="none" stroke-width="3"/>${ojos(66, 14, 76)}${sonrisa(84, 8, 76)}${ojos(86, 13, 132)}${sonrisa(102, 8, 132)}` },

    { id: "estrella", tema: "naturaleza", nivel: 1, vida: "girar", nombre: "la estrella", zonas: [
        'path d="M100 22 L122 72 L176 76 L134 112 L148 166 L100 138 L52 166 L66 112 L24 76 L78 72Z"',
        'path d="M30 150 L36 164 L50 166 L39 174 L42 188 L30 180 L18 188 L21 174 L10 166 L24 164Z"',
        'path d="M170 18 L175 30 L188 31 L178 39 L181 52 L170 45 L159 52 L162 39 L152 31 L165 30Z"' ],
      detalles: `${ojos(98, 16)}${sonrisa(116, 10)}` },

    { id: "pastel", tema: "comida", nivel: 2, vida: "saltar", nombre: "el pastel", zonas: [
        'path d="M30 128 L170 128 L170 186 L30 186Z"', 'path d="M44 86 L156 86 L156 128 L44 128Z"',
        'path d="M44 86 L156 86 L156 100 Q142 112 128 100 Q114 112 100 100 Q86 112 72 100 Q58 112 44 100Z"',
        'path d="M94 46 L106 46 L106 86 L94 86Z"', 'path d="M100 14 Q114 30 100 42 Q86 30 100 14Z"',
        'circle cx="140" cy="78" r="9"' ],
      detalles: `${ojos(152, 18)}${sonrisa(164, 10)}` },

    // ---- Láminas nuevas (SPEC-017). nivel: 1 fácil (pocas zonas grandes), 2 media, 3 con detalles.
    //      vida: cómo se mueve al terminar (nadar, volar, avanzar, aletear, saltar, latir, girar, balancear)
    // Mar
    { id: "pulpo", nombre: "el pulpo", tema: "mar", nivel: 2, vida: "nadar", zonas: [
        ...[30, 62, 94, 126, 158].map(x => `path d="M${x - 2} 120 Q${x - 14} 160 ${x + 4} 186 Q${x + 18} 176 ${x + 8} 160 Q${x + 2} 140 ${x + 18} 120Z"`),
        'path d="M30 124 Q24 40 100 30 Q176 40 170 124Z"',
        'circle cx="60" cy="74" r="10"', 'circle cx="140" cy="80" r="8"' ],
      detalles: `${ojos(96, 24)}${sonrisa(110, 12)}` },
    { id: "ballena", nombre: "la ballena", tema: "mar", nivel: 1, vida: "nadar", zonas: [
        'path d="M150 104 Q176 70 192 78 Q182 100 192 122 Q176 128 150 112Z"',
        'path d="M18 112 Q18 60 86 58 Q156 58 158 112 Q150 156 82 156 Q22 154 18 112Z"',
        'path d="M30 128 Q86 150 146 122 Q138 152 84 154 Q40 152 30 128Z"' ],
      detalles: `<path d="M74 54 Q66 28 54 24 M74 54 Q80 24 94 22" fill="none"/><circle cx="56" cy="96" r="7" fill="${T}"/><circle cx="58" cy="94" r="2" fill="#fff"/>${sonrisa(114, 9, 46)}` },
    { id: "tortuga", nombre: "la tortuga", tema: "mar", nivel: 2, vida: "avanzar", zonas: [
        'ellipse cx="48" cy="150" rx="18" ry="14"', 'ellipse cx="150" cy="150" rx="18" ry="14"',
        'ellipse cx="172" cy="112" rx="24" ry="20"', 'path d="M24 118 L10 112 L24 106Z"',
        'path d="M26 128 Q30 52 100 50 Q170 52 174 128Z"',
        'path d="M100 62 L124 78 L118 108 L82 108 L76 78Z"', 'path d="M44 112 L58 84 L76 92 L72 118Z"', 'path d="M156 112 L142 84 L124 92 L128 118Z"',
        'path d="M20 126 L180 126 L176 138 L24 138Z"' ],
      detalles: `<circle cx="180" cy="106" r="5" fill="${T}"/>${sonrisa(118, 6, 178)}` },
    { id: "cangrejo", nombre: "el cangrejo", tema: "mar", nivel: 2, vida: "avanzar", zonas: [
        'path d="M40 96 Q16 72 26 46 Q44 50 46 70 Q56 60 52 46 Q70 60 54 96Z"', 'path d="M160 96 Q184 72 174 46 Q156 50 154 70 Q144 60 148 46 Q130 60 146 96Z"',
        ...[0, 1, 2].map(i => `path d="M${52 - i * 4} ${128 + i * 14} L${18 - i * 2} ${140 + i * 18} L${22 - i * 2} ${146 + i * 18} L${56 - i * 4} ${136 + i * 14}Z"`),
        ...[0, 1, 2].map(i => `path d="M${148 + i * 4} ${128 + i * 14} L${182 + i * 2} ${140 + i * 18} L${178 + i * 2} ${146 + i * 18} L${144 + i * 4} ${136 + i * 14}Z"`),
        'ellipse cx="100" cy="130" rx="58" ry="40"' ],
      detalles: `<path d="M86 92 L82 70 M114 92 L118 70" fill="none"/><circle cx="82" cy="66" r="7" fill="${T}"/><circle cx="118" cy="66" r="7" fill="${T}"/>${sonrisa(134, 12)}` },
    // Vehículos
    { id: "bus", nombre: "el bus", tema: "vehiculos", nivel: 2, vida: "avanzar", zonas: [
        'path d="M14 52 Q14 40 28 40 L172 40 Q188 40 188 56 L188 150 L14 150Z"',
        'path d="M26 54 L62 54 L62 90 L26 90Z"', 'path d="M72 54 L108 54 L108 90 L72 90Z"', 'path d="M118 54 L154 54 L154 90 L118 90Z"',
        'path d="M164 54 L178 54 L178 120 L164 120Z"', 'path d="M14 112 L160 112 L160 124 L14 124Z"',
        'circle cx="52" cy="152" r="20"', 'circle cx="150" cy="152" r="20"' ],
      detalles: `<circle cx="52" cy="152" r="7" fill="${T}"/><circle cx="150" cy="152" r="7" fill="${T}"/><circle cx="182" cy="136" r="4" fill="${T}"/>` },
    { id: "avion", nombre: "el avión", tema: "vehiculos", nivel: 2, vida: "volar", zonas: [
        'path d="M84 96 L44 30 L66 30 L118 96Z"', 'path d="M84 110 L44 176 L66 176 L118 110Z"',
        'path d="M20 82 L10 54 L28 54 L46 86Z"',
        'path d="M14 92 Q14 84 40 84 L164 84 Q192 90 192 103 Q192 116 164 122 L40 122 Q14 122 14 112Z"',
        'circle cx="70" cy="100" r="7"', 'circle cx="98" cy="100" r="7"', 'circle cx="126" cy="100" r="7"',
        'path d="M160 88 Q180 92 184 102 L160 102Z"' ],
      detalles: "" },
    { id: "barco", nombre: "el barco", tema: "vehiculos", nivel: 1, vida: "balancear", zonas: [
        'path d="M100 22 L100 124 L40 124Z"', 'path d="M108 40 L108 124 L160 124Z"',
        'path d="M14 128 L186 128 L160 168 L40 168Z"',
        'path d="M0 176 Q25 166 50 176 Q75 186 100 176 Q125 166 150 176 Q175 186 200 176 L200 200 L0 200Z"' ],
      detalles: `<path d="M100 22 L100 128" fill="none" stroke-width="4"/><circle cx="70" cy="146" r="8" fill="none"/><circle cx="130" cy="146" r="8" fill="none"/>` },
    { id: "tren", nombre: "el tren", tema: "vehiculos", nivel: 3, vida: "avanzar", zonas: [
        'path d="M22 74 L36 74 L36 52 L52 52 L52 74 L60 74 L60 150 L22 150Z"', 'path d="M60 92 L116 92 L116 150 L60 150Z"',
        'path d="M70 46 L112 46 L112 92 L70 92Z"', 'path d="M78 54 L104 54 L104 76 L78 76Z"',
        'path d="M124 96 L188 96 L188 150 L124 150Z"', 'path d="M134 106 L178 106 L178 126 L134 126Z"',
        'circle cx="40" cy="156" r="14"', 'circle cx="88" cy="156" r="16"', 'circle cx="140" cy="156" r="13"', 'circle cx="174" cy="156" r="13"',
        'circle cx="44" cy="36" r="9"', 'circle cx="58" cy="20" r="7"' ],
      detalles: `<path d="M116 136 L124 136" fill="none" stroke-width="6"/>` },
    { id: "cohete", nombre: "el cohete", tema: "vehiculos", nivel: 2, vida: "volar", zonas: [
        'path d="M70 130 L40 166 L44 128 L66 108Z"', 'path d="M130 130 L160 166 L156 128 L134 108Z"',
        'path d="M84 150 Q100 194 116 150Z"',
        'path d="M100 14 Q144 50 136 150 L64 150 Q56 50 100 14Z"',
        'circle cx="100" cy="80" r="20"', 'path d="M76 40 Q100 30 124 40 Q118 28 100 16 Q82 28 76 40Z"' ],
      detalles: "" },
    // Comida
    { id: "helado", nombre: "el helado", tema: "comida", nivel: 1, vida: "saltar", zonas: [
        'path d="M58 100 L142 100 L100 192Z"',
        'circle cx="72" cy="86" r="30"', 'circle cx="128" cy="86" r="30"', 'circle cx="100" cy="58" r="34"',
        'circle cx="100" cy="20" r="12"' ],
      detalles: `${ojos(56, 14, 100, 6)}${sonrisa(68, 8)}<path d="M74 118 L124 118 M84 140 L116 140" fill="none" stroke-width="3"/>` },
    { id: "cupcake", nombre: "el cupcake", tema: "comida", nivel: 2, vida: "saltar", zonas: [
        'path d="M42 110 L158 110 L144 186 L56 186Z"',
        'path d="M34 112 Q30 80 60 76 Q64 46 100 46 Q136 46 140 76 Q170 80 166 112Z"',
        'circle cx="100" cy="34" r="12"', 'ellipse cx="70" cy="90" rx="6" ry="4"', 'ellipse cx="130" cy="88" rx="6" ry="4"', 'ellipse cx="102" cy="70" rx="6" ry="4"' ],
      detalles: `<path d="M70 120 L74 182 M100 120 L100 182 M130 120 L126 182" fill="none" stroke-width="3"/>${ojos(146, 18, 100, 6)}${sonrisa(160, 8)}` },
    { id: "manzana", nombre: "la manzana", tema: "comida", nivel: 1, vida: "saltar", zonas: [
        'path d="M104 40 Q130 16 152 30 Q130 54 104 40Z"',
        'path d="M100 58 C60 38 26 70 34 116 C42 166 80 184 100 170 C120 184 158 166 166 116 C174 70 140 38 100 58Z"' ],
      detalles: `<path d="M100 56 Q96 34 106 20" fill="none" stroke-width="6"/>${ojos(110, 20)}${sonrisa(128, 12)}` },
    { id: "sandia", nombre: "la sandía", tema: "comida", nivel: 1, vida: "saltar", zonas: [
        'path d="M10 70 L190 70 Q186 186 100 186 Q14 186 10 70Z"',
        'path d="M24 70 L176 70 Q170 168 100 170 Q30 168 24 70Z"' ],
      detalles: `${[[60, 96], [100, 100], [140, 96], [80, 128], [120, 128]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="7" fill="${T}"/>`).join("")}${ojos(148, 20, 100, 6)}${sonrisa(158, 8)}` },
    // La casa de Michi
    { id: "michi", nombre: "Michi entero", tema: "michi", nivel: 3, vida: "latir", sonido: "gato", zonas: [
        'path d="M150 156 Q192 140 176 96 Q170 84 162 92 Q174 124 140 140Z"',
        'ellipse cx="100" cy="146" rx="50" ry="44"', 'ellipse cx="100" cy="150" rx="26" ry="28"',
        'path d="M54 74 L60 20 L92 46Z"', 'path d="M146 74 L140 20 L108 46Z"',
        'ellipse cx="100" cy="76" rx="54" ry="46"',
        'path d="M62 114 Q100 132 138 114 L138 124 Q100 142 62 124Z"', 'circle cx="100" cy="134" r="8"',
        'ellipse cx="78" cy="188" rx="18" ry="10"', 'ellipse cx="122" cy="188" rx="18" ry="10"' ],
      detalles: `${ojos(72, 20, 100, 7)}<path d="M94 86 L106 86 L100 92Z" fill="${T}"/><path d="M48 82 L74 86 M48 94 L74 92 M152 82 L126 86 M152 94 L126 92" stroke-width="3"/>${sonrisa(96, 8)}` },
    { id: "ovillo", nombre: "el ovillo", tema: "michi", nivel: 1, vida: "girar", zonas: [
        'path d="M150 150 Q178 168 168 190 Q190 176 176 152Z"',
        'circle cx="100" cy="100" r="70"',
        'path d="M44 70 Q100 40 156 70 Q150 82 100 60 Q50 82 44 70Z"', 'path d="M36 112 Q100 82 164 112 Q160 126 100 100 Q40 126 36 112Z"' ],
      detalles: `<path d="M44 150 Q100 170 156 150" fill="none" stroke-width="4"/>${ojos(118, 22, 100, 6)}${sonrisa(130, 9)}` },
    { id: "cama", nombre: "la camita de Michi", tema: "michi", nivel: 2, vida: "latir", zonas: [
        'path d="M18 150 Q14 96 46 90 L60 60 L76 88 L124 88 L140 60 L154 90 Q186 96 182 150 Q100 176 18 150Z"',
        'ellipse cx="100" cy="134" rx="66" ry="26"',
        'path d="M54 134 Q100 116 146 134 Q132 152 100 152 Q68 152 54 134Z"',
        'circle cx="64" cy="126" r="8"', 'circle cx="136" cy="126" r="8"' ],
      detalles: `${ojos(112, 22, 100, 6)}${sonrisa(120, 8)}` },
    // Naturaleza
    { id: "arbol", nombre: "el árbol", tema: "naturaleza", nivel: 1, vida: "balancear", zonas: [
        'path d="M86 120 L114 120 L120 190 L80 190Z"',
        'path d="M100 20 Q148 20 156 64 Q186 84 166 116 Q160 140 124 136 Q100 154 76 136 Q40 140 34 116 Q14 84 44 64 Q52 20 100 20Z"',
        'circle cx="70" cy="76" r="10"', 'circle cx="128" cy="62" r="10"', 'circle cx="138" cy="108" r="10"' ],
      detalles: `${ojos(96, 18, 100, 6)}${sonrisa(108, 9)}` },
    { id: "nube", nombre: "el sol y la nube", tema: "naturaleza", nivel: 1, vida: "flotar", zonas: [
        ...Array.from({ length: 8 }, (_, i) => `path d="M130 6 L138 22 L122 22Z" transform="rotate(${i * 45} 130 56)"`),
        'circle cx="130" cy="56" r="34"',
        'path d="M30 150 Q20 116 52 112 Q60 84 92 92 Q110 72 132 96 Q170 96 166 130 Q182 150 158 160 L42 160 Q20 160 30 150Z"' ],
      detalles: `${ojos(128, 20, 96, 6)}${sonrisa(140, 9, 96)}` },
    { id: "arcoiris", nombre: "el arcoíris", tema: "naturaleza", nivel: 2, vida: "flotar", zonas: [
        'path d="M10 150 A90 90 0 0 1 190 150 L170 150 A70 70 0 0 0 30 150Z"', 'path d="M30 150 A70 70 0 0 1 170 150 L150 150 A50 50 0 0 0 50 150Z"',
        'path d="M50 150 A50 50 0 0 1 150 150 L130 150 A30 30 0 0 0 70 150Z"',
        'path d="M0 158 Q-4 132 26 132 Q36 116 56 128 Q70 130 66 158Z"', 'path d="M134 158 Q130 130 148 128 Q164 116 176 132 Q204 132 200 158Z"' ],
      detalles: "" },
    { id: "hongo", nombre: "el hongo", tema: "naturaleza", nivel: 1, vida: "saltar", zonas: [
        'path d="M70 100 L130 100 L136 180 Q100 192 64 180Z"',
        'path d="M16 104 Q16 30 100 26 Q184 30 184 104Z"',
        'circle cx="62" cy="68" r="14"', 'circle cx="118" cy="52" r="12"', 'circle cx="150" cy="84" r="10"' ],
      detalles: `${ojos(138, 14, 100, 6)}${sonrisa(152, 8)}` },
    // Animales del juego que faltaban
    { id: "chancho", nombre: "el chanchito", tema: "animales", nivel: 1, vida: "saltar", sonido: "chancho", zonas: [
        'path d="M48 60 L42 26 L80 46Z"', 'path d="M152 60 L158 26 L120 46Z"',
        'ellipse cx="100" cy="104" rx="70" ry="64"', 'ellipse cx="100" cy="124" rx="30" ry="22"' ],
      detalles: `${ojos(90, 26)}<ellipse cx="90" cy="124" rx="5" ry="8" fill="${T}"/><ellipse cx="110" cy="124" rx="5" ry="8" fill="${T}"/>${sonrisa(156, 10)}` },
    { id: "pato", nombre: "el pato", tema: "animales", nivel: 1, vida: "nadar", sonido: "pato", zonas: [
        'path d="M20 130 Q20 100 60 104 Q90 108 110 120 Q140 96 176 116 Q170 168 100 172 Q30 172 20 130Z"',
        'path d="M120 120 Q150 110 162 130 Q140 140 120 130Z"',
        'circle cx="70" cy="70" r="36"', 'path d="M100 70 L136 78 L102 88Z"' ],
      detalles: `<circle cx="78" cy="62" r="6" fill="${T}"/><circle cx="80" cy="60" r="2" fill="#fff"/>` },
    { id: "rana", nombre: "la ranita", tema: "animales", nivel: 1, vida: "saltar", sonido: "rana", zonas: [
        'ellipse cx="44" cy="170" rx="30" ry="14"', 'ellipse cx="156" cy="170" rx="30" ry="14"',
        'ellipse cx="100" cy="120" rx="72" ry="54"', 'circle cx="62" cy="64" r="24"', 'circle cx="138" cy="64" r="24"',
        'ellipse cx="100" cy="140" rx="40" ry="24"' ],
      detalles: `<circle cx="62" cy="64" r="10" fill="${T}"/><circle cx="138" cy="64" r="10" fill="${T}"/><path d="M60 110 Q100 136 140 110" fill="none"/>` },
    { id: "oveja", nombre: "la ovejita", tema: "animales", nivel: 2, vida: "saltar", sonido: "oveja", zonas: [
        'path d="M60 150 L56 188 L70 188 L74 150Z"', 'path d="M126 150 L130 188 L144 188 L140 150Z"',
        'path d="M30 120 Q14 96 36 80 Q40 52 70 56 Q86 34 112 46 Q140 36 154 62 Q184 70 176 100 Q192 124 168 140 Q160 168 128 160 Q104 178 80 160 Q44 168 40 142 Q20 140 30 120Z"',
        'ellipse cx="100" cy="98" rx="30" ry="34"', 'ellipse cx="62" cy="86" rx="16" ry="8" transform="rotate(-20 62 86)"', 'ellipse cx="138" cy="86" rx="16" ry="8" transform="rotate(20 138 86)"' ],
      detalles: `${ojos(94, 12, 100, 5)}${sonrisa(110, 7)}` },
    { id: "leon", nombre: "el león", tema: "animales", nivel: 3, vida: "latir", sonido: "leon", zonas: [
        ...Array.from({ length: 12 }, (_, i) => `ellipse cx="100" cy="30" rx="20" ry="28" transform="rotate(${i * 30} 100 100)"`),
        'circle cx="58" cy="64" r="14"', 'circle cx="142" cy="64" r="14"',
        'circle cx="100" cy="102" r="54"', 'ellipse cx="100" cy="124" rx="26" ry="18"' ],
      detalles: `${ojos(94, 20)}<path d="M92 114 L108 114 L100 122Z" fill="${T}"/>${sonrisa(130, 10)}` },
    { id: "elefante", nombre: "el elefante", tema: "animales", nivel: 2, vida: "balancear", sonido: "elefante", zonas: [
        'ellipse cx="44" cy="96" rx="36" ry="46"', 'ellipse cx="156" cy="96" rx="36" ry="46"',
        'circle cx="100" cy="92" r="52"',
        'path d="M88 120 Q84 170 110 184 Q124 186 120 174 Q104 164 112 120Z"' ],
      detalles: `${ojos(86, 20)}<path d="M70 120 Q76 130 84 124 M130 120 Q124 130 116 124" fill="none" stroke-width="3"/>` },
    { id: "gallina", nombre: "la gallina", tema: "animales", nivel: 2, vida: "saltar", sonido: "gallina", zonas: [
        'path d="M26 120 Q26 64 92 72 Q100 30 130 38 Q156 46 150 78 Q176 100 166 134 Q150 176 96 174 Q36 172 26 120Z"',
        'path d="M120 40 Q122 20 132 26 Q138 12 146 26 Q156 22 150 42Z"', 'path d="M152 64 L174 72 L152 80Z"',
        'path d="M150 84 Q160 96 150 104 Q142 96 150 84Z"',
        'path d="M48 120 Q70 96 104 112 Q86 140 54 138Z"' ],
      detalles: `<path d="M84 172 L80 192 M116 172 L120 192" fill="none" stroke-width="5"/><circle cx="138" cy="60" r="6" fill="${T}"/><circle cx="140" cy="58" r="2" fill="#fff"/>` },
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
    arcoiris: icono(`<path d="M10 74 A40 40 0 0 1 90 74" fill="none" stroke="#ff5a5f" stroke-width="9"/><path d="M20 74 A30 30 0 0 1 80 74" fill="none" stroke="#ffd23f" stroke-width="9"/>
      <path d="M30 74 A20 20 0 0 1 70 74" fill="none" stroke="#4cd17a" stroke-width="9"/><path d="M40 74 A10 10 0 0 1 60 74" fill="none" stroke="#3fa7ff" stroke-width="9"/>`),
    brillitos: icono(`<path d="M36 14 L42 34 L62 40 L42 46 L36 66 L30 46 L10 40 L30 34Z" fill="#ffd23f"/>
      <path d="M72 50 L76 62 L88 66 L76 70 L72 82 L68 70 L56 66 L68 62Z" fill="#ff7eb6"/><circle cx="74" cy="22" r="6" fill="#3fa7ff"/>`),
    magico: icono(`<path d="M20 84 L62 42" fill="none" stroke-width="10"/><path d="M20 84 L62 42" fill="none" stroke="#a66bff" stroke-width="5"/>
      <path d="M70 12 L75 27 L90 30 L75 34 L70 48 L65 34 L50 30 L65 27Z" fill="#ffd23f"/>`),
    sellos: icono(`<path d="M36 12 L64 12 L60 44 L40 44Z" fill="#ff7eb6"/><path d="M18 50 L82 50 L82 66 L18 66Z" fill="#a0673f"/>
      <path d="M38 76 C26 68 30 58 38 62 C42 56 52 60 46 70 L42 80Z" fill="#ff5a5f" stroke-width="3"/>`),
    escoba: icono(`<path d="M70 8 L56 48" fill="none" stroke="#a0673f" stroke-width="9"/>
      <path d="M44 44 L70 54 L60 92 Q40 92 18 80Z" fill="#ffd23f"/><path d="M34 62 L28 82 M46 66 L42 88 M56 68 L54 90" fill="none" stroke-width="4"/>`),
    carpeta: icono(`<path d="M10 26 L40 26 L48 36 L90 36 L90 84 L10 84Z" fill="#ff9f43"/><path d="M10 46 L90 46" fill="none"/>
      <path d="M40 58 C30 50 36 40 44 46 C50 40 58 50 48 58 L44 64Z" fill="#ff5a5f" stroke-width="3"/>`),
  };

  // Sellos: se pegan con un toque (SVG completos para poder dibujarlos en el canvas)
  const sello = cuerpo => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${cuerpo}</svg>`;
  const SELLOS = {
    estrella: { nombre: "estrellita", svg: sello(`<path d="M50 8 L62 36 L92 38 L69 58 L77 88 L50 72 L23 88 L31 58 L8 38 L38 36Z" fill="#ffd23f"/>`) },
    corazon: { nombre: "corazón", svg: sello(`<path d="M50 86 C14 62 6 40 18 24 C30 10 46 18 50 30 C54 18 70 10 82 24 C94 40 86 62 50 86Z" fill="#ff5a5f"/>`) },
    huella: { nombre: "huellita de gato", svg: sello(`<ellipse cx="50" cy="66" rx="22" ry="18" fill="#ff9fb8"/>
      <ellipse cx="24" cy="40" rx="9" ry="12" fill="#ff9fb8"/><ellipse cx="42" cy="26" rx="9" ry="12" fill="#ff9fb8"/>
      <ellipse cx="60" cy="26" rx="9" ry="12" fill="#ff9fb8"/><ellipse cx="77" cy="40" rx="9" ry="12" fill="#ff9fb8"/>`) },
    flor: { nombre: "florcita", svg: sello(`${[0, 72, 144, 216, 288].map(a => `<ellipse cx="50" cy="26" rx="14" ry="20" fill="#ff7eb6" transform="rotate(${a} 50 50)"/>`).join("")}
      <circle cx="50" cy="50" r="15" fill="#ffd23f"/>`) },
  };

  return { DIBUJOS, ICONOS, SELLOS };
})();
