# Validación v0.10.2

## Ejecutado y aprobado
- Comparación de los 14 campos de cada una de las 36 filas de Directorio Estratégico A5:N40 con los 36 productos base: coincidencia completa. Huella y mapa fila a producto en PORTAFOLIO_Y_COBERTURA.md. No se modificó el Excel.
- smart-unit.cjs: 13 grupos del intérprete, validación, negaciones, cantidades, conservación de estado y ausencia de APIs de interpretación.
- smart-language.cjs: 29 casos comerciales y errores técnicos frecuentes.
- smart-adapter.cjs: 4 comprobaciones del adaptador de producción con DOM mínimo.
- smart-engine.cjs: motor completo, catálogo, reglas, portfolio, SVG y handoff originales en DOM en memoria. Incluye las cuatro integraciones base; 39 iteraciones (una por producto, reconocimiento + recomendación + SVG + escenario); 36 iteraciones de problemáticas sin nombres de productos; caso exacto «el cliente tiene 4 sedes y quiere sase»; aplicación real de Cato Socket/PoP; elección Sophos AI Defense y requisito EDR; productos seleccionados registrados en el expediente; alcance de Guardian para agentes; cuatro negaciones de productos/capacidades; separación Wi-Fi/WAF; SSE sin SD-WAN; tres expresiones genéricas de seguridad/uso de IA.
- Sintaxis de todos los scripts web y tests verificada con node --check. Sintaxis Python verificada con ast.parse.
- Comparación de Dockerfile, docker-compose.yml, requirements.txt y Nginx con la versión previa: sin cambios.

El registro de la suite local se conserva en tests/v0.10.2-local-results.txt. Los números anteriores tienen alcances distintos; no se presentan como pruebas de navegador.

## Intentado y bloqueado en esta entrega
Se intentó tests/smart.cjs con Playwright y Edge instalado. El navegador terminó antes de abrir la aplicación: `browserType.launch: Target page, context or browser has been closed`. No se aprobó ningún caso de esa ejecución. No se lanzó después la regresión completa de navegador por ese mismo bloqueo. El script de navegador incluye un caso adicional SASE y conserva la suite previa.

El backend no se volvió a ejecutar en esta corrección; sigue pendiente desde el intento anterior por falta de FastAPI en el runtime disponible. Docker y Nginx no se ejecutaron. Las pruebas con DOM en memoria no verifican layout, temporización de animaciones o comportamiento de navegador real.

Capturas y resultados heredados de v0.9.4 dentro de tests/ son evidencia histórica. No se generaron nuevas capturas.

## Registros históricos

# Validación actual v0.10.1 — diseño automático

Ejecutado y aprobado:
- smart-language.cjs: 29 casos de lenguaje comercial, errores comunes y negativos.
- smart-unit.cjs: 13 grupos de interpretación, seguridad y conservación.
- smart-adapter.cjs: 4 comprobaciones de integración del adaptador (DOM mínimo).
- smart-engine.cjs: 4 comprobaciones con el código completo del motor original y DOM en memoria. Un clic genera SVG, enlaces, controles y contexto de ocho sedes; el evento original de simulación avanza; las necesidades combinadas producen el mesh original de cuatro sedes con total doce y preservan exclusión EDR; una aclaración explícita incorpora DDoS sin inferirlo por una caída.

Son 50 casos/grupos/comprobaciones, de distinto alcance; no equivalen a 50 pruebas de navegador. Sintaxis JavaScript verificada. Catálogo y configuración de despliegue comparados sin diferencias.

No se ejecutó una nueva sesión de navegador ni backend en esta corrección. Persisten los bloqueos del entorno observados en v0.10.0: Edge se cerraba al arrancar Playwright y el Python incluido no tenía FastAPI. Por ello quedan pendientes el renderizado visual, la animación en navegador real y las rutas ASGI. smart.cjs se actualizó para exigir generación del diagrama tras pulsar únicamente la acción principal.

Capturas y archivos de resultados heredados de tests/ corresponden a v0.9.4. No constituyen evidencia de ejecución actual. No se generaron capturas nuevas.

## Registro histórico anterior

# Validación adicional v0.10.1

Se ejecutaron y aprobaron 29 casos en smart-language.cjs, 13 grupos en smart-unit.cjs y 4 comprobaciones en smart-adapter.cjs. El caso exacto «el cliente tiene problemas con ramsomware» identifica ransomware, registra la corrección, habilita construir e invoca el motor original con el modo ransomware. El adaptador se prueba con DOM mínimo; no es una validación del renderizado SVG en navegador.

Se verificó sintaxis de todos los scripts JS de web y tests. Catálogo y configuración de despliegue se compararon con v0.10.0 y permanecen intactos. No se volvió a ejecutar navegador o backend: siguen pendientes por las restricciones de entorno ya observadas abajo. La entrega no declara validación integral.

## Registro anterior de v0.10.0

# Validación de esta entrega — 26 de octubre de 2026

## Ejecutado y aprobado
- `node tests/smart-unit.cjs`: 13 grupos, incluyendo variantes ransomware, IA/datos, multisede, cantidades, múltiples necesidades, negaciones, ambigüedad, lenguaje comercial, contradicciones, límites, ausencia de APIs de interpretación, conservación de controles y selección de fabricantes.
- `node tests/smart-adapter.cjs`: 3 comprobaciones del adaptador de producción con DOM mínimo. Se verificó llamada a render original, acumulación de necesidades, modo ransomware, preservación de cantidades y controles, IA sin fabricante y bloqueo de construcción ambigua. No equivalen a verificar SVG en navegador.
- Comprobación de sintaxis JavaScript con Node y compilación sintáctica Python (ver registro de entrega).
- Comparación con el ZIP base de Dockerfile, docker-compose.yml, requirements.txt, configuración Nginx y catálogo: sin cambios.

## Intentado, bloqueado
- `node tests/smart.cjs`: Playwright pudo invocarse; Edge cerró el proceso al iniciar con `Target page, context or browser has been closed`. También se intentó directorio temporal en el workspace con el mismo resultado. Ningún caso de navegador de esta suite se declara aprobado.
- Regresión `tests/browser.cjs`: mismo bloqueo al arrancar. endpoint.cjs, cato.cjs, backbone.cjs y handoff.cjs no llegaron a ejecutarse en esa secuencia. Los scripts se conservan; la prueba del título se actualizó a 0.10.0.
- `python tests/backend.py` con runtime incluido: ModuleNotFoundError: fastapi. No se declara aprobación de rutas ASGI.

## Cobertura preparada para navegador
smart.cjs incluye cantidades, sedes >4 usando el motor existente, simulación ransomware, conservación de exclusión EDR, activación de necesidades de IA, selección explícita Cato y simulación IA, y presentación inerte de HTML. Se debe ejecutar en un equipo donde Playwright pueda iniciar el navegador antes de aceptar el piloto.

Los resultados y capturas preexistentes en tests/ pertenecen a la base; no representan ejecución actual.
