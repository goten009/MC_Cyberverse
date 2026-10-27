# Trazabilidad de reglas IA
Consultadas el 24 de octubre de 2026. Las plantillas son interpretaciones conservadoras de documentación pública; la prueba automatizada valida el simulador, no la eficacia de los productos.

- Sophos AI Defense: https://docs.sophos.com/fusion/customer/help/en-us/ManageYourProducts/AIDefense/index.html — monitorización/gobierno del uso de IA mediante sensores Sophos.
- Requisitos Sophos: https://docs.sophos.com/fusion/customer/help/en-us/ManageYourProducts/AIDefense/AIDefenseSetup/index.html — plataforma Fusion y sensores necesarios; no se presupone protección universal de todos los canales.
- CrowdStrike Falcon Guardian: https://www.crowdstrike.com/en-us/press-releases/crowdstrike-unveils-falcon-guardian-ai-agent-security/ — controles de agentes donde se ejecutan, en endpoint y runtime.
- Cato Shadow AI: https://support.catonetworks.com/hc/en-us/articles/34140925046685-What-is-Shadow-AI-Discovery — descubrimiento y gobierno del uso de IA.
- Cato DLP: https://support.catonetworks.com/hc/en-us/articles/26242635382813-Recommended-DLP-Configuration-to-Monitor-AI-Apps — protección de datos en canales cubiertos.
- Cato aplicaciones: https://www.catonetworks.com/platform/ai-security-for-applications/ — integración API/proxy para aplicaciones y agentes; no se deduce de una conexión SASE.
- Cato agentes: https://support.catonetworks.com/hc/en-us/articles/35502848130845-What-is-AI-Security-for-Agents — controles de flujos de agentes, prompt injection y exposición de datos según despliegue.

No se atribuye a Guardian el gobierno de Shadow AI ni la protección genérica de archivos en estas plantillas. No se ofrece Sophos como protección de aplicaciones propias contra prompt injection. Esto delimita el alcance modelado y no constituye una comparación exhaustiva del portafolio.


## Ampliación v0.9.1
La base mínima Sophos EDR se modela como requisito comercial MC aportado expresamente por el usuario. No se presenta esta regla de la propuesta como requisito universal de todos los despliegues del fabricante. Configuración y sensores se contrastaron con la documentación de setup de Sophos ya enlazada.

Para Guardian se consultaron además:
- https://www.crowdstrike.com/en-us/blog/falcon-guardian-defines-next-generation-of-ai-security/ — relación entre instrucciones, herramientas/MCP, runtime y telemetría de endpoint.
- https://www.crowdstrike.com/en-us/blog/why-organizations-secure-ai-agents-with-falcon-guardian/ — contexto del agente y acciones observadas sobre el equipo.

Las acciones de control se explican como condicionadas a agente, licencia y política compatibles. No se añade integración automática con un SOC externo.


## Corrección v0.9.2: modalidad por cliente de endpoint
Este apartado sustituye la interpretación anterior de Cato en la plantilla activa. La protección con Socket y la integración de aplicaciones siguen siendo otras modalidades documentadas; no son requisitos de la modalidad por cliente solicitada.

- https://www.catonetworks.com/platform/cato-client/ — cliente ligero que conecta al PoP para inspección próxima al usuario.
- https://knowledge.catonetworks.com/docs/premium-security — distingue AI Security for Users (con Cato Client y otras modalidades) de AI Security for Applications y sus integraciones.
- https://www.catonetworks.com/ — describe seguridad de IA como punto inicial focalizado y métodos de acceso que pueden coexistir con conectividad existente.

La plantilla modela exclusivamente el acceso de endpoint por cliente y políticas compatibles. No afirma que esta sea la única modalidad de Cato ni que baste para proteger aplicaciones propias sin integración específica.


## Transporte v0.9.3
- https://support.catonetworks.com/hc/en-us/articles/31934114341661-Cato-Socket-Link-SLA-Architecture — Cato describe su backbone privado global, la interconexión de PoPs y la distinción respecto de última milla.
- https://docs.fortinet.com/document/fortigate/7.2.0/sd-wan-sd-branch-architecture-for-mssps/772885/topologies-with-multiple-internet-links — Fortinet documenta transporte Internet y escenarios con MPLS. La plantilla de esta demo utiliza Internet y no pretende representar todas las posibilidades de Fortinet.

No se representan mejoras cuantificadas de velocidad, disponibilidad ni latencia. La diferenciación visual corresponde al tipo de transporte y al recorrido configurado.


## Revisión para v0.10.2 (26 de octubre de 2026)
Se consultaron nuevamente:
- Sophos AI Defense: https://docs.sophos.com/fusion/customer/help/en-us/ManageYourProducts/AIDefense/index.html (sensores, visibilidad y políticas de uso). Setup: https://docs.sophos.com/fusion/customer/help/en-us/ManageYourProducts/AIDefense/AIDefenseSetup/index.html . Se conserva la base EDR definida por MC en la plantilla.
- Falcon Guardian: https://www.crowdstrike.com/en-us/press-releases/crowdstrike-unveils-falcon-guardian-ai-agent-security/ . Se mantiene la plantilla enfocada en agentes/runtime; no se amplió el alcance del simulador a cada función anunciada por el fabricante.
- Cato GenAI Apps Dashboard: https://knowledge.catonetworks.com/v1/docs/using-the-genai-apps-dashboard (visibilidad, control de aplicaciones y DLP; el dashboard requiere CASB según documentación).
- Cato Client: https://www.catonetworks.com/platform/cato-client/ . Aplicaciones propias: https://www.catonetworks.com/platform/ai-security-for-applications/ . Se conserva la distinción entre la modalidad de cliente/PoP del simulador y las integraciones de aplicaciones.

Las URLs de soporte Cato anteriores redirigieron y no fueron accesibles con la herramienta en esta revisión; se utilizó la documentación vigente del dashboard y las páginas de plataforma. Los enlaces son referencias documentales: el intérprete funciona sin consultarlos en ejecución.
