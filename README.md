# 🎈 Juegos de Maya

Juegos web para una niña de 3 años: botones grandes, voz en español, sin textos que leer y sin "perder".

HTML + CSS + JS puro, sin build. Se publica tal cual en GitHub Pages.

## Juegos

| Juego | Qué aprende |
|---|---|
| 🎈 Globos | Coordinación ojo-mano, nombres de colores |
| 🐮 Animales | Animales y sus sonidos |
| 🎨 Colores | Reconocer colores (2 → 3 opciones) |
| 🖍️ Pintar | Creatividad libre, multitáctil |

## Estructura

```
index.html              ← menú de juegos
assets/css/base.css     ← estilos comunes (botón casita, animaciones)
assets/js/common.js     ← Juegos.decir(), sonidos, confeti
assets/sonidos/          ← sonidos CC0 (créditos en CREDITOS.md)
juegos/<nombre>/index.html
tools/                   ← smoke test y scripts para conseguir/procesar sonidos
```

## Para agentes IA (harness)

`CLAUDE.md` → `AGENTS.md` (reglas y comandos), `memory.md` (estado actual) y `process/`
(arquitectura, tareas, decisiones y specs). Ninguna feature se programa sin una spec `aprobada` en `process/specs/`.

## Agregar un juego nuevo

1. Crea `juegos/<nombre>/index.html` (copia uno existente como plantilla).
2. Agrega su tarjeta en `index.html`.

## Probar en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicar

En GitHub: **Settings → Pages → Source: GitHub Actions**. Cada push a `main` despliega automáticamente.
