# Documentación histórica hasta v0.8.2

## Actualización v0.8.2

- Máximo cuatro sedes gráficas; sedes restantes conservadas en contexto, sin sugerir límite técnico de la solución.
- Zonas reorganizadas para evitar solapamientos de usuarios remotos y respaldos.
- Tres capacidades de seguridad de IA: Sophos AI Defense, CrowdStrike Falcon Guardian, Cato AI Security, sujetas a alcance y homologación.
- Tres recorridos ilustrativos de IA: uso de datos, agente de IA y prompt injection.
- SD-WAN se muestra con rutas de transporte y overlay; no se atribuye firewall implícito.
- Los porcentajes son ilustrativos, no una medición del riesgo real.

# MC CYBERVERSE v0.8 — Laboratorio multisede y ataques didácticos

# MC CYBERVERSE v0.7 — Laboratorio Dinámico

# MC Cyberverse v0.6.2 — corrección de logos

# MC Cyberverse v0.5 — Laboratorio Dinámico

## Probar inmediatamente
1. Descomprime el ZIP.
2. Abre `web/index.html` en Chrome o Edge. La aplicación utiliza JS/CSS nativos y un catálogo precargado; **no requiere conexión a Internet ni instalación de npm**.
3. Selecciona una o varias necesidades comerciales. El lienzo comienza vacío y la arquitectura se genera al seleccionar una necesidad.
4. Pulsa «Simular escenario» o «Siguiente etapa». Haz clic en un nodo para consultar la ficha comercial.
5. Activa «Mostrar fabricantes» para consultar los 36 registros del directorio MC 2026.
6. Usa «Resumen comercial», «Guardar en navegador» o «Exportar JSON».

## Funcionalidades
- Laboratorio único. No hay módulo de construcción manual ni conexiones de telemetría exigidas al comercial.
- 12 necesidades de seguridad y motor determinista de capacidades y conexiones automáticas.
- 28 tipos de capacidades; relaciones etiquetadas (tráfico, telemetría, respuesta); nodos seleccionables.
- 5 etapas de simulación por necesidad, bitácora, animación de rutas y resaltado de riesgo.
- Fichas técnicas y comerciales de capacidades, preguntas de descubrimiento, valor y enlaces conceptuales a productos.
- 36 registros documentales del directorio de productos aportado por MC.
- Filtros visuales, búsqueda de productos, generación de resumen, exportación JSON y guardado local.

## Ejecución local con FastAPI (opcional)
Desde la carpeta del proyecto:
```bash
python -m venv .venv
# activar el entorno
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Abrir http://127.0.0.1:8000. La ruta `GET /health` proporciona el estado de servicio.

## Docker en infraestructura MC (solo infraestructura autorizada)
Requisitos: Docker/Compose, Nginx compartido, red externa `mc-net` creada. Este paquete no despliega MySQL ni Nginx nuevos. Copia `.env.example` a `.env`, confirma `ROOT_PATH=/cyberverse`, crea la red si infraestructura aún no la creó y ejecuta `docker compose up -d --build`. Integra `nginx/cyberverse.location.conf` en la configuración Nginx existente después de revisarla. Verifica la salud desde la red del contenedor.

**No desplegar como sistema multiusuario de producción.** Esta versión no tiene login, RBAC, persistencia de servidor, historial de auditoría, API de edición ni base de datos. Para operación corporativa se requieren autenticación y autorización, gobernanza del catálogo, control de acceso por cliente, bitácoras y verificación de integraciones. El guardado actual es local al navegador.

## Fuente y límites
Las fichas de fabricante provienen de `Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx`; copia trazable: `web/catalogo.json`. Estas descripciones **no equivalen a verificación vigente de licencias, compatibilidad o disponibilidad**. Los escenarios no ejecutan malware ni inspeccionan redes reales. Las reglas de generación son modelos didácticos para discovery/preventa, no dimensionamientos finales.

## Seguridad
Evita introducir datos personales o secretos reales en la demo. No subas arquitecturas confidenciales a dispositivos compartidos. El `localStorage` permanece accesible al perfil local del navegador. Publicar detrás de Nginx sin autenticación dejaría expuesta la demo a cualquier usuario con acceso a la ruta; restringir el acceso hasta incorporar autenticación.


## Corrección v0.5.1
Se corrigió la visibilidad de `svg#topology`: el atributo SVG `hidden` ahora se agrega y elimina mediante `setAttribute` / `removeAttribute` en lugar de asignar la propiedad `hidden`. Soluciona el lienzo en blanco mientras se generan fichas, bitácora y capacidades. Se mantienen todas las funciones de v0.5.


