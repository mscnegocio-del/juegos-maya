// La casa de Michi: decoración de fondo (se muestra desenfocada) y objetos con los que se interactúa.
// Mismo estilo que michi.js: contorno marrón, degradados suaves, brillos. Cada dibujo tiene su propio viewBox.

const Casa = (() => {
  const M = "#4a2f2a";
  const s = (vb, cuerpo, extra = "") => `<svg viewBox="${vb}" stroke="${M}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" ${extra} aria-hidden="true">${cuerpo}</svg>`;
  const brillo = (x, y, rx, ry, giro = 0) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".55" stroke="none" transform="rotate(${giro} ${x} ${y})"/>`;
  const def = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

  // ---------- Decoración (fondo desenfocado) ----------
  const ventanaCiudad = s("0 0 200 220", `<defs>${def("cielo", "#bfe6ff", "#e9f6ff")}</defs>
    <path d="M14 214 L14 70 Q14 14 100 14 Q186 14 186 70 L186 214Z" fill="#d79a8f"/>
    <path d="M28 200 L28 74 Q28 30 100 30 Q172 30 172 74 L172 200Z" fill="url(#cielo)"/>
    <g stroke="none"><ellipse cx="70" cy="64" rx="22" ry="10" fill="#fff"/><ellipse cx="88" cy="58" rx="16" ry="12" fill="#fff"/><ellipse cx="140" cy="80" rx="18" ry="8" fill="#fff"/>
      <rect x="40" y="120" width="26" height="80" fill="#b9a6d9"/><rect x="70" y="96" width="30" height="104" fill="#cfb8e8"/><rect x="104" y="130" width="22" height="70" fill="#9fc4e6"/>
      <rect x="130" y="110" width="30" height="90" fill="#b0d0ee"/>
      ${[[46, 132], [56, 150], [78, 110], [88, 130], [78, 150], [136, 124], [148, 144], [110, 144]].map(([x, y]) => `<rect x="${x}" y="${y}" width="6" height="8" fill="#fff" opacity=".8"/>`).join("")}</g>
    <path d="M100 30 L100 200 M28 120 L172 120" stroke="#d79a8f" stroke-width="8"/>
    <rect x="6" y="196" width="188" height="18" rx="6" fill="#c98476"/>`);

  const cuadroPez = s("0 0 140 120", `<rect x="6" y="6" width="128" height="108" rx="10" fill="#b77b5a"/><rect x="20" y="20" width="100" height="80" rx="4" fill="#ffe9c9"/>
    <path d="M86 60 L108 44 L104 60 L108 76Z" fill="#ff9f43"/><ellipse cx="66" cy="60" rx="28" ry="18" fill="#ff9f43"/><circle cx="52" cy="56" r="4" fill="${M}" stroke="none"/>
    <circle cx="36" cy="36" r="5" fill="#bfe6ff"/><circle cx="46" cy="28" r="3.5" fill="#bfe6ff"/>`);

  const planta = (h = 1) => s("0 0 120 160", `<path d="M60 92 Q30 60 18 70 Q30 92 58 98 M60 92 Q50 40 62 22 Q76 46 62 96 M62 94 Q92 58 104 66 Q96 94 64 100" fill="#7cc46b"/>
    <path d="M30 96 L90 96 L82 152 L38 152Z" fill="#c9765a"/><path d="M26 92 L94 92 L94 104 L26 104Z" fill="#d98a6c"/>`);

  const plantaColgante = s("0 0 120 220", `<path d="M60 0 L60 40" stroke-width="3"/><path d="M28 40 L92 40 L84 76 L36 76Z" fill="#a98bd6"/>
    ${[[34, 76, 30, 150], [58, 76, 56, 200], [84, 76, 92, 170]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2 - 10} ${(y1 + y2) / 2} ${x2} ${y2}" fill="none" stroke="#5aa651" stroke-width="4"/>
      ${[0.3, 0.55, 0.8].map(t => `<ellipse cx="${x1 + (x2 - x1) * t - 6}" cy="${y1 + (y2 - y1) * t}" rx="8" ry="5" fill="#7cc46b" stroke-width="2.5"/>`).join("")}`).join("")}`);

  const lamparaColgante = s("0 0 160 140", `<path d="M80 0 L80 60" stroke-width="5"/><path d="M30 104 Q34 62 80 60 Q126 62 130 104Z" fill="#7a6fd6"/>
    <rect x="22" y="100" width="116" height="12" rx="6" fill="#6559c4"/><ellipse cx="80" cy="118" rx="18" ry="8" fill="#fff6c8" stroke="none" opacity=".9"/>`);

  const heladera = s("0 0 140 260", `<defs>${def("hel", "#ffe0a3", "#ffc35c")}</defs><rect x="8" y="6" width="124" height="248" rx="18" fill="url(#hel)"/>
    <path d="M8 96 L132 96" /><rect x="110" y="40" width="10" height="40" rx="5" fill="#e0a43a"/><rect x="110" y="120" width="10" height="56" rx="5" fill="#e0a43a"/>
    <circle cx="50" cy="150" r="22" fill="none" stroke="#ffb02e" stroke-width="6"/><circle cx="50" cy="150" r="10" fill="none" stroke="#ffb02e" stroke-width="5"/>${brillo(30, 40, 8, 24)}`);

  const estante = s("0 0 220 120", `<rect x="6" y="80" width="208" height="14" rx="6" fill="#c98a5f"/>
    <rect x="22" y="40" width="34" height="40" rx="6" fill="#ff9f43"/><rect x="66" y="30" width="30" height="50" rx="6" fill="#3fa7ff"/>
    <circle cx="130" cy="62" r="18" fill="#ffd23f"/><path d="M160 80 L168 36 L196 36 L204 80Z" fill="#4cd17a"/>`);

  const ventanaNoche = s("0 0 200 180", `<rect x="8" y="8" width="184" height="164" rx="14" fill="#c9a6e8"/><rect x="22" y="22" width="156" height="136" rx="8" fill="#2b2e6b"/>
    <circle cx="136" cy="62" r="24" fill="#ffe680"/><circle cx="148" cy="54" r="21" fill="#2b2e6b" stroke="none"/>
    ${[[50, 50], [80, 110], [44, 128], [110, 40], [150, 128]].map(([x, y]) => `<path d="M${x} ${y - 6} L${x + 2} ${y - 2} L${x + 6} ${y} L${x + 2} ${y + 2} L${x} ${y + 6} L${x - 2} ${y + 2} L${x - 6} ${y} L${x - 2} ${y - 2}Z" fill="#fff" stroke="none"/>`).join("")}
    <path d="M100 22 L100 158 M22 90 L178 90" stroke="#c9a6e8" stroke-width="7"/>`);

  const toallero = s("0 0 160 140", `<path d="M10 20 L150 20" stroke-width="7"/><path d="M30 20 L30 120 Q30 130 40 130 L80 130 Q90 130 90 120 L90 20Z" fill="#ff8fc0"/>
    <path d="M30 104 L90 104" stroke="#fff" stroke-width="5"/><path d="M96 20 L96 96 Q96 104 104 104 L132 104 Q140 104 140 96 L140 20Z" fill="#7fd1c7"/>`);

  // ---------- Objetos (nítidos) ----------
  const alfombra = color => s("0 0 400 120", `<ellipse cx="200" cy="60" rx="194" ry="54" fill="${color}"/><ellipse cx="200" cy="60" rx="168" ry="40" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`);

  const sillon = s("0 0 240 200", `<defs>${def("sil", "#ffb35c", "#f08a2e")}</defs>
    <path d="M30 40 Q30 14 60 14 L180 14 Q210 14 210 40 L210 120 L30 120Z" fill="url(#sil)"/>
    <rect x="6" y="80" width="54" height="90" rx="22" fill="url(#sil)"/><rect x="180" y="80" width="54" height="90" rx="22" fill="url(#sil)"/>
    <rect x="50" y="106" width="140" height="56" rx="16" fill="#ffc47a"/><path d="M40 170 L40 192 M200 170 L200 192" stroke-width="8"/>${brillo(70, 34, 30, 8)}`);

  const tele = s("0 0 220 210", `<defs>${def("tv", "#b5e36b", "#7fbf3f")}</defs><rect x="10" y="20" width="200" height="150" rx="22" fill="url(#tv)"/>
    <rect x="28" y="36" width="140" height="118" rx="16" fill="#3b4a5a"/><path d="M40 60 Q70 46 100 50" stroke="#fff" stroke-width="5" opacity=".5" fill="none"/>
    <circle cx="188" cy="66" r="8" fill="#ffd23f"/><circle cx="188" cy="96" r="8" fill="#ff9f43"/><path d="M60 170 L44 202 M160 170 L176 202" stroke-width="7"/>
    <path d="M80 20 L60 2 M140 20 L160 2" stroke-width="4"/>`);

  const ovillo = s("0 0 100 100", `<circle cx="50" cy="50" r="42" fill="#ff8fb3"/><path d="M14 40 Q50 20 86 44 M10 58 Q50 36 90 62 M22 78 Q50 52 80 82 M40 10 Q60 50 44 92" fill="none" stroke="#e05a8a" stroke-width="3.5"/>
    <path d="M88 64 Q102 80 92 96" fill="none" stroke="#e05a8a" stroke-width="4"/>${brillo(34, 30, 10, 6, -30)}`);

  const banera = s("0 0 320 170", `<defs>${def("ban", "#ffffff", "#dfe8f3")}</defs>
    <path d="M10 40 L310 40 L290 130 Q280 160 240 160 L80 160 Q40 160 30 130Z" fill="url(#ban)"/>
    <rect x="0" y="26" width="320" height="22" rx="11" fill="#f4f8fc"/><path d="M70 160 L58 170 M250 160 L262 170" stroke-width="7"/>
    <path d="M280 26 L280 6 Q280 0 268 0 L250 0" fill="none" stroke="#bfc6d6" stroke-width="7"/>`);
  // Parte de adelante: agua con espuma y borde, tapa el cuerpo de Michi cuando está adentro
  const baneraFrente = s("0 0 320 170", `<defs>${def("banf", "#ffffff", "#dfe8f3")}${def("agua", "#7fd3ff", "#3fa7ff")}</defs>
    <path d="M26 64 Q160 54 294 64 L290 80 L30 80Z" fill="url(#agua)" stroke="none" opacity=".85"/>
    ${[[50, 62, 16], [84, 58, 20], [130, 60, 14], [196, 58, 18], [240, 60, 22], [272, 62, 14]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#d0e6f5" stroke-width="2"/>`).join("")}
    <path d="M26 70 L294 70 L290 130 Q280 160 240 160 L80 160 Q40 160 30 130Z" fill="url(#banf)"/>${brillo(80, 100, 40, 10)}`);

  const lavamanos = s("0 0 200 300", `<defs>${def("esp", "#e6f6ff", "#bfe0f5")}${def("lav", "#ffffff", "#e3ebf4")}</defs>
    <rect x="34" y="6" width="132" height="120" rx="60" fill="#d8c3a5"/><rect x="46" y="18" width="108" height="96" rx="48" fill="url(#esp)"/>
    <path d="M70 40 L96 30 M74 56 L110 40" stroke="#fff" stroke-width="5"/>
    <rect x="84" y="190" width="32" height="104" rx="10" fill="url(#lav)"/>
    <path d="M86 160 L86 140 Q86 128 100 128 L112 128" fill="none" stroke="#bfc6d6" stroke-width="9"/><circle cx="70" cy="150" r="7" fill="#bfc6d6"/>`);
  const lavamanosFrente = s("0 0 200 300", `<defs>${def("lavf", "#ffffff", "#dfe8f3")}</defs>
    <path d="M14 160 L186 160 Q182 210 100 214 Q18 210 14 160Z" fill="url(#lavf)"/><rect x="8" y="150" width="184" height="16" rx="8" fill="#f4f8fc"/>${brillo(60, 180, 26, 6)}`);
  const vasoCepillos = s("0 0 80 110", `<path d="M14 44 L66 44 L60 104 L20 104Z" fill="#a6e3ff"/><path d="M30 46 L22 6" stroke="#2f8fd9" stroke-width="8"/><path d="M50 46 L58 8" stroke="#e0508f" stroke-width="8"/>
    <rect x="14" y="0" width="16" height="12" rx="4" fill="#fff" transform="rotate(-12 22 6)"/><rect x="50" y="2" width="16" height="12" rx="4" fill="#fff" transform="rotate(14 58 8)"/>${brillo(26, 66, 4, 14)}`);

  const inodoro = s("0 0 200 240", `<defs>${def("ino", "#ffffff", "#e3ebf4")}</defs>
    <rect x="44" y="6" width="112" height="84" rx="16" fill="url(#ino)"/><rect class="cadena" x="128" y="20" width="18" height="12" rx="6" fill="#bfc6d6"/>
    <path d="M22 112 L178 112 Q174 170 124 178 L124 230 L76 230 L76 178 Q26 170 22 112Z" fill="url(#ino)"/>
    <ellipse cx="100" cy="112" rx="80" ry="18" fill="#e8eef7"/><ellipse cx="100" cy="112" rx="58" ry="10" fill="#a9d8f0"/>${brillo(60, 140, 20, 6)}${brillo(70, 30, 14, 5)}`);
  const papel = s("0 0 90 200", `<path d="M10 10 L80 10" stroke-width="6"/><rect x="14" y="10" width="62" height="46" rx="23" fill="#fff"/><circle cx="45" cy="33" r="9" fill="#e8e2da"/>
    <path class="tira" d="M18 48 L18 70 L72 70 L72 48" fill="#fff"/>`);

  const camaGato = s("0 0 320 200", `<defs>${def("cama", "#b8a2e6", "#8f75d1")}</defs>
    <path d="M30 120 Q24 40 70 34 L58 4 L104 30 Q160 18 216 30 L262 4 L250 34 Q296 40 290 120 Q296 190 160 190 Q24 190 30 120Z" fill="url(#cama)"/>
    <path d="M110 70 Q120 80 130 70 M190 70 Q200 80 210 70" fill="none" stroke-width="4"/><path d="M150 84 Q160 92 170 84" fill="none"/>
    <ellipse cx="160" cy="138" rx="112" ry="40" fill="#ffe7c7"/><path d="M80 130 Q120 116 160 132 Q200 116 240 130" fill="none" stroke="#e8c79c" stroke-width="3"/>`);
  const lampara = s("0 0 200 200", `<path d="M60 20 L140 20 L160 80 L40 80Z" fill="#ffd23f"/><rect x="94" y="80" width="12" height="80" fill="#bfc6d6"/><ellipse cx="100" cy="166" rx="40" ry="12" fill="#bfc6d6"/>`);

  return { ventanaCiudad, cuadroPez, planta, plantaColgante, lamparaColgante, heladera, estante, ventanaNoche, toallero,
           alfombra, sillon, tele, ovillo, banera, baneraFrente, lavamanos, lavamanosFrente, vasoCepillos, inodoro, papel, camaGato, lampara };
})();
