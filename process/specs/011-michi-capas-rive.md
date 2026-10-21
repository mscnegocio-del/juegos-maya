# SPEC-011 — Michi por capas animado con Rive (spike en rama aparte)
Estado: borrador
> Depende de: capas de Michi generadas por el usuario con ChatGPT/Photopea (ver "Capas" abajo).
> **Reemplaza explícitamente la restricción de SPEC-009** que deja "el motor de Rive" fuera de alcance: con esta spec
> aprobada, Rive (editor + runtime web) queda permitido para Michi. Lo que sigue descartado es el archivo Boba Cat (.riv).
> Origen: plan-mejoras-juegos-maya.md (chat del 2026-10-21).

## Qué
Que Michi se vea vivo como en Talking Tom: cada parte (orejas, ojos, párpados, boca, cabeza, cola, patas, cascabel)
se mueve por separado con huesos, y los estados se mezclan con transiciones en lugar de cambiar la imagen entera.
Hoy son 10 poses `.webp` completas animadas con CSS, que se balancean como un recorte de papel.

## Capas que debe preparar el usuario
- Todas en el **mismo lienzo** (PNG transparente 1024×1024), con Michi siempre en la misma posición; superpuestas
  deben formar exactamente la "pose maestra" (Michi sentado de frente, pose neutra)
- Cada pieza continúa unos 20 px por debajo de la que la cubre (oreja dentro de la cabeza, cuello dentro del cuerpo)
- Sin sombras ni fondo; la sombra del piso va en su propia capa
- Lista: `cuerpo`, `cabeza` (sin orejas, ojos ni boca), `oreja-izq`, `oreja-der`, `ojo-izq`, `ojo-der`,
  `parpado-izq`, `parpado-der`, `cejas`, `boca-cerrada`, `boca-abierta`, `boca-risa`, `lengua`, `cola` (2–3 segmentos),
  `pata-delantera-izq`, `pata-delantera-der`, `collar`, `cascabel`, `mejillas`, `sombra`

## Criterios de aceptación (del spike)
- [ ] Las capas superpuestas en el navegador coinciden con la pose maestra (captura de comparación)
- [ ] `michi.riv` armado en el editor de Rive (plan gratuito) con huesos y una *state machine* con entradas:
  `tocarCabeza`, `tocarPanza`, `tocarNariz`, `cosquillas` (disparadores), `comer`, `dormir`, `banarse`, `feliz` (booleanos),
  `hambre`, `mirarX`, `mirarY` (números)
- [ ] Respira, parpadea solo y mueve la cola en reposo; los ojos siguen el dedo
- [ ] Las reacciones de SPEC-006 (cabeza, panza, nariz, cola, patas, mareo) se ven con movimiento por partes y transición suave
- [ ] La lógica de `juegos/gato/` (cuartos, necesidades, escenas del baño, guardado) no cambia: solo la capa visual
- [ ] Runtime de Rive guardado en `assets/vendor/` (nunca CDN); funciona sin internet tras instalar la PWA
- [ ] Peso medido y anotado: runtime + `michi.riv`. Si el total supera ~1,5 MB, se evalúa el runtime "lite" o se descarta
- [ ] ≥ 50 fps en celular de gama media; respeta `prefers-reduced-motion` (solo parpadeo y respiración mínima)
- [ ] Capturas antes/después; el usuario decide si se integra a `main`

## Fuera de alcance
- Usar el archivo Boba Cat (.riv) u otros personajes de terceros
- Plan pago de Rive o funciones que exijan cuenta en línea para reproducir
- Rehacer las escenas del baño (se reutilizan; solo cambia cómo se dibuja Michi)

## Notas técnicas
- Spike en rama aparte sin merge hasta que el usuario apruebe el resultado (exento de spec mientras sea spike;
  esta spec cubre la integración)
- Advertencia: ChatGPT no suele mantener la alineación entre imágenes separadas. Flujo sugerido: una pose maestra
  → aislar cada parte desde ella (ChatGPT o Photopea) → completar a mano las zonas ocultas → validar superponiendo
- Si se integra: las poses `.webp` actuales quedan como respaldo para las escenas que aún las usen
- Registrar en decisions.md la excepción "librería en assets/vendor/"