## Cambios de v0.6
- Personalización por capacidad: propuesta, existente, excluida. No se dibujan conexiones manualmente.
- Índice ponderado **de cobertura de controles del escenario**, calculado respecto a los controles de referencia de cada necesidad; es ilustrativo, NO representa un nivel real de seguridad ni reducción cuantificada del riesgo.
- Alternativas del directorio seleccionables por componente mediante la ficha lateral. Son asociaciones preliminares, no integraciones verificadas.
- JSON exportado conserva controles, fabricantes y cobertura. Para probar: seleccionar ransomware, excluir MFA, comprobar que desaparece, reasignarlo como existente y guardar/exportar.


## Cambios v0.6.1
- Internet se renderiza siempre como referencia del entorno, aun sin necesidades seleccionadas; no se dibujan flujos de red inventados.
- Endpoint protegido se denomina «PC de usuario». Los activos del entorno no se ofrecen como controles excluibles y no se contabilizan en el índice de cobertura.
- EPP/EDR/DLP continúan como capacidades independientes, opcionales según la propuesta.
- Al seleccionar alternativas, el nodo conserva el nombre textual del fabricante y solicita su logotipo vía Simple Icons CDN cuando existe; requiere conectividad y el logotipo puede no estar disponible. No se empacan ni se modifican logotipos oficiales. Validar permisos y obtener assets de marca autorizados antes de producción.
- La carga JSON acepta el esquema previo de la v0.5; nuevas exportaciones utilizan mc-cyberverse-0.6.1.
- Las asociaciones por expresión regular entre catálogo y capacidades siguen siendo indicativas, no homologadas.


## Corrección v0.6.2
En v0.6.1 el proveedor CDN externo podía devolver 404 o ser bloqueado por el navegador. La nueva versión consume logos locales desde `web/assets/brands/`. Cuando un archivo falta se muestra el nombre de la marca dentro de una insignia visual, sin imágenes rotas. Se mantienen arquitectura, simulación y selección de fabricantes. La aplicación es usable inmediatamente, pero **para ver logotipos oficiales debe copiar los SVG autorizados a esa carpeta**.


## Novedades v0.6.3
- SD-WAN, SASE y SSE separados por escenario.
- Selector de plantilla genérica, Cato Networks o Fortinet para conectividad.
- Internet se usa como nodo de paso en conectividad a Internet; no se obliga a vincularlo en rutas privadas.
- El número de sedes y de usuarios remotos aparece en nodos y barra de estado (modelo agregado, no dimensionamiento ni despliegue de N sedes).
- Dominios y fases atenúan los componentes fuera de filtro.
- Los fabricantes se representan por nombre; no se simulan logos que no están incluidos.


## Corrección 0.6.4: sincronización del fabricante SASE

- Los cambios de marca realizados desde la ficha técnica actualizan el selector de arquitectura y reconstruyen la topología.
- El selector de conectividad es la fuente única de verdad para la plantilla Cato/Fortinet.
- Las arquitecturas importadas restauran el fabricante de conectividad.
- La selección de marca identifica una plantilla didáctica, no valida por sí misma licencias ni integraciones.

## Parche de estabilidad v0.6.5

Se eliminó una referencia JavaScript a `d.connectivityVendor` fuera de su contexto que provocaba un `ReferenceError` al seleccionar necesidades y detenía el renderizado interactivo. Se conservan los ajustes de sincronización del fabricante. Prueba recomendada: seleccionar SASE para sedes y alternar Cato Networks, Fortinet y genérico.

