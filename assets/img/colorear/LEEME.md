# Láminas de contornos para Pintar — qué pedirle a ChatGPT

Archivos: `assets/img/colorear/<id>.png` (contornos) y `assets/img/colorear/<id>-modelo.webp` (versión a color, para el nivel 3).
**1024×1024, cuadrada.** El motor de regiones (prototipos/pintar-regiones) las convierte solo en zonas pintables.

## Prompt base (contornos) — pégalo al inicio de un chat nuevo y manda las láminas una por una en el MISMO chat
> Lámina para colorear para niños de 3 años, estilo **kawaii adorable con volúmenes redondeados** (mismo personaje y proporciones que
> la ilustración de referencia adjunta si la hay). **Solo contornos negros sobre fondo blanco puro.**
> Reglas estrictas:
> - **Línea negra gruesa y uniforme** (unos 10 px en una imagen de 1024×1024), sin variaciones de grosor.
> - **Todas las formas completamente cerradas: ningún hueco ni interrupción en ninguna línea.**
> - **Interiores blancos puros**: sin grises, sin sombreados, sin degradados, sin rayados, sin texturas, sin puntitos de relleno.
> - **De 5 a 12 zonas grandes y bien diferenciadas** (cuerpo, cabeza, orejas, patas, etc.). Ninguna zona diminuta: cada zona debe medir al menos unos 40 px por lado.
> - Ojos como **puntos negros sólidos**, boca como una sola línea curva sonriente, mejillas sin dibujar. Sin detalles finos (nada de pelos, plumas o escamas dibujadas una por una).
> - Personaje **centrado, ocupando ~80 % de la imagen**, con margen blanco alrededor. Sin fondo, sin suelo, sin sombra, sin texto, sin marco.
> - Formato **cuadrado 1024×1024, PNG**.
> Dibuja: **[LÁMINA]**.

## Prompt para el modelo a color (nivel 3) — en el mismo chat, justo después de cada lámina
> Ahora la **misma lámina** pero pintada: estilo juguete 3D de vinilo suave, colores pastel con acentos vivos, **mismas formas y mismas zonas**, fondo blanco puro, cuadrada 1024×1024. Cada zona de un solo color liso (puede haber un brillo muy suave).

## Piloto primero (3 láminas) — para validar antes de pedir las 39
`tortuga` (la tortuga), `pulpo` (el pulpo), `pato` (el pato). Con esas tres compruebo en el prototipo que las líneas cierren y las regiones salgan bien.

## Las 39 láminas actuales (+ 8 dinosaurios nuevos opcionales)
| id | LÁMINA | id | LÁMINA | id | LÁMINA |
|---|---|---|---|---|---|
| vaca | vaquita de frente | perro | perrito de frente, orejas caídas | gato | gatito sentado |
| pez | pez de lado | mariposa | mariposa con alas abiertas | flor | flor grande con tallo y dos hojas |
| casa | casita con techo y puerta | sol | sol sonriente con rayos | auto | autito de lado |
| globos | dos globos atados | estrella | estrella sonriente | pastel | pastel con una vela |
| pulpo | pulpo con 5 tentáculos | ballena | ballenita de lado | tortuga | tortuguita de lado con caparazón |
| cangrejo | cangrejo con pinzas | bus | bus escolar de lado | avion | avioncito de lado |
| barco | barquito con dos velas | tren | trencito con 3 vagones | cohete | cohete con ventana y llamas |
| helado | helado de 3 bolas | cupcake | cupcake con crema | manzana | manzana con hoja |
| sandia | rodaja de sandía | michi | Michi (gato gris) sentado de frente | ovillo | ovillo de lana con hilo |
| cama | camita de gato con almohada | arbol | árbol con tronco y copa | nube | sol detrás de una nube |
| arcoiris | arcoíris con dos nubes | hongo | hongo con puntos | chancho | chanchito de frente |
| pato | patito de lado | rana | ranita de frente | oveja | ovejita con lana |
| leon | cachorro de león de frente | elefante | elefantito de frente | gallina | gallinita de lado |
| **trex** | tiranosaurio bebé | **trice** | tricerátops bebé | **bronto** | braquiosaurio bebé |
| **estego** | estegosaurio bebé | **rapto** | velociraptor bebé | **anqui** | anquilosaurio bebé |
| **ptero** | pterodáctilo bebé con alas abiertas | **espino** | espinosaurio bebé | | |

## Si ChatGPT se equivoca
- Líneas con huecos → "Cierra todas las líneas, no debe haber ni un hueco, redibuja la lámina".
- Grises o sombras → "Solo negro puro y blanco puro, sin ningún gris ni sombreado".
- Demasiadas zonas pequeñas → "Simplifica: máximo 10 zonas grandes, sin detalles pequeños".
Mándame los archivos como lleguen; yo reviso cada uno (huecos, número de regiones) antes de conectarlos.
