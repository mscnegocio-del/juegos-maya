// Michi, el gato de Maya (solo lo usa juegos/gato). SVG de cuerpo entero con partes animables:
// .cola, .cabeza, .orejas, .ojos-abiertos/.ojos-cerrados/.ojos-felices, .pupilas, .boca/.boca-abierta/.lengua,
// .mejillas, .pata-i/.pata-d, .panza. Las zonas tocables llevan data-zona.
// Mismo estilo que dibujos.js: trazo #3b2a4a de 5 px y uniones redondeadas.

const Michi = (() => {
  const T = "#3b2a4a", GRIS = "#a3acbf", GRIS_OSCURO = "#7d879c", BLANCO = "#fffaf3", ROSA = "#ffb3c7";

  const svg = `<svg class="michi" viewBox="0 0 240 320" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
    <g class="cola" data-zona="cola">
      <path d="M170 262 Q226 250 214 196 Q206 160 226 140" fill="none" stroke="transparent" stroke-width="46"/>
      <path d="M170 262 Q226 250 214 196 Q206 160 226 140" fill="none" stroke="${T}" stroke-width="22"/>
      <path d="M170 262 Q226 250 214 196 Q206 160 226 140" fill="none" stroke="${GRIS}" stroke-width="13"/>
      <path d="M216 168 Q208 154 226 140" fill="none" stroke="${BLANCO}" stroke-width="13"/>
    </g>
    <g class="cuerpo" data-zona="cuerpo">
      <ellipse cx="120" cy="222" rx="72" ry="74" fill="${GRIS}"/>
      <ellipse class="panza" data-zona="panza" cx="120" cy="232" rx="44" ry="50" fill="${BLANCO}"/>
    </g>
    <g class="patas" data-zona="pata">
      <ellipse cx="84" cy="292" rx="26" ry="15" fill="${BLANCO}"/><ellipse cx="156" cy="292" rx="26" ry="15" fill="${BLANCO}"/>
      <path d="M76 290 L76 300 M84 290 L84 302 M92 290 L92 300 M148 290 L148 300 M156 290 L156 302 M164 290 L164 300" stroke-width="3"/>
    </g>
    <g class="pata-i" data-zona="pata"><ellipse cx="66" cy="214" rx="17" ry="30" fill="${GRIS}" transform="rotate(18 66 214)"/>
      <ellipse cx="60" cy="238" rx="15" ry="11" fill="${BLANCO}"/></g>
    <g class="pata-d" data-zona="pata"><ellipse cx="174" cy="214" rx="17" ry="30" fill="${GRIS}" transform="rotate(-18 174 214)"/>
      <ellipse cx="180" cy="238" rx="15" ry="11" fill="${BLANCO}"/></g>
    <g class="cabeza" data-zona="cabeza">
      <g class="orejas">
        <g class="oreja-i"><path d="M52 92 L46 22 L104 54Z" fill="${GRIS}"/><path d="M62 78 L60 40 L92 58Z" fill="${ROSA}" stroke="none"/></g>
        <g class="oreja-d"><path d="M188 92 L194 22 L136 54Z" fill="${GRIS}"/><path d="M178 78 L180 40 L148 58Z" fill="${ROSA}" stroke="none"/></g>
      </g>
      <ellipse cx="120" cy="104" rx="80" ry="66" fill="${GRIS}"/>
      <path d="M120 40 L112 62 M120 40 L128 62 M102 44 L100 58 M138 44 L140 58" stroke="${GRIS_OSCURO}" stroke-width="6"/>
      <path d="M78 124 Q82 96 120 98 Q158 96 162 124 Q158 160 120 162 Q82 160 78 124Z" fill="${BLANCO}" stroke="none"/>
      <g class="ojos-abiertos" stroke="none">
        <ellipse cx="88" cy="100" rx="17" ry="20" fill="${T}"/><ellipse cx="152" cy="100" rx="17" ry="20" fill="${T}"/>
        <g class="pupilas"><circle cx="93" cy="93" r="6" fill="#fff"/><circle cx="157" cy="93" r="6" fill="#fff"/>
          <circle cx="84" cy="108" r="3" fill="#fff"/><circle cx="148" cy="108" r="3" fill="#fff"/></g>
      </g>
      <g class="ojos-cerrados" fill="none"><path d="M72 102 Q88 114 104 102"/><path d="M136 102 Q152 114 168 102"/></g>
      <g class="ojos-felices" fill="none"><path d="M72 106 Q88 88 104 106"/><path d="M136 106 Q152 88 168 106"/></g>
      <g class="mejillas" data-zona="mejilla" stroke="none">
        <ellipse class="mejilla" cx="66" cy="132" rx="15" ry="9" fill="#ff8fab" opacity=".55"/>
        <ellipse class="mejilla" cx="174" cy="132" rx="15" ry="9" fill="#ff8fab" opacity=".55"/>
      </g>
      <path class="nariz" data-zona="nariz" d="M110 120 L130 120 L120 131Z" fill="#ff7a93" stroke-width="3.5"/>
      <path class="boca" d="M104 136 Q112 146 120 136 Q128 146 136 136" fill="none" stroke-width="4"/>
      <g class="boca-abierta"><path d="M102 136 Q120 172 138 136 Q120 142 102 136Z" fill="${T}" stroke="none"/>
        <ellipse cx="120" cy="152" rx="10" ry="6" fill="#ff7a93" stroke="none"/></g>
      <g class="lengua"><path d="M104 136 Q112 146 120 136 Q128 146 136 136" fill="none" stroke-width="4"/>
        <path d="M112 140 Q112 160 120 160 Q128 160 128 140Z" fill="#ff7a93" stroke-width="3.5"/></g>
      <path class="bigotes" d="M40 118 L74 124 M38 134 L74 134 M200 118 L166 124 M202 134 L166 134" stroke-width="3"/>
    </g>
  </svg>`;

  // Comidas: dibujo + si le gusta. La zanahoria le hace poner cara graciosa (sin asco ni drama)
  const c = cuerpo => `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${cuerpo}</svg>`;
  const COMIDAS = [
    { id: "pescado", nombre: "pescado", leGusta: true, dibujo: c(`<path d="M70 50 L94 32 L90 50 L94 68Z" fill="#3fa7ff"/><ellipse cx="46" cy="50" rx="34" ry="22" fill="#3fa7ff"/><circle cx="28" cy="46" r="4" fill="${T}" stroke="none"/><path d="M50 36 Q58 50 50 64" fill="none"/>`) },
    { id: "leche", nombre: "leche", leGusta: true, dibujo: c(`<path d="M30 30 L70 30 L66 90 L34 90Z" fill="#fff"/><path d="M30 30 L40 12 L60 12 L70 30" fill="#ff5a5f"/><path d="M38 58 L62 58" fill="none" stroke="#3fa7ff" stroke-width="6"/>`) },
    { id: "manzana", nombre: "manzana", leGusta: true, dibujo: c(`<path d="M50 28 C30 16 12 34 16 58 C20 84 40 94 50 86 C60 94 80 84 84 58 C88 34 70 16 50 28Z" fill="#ff5a5f"/><path d="M50 28 Q48 14 56 8" fill="none"/><path d="M54 20 Q68 8 78 16 Q66 28 54 20Z" fill="#4cd17a"/>`) },
    { id: "galleta", nombre: "galleta", leGusta: true, dibujo: c(`<circle cx="50" cy="50" r="38" fill="#e3a868"/>${[[36, 36], [62, 40], [44, 62], [64, 64], [30, 54]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#6b4226" stroke="none"/>`).join("")}`) },
    { id: "queso", nombre: "queso", leGusta: true, dibujo: c(`<path d="M12 70 L88 70 L88 40 L12 58Z" fill="#ffd23f"/><path d="M12 58 L88 40 L60 22Z" fill="#ffe680"/><circle cx="40" cy="62" r="5" fill="#e6b800" stroke="none"/><circle cx="70" cy="56" r="6" fill="#e6b800" stroke="none"/>`) },
    { id: "zanahoria", nombre: "zanahoria", leGusta: false, dibujo: c(`<path d="M40 30 L64 30 L54 94Z" fill="#ff9f43"/><path d="M44 30 Q36 10 46 6 Q50 18 52 30 Q56 10 66 8 Q66 22 60 30" fill="#4cd17a"/><path d="M46 46 L54 48 M48 64 L56 62" fill="none" stroke-width="3"/>`) },
  ];

  // Íconos de las necesidades y de los cuartos
  const i = cuerpo => `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${cuerpo}</svg>`;
  const ICONOS = {
    hambre: i(`<ellipse cx="50" cy="66" rx="40" ry="16" fill="#ff9f43"/><path d="M14 62 Q50 82 86 62" fill="none"/><path d="M38 48 L56 30 L74 48 L62 46 L56 54 L50 46Z" fill="#3fa7ff"/>`),
    limpieza: i(`<circle cx="36" cy="40" r="16" fill="#bfe6ff"/><circle cx="64" cy="58" r="22" fill="#bfe6ff"/><circle cx="32" cy="72" r="10" fill="#bfe6ff"/><path d="M58 50 Q62 46 68 48" fill="none" stroke="#fff"/>`),
    bano: i(`<path d="M24 20 L76 20 L76 44 L24 44Z" fill="#fff"/><path d="M18 50 L82 50 Q80 76 50 78 Q20 76 18 50Z" fill="#fff"/><path d="M40 78 L36 92 L64 92 L60 78" fill="#fff"/>`),
    sueno: i(`<path d="M62 14 Q30 22 30 52 Q30 82 62 88 Q34 92 20 70 Q8 46 22 28 Q38 10 62 14Z" fill="#ffd23f"/><path d="M58 34 L76 34 L58 52 L76 52" fill="none" stroke-width="4"/>`),
    flechaIzq: i(`<path d="M62 18 L28 50 L62 82" fill="none" stroke-width="12"/>`),
    flechaDer: i(`<path d="M38 18 L72 50 L38 82" fill="none" stroke-width="12"/>`),
    esponja: i(`<path d="M16 36 L84 30 L86 70 L18 76Z" fill="#ffd23f"/><circle cx="34" cy="50" r="5" fill="#e6b800" stroke="none"/><circle cx="60" cy="46" r="6" fill="#e6b800" stroke="none"/><circle cx="70" cy="62" r="4" fill="#e6b800" stroke="none"/>`),
    ducha: i(`<path d="M24 14 L24 40 Q24 30 50 30 L76 30" fill="none"/><path d="M60 30 L92 30 L86 44 L66 44Z" fill="#bfc6d6"/><path d="M68 54 L64 66 M78 54 L76 70 M88 54 L88 66" fill="none" stroke="#3fa7ff"/>`),
    toalla: i(`<path d="M20 22 L80 22 L80 82 L20 82Z" fill="#ff7eb6"/><path d="M20 66 L80 66" fill="none"/><path d="M30 74 L70 74" fill="none" stroke="#fff"/>`),
    jabon: i(`<path d="M18 52 Q18 36 34 36 L66 36 Q82 36 82 52 Q82 68 66 68 L34 68 Q18 68 18 52Z" fill="#a6e3ff"/><circle cx="72" cy="22" r="8" fill="#fff"/><circle cx="58" cy="14" r="5" fill="#fff"/>`),
  };

  return { svg, COMIDAS, ICONOS };
})();