## Cambios en v0.7
- Logo MC 20 años incluido localmente en `web/assets/media-commerce-20-anios.png`, aportado por el usuario.
- Identidad MC CYBERVERSE, interfaz oscura Matrix corporativa.
- Contexto de sedes, usuarios, remotos y tipo de aplicaciones afecta las etiquetas y visualización de arquitectura. Muestra hasta cinco sedes y el resto agrupado; **no dimensiona** hardware ni elige licencias.
- Cuatro fases usadas como filtros y resumen de contribuciones de controles. No se debe presentar como medida de seguridad real.
- Se preserva Cato/Fortinet por plantillas de conectividad y separación SD-WAN/SASE/SSE.


## Nuevo en v0.8

- Selecciona **SASE para sedes** y **Cato Networks**, ingresa 4 sedes, y verás cuatro pares sede/Socket, dos PoPs pedagógicos y la conexión **Cato Backbone**. Las ubicaciones PoP A/B son conceptuales; no indican PoPs concretos ni rutas garantizadas.
- Cambia a **Fortinet** para mostrar FortiGate y FortiSASE sin afirmar que todas las implementaciones siguen la misma ruta.
- En **Recorrido que deseas demostrar** elige conexión entre sedes, SaaS, remoto o uno de cinco eventos maliciosos. Pulsa **Animar recorrido**.
- El ransomware y las otras amenazas son simulaciones visuales sin ejecución de malware ni generación de tráfico real. El sistema solo atribuye controles de detección si figuran dentro de las capacidades habilitadas.
- Para ver una alerta EDR en el escenario, agrega además **Defensa contra ransomware** (la capacidad EDR debe permanecer incluida). Si se excluye, el simulador no afirma protección EDR.
- Se conservan el logo, las fases, dominios, personalización, directorio y empaquetado Docker/Nginx.

**Límite:** no se modelan BGP, rutas reales entre PoPs, ancho de banda ni dimensionamiento. Los gráficos son educativos y requieren homologación de preventa antes de usarse como arquitectura final.


## v0.8.1 — Correcciones del laboratorio multisede

- Las necesidades SASE y ransomware se combinan en una **misma topología**. EPP/EDR, SOC/MDR y backup solo se representan cuando están incluidos o existentes (no excluidos).
- Cato muestra un PoP compartido para 1-3 sedes; con 4-8 sedes, el ejemplo conceptual reparte las sedes entre dos PoPs y muestra el **backbone entre PoPs**. El reparto es didáctico, no un cálculo de localización ni de selección real de PoP.
- Acceso a aplicación privada de sede principal, simulación normal de sede 3 a sede 1 y ransomware originado en la sede 3. La animación verifica que cada tramo tenga un enlace modelado.
- Ransomware es **ejecución local** en un endpoint: el tráfico de alerta EDR → SOC se diferencia del intento de propagación lateral y depende de controles habilitados.

### Prueba

1. Configurar cuatro sedes y remotos, elegir SASE para sedes y Cato Networks.
2. Seleccionar también Defensa contra ransomware. Verificar que existan EDR, EPP, SOC/MDR y respaldo junto con PoPs, Sockets y backbone.
3. Elegir recorrido **Sede 3 → Sede 1**, luego **Remoto → app privada**, y finalmente **Ransomware en sede 3**.
4. Excluir EDR; la simulación deja de atribuir detección EDR.
5. Seleccionar una sola necesidad para comprobar que la topología sigue funcionando.


## Actualización v0.8.2

- Máximo cuatro sedes gráficas; sedes restantes conservadas en contexto, sin sugerir límite técnico de la solución.
- Zonas reorganizadas para evitar solapamientos de usuarios remotos y respaldos.
- Tres capacidades de seguridad de IA: Sophos AI Defense, CrowdStrike Falcon Guardian, Cato AI Security, sujetas a alcance y homologación.
- Tres recorridos ilustrativos de IA: uso de datos, agente de IA y prompt injection.
- SD-WAN se muestra con rutas de transporte y overlay; no se atribuye firewall implícito.
- Los porcentajes son ilustrativos, no una medición del riesgo real.

