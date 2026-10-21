# Arquitectura — Juegos de Maya

## Estructura
```
manifest.webmanifest        ← PWA: nombre, íconos, display fullscreen, start_url/scope relativos
sw.js                       ← GENERADO por tools/actualizar-sw.py (no editar)
index.html                  ← menú: tarjetas grandes; al tocar dice el nombre y entra a los 700 ms
assets/
  fuentes/baloo2-latin.woff2 ← fuente local (OFL), variable 400-800
  iconos/                   ← icono.svg (fuente) + PNG 180/192/512 renderizados desde el SVG
  css/base.css              ← variables de color (:root), .btn-casa, animaciones pop/wiggle/confeti
  js/common.js              ← objeto global `Juegos` (ver API abajo)
  js/dibujos.js             ← objeto global `Dibujos`: todos los SVG (animales, objetos, íconos, casita)
  sonidos/
    CREDITOS.md             ← origen y licencia de cada sonido (obligatorio mantenerlo)
    animales/*.mp3          ← 12 sonidos CC0 procesados (vaca, perro, gato, chancho, gallina, gallo,
                              oveja, pato, caballo, leon, rana, elefante)
juegos/<nombre>/index.html  ← un juego por carpeta, autocontenido (HTML + <style> + <script>)
tools/
  smoke.mjs                 ← test con Playwright: abre todo, hace un toque y falla si hay errores JS
  sonidos/buscar.py         ← busca sonidos CC0 en Freesound
  sonidos/bajar.py          ← descarga la vista previa HQ y verifica la licencia en la página del sonido
  sonidos/procesar.py       ← recorta, iguala volumen y codifica (requiere ffmpeg)
.github/workflows/pages.yml ← despliegue a GitHub Pages en cada push a main
.nojekyll                   ← evita que Pages procese el sitio con Jekyll
```

## API de `common.js`
| Función | Qué hace |
|---|---|
| `Juegos.decir(texto, {rate, pitch})` | Voz en español (prefiere es-PE). Cancela la frase anterior |
| `Juegos.tono(freq, dur, tipo, vol)` | Tono sintético (Web Audio) |
| `Juegos.nota(freq, dur)` | Nota tipo xilófono (polifónica); la usa el Piano |
| `Juegos.pop()` | Sonido de "pop" (globos) |
| `Juegos.fiesta()` | Arpegio + confeti (premio) |
| `Juegos.confeti(n)` | Solo confeti; respeta prefers-reduced-motion |
| `Juegos.azar(arr)` / `Juegos.mezclar(arr)` | Elemento al azar / copia mezclada |
| `Juegos.animar(el, clase)` | Reinicia una animación CSS (`pop`, `wiggle`) |
| `Juegos.cargar(url)` | Precarga y decodifica un MP3 (AudioBuffer en caché) |
| `Juegos.sonar(url)` | Reproduce un MP3 cortando el anterior; la promesa se resuelve al terminar, rechaza si falla y queda pendiente si otro sonido lo corta |
| `Juegos.callar()` | Detiene el sonido actual |
| `Juegos.COLORES` | Paleta de 7 colores de los juegos |

## Dibujos SVG (`assets/js/dibujos.js`)
- `Dibujos.ANIMALES.<id>`, `Dibujos.OBJETOS_CONTAR`, `Dibujos.globo|pelota|flor|estrella(color)`, `Dibujos.paleta|crayon|piano|notaMusical|casita`
- Piezas para dibujos nuevos: `svg(cuerpo, {cabeza})`, `plano()`, `ojos()`, `mejillas()`, `boca()`, `carita()`
- Al cargar rellena `.btn-casa` con la casita. Toda página que use dibujos lo incluye después de common.js
- Las animaciones compartidas (parpadeo, `.sonando`) viven en base.css

## Estilo de los dibujos SVG
- viewBox 200×200, trazo `#3b2a4a` de 5 px con uniones redondeadas, cabezas frontales tipo kawaii
- Piezas compartidas: `ojos()` (parpadean), `mejillas()`, `boca()` (cerrada/abierta), `svg()`
- Clases animables: `.cabeza`, `.ojos`, `.oreja-i`, `.oreja-d`, `.boca`/`.boca-abierta`; el estado `.sonando` en el botón las activa
- `transform-box: fill-box` solo en las clases animadas. Si una pieza lleva el atributo `transform`, la clase va en un `<g>` envolvente

## Offline (service worker)
- `common.js` registra `../../sw.js` (relativo al propio script), así su alcance cubre todo el sitio también bajo `/juegos-maya/`
- `sw.js` precachea index, manifest, todo `assets/` y `juegos/` (las páginas también con URL de carpeta `juegos/x/`)
- Primero la caché; versión `maya-<hash del contenido>`; al activar una versión nueva se borran las anteriores
- Los íconos PNG se regeneran renderizando `icono.svg` con Chromium si cambia el diseño

## Pipeline de sonidos
1. `python3 tools/sonidos/buscar.py "cow moo" "dog bark"` → lista CC0 con duración y descargas
2. `python3 tools/sonidos/bajar.py <raw> vaca=59245 ...` → mp3 HQ + `meta.json` con licencia y autor
3. Revisar la forma de onda o el espectrograma (ffmpeg `showwavespic`/`showspectrumpic`): sin silencio, sin ruido
4. Editar `ELEGIDOS`/`CRED` en `procesar.py` y luego correr `python3 tools/sonidos/procesar.py <raw> assets/sonidos/<juego>`
5. Agregar las filas en `assets/sonidos/CREDITOS.md`

Los archivos crudos van a una carpeta temporal y nunca al repo (`*.wav` está en .gitignore).

## Restricciones de entorno (descubiertas)
- Freesound: requiere User-Agent. A veces limita la frecuencia (por eso `bajar.py` reintenta y espera).
  La URL de la vista previa incluye el id del usuario: hay que leerla de la página, nunca adivinarla
- Pixabay devuelve 403 a descargas automáticas. Wikimedia exige User-Agent y sus licencias varían (piden atribución)
- Chromium en la nube de Claude Code: `/opt/pw-browsers/chromium` (no correr `playwright install`)
- El smoke test no reproduce audio ni voz: siempre hace falta probar en un dispositivo real

## Notas de plataforma
- iOS/Safari: el audio solo se activa después de un gesto del usuario. El primer toque debe desbloquear el `AudioContext`
- Para baja latencia al tocar: decodificar MP3 a `AudioBuffer` (Web Audio) mejor que `<audio>`
- GitHub Pages sirve bajo `/juegos-maya/`: usar siempre rutas relativas
