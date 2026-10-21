# SPEC-013 — Globos con niveles
Estado: borrador
> Depende de SPEC-012 (y de SPEC-015 para los stickers). Origen: plan-mejoras-juegos-maya.md.

## Qué
Que Globos crezca con Maya: del "revienta cualquiera" actual a consignas de color, cantidad y tamaño, con una sola
novedad por nivel y sin temporizadores.

## Criterios de aceptación
- [ ] Nivel 1: igual que hoy (revienta cualquiera y dice el color)
- [ ] Nivel 2: "¡Revienta los globos rojos!": solo revienta el color pedido; los otros rebotan suave al tocarlos (sin sonido de error)
- [ ] Nivel 3: el color pedido cambia cada 5 globos ("¡Ahora los azules!")
- [ ] Nivel 4: cantidad exacta: "Revienta 3 globos verdes"; la voz cuenta con ella (uno, dos, tres)
- [ ] Nivel 5: dos atributos, color y tamaño ("los grandes", "los pequeños amarillos")
- [ ] Nivel 6: globos con sorpresa: al reventar sale un animal o número de `dibujos.js` ("¡Busca al pato!")
- [ ] Niveles de 5–8 rondas; al completar uno, celebración y sticker (SPEC-015)
- [ ] La consigna se repite en voz alta si toca un globo que no es; botón para volver a escucharla
- [ ] La velocidad puede subir un poco por nivel, pero nunca hay tiempo límite ni globos que "se escapan" con castigo
- [ ] Avance con `Juegos.progreso` (nivel adaptativo); smoke test con un caso por nivel

## Fuera de alcance
- Puntaje, vidas, cuenta regresiva
- Sonidos nuevos que no sean CC0

## Notas técnicas
- Objetivos ≥ 72 px también en los globos "pequeños" del nivel 5 (pequeño relativo, no diminuto)