# MC CYBERVERSE v0.7

La arquitectura sigue en modo demostración estático+FastAPI. Cambios técnicos: función `context()`, marcadores `drawContextMarkers()`, semántica `contributions` por fases, `renderStrategy()` y gestión de `appType`. Se usan reglas de referencia: no garantizan interoperabilidad ni dimensionamiento. El índice numérico es ilustrativo y no un porcentaje de protección real.

# Nota v0.6.2 — activos de marca locales

Los logos oficiales son activos gestionados por MC y deben instalarse en `web/assets/brands/` con los nombres descritos en su README. El código ya no hace peticiones a CDN para marcas. El fallback nunca se presenta como logo oficial.

# Manual técnico — MC Cyberverse v0.5

## Arquitectura
Front-end JavaScript nativo + SVG y CSS de tema SOC oscuro; backend FastAPI 0.5 con archivos estáticos y healthcheck. Un solo contenedor opcional en red externa `mc-net`, tras Nginx compartido con prefijo `/cyberverse`. Se usa el estándar de imagen MC como base de marca; los colores rojo, violeta y cian tienen un significado operacional y no sustituyen los colores corporativos del logo.

## Modelo de datos
`web/catalogo.json` (y archivo equivalente `catalogo.js` para modo `file://`) contiene 36 registros importados del directorio. Los campos originales incluyen fabricante, producto, actor, fases, funcionamiento, fortaleza, segmento, cliente ideal, momento comercial, cross-sell y prioridad. El estado de validación del documento se conserva; las asociaciones a capacidades son heurísticas de demo.

En `web/app.js`:
- `needDefs`: 12 necesidades comerciales y narrativa de 5 etapas por escenario.
- `caps`: catálogo de 28 capacidades (definición, dominio, fase, argumento comercial, pregunta de descubrimiento).
- `relations`: enlaces automáticos entre capacidades con tipos `trafico`, `telemetria`, `respuesta`.
- `allCaps()` y `uniqueEdges()`: unión sin duplicaciones entre varias necesidades seleccionadas.
- `positions()`: distribución gráfica automática del SVG, sin edición manual.
- `renderDetail()`: ficha de capacidad; `renderCatalog()` muestra registros de fabricante.
- `serial()` y `restore()`: esquema de exportación/recuperación de diseños de v0.5.

## Límites del simulador
La animación es didáctica y no opera con paquetes reales; el sensor EDR está representado como nodo lógico, pero se instala en el endpoint. Un enlace de respuesta no implica automatización operativa, ni una ruta SASE supone inspección universal. La unión de arquitecturas es conceptual; requiere un motor posterior de validación por fabricante, licencias, servicios administrados y configuración real.

## Seguridad y operaciones
No se incluye autenticación ni BD en esta demo. Por tanto, solo es adecuada para laboratorio local o publicación restringida de pruebas. Para versión productiva incorporar identidades corporativas, RBAC, separación por clientes, validación de entradas, versionado, auditoría, CSP, CSRF según arquitectura, controles de sesión, protección de datos y aprobación de contenido de Producto/Preventa. No se guardan credenciales en el código. `ROOT_PATH` se declara en `.env`.

## Pruebas realizadas
Se verificó sintaxis estática con Node (`node --check web/app.js`) y Python (`python -m py_compile app/main.py`), y estructura JSON con Python. La prueba automatizada mediante Chromium headless no llegó a completar en este entorno, por lo que falta revisión visual y funcional manual en Chrome/Edge.

## Cambios desde v0.4
1. Laboratorio único, sin enlace externo a constructor manual.
2. Arquitectura inicialmente vacía.
3. Generación automática por necesidades; enlaces sin configuración del comercial.
4. Unión de múltiples necesidades sin duplicar capacidades.
5. Fichas comerciales enriquecidas y directorio documental de 36 productos.
6. Simulación guiada sin errores de enlaces de telemetría.
7. Nueva exportación JSON y resumen comercial.


