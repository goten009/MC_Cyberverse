/* Diccionario comercial ampliable; probar positivos y negativos al modificar. */
window.MC_SMART_RULES = [
  {
    "id": "ransomware",
    "phrases": [
      "ransomware",
      "secuestrar los archivos",
      "secuestren la informacion",
      "secuestren los archivos",
      "cifran los archivos",
      "cifrado malicioso",
      "secuestro de datos",
      "secuestro de informacion",
      "secuestro de archivos"
    ],
    "risk": "Reducir el compromiso de equipos y facilitar una recuperación verificada.",
    "patterns": [
      "\\b(?:secuestr\\w*|cifr\\w*|encript\\w*|bloque\\w*)\\b.{0,65}\\b(?:archivos?|informacion|datos|documentos)\\b",
      "\\b(?:archivos?|datos|documentos)\\b.{0,45}\\b(?:secuestrad\\w*|cifrad\\w*|encriptad\\w*)\\b",
      "\\b(?:piden|exigen|cobran)\\b.{0,35}\\brescate\\b"
    ]
  },
  {
    "id": "correo",
    "phrases": [
      "phishing",
      "correo malicioso",
      "correos maliciosos",
      "enlace falso",
      "suplantacion por correo",
      "pesca de credenciales",
      "suplantacion de identidad por correo",
      "spam",
      "bec",
      "dmarc",
      "spf",
      "dkim",
      "fraude por correo",
      "suplantacion por email"
    ],
    "risk": "Reducir engaños por correo y ejecución de contenido sospechoso.",
    "patterns": [
      "\\b(?:correos?|emails?|mensajes?|enlaces?)\\b.{0,45}\\b(?:malicios\\w*|fals\\w*|sospechos\\w*|fraudulent\\w*)\\b",
      "\\b(?:emplead\\w*|usuari\\w*)\\b.{0,35}\\b(?:abr\\w*|clic|click)\\b.{0,45}\\b(?:correo|enlace|adjunto)\\b"
    ]
  },
  {
    "id": "datos",
    "phrases": [
      "fuga de datos",
      "fuga de informacion",
      "copiando informacion",
      "compartir informacion sensible",
      "filtran datos",
      "robo de informacion",
      "dlp",
      "datos sensibles",
      "clasificacion de datos",
      "informacion confidencial"
    ],
    "risk": "Controlar la salida de información por canales cubiertos.",
    "patterns": [
      "\\b(?:fug\\w*|filtr\\w*|rob\\w*|copi\\w*|sacando|comparti\\w*|sub\\w*|peg\\w*|envi\\w*)\\b.{0,50}\\b(?:datos|informacion|archivos|documentos)\\b",
      "\\b(?:datos|informacion|archivos|documentos)\\b.{0,45}\\b(?:chatgpt|public\\w*|filtrad\\w*|robados)\\b"
    ]
  },
  {
    "id": "sdwan_only",
    "phrases": [
      "problemas de conectividad",
      "conectividad multisede",
      "muchas sucursales",
      "conectar las sedes",
      "conectar sedes",
      "sd wan",
      "sdwan"
    ],
    "risk": "Mejorar la conectividad entre localizaciones según enlaces y políticas.",
    "patterns": [
      "\\b(?:sedes|sucursales|oficinas)\\b.{0,65}\\b(?:conect\\w*|enlaces?|internet|comunic\\w*|lent\\w*|cortes?)\\b",
      "\\b(?:conect\\w*|enlaces?|comunic\\w*)\\b.{0,45}\\b(?:sedes|sucursales|oficinas)\\b"
    ]
  },
  {
    "id": "sase_sites",
    "phrases": [
      "sase para sedes",
      "seguridad y conectividad entre sedes",
      "sase",
      "acceso seguro en la nube",
      "secure access service edge"
    ],
    "risk": "Aplicar acceso y controles cloud según el despliegue.",
    "patterns": []
  },
  {
    "id": "remoto",
    "phrases": [
      "usuarios remotos",
      "trabajo remoto",
      "trabajan desde casa",
      "acceso remoto",
      "ztna",
      "vpn",
      "teletrabajo",
      "trabajadores remotos"
    ],
    "risk": "Controlar el acceso de colaboradores fuera de oficina.",
    "patterns": [
      "\\b(?:trabaj\\w*|conect\\w*|acced\\w*)\\b.{0,35}\\b(?:desde casa|fuera de la oficina|desde sus casas|desde cualquier lugar)\\b"
    ]
  },
  {
    "id": "identidad",
    "phrases": [
      "no sabemos quien ingresa",
      "no sabemos quien entra",
      "accesos no autorizados",
      "gestion de accesos",
      "doble factor",
      "mfa",
      "iam",
      "autenticacion multifactor",
      "robo de credenciales",
      "active directory",
      "privilegios excesivos",
      "contrasenas robadas"
    ],
    "risk": "Reducir accesos indebidos y privilegios excesivos.",
    "patterns": [
      "\\b(?:control\\w*|proteg\\w*|gestion\\w*)\\b.{0,40}\\b(?:accesos|identidades|contrasenas|credenciales)\\b",
      "\\b(?:robo|roban|comparten)\\b.{0,30}\\b(?:contrasenas|credenciales)\\b"
    ]
  },
  {
    "id": "aplicaciones",
    "phrases": [
      "ataque a nuestra aplicacion web",
      "ataques a la aplicacion web",
      "proteger nuestra aplicacion web",
      "seguridad de aplicaciones",
      "waf",
      "waap",
      "owasp",
      "seguridad de apis",
      "proteger apis",
      "api publica",
      "apis publicas"
    ],
    "risk": "Inspeccionar solicitudes a aplicaciones web dentro del alcance contratado.",
    "patterns": [
      "\\b(?:ata\\w*|proteg\\w*|seguridad)\\b.{0,45}\\b(?:aplicacion web|aplicaciones web|sitio web|pagina web|portal web)\\b",
      "\\b(?:proteg\\w*|seguridad|ataques)\\b.{0,30}\\b(?:apis|api)\\b"
    ]
  },
  {
    "id": "visibilidad",
    "phrases": [
      "detectar amenazas durante la noche",
      "monitoreo nocturno",
      "monitoreo 24",
      "soc",
      "mdr",
      "nadie revisa las alertas",
      "monitoreo 24 7",
      "soc 24 7",
      "sin soc",
      "no tenemos soc",
      "respuesta administrada",
      "deteccion y respuesta administrada"
    ],
    "risk": "Investigar alertas y coordinar respuesta según el servicio.",
    "patterns": [
      "\\b(?:detect\\w*|monitore\\w*|vigila\\w*|supervis\\w*)\\b.{0,45}\\b(?:amenazas|ataques|incidentes|noche|24 horas)\\b"
    ]
  },
  {
    "id": "continuidad",
    "phrases": [
      "recuperar sus archivos",
      "recuperar archivos",
      "recuperar los datos",
      "copias de seguridad",
      "respaldo de datos",
      "backup",
      "respaldos",
      "backups"
    ],
    "risk": "Restaurar desde copias verificadas con objetivos acordados.",
    "patterns": [
      "\\b(?:recuper\\w*|restaur\\w*|respald\\w*)\\b.{0,45}\\b(?:datos|informacion|archivos|sistemas|servidores)\\b",
      "\\b(?:no tenemos|sin|faltan)\\b.{0,25}\\b(?:backups|backup|respaldos|copias de seguridad)\\b"
    ]
  },
  {
    "id": "ddos",
    "phrases": [
      "ataque ddos",
      "ataques ddos",
      "trafico malicioso masivo"
    ],
    "risk": "Mitigar tráfico malicioso dentro de la cobertura y capacidad contratada.",
    "patterns": []
  },
  {
    "id": "nube",
    "phrases": [
      "seguridad de cargas en nube",
      "configuracion insegura en nube",
      "cnapp",
      "cspm",
      "seguridad cloud",
      "seguridad en nube",
      "proteger contenedores",
      "workloads",
      "kubernetes"
    ],
    "risk": "Revisar exposición de recursos cloud integrados.",
    "patterns": [
      "\\b(?:proteg\\w*|seguridad|vulnerab\\w*)\\b.{0,45}\\b(?:servidores en la nube|cargas cloud|recursos cloud|infraestructura cloud)\\b",
      "\\b(?:proteg\\w*|seguridad|postura)\\b.{0,35}\\b(?:aws|azure|gcp|contenedores|nube)\\b"
    ]
  },
  {
    "id": "sse_only",
    "phrases": [
      "sse",
      "security service edge",
      "seguridad cloud sin cambiar la conectividad"
    ],
    "patterns": [],
    "risk": "Reducir exposición y facilitar la operación mediante sse only, según alcance validado con Preventa."
  },
  {
    "id": "endpoint",
    "phrases": [
      "antivirus",
      "antimalware",
      "malware",
      "virus",
      "epp",
      "edr",
      "proteccion endpoint",
      "seguridad endpoint"
    ],
    "patterns": [
      "\\b(?:proteg\\w*|seguridad|infect\\w*)\\b.{0,35}\\b(?:equipos|computadores|endpoints|portatiles)\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante endpoint, según alcance validado con Preventa."
  },
  {
    "id": "investigacion",
    "phrases": [
      "xdr",
      "correlacion de amenazas",
      "threat hunting"
    ],
    "patterns": [
      "\\b(?:investig\\w*|correlacion\\w*)\\b.{0,40}\\b(?:amenazas|incidentes|telemetria|alertas)\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante investigacion, según alcance validado con Preventa."
  },
  {
    "id": "perimetro",
    "phrases": [
      "firewall",
      "ngfw",
      "seguridad perimetral",
      "utm",
      "ips"
    ],
    "patterns": [
      "\\b(?:control\\w*|proteg\\w*)\\b.{0,30}\\b(?:perimetro|trafico de internet)\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante perimetro, según alcance validado con Preventa."
  },
  {
    "id": "wifi",
    "phrases": [
      "wifi",
      "wi fi",
      "wlan",
      "red inalambrica",
      "invitados en la red"
    ],
    "patterns": [
      "\\b(?:acceso|red|conexion)\\b.{0,20}\\binalambric\\w*\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante wifi, según alcance validado con Preventa."
  },
  {
    "id": "lan",
    "phrases": [
      "switching",
      "switches",
      "switch",
      "renovar la lan",
      "renovacion lan",
      "red cableada"
    ],
    "patterns": [],
    "risk": "Reducir exposición y facilitar la operación mediante lan, según alcance validado con Preventa."
  },
  {
    "id": "red",
    "phrases": [
      "nac",
      "segmentacion de red",
      "control de acceso a la red",
      "dispositivos desconocidos",
      "equipos no autorizados",
      "iot"
    ],
    "patterns": [
      "\\b(?:dispositivos|equipos)\\b.{0,25}\\b(?:desconocidos|no autorizados)\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante red, según alcance validado con Preventa."
  },
  {
    "id": "exposicion",
    "phrases": [
      "superficie de ataque",
      "credenciales filtradas",
      "exposicion externa",
      "marca expuesta",
      "fraude digital",
      "ctem",
      "dominios falsos",
      "suplantacion de marca"
    ],
    "patterns": [],
    "risk": "Reducir exposición y facilitar la operación mediante exposicion, según alcance validado con Preventa."
  },
  {
    "id": "gestion_red",
    "phrases": [
      "administrar firewalls",
      "gestion de firewalls",
      "gestion centralizada de firewall",
      "politicas de los firewalls",
      "configuracion de firewalls"
    ],
    "patterns": [
      "\\b(?:administr\\w*|gestion\\w*|centraliz\\w*)\\b.{0,35}\\b(?:firewalls|fortigates|politicas de red)\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante gestion red, según alcance validado con Preventa."
  },
  {
    "id": "auditoria",
    "phrases": [
      "siem",
      "logs",
      "registros de seguridad",
      "reportes de seguridad",
      "informes de seguridad",
      "auditoria de seguridad",
      "centralizar eventos",
      "trazabilidad"
    ],
    "patterns": [
      "\\b(?:centraliz\\w*|recolect\\w*|almacen\\w*)\\b.{0,30}\\b(?:eventos|registros|logs)\\b"
    ],
    "risk": "Reducir exposición y facilitar la operación mediante auditoria, según alcance validado con Preventa."
  },
  {
    "id": "gestion_msp",
    "phrases": [
      "msp",
      "automatizacion operativa",
      "automatizar tareas",
      "gestionar clientes",
      "servicios administrados",
      "rmm"
    ],
    "patterns": [],
    "risk": "Reducir exposición y facilitar la operación mediante gestion msp, según alcance validado con Preventa."
  },
  {
    "id": "usuario_saas",
    "phrases": [
      "seguridad saas",
      "proteger microsoft 365",
      "proteger m365",
      "seguridad de usuario saas"
    ],
    "patterns": [],
    "risk": "Reducir exposición y facilitar la operación mediante usuario saas, según alcance validado con Preventa."
  }
];
window.MC_SMART_TERMS = {"ransomware": ["ramsomware", "ransonware", "ransomwere", "ransomware"], "phishing": ["phising", "pishing", "fishing"], "chatgpt": ["chat gpt", "chatgtp"], "sdwan": ["sd wan"], "sase": ["sasse"], "guardian": ["guadrian"]};
