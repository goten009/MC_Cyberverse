# Manual técnico — 0.9.4

`web/app.js` conserva el motor de arquitectura; `web/handoff.js` implementa levantamiento y generación local. `index.html` carga catálogo, motor y módulo de entrega en ese orden. No se añadieron dependencias productivas.

## Integración
`MC_HANDOFF_ENGINE` expone instantánea, definiciones de capacidades, necesidades, fases y contribuciones. `MC_PREVENTA` expone state/restore/clear/hasData/addProduct. El esquema de arquitectura mc-cyberverse-0.9 añade discovery.fields y discovery.products sin cambiar la clave local mc-cyberverse-v08. Diseños antiguos sin discovery limpian esos campos al recuperarse.

Los productos del catálogo se conservan por ID validado; no modifican las capacidades de arquitectura. Las alternativas de conectividad e IA se traducen a herramientas con origen y estado explícitos. Los controles existentes se identifican como declaraciones del cliente, pendientes de validación. Las exclusiones y dependencias faltantes se registran como brechas.

## Documento
Esquema mc-cyberverse-handoff-1: referencia local aleatoria, fecha ISO y representación America/Bogota, contexto del cliente, discovery, necesidades, herramientas, controles, estrategia por fases, pendientes y arquitectura completa. La referencia no es un registro central ni prueba de aprobación.

La vista previa fija una instantánea para que TXT/HTML/JSON compartan referencia y datos. Para incorporar cambios posteriores se vuelve a generar. TXT es listado legible; HTML es autocontenido, con estilos de impresión y botón window.print; JSON mantiene toda la configuración. El HTML escapa los valores variables y no carga recursos externos. No contiene ni ejecuta scripts aportados en los campos.

Se valida nombre, al menos una necesidad, cantidades enteras con límites y remotos no superiores a usuarios totales. Los campos de discovery tienen longitudes máximas. El sistema genera pendientes para datos no registrados y alternativas faltantes. La validación del navegador no sustituye validación futura en servidor.

## Guardado y nuevo cliente
El estado de discovery forma parte de serial/restore. Nuevo cliente limpia datos, necesidades, alternativas, estados, campos de discovery y productos, con confirmación si hay levantamiento activo. El almacenamiento local sigue siendo un único diseño del perfil; no existe historial multiusuario.

Los cambios de contexto actualizan grafo y detalles sin reconstruir los botones de necesidades durante el evento blur. Evita perder el clic que provoca salir de un campo.

## Operación y validación
Docker/FastAPI conservados; documentación de infraestructura y pendientes en README/RUTA_A_VERSION_1.md. Suite npm test: general, endpoint, Cato IA, backbone y entrega a Preventa. Evidencias y límites de las descargas automatizadas en PRUEBAS.md.


## v0.10.0 / Smart Architect 1.0
Ver `SMART_ARCHITECT.md` para flujo, diccionario, reglas, datos desconocidos y límites; `PRUEBAS_SMART.md` para evidencia ejecutada. Scripts locales adicionales: smart-rules.js y smart.js antes de app.js. No requiere nuevas dependencias de ejecución. La aplicación puede abrirse desde archivo. Esquema de diseño existente preservado con campo aditivo smartArchitect.


## v0.10.1: acción única
Diseñar solución interpreta y construye inmediatamente mediante render original; Ver arquitectura solo navega. Detalle en SMART_ARCHITECT.md. El escenario activo se almacena como scenarioNeed. Pruebas del motor completo: tests/smart-engine.cjs.


## v0.10.2: portafolio
Nuevo módulo local web/portfolio.js antes del intérprete. Mapa completo y fuentes en PORTAFOLIO_Y_COBERTURA.md. matching utiliza IDs/capacidades explícitos. Complementos IA se agregan al catálogo sin alterar los 36 registros fuente. Requiere publicar todos los scripts del ZIP y reconstruir la imagen en instalaciones Docker.
