# MC CYBERVERSE

**Versión 0.10.2 · Smart Architect**

Laboratorio comercial de ciberseguridad de Media Commerce. Interpreta necesidades mediante reglas locales y construye una arquitectura conceptual utilizando el motor existente. Incluye 36 productos del directorio MC y tres complementos de seguridad de IA. Los diseños están sujetos a revisión con Preventa.

## Probar la aplicación

1. Descarga este repositorio con **Code → Download ZIP** o clónalo.
2. Descomprime y abre `web/index.html` en Chrome o Edge.
3. Describe el problema y pulsa **Diseñar solución**.
4. Revisa el diagrama y sus alternativas. **Usar en diseño** aplica la opción elegida y la registra en el expediente de Preventa.
5. Inicia la simulación con el botón del laboratorio.

Ejemplo: «El cliente tiene 4 sedes y quiere SASE».

El laboratorio estático funciona sin instalar dependencias. El intérprete no usa modelos generativos, APIs externas ni servicios por tokens.

## Ejecutar con FastAPI

Requiere Python y las dependencias del proyecto:

```sh
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Abre http://127.0.0.1:8000. La configuración Docker y Nginx existente se conserva; revisa `MANUAL_TECNICO.md` antes de desplegar en infraestructura corporativa.

## Pruebas

Con Node.js instalado:

```sh
npm run test:unit
```

Esta suite no necesita dependencias de desarrollo y ejecuta interpretación, reglas comerciales y el motor completo con un DOM en memoria. Incluye los 39 productos, 36 problemáticas sin nombres comerciales, el caso de cuatro sedes/SASE y la integración con el expediente de Preventa.

Para las pruebas de navegador:

```sh
npm install
npx playwright install chromium
npm run test:smart
```

También se puede usar un navegador instalado indicando `CHROME_PATH`. Los scripts históricos de regresión aceptan `PLAYWRIGHT_MODULE` y `CHROME_PATH`. Consulta `PRUEBAS_SMART.md` para distinguir pruebas ejecutadas y validaciones pendientes.

La suite local de reglas/motor fue aprobada. La validación visual de navegador sigue pendiente: Edge se cerró al iniciar Playwright en el entorno de preparación. El backend, Docker y Nginx no se validaron integralmente allí.

## Estructura

- `web/`: aplicación y activos locales.
- `web/catalogo.json` y `web/catalogo.js`: catálogo de productos.
- `web/portfolio.js`: asociaciones explícitas entre productos, capacidades y necesidades.
- `web/smart-rules.js` y `web/smart.js`: diccionario e intérprete local.
- `app/`: servicio FastAPI.
- `tests/`: pruebas automatizadas.
- `nginx/`, `Dockerfile` y `docker-compose.yml`: configuración de despliegue.

## Documentación

- [Manual técnico](MANUAL_TECNICO.md)
- [Motor Smart Architect](SMART_ARCHITECT.md)
- [Portafolio y trazabilidad](PORTAFOLIO_Y_COBERTURA.md)
- [Pruebas y evidencia](PRUEBAS_SMART.md)
- [Límites del diseño](LIMITACIONES.md)
- [Fuentes de seguridad de IA](FUENTES_IA.md)

Los documentos de historial conservan referencias a versiones anteriores. Las capturas, informes de ejemplo y resultados generados por suites históricas no se versionan en este repositorio. No se incluye el Excel original ni expedientes reales de clientes.
