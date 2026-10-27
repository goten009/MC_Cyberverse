# Motor local Smart Architect 1.0

## Flujo y puntos de integración
`smart-rules.js` aporta el diccionario configurable. `smart.js` implementa `MC_SMART.analyze`, `normalize` y `merge`. `app.js` monta el panel y aplica el resultado a `st.chosen`, `ai.enabled` y al contexto. Después llama a `render()` original: `proposedCaps`, `allCaps`, `renderGraph`, `renderMesh`, controles, catálogo y simulación siguen siendo el motor de v0.9.4. No se agrega un segundo generador ni se cambia Docker, Nginx o la configuración de FastAPI. Se actualiza el identificador de versión del servicio.

## Ampliar reglas
Edita `web/smart-rules.js`: cada registro tiene `id` (debe existir en `needDefs` de app.js), `phrases` y `risk`. Escribe frases en minúsculas, sin tildes, con guiones convertidos a espacios. No agregues IDs de productos o capacidades sin verificar su existencia y alcance en el catálogo. Añade pruebas positivas, negadas y ambiguas por cada cambio.

El motor normaliza Unicode, divide cláusulas y busca frases con límites de palabra. Las menciones técnicas explícitas del diccionario se aceptan como evidencia declarada; el lenguaje comercial se reconoce mediante frases. Las negaciones cercanas suprimen coincidencias salvo la expresión «no sabemos quién ingresa/entra», que expresa falta de visibilidad. Las necesidades suman; no hay clasificación exclusiva. Cada coincidencia aporta dos puntos hasta cinco por necesidad. El indicador es Media o Alta según acumulación de evidencia; sin necesidades es Insuficiente. No es una probabilidad ni una certificación.

Las menciones de IA activan necesidades shadow, data, agent o prompt según contexto. No seleccionan sus alternativas. Los únicos fabricantes y requisitos disponibles siguen siendo `AI_RULES`, `CONNECTIVITY_RULES`, `matching` y el catálogo originales. La asociación de productos del directorio requiere homologación técnica, como en la base.

## Datos
`facts` distingue valor explícito y desconocido (null). Extrae cifras y un conjunto limitado de números escritos en español. Cantidades contradictorias quedan pendientes; no se suman automáticamente. Los equipos se conservan como dato del análisis, porque la base no tiene campo de cantidad de endpoints. La nube y aplicaciones privadas se detectan mediante frases positivas. No se infiere una cantidad de usuarios remotos a partir de la mera existencia de trabajo remoto.

`merge` conserva los estados previos. La construcción actualiza cantidades explícitas y no borra cantidades confirmadas por el comercial o por una construcción anterior. Los valores de demostración de la base que no se confirmaron se sustituyen por cero como centinela heredado; el análisis explica su condición desconocida. La vista multisede original conserva el total y limita la representación a cuatro sedes. El almacenamiento/exportación serializa la interpretación en `smartArchitect`; el texto de entrada se conserva solo al guardar/exportar localmente.

## Seguridad
Límite de 4000 caracteres y validación de tipo/entrada vacía. La interfaz usa textContent y createTextNode, sin insertar HTML comercial ni ejecutar instrucciones. No hay fetch, modelos, SDKs, llamadas a APIs ni librerías remotas para interpretar. El análisis no modifica catálogos ni sistemas externos. El almacenamiento local y las descargas existentes siguen bajo control del usuario.


## Corrección 0.10.1: tolerancia y patrones
`MC_SMART_TERMS` en smart-rules.js configura alias técnicos. `canonicalize` aplica esos alias y, solo sobre los términos técnicos autorizados con al menos siete letras, una distancia de edición máxima de uno. Una coincidencia debe ser única. No se corrige libremente el lenguaje general. El resultado incluye `corrections` y la interfaz expone cada sustitución para revisión del comercial.

Cada regla admite `patterns`: expresiones regulares locales con distancias acotadas y combinaciones de acción/activo, además de `phrases`. Se evalúan todas las apariciones; se conserva la evidencia encontrada. El diccionario amplía secuestro de archivos, correo sospechoso, datos compartidos, conectividad, teletrabajo, accesos, aplicaciones y monitoreo. La falta explícita de copias de seguridad y solicitudes preventivas como «no queremos sufrir ransomware» se reconocen como necesidades. Las negativas de necesidad siguen excluyendo coincidencias.

Ejecutar `npm run test:unit` incorpora smart-language.cjs con frases comerciales y controles negativos. Los patrones deben agregarse solo por desarrolladores y acompañarse de pruebas para limitar falsos positivos. Sigue siendo un clasificador determinista finito; debe revisarse el resultado antes de construir.


## Integración de acción en v0.10.1
La acción principal ahora es «Diseñar solución». `analyze.onclick` ejecuta interpretación y, si `canBuild`, aplica inmediatamente el resultado al estado y llama a `render()` original. El botón smartBuild se conserva por compatibilidad de ID, pero ahora solo navega al diagrama. No hace falta pulsarlo para construir.

Se actualizan st.chosen, contexto, ai.enabled, st.focus y st.scenarioNeed; se reinician filtros para dejar visibles los controles. getScenario utiliza la necesidad activa y mantiene la primera seleccionada como fallback. scenarioNeed se guarda y restaura con el diseño. Las vistas mesh usan el modo de amenaza adecuado. La cantidad de sedes incorpora el activo branch al motor original sin inferir conectividad SD-WAN; drawContextMarkers original limita sus indicadores a cuatro. El resumen breve queda sobre el laboratorio y los detalles dentro de un elemento details cerrado por defecto.

Las aclaraciones para indisponibilidad son opciones explícitas del comercial, añadidas al texto y reanalizadas por el mismo flujo. No alteran arquitectura hasta que hay una necesidad reconocida. La simulación requiere su propio clic para iniciar la animación; queda preparada tras diseñar.

`tests/smart-engine.cjs` carga catalogo.js, smart-rules.js, smart.js y app.js completos en VM con DOM en memoria: no sustituye render, renderGraph, renderMesh, controles ni eventos. Verifica elementos SVG y enlaces, ocho sedes y controles endpoint, cuatro sedes visibles en mesh para un total de doce, una etapa de simulación original, conservación de exclusiones y resolución interactiva de ambigüedad. No mide layout ni temporización real del navegador.


## v0.10.2: portafolio como referencia explícita
La carga es catalogo.js → portfolio.js → smart-rules.js → smart.js → app.js → handoff.js. portfolio.js aporta necesidades, capacidades y relaciones que app.js incorpora antes de renderizar, sin un motor alternativo. matching consulta asociaciones explícitas y no regex por nombre. El análisis agrega productMentions por alias validados en contexto positivo. recommend cruza las capacidades efectivamente activas con el mapa y filtra IA por necesidad soportada. Cada alternativa conserva su fuente; las mencionadas se muestran primero, sin selección automática.

Las tarjetas de alternativas están después del canvas. Usar en diseño actualiza st.vendors o ai.selected, aplica plantilla de conectividad solo cuando corresponda, llama a render original y agrega el ID al expediente MC_PREVENTA. Las exclusiones no se restablecen. Las cantidades desconocidas permanecen pendientes. El objetivo se copia a Preventa si su campo está vacío; nunca sobrescribe un objetivo ya redactado.

Los datos originales del directorio se conservaron y los complementos IA tienen IDs mc-ai-sophos, mc-ai-guardian y mc-ai-cato. Las referencias web del catálogo son datos para revisión, no conexiones de interpretación. No se generan asociaciones a partir de cross-sell, prioridades, instrucciones en celdas o textos comerciales ejecutables.
