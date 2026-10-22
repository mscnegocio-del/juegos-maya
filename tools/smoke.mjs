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
  "": async p => {
    // Progreso (SPEC-012): 5 aciertos suben de nivel, 3 fallos bajan, el máximo se respeta y queda guardado al recargar
    const r = await p.evaluate(() => {
      const P = Juegos.progreso, out = [];
      P.reiniciar("prueba"); P.configurar("prueba", { maxNivel: 2 });
      for (let i = 0; i < 5; i++) out.push(P.acierto("prueba").nivel);
      for (let i = 0; i < 6; i++) P.acierto("prueba");      // ya está en el máximo
      out.push(P.leer("prueba").nivel);
      P.fallo("prueba"); P.fallo("prueba"); out.push(P.fallo("prueba").bajo, P.leer("prueba").nivel);
      P.reiniciar("prueba80"); P.configurar("prueba80", { maxNivel: 5 }); // 80 %: 8 de 10 sin racha de 5
      [1, 1, 1, 1, 0, 1, 1, 1, 1].forEach(x => (x ? P.acierto : P.fallo)("prueba80"));
      out.push(P.leer("prueba80").nivel, P.acierto("prueba80").subio);
      return out.join(",");
    });
    await p.reload(); await p.waitForTimeout(500);
    const guardado = await p.evaluate(() => Juegos.progreso.leer("prueba").nivel + "," + Juegos.progreso.leer("prueba80").nivel);
    if (r !== "1,1,1,1,2,2,true,1,1,true" || guardado !== "1,2") errores.push(`progreso: ${r} / guardado ${guardado}`);
    const rincon = await p.locator("#rincon").boundingBox();             // rincón de papá: mantener 3 s
    await p.mouse.move(rincon.x + 40, rincon.y + 40); await p.mouse.down(); await p.waitForTimeout(3200); await p.mouse.up();
    if (await p.locator("#panel").isHidden()) errores.push("el rincón de papá no se abrió");
    await p.waitForTimeout(500);
    await p.screenshot({ path: "tools/capturas/rincon-papa.png" });
    await p.click('#panel [data-accion="todo"]'); await p.click('#panel [data-accion="todo"]');
    if ((await p.evaluate(() => Juegos.progreso.juegos().length)) !== 0) errores.push("reiniciar todo no borró el progreso");
    await p.click('#panel [data-accion="cerrar"]');
  },
  "juegos/rompecabezas/": async p => {
    // Rompecabezas (SPEC-018): empieza en el nivel 3 (10 piezas); armar uno entero con el dedo sube la racha y da sticker
    await p.evaluate(() => { localStorage.removeItem("maya.rompecabezas"); Juegos.progreso.reiniciar("rompecabezas"); });
    await p.reload(); await p.waitForTimeout(1000);
    const inicio = await p.evaluate(() => [nivel, piezas.length]);
    if (inicio.join() !== "3,10") errores.push(`rompecabezas: nivel/piezas al empezar ${inicio}`);
    const primero = await p.evaluate(() => cuadro.dino);
    if (!primero) errores.push("rompecabezas: el primero del día no es de dinosaurio");
    await p.evaluate(() => { Juegos.progreso.guardar("rompecabezas", { nivel: 1, racha: 4 }); });
    await p.reload(); await p.waitForTimeout(2200);                       // nivel 1 = 4 piezas
    for (let pasada = 0; pasada < 4; pasada++) for (let i = 0; i < 4; i++) {
      if (await p.evaluate(i => piezas[i]?.puesta ?? true, i)) continue;
      const r = await p.evaluate(i => { const q = piezas[i], o = origen(q), el = q.el.getBoundingClientRect(); return { fx: el.left + el.width / 2, fy: el.top + el.height / 2, tx: o.x + el.width / 2, ty: o.y + el.height / 2 }; }, i);
      await p.mouse.move(r.fx, r.fy); await p.mouse.down(); await p.mouse.move(r.tx + 8, r.ty + 6, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(120);
    }
    await p.waitForTimeout(6500);                                          // final + registro del progreso
    const fin = await p.evaluate(() => Juegos.progreso.leer("rompecabezas"));
    if (!fin.stickers.length || fin.nivel !== 2) errores.push(`rompecabezas: tras armar ${JSON.stringify(fin)}`);
    // la bolsa no repite hasta ver los 28
    const vistos = await p.evaluate(() => { localStorage.removeItem("maya.rompecabezas"); const s = []; for (let i = 0; i < 28; i++) s.push(siguiente().id); return new Set(s).size; });
    if (vistos !== 28) errores.push(`rompecabezas: la bolsa repitió (${vistos} distintos de 28)`);
    await p.evaluate(() => Juegos.progreso.reiniciar("rompecabezas"));
  },
  "juegos/globos/": async p => {
    // Globos (SPEC-013): en cada nivel se revienta un globo que sirve para la consigna y uno que no (debe quedar)
    for (let n = 1; n <= 6; n++) {
      await p.evaluate(n => Juegos.progreso.guardar("globos", { nivel: n, racha: 0, fallos: 0, ultimas: [] }), n);
      await p.reload(); await p.waitForTimeout(1500);
      await p.waitForFunction(() => [...document.querySelectorAll(".globo:not(.reventado)")].some(g => ronda.sirve(g.datos)), null, { timeout: 15000 });
      const r = await p.evaluate(() => {
        const gs = [...document.querySelectorAll(".globo:not(.reventado)")];
        const bueno = gs.find(g => ronda.sirve(g.datos)), malo = gs.find(g => !ronda.sirve(g.datos));
        const antes = ronda.hechos + "/" + ronda.meta;
        bueno?.dispatchEvent(new PointerEvent("pointerdown"));
        if (nivel > 1 && nivel < 6) malo?.dispatchEvent(new PointerEvent("pointerdown"));
        return { nivel, bueno: !!bueno, malo: !malo || nivel === 1 || nivel === 6 || document.contains(malo), antes, ahora: ronda.hechos + "/" + ronda.meta, texto: ronda.texto || "" };
      });
      if (r.nivel !== n || !r.bueno || !r.malo) errores.push(`globos nivel ${n}: ${JSON.stringify(r)}`);
      if (n === 5) await p.screenshot({ path: "tools/capturas/globos-nivel5.png" });
    }
    await p.evaluate(() => Juegos.progreso.reiniciar("globos"));
  },
  "juegos/album/": async p => {
    // Álbum (SPEC-015): completar un nivel da el siguiente sticker de la página del juego y se ve pegado en el álbum
    const r = await p.evaluate(() => {
      Juegos.progreso.reiniciar("globos"); Juegos.progreso.configurar("globos", { maxNivel: 6 });
      let s; for (let i = 0; i < 5; i++) s = Juegos.progreso.acierto("globos").sticker;
      return s?.id + "," + Juegos.progreso.leer("globos").stickers.join("|");
    });
    await p.waitForTimeout(2600);                                       // premio volando a la casita
    await p.reload(); await p.waitForTimeout(1200);
    const pegados = await p.locator(".hueco.tiene").count();
    if (r !== "pato,pato" || pegados !== 1) errores.push(`álbum: ${r} / pegados ${pegados}`);
    await p.locator(".hueco.tiene").click(); await p.waitForTimeout(400);   // suena y dice su nombre
    await p.locator(".hueco:not(.tiene)").first().click();               // silueta: invita a jugar
    await p.locator(".pestana").nth(1).click(); await p.waitForTimeout(700);
    await p.locator(".pestana").nth(0).click(); await p.waitForTimeout(700);
  },
  "juegos/animales/": p => p.click(".animal"),
  "juegos/colores/": async p => {
    // Colores (SPEC-014): en cada nivel se resuelve una ronda completa
    for (let n = 1; n <= 8; n++) {
      await p.evaluate(n => Juegos.progreso.guardar("colores", { nivel: n, racha: 0, fallos: 0, ultimas: [] }), n);
      await p.reload(); await p.waitForTimeout(900);
      if (n === 7) {
        const cajas = await p.locator(".caja").all();
        for (const b of await p.locator(".opcion").all()) {
          const c = await b.getAttribute("data-color"), o = await b.boundingBox();
          for (const k of cajas) if (await k.getAttribute("data-color") === c) {
            const d = await k.boundingBox();
            await p.mouse.move(o.x + o.width / 2, o.y + o.height / 2); await p.mouse.down();
            await p.mouse.move(d.x + d.width / 2, d.y + d.height / 2, { steps: 6 }); await p.mouse.up();
          }
        }
      } else {
        if (n === 8) { for (const b of await p.locator(".bote").all()) await b.click(); await p.waitForTimeout(4200); }
        await p.evaluate(() => [...document.querySelectorAll(".opcion")].find(b => b.datos === ronda.objetivo).click());
      }
      await p.waitForTimeout(700);
      const r = await p.evaluate(() => ({ nivel, ok: !!document.querySelector(".opcion.si") || document.querySelectorAll(".opcion.guardado").length > 0, d: Juegos.progreso.leer("colores") }));
      if (r.nivel !== n || !r.ok || r.d.aciertos !== 1) errores.push(`colores nivel ${n}: ${JSON.stringify(r)}`);
      if (n === 5 || n === 8) await p.screenshot({ path: `tools/capturas/colores-nivel${n}.png` });
      await p.evaluate(() => Juegos.progreso.reiniciar("colores"));
    }
  },
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
  "juegos/gato/": async p => {
    await p.waitForTimeout(2600);                                     // saludo inicial
    await p.click("#nav-cocina"); await p.locator(".bandeja .item").first().click(); await p.waitForTimeout(2600); // come pescado
    await p.click("#nav-bano"); await p.click('[data-escena="banera"]'); await p.waitForTimeout(1600);         // escena bañera
    await p.locator('.bandeja [data-h="esponja"]').click(); await p.click("#volver"); await p.waitForTimeout(900);
    await p.click("#nav-dormitorio"); await p.click("#lampara"); await p.waitForTimeout(1500);
  },
  "juegos/pintar/": async p => {
    // Colorear 2.0 (SPEC-017). Parte 1: galería al azar, sorpresa del día, hoja nueva + deshacer, copias, elegir
    const orden = () => p.evaluate(() => [...document.querySelectorAll(".tarjeta")].map(b => b.getAttribute("aria-label")).join("|"));
    const o1 = await orden(); let distinto = false;
    for (let i = 0; i < 4 && !distinto; i++) { await p.reload(); await p.waitForTimeout(600); distinto = (await orden()) !== o1; }
    if (!distinto) errores.push("pintar: la galería no cambia de orden al entrar");
    await p.locator('.tarjeta[aria-label="sorpresa del día"]').click(); await p.waitForTimeout(1300); // se desenvuelve y abre
    if (await p.locator("#editor").isHidden()) errores.push("pintar: la sorpresa del día no abrió");
    const z = await p.locator("#zonas").boundingBox();
    await p.mouse.click(z.x + z.width / 2, z.y + z.height / 2);      // balde
    await p.click('[data-herr="pincel"]');
    await p.mouse.move(z.x + 40, z.y + 40); await p.mouse.down(); await p.mouse.move(z.x + 120, z.y + 90); await p.mouse.up();
    await p.click('[data-herr="escoba"]'); await p.waitForTimeout(900);  // hoja nueva
    const limpio = await p.evaluate(() => !Object.keys(rellenos).length);
    await p.click('[data-herr="deshacer"]');                           // vuelve lo pintado
    const vuelve = await p.evaluate(() => Object.keys(rellenos).length > 0);
    if (!limpio || !vuelve) errores.push(`pintar: hoja nueva ${limpio} / deshacer ${vuelve}`);
    // Parte 2: arcoíris, brillitos, sellos y pincel mágico (no debe pintar fuera de la zona donde empezó)
    const rayar = async (x0, y0, x1, y1) => { await p.mouse.move(x0, y0); await p.mouse.down(); await p.mouse.move(x1, y1, { steps: 8 }); await p.mouse.up(); };
    for (const h of ["arcoiris", "brillitos"]) { await p.click(`[data-herr="${h}"]`); await rayar(z.x + 30, z.y + z.height - 40, z.x + z.width - 30, z.y + z.height - 60); }
    await p.click('[data-herr="sellos"]'); await p.locator('[data-sello="pato"]').click();
    await p.mouse.click(z.x + z.width * .8, z.y + z.height * .2); await p.waitForTimeout(200);
    await p.click('[data-herr="escoba"]'); await p.waitForTimeout(900);
    await p.evaluate(() => { guardar(); cargar(TODOS.find(d => d.id === "gato"), "gato"); }); // cara redonda al centro
    await p.click('[data-herr="magico"]');
    await rayar(z.x + z.width / 2, z.y + z.height / 2, z.x + 4, z.y + 4);   // desde el centro hacia la esquina vacía
    const esquina = await p.evaluate(() => ctx.getImageData(10, 10, 30, 30).data.some((v, i) => i % 4 === 3 && v));
    const centro = await p.evaluate(() => ctx.getImageData(380, 380, 40, 40).data.some((v, i) => i % 4 === 3 && v));
    if (esquina || !centro) errores.push(`pintar: pincel mágico esquina ${esquina} centro ${centro}`);
    await p.click('[data-herr="goma"]'); await p.mouse.click(z.x + z.width / 2, z.y + z.height / 2);
    await p.click('[data-herr="listo"]'); await p.waitForTimeout(500);
    await p.click("#casa"); await p.waitForTimeout(500);
    if (!(await p.locator('.tarjeta[aria-label="mis dibujos"]').count())) errores.push("pintar: no aparece mis dibujos");
    await p.locator('.tarjeta[aria-label="el gatito Michi"]').click(); await p.waitForTimeout(400);
    if (!(await p.locator(".eleccion").count())) errores.push("pintar: no pregunta seguir o en blanco");
    await p.click('.eleccion [data-o="blanco"]'); await p.waitForTimeout(300);
    await p.click("#casa"); await p.waitForTimeout(300);
    await p.locator('.tarjeta[aria-label="mis dibujos"]').click(); await p.waitForTimeout(300);
    if ((await p.locator(".tarjeta").count()) < 2) errores.push("pintar: faltan copias en mis dibujos");
    await p.locator(".tarjeta").first().click(); await p.waitForTimeout(300);
    // Parte 4: niveles. 5 láminas terminadas suben de nivel y dan un sticker de la página Pintar
    await p.evaluate(() => { Juegos.progreso.reiniciar("pintar"); localStorage.removeItem("maya.colorear.sol"); });
    await p.reload(); await p.waitForTimeout(600);
    const primeras = await p.evaluate(() => [...document.querySelectorAll(".tarjeta")].slice(3, 7).map(b => TODOS.find(d => d.nombre === b.getAttribute("aria-label"))?.nivel));
    if (primeras.some(n => n !== 1)) errores.push(`pintar: en nivel 1 no se proponen primero las fáciles (${primeras})`);
    const sube = await p.evaluate(() => {
      let r;
      for (let i = 0; i < 5; i++) { cargar(DIBUJOS[i], DIBUJOS[i].id); rellenos[0] = "#ff5a5f"; r = Juegos.progreso.acierto("pintar"); }
      return r.nivel + "," + (r.sticker?.id || "");
    });
    if (sube !== "2,helado") errores.push(`pintar: subir de nivel/sticker ${sube}`);
    await p.waitForTimeout(2500);
    await p.evaluate(() => Juegos.progreso.guardar("pintar", { nivel: 4 }));
    await p.reload(); await p.waitForTimeout(600);
    await p.evaluate(() => abrir(DIBUJOS.find(d => d.id === "sol"))); await p.waitForTimeout(300);
    const conModelo = await p.locator(".lienzo .modelo").count(), trazando = await p.evaluate(() => lienzo.classList.contains("trazando"));
    const puntos = await p.evaluate(() => puntosTrazo.map(q => [q.x, q.y]));
    const L = await p.locator("#lienzo").boundingBox(), k = L.width / 800;
    await p.mouse.move(L.x + puntos[0][0] * k, L.y + puntos[0][1] * k); await p.mouse.down();
    for (const [x, y] of puntos) await p.mouse.move(L.x + x * k, L.y + y * k);
    await p.mouse.up(); await p.waitForTimeout(300);
    const trazado = await p.evaluate(() => !lienzo.classList.contains("trazando") && herramienta === "balde");
    if (!conModelo || !trazando || !trazado) errores.push(`pintar: modelo ${conModelo} trazando ${trazando} trazado ${trazado}`);
    await p.screenshot({ path: "tools/capturas/pintar-nivel4.png" });
    await p.evaluate(() => Juegos.progreso.reiniciar("pintar"));
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
