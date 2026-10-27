# Alcance y límites de v0.10.2

- Propuestas previas para revisión con Preventa, sin dimensionamiento ni garantía de compatibilidad. El directorio es fuente comercial de 36 productos, no certificación técnica de todas sus combinaciones.
- Tres complementos IA con alcance modelado explícito. No se elige fabricante automáticamente. La disponibilidad de una opción no afirma cobertura antes de elegirla, desplegar sensores y validar licencias/políticas.
- Clasificación determinista finita en español. Admite siglas, alias y patrones comerciales; no comprende cualquier frase, negación compleja o referencia entre conversaciones.
- Se conservan los segmentos del Excel; no se calcula segmento de cliente ni licencia por cantidades. Las capacidades sin producto asociado (por ejemplo MFA/IAM/PAM) quedan pendientes como integración genérica.
- Las pruebas con DOM en memoria ejecutan motor, SVG, controles, escenarios y expediente, pero no verifican distribución visual, tiempos de animación ni comportamiento de navegador real.
- Docker/Nginx no se ejecutaron. La validación ASGI sigue pendiente por falta de FastAPI en el runtime de pruebas. El intento de navegador de esta entrega se bloqueó al iniciar Edge, como se documenta en PRUEBAS_SMART.md.
- Los resultados y capturas heredados en tests son históricos de la base. No se presentan como evidencia nueva.


## Registro histórico

# Limitaciones de v0.10.1

- Motor determinista con diccionario español finito: no comprende cualquier redacción, ironía, doble negación, referencias entre frases o negaciones lejanas. Las cifras escritas solo cubren los términos declarados en smart.js. No suma cantidades parciales; solicita confirmar contradicciones.
- Se deben revisar evidencias y datos antes de construir. La disponibilidad de una página no prueba DDoS; las frases ambiguas generan aclaraciones y no incorporan DDoS. Otras necesidades explícitas sí pueden construirse mientras esa causa queda pendiente.
- Las marcas se seleccionan manualmente en los controles existentes incluso si aparecen en el texto. No se verificaron nuevas capacidades con fabricantes ni se agregaron productos o integraciones. La compatibilidad documental del catálogo base sigue pendiente de homologación.
- La cantidad de endpoints se registra en el análisis, sin dimensionar licencias. No se calcula ancho de banda, RTO/RPO, capacidad del servicio o arquitectura de producción.
- El modelo visual base utiliza cero para contexto desconocido; Smart Architect explica esta condición. En vista multisede se usa una sede representativa si no se conoce el total. En vistas generales puede verse un nodo agregado. La representación de hasta cuatro sedes se realiza por renderMesh original.
- Las simulaciones son didácticas y se ejecutan de una en una. No garantizan protección, restauración o integraciones reales.
- La interpretación se conserva en JSON de diseño y JSON de expediente (que incorpora el diseño), pero no se añade una sección narrativa específica de Smart Architect a los informes TXT/HTML heredados de Preventa.
- 50 casos/grupos/comprobaciones locales ejecutados (29 de lenguaje, 13 unitarios, 4 del adaptador y 4 con el motor completo en DOM en memoria). Las pruebas de navegador están implementadas pero no se validaron: Edge terminó antes de abrir la página. La regresión de navegador se detuvo en el primer script por ese bloqueo. Las rutas ASGI no pudieron probarse por ausencia de FastAPI en el runtime disponible. Docker/Nginx no se ejecutaron.
- La base incluía capturas y resultados de pruebas anteriores: son evidencia histórica de v0.9.4, no resultados de esta entrega.
