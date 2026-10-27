# MC CYBERVERSE — Ruta a versión 1.0

## Evaluación actual
Versión 0.9.4: laboratorio comercial avanzado y candidato a piloto interno. Incluye arquitecturas por necesidades, fabricantes, simulaciones, estrategia descriptiva y expediente local de levantamiento. No está validado como sistema productivo multiusuario.

El backend real es un servidor FastAPI de estáticos y dos endpoints informativos. No hay autenticación, roles, base de datos, historial de servidor ni gestión compartida de oportunidades. El guardado actual conserva un diseño en el navegador, no una cartera de clientes. El ID del informe es una referencia local y no constituye trazabilidad central.

## Prioridad 1 — Expediente y flujo comercial
Implementado en 0.9.4: datos de contacto/comercial y contexto, notas de discovery, productos a evaluar desde catálogo o arquitectura, estados existentes/excluidos, pendientes y generación TXT/HTML/JSON. La generación no envía mensajes ni valida ingeniería automáticamente.

Para 1.0: almacenar varios clientes y oportunidades; asignar comercial y preventa; estados Borrador → Pendiente de Preventa → Requiere información → Validado; revisión con responsable, fecha e historial. Permitir retomar una oportunidad sin sobrescribir otra.

Aceptación: dos comerciales trabajan en clientes distintos, conservan expedientes tras cerrar sesión y Preventa puede consultar una versión concreta sin cambiar la anterior.

## Prioridad 2 — Acceso y separación
Integrar identidad corporativa y roles Comercial, Preventa y Administración. Validar permisos en servidor y acceso por cliente/oportunidad. Gestionar sesión, cierre y recuperación de acceso según la identidad corporativa. No basta esconder botones en el navegador.

Aceptación: pruebas con identidades y roles distintos demuestran que un usuario no accede ni modifica oportunidades sin autorización.

## Prioridad 3 — Persistencia y trazabilidad
Usar MySQL compartido con base y usuario propios de Cyberverse, migraciones versionadas y permisos mínimos. Conservar clientes, oportunidades, versiones de arquitectura, preguntas/respuestas y referencias de productos. Definir respaldos y recuperación de esos datos. Registrar quién modifica, genera y valida cada expediente.

Aceptación: una restauración probada recupera los expedientes y la auditoría permite identificar responsable y versión. No modificar bases de otros cotizadores.

## Prioridad 4 — Estrategia comercial y reglas homologadas
Completar una matriz Red/Usuario/Aplicaciones/Operación × Prevenir/Detectar/Responder/Recuperar. Distinguir Propuesto, Existente declarado, Validado, Excluido y Por confirmar. Explicar brechas con preguntas de discovery y próximos pasos; no agregar productos automáticamente ni convertir el índice en porcentaje de seguridad real.

Asignar responsables de contenido MC a fichas, reglas y fuentes por fabricante, incluyendo versión/fecha de revisión. Validar con Producto/Preventa dependencias, licencias, alcance y canales soportados. El documento mc-quote-creator_para_IA.md debe suministrarse para comprobar el estándar corporativo completo.

Aceptación: cada recomendación tiene necesidad, alcance, dependencia, fuente y validación responsable. Los controles no presentes en una ruta no reciben atribuciones de detección.

## Prioridad 5 — Validación de despliegue y operación
Montar entorno de prueba con Docker/Compose, red mc-net, Nginx compartido, HTTPS, variables de entorno y base propia. Verificar autenticación, permisos, persistencia, rutas con prefijo, respaldos, logs y recuperación. Fijar y revisar dependencias que efectivamente se desplegarán. Probar exportación, impresión y sesiones reales en los navegadores corporativos.

Aceptación: despliegue reproducible, pruebas funcionales de extremo a extremo en servidor y aceptación de Comercial, Preventa e Infraestructura. La validación local del frontend no sustituye estas pruebas.

## Orden propuesto
Primero cerrar y probar el levantamiento con dos o tres comerciales y Preventa. Después identidad, expediente central y estados de revisión. Finalmente matriz estratégica, homologación y validación de infraestructura. Versionar como 1.0 cuando esos criterios de aceptación se cumplan; evitar añadir simulaciones nuevas antes de cerrar el flujo completo.
