# MC CYBERVERSE v0.9.1

## Corrección v0.9.1: arquitectura y animación de endpoint IA

- Sophos: PC del colaborador → actividad de IA → agente Sophos EDR → Fusion → AI Defense. La arquitectura añade Sophos EDR automáticamente como base mínima de la propuesta MC, siguiendo el requisito comercial del usuario. Se puede declarar existente. Si se excluye, IA pierde cobertura y no se reproduce una detección válida.
- CrowdStrike: PC → agente de IA → herramienta/MCP; sensor Falcon → Guardian → consola Falcon. Se diferencia la acción del agente de la telemetría del endpoint y de la respuesta condicionada a políticas.
- Paneles visuales propios, etapas explicadas, controles resaltados durante la animación y partículas de colores: actividad cian, intento riesgoso rojo, telemetría morada y política/respuesta naranja. «Siguiente etapa» avanza una fase.
- Las vistas de IA de endpoint por sí solas no añaden SD-WAN artificial. En escenarios combinados se conservan sedes, PoPs, ransomware y controles independientes.
- La ruta Cato conserva su modelo de acceso, PoP e integraciones. Cambiar desde Sophos/Guardian elimina la dependencia automática del fabricante anterior sin afectar otras necesidades.
- Una fila por necesidad es una vista lógica; varias filas Sophos no implican varios agentes físicos ni licencias duplicadas.

Abrir `web/index.html`. Pruebas: `npm install` y `npm test` (Chrome instalado; puede indicarse otra ruta con CHROME_PATH).


## Referencia heredada v0.9.0

# MC CYBERVERSE v0.9.0
Laboratorio Dinámico de Estrategia de Ciberseguridad.

## Ejecutar
Descomprime el ZIP y abre `web/index.html` en Chrome o Edge. Funciona sin npm, servidor ni conexión a Internet. El logo corporativo original permanece sin modificaciones.

