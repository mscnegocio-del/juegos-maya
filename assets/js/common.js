// Utilidades compartidas por todos los juegos: voz, sonidos y confeti.

const Juegos = (() => {
  // Service worker para instalar la app y jugar sin internet. sw.js está en la raíz del sitio,
  // dos carpetas arriba de este script, así que su alcance cubre el menú y todos los juegos
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    const sw = new URL("../../sw.js", document.currentScript.src);
    addEventListener("load", () => navigator.serviceWorker.register(sw).catch(() => {}));
  }

  let ctx;
  const audio = () => (ctx ??= new (window.AudioContext || window.webkitAudioContext)());

  // Voz en español (la niña aún no lee, así que todo se dice en voz alta)
  let vozEs;
  const cargarVoz = () => {
    const voces = speechSynthesis.getVoices();
    vozEs = voces.find(v => v.lang === "es-PE") ||
            voces.find(v => v.lang.startsWith("es-") && /female|mujer|paulina|monica|helena/i.test(v.name)) ||
            voces.find(v => v.lang.startsWith("es"));
  };
  if ("speechSynthesis" in window) {
    cargarVoz();
    speechSynthesis.onvoiceschanged = cargarVoz;
  }

  function decir(texto, { rate = 0.9, pitch = 1.2 } = {}) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    if (vozEs) u.voice = vozEs;
    u.rate = rate;
    u.pitch = pitch;
    speechSynthesis.speak(u);
  }

  function tono(freq = 440, dur = 0.15, tipo = "sine", vol = 0.25) {
    const a = audio();
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(freq, a.currentTime);
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + dur);
    o.connect(g).connect(a.destination);
    o.start();
    o.stop(a.currentTime + dur);
  }

  // Nota tipo xilófono: ataque corto y caída suave. Cada llamada es independiente (polifónico)
  function nota(freq, dur = 0.9) {
    const a = audio();
    if (a.state === "suspended") a.resume();
    const t = a.currentTime;
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(a.destination);
    [[1, "triangle"], [4, "sine"]].forEach(([mult, tipo], i) => {
      const o = a.createOscillator();
      o.type = tipo;
      o.frequency.value = freq * mult;
      const v = a.createGain();
      v.gain.value = i ? 0.15 : 1; // armónico agudo suave: le da brillo de xilófono
      o.connect(v).connect(g);
      o.start(t);
      o.stop(t + dur);
    });
  }

  // Sonido de "pop"; si se le pasa un elemento, además estalla en chispitas de colores desde su centro
  function pop(el) {
    if (el) estallido(el);
    const a = audio();
    const o = a.createOscillator();
    const g = a.createGain();
    o.frequency.setValueAtTime(700, a.currentTime);
    o.frequency.exponentialRampToValueAtTime(120, a.currentTime + 0.12);
    g.gain.setValueAtTime(0.35, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.15);
    o.connect(g).connect(a.destination);
    o.start();
    o.stop(a.currentTime + 0.15);
  }

  function fiesta() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tono(f, 0.2, "triangle"), i * 110));
    confeti();
  }

  const COLORES = ["#ff5a5f", "#3fa7ff", "#ffd23f", "#4cd17a", "#a66bff", "#ff9f43", "#ff7eb6"];

  // GSAP (assets/vendor/) da resortes y física más ricos; si no cargó, todo sigue con las animaciones CSS de base.css
  const G = () => window.gsap;
  const calma = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  function confeti(n = 40) {
    if (calma()) return;
    const g = G();
    for (let i = 0; i < n; i++) {
      const c = document.createElement("div");
      c.className = "confeti";
      c.style.background = COLORES[i % COLORES.length];
      if (i % 3 === 1) c.style.borderRadius = "50%";
      document.body.appendChild(c);
      if (!g) {
        c.style.left = Math.random() * 100 + "vw";
        c.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
        c.style.animationDelay = Math.random() * 0.3 + "s";
        setTimeout(() => c.remove(), 3500);
        continue;
      }
      // Sale disparado desde abajo, sube y cae aleteando (giro en 3D) mientras se mece de lado a lado
      c.style.animation = "none";
      const r = g.utils.random, alto = innerHeight;
      g.set(c, { left: innerWidth / 2, top: alto * 0.85, scale: r(0.6, 1.3) });
      g.timeline({ onComplete: () => c.remove() })
        .to(c, { x: r(-innerWidth * 0.55, innerWidth * 0.55), y: -alto * r(0.45, 0.95), duration: r(0.6, 0.9), ease: "power2.out" })
        .to(c, { y: alto * 0.4, duration: r(1.6, 2.6), ease: "power1.in" })
        .to(c, { opacity: 0, duration: 0.4 }, "-=0.4");
      g.to(c, { rotation: r(-720, 720), rotationX: r(360, 1080), duration: 3, ease: "none" });
      g.to(c, { xPercent: r(-300, 300), duration: r(0.4, 0.8), ease: "sine.inOut", repeat: 5, yoyo: true, delay: 0.7 });
    }
  }

  function estallido(el) {
    const g = G();
    if (!g || calma()) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 12; i++) {
      const c = document.createElement("div");
      c.className = "chispa";
      c.style.background = COLORES[i % COLORES.length];
      document.body.appendChild(c);
      const ang = (i / 12) * Math.PI * 2, dist = g.utils.random(50, 110);
      g.set(c, { left: cx, top: cy, xPercent: -50, yPercent: -50 });
      g.to(c, { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist, scale: 0, duration: g.utils.random(0.45, 0.7),
                ease: "power3.out", onComplete: () => c.remove() });
    }
  }

  // Aplasta y estira un elemento (squash & stretch), como un juguete de goma
  function rebotar(el) {
    if (!el) return;
    const g = G();
    if (!g || calma()) return animar(el, "pop");
    g.timeline({ defaults: { transformOrigin: "50% 100%" } })
      .to(el, { scaleX: 1.18, scaleY: 0.82, duration: 0.09, ease: "power2.out" })
      .to(el, { scaleX: 0.9, scaleY: 1.12, duration: 0.12, ease: "power2.out" })
      .to(el, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1.1, 0.35)" });
  }

  // Premio: el dibujo aparece grande en el centro con resorte y vuela a una esquina (o al elemento destino)
  function premio(html, destino) {
    const p = document.createElement("div");
    p.className = "premio";
    p.innerHTML = html;
    document.body.appendChild(p);
    fiesta();
    const g = G();
    if (!g || calma()) { setTimeout(() => p.remove(), 1400); return; }
    p.style.animation = "none";
    const d = destino?.getBoundingClientRect?.() || { left: innerWidth - 60, top: 20, width: 40, height: 40 };
    const r = p.getBoundingClientRect();
    g.timeline({ onComplete: () => p.remove() })
      .from(p, { scale: 0, rotation: -25, duration: 0.7, ease: "back.out(2.2)" })
      .to(p, { rotation: 8, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" })
      .to(p, { x: d.left + d.width / 2 - (r.left + r.width / 2), y: d.top + d.height / 2 - (r.top + r.height / 2),
               scale: 0.2, duration: 0.7, ease: "power2.in" })
      .add(() => destino && rebotar(destino));
  }

  // Transiciones entre el menú y los juegos: entra con un fundido y la casita sale con un rebote
  function irA(url) {
    const g = G();
    if (!g) return (location.href = url);
    g.to("body", { opacity: 0, scale: calma() ? 1 : 0.96, duration: 0.25, ease: "power1.in", onComplete: () => (location.href = url) });
  }
  addEventListener("pageshow", () => { // al volver con "atrás" la página viene de la caché: reponerla
    const g = G();
    if (!g) return;
    g.fromTo("body", { opacity: 0 }, { opacity: 1, duration: calma() ? 0.2 : 0.35, clearProps: "opacity,transform" });
    const casa = document.querySelector(".btn-casa");
    if (casa && !calma()) g.from(casa, { scale: 0, rotation: -90, duration: 0.6, delay: 0.15, ease: "back.out(2)", clearProps: "transform" });
  });
  document.addEventListener("click", e => {
    const casa = e.target.closest?.(".btn-casa");
    if (!casa || !G() || e.defaultPrevented) return; // un juego que la usa para otra cosa (Pintar: volver a la galería) ya la atendió
    e.preventDefault();
    rebotar(casa);
    irA(casa.href);
  });

  // Progreso por juego en una sola clave (maya.progreso). Sube de nivel con 5 aciertos seguidos o 80 % en las
  // últimas 10 rondas; tras 3 fallos seguidos baja uno en silencio. Si el almacenamiento falla, queda en memoria
  const progreso = (() => {
    const CLAVE = "maya.progreso";
    let todo;
    const cargarTodo = () => {
      if (todo) return todo;
      try { todo = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { todo = {}; }
      return todo;
    };
    const escribirTodo = () => { try { localStorage.setItem(CLAVE, JSON.stringify(todo)); } catch {} };
    const nuevo = () => ({ nivel: 1, max: 99, aciertos: 0, racha: 0, fallos: 0, ultimas: [], stickers: [] });

    function leer(juego) { return { ...nuevo(), ...cargarTodo()[juego] }; }
    function guardar(juego, datos) { cargarTodo()[juego] = { ...leer(juego), ...datos }; escribirTodo(); }
    // Cada juego declara al iniciar cuántos niveles tiene; devuelve el nivel guardado
    function configurar(juego, { maxNivel }) {
      const d = leer(juego);
      guardar(juego, { max: maxNivel, nivel: Math.min(d.nivel, maxNivel) });
      return leer(juego).nivel;
    }
    const cambiarNivel = (d, delta) => {
      d.nivel = Math.max(1, Math.min(d.max, d.nivel + delta));
      d.racha = 0; d.fallos = 0; d.ultimas = []; // cada nivel empieza de nuevo la cuenta
    };

    function acierto(juego) {
      const d = leer(juego), antes = d.nivel;
      d.aciertos++; d.racha++; d.fallos = 0;
      d.ultimas = [...d.ultimas, 1].slice(-10);
      const bien = d.ultimas.reduce((s, x) => s + x, 0);
      const completo = d.racha >= 5 || (d.ultimas.length === 10 && bien >= 8);
      if (completo) cambiarNivel(d, 1); // en el último nivel no sube, pero completarlo también se premia
      guardar(juego, d);
      const subio = d.nivel > antes;
      // Completar un nivel da un sticker del álbum (si el juego cargó stickers.js y aún quedan)
      const sticker = completo && typeof Stickers !== "undefined" ? Stickers.ganar(juego) : null;
      if (sticker) decir((subio ? "¡Subiste de nivel! " : "") + `¡Ganaste un sticker: ${sticker.nombre}!`);
      else if (subio) { fiesta(); decir("¡Subiste de nivel!"); }
      return { nivel: d.nivel, subio, bajo: false, sticker };
    }
    function fallo(juego) {
      const d = leer(juego), antes = d.nivel;
      d.racha = 0; d.fallos++;
      d.ultimas = [...d.ultimas, 0].slice(-10);
      if (d.fallos >= 3) cambiarNivel(d, -1); // sin aviso: para ella nunca hay "perder"
      guardar(juego, d);
      return { nivel: d.nivel, subio: false, bajo: d.nivel < antes };
    }
    function reiniciar(juego) {
      cargarTodo();
      if (juego) delete todo[juego]; else todo = {};
      escribirTodo();
    }
    const juegos = () => Object.keys(cargarTodo());
    return { leer, guardar, configurar, acierto, fallo, reiniciar, juegos };
  })();

  const azar = arr => arr[Math.floor(Math.random() * arr.length)];
  const mezclar = arr => [...arr].sort(() => Math.random() - 0.5);

  function animar(el, clase) {
    el.classList.remove(clase);
    void el.offsetWidth;
    el.classList.add(clase);
  }

  // Sonidos MP3 decodificados a AudioBuffer: menor latencia que <audio>, sobre todo en iOS
  const buffers = new Map();
  let fuenteActual, turno = 0;

  function cargar(url) {
    if (!buffers.has(url)) {
      buffers.set(url, fetch(url)
        .then(r => { if (!r.ok) throw new Error(url); return r.arrayBuffer(); })
        .then(datos => audio().decodeAudioData(datos))
        .catch(e => { buffers.delete(url); throw e; }));
    }
    return buffers.get(url);
  }

  function callar() {
    turno++;
    if (fuenteActual) { fuenteActual.onended = null; try { fuenteActual.stop(); } catch {} fuenteActual = null; }
  }

  // Reproduce un MP3 cortando el anterior; la promesa se resuelve al terminar (o rechaza si falla)
  // Si se corta por otro sonido, la promesa queda pendiente (no dispara lo que venía después)
  async function sonar(url) {
    callar();
    const mio = turno;
    const a = audio();
    if (a.state === "suspended") a.resume();
    const buffer = await cargar(url);
    if (mio !== turno) return new Promise(() => {});
    return new Promise(resolve => {
      const f = a.createBufferSource();
      f.buffer = buffer;
      f.connect(a.destination);
      f.onended = () => { if (fuenteActual === f) fuenteActual = null; resolve(); };
      fuenteActual = f;
      f.start();
    });
  }

  return { decir, tono, nota, pop, fiesta, confeti, rebotar, premio, irA, progreso, azar, mezclar, animar, cargar, sonar, callar, COLORES };
})();