## Motor v0.6
Los overrides de capacidades tienen tres estados: `propuesto`, `existente`, `excluido`. Una exclusión elimina el nodo y los enlaces incidentes. El indicador de cobertura es la suma de pesos didácticos de los controles recomendados no excluidos sobre el total de pesos recomendados por las necesidades, excluyendo componentes de infraestructura. No mide madurez ni efectividad de un despliegue. Fabricantes opcionales se muestran como alternativa documental y se exportan con el diseño; requieren homologación previa.


## Cambios v0.6.1
- Internet se renderiza siempre como referencia del entorno, aun sin necesidades seleccionadas; no se dibujan flujos de red inventados.
- Endpoint protegido se denomina «PC de usuario». Los activos del entorno no se ofrecen como controles excluibles y no se contabilizan en el índice de cobertura.
- EPP/EDR/DLP continúan como capacidades independientes, opcionales según la propuesta.
- Al seleccionar alternativas, el nodo conserva el nombre textual del fabricante y solicita su logotipo vía Simple Icons CDN cuando existe; requiere conectividad y el logotipo puede no estar disponible. No se empacan ni se modifican logotipos oficiales. Validar permisos y obtener assets de marca autorizados antes de producción.
- La carga JSON acepta el esquema previo de la v0.5; nuevas exportaciones utilizan mc-cyberverse-0.6.1.
- Las asociaciones por expresión regular entre catálogo y capacidades siguen siendo indicativas, no homologadas.


## Reglas v0.6.3 — conectividad
- **SD-WAN**: sede → edge SD-WAN → Internet → SaaS, ilustrativo de acceso a SaaS. No incluye SASE ni NGFW como dispositivo adicional obligatorio.
- **SASE con Cato**: sede → Socket/SD-WAN conceptual → Internet/transporte → PoP de Cato → SaaS; no añade firewall físico separado.
- **SASE con Fortinet**: sede → FortiGate/NGFW → SD-WAN → Internet/transporte → FortiSASE → SaaS, ejemplo que requiere validar licencia, versión y despliegue.
- **SSE**: conectividad existente → Internet/transporte → servicio SSE → SaaS.
Las rutas representan flujos lógicos didácticos, no conexiones físicas exactas. Fabricantes no equivalen a integraciones homologadas.
**Limitación**: el contexto altera contadores y etiquetas y no genera automáticamente un nodo por sede; los usuarios remotos se muestran como agregado. Los filtros de dominios y fases atenuan nodos, no rediseñan la arquitectura.


## Corrección 0.6.4: sincronización del fabricante SASE

- Los cambios de marca realizados desde la ficha técnica actualizan el selector de arquitectura y reconstruyen la topología.
- El selector de conectividad es la fuente única de verdad para la plantilla Cato/Fortinet.
- Las arquitecturas importadas restauran el fabricante de conectividad.
- La selección de marca identifica una plantilla didáctica, no valida por sí misma licencias ni integraciones.

## Incidencia corregida v0.6.5

En `renderNeeds`, se eliminó un acceso inválido a una variable `d` que solo corresponde al argumento de `restore(d)`. El fallo se producía al pulsar una necesidad; no es detectable por `node --check` porque es un error en tiempo de ejecución.


## v0.8 Motor multi-sede

La capa `renderMesh()` genera los nodos como función de `context().sites`, distingue Cato/ Fortinet y añade capas WAN, túnel y backbone. La capa `animateMesh()` usa solo objetos locales de SVG y `requestAnimationFrame`. No crea tráfico de red. Las capacidades de seguridad se verifican con `allCaps()` y `controlState()`. Las líneas ilustran rutas conceptuales; los PoPs no son ubicaciones ni garantías de encaminamiento.


## Correcciones 0.8.1

En el laboratorio multisede se generan primero activos y conectividad, después los controles de TODAS las necesidades seleccionadas. El modelo diferencia: tráfico WAN, túnel, backbone, telemetría y respuesta. La elección de PoP es ejemplificativa; no simula geolocalización ni el enrutamiento real de Cato. En ransomware, la detección se atribuye a un sensor EDR **en el endpoint**, no a la inspección de túneles de SASE. Las acciones de respuesta y backup dependen de la disponibilidad y configuración de esos servicios.