Opcional con FastAPI:
```sh
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Abre http://127.0.0.1:8000. `/health` y `/api/v1/info` informan versión 0.9.0.

## Seguridad de IA
1. Selecciona «Uso seguro de inteligencia artificial».
2. Marca una o varias necesidades específicas: Shadow AI, datos en prompts/archivos, agentes autónomos o aplicaciones frente a prompt injection.
3. Selecciona una alternativa compatible para cada necesidad. Sin alternativa no se atribuye cobertura.
4. Cambia la alternativa para reconstruir nodos y conexiones. Las necesidades se acumulan; varios fabricantes aparecen únicamente si se seleccionaron explícitamente para necesidades distintas.
5. Usa el selector de recorrido y «Animar recorrido». Excluir el control retira su ruta y la detección ilustrativa.

| Necesidad | Alternativas modeladas | Despliegue |
| --- | --- | --- |
| Shadow AI | Sophos, Cato | Sensores/Fusion o acceso selectivo a PoP |
| Datos en prompts/archivos | Sophos, Cato | Sensores/canales cubiertos o acceso selectivo a PoP |
| Agentes autónomos | Guardian, Cato | Runtime endpoint o integración específica de agentes |
| Aplicaciones frente a prompt injection | Cato | Integración de aplicación; no se infiere a partir de SASE |

Esta matriz delimita las plantillas implementadas, no afirma exclusividad comercial de los fabricantes. Disponibilidad, licencias, sensores y políticas deben homologarse.

## Funcionalidades conservadas y correcciones
- Catálogo local, cuatro dominios y fases, fichas comerciales, resumen, persistencia local y exportación JSON.
- SASE/SD-WAN/SSE y ransomware combinables con IA; controles adicionales de las demás necesidades permanecen visibles.
- Cato Socket/Client, Internet y PoP para tráfico IA de usuarios. Aplicaciones y agentes utilizan integraciones independientes.
- Backbone azul entre PoPs para tránsito privado cuando corresponde. SaaS sale del PoP local sin forzar otro PoP.
- FortiGate Secure SD-WAN diferenciado de FortiSASE. Recomendación SASE para SD-WAN Cato.
- Máximo cuatro sedes visibles; las restantes quedan agrupadas como referencia sujeta a dimensionamiento.
- Corrección de curva SVG, filtros de fase multisede, controles de simulación y exportación de rutas reales del modelo.
- Diseños anteriores se recuperan sin reactivar automáticamente los tres productos de IA: deben elegirse necesidades y alternativas.

## Docker / infraestructura MC
Se conserva Dockerfile no root, Compose con red externa `mc-net`, Nginx compartido y variables de entorno. Copia `.env.example` a `.env`; usa `docker compose up -d --build` en infraestructura autorizada y revisa `nginx/cyberverse.location.conf` para el Nginx existente. No se crean bases, tablas ni usuarios MySQL: la demo no tiene persistencia de servidor. No se modificaron otros cotizadores.

## Validación y límites
28 pruebas automatizadas de navegador aprobadas en Chrome headless mediante Playwright; evidencia en `tests/results.json` y `tests/architecture.png`. Se verificaron sintaxis JavaScript y Python. Consulta `PRUEBAS.md` para reproducción y resultados de backend.

Docker/Compose no se ejecutó: Docker no está instalado. No se suministró `mc-quote-creator_para_IA.md`; la conformidad exacta con ese documento queda pendiente. La demo no tiene autenticación, RBAC, auditoría de servidor ni MySQL. No ejecuta tráfico ni malware reales.

Los nodos adicionales sin ruta explícita se muestran como controles independientes. No se atribuyen detecciones DLP/MFA/WAF/DDoS en recorridos multisede que no pasan por esos controles. Las topologías no calculan geografía, capacidad, BGP ni licencias. Los PoPs dedicados a IA son representaciones lógicas de inspección y no implican otra ubicación física.

Fuentes y reglas: `FUENTES_IA.md`. Detalle de implementación: `MANUAL_TECNICO.md`. Documentación anterior: `HISTORIAL.md`.


# MC CYBERVERSE v0.9.1

## Corrección v0.9.1: arquitectura y animación de endpoint IA

- Sophos: PC del colaborador → actividad de IA → agente Sophos EDR → Fusion → AI Defense. La arquitectura añade Sophos EDR automáticamente como base mínima de la propuesta MC, siguiendo el requisito comercial del usuario. Se puede declarar existente. Si se excluye, IA pierde cobertura y no se reproduce una detección válida.
- CrowdStrike: PC → agente de IA → herramienta/MCP; sensor Falcon → Guardian → consola Falcon. Se diferencia la acción del agente de la telemetría del endpoint y de la respuesta condicionada a políticas.
- Paneles visuales propios, etapas explicadas, controles resaltados durante la animación y partículas de colores: actividad cian, intento riesgoso rojo, telemetría morada y política/respuesta naranja. «Siguiente etapa» avanza una fase.
- Las vistas de IA de endpoint por sí solas no añaden SD-WAN artificial. En escenarios combinados se conservan sedes, PoPs, ransomware y controles independientes.
- La ruta Cato conserva su modelo de acceso, PoP e integraciones. Cambiar desde Sophos/Guardian elimina la dependencia automática del fabricante anterior sin afectar otras necesidades.
- Una fila por necesidad es una vista lógica; varias filas Sophos no implican varios agentes físicos ni licencias duplicadas.

Abrir `web/index.html`. Pruebas: `npm install` y `npm test` (Chrome instalado; puede indicarse otra ruta con CHROME_PATH).


## Referencia heredada v0.9.0

# Manual técnico — v0.9.0

## Estructura
`web/app.js` conserva el motor JavaScript/SVG original; `catalogo.js/json` conserva el catálogo original. FastAPI sirve archivos y endpoints informativos; no hay API de escritura ni base de datos. Docker, Compose, Nginx y `.env.example` mantienen la arquitectura anterior.

## Motor de IA
`AI_RULES` contiene cuatro requisitos, modos de simulación, alternativas compatibles y alcance. `ai.enabled` conserva las necesidades activas y `ai.selected` la elección explícita por necesidad. `aiVendor()` rechaza asociaciones no admitidas.

Las capacidades `ai_need_shadow/data/agent/prompt` participan en controles, dominios, fases y cobertura. No se usan los tres productos como capacidades simultáneas implícitas. Una necesidad sin alternativa o con control excluido se registra como brecha. El índice sigue siendo didáctico.

`renderAI()` presenta selección por necesidad y alternativas; `renderMesh()` reconstruye controles y rutas. Sophos representa señales de sensores hacia Fusion; Guardian representa runtime de endpoint; Cato diferencia tráfico de usuarios mediante Socket/Client–Internet–PoP de integraciones de agentes y aplicaciones. No se crean enlaces de IA a SOC sin una integración configurada. Un PoP de IA es lógico; no representa un PoP físico adicional.

Los recorridos se validan tramo a tramo contra `routes`. La salida SaaS usa el PoP de origen. El tránsito a sede principal usa backbone solo entre PoPs distintos. La distribución de cuatro sedes entre dos PoPs es ilustrativa, no geolocalización.

Los controles de otras necesidades se conservan como nodos independientes cuando no tienen una ruta multisede homologada. No se infiere inspección por estar presentes fuera del recorrido. Las rutas DLP/MFA/WAF/DDoS de esa vista requieren desarrollo adicional para demostrar detecciones.

## Persistencia y compatibilidad
Esquema nuevo: `mc-cyberverse-0.9`. Mantiene la clave local `mc-cyberverse-v08` para recuperar datos anteriores. Añade `ai`, `topology` (nodos, enlaces, ruta y explicación) y `capabilityEdges`; `edges` corresponde al lienzo actual. Se admiten esquemas antiguos de v0.5 a v0.8. Los overrides antiguos de los productos IA no crean controles activos.

La restauración valida necesidades, estados, fabricantes de conectividad y alternativas de IA; no ejecuta contenido del JSON. Los textos de interfaz usan `textContent` donde reciben contenido variable. El guardado pertenece al perfil del navegador y no es almacenamiento seguro multiusuario.

## Operación
Instalación FastAPI, Docker y Nginx: README. La imagen corre como usuario no root con sistema de archivos de solo lectura y `/tmp` temporal en Compose. `ROOT_PATH` configura el prefijo. No se crearon recursos MySQL ni se tocaron cotizadores externos.

Para producción faltan autenticación, autorización, aislamiento por cliente, auditoría, persistencia de servidor y homologación técnica/comercial. No se verificó despliegue Docker ni compatibilidad con el documento corporativo ausente.

## Pruebas
`tests/browser.cjs`: 28 casos funcionales con Playwright y Chrome; contiene guardado, recuperación, migración, rutas válidas, IA por alternativa, exclusiones, filtros, sedes, backbone y combinación de necesidades. `tests/backend.py`: harness ASGI sin sockets para health, info, inicio y JavaScript. Evidencias y requisitos en `PRUEBAS.md`.
