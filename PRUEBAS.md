# Validación v0.9.4

78 casos funcionales aprobados en Chrome headless con Playwright: 28 generales, 11 de endpoint Sophos/Guardian, 11 de Cato IA, 14 de backbone y 14 de entrega a Preventa.

La suite de entrega valida nombre y necesidades; cantidades/remotos; productos de catálogo sin modificación de arquitectura ni duplicados; quitar/reagregar; contexto y estados en vista previa; generación TXT/HTML/JSON consistente; topología completa; lectura estratégica de IA; apertura de HTML y llamada al botón de impresión; guardado/recuperación; escape de contenido HTML/script; recuperación antigua sin datos ajenos; nuevo cliente sin residuos; ausencia de errores JavaScript.

Evidencias: tests/handoff-results.json, tests/preventa-preview.png, tests/preventa-informe.png y ejemplo-preventa.txt/html/json. Son datos ficticios de prueba. Los otros resultados permanecen en tests/.

**Límite de la prueba de descarga:** Chrome headless de este entorno canceló la escritura de descargas Blob incluso en una página mínima. Se verificó el evento de descarga y el nombre, y se recuperó el contenido exacto del Blob generado para validar y abrir los archivos. Por tanto se valida la generación de documentos, no el guardado automático del navegador en el equipo de despliegue. Esa descarga debe comprobarse en los navegadores corporativos. El botón de impresión se comprobó con una función de prueba, sin afirmar una exportación PDF real.

Sintaxis app.js y handoff.js aprobada. Sin pruebas de ejecución productiva Docker/FastAPI, autenticación, MySQL ni separación multiusuario: no están implementadas o no se dispone de infraestructura validada. No se presenta esta versión como producción multiusuario.

Reproducir: npm install y npm test. Chrome en Windows por defecto; CHROME_PATH permite otra ruta.
