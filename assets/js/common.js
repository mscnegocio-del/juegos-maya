// Utilidades compartidas por todos los juegos: voz, sonidos y confeti.

const Juegos = (() => {
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

  function pop() {
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

  function confeti(n = 40) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < n; i++) {
      const c = document.createElement("div");
      c.className = "confeti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = COLORES[i % COLORES.length];
      c.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
      c.style.animationDelay = Math.random() * 0.3 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }
  }

  const azar = arr => arr[Math.floor(Math.random() * arr.length)];
  const mezclar = arr => [...arr].sort(() => Math.random() - 0.5);

  function animar(el, clase) {
    el.classList.remove(clase);
    void el.offsetWidth;
    el.classList.add(clase);
  }

  return { decir, tono, pop, fiesta, confeti, azar, mezclar, animar, COLORES };
})();
