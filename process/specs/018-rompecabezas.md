# SPEC-018 — Rompecabezas (juego nuevo)
Estado: implementada
> Aprobada por el usuario el 2026-10-22. **Rediseño visual (mismo día):** los personajes dejan de ser figuras por código y pasan
> a ilustraciones tipo juguete 3D (ver sección "Rediseño visual"). El juego ya está implementado con dibujos provisionales.
> Prototipo visual: `prototipos/rompecabezas.html` (autocontenido, ábrelo en el navegador; no lo carga el sitio).
> Depende de SPEC-012 (progreso) y SPEC-015 (álbum). Origen: pedido del usuario (2026-10-22): Maya ya arma
> rompecabezas físicos de 10 piezas.

## Qué
Un juego de armar rompecabezas con piezas de verdad (con lengüetas), que arranca en **10 piezas** (lo que Maya ya
domina) y crece con ella. Cada vez que se arma uno, el dibujo cobra vida.

## Tendencias revisadas (octubre 2026)
No encontré un informe de tendencias del género; esto sale de las fichas de apps para 2–5 años (OkiPlay, 123 Kids Fun,
Bebi, etc.), así que son rasgos habituales, no estadísticas:
- Piezas **4 a 36**, con **varios niveles de dificultad**, empezando por piezas grandes
- **Arrastrar y soltar** con "imán" (la pieza encaja sola al acercarla)
- **Animación y festejo** al terminar
- **Sin anuncios y sin internet** (nuestro caso); los packs de pago detrás de candado de papá (nosotros: todo gratis)
- Personalizar con **fotos del niño** (lo descartamos: nunca subimos fotos reales de Maya ni de la familia)

## Propuesta
- **Piezas con forma real** y lengüetas; el tablero muestra un **fantasma** del dibujo (ayuda que se puede quitar)
- **Imán generoso**: encaja si se suelta a menos de ~70 px; si no, la pieza se queda donde la dejó (nunca se "pierde")
- **Pista suave**: tras ~9 s sin tocar, una pieza que falta parpadea y su hueco brilla, con la voz "¿Dónde va esta pieza?"
- **Puntitos** que se llenan con cada pieza puesta (en vez de números)
- Al terminar: las líneas se funden, el dibujo entero salta/nada/late según el animal, confeti y voz
  ("¡Muy bien! Armaste el pato"); pasa solo al siguiente

## Criterios de aceptación
- [x] Juego `juegos/rompecabezas/index.html` con `.btn-casa`, tarjeta en el menú e ícono propio en `dibujos.js`
- [x] Piezas con lengüetas generadas por código (sin imágenes externas), arrastrables con el dedo, multitáctil
- [x] Tablero con fantasma del dibujo y huecos punteados; imán, sonido y destello al encajar
- [x] **Niveles** con `Juegos.progreso` ("rompecabezas"): 1) 4 piezas (2×2), 2) 6 (3×2), 3) **10 (5×2, el de hoy)**,
  4) 12 (4×3), 5) 16 (4×4); sube con 5 rondas bien y baja en silencio; empieza en el 3 si no hay progreso
- [x] Ayudas por nivel: nivel 1–2 con fantasma y pista; desde el 4 el fantasma es más tenue; se puede quitar
- [x] **28 cuadros** en escenas (cielo, pasto, nubes, mar): los 12 animales del juego Animales, **8 dinosaurios** (tiranosaurio,
  tricerátops, braquiosaurio, estegosaurio, más velociraptor, anquilosaurio, pterodáctilo y espinosaurio; con volcán al fondo),
  y 8 más (Michi y su casa, vehículos, comida, mar). El prototipo trae 4 dinosaurios y 6 animales
- [x] **Dinosaurios destacados**: a Maya le encantan; la sorpresa del día y cada 3.er rompecabezas son de dinosaurio, y
  el nivel 1–5 tiene siempre al menos un dinosaurio entre los primeros 4
- [x] **Siempre al azar, sin repetir hasta ver todos**: se baraja una "bolsa" al entrar; cada rompecabezas sale una vez y
  recién cuando se terminaron los 28 se vuelve a barajar (nunca el mismo dos veces seguidas). Se recuerda cuáles ya armó
  para que mañana no empiece siempre por los mismos
- [x] **Despertar del dinosaurio** (final de los 8 dinosaurios): 4 pasos que hacen temblar la pantalla y dejan huellas en el
  pasto, el volcán erupciona (lava con gravedad, humo, destello naranja), letras "¡RAAAR!" que explotan sobre la cabeza,
  rugido suave y el dibujo se infla y sacude; dura ~5 s y no asusta (volumen bajo, nada oscuro)
- [x] Cada pieza que encaja suelta chispitas y un pequeño "pum" en la pantalla
- [x] Al terminar el dibujo cobra vida (saltar / nadar / latir) y suena el animal si tiene sonido real
- [x] Página nueva "Rompecabezas" en el álbum con 12 stickers (uno por nivel completado, 4 de ellos dinosaurios)
- [x] Todo se dice en voz alta; piezas ≥ 72 px en celular; sin tiempo ni castigos; respeta `prefers-reduced-motion`
- [x] Funciona sin internet; smoke test: armar un rompecabezas entero arrastrando y ver el sticker

