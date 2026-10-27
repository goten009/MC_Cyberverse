/* Mapa explícito producto → capacidad → necesidad. Sin selección automática de marcas. */
window.MC_PORTFOLIO = {
  "source": {
    "file": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
    "sheet": "Directorio Estratégico",
    "range": "A5:N40",
    "sha256": "de50c7b7132347f55ec333701429f12f2ce5bb63c99e8011067f5b41498be2f4"
  },
  "products": [
    {
      "id": "mc-001",
      "needs": [
        "wifi"
      ],
      "caps": [
        "wifi"
      ],
      "aliases": [
        "fortiap"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 5
      }
    },
    {
      "id": "mc-002",
      "needs": [
        "perimetro"
      ],
      "caps": [
        "ngfw",
        "sdwan"
      ],
      "aliases": [
        "fortigate",
        "fortigate ngfw"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 6
      }
    },
    {
      "id": "mc-003",
      "needs": [
        "exposicion"
      ],
      "caps": [
        "exposure"
      ],
      "aliases": [
        "fortirecon",
        "ctem"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 7
      }
    },
    {
      "id": "mc-004",
      "needs": [
        "sase_sites"
      ],
      "caps": [
        "sase",
        "ztna"
      ],
      "aliases": [
        "fortisase"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 8
      }
    },
    {
      "id": "mc-005",
      "needs": [
        "lan"
      ],
      "caps": [
        "switch"
      ],
      "aliases": [
        "fortiswitch"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 9
      }
    },
    {
      "id": "mc-006",
      "needs": [
        "perimetro"
      ],
      "caps": [
        "ngfw"
      ],
      "aliases": [
        "sophos firewall"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 10
      }
    },
    {
      "id": "mc-007",
      "needs": [
        "sase_sites"
      ],
      "caps": [
        "sase",
        "sdwan",
        "ztna"
      ],
      "aliases": [
        "cato sase cloud",
        "cato sase"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 11
      }
    },
    {
      "id": "mc-008",
      "needs": [
        "ddos"
      ],
      "caps": [
        "ddos"
      ],
      "aliases": [
        "nexusguard",
        "anti ddos",
        "waap"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 12
      }
    },
    {
      "id": "mc-009",
      "needs": [
        "remoto"
      ],
      "caps": [
        "ztna"
      ],
      "aliases": [
        "forticlient",
        "forticlient ztna"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 13
      }
    },
    {
      "id": "mc-010",
      "needs": [
        "endpoint"
      ],
      "caps": [
        "edr"
      ],
      "aliases": [
        "fortiedr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 14
      }
    },
    {
      "id": "mc-011",
      "needs": [
        "endpoint"
      ],
      "caps": [
        "epp"
      ],
      "aliases": [
        "sophos endpoint",
        "intercept x"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 15
      }
    },
    {
      "id": "mc-012",
      "needs": [
        "investigacion"
      ],
      "caps": [
        "xdr"
      ],
      "aliases": [
        "sophos xdr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 16
      }
    },
    {
      "id": "mc-013",
      "needs": [
        "identidad"
      ],
      "caps": [
        "idprotect"
      ],
      "aliases": [
        "falcon identity protection"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 17
      }
    },
    {
      "id": "mc-014",
      "needs": [
        "endpoint"
      ],
      "caps": [
        "edr",
        "xdr"
      ],
      "aliases": [
        "falcon insight",
        "falcon insight xdr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 18
      }
    },
    {
      "id": "mc-015",
      "needs": [
        "endpoint"
      ],
      "caps": [
        "epp"
      ],
      "aliases": [
        "falcon prevent"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 19
      }
    },
    {
      "id": "mc-016",
      "needs": [
        "endpoint"
      ],
      "caps": [
        "epp",
        "ops_tools"
      ],
      "aliases": [
        "k365 express"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 20
      }
    },
    {
      "id": "mc-017",
      "needs": [
        "usuario_saas"
      ],
      "caps": [
        "cloud_user"
      ],
      "aliases": [
        "k365 user"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 21
      }
    },
    {
      "id": "mc-018",
      "needs": [
        "continuidad"
      ],
      "caps": [
        "epp",
        "backup"
      ],
      "aliases": [
        "acronis cyber protect cloud",
        "acronis cyber protect"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 22
      }
    },
    {
      "id": "mc-019",
      "needs": [
        "endpoint"
      ],
      "caps": [
        "edr"
      ],
      "aliases": [
        "acronis edr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 23
      }
    },
    {
      "id": "mc-020",
      "needs": [
        "datos"
      ],
      "caps": [
        "dlp"
      ],
      "aliases": [
        "fortidlp"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 24
      }
    },
    {
      "id": "mc-021",
      "needs": [
        "correo"
      ],
      "caps": [
        "email"
      ],
      "aliases": [
        "fortimail"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 25
      }
    },
    {
      "id": "mc-022",
      "needs": [
        "aplicaciones"
      ],
      "caps": [
        "waf"
      ],
      "aliases": [
        "fortiweb"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 26
      }
    },
    {
      "id": "mc-023",
      "needs": [
        "correo"
      ],
      "caps": [
        "email"
      ],
      "aliases": [
        "sophos email"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 27
      }
    },
    {
      "id": "mc-024",
      "needs": [
        "nube"
      ],
      "caps": [
        "cnapp"
      ],
      "aliases": [
        "falcon cloud security"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 28
      }
    },
    {
      "id": "mc-025",
      "needs": [
        "correo"
      ],
      "caps": [
        "email"
      ],
      "aliases": [
        "acronis email security"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 29
      }
    },
    {
      "id": "mc-026",
      "needs": [
        "auditoria"
      ],
      "caps": [
        "logs"
      ],
      "aliases": [
        "fortianalyzer"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 30
      }
    },
    {
      "id": "mc-027",
      "needs": [
        "gestion_red"
      ],
      "caps": [
        "mgmt"
      ],
      "aliases": [
        "fortimanager"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 31
      }
    },
    {
      "id": "mc-028",
      "needs": [
        "red"
      ],
      "caps": [
        "nac"
      ],
      "aliases": [
        "fortinac"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 32
      }
    },
    {
      "id": "mc-029",
      "needs": [
        "visibilidad"
      ],
      "caps": [
        "soc"
      ],
      "aliases": [
        "sophos mdr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 33
      }
    },
    {
      "id": "mc-030",
      "needs": [
        "investigacion"
      ],
      "caps": [
        "xdr"
      ],
      "aliases": [
        "taegis",
        "taegis xdr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 34
      }
    },
    {
      "id": "mc-031",
      "needs": [
        "visibilidad"
      ],
      "caps": [
        "soc"
      ],
      "aliases": [
        "falcon complete",
        "falcon complete mdr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 35
      }
    },
    {
      "id": "mc-032",
      "needs": [
        "gestion_msp"
      ],
      "caps": [
        "ops_tools"
      ],
      "aliases": [
        "k365 pro"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 36
      }
    },
    {
      "id": "mc-033",
      "needs": [
        "auditoria"
      ],
      "caps": [
        "siem"
      ],
      "aliases": [
        "ksiem"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 37
      }
    },
    {
      "id": "mc-034",
      "needs": [
        "visibilidad"
      ],
      "caps": [
        "soc"
      ],
      "aliases": [
        "rocketcyber"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 38
      }
    },
    {
      "id": "mc-035",
      "needs": [
        "continuidad"
      ],
      "caps": [
        "backup"
      ],
      "aliases": [
        "datto bcdr",
        "bcdr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 39
      }
    },
    {
      "id": "mc-036",
      "needs": [
        "continuidad"
      ],
      "caps": [
        "backup"
      ],
      "aliases": [
        "acronis backup",
        "acronis backup dr"
      ],
      "ai": [],
      "source": {
        "archivo": "Directorio_de_productos_Seguridad_MC2026_reorganizado.xlsx",
        "hoja": "Directorio Estratégico",
        "fila": 40
      }
    },
    {
      "id": "mc-ai-sophos",
      "needs": [
        "ai_security"
      ],
      "caps": [
        "ai_sophos"
      ],
      "aliases": [
        "sophos ai defense",
        "sophos ia",
        "ia de sophos"
      ],
      "ai": [
        "shadow",
        "data"
      ],
      "source": {
        "referencia": "https://docs.sophos.com/fusion/customer/help/en-us/ManageYourProducts/AIDefense/index.html"
      }
    },
    {
      "id": "mc-ai-guardian",
      "needs": [
        "ai_security"
      ],
      "caps": [
        "ai_guardian"
      ],
      "aliases": [
        "falcon guardian",
        "falcon guadrian",
        "crowdstrike guardian"
      ],
      "ai": [
        "agent"
      ],
      "source": {
        "referencia": "https://www.crowdstrike.com/en-us/press-releases/crowdstrike-unveils-falcon-guardian-ai-agent-security/"
      }
    },
    {
      "id": "mc-ai-cato",
      "needs": [
        "ai_security"
      ],
      "caps": [
        "ai_cato"
      ],
      "aliases": [
        "cato ai security",
        "cato ia",
        "ia de cato"
      ],
      "ai": [
        "shadow",
        "data",
        "agent",
        "prompt"
      ],
      "source": {
        "referencia": "https://knowledge.catonetworks.com/v1/docs/using-the-genai-apps-dashboard"
      }
    }
  ],
  "capabilities": {
    "wifi": [
      "Wi-Fi corporativo",
      "Red",
      "Prevenir",
      "Acceso inalámbrico empresarial con políticas para usuarios e invitados.",
      "Separar accesos inalámbricos según política y despliegue.",
      "Wi-Fi corporativo",
      "¿Qué cobertura, invitados y autenticación requieren?",
      "◇"
    ],
    "exposure": [
      "Exposición externa / CTEM",
      "Red",
      "Detectar",
      "Identificación de superficie externa, marca y credenciales expuestas.",
      "Priorizar riesgos digitales externos antes de un incidente.",
      "Exposición externa / CTEM",
      "¿Qué dominios, marcas y activos públicos deben revisarse?",
      "◇"
    ],
    "mgmt": [
      "Gestión central de firewall",
      "Operación",
      "Prevenir",
      "Administración de políticas, cambios y configuración de la flota compatible.",
      "Reducir errores de operación y estandarizar cambios.",
      "Gestión central de firewall",
      "¿Cuántos firewalls administran y quién aprueba los cambios?",
      "◇"
    ],
    "logs": [
      "Logs y reportes",
      "Operación",
      "Detectar",
      "Recolección de registros y generación de reportes de los equipos integrados.",
      "Disponer de evidencias para investigación y auditoría.",
      "Logs y reportes",
      "¿Qué registros, retención e informes necesitan?",
      "◇"
    ],
    "ops_tools": [
      "Gestión y automatización MSP",
      "Operación",
      "Prevenir",
      "Herramientas de gestión y automatización según paquete y alcance contratado.",
      "Simplificar la operación de servicios administrados.",
      "Gestión y automatización MSP",
      "¿Qué tareas, clientes y herramientas se deben administrar?",
      "◇"
    ],
    "cloud_user": [
      "Seguridad de usuario SaaS",
      "Usuario",
      "Prevenir",
      "Protección del usuario y sus servicios de colaboración según paquete.",
      "Reducir exposición de usuario en servicios SaaS.",
      "Seguridad de usuario SaaS",
      "¿Qué usuarios, aplicaciones y módulos necesita proteger?",
      "◇"
    ],
    "idprotect": [
      "Protección de identidades",
      "Usuario",
      "Detectar",
      "Detección de ataques y exposición sobre identidades y credenciales.",
      "Investigar riesgo de credenciales y movimiento lateral.",
      "Protección de identidades",
      "¿Qué directorios, identidades y privilegios deben cubrirse?",
      "◇"
    ]
  },
  "needs": [
    {
      "id": "wifi",
      "name": "Wi-Fi seguro",
      "icon": "◇",
      "desc": "Se identifica la sede y sus usuarios inalámbricos.",
      "caps": [
        "branch",
        "wifi"
      ],
      "scenario": [
        "Se identifica la sede y sus usuarios inalámbricos.",
        "El acceso inalámbrico aplica la configuración habilitada.",
        "Se separa acceso corporativo y de invitados según políticas.",
        "Se revisan los eventos disponibles.",
        "Preventa valida cobertura, autenticación y dimensionamiento."
      ],
      "threat": "Evento didáctico de Wi-Fi seguro",
      "detect": "wifi"
    },
    {
      "id": "lan",
      "name": "LAN y switching",
      "icon": "◇",
      "desc": "La sede conecta sus dispositivos a la LAN.",
      "caps": [
        "branch",
        "switch",
        "ngfw"
      ],
      "scenario": [
        "La sede conecta sus dispositivos a la LAN.",
        "Los switches transportan el tráfico de la red.",
        "Las políticas de segmentación delimitan accesos.",
        "El firewall controla el tráfico que lo atraviesa.",
        "Se valida capacidad, diseño y administración."
      ],
      "threat": "Evento didáctico de LAN y switching",
      "detect": "switch"
    },
    {
      "id": "perimetro",
      "name": "Seguridad perimetral / firewall",
      "icon": "◇",
      "desc": "Un equipo de la sede origina una conexión.",
      "caps": [
        "branch",
        "ngfw",
        "internet"
      ],
      "scenario": [
        "Un equipo de la sede origina una conexión.",
        "El tráfico cruza el firewall.",
        "Se evalúa la política y la inspección licenciada.",
        "El tráfico permitido alcanza el destino.",
        "Se registran eventos disponibles para revisión."
      ],
      "threat": "Evento didáctico de Seguridad perimetral / firewall",
      "detect": "ngfw"
    },
    {
      "id": "exposicion",
      "name": "Exposición externa y riesgo digital",
      "icon": "◇",
      "desc": "Se define el alcance de activos externos.",
      "caps": [
        "internet",
        "exposure",
        "soc"
      ],
      "scenario": [
        "Se define el alcance de activos externos.",
        "Se identifican exposición digital y credenciales filtradas.",
        "Se priorizan hallazgos según contexto.",
        "Los responsables investigan y definen remediación.",
        "Se verifica el cierre de hallazgos; no se representa bloqueo en línea."
      ],
      "threat": "Evento didáctico de Exposición externa y riesgo digital",
      "detect": "exposure"
    },
    {
      "id": "gestion_red",
      "name": "Gestión centralizada de firewalls",
      "icon": "◇",
      "desc": "Se identifica la flota de firewalls.",
      "caps": [
        "branch",
        "ngfw",
        "mgmt"
      ],
      "scenario": [
        "Se identifica la flota de firewalls.",
        "Se centraliza la configuración de equipos compatibles.",
        "Se prepara un cambio de política.",
        "El responsable aprueba y aplica el cambio.",
        "Se verifica la configuración aplicada."
      ],
      "threat": "Evento didáctico de Gestión centralizada de firewalls",
      "detect": "mgmt"
    },
    {
      "id": "auditoria",
      "name": "Registros, SIEM y auditoría",
      "icon": "◇",
      "desc": "Se definen las fuentes y retención de registros.",
      "caps": [
        "ngfw",
        "logs",
        "siem"
      ],
      "scenario": [
        "Se definen las fuentes y retención de registros.",
        "Se recogen logs de los equipos integrados.",
        "La plataforma centraliza los eventos disponibles.",
        "Se prepara el informe solicitado.",
        "Preventa valida fuentes, licencias y capacidad; un recolector de logs no equivale por sí solo a SIEM."
      ],
      "threat": "Evento didáctico de Registros, SIEM y auditoría",
      "detect": "logs"
    },
    {
      "id": "gestion_msp",
      "name": "Operación y automatización MSP",
      "icon": "◇",
      "desc": "Se delimita el servicio administrado.",
      "caps": [
        "endpoint",
        "ops_tools"
      ],
      "scenario": [
        "Se delimita el servicio administrado.",
        "Se incorporan equipos y clientes compatibles.",
        "Se configura una tarea operativa autorizada.",
        "Se revisa su ejecución y resultado.",
        "Se valida el alcance del paquete contratado."
      ],
      "threat": "Evento didáctico de Operación y automatización MSP",
      "detect": "ops_tools"
    },
    {
      "id": "endpoint",
      "name": "Protección de equipos y endpoints",
      "icon": "◇",
      "desc": "Un equipo recibe un archivo sospechoso.",
      "caps": [
        "endpoint",
        "epp",
        "edr",
        "soc"
      ],
      "scenario": [
        "Un equipo recibe un archivo sospechoso.",
        "La protección preventiva analiza el archivo.",
        "La capacidad EDR observa comportamiento cuando está desplegada.",
        "Se investiga el evento según el servicio habilitado.",
        "La respuesta autorizada contiene el equipo si corresponde."
      ],
      "threat": "Evento didáctico de Protección de equipos y endpoints",
      "detect": "edr"
    },
    {
      "id": "investigacion",
      "name": "Investigación y correlación XDR",
      "icon": "◇",
      "desc": "Se delimitan las fuentes de telemetría.",
      "caps": [
        "endpoint",
        "xdr",
        "soc"
      ],
      "scenario": [
        "Se delimitan las fuentes de telemetría.",
        "La plataforma XDR recibe fuentes compatibles.",
        "Se correlacionan señales disponibles.",
        "El analista investiga el contexto.",
        "Se coordina la respuesta; las integraciones se confirman con Preventa."
      ],
      "threat": "Evento didáctico de Investigación y correlación XDR",
      "detect": "xdr"
    },
    {
      "id": "usuario_saas",
      "name": "Protección del usuario y colaboración SaaS",
      "icon": "◇",
      "desc": "Se identifican usuarios y servicios SaaS.",
      "caps": [
        "remote",
        "cloud_user",
        "saas"
      ],
      "scenario": [
        "Se identifican usuarios y servicios SaaS.",
        "Se evalúan los módulos disponibles en el paquete.",
        "Se aplican las políticas compatibles.",
        "Se revisan las alertas disponibles.",
        "Preventa confirma alcance, usuarios y licencias."
      ],
      "threat": "Evento didáctico de Protección del usuario y colaboración SaaS",
      "detect": "cloud_user"
    }
  ],
  "relations": {
    "wifi": [
      [
        "branch",
        "wifi",
        "trafico"
      ]
    ],
    "lan": [
      [
        "branch",
        "switch",
        "trafico"
      ],
      [
        "switch",
        "ngfw",
        "trafico"
      ]
    ],
    "perimetro": [
      [
        "branch",
        "ngfw",
        "trafico"
      ],
      [
        "ngfw",
        "internet",
        "trafico"
      ]
    ],
    "exposicion": [
      [
        "internet",
        "exposure",
        "telemetria"
      ],
      [
        "exposure",
        "soc",
        "telemetria"
      ]
    ],
    "gestion_red": [
      [
        "mgmt",
        "ngfw",
        "respuesta"
      ],
      [
        "branch",
        "ngfw",
        "trafico"
      ]
    ],
    "auditoria": [
      [
        "ngfw",
        "logs",
        "telemetria"
      ],
      [
        "logs",
        "siem",
        "telemetria"
      ]
    ],
    "gestion_msp": [
      [
        "ops_tools",
        "endpoint",
        "respuesta"
      ],
      [
        "endpoint",
        "ops_tools",
        "telemetria"
      ]
    ],
    "endpoint": [
      [
        "endpoint",
        "epp",
        "trafico"
      ],
      [
        "endpoint",
        "edr",
        "telemetria"
      ],
      [
        "edr",
        "soc",
        "telemetria"
      ],
      [
        "soc",
        "endpoint",
        "respuesta"
      ]
    ],
    "investigacion": [
      [
        "endpoint",
        "xdr",
        "telemetria"
      ],
      [
        "xdr",
        "soc",
        "telemetria"
      ],
      [
        "soc",
        "endpoint",
        "respuesta"
      ]
    ],
    "usuario_saas": [
      [
        "remote",
        "cloud_user",
        "trafico"
      ],
      [
        "cloud_user",
        "saas",
        "trafico"
      ]
    ]
  }
};
