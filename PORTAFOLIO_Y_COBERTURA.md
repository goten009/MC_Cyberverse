# Portafolio y cobertura v0.10.2

Se contrastaron, campo por campo, los 36 registros originales del catálogo con Directorio Estratégico A5:N40 del Excel aportado. Coinciden los 14 campos del directorio. El software agrega tres complementos IA como registros separados, sin atribuirles segmentos del Excel.

El mapa explícito está en web/portfolio.js. Las asociaciones describen capacidades de un diseño preliminar, no certificación de integración. Los campos cross-sell se conservan como datos y no se ejecutan como instrucciones para agregar productos automáticamente.

| ID | Producto | Necesidad de entrada | Capacidades asociadas | Fuente |
|---|---|---|---|---|
| mc-001 | FortiAP | wifi | wifi | Directorio Estratégico, fila 5 |
| mc-002 | FortiGate NGFW | perimetro | ngfw, sdwan | Directorio Estratégico, fila 6 |
| mc-003 | FortiRecon | exposicion | exposure | Directorio Estratégico, fila 7 |
| mc-004 | FortiSASE | sase_sites | sase, ztna | Directorio Estratégico, fila 8 |
| mc-005 | FortiSwitch | lan | switch | Directorio Estratégico, fila 9 |
| mc-006 | Sophos Firewall | perimetro | ngfw | Directorio Estratégico, fila 10 |
| mc-007 | Cato SASE Cloud | sase_sites | sase, sdwan, ztna | Directorio Estratégico, fila 11 |
| mc-008 | Anti-DDoS / WAAP complementario | ddos | ddos | Directorio Estratégico, fila 12 |
| mc-009 | FortiClient / ZTNA | remoto | ztna | Directorio Estratégico, fila 13 |
| mc-010 | FortiEDR | endpoint | edr | Directorio Estratégico, fila 14 |
| mc-011 | Sophos Endpoint Intercept X | endpoint | epp | Directorio Estratégico, fila 15 |
| mc-012 | Sophos XDR | investigacion | xdr | Directorio Estratégico, fila 16 |
| mc-013 | Falcon Identity Protection | identidad | idprotect | Directorio Estratégico, fila 17 |
| mc-014 | Falcon Insight XDR | endpoint | edr, xdr | Directorio Estratégico, fila 18 |
| mc-015 | Falcon Prevent | endpoint | epp | Directorio Estratégico, fila 19 |
| mc-016 | K365 Express | endpoint | epp, ops_tools | Directorio Estratégico, fila 20 |
| mc-017 | K365 User | usuario_saas | cloud_user | Directorio Estratégico, fila 21 |
| mc-018 | Acronis Cyber Protect Cloud | continuidad | epp, backup | Directorio Estratégico, fila 22 |
| mc-019 | Acronis EDR | endpoint | edr | Directorio Estratégico, fila 23 |
| mc-020 | FortiDLP | datos | dlp | Directorio Estratégico, fila 24 |
| mc-021 | FortiMail | correo | email | Directorio Estratégico, fila 25 |
| mc-022 | FortiWeb | aplicaciones | waf | Directorio Estratégico, fila 26 |
| mc-023 | Sophos Email | correo | email | Directorio Estratégico, fila 27 |
| mc-024 | Falcon Cloud Security | nube | cnapp | Directorio Estratégico, fila 28 |
| mc-025 | Acronis Email Security | correo | email | Directorio Estratégico, fila 29 |
| mc-026 | FortiAnalyzer | auditoria | logs | Directorio Estratégico, fila 30 |
| mc-027 | FortiManager | gestion_red | mgmt | Directorio Estratégico, fila 31 |
| mc-028 | FortiNAC | red | nac | Directorio Estratégico, fila 32 |
| mc-029 | Sophos MDR | visibilidad | soc | Directorio Estratégico, fila 33 |
| mc-030 | Taegis XDR | investigacion | xdr | Directorio Estratégico, fila 34 |
| mc-031 | Falcon Complete MDR | visibilidad | soc | Directorio Estratégico, fila 35 |
| mc-032 | K365 Pro | gestion_msp | ops_tools | Directorio Estratégico, fila 36 |
| mc-033 | KSIEM | auditoria | siem | Directorio Estratégico, fila 37 |
| mc-034 | RocketCyber | visibilidad | soc | Directorio Estratégico, fila 38 |
| mc-035 | Datto BCDR | continuidad | backup | Directorio Estratégico, fila 39 |
| mc-036 | Acronis Backup / DR | continuidad | backup | Directorio Estratégico, fila 40 |
| mc-ai-sophos | Sophos AI Defense | ai_security | ai_sophos | [Documentación oficial](https://docs.sophos.com/fusion/customer/help/en-us/ManageYourProducts/AIDefense/index.html) |
| mc-ai-guardian | Falcon Guardian | ai_security | ai_guardian | [Documentación oficial](https://www.crowdstrike.com/en-us/press-releases/crowdstrike-unveils-falcon-guardian-ai-agent-security/) |
| mc-ai-cato | Cato AI Security | ai_security | ai_cato | [Documentación oficial](https://knowledge.catonetworks.com/v1/docs/using-the-genai-apps-dashboard) |

## Límites de la revisión

La revisión de los 36 productos se basa en el directorio suministrado, no en una homologación nueva de documentación de los 36 fabricantes/productos. Se consultaron fuentes oficiales de los tres complementos IA para conservar el alcance prudente de las plantillas. Guardian se ofrece para agentes, Sophos para shadow/data y Cato para los casos habilitados en AI_RULES. Ampliar ese alcance exige modificar plantillas y pruebas.

No se recomienda FortiClient como producto MFA ni Falcon Identity como IAM completo por similitud del nombre. MFA, IAM y PAM pueden permanecer como capacidades genéricas pendientes de integración. FortiAnalyzer se asocia a logs/reportes, no se asume un SIEM por defecto. FortiAP se vincula a Wi-Fi, FortiWeb a WAF.

Los nuevos escenarios de Wi-Fi, exposición, gestión de firewalls/MSP y SaaS son recorridos conceptuales de los datos del directorio. No realizan escaneo ni aplican políticas a equipos reales.

Se detectaron valores #REF! preexistentes en Resumen ejecutivo B5:B6 del Excel. No se modificó el archivo ni se usaron esos totales para poblar el catálogo. El conteo se obtuvo de sus 36 filas de producto.

Huella SHA256 del Excel: `de50c7b7132347f55ec333701429f12f2ce5bb63c99e8011067f5b41498be2f4`.
