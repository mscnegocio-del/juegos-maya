// Smoke test: abre el menú y cada juego en Chromium (celular 390x800), hace un toque
// y falla si hay errores de JavaScript. Deja capturas en tools/capturas/.
//
// Uso (con el sitio servido en :8765):
//   python3 -m http.server 8765 &
//   npm i --no-save playwright@1 && node tools/smoke.mjs
// En la nube de Claude Code: CHROMIUM=/opt/pw-browsers/chromium node tools/smoke.mjs

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:8765/";
const PAGINAS = {
  "": null,
  "juegos/globos/": null,
  "juegos/animales/": p => p.click(".animal"),
  "juegos/colores/": p => p.click(".opcion"),
  "juegos/contar/": async p => {
    const objetos = p.locator(".objeto");
    for (let i = 0; i < await objetos.count(); i++) await objetos.nth(i).click();
    await objetos.first().click(); // tocar uno ya contado no debe romper nada
  },
  "juegos/piano/": async p => {
    const teclas = p.locator(".tecla");
    for (let i = 0; i < 7; i++) await teclas.nth(i).dispatchEvent("pointerdown");
    await p.click("#cancion"); await p.waitForTimeout(1200); // la canción ilumina teclas
  },
  "juegos/pintar/": async p => {
    await p.mouse.move(100, 200); await p.mouse.down(); await p.mouse.move(250, 350); await p.mouse.up();
  },
};

mkdirSync("tools/capturas", { recursive: true });
const navegador = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const pagina = await navegador.newPage({ viewport: { width: 390, height: 800 }, hasTouch: true });
const errores = [];
pagina.on("pageerror", e => errores.push(`${pagina.url()}: ${e.message}`));

for (const [ruta, accion] of Object.entries(PAGINAS)) {
  await pagina.goto(BASE + ruta);
  await pagina.waitForTimeout(1200);
  if (accion) await accion(pagina);
  await pagina.screenshot({ path: `tools/capturas/${ruta.replace(/\W/g, "_") || "menu"}.png` });
}
await navegador.close();

console.log(errores.length ? errores.join("\n") : "OK: sin errores de JavaScript");
process.exit(errores.length ? 1 : 0);
