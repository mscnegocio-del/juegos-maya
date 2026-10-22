// Dibujos SVG compartidos por todos los juegos. Mismo estilo en todo el sitio:
// viewBox 200x200, trazo #3b2a4a de 5 px con uniones redondeadas y caritas tipo kawaii.
// Las clases animables (.ojos, .boca, .boca-abierta, .cabeza, .oreja-i/-d) se animan desde base.css.

const Dibujos = (() => {
  const T = "#3b2a4a"; // color del trazo

  const ojos = (y, sep = 24, cx = 100) => `
    <g class="ojos" stroke="none">
      <circle cx="${cx - sep}" cy="${y}" r="9" fill="${T}"/><circle cx="${cx - sep + 3}" cy="${y - 3}" r="3" fill="#fff"/>
      <circle cx="${cx + sep}" cy="${y}" r="9" fill="${T}"/><circle cx="${cx + sep + 3}" cy="${y - 3}" r="3" fill="#fff"/>
    </g>`;

  const mejillas = (y, sep = 42, color = "#ff9fb8") => `
    <g stroke="none" fill="${color}" opacity=".7">
      <ellipse cx="${100 - sep}" cy="${y}" rx="10" ry="6"/><ellipse cx="${100 + sep}" cy="${y}" rx="10" ry="6"/>
    </g>`;

  // Boca cerrada (sonrisa) y abierta (se muestra mientras suena el animal)
  const boca = (y, w = 14, cx = 100) => `
    <path class="boca" d="M${cx - w} ${y} Q${cx} ${y + w * .9} ${cx + w} ${y}" fill="none" stroke-width="4.5"/>
    <g class="boca-abierta">
      <ellipse cx="${cx}" cy="${y + 4}" rx="${w * .8}" ry="${w * .75}" fill="${T}" stroke="none"/>
      <ellipse cx="${cx}" cy="${y + 4 + w * .38}" rx="${w * .5}" ry="${w * .3}" fill="#ff7a93" stroke="none"/>
    </g>`;

  const svg = (cuerpo, { cabeza = true } = {}) => `<svg viewBox="0 0 200 200" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${cabeza ? `<g class="cabeza">${cuerpo}</g>` : cuerpo}</svg>`;

  // ---- Los 12 animales (juego Animales) ----
  const ANIMALES = {
    vaca: svg(`
      <path d="M58 58 Q44 30 34 38 Q40 52 56 66Z" fill="#ffd36b"/><path d="M142 58 Q156 30 166 38 Q160 52 144 66Z" fill="#ffd36b"/>
      <g class="oreja-i"><ellipse cx="34" cy="86" rx="24" ry="13" fill="#fff" transform="rotate(-20 34 86)"/></g>
      <g class="oreja-d"><ellipse cx="166" cy="86" rx="24" ry="13" fill="#fff" transform="rotate(20 166 86)"/></g>
      <ellipse cx="100" cy="98" rx="62" ry="58" fill="#fff"/>
      <path d="M60 64 Q78 58 82 74 Q78 92 60 86 Q50 74 60 64Z" fill="${T}" stroke="none"/>
      <path d="M134 116 Q150 104 158 116 Q156 132 140 130Z" fill="${T}" stroke="none"/>
      ${ojos(94)}
      <ellipse cx="100" cy="138" rx="46" ry="30" fill="#ffc2d1"/>
      <ellipse cx="84" cy="132" rx="6" ry="8" fill="${T}" stroke="none"/><ellipse cx="116" cy="132" rx="6" ry="8" fill="${T}" stroke="none"/>
      ${boca(150, 12)}`),

    perro: svg(`
      <path class="oreja-i" d="M52 60 Q20 66 26 120 Q34 136 52 116Z" fill="#a0673f"/>
      <path class="oreja-d" d="M148 60 Q180 66 174 120 Q166 136 148 116Z" fill="#a0673f"/>
      <ellipse cx="100" cy="104" rx="60" ry="60" fill="#e8b47c"/>
      <ellipse cx="124" cy="86" rx="20" ry="18" fill="#fff3e2" stroke="none"/>
      ${ojos(94)}${mejillas(120)}
      <ellipse cx="100" cy="134" rx="30" ry="22" fill="#fff3e2"/>
      <ellipse cx="100" cy="122" rx="11" ry="8" fill="${T}" stroke="none"/>
      ${boca(140, 12)}`),

    gato: svg(`
      <path class="oreja-i" d="M46 84 L52 30 L92 56Z" fill="#ffae5c"/><path d="M58 70 L60 46 L80 58Z" fill="#ffc2d1" stroke="none"/>
      <path class="oreja-d" d="M154 84 L148 30 L108 56Z" fill="#ffae5c"/><path d="M142 70 L140 46 L120 58Z" fill="#ffc2d1" stroke="none"/>
      <ellipse cx="100" cy="110" rx="64" ry="56" fill="#ffae5c"/>
      <path d="M100 56 L92 76 M100 56 L108 76 M84 58 L82 72 M116 58 L118 72" stroke="#e5893a" stroke-width="5"/>
      ${ojos(104)}${mejillas(126)}
      <path d="M93 122 L107 122 L100 130Z" fill="#ff7a93" stroke-width="3"/>
      <path d="M44 120 L72 124 M44 136 L72 132 M156 120 L128 124 M156 136 L128 132" stroke-width="3"/>
      ${boca(136, 11)}`),

    chancho: svg(`
      <path class="oreja-i" d="M50 74 L46 34 L86 54Z" fill="#ff9fb8"/>
      <path class="oreja-d" d="M150 74 L154 34 L114 54Z" fill="#ff9fb8"/>
      <ellipse cx="100" cy="106" rx="64" ry="58" fill="#ffb6c8"/>
      ${ojos(92, 28)}${mejillas(120, 46, "#ff7a9c")}
      <ellipse cx="100" cy="124" rx="28" ry="20" fill="#ff8fab"/>
      <ellipse cx="90" cy="124" rx="5" ry="8" fill="${T}" stroke="none"/><ellipse cx="110" cy="124" rx="5" ry="8" fill="${T}" stroke="none"/>
      ${boca(150, 12)}`),

    gallina: svg(`
      <path d="M78 52 Q76 28 92 34 Q98 18 110 30 Q126 24 122 48Z" fill="#ff5a5f"/>
      <ellipse cx="100" cy="106" rx="56" ry="60" fill="#fff"/>
      ${ojos(92, 26)}${mejillas(116, 40)}
      <g class="boca"><path d="M84 112 L116 112 L100 132Z" fill="#ffc93c"/></g>
      <g class="boca-abierta"><path d="M84 108 L116 108 L100 120Z" fill="#ffc93c"/><path d="M86 124 L114 124 L100 140Z" fill="#ffc93c"/></g>
      <path d="M94 136 Q90 156 100 156 Q110 156 106 136" fill="#ff5a5f"/>`),

    gallo: svg(`
      <path d="M64 58 Q54 22 78 30 Q82 4 102 22 Q118 2 126 30 Q150 24 138 58Z" fill="#ff3b3f"/>
      <ellipse cx="100" cy="108" rx="56" ry="60" fill="#ff9f43"/>
      <path d="M56 130 Q70 160 100 164 Q130 160 144 130 Q124 146 100 146 Q76 146 56 130Z" fill="#c0612a" stroke="none"/>
      ${ojos(94, 26)}
      <g class="boca"><path d="M84 112 L116 112 L100 132Z" fill="#ffd23f"/></g>
      <g class="boca-abierta"><path d="M84 108 L116 108 L100 120Z" fill="#ffd23f"/><path d="M86 124 L114 124 L100 140Z" fill="#ffd23f"/></g>
      <path d="M92 136 Q86 162 100 162 Q114 162 108 136" fill="#ff3b3f"/>`),

    oveja: svg(`
      ${[[60,58],[100,44],[140,58],[158,96],[146,136],[54,136],[42,96],[100,150]].map(([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="26" fill="#fffaf0"/>`).join("")}
      <circle cx="100" cy="100" r="52" fill="#fffaf0" stroke="none"/>
      <g class="oreja-i"><ellipse cx="40" cy="104" rx="20" ry="10" fill="#7a6a6a" transform="rotate(20 40 104)"/></g>
      <g class="oreja-d"><ellipse cx="160" cy="104" rx="20" ry="10" fill="#7a6a6a" transform="rotate(-20 160 104)"/></g>
      <ellipse cx="100" cy="112" rx="38" ry="46" fill="#7a6a6a"/>
      ${[[84,70],[100,62],[116,70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="#fffaf0"/>`).join("")}
      ${ojos(106, 18)}${mejillas(126, 28)}
      <g stroke="#fff">${boca(136, 10).replace('stroke-width="4.5"', 'stroke-width="4.5" stroke="#fff"')}</g>`),

    pato: svg(`
      <path d="M96 46 Q90 22 104 26 Q100 36 110 46" fill="#ffd23f"/>
      <circle cx="100" cy="100" r="60" fill="#ffd23f"/>
      ${ojos(88, 26)}${mejillas(112, 44)}
      <g class="boca"><path d="M64 118 Q100 104 136 118 Q140 140 100 140 Q60 140 64 118Z" fill="#ff9f43"/><path d="M70 124 Q100 130 130 124" fill="none" stroke-width="3"/></g>
      <g class="boca-abierta"><path d="M64 112 Q100 98 136 112 Q130 124 100 124 Q70 124 64 112Z" fill="#ff9f43"/><path d="M70 132 Q100 126 130 132 Q126 152 100 152 Q74 152 70 132Z" fill="#ff9f43"/></g>`),

    caballo: svg(`
      <path class="oreja-i" d="M64 58 L58 18 L86 44Z" fill="#b07445"/>
      <path class="oreja-d" d="M136 58 L142 18 L114 44Z" fill="#b07445"/>
      <path d="M100 38 C56 38 54 90 62 126 C68 158 132 158 138 126 C146 90 144 38 100 38Z" fill="#b07445"/>
      <path d="M74 44 Q100 20 126 44 Q118 62 100 54 Q84 64 74 44Z" fill="#4a2c1f"/>
      <path d="M94 66 L100 54 L106 66Z" fill="#fff" stroke="none"/>
      ${ojos(90, 26)}
      <ellipse cx="100" cy="138" rx="36" ry="24" fill="#e3b08a"/>
      <ellipse cx="86" cy="134" rx="5" ry="7" fill="${T}" stroke="none"/><ellipse cx="114" cy="134" rx="5" ry="7" fill="${T}" stroke="none"/>
      ${boca(148, 11)}`),

    leon: svg(`
      ${Array.from({ length: 14 }, (_, i) => {
        const a = i / 14 * Math.PI * 2, x = 100 + Math.cos(a) * 66, y = 104 + Math.sin(a) * 66;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="24" fill="#d9772b"/>`;
      }).join("")}
      <circle cx="100" cy="104" r="66" fill="#d9772b" stroke="none"/>
      <circle class="oreja-i" cx="58" cy="62" r="14" fill="#ffc35c"/><circle class="oreja-d" cx="142" cy="62" r="14" fill="#ffc35c"/>
      <circle cx="100" cy="106" r="54" fill="#ffc35c"/>
      ${ojos(96, 22)}${mejillas(118, 36)}
      <ellipse cx="100" cy="128" rx="24" ry="17" fill="#fff0cc"/>
      <path d="M90 118 L110 118 L100 128Z" fill="${T}" stroke-width="3"/>
      ${boca(136, 11)}`),

    rana: svg(`
      <ellipse cx="100" cy="118" rx="74" ry="52" fill="#6fd27a"/>
      <circle cx="64" cy="70" r="26" fill="#6fd27a"/><circle cx="136" cy="70" r="26" fill="#6fd27a"/>
      <circle cx="64" cy="70" r="15" fill="#fff"/><circle cx="136" cy="70" r="15" fill="#fff"/>
      ${ojos(72, 36)}${mejillas(122, 50)}
      <path class="boca" d="M62 126 Q100 156 138 126" fill="none" stroke-width="5"/>
      <g class="boca-abierta">
        <path d="M62 122 Q100 170 138 122 Q100 132 62 122Z" fill="${T}" stroke="none"/>
        <ellipse cx="100" cy="142" rx="16" ry="7" fill="#ff7a93" stroke="none"/>
      </g>`),

    elefante: svg(`
      <ellipse class="oreja-i" cx="42" cy="100" rx="38" ry="48" fill="#b9c3d6"/>
      <ellipse class="oreja-d" cx="158" cy="100" rx="38" ry="48" fill="#b9c3d6"/>
      <ellipse cx="42" cy="100" rx="22" ry="32" fill="#ffc2d1" stroke="none"/><ellipse cx="158" cy="100" rx="22" ry="32" fill="#ffc2d1" stroke="none"/>
      <ellipse cx="100" cy="96" rx="54" ry="54" fill="#b9c3d6"/>
      ${ojos(86, 22)}${mejillas(110, 34)}
      <path d="M86 108 Q84 150 96 168 Q108 182 122 170 Q112 166 110 150 Q110 128 114 108Z" fill="#b9c3d6"/>
      <path d="M92 132 L106 132 M93 148 L106 146" stroke-width="3"/>
      <path class="boca" d="M70 128 Q78 138 84 132" fill="none" stroke-width="4"/>
      <g class="boca-abierta"><ellipse cx="76" cy="134" rx="8" ry="9" fill="${T}" stroke="none"/></g>`),
  };

  const plano = cuerpo => svg(cuerpo, { cabeza: false });

  const carita = (y = 110) => `
    <g stroke="none"><circle cx="80" cy="${y}" r="8" fill="${T}"/><circle cx="120" cy="${y}" r="8" fill="${T}"/>
    <circle cx="83" cy="${y - 3}" r="2.5" fill="#fff"/><circle cx="123" cy="${y - 3}" r="2.5" fill="#fff"/></g>
    <path d="M88 ${y + 16} Q100 ${y + 27} 112 ${y + 16}" fill="none" stroke-width="4"/>`;

  // ---- Objetos para contar (juego Contar) ----
  const OBJETOS_CONTAR = [
    { nombre: "manzana", plural: "manzanas", dibujo: plano(`
      <path d="M100 52 Q96 30 108 18" fill="none" stroke-width="6"/>
      <path d="M104 40 Q128 18 146 32 Q128 52 104 40Z" fill="#4cd17a"/>
      <path d="M100 58 C60 38 26 70 34 116 C42 166 80 184 100 170 C120 184 158 166 166 116 C174 70 140 38 100 58Z" fill="#ff5a5f"/>
      <ellipse cx="66" cy="88" rx="10" ry="16" fill="#fff" opacity=".5" stroke="none" transform="rotate(25 66 88)"/>
      ${carita(112)}`) },
    { nombre: "estrella", plural: "estrellas", dibujo: plano(`
      <path d="M100 18 L124 72 L182 78 L138 116 L152 174 L100 144 L48 174 L62 116 L18 78 L76 72Z" fill="#ffd23f"/>
      ${carita(104)}`) },
    { nombre: "flor", plural: "flores", dibujo: plano(`
      ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="100" cy="52" rx="28" ry="38" fill="#ff7eb6" transform="rotate(${a} 100 100)"/>`).join("")}
      <circle cx="100" cy="100" r="40" fill="#ffd23f"/>
      ${carita(94)}`) },
    { nombre: "pelota", plural: "pelotas", dibujo: plano(`
      <circle cx="100" cy="100" r="76" fill="#3fa7ff"/>
      <path d="M30 78 Q100 58 170 78 L172 104 Q100 84 28 104Z" fill="#fff" stroke-width="4"/>
      <ellipse cx="70" cy="56" rx="14" ry="9" fill="#fff" opacity=".5" stroke="none" transform="rotate(-30 70 56)"/>
      ${carita(126)}`) },
  ];

  // ---- Objetos de cualquier color (Globos y Colores). Ojos y boca reutilizan las piezas comunes ----
  const brillo = (x, y, rx = 12, ry = 20, giro = 25) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".55" stroke="none" transform="rotate(${giro} ${x} ${y})"/>`;

  const globo = color => svg(`
    <path d="M100 160 Q92 182 104 198" fill="none" stroke-width="3"/>
    <path d="M90 166 L110 166 L100 152Z" fill="${color}"/>
    <ellipse cx="100" cy="84" rx="62" ry="74" fill="${color}"/>
    ${brillo(70, 54)}
    ${ojos(82, 22)}${mejillas(104, 38)}${boca(108, 11)}`);

  const pelota = color => svg(`
    <circle cx="100" cy="100" r="76" fill="${color}"/>
    <path d="M30 78 Q100 58 170 78 L172 104 Q100 84 28 104Z" fill="#fff" stroke-width="4"/>
    ${brillo(68, 54, 14, 9, -30)}
    ${ojos(124, 22)}${boca(144, 10)}`);

  const flor = color => svg(`
    ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="100" cy="52" rx="28" ry="38" fill="${color}" transform="rotate(${a} 100 100)"/>`).join("")}
    <circle cx="100" cy="100" r="40" fill="${color === "#ffd23f" ? "#ff9f43" : "#ffd23f"}"/>
    ${ojos(94, 14)}${boca(112, 9)}`);

  const estrella = color => svg(`
    <path d="M100 18 L124 72 L182 78 L138 116 L152 174 L100 144 L48 174 L62 116 L18 78 L76 72Z" fill="${color}"/>
    ${ojos(100, 18)}${mejillas(118, 32)}${boca(120, 10)}`);

  // ---- Íconos del menú ----
  const paleta = svg(`
    <path d="M100 24 C46 24 18 64 22 104 C26 150 70 178 112 174 C134 172 136 152 124 142 C112 130 120 114 138 116
             C162 118 180 106 180 84 C180 48 148 24 100 24Z" fill="#f5d7a8"/>
    <circle cx="66" cy="62" r="13" fill="#ff5a5f"/><circle cx="104" cy="50" r="13" fill="#ffd23f"/>
    <circle cx="142" cy="66" r="13" fill="#3fa7ff"/><circle cx="56" cy="104" r="13" fill="#4cd17a"/>
    ${ojos(100, 14, 96)}${boca(118, 9, 96)}`);

  const crayon = svg(`
    <g transform="rotate(-35 100 100)">
      <path d="M70 40 L130 40 L130 160 L70 160Z" fill="#a66bff"/>
      <path d="M70 40 L100 2 L130 40Z" fill="#f5d7a8"/><path d="M90 15 L100 2 L110 15Z" fill="#a66bff"/>
      <path d="M70 140 L130 140 M70 60 L130 60" stroke-width="4"/>
      <g transform="rotate(35 100 100)">${ojos(98, 14)}${boca(116, 9)}</g>
    </g>`);

  const piano = svg(`
    <rect x="18" y="56" width="164" height="110" rx="18" fill="#3b2a4a"/>
    ${["#ff5a5f", "#ff9f43", "#ffd23f", "#4cd17a", "#3fa7ff", "#a66bff"].map((c, i) =>
      `<rect x="${30 + i * 24.5}" y="100" width="20" height="56" rx="6" fill="${c}" stroke-width="3"/>`).join("")}
    <g stroke="none"><circle cx="78" cy="78" r="7" fill="#fff"/><circle cx="122" cy="78" r="7" fill="#fff"/>
    <circle cx="80" cy="76" r="2.5" fill="${T}"/><circle cx="124" cy="76" r="2.5" fill="${T}"/></g>
    <path d="M90 86 Q100 94 110 86" fill="none" stroke="#fff" stroke-width="4"/>`);

  // Álbum de stickers: libro abierto con una estrella y un corazón pegados
  const album = svg(`
    <path d="M100 52 Q64 34 20 42 L20 162 Q64 152 100 170 Q136 152 180 162 L180 42 Q136 34 100 52Z" fill="#fff7ec"/>
    <path d="M100 52 L100 170" fill="none"/>
    <path d="M58 64 L65 80 L83 82 L69 93 L73 111 L58 102 L43 111 L47 93 L33 82 L51 80Z" fill="#ffd23f" stroke-width="4"/>
    <path d="M142 112 C124 98 118 82 130 74 C138 69 142 76 142 80 C142 76 146 69 154 74 C166 82 160 98 142 112Z" fill="#ff7eb6" stroke-width="4"/>
    ${ojos(138, 14, 100)}${boca(152, 8, 100)}`, { cabeza: false });

  // ---- Los 8 dinosaurios (Rompecabezas y stickers). Sin clases animables: se clonan con <use> ----
  const OJO = (x, y, r = 7) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${T}" stroke="none"/><circle cx="${x + r * .35}" cy="${y - r * .35}" r="${r * .3}" fill="#fff" stroke="none"/>`;
  const lunares = (pts, c) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c}" stroke="none"/>`).join("");
  const DINOSAURIOS = {
    trex: svg(`<path d="M30 126 Q8 132 4 168 Q30 146 50 150Z" fill="#6fcf7f"/>
      <path d="M70 168 L66 192 L92 192 L92 172Z" fill="#5bb96c"/><path d="M112 168 L112 192 L138 192 L128 168Z" fill="#5bb96c"/>
      <ellipse cx="96" cy="124" rx="56" ry="46" fill="#6fcf7f"/><ellipse cx="104" cy="144" rx="30" ry="26" fill="#d8f5c8" stroke="none"/>
      <path d="M120 132 L136 138 M120 144 L134 148" stroke-width="4" fill="none"/>
      <path d="M112 96 Q132 66 156 66 L170 96 Q146 128 112 136Z" fill="#6fcf7f"/>
      <path d="M146 84 Q150 40 184 42 Q198 46 196 72 Q194 98 164 98 Q150 100 146 84Z" fill="#6fcf7f"/>
      <path d="M164 92 L190 88 L192 96 L166 100Z" fill="#fff" stroke-width="3"/><path d="M174 90 l3 7 l3 -7 M182 88 l3 7 l3 -7" fill="#fff" stroke-width="2"/>
      <path d="M112 108 L136 116 L130 128 L110 120Z" fill="#6fcf7f"/>${OJO(172, 60)}${lunares([[70, 92], [96, 84], [122, 90], [54, 120]], "#4aa85d")}`, { cabeza: false }),
    trice: svg(`<path d="M168 132 Q196 142 198 168 Q170 150 156 152Z" fill="#8ec9f0"/>
      <path d="M76 160 L72 190 L98 190 L96 164Z" fill="#6bb4e0"/><path d="M122 160 L122 190 L148 190 L142 162Z" fill="#6bb4e0"/>
      <ellipse cx="116" cy="128" rx="60" ry="38" fill="#8ec9f0"/>${lunares([[100, 112], [126, 106], [150, 120], [116, 140]], "#6bb4e0")}
      <circle cx="62" cy="96" r="44" fill="#ffb24d"/><path d="M62 54 L66 66 M92 66 L84 74 M30 70 L40 78 M20 98 L32 98 M104 98 L92 98" stroke-width="4" fill="none"/>
      <ellipse cx="48" cy="124" rx="32" ry="26" fill="#8ec9f0"/>
      <path d="M34 82 L22 40 L50 76Z" fill="#fff"/><path d="M62 80 L62 34 L78 82Z" fill="#fff"/><path d="M16 126 L4 114 L26 112Z" fill="#fff"/>
      ${OJO(46, 108)}<path d="M36 134 Q48 142 60 134" fill="none" stroke-width="4"/>`, { cabeza: false }),
    bronto: svg(`<path d="M44 132 Q14 142 6 176 Q32 154 54 152Z" fill="#b9e07a"/>
      <path d="M70 160 L68 192 L94 192 L92 164Z" fill="#a0cc60"/><path d="M118 160 L118 192 L144 192 L136 164Z" fill="#a0cc60"/>
      <ellipse cx="98" cy="132" rx="60" ry="36" fill="#b9e07a"/><path d="M128 114 Q164 94 152 54 L176 52 Q170 100 148 138Z" fill="#b9e07a"/>
      <ellipse cx="172" cy="46" rx="22" ry="17" fill="#b9e07a"/>${OJO(176, 42, 6)}<path d="M168 56 Q178 62 190 54" fill="none" stroke-width="4"/>
      ${lunares([[70, 122], [96, 112], [110, 142], [80, 146]], "#a0cc60")}`, { cabeza: false }),
    estego: svg(`<path d="M38 134 Q8 130 4 160 Q30 146 46 152Z" fill="#ffb86b"/><path d="M10 148 l-6 -10 M18 142 l-6 -10" stroke-width="4" fill="none"/>
      <path d="M60 160 L56 190 L82 190 L82 164Z" fill="#f0a050"/><path d="M122 162 L122 190 L148 190 L142 164Z" fill="#f0a050"/>
      <ellipse cx="100" cy="132" rx="62" ry="34" fill="#ffb86b"/>
      ${[[56, 108, 22], [80, 92, 28], [106, 88, 30], [130, 96, 26], [150, 112, 20]].map(([x, y, h]) => `<path d="M${x - 14} ${y + 16} L${x} ${y - h + 16} L${x + 14} ${y + 16}Z" fill="#ff7eb6"/>`).join("")}
      <ellipse cx="162" cy="140" rx="30" ry="22" fill="#ffb86b"/>${OJO(172, 134, 6)}<path d="M162 150 Q176 156 190 148" fill="none" stroke-width="4"/>`, { cabeza: false }),
    rapto: svg(`<path d="M56 116 Q22 118 4 86 Q32 106 58 134Z" fill="#ff9f6b"/>
      <path d="M84 146 L74 190 L102 190 L100 150Z" fill="#f08a52"/><path d="M110 146 L110 190 L138 190 L128 146Z" fill="#f08a52"/>
      <path d="M72 190 l-8 -4 M80 190 l-6 -8" stroke-width="4" fill="none"/>
      <ellipse cx="98" cy="122" rx="46" ry="32" fill="#ff9f6b"/><ellipse cx="104" cy="134" rx="24" ry="18" fill="#ffe0c4" stroke="none"/>
      <path d="M122 104 Q154 84 150 58 L176 62 Q178 92 140 130Z" fill="#ff9f6b"/>
      <ellipse cx="164" cy="56" rx="28" ry="17" fill="#ff9f6b"/><path d="M178 62 L194 62" stroke-width="4" fill="none"/>
      <path d="M118 120 L140 134 L136 142 L116 132Z" fill="#ff9f6b"/><path d="M142 134 l6 8 m-2 -10 l8 4" stroke-width="3" fill="none"/>
      ${OJO(168, 52, 6)}<path d="M64 98 L72 112 M86 92 L92 108 M108 94 L112 110" stroke="#e0703a" stroke-width="6" fill="none"/>`, { cabeza: false }),
    anqui: svg(`<path d="M44 150 Q18 150 14 140" fill="none"/><path d="M40 146 L16 150" stroke="#b58a5c" stroke-width="16"/><circle cx="20" cy="150" r="18" fill="#b58a5c"/>
      <path d="M62 160 L60 188 L84 188 L84 164Z" fill="#a47a4c"/><path d="M118 162 L118 188 L142 188 L138 164Z" fill="#a47a4c"/>
      <path d="M36 140 Q40 78 102 76 Q164 78 168 140 Q100 158 36 140Z" fill="#c9a06d"/>
      ${lunares([[70, 106], [100, 96], [132, 106], [88, 128], [120, 130]], "#a47a4c")}
      <ellipse cx="170" cy="138" rx="24" ry="18" fill="#c9a06d"/>${OJO(176, 132, 5)}<path d="M164 146 Q176 152 188 146" fill="none" stroke-width="4"/>
      <path d="M56 100 L50 80 L68 90Z M84 84 L84 64 L98 82Z M114 84 L120 64 L130 88Z M144 96 L156 78 L158 102Z" fill="#8c633a"/>`, { cabeza: false }),
    ptero: svg(`<path d="M92 88 L6 56 Q24 104 66 116Z" fill="#c78be0"/><path d="M108 88 L194 56 Q176 104 134 116Z" fill="#c78be0"/>
      <path d="M44 74 L40 100 M24 66 L26 90 M156 74 L160 100 M176 66 L174 90" stroke-width="3" fill="none"/>
      <path d="M90 150 L84 186 M110 150 L116 186" stroke-width="5" fill="none"/>
      <ellipse cx="100" cy="116" rx="26" ry="38" fill="#e0b0f0"/><ellipse cx="100" cy="126" rx="14" ry="24" fill="#f6e4fb" stroke="none"/>
      <path d="M92 56 L84 20 L108 50Z" fill="#c78be0"/><ellipse cx="100" cy="66" rx="20" ry="17" fill="#e0b0f0"/>
      <path d="M112 66 L168 76 L112 80Z" fill="#ffd36b"/>${OJO(94, 62, 5)}${OJO(108, 62, 5)}`, { cabeza: false }),
    espino: svg(`<path d="M42 138 Q10 134 4 164 Q32 150 50 156Z" fill="#5fc8c0"/>
      <path d="M62 160 L58 190 L84 190 L84 164Z" fill="#48b0a8"/><path d="M122 162 L122 190 L148 190 L142 164Z" fill="#48b0a8"/>
      <ellipse cx="98" cy="134" rx="58" ry="30" fill="#5fc8c0"/>
      <path d="M50 116 Q58 52 98 46 Q138 52 146 112Z" fill="#ff7a8a"/><path d="M70 112 L72 66 M90 108 L92 54 M110 108 L112 54 M128 110 L126 66" stroke-width="4" fill="none"/>
      <path d="M130 138 Q156 112 180 118 Q198 122 196 136 Q192 150 168 150 Q144 152 130 138Z" fill="#5fc8c0"/>
      <path d="M150 140 l4 8 l4 -8 M164 140 l4 8 l4 -8" fill="#fff" stroke-width="2"/>${OJO(172, 124, 5)}`, { cabeza: false }),
  };
  const DINO_NOMBRES = { trex: "el tiranosaurio", trice: "el tricerátops", bronto: "el braquiosaurio", estego: "el estegosaurio",
                         rapto: "el velociraptor", anqui: "el anquilosaurio", ptero: "el pterodáctilo", espino: "el espinosaurio" };

  // Ícono del juego Rompecabezas: pieza con lengüetas y carita
  const rompecabezas = svg(`
    <path d="M36 52 L82 52 Q80 34 96 32 Q118 32 116 52 L164 52 L164 94 Q184 92 184 110 Q184 128 164 126 L164 168 L36 168Z" fill="#6c8cff"/>
    ${ojos(104, 22)}${mejillas(124, 40)}${boca(126, 12)}`, { cabeza: false });

  // Nota musical (botón "canción" del piano), sin carita para que se lea como símbolo
  const notaMusical = `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
    <path d="M40 74 L40 22 L80 14 L80 64" fill="none"/>
    <path d="M40 22 L80 14 L80 28 L40 36Z" fill="${T}"/>
    <ellipse cx="30" cy="76" rx="13" ry="10" fill="#ff7eb6" transform="rotate(-20 30 76)"/>
    <ellipse cx="70" cy="66" rx="13" ry="10" fill="#3fa7ff" transform="rotate(-20 70 66)"/>
  </svg>`;

  // Casita del botón "volver al menú" (viewBox propio, sin carita)
  const casita = `<svg viewBox="0 0 100 100" stroke="${T}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
    <path d="M18 50 L50 20 L82 50 L82 84 L18 84Z" fill="#ffd23f"/>
    <path d="M10 52 L50 14 L90 52" fill="none" stroke="#ff5a5f" stroke-width="9"/>
    <path d="M42 84 L42 62 Q50 56 58 62 L58 84Z" fill="#ff9f43"/>
  </svg>`;

  return { T, svg, plano, ojos, mejillas, boca, carita, ANIMALES, OBJETOS_CONTAR,
           globo, pelota, flor, estrella, paleta, crayon, piano, album, rompecabezas, DINOSAURIOS, DINO_NOMBRES, notaMusical, casita };
})();

// El botón "volver al menú" muestra la casita SVG (el emoji queda solo como respaldo sin JS)
document.querySelectorAll(".btn-casa").forEach(b => (b.innerHTML = Dibujos.casita));
