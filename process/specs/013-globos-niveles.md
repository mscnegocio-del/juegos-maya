# SPEC-013 — Globos con niveles
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-22.
> Depende de SPEC-012 (y de SPEC-015 para los stickers). Origen: plan-mejoras-juegos-maya.md.

## Qué
Que Globos crezca con Maya: del "revienta cualquiera" actual a consignas de color, cantidad y tamaño, con una sola
novedad por nivel y sin temporizadores.

## Criterios de aceptación
- [x] Nivel 1: igual que hoy (revienta cualquiera y dice el color)
- [x] Nivel 2: "¡Revienta los globos rojos!": solo revienta el color pedido; los otros rebotan suave al tocarlos (sin sonido de error)
- [x] Nivel 3: el color pedido cambia cada 5 globos ("¡Ahora los azules!")
- [x] Nivel 4: cantidad exacta: "Revienta 3 globos verdes"; la voz cuenta con ella (uno, dos, tres)
- [x] Nivel 5: dos atributos, color y tamaño ("los grandes", "los pequeños amarillos")
- [x] Nivel 6: globos con sorpresa: al reventar sale un animal o número de `dibujos.js` ("¡Busca al pato!")
- [x] Niveles de 5–8 rondas; al completar uno, celebración y sticker (SPEC-015)
- [x] La consigna se repite en voz alta si toca un globo que no es; botón para volver a escucharla
- [x] La velocidad puede subir un poco por nivel, pero nunca hay tiempo límite ni globos que "se escapan" con castigo
- [x] Avance con `Juegos.progreso` (nivel adaptativo); smoke test con un caso por nivel

## Fuera de alcance
- Puntaje, vidas, cuenta regresiva
- Sonidos nuevos que no sean CC0

## Notas técnicas
- Objetivos ≥ 72 px también en los globos "pequeños" del nivel 5 (pequeño relativo, no diminuto)

## Implementación (2026-10-22)
- Cada nivel se juega en rondas (una consigna): nivel 1 = 1 globo cualquiera; 2 = 2 del color fijo; 3 = 5 del color, que
  cambia cada ronda; 4 = 2 a 4 globos contados en voz alta; 5 = 3 por tamaño (y a veces color); 6 = buscar un animal
- Ronda con a lo sumo 1 error = acierto para `Juegos.progreso`; con más = fallo (solo sirve para bajar en silencio).
  En el nivel 6 reventar otros animales es explorar, no error
- ~45 % de los globos sirven para la consigna; la velocidad sube 4 % por nivel. Botón con el dibujo de la consigna
  para volver a escucharla; puntitos que se llenan con el avance de la ronda
- Probado en partida simulada: del nivel 1 al 5 en ~2,5 min, con 4 stickers ganados