## Fuera de alcance
- Fotos reales o subir fotos propias; rotar piezas; cronómetro o puntajes
- Packs de pago

## Notas técnicas
- Cada pieza es un SVG con `clipPath` sobre la misma escena (`<use>`); la forma de los bordes se calcula por posición
- Mover el nodo de una pieza en el DOM suelta el dedo (pasó en el prototipo): usar `z-index`, no `appendChild`
- Al unir las piezas quedan hilitos blancos entre ellas; se resuelve dibujando la escena entera debajo al terminar
- Para niveles con más piezas, la escena crece (más ancha/alta) y se mantiene el tamaño de pieza ≥ 72 px
- Dinosaurios: dibujo propio en `dibujos.js` (`DINOSAURIOS`), mismo estilo; se reutilizan en una lámina de Colorear
  y como stickers; sonido: rugidos sintéticos suaves (no hay rugidos CC0 verificados; nunca asustan)
- Motion graphics hechos con GSAP en vivo (ya aprobado y sin internet). Se evaluó **Remotion** (genera videos MP4 desde
  React): serviría para clips cortos pre-renderizados, pero cada clip suma peso, necesita un paso de render fuera del
  sitio (`tools/`) y no reacciona a lo que hace Maya. Queda como opción para un clip de premio extra si se aprueba

## Rediseño visual (2026-10-22): ilustraciones reales en vez de figuras por código
Pedido del usuario: aspecto de juego educativo comercial para preescolares; dinosaurios bebé como juguetes 3D, volúmenes
redondeados, luz suave de estudio, pastel con acentos vivos, sin contornos negros ni formas geométricas básicas.
- **Imágenes** en `assets/img/rompecabezas/<tema>/<id>.webp` (o .png), **3:2 horizontal 1536×1024**, ≤ 250 KB, personaje centrado
  (zona segura ~55 % del alto) porque el tablero recorta bordes según el nivel sin deformar (`preserveAspectRatio="slice"`)
- Se generan con IA (ChatGPT, como las de Michi) con el prompt de `assets/img/rompecabezas/LEEME.md`; la misma dirección de arte (estilo, luz,
  proporciones) para toda la serie, pero **un fondo distinto por cuadro** (selva, pradera, lago, atardecer, bosque, desierto, cielo, playa) No se usan imágenes de Internet ni emojis
- **Catálogo** `assets/js/rompecabezas-catalogo.js`; el juego solo ofrece un cuadro si su imagen carga de verdad. Mientras haya
  menos de 8 ilustraciones, completa con los dibujos por código (marcados `provisional`) para no dejar el juego vacío;
  con 8 o más, los provisionales se retiran solos
- Con ilustración, el despertar del dinosaurio usa lluvia de estrellas en vez del volcán dibujado
- Estado de recursos: ✅ Michi (`assets/img/michi/feliz.webp`); ❌ faltan los 8 dinosaurios; los 12 animales y 7 cuadros
  de colorear siguen provisionales hasta tener ilustraciones
- Pendiente cuando lleguen las imágenes: usar las mismas como stickers del álbum y en una lámina de Colorear
- Criterios de aceptación del rediseño: [x] 8 ilustraciones de dinosaurios en la carpeta, [x] revisadas en celular y tablet sin
  recortes del personaje en los 5 niveles, [x] sin errores en consola, [x] peso total de imágenes anotado

## Implementación (2026-10-22)
- `juegos/rompecabezas/`: 5 niveles (4, 6, 10, 12 y 16 piezas), piezas con lengüetas de tamaño fijo y **rectangulares** (el tablero va en 4:3
  o 3:2 para que la ilustración 3:2 nunca se corte; las de 10 piezas son altas), fantasma, imán, pista suave, bolsa aleatoria sin repetir,
  despertar del dinosaurio, stickers y tarjeta en el menú
- Las 8 ilustraciones de dinosaurios (1,2 MB en total, 108–176 KB cada una) y Michi son los cuadros; con ≥ 8 reales se retiran los
  dibujos por código (hoy son 9 cuadros). Falta ilustrar los 12 animales y otros temas para llegar a 28
- Stickers de dinosaurio en el álbum con la ilustración recortada en círculo
- `trex` y `trice` comparten fondo; se pueden regenerar con otro paisaje
- Cada dinosaurio tiene su voz: palabra que se dice y se ve + sonido sintetizado propio (tiranosaurio ¡RAAAR!, tricerátops ¡BRRRU!, braquiosaurio ¡MUUUUU!, estegosaurio ¡GRUUU!, velociraptor ¡IIIK-IK!, anquilosaurio ¡HUMMM!, pterodáctilo ¡IIIIAAA!, espinosaurio ¡GROOAR!); sin rugidos reales (no hay CC0 verificados)
