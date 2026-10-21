# SPEC-010 — Michi: escenas enfocadas y cuidados detallados (mecánica tipo "My Talking Tom")
Estado: aprobada
> Aprobada por el usuario en el chat el 2026-10-21. Michi se queda gris con ojos verdes.
> Depende de SPEC-006 y va junto con SPEC-009 (estilo visual). Referencia: capturas de My Talking Tom enviadas por
> el usuario, solo como inspiración de **mecánicas**. Michi sigue siendo un personaje propio (no se copia a Tom).

## Qué
Que cada cuidado sea una pequeña escena: la "cámara" se acerca solo al gato y al objeto (lavamanos, inodoro,
bañera, mesa, cama), Maya elige herramientas con la mano y Michi reacciona con movimientos y caras para cada paso.

## Navegación (como en el juego de referencia)
- [ ] Barra inferior con 4 botones redondos grandes: **cara feliz** (sala), **tenedor** (cocina), **inodoro** (baño),
  **luna** (dormitorio). Cada botón tiene un anillo que muestra cuánto le falta a esa necesidad y parpadea si está baja
- [ ] Nuevo cuarto **Sala** (inicio): Michi de cuerpo entero con sillón, tele antigua, cuadro, ventana y juguetes; aquí
  se juega a tocarlo (reacciones de SPEC-006)
- [ ] El **Baño** reúne inodoro, lavamanos y bañera con ducha (reemplaza los cuartos separados "bañera" y "baño")
- [ ] Deslizar el dedo sigue cambiando de cuarto; las flechas laterales se quitan

## Cámara enfocada (zoom)
- [ ] Al elegir una estación (inodoro, lavamanos, bañera, cepillo de dientes, mesa), la escena se acerca con una
  animación suave hasta que en pantalla solo se ven Michi y ese objeto; lo demás se oscurece o desenfoca
- [ ] Botón "volver" grande (flecha) o terminar la tarea devuelve la cámara a la vista del cuarto

## Baño → Lavamanos (después del inodoro o cuando quiera)
- [ ] Primer plano de las manos de Michi sobre el lavamanos
- [ ] Elegir entre **2 jabones** (por ejemplo, jabón amarillo con huellita y jabón rosado de burbujas): cada uno hace
  espuma de su color
- [ ] Frotar con el dedo sobre las manos: aparece espuma donde se frota; tocar el grifo enjuaga (agua cayendo) y
  la espuma se va; Michi sacude las manitos y sonríe

## Baño → Bañera (limpieza completa)
- [ ] Michi entra a la bañera con agua y espuma hasta la panza
- [ ] Cuando la limpieza está baja, Michi tiene **manchitas de barro** en carita, orejas, brazos y panza
- [ ] Elegir entre **2 herramientas**: esponja (azul) o jabón (amarillo); se arrastra con el dedo por **cualquier parte
  del cuerpo** (carita, orejas, brazos, panza, espalda) y deja espuma; las manchas se borran al frotarlas
- [ ] Michi reacciona según dónde lo frotan: cierra los ojos si es la carita, se ríe en la panza, mueve la oreja
- [ ] Botón de **ducha**: cae agua, se va la espuma; **toalla**: lo seca y se sacude salpicando gotitas; queda brillante
  (destellos) y la necesidad de limpieza se llena según cuántas manchas quitó
- [ ] Juguetes en el agua (patito de goma, barquito) que se pueden tocar y flotan

## Baño → Inodoro
- [ ] La cámara enfoca a Michi y al inodoro; Michi camina, se sube y **se sienta** (animación)
- [ ] Hace sus necesidades con humor infantil: cara de esfuerzo (cejas juntas, mejillas infladas, puede sonrojarse),
  sonidos cómicos suaves y, a veces, una **nubecita verde de "pum"** que hace reír (como en la referencia)
- [ ] Termina con **cara de alivio y satisfacción** ("¡Ahhh, qué alivio!"), papel higiénico que se desenrolla al tocarlo,
  botón para **jalar la cadena** (remolino de agua + sonido) y aplausos
- [ ] Al bajar, la cámara pasa sola al lavamanos para lavarse las manos (paso anterior)
- [ ] Nunca se muestra nada desagradable: todo queda tapado por el inodoro y se resuelve con caras y efectos graciosos

## Baño → Cepillarse los dientes (nuevo)
- [ ] Primer plano de la cara de Michi con la boca abierta
- [ ] Cuando hace tiempo que no se cepilla, aparecen **"bichitos de azúcar"** de colores con carita sobre los dientes
- [ ] Maya toma el cepillo (elige entre 2 colores) y frota: salen burbujas, los bichitos se van y los dientes brillan
  con destellos; Michi hace "¡aaah!" y sonríe mostrando los dientes limpios

## Cocina → Mesa
- [ ] Vista de Michi **detrás de una mesa** con mantel, como en la referencia; sobre la mesa, **3 platos** con comida
  que se cambian deslizando (más de 6 comidas en total)
- [ ] Arrastrar un plato/comida a su boca: abre la boca, mastica (cachetes que se mueven), traga y reacciona:
  le encanta (ojos de corazón, se frota la panza), le gusta, o cara graciosa si no le gusta mucho
- [ ] Bebidas (leche, jugo) con sorbete: hace "slurp"; si come mucho, eructa suave y se ríe

## Dormitorio
- [ ] Michi se acuesta en una cama con forma de gato, se tapa con una mantita, apaga la lámpara al tocarla;
  la cámara se acerca a su cara dormida con "zzz" y una luna/estrellas en la ventana; se despierta estirándose y bostezando

## Expresiones nuevas (todas sin angustiar)
- [ ] Esfuerzo, alivio/satisfacción, ojos de corazón, cachetes llenos (masticando), asco leve gracioso, sorpresa,
  cosquillas, dormido, ojos cerrados de placer al bañarlo

## Fuera de alcance (prohibido por diseño)
- Monedas, tienda, niveles, anuncios, notificaciones, compras (todo lo que se ve en las capturas con "AD" o precios)
- Enfermedad, doctor, inyecciones o botiquín (la captura del botiquín): la mascota nunca se enferma
- Copiar personajes, nombre, voz, música o diseño de Talking Tom y sus amigos
- Micrófono o repetir la voz

## Notas técnicas
- Cámara: la escena es un contenedor que se transforma con `transform: scale() translate()` y transición CSS;
  una capa de viñeta oscurece los bordes
- Manchas, espuma y bichitos: elementos SVG sobre Michi con zonas (`data-zona`) para saber qué parte se frota
- Michi necesita nuevas poses: caminando, sentado en el inodoro, en la bañera, detrás de la mesa, acostado,
  primer plano de manos y de boca → se dibujan junto con SPEC-009
- Sonidos nuevos (agua, cadena, "pum" suave, masticar, slurp, eructo, cepillo): CC0/dominio público o sintetizados
- Smoke test con un caso por estación; test completo de Michi actualizado
