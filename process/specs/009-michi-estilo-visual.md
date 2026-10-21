# SPEC-009 — Michi con nuevo estilo visual (nivel "Boba Cat")
Estado: aprobada
> Aprobada por el usuario en el chat el 2026-10-21. Michi se queda gris con ojos verdes.
> Depende de SPEC-006. Referencia visual: "Boba Cat" de gbadebob (Rive, CC BY 4.0), solo como inspiración de estilo.

## Qué
Redibujar a Michi y sus cuartos con la calidad visual del Boba Cat: sombreado suave, contorno marrón, colores
pastel, ojos expresivos y escenas con profundidad. Se conservan TODAS las reacciones, cuartos y necesidades de
SPEC-006. Dibujo propio en SVG: sin archivos externos, sin créditos obligatorios, liviano y sin internet.

## Inventario de detalles del Boba Cat → cómo se adapta a Michi
| Detalle del Boba Cat | En Michi |
|---|---|
| Contorno marrón oscuro suave (no negro), grosor variable | Trazo marrón `#4a2f2a` con extremos más finos |
| Sombreado suave con degradados y difuminado (blur) | Degradados radiales + sombras internas con filtro `feGaussianBlur` |
| Ojos grandes con blanco visible, iris marrón, brillos | Ojos con blanco, iris verde (identidad de Michi), 2 brillos, párpado superior |
| Cejas expresivas | Cejas que cambian con cada emoción (contento, sorpresa, mareo, sueño) |
| Párpados a media asta "satisfecho" al tocar la cabeza | Nuevo estado `satisfecho` (ojos entrecerrados) además de cerrados/felices |
| Mirada que recorre la habitación | Pupilas que siguen el dedo y miran alrededor en reposo |
| Rubor rosado difuminado | Mejillas con blur; se intensifican al sonrojarse |
| Nariz pequeña marrón/rosada y boca en "w" | Igual, con brillo en la nariz |
| Rayas atigradas en frente, mejillas, patas y cola | Rayas gris oscuro en los mismos lugares, con degradado |
| Interior de orejas en color y pelo | Interior rosado con mechones |
| Collar con hebillas y colgante | Collar rojo con hebillas metálicas y su cascabel dorado (no el colgante de boba) |
| Patas con almohadillas (huellas) visibles | Almohadillas rosadas en las patas traseras, dedos marcados |
| Pose sentada con cola enroscada detrás | Pose sentada; cola atigrada que se enrosca y se mueve |
| Objeto entre las patas (bolita blanca) | Ovillo de lana que Michi toca a veces (y que Maya puede hacer rodar) |
| Alfombra ovalada con borde interior | Alfombra ovalada en cada cuarto, con sombra de Michi encima |
| Habitación: pared pastel, piso, ventana con ciudad y nubes | Fondos de los 4 cuartos redibujados con ese nivel de detalle |
| Plantas en macetas, planta colgante, lámpara colgante | Plantas, lámpara colgante (en el dormitorio, la que se apaga) |
| Cuadro en la pared, cama con forma de gato, casita/rascador | Cuadro con un pez, cama con forma de gato (dormitorio), rascador (cocina o patio) |
| Fondo desenfocado (profundidad de campo), gato nítido | Fondo con blur suave; Michi y objetos tocables nítidos |
| Destellos/brillos que aparecen | Destellos al acariciar, al limpiar y al festejar |
| Barras de hambre, energía y limpieza; corazón | Los 4 indicadores rediseñados (hambre, limpieza, baño, sueño) con el mismo estilo + corazón de cariño |
| Jabón y pescado que se arrastran y "caen" con animación | Comidas, esponja y toalla con animación al tomar y al soltar (rebote, sombra) |
| Ducha con botón, espuma | Ducha con botón propio y espuma con brillo |
| Brillo/reflejo ("glare") en objetos | Reflejo suave en cascabel, plato, bañera e inodoro |

## Criterios de aceptación
- [ ] Michi redibujado con todos los detalles del inventario (contorno marrón, sombreado con blur, ojos con blanco e iris, cejas, rayas, almohadillas, collar con hebillas, ovillo)
- [ ] Nuevas expresiones: satisfecho, sorprendido (cejas arriba), mareado (ojos en espiral), dormido; las de SPEC-006 se mantienen
- [ ] Los 4 cuartos con fondo detallado y desenfocado (ventana con ciudad/nubes, plantas, cuadro, lámpara, cama de gato, rascador, alfombra)
- [ ] Indicadores y botones rediseñados con el mismo estilo pastel
- [ ] Objetos con animación al arrastrar y soltar; destellos en caricias, limpieza y festejo
- [ ] Todas las reacciones, cuartos, necesidades y guardado de SPEC-006 funcionan igual (el test completo de Michi pasa)
- [ ] Rendimiento: ≥ 50 fps en tablet media con el fondo desenfocado (el blur del fondo se precalcula, no se anima)
- [ ] Peso de la página de Michi ≤ 150 KB (sin contar sonidos); funciona sin internet
- [ ] Capturas comparadas antes/después en celular y tablet; el usuario lo aprueba visualmente

## Fuera de alcance
- Usar el archivo .riv del Boba Cat o el motor de Rive
- Copiar los rasgos propios del Boba Cat (pelaje rosado, colgante de té de boba, su habitación exacta): Michi sigue
  siendo gris atigrado de ojos verdes con collar rojo y cascabel
- Ropa, minijuegos y álbum (SPEC-007)

## Notas técnicas
- Todo en `assets/js/michi.js` (SVG) y `juegos/gato/index.html`; mismas clases animables para no romper la lógica
- Fondos como SVG con `filter: blur()` aplicado una vez a una capa estática
- Color confirmado por el usuario: gris atigrado con ojos verdes
