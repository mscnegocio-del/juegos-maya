// Michi, el gato de Maya (solo lo usa juegos/gato). Estilo suave: contorno marrón, degradados con difuminado,
// ojos con blanco e iris verde, cejas expresivas, rayas atigradas, almohadillas, collar con hebillas y cascabel.
// Partes animables (clases): .cola, .cabeza, .oreja-i/.oreja-d, .cejas, ojos (.ojos-abiertos, .ojos-cerrados,
// .ojos-felices, .ojos-satisfecho, .ojos-esfuerzo, .ojos-espiral, .ojos-corazon), .pupilas,
// boca (.boca, .boca-abierta, .lengua, .boca-o, .boca-dientes, .boca-masticar), .mejillas, .pata-i/.pata-d, .cascabel.
// Zonas tocables: data-zona (cabeza, nariz, mejilla, panza, cuerpo, cola, pata). Manchas de barro: .mancha[data-mancha].

const Michi = (() => {
  const M = "#4a2f2a";            // contorno marrón
  const GRIS_OSCURO = "#6f7891", BLANCO = "#fffaf3", ROSA = "#ffb8c9";
  const RAYA = `fill="none" stroke="${GRIS_OSCURO}" stroke-width="7" stroke-linecap="round"`;

  // Ojo: blanco + iris (dentro de .pupilas para que siga el dedo) + brillos
  const ojo = (cx, cy) => `
    <ellipse cx="${cx}" cy="${cy}" rx="19" ry="21.5" fill="#fff"/>
    <g class="pupilas" stroke="none">
      <ellipse cx="${cx}" cy="${cy + 2}" rx="13" ry="15.5" fill="url(#michi-iris)"/>
      <ellipse cx="${cx}" cy="${cy + 3}" rx="6.5" ry="10" fill="#2a1a17"/>
      <circle cx="${cx + 5}" cy="${cy - 5}" r="5" fill="#fff"/><circle cx="${cx - 5}" cy="${cy + 10}" r="2.3" fill="#fff"/>
    </g>`;
  // Párpado a media asta (estado "satisfecho"): tapa la mitad de arriba del ojo
  const parpado = (cx, cy) => `<path d="M${cx - 20} ${cy + 1} Q${cx - 19} ${cy - 23} ${cx} ${cy - 23} Q${cx + 19} ${cy - 23} ${cx + 20} ${cy + 1} Q${cx} ${cy + 6} ${cx - 20} ${cy + 1}Z" fill="url(#michi-pelo)"/>`;
  const almohadillas = cx => `
    <ellipse cx="${cx}" cy="300" rx="9" ry="6" fill="${ROSA}" stroke="none"/>
    <circle cx="${cx - 11}" cy="291" r="4" fill="${ROSA}" stroke="none"/><circle cx="${cx}" cy="288" r="4" fill="${ROSA}" stroke="none"/>
    <circle cx="${cx + 11}" cy="291" r="4" fill="${ROSA}" stroke="none"/>`;
  const mancha = (id, cx, cy, r) =>
    `<g class="mancha" data-mancha="${id}" data-x="${cx}" data-y="${cy}" stroke="none">
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * .78}" fill="#8a5a3c" opacity=".85"/>
      <circle cx="${cx + r * .9}" cy="${cy - r * .5}" r="${r * .35}" fill="#8a5a3c" opacity=".85"/>
      <circle cx="${cx - r * .8}" cy="${cy + r * .6}" r="${r * .28}" fill="#8a5a3c" opacity=".85"/></g>`;

  const svg = `<svg class="michi" viewBox="0 0 240 320" stroke="${M}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
    <defs>
      <radialGradient id="michi-pelo" cx="40%" cy="28%" r="78%"><stop offset="0" stop-color="#d3d9e5"/><stop offset=".5" stop-color="#a9b2c6"/><stop offset="1" stop-color="#848ea6"/></radialGradient>
      <radialGradient id="michi-iris" cx="45%" cy="32%" r="72%"><stop offset="0" stop-color="#c6f58a"/><stop offset=".55" stop-color="#5ec840"/><stop offset="1" stop-color="#2a8326"/></radialGradient>
      <radialGradient id="michi-cascabel" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff6b8"/><stop offset=".5" stop-color="#ffd23f"/><stop offset="1" stop-color="#d99b00"/></radialGradient>
      <linearGradient id="michi-collar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a7e"/><stop offset="1" stop-color="#e0383e"/></linearGradient>
      <radialGradient id="michi-panza" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#efe7df"/></radialGradient>
      <filter id="michi-suave" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="michi-suave2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5"/></filter>
    </defs>
    <ellipse cx="120" cy="306" rx="92" ry="11" fill="#2a1a17" opacity=".2" stroke="none" filter="url(#michi-suave2)"/>

    <g class="cola" data-zona="cola">
      <path d="M168 270 Q228 262 216 204 Q208 166 228 142" fill="none" stroke="transparent" stroke-width="48"/>
      <path d="M168 270 Q228 262 216 204 Q208 166 228 142" fill="none" stroke="${M}" stroke-width="23"/>
      <path d="M168 270 Q228 262 216 204 Q208 166 228 142" fill="none" stroke="#a9b2c6" stroke-width="14"/>
      <path d="M200 244 L212 257 M211 220 L225 223 M207 194 L221 191 M213 168 L226 162" ${RAYA}/>
    </g>

    <g class="cuerpo" data-zona="cuerpo">
      <ellipse cx="120" cy="226" rx="72" ry="74" fill="url(#michi-pelo)"/>
      <ellipse cx="88" cy="250" rx="30" ry="40" fill="#5d6680" opacity=".22" stroke="none" filter="url(#michi-suave)"/>
      <path d="M54 208 Q64 214 72 206 M50 236 Q61 242 70 233 M186 208 Q176 214 168 206 M190 236 Q179 242 170 233" ${RAYA}/>
      <ellipse class="panza" data-zona="panza" cx="120" cy="236" rx="44" ry="50" fill="url(#michi-panza)"/>
      <path d="M92 196 L100 207 L106 194 L113 208 L120 193 L127 208 L134 194 L140 207 L148 196" fill="${BLANCO}" stroke-width="3.5"/>
      ${mancha("panza", 132, 252, 12)}
    </g>

    <g class="patas" data-zona="pata">
      <ellipse cx="82" cy="294" rx="28" ry="17" fill="${BLANCO}"/><ellipse cx="158" cy="294" rx="28" ry="17" fill="${BLANCO}"/>
      ${almohadillas(82)}${almohadillas(158)}
    </g>

    <g class="pata-i" data-zona="pata">
      <path d="M60 192 Q50 236 62 262 Q70 272 82 262 Q88 232 80 196Z" fill="url(#michi-pelo)"/>
      <path d="M58 220 L74 218 M60 240 L76 238" ${RAYA} stroke-width="5"/>
      <ellipse cx="70" cy="264" rx="15" ry="10" fill="${BLANCO}"/><path d="M64 267 L64 273 M71 268 L71 274 M78 267 L78 273" stroke-width="2.5"/>
      ${mancha("pata-i", 66, 232, 9)}
    </g>
    <g class="pata-d" data-zona="pata">
      <path d="M180 192 Q190 236 178 262 Q170 272 158 262 Q152 232 160 196Z" fill="url(#michi-pelo)"/>
      <path d="M182 220 L166 218 M180 240 L164 238" ${RAYA} stroke-width="5"/>
      <ellipse cx="170" cy="264" rx="15" ry="10" fill="${BLANCO}"/><path d="M164 267 L164 273 M171 268 L171 274 M178 267 L178 273" stroke-width="2.5"/>
      ${mancha("pata-d", 174, 236, 9)}
    </g>

    <g class="collar">
      <path d="M64 160 Q120 192 176 160 L178 175 Q120 207 62 175Z" fill="url(#michi-collar)"/>
      <rect x="78" y="168" width="11" height="13" rx="3" fill="#dfe3ea" stroke-width="3" transform="rotate(20 83 174)"/>
      <rect x="151" y="168" width="11" height="13" rx="3" fill="#dfe3ea" stroke-width="3" transform="rotate(-20 156 174)"/>
      <g class="cascabel"><circle cx="120" cy="199" r="12" fill="url(#michi-cascabel)"/><path d="M111 202 L129 202 M120 202 L120 210" stroke-width="3"/>
        <ellipse cx="115" cy="193" rx="3.5" ry="2.5" fill="#fff" stroke="none"/></g>
    </g>

    <g class="cabeza" data-zona="cabeza">
      <g class="orejas">
        <g class="oreja-i"><path d="M50 96 L42 20 L106 54Z" fill="url(#michi-pelo)"/><path d="M60 80 L56 38 L92 58Z" fill="${ROSA}" stroke="none"/>
          <path d="M60 64 L66 50 M66 70 L74 58" stroke="${BLANCO}" stroke-width="3.5"/></g>
        <g class="oreja-d"><path d="M190 96 L198 20 L134 54Z" fill="url(#michi-pelo)"/><path d="M180 80 L184 38 L148 58Z" fill="${ROSA}" stroke="none"/>
          <path d="M180 64 L174 50 M174 70 L166 58" stroke="${BLANCO}" stroke-width="3.5"/></g>
      </g>
      <path d="M44 106 L26 114 L42 122 L24 134 L44 138 L34 150 L60 148 M196 106 L214 114 L198 122 L216 134 L196 138 L206 150 L180 148" fill="url(#michi-pelo)"/>
      <ellipse cx="120" cy="106" rx="82" ry="68" fill="url(#michi-pelo)"/>
      <ellipse cx="96" cy="64" rx="34" ry="16" fill="#fff" opacity=".35" stroke="none" filter="url(#michi-suave)"/>
      <path d="M120 40 L114 62 M120 40 L126 62 M100 44 L100 60 M140 44 L140 60" ${RAYA}/>
      <path d="M40 112 L56 116 M42 126 L56 126 M200 112 L184 116 M198 126 L184 126" ${RAYA} stroke-width="6"/>
      <path d="M76 128 Q80 98 120 100 Q160 98 164 128 Q160 166 120 168 Q80 166 76 128Z" fill="url(#michi-panza)" stroke="none"/>
      ${mancha("frente", 150, 66, 10)}${mancha("oreja", 70, 46, 8)}${mancha("cachete", 186, 96, 8)}

      <g class="cejas" fill="none" stroke-width="5">
        <path class="ceja-i" d="M70 72 Q86 64 102 70"/><path class="ceja-d" d="M138 70 Q154 64 170 72"/>
      </g>
      <g class="ojos-abiertos">${ojo(86, 102)}${ojo(154, 102)}</g>
      <g class="ojos-satisfecho">${parpado(86, 102)}${parpado(154, 102)}</g>
      <g class="ojos-cerrados" fill="none"><path d="M68 104 Q86 118 104 104"/><path d="M136 104 Q154 118 172 104"/></g>
      <g class="ojos-felices" fill="none"><path d="M68 108 Q86 88 104 108"/><path d="M136 108 Q154 88 172 108"/></g>
      <g class="ojos-esfuerzo" fill="none" stroke-width="5"><path d="M70 94 L100 104 L70 114"/><path d="M170 94 L140 104 L170 114"/></g>
      <g class="ojos-espiral" fill="none" stroke-width="3.5">
        <path d="M86 102 m-3 0 a3 3 0 1 1 6 0 a6 6 0 1 1 -12 0 a10 10 0 1 1 20 0 a14 14 0 1 1 -28 0"/>
        <path d="M154 102 m-3 0 a3 3 0 1 1 6 0 a6 6 0 1 1 -12 0 a10 10 0 1 1 20 0 a14 14 0 1 1 -28 0"/></g>
      <g class="ojos-corazon" stroke-width="3.5">
        <path d="M86 118 C64 102 68 86 78 86 C84 86 86 92 86 94 C86 92 88 86 94 86 C104 86 108 102 86 118Z" fill="#ff4f7b"/>
        <path d="M154 118 C132 102 136 86 146 86 C152 86 154 92 154 94 C154 92 156 86 162 86 C172 86 176 102 154 118Z" fill="#ff4f7b"/></g>

      <g class="mejillas" data-zona="mejilla" stroke="none">
        <ellipse class="mejilla" cx="64" cy="134" rx="17" ry="11" fill="#ff7f9f" opacity=".5" filter="url(#michi-suave2)"/>
        <ellipse class="mejilla" cx="176" cy="134" rx="17" ry="11" fill="#ff7f9f" opacity=".5" filter="url(#michi-suave2)"/>
      </g>
      <path class="nariz" data-zona="nariz" d="M109 122 Q120 118 131 122 Q127 132 120 134 Q113 132 109 122Z" fill="#ff8aa0" stroke-width="3.5"/>
      <ellipse cx="116" cy="123.5" rx="3.5" ry="1.8" fill="#fff" opacity=".85" stroke="none" pointer-events="none"/>
      <g fill="${GRIS_OSCURO}" stroke="none"><circle cx="96" cy="134" r="1.9"/><circle cx="92" cy="140" r="1.9"/><circle cx="99" cy="141" r="1.9"/>
        <circle cx="144" cy="134" r="1.9"/><circle cx="148" cy="140" r="1.9"/><circle cx="141" cy="141" r="1.9"/></g>

      <path class="boca" d="M103 139 Q111 149 120 139 Q129 149 137 139" fill="none" stroke-width="4"/>
      <g class="boca-abierta"><path d="M101 139 Q120 178 139 139 Q120 145 101 139Z" fill="#5b2330" stroke-width="3.5"/>
        <ellipse cx="120" cy="157" rx="10" ry="6" fill="#ff7a93" stroke="none"/><path d="M107 141 L110 148 L113 142Z" fill="#fff" stroke="none"/></g>
      <g class="lengua"><path d="M103 139 Q111 149 120 139 Q129 149 137 139" fill="none" stroke-width="4"/>
        <path d="M111 143 Q111 164 120 164 Q129 164 129 143Z" fill="#ff7a93" stroke-width="3.5"/></g>
      <g class="boca-o"><ellipse cx="120" cy="148" rx="7" ry="8" fill="#5b2330" stroke-width="3.5"/></g>
      <g class="boca-masticar"><path d="M106 144 Q120 154 134 144" fill="none" stroke-width="4"/></g>
      <g class="boca-dientes">
        <path d="M92 136 Q120 132 148 136 Q146 178 120 180 Q94 178 92 136Z" fill="#5b2330" stroke-width="4"/>
        <ellipse cx="120" cy="168" rx="16" ry="8" fill="#ff7a93" stroke="none"/>
        <path d="M96 138 L144 138 L142 148 Q120 152 98 148Z" fill="#fff" stroke-width="2.5"/>
        <path d="M104 139 L104 149 M112 139 L112 151 M120 139 L120 151 M128 139 L128 151 M136 139 L136 149" stroke-width="1.6"/>
        <path d="M100 172 Q120 168 140 172 L139 179 Q120 182 101 179Z" fill="#fff" stroke-width="2.5"/>
      </g>
      <path class="bigotes" d="M36 120 L72 128 M34 136 L72 138 M204 120 L168 128 M206 136 L168 138" stroke-width="3"/>
    </g>
  </svg>`;

  // Comidas: dibujo + si le gusta. La zanahoria le hace poner cara graciosa (sin asco ni drama)
  const T = M;
  const c = cuerpo => `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${cuerpo}</svg>`;
  const COMIDAS = [
    { id: "pescado", nombre: "pescado", leGusta: true, dibujo: c(`<path d="M70 50 L94 32 L90 50 L94 68Z" fill="#3fa7ff"/><ellipse cx="46" cy="50" rx="34" ry="22" fill="#3fa7ff"/><circle cx="28" cy="46" r="4" fill="${T}" stroke="none"/><path d="M50 36 Q58 50 50 64" fill="none"/><ellipse cx="40" cy="40" rx="10" ry="4" fill="#fff" opacity=".6" stroke="none"/>`) },
    { id: "leche", nombre: "leche", leGusta: true, dibujo: c(`<path d="M30 30 L70 30 L66 90 L34 90Z" fill="#fff"/><path d="M30 30 L40 12 L60 12 L70 30" fill="#ff5a5f"/><path d="M38 58 L62 58" fill="none" stroke="#3fa7ff" stroke-width="6"/>`) },
    { id: "manzana", nombre: "manzana", leGusta: true, dibujo: c(`<path d="M50 28 C30 16 12 34 16 58 C20 84 40 94 50 86 C60 94 80 84 84 58 C88 34 70 16 50 28Z" fill="#ff5a5f"/><path d="M50 28 Q48 14 56 8" fill="none"/><path d="M54 20 Q68 8 78 16 Q66 28 54 20Z" fill="#4cd17a"/><ellipse cx="32" cy="44" rx="6" ry="10" fill="#fff" opacity=".5" stroke="none"/>`) },
    { id: "galleta", nombre: "galleta", leGusta: true, dibujo: c(`<circle cx="50" cy="50" r="38" fill="#e3a868"/>${[[36, 36], [62, 40], [44, 62], [64, 64], [30, 54]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#6b4226" stroke="none"/>`).join("")}`) },
    { id: "queso", nombre: "queso", leGusta: true, dibujo: c(`<path d="M12 70 L88 70 L88 40 L12 58Z" fill="#ffd23f"/><path d="M12 58 L88 40 L60 22Z" fill="#ffe680"/><circle cx="40" cy="62" r="5" fill="#e6b800" stroke="none"/><circle cx="70" cy="56" r="6" fill="#e6b800" stroke="none"/>`) },
    { id: "zanahoria", nombre: "zanahoria", leGusta: false, dibujo: c(`<path d="M40 30 L64 30 L54 94Z" fill="#ff9f43"/><path d="M44 30 Q36 10 46 6 Q50 18 52 30 Q56 10 66 8 Q66 22 60 30" fill="#4cd17a"/><path d="M46 46 L54 48 M48 64 L56 62" fill="none" stroke-width="3"/>`) },
  ];

  // Íconos: necesidades, barra inferior, herramientas
  const i = cuerpo => `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${cuerpo}</svg>`;
  const ICONOS = {
    sala: i(`<circle cx="50" cy="50" r="38" fill="#ffd23f"/><circle cx="36" cy="42" r="5" fill="${T}" stroke="none"/><circle cx="64" cy="42" r="5" fill="${T}" stroke="none"/><path d="M30 58 Q50 78 70 58" fill="none"/>`),
    cocina: i(`<path d="M30 12 L30 40 Q30 50 38 50 L38 90 M22 12 L22 38 Q22 50 30 50 M38 12 L38 38" fill="none" stroke-width="7"/><path d="M66 12 Q82 26 76 52 L70 52 L70 90" fill="none" stroke-width="7"/>`),
    bano: i(`<path d="M24 16 L76 16 L76 42 L24 42Z" fill="#fff"/><path d="M16 48 L84 48 Q82 76 50 78 Q18 76 16 48Z" fill="#fff"/><path d="M40 78 L36 92 L64 92 L60 78" fill="#fff"/>`),
    dormitorio: i(`<path d="M64 12 Q30 20 30 52 Q30 84 64 88 Q34 94 18 72 Q4 46 20 26 Q38 6 64 12Z" fill="#ffd23f"/><path d="M62 30 L74 30 L62 44 L74 44" fill="none" stroke-width="4"/>`),
    corazon: i(`<path d="M50 86 C10 60 6 34 22 22 C36 12 48 22 50 32 C52 22 64 12 78 22 C94 34 90 60 50 86Z" fill="#ff5a87"/>`),
    volver: i(`<path d="M60 18 L26 50 L60 82" fill="none" stroke-width="12"/>`),
    esponja: i(`<rect x="14" y="30" width="72" height="44" rx="12" fill="#5ab8ff"/><circle cx="34" cy="48" r="5" fill="#2f8fd9" stroke="none"/><circle cx="58" cy="44" r="6" fill="#2f8fd9" stroke="none"/><circle cx="70" cy="60" r="4" fill="#2f8fd9" stroke="none"/><circle cx="42" cy="62" r="4" fill="#2f8fd9" stroke="none"/>`),
    jabon: i(`<rect x="16" y="32" width="68" height="40" rx="14" fill="#ffd23f"/><circle cx="50" cy="52" r="8" fill="#ff9f43" stroke="none"/><circle cx="40" cy="42" r="3.5" fill="#ff9f43" stroke="none"/><circle cx="50" cy="39" r="3.5" fill="#ff9f43" stroke="none"/><circle cx="60" cy="42" r="3.5" fill="#ff9f43" stroke="none"/><ellipse cx="30" cy="40" rx="6" ry="3" fill="#fff" opacity=".7" stroke="none"/>`),
    jabonRosa: i(`<ellipse cx="50" cy="56" rx="36" ry="22" fill="#ff8fc0"/><circle cx="62" cy="22" r="9" fill="#fff"/><circle cx="44" cy="16" r="6" fill="#fff"/><circle cx="76" cy="36" r="5" fill="#fff"/><ellipse cx="36" cy="50" rx="8" ry="4" fill="#fff" opacity=".7" stroke="none"/>`),
    ducha: i(`<path d="M24 14 L24 40 Q24 30 50 30 L76 30" fill="none"/><path d="M60 30 L92 30 L86 44 L66 44Z" fill="#bfc6d6"/><path d="M68 54 L64 66 M78 54 L76 70 M88 54 L88 66" fill="none" stroke="#3fa7ff"/>`),
    toalla: i(`<path d="M20 22 L80 22 L80 82 L20 82Z" fill="#ff7eb6"/><path d="M20 66 L80 66" fill="none"/><path d="M30 74 L70 74" fill="none" stroke="#fff"/>`),
    grifo: i(`<path d="M20 40 L60 40 Q78 40 78 58 L78 66" fill="none" stroke-width="10"/><rect x="30" y="24" width="20" height="12" rx="4" fill="#bfc6d6"/><path d="M78 76 L74 86 M84 78 L84 90" fill="none" stroke="#3fa7ff"/>`),
    cepilloAzul: i(`<path d="M18 82 L66 34" stroke-width="12" stroke="#2f8fd9"/><path d="M18 82 L66 34" stroke-width="5" stroke="#5ab8ff"/><rect x="58" y="10" width="26" height="22" rx="6" fill="#fff" transform="rotate(45 71 21)"/>`),
    cepilloRosa: i(`<path d="M18 82 L66 34" stroke-width="12" stroke="#e0508f"/><path d="M18 82 L66 34" stroke-width="5" stroke="#ff8fc0"/><rect x="58" y="10" width="26" height="22" rx="6" fill="#fff" transform="rotate(45 71 21)"/>`),
    papel: i(`<rect x="24" y="22" width="52" height="40" rx="20" fill="#fff"/><circle cx="50" cy="42" r="8" fill="#e8e2da"/><path d="M30 60 L30 88 L70 88 L70 60" fill="#fff"/>`),
    cadena: i(`<circle cx="50" cy="50" r="30" fill="#bfc6d6"/><path d="M38 42 Q50 30 62 42 Q66 58 50 62 Q40 60 42 50" fill="none" stroke="#3fa7ff" stroke-width="6"/>`),
  };

  return { svg, COMIDAS, ICONOS };
})();
