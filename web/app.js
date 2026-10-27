'use strict';
(()=>{
const $=id=>document.getElementById(id), NS='http://www.w3.org/2000/svg';
const needDefs=[
{id:'ransomware',name:'Defensa contra ransomware',icon:'⚠',desc:'Protección, detección, contención y recuperación de endpoints.',caps:['endpoint','epp','edr','mfa','soc','backup'],scenario:['Un archivo sospechoso llega al equipo del usuario.','El usuario intenta ejecutar el archivo; el EPP puede bloquear amenazas conocidas.','El agente EDR observa comportamientos anómalos en el propio endpoint.','Se genera una alerta y, si la integración está habilitada, el servicio SOC/MDR la investiga.','Se ejecuta la contención autorizada y se recuperan datos desde copias verificadas, si fuera necesario.'],threat:'Ejecución sospechosa en endpoint',detect:'edr'},
{id:'sdwan_only',name:'Conectividad SD-WAN',icon:'⇄',desc:'Orquestación de enlaces y rutas entre sedes, sin incluir SASE automáticamente.',caps:['branch','sdwan','saas'],scenario:['Una sede origina una conexión empresarial.','El SD-WAN evalúa las rutas WAN disponibles y las políticas.','El tráfico sale por el transporte correspondiente hacia Internet o red privada.','Se aplican únicamente los controles contratados y presentes en la ruta.','El servicio de destino recibe la conexión; SD-WAN por sí solo no implica inspección NGFW.'],threat:'Anomalía de conectividad simulada',detect:'sdwan'},
{id:'sase_sites',name:'SASE para sedes',icon:'☁',desc:'Acceso e inspección desde el servicio SASE, con una topología que depende del fabricante.',caps:['branch','sdwan','sase','saas'],scenario:['Una sede origina el tráfico hacia una aplicación.','El equipo de borde dirige el flujo mediante Internet/transporte WAN hacia el servicio SASE.','El PoP SASE aplica los controles efectivamente habilitados.','El tráfico permitido se encamina hacia la aplicación.','Los eventos de seguridad se procesan según servicios e integraciones contratadas.'],threat:'Tráfico sospechoso sujeto a políticas SASE',detect:'sase'},
{id:'sse_only',name:'Seguridad SSE',icon:'◈',desc:'Servicios de seguridad cloud conectados al acceso existente, sin asumir reemplazo de SD-WAN.',caps:['branch','sase','saas'],scenario:['La sede dispone de conectividad existente.','El tráfico cubierto se redirige al servicio SSE según el mecanismo seleccionado.','Los controles habilitados inspeccionan las solicitudes compatibles.','Se permite o bloquea el acceso según políticas.','Los eventos disponibles se notifican a la operación configurada.'],threat:'Acceso web sujeto a inspección SSE',detect:'sase'},
{id:'remoto',name:'Acceso seguro de usuarios remotos',icon:'♙',desc:'Acceso a aplicaciones desde cualquier lugar, controlado por identidad.',caps:['remote','mfa','ztna','sase','saas','edr'],scenario:['El colaborador solicita acceso a una aplicación.','El sistema de identidad exige MFA según la política configurada.','ZTNA evalúa identidad, autorización y postura disponible.','Se establece la ruta de acceso permitida; los controles SASE se aplican cuando correspondan.','Un acceso anómalo puede generar un evento en la solución de identidad.'],threat:'Intento de acceso inusual',detect:'mfa'},
{id:'datos',name:'Protección contra fuga de datos',icon:'▤',desc:'Políticas para controlar movimiento y exposición de información.',caps:['endpoint','dlp','sase','saas','soc'],scenario:['Un usuario intenta compartir información sensible.','El control DLP inspecciona el canal disponible según la modalidad desplegada.','Se evalúan las reglas de clasificación y los destinos permitidos.','La política puede registrar, advertir o bloquear la salida, según configuración.','Se envía la alerta a los operadores, cuando existe integración.'],threat:'Posible exfiltración de información',detect:'dlp'},
{id:'aplicaciones',name:'Seguridad de aplicaciones web',icon:'▣',desc:'Protección de servicios web y APIs publicados.',caps:['internet','waf','app','soc','backup'],scenario:['Un cliente externo envía una solicitud HTTP(S) al servicio web.','El WAF inspecciona la solicitud, si el servicio está dentro de su alcance.','Una regla configurada identifica un patrón potencialmente malicioso.','Según el modo de política, se bloquea o registra la solicitud.','El evento puede remitirse al monitoreo y se mantiene continuidad con planes de respaldo.'],threat:'Solicitud web sospechosa',detect:'waf'},
{id:'identidad',name:'Protección de identidades',icon:'◈',desc:'Reducir accesos indebidos y privilegios excesivos.',caps:['remote','iam','mfa','pam','saas','soc'],scenario:['Un usuario o administrador solicita autenticarse.','IAM determina permisos y MFA solicita evidencia adicional cuando procede.','PAM controla una sesión privilegiada si está implementado.','Se registra un patrón de autenticación o elevación inusual.','Los equipos autorizados investigan o suspenden el acceso conforme a las políticas.'],threat:'Acceso privilegiado anómalo',detect:'iam'},
{id:'ddos',name:'Continuidad ante ataques DDoS',icon:'☄',desc:'Mitigación de tráfico malicioso contra servicios expuestos.',caps:['internet','ddos','ngfw','app','soc'],scenario:['El servicio recibe un volumen anómalo de solicitudes externas.','La capa de mitigación DDoS identifica el patrón de tráfico que cubre su servicio.','Se aplican políticas de mitigación y se conserva el tráfico permitido cuando es posible.','Se generan alertas para monitoreo y análisis.','La protección efectiva depende de cobertura, capacidad contratada y modo de desvío.'],threat:'Pico sospechoso de tráfico',detect:'ddos'},
{id:'visibilidad',name:'Visibilidad, detección y respuesta',icon:'⌁',desc:'Centralización de eventos, correlación y operación de seguridad.',caps:['endpoint','edr','xdr','siem','soc'],scenario:['Los controles generan eventos de seguridad.','Los agentes y plataformas transmiten telemetría habilitada.','XDR y/o SIEM correlacionan las fuentes efectivamente integradas.','Los analistas SOC/MDR reciben y priorizan una alerta.','Se realiza investigación y respuesta según el servicio contratado.'],threat:'Alerta de seguridad correlacionada',detect:'siem'},
{id:'continuidad',name:'Respaldo y recuperación',icon:'↻',desc:'Restauración de datos y sistemas ante fallas o incidentes.',caps:['endpoint','server','backup','soc'],scenario:['Ocurre pérdida o indisponibilidad de un sistema.','Se identifica el punto de recuperación disponible y el alcance del respaldo.','La solución de backup valida el estado de los puntos restaurables.','Se restaura el servicio siguiendo el procedimiento aprobado.','Se verifica la integridad y se documenta el tiempo real de recuperación.'],threat:'Indisponibilidad simulada',detect:'backup'},
{id:'red',name:'Segmentación y acceso a la red',icon:'⇄',desc:'Control de acceso de equipos y segmentación de infraestructura.',caps:['branch','switch','nac','ngfw','soc'],scenario:['Un dispositivo solicita conectarse a la red de una sede.','NAC identifica al equipo y evalúa los requisitos definidos.','El acceso o la segmentación se asignan según políticas.','NGFW aplica reglas al tráfico que atraviesa su punto de control.','Las anomalías observadas pueden generar registros para operación.'],threat:'Dispositivo fuera de cumplimiento',detect:'nac'},
{id:'nube',name:'Seguridad de cargas en nube',icon:'☁',desc:'Visibilidad y protección de recursos cloud según alcance.',caps:['internet','cloud','cnapp','soc','backup'],scenario:['La organización utiliza recursos y aplicaciones cloud.','Una capacidad CNAPP/CSPM puede evaluar configuraciones, identidades y exposición según módulos habilitados.','Se detecta una configuración o comportamiento de riesgo en un recurso integrado.','Se priorizan hallazgos y tareas de remediación.','Operación valida y ejecuta los cambios autorizados.'],threat:'Configuración cloud de riesgo',detect:'cnapp'},
{id:'ai_security',name:'Uso seguro de inteligencia artificial',icon:'✦',desc:'Gobierno de herramientas de IA, protección de datos y supervisión de agentes.',caps:['endpoint','remote','saas'],scenario:['Un colaborador utiliza una herramienta de IA.','Un sensor habilitado identifica la aplicación o agente.','Una política examina la interacción dentro de su alcance.','La actividad sospechosa genera una alerta cuando corresponde.','Un analista revisa el evento y coordina una respuesta autorizada.'],threat:'Uso no autorizado de IA',detect:'ai_sophos'},
{id:'correo',name:'Protección de correo empresarial',icon:'✉',desc:'Defensa frente a phishing, enlaces, archivos y suplantación.',caps:['internet','email','endpoint','edr','soc'],scenario:['Se recibe un correo potencialmente malicioso.','La solución de email security analiza metadatos, enlaces y contenido según políticas.','Una amenaza puede ser bloqueada, enviada a cuarentena o marcada para revisión.','Si el usuario ejecuta un archivo, el endpoint puede observar actividad adicional.','Se notifica a los analistas según el flujo disponible.'],threat:'Correo de phishing sospechoso',detect:'email'}
];
const caps={
endpoint:['PC de usuario','Usuario','Prevenir','Equipo de trabajo del usuario. Las soluciones EPP, EDR y DLP se agregan por separado según la propuesta.','Base para mostrar la actividad, riesgos y protección del equipo.','Equipo de usuario final','¿Cuántos equipos se administran y qué sistemas operativos utilizan?','▣'],remote:['Usuario remoto','Usuario','Prevenir','Colaborador conectado fuera de la sede.','Acceso productivo y seguro a servicios corporativos.','Acceso móvil','¿Qué aplicaciones utilizan fuera de oficina?','♙'],branch:['Sede corporativa','Red','Prevenir','Localización que concentra usuarios, LAN y conectividad empresarial.','Conectividad con políticas entre sedes, Internet y nube.','Conectividad','¿Cuántas sedes y enlaces tiene la organización?','▥'],internet:['Internet','Red','Prevenir','Red pública por la que circulan solicitudes según arquitectura.','Conectividad para usuarios y servicios externos.','Conectividad','¿Qué servicios expone públicamente?','◎'],saas:['Aplicación SaaS','Aplicaciones','Prevenir','Aplicación entregada como servicio desde infraestructura de terceros.','Disponibilidad y experiencia de aplicaciones.','Aplicaciones','¿Qué aplicaciones críticas usan los empleados?','☁'],app:['Aplicación web','Aplicaciones','Prevenir','Aplicación publicada vía HTTP(S), susceptible de inspección por WAF.','Continuidad y protección de servicios digitales.','Aplicaciones','¿Qué aplicaciones web públicas necesitan proteger?','▣'],server:['Servidor y datos','Aplicaciones','Recuperar','Carga de trabajo o repositorio de información que requiere protección.','Continuidad del negocio.','Datos','¿Qué datos y servicios tienen objetivos de recuperación?','▤'],cloud:['Nube corporativa','Aplicaciones','Prevenir','Recursos IaaS/PaaS/SaaS bajo distintos modelos de responsabilidad.','Gobierno de exposición y postura de recursos cloud.','Cloud','¿Qué servicios de nube utilizan y quién los administra?','☁'],
ai_sophos:['Sophos AI Defense','Usuario','Prevenir','Visibilidad y control del uso de aplicaciones de IA a través de sensores Sophos y Sophos Fusion, conforme a sensores y licenciamiento.','Gobierno de shadow AI, alertas y políticas permitir/advertir/bloquear.','Gobierno de IA','¿Qué asistentes y aplicaciones de IA utilizan sus colaboradores?','✦'],ai_guardian:['CrowdStrike Falcon Guardian','Usuario','Detectar','Visibilidad y controles en tiempo de ejecución para agentes de IA que operan en endpoints cubiertos.','Detección y respuesta para actividad de agentes de IA.','Agentes de IA','¿Qué agentes de IA ejecutan acciones con permisos corporativos?','♜'],ai_cato:['Cato AI Security','Red','Prevenir','Controles de seguridad de IA integrados en servicios Cato, según producto y modalidad de conexión.','Protección y políticas del uso de IA desde la plataforma de seguridad.','Seguridad SASE de IA','¿Por dónde pasan las solicitudes de IA y cuáles son los canales inspeccionados?','☁'],
epp:['EPP / Antivirus avanzado','Usuario','Prevenir','Previene o bloquea amenazas conocidas y algunas conductas anómalas mediante controles del endpoint.','Reduce el riesgo de compromiso inicial; no sustituye EDR ni backup.','Protección preventiva','¿Qué protección tienen los equipos actualmente?','⬡'],edr:['EDR','Usuario','Detectar','El sensor EDR opera en el endpoint y registra actividad para detectar y ayudar a investigar amenazas.','Aporta visibilidad y acciones de contención autorizadas.','Detección y respuesta','¿Cómo investigan hoy las alertas de dispositivos?','⌕'],xdr:['XDR','Operación','Detectar','Correlaciona telemetría desde las fuentes integradas que admita cada plataforma.','Investigar incidentes con más contexto.','Correlación','¿Qué herramientas generan actualmente alertas?','◇'],soc:['SOC / MDR','Operación','Responder','Servicio de análisis, investigación y respuesta según alcance y acuerdos operativos.','Acompañamiento operativo para responder oportunamente a eventos.','Monitoreo','¿Quién responde a una alerta fuera del horario laboral?','⚑'],backup:['Backup / Recuperación','Operación','Recuperar','Respalda información y permite restaurarla conforme a políticas, pruebas y capacidades contratadas.','Recuperación y continuidad después de un incidente.','Recuperación','¿Cuánto tiempo pueden permanecer sin sus datos?','↻'],mfa:['MFA','Usuario','Prevenir','Agrega factores de autenticación antes de otorgar acceso en flujos protegidos.','Reduce exposición a uso indebido de credenciales.','Identidad','¿Todos los accesos críticos tienen MFA?','♙'],ztna:['ZTNA','Usuario','Prevenir','Autoriza acceso granular a aplicaciones según identidad y condiciones disponibles.','Acceso remoto sin exposición innecesaria de la red.','Acceso','¿Cuáles aplicaciones deben acceder los usuarios remotos?','⊙'],sase:['SASE / SSE','Red','Prevenir','Converge servicios de acceso y seguridad cloud; las funciones y rutas dependen del proveedor y licencia.','Seguridad consistente para usuarios y sedes distribuidos.','Acceso seguro','¿Dónde se aplica actualmente la inspección de navegación?','☁'],sdwan:['SD-WAN','Red','Prevenir','Selecciona rutas de conectividad conforme a políticas y desempeño de enlaces.','Mejora visibilidad y aprovechamiento de conectividad.','WAN','¿Tienen enlaces redundantes y aplicaciones sensibles?','⇄'],ngfw:['NGFW / Firewall','Red','Prevenir','Controla tráfico que atraviesa sus interfaces y aplica inspección y prevención según políticas.','Control granular y visibilidad del perímetro y segmentos.','Firewall','¿En qué puntos de su red aplican inspección?','⬡'],dlp:['DLP','Aplicaciones','Prevenir','Aplica políticas para inspeccionar contenido y prevenir o detectar salida de información en canales cubiertos.','Disminuye exposiciones no autorizadas de información.','Datos','¿Qué información no debe salir de la empresa?','▤'],waf:['WAF / WAAP','Aplicaciones','Prevenir','Inspecciona solicitudes web y, según producto, APIs y bots; requiere estar en el flujo.','Protección de aplicaciones públicas.','Aplicaciones web','¿Qué aplicaciones y APIs están expuestas a Internet?','⌘'],iam:['IAM','Usuario','Prevenir','Gestiona identidades, permisos y ciclo de vida de cuentas.','Gobierno de acceso a sistemas.','Identidad','¿Quién aprueba altas, bajas y privilegios?','♙'],pam:['PAM','Usuario','Prevenir','Controla accesos y sesiones privilegiadas conforme a la implementación.','Reduce abuso de credenciales privilegiadas.','Privilegios','¿Cómo controlan accesos de administradores?','⚿'],ddos:['Protección DDoS','Red','Responder','Identifica y mitiga ataques de denegación de servicio dentro de su cobertura.','Continuidad de servicios expuestos a saturación.','Disponibilidad','¿Qué servicios necesitan mantenerse disponibles ante ataques volumétricos?','☄'],siem:['SIEM','Operación','Detectar','Recibe, indexa y correlaciona registros de fuentes conectadas.','Visibilidad centralizada y priorización de investigación.','Operación','¿Dónde centralizan hoy los registros de seguridad?','▥'],nac:['NAC','Red','Prevenir','Verifica identidad/postura de dispositivos de red y aplica controles cuando integrados.','Gobierno de acceso y segmentación.','Red','¿Pueden identificar cada equipo conectado?','◎'],switch:['Switching','Red','Prevenir','Conecta los dispositivos LAN y puede soportar segmentación y control según características.','Base de la conectividad interna.','LAN','¿Qué segmentación y capacidad requieren?','⇋'],cnapp:['CNAPP / CSPM','Aplicaciones','Detectar','Conjunto de capacidades de postura y protección cloud dependiente de módulos concretos.','Visibilidad sobre riesgos de configuraciones y cargas en la nube.','Nube','¿Qué riesgos cloud tienen identificados?','☁'],email:['Seguridad de correo','Aplicaciones','Prevenir','Analiza mensajes y adjuntos para reducir amenazas distribuidas por email.','Reduce phishing y amenazas en colaboración.','Correo','¿Cómo protegen buzones y mensajes frente a phishing?','✉']};
const relations={ransomware:[['endpoint','epp','trafico'],['endpoint','edr','telemetria'],['edr','soc','telemetria'],['soc','endpoint','respuesta'],['backup','endpoint','respuesta']],sdwan_only:[['branch','sdwan','trafico'],['sdwan','internet','trafico'],['internet','saas','trafico']],sase_sites:[['branch','sdwan','trafico'],['sdwan','internet','trafico'],['internet','sase','trafico'],['sase','saas','trafico']],sse_only:[['branch','internet','trafico'],['internet','sase','trafico'],['sase','saas','trafico']],remoto:[['remote','mfa','trafico'],['mfa','ztna','trafico'],['ztna','sase','trafico'],['sase','saas','trafico'],['remote','edr','telemetria']],datos:[['endpoint','dlp','trafico'],['dlp','sase','trafico'],['sase','saas','trafico'],['dlp','soc','telemetria']],aplicaciones:[['internet','waf','trafico'],['waf','app','trafico'],['waf','soc','telemetria'],['backup','app','respuesta']],identidad:[['remote','iam','trafico'],['iam','mfa','trafico'],['mfa','pam','trafico'],['pam','saas','trafico'],['iam','soc','telemetria']],ddos:[['internet','ddos','trafico'],['ddos','ngfw','trafico'],['ngfw','app','trafico'],['ddos','soc','telemetria']],visibilidad:[['endpoint','edr','telemetria'],['edr','xdr','telemetria'],['xdr','siem','telemetria'],['siem','soc','telemetria'],['soc','endpoint','respuesta']],continuidad:[['server','backup','telemetria'],['backup','server','respuesta'],['soc','backup','respuesta']],red:[['branch','switch','trafico'],['switch','nac','trafico'],['nac','ngfw','trafico'],['nac','soc','telemetria']],nube:[['internet','cloud','trafico'],['cloud','cnapp','telemetria'],['cnapp','soc','telemetria'],['backup','cloud','respuesta']],correo:[['internet','email','trafico'],['email','endpoint','trafico'],['endpoint','edr','telemetria'],['edr','soc','telemetria']]};
// Reglas de referencia versionadas: en modo genérico no se atribuyen capacidades a fabricantes.
const CONNECTIVITY_RULES={
 'sdwan_only':{generic:{add:[],drop:[],label:'SD-WAN genérico; sin inspección NGFW implícita'},'Fortinet':{add:[],drop:[],label:'FortiGate Secure SD-WAN; firewall integrado según licencias y políticas'},'Cato Networks':{add:[],drop:[],label:'Cato Socket y transporte WAN; inspección en Cato Cloud solo si se contrata SASE'}},
 'sase_sites':{generic:{add:[],drop:[],label:'SASE genérico: conectividad a PoP y controles contratados'},'Cato Networks':{add:[],drop:['ngfw'],label:'Cato Socket → Internet/transporte → Cato Cloud (seguridad integrada); sin firewall físico adicional obligatorio'},'Fortinet':{add:['ngfw'],drop:[],label:'Ejemplo FortiGate Secure SD-WAN → Internet/transporte → FortiSASE; topología y licencias sujetas a validación'}},
 'sse_only':{generic:{add:[],drop:['sdwan','ngfw'],label:'SSE sobre conectividad existente'},'Cato Networks':{add:[],drop:['sdwan','ngfw'],label:'Seguridad cloud Cato con mecanismo de conexión acordado'},'Fortinet':{add:[],drop:['sdwan','ngfw'],label:'FortiSASE con método de steering/on-ramp compatible y licenciado'}}
};
const AI_RULES={
shadow:{name:'Gobierno de Shadow AI',mode:'ai-shadow',vendors:['ai_sophos','ai_cato'],scope:'Descubrimiento y políticas de uso en canales cubiertos.'},
data:{name:'Protección de datos en prompts y archivos',mode:'ai-data',vendors:['ai_sophos','ai_cato'],scope:'Protección de datos según sensores, canal, licencia y política.'},
agent:{name:'Seguridad de agentes autónomos',mode:'ai-agent',vendors:['ai_guardian','ai_cato'],scope:'Controles de agentes locales compatibles según sensor, canal y política habilitados.'},
prompt:{name:'Protección frente a prompt injection',mode:'ai-prompt',vendors:['ai_cato'],scope:'Inspección de interacciones de IA cubiertas por Cato Client y políticas en el PoP; no implica proteger una aplicación propia sin su despliegue específico.'}
};
const ai={enabled:{},selected:{}};
function aiActive(){return st.chosen.includes('ai_security')?Object.keys(AI_RULES).filter(k=>ai.enabled[k]):[]}
function aiReady(k){const v=aiVendor(k);return !!v&&controlState('ai_need_'+k)!=='excluido'&&(v!=='ai_sophos'||controlState('sophos_edr')!=='excluido')&&(v!=='ai_guardian'||controlState('falcon_sensor')!=='excluido')&&(v!=='ai_cato'||controlState('cato_client')!=='excluido')}
function aiVendor(k){return AI_RULES[k]?.vendors.includes(ai.selected[k])?ai.selected[k]:''}
caps.cato_client=['Cato Client · agente en PC','Usuario','Prevenir','Agente instalado en cada PC cubierto, sea usuario de sede o remoto. Conecta directamente con el PoP Cato sobre Internet para inspección de las interacciones de IA cubiertas.','Protección de IA desde el endpoint sin exigir SASE para sedes, SD-WAN ni Cato Socket.','Acceso e inspección de IA','¿Cuántos PCs necesitan el agente y qué interacciones de IA deben cubrirse?','◉'];
caps.sophos_edr=['Sophos EDR','Usuario','Detectar','Agente EDR en el endpoint: base mínima requerida por la arquitectura comercial MC para Sophos AI Defense.','Telemetría del endpoint para investigar actividad y soportar el gobierno de IA.','Base de seguridad Sophos','¿El cliente ya tiene Sophos EDR y sensores compatibles habilitados?','◉'];
caps.falcon_sensor=['Falcon Sensor / EDR','Usuario','Detectar','Sensor Falcon en el endpoint que aporta telemetría para contextualizar actividad de agentes compatibles.','Relacionar prompts, herramientas y acciones con el comportamiento del endpoint.','Runtime de agentes','¿Qué agentes compatibles y sensores Falcon están desplegados?','◉'];
for(const [k,r] of Object.entries(AI_RULES))caps['ai_need_'+k]=[r.name,k==='prompt'?'Aplicaciones':k==='agent'?'Usuario':'Red',k==='agent'?'Detectar':'Prevenir',r.scope,'Controlar el riesgo específico de IA dentro del alcance desplegado.','Seguridad de IA','¿Qué aplicación, canal y política deben cubrirse?','✦'];
// Extensión de necesidades y capacidades respaldadas por el directorio (mismo motor).
if(window.MC_PORTFOLIO){needDefs.push(...MC_PORTFOLIO.needs);Object.assign(caps,MC_PORTFOLIO.capabilities);Object.assign(relations,MC_PORTFOLIO.relations);needDefs.find(n=>n.id==='identidad').caps.push('idprotect');relations.identidad.push(['remote','idprotect','telemetria'],['idprotect','soc','telemetria']);}
function renderAI(){
 let host=$('aiControls');if(!host){host=document.createElement('section');host.id='aiControls';host.className='connectivity';$('connectivity').after(host)}
 host.replaceChildren();host.hidden=!st.chosen.includes('ai_security');if(host.hidden)return;
 const title=document.createElement('strong');title.textContent='Seguridad de IA · necesidad y alternativa';host.append(title);
 for(const [k,r] of Object.entries(AI_RULES)){
  const label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=!!ai.enabled[k];check.setAttribute('aria-label',r.name);label.append(check,document.createTextNode(r.name));host.append(label);
  check.onchange=()=>{ai.enabled[k]=check.checked;mesh.mode=r.mode;render()};if(!ai.enabled[k])continue;
  const sel=document.createElement('select');sel.setAttribute('aria-label','Alternativa para '+r.name);
  for(const v of ['',...r.vendors]){const o=document.createElement('option');o.value=v;o.textContent=v?caps[v][0]:'Selecciona una alternativa compatible';sel.append(o)}
  sel.value=aiVendor(k);sel.onchange=()=>{ai.selected[k]=sel.value;mesh.mode=r.mode;render()};host.append(sel);
  const note=document.createElement('p');note.className='tiny';note.textContent=r.scope+(aiVendor(k)==='ai_sophos'?' Requisito MC: Sophos EDR incluido o existente. Si se excluye, IA queda sin cobertura.':aiVendor(k)==='ai_guardian'?' Requiere sensor Falcon y agente compatible en el endpoint.':aiVendor(k)==='ai_cato'?' Agente Cato Client en cada PC → PoP Cato. Inspección en el PoP; sin exigir SASE de sedes, SD-WAN ni Socket.':'');host.append(note);
 }
}
const connectivityIds=new Set(Object.keys(CONNECTIVITY_RULES));
const st={chosen:[],focus:null,domain:'Todos',phase:'Todas',step:-1,playing:false,client:'Empresa Demo',overrides:{},vendors:{},connectivityVendor:'generic'};
const txt=(element,string)=>{element.textContent=string}; const el=(name,attrs={},parent)=>{let n=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(parent)parent.append(n);return n};
const safe=val=>String(val||'').replace(/[<>]/g,'').slice(0,120);
const proposedCaps=()=>{let arr=st.chosen.flatMap(n=>needDefs.find(x=>x.id===n)?.caps||[]);for(const id of st.chosen.filter(x=>connectivityIds.has(x))){const rule=CONNECTIVITY_RULES[id][st.connectivityVendor]||CONNECTIVITY_RULES[id].generic;arr.push(...rule.add);arr=arr.filter(x=>!rule.drop.includes(x));}if(window.MC_SMART?.last&&context().sites>0)arr.push('branch');arr.push(...aiActive().map(k=>'ai_need_'+k));if(aiActive().some(k=>aiVendor(k)==='ai_sophos'))arr.push('sophos_edr');if(aiActive().some(k=>aiVendor(k)==='ai_guardian'))arr.push('falcon_sensor');if(aiActive().some(k=>aiVendor(k)==='ai_cato'))arr.push('cato_client');return [...new Set(arr)]};
const allCaps=()=>[...new Set(['internet',...proposedCaps()])].filter(k=>infrastructure.has(k)||st.overrides[k]!=='excluido');
const controlState=k=>st.overrides[k]||'propuesto';
const weights={ai_sophos:4,ai_guardian:4,ai_cato:4,epp:4,edr:5,mfa:3,soc:5,backup:5,ngfw:4,sase:4,dlp:4,waf:4,siem:4,pam:4,nac:4,ztna:4,xdr:4,ddos:5,cnapp:4,iam:4,sdwan:3,email:4};
const infrastructure=new Set(['endpoint','remote','branch','internet','saas','app','server','cloud','switch']);
function evaluation(){let recommended=proposedCaps().filter(k=>!infrastructure.has(k));let total=recommended.reduce((n,k)=>n+(weights[k]||3),0),covered=recommended.filter(k=>controlState(k)!=='excluido'&&(!k.startsWith('ai_need_')||aiReady(k.slice(8)))).reduce((n,k)=>n+(weights[k]||3),0);return {recommended,missing:recommended.filter(k=>controlState(k)==='excluido'||(k.startsWith('ai_need_')&&!aiReady(k.slice(8)))),score:total?Math.round(100*covered/total):null,covered,total};}
function coverageRender(){const e=evaluation();$('coverageValue').textContent=e.score===null?'—':e.score+'%';$('coverageBar').style.width=(e.score||0)+'%';$('coverageNote').textContent=e.score===null?'Selecciona una necesidad para evaluar controles.':`${e.covered} de ${e.total} puntos ponderados de controles de referencia presentes. Índice ilustrativo, NO nivel de seguridad real.`;const area=$('coverageWarnings');area.replaceChildren();for(const id of e.missing){let d=document.createElement('p');d.className='alert';d.textContent=`Brecha: ${caps[id][0]} sin alternativa o excluido; su contribución no está cubierta.`;area.append(d)}}
function controlRender(){let root=$('controls');root.replaceChildren();let keys=proposedCaps().filter(k=>!infrastructure.has(k));if(!keys.length){root.textContent='Selecciona una necesidad para personalizar sus controles.';return}keys.forEach(id=>{const c=caps[id];if(!c)return;const row=document.createElement('div');row.className='controlrow';const label=document.createElement('span');label.textContent=c[0];const sel=document.createElement('select');sel.setAttribute('aria-label','Estado de '+c[0]);[['propuesto','Incluir en propuesta'],['existente','Ya lo tiene el cliente'],['excluido','Excluir']].forEach(([value,text])=>{let op=document.createElement('option');op.value=value;op.textContent=text;sel.append(op)});sel.value=controlState(id);sel.onchange=()=>{st.overrides[id]=sel.value;st.step=-1;render();log('Actualizada capacidad: '+c[0]+' → '+sel.options[sel.selectedIndex].text)};row.append(label,sel);root.append(row)})}

const uniqueEdges=()=>{const seen=new Set();return st.chosen.flatMap(n=>{let edges=[...(relations[n]||[])];if(n==='sase_sites'&&st.connectivityVendor==='Fortinet')edges=[['branch','ngfw','trafico'],['ngfw','sdwan','trafico'],['sdwan','internet','trafico'],['internet','sase','trafico'],['sase','saas','trafico']];if(n==='sase_sites'&&st.connectivityVendor==='Cato Networks')edges=[['branch','sdwan','trafico'],['sdwan','internet','trafico'],['internet','sase','trafico'],['sase','saas','trafico']];return edges}).filter(([a,b,t])=>allCaps().includes(a)&&allCaps().includes(b)).filter(([a,b,t])=>{const k=[a,b,t].join(':');if(seen.has(k))return false;seen.add(k);return true})};
function setConnectivityVendor(brand){
 st.connectivityVendor=brand;if(brand==='Cato Networks'&&context().sites>=2&&!mesh.mode.startsWith('ai-')&&!['ransomware','exfil','access','web','ddos'].includes(mesh.mode))mesh.mode='site-site';
 st.step=-1;
 // Una sola fuente de verdad para la marca que determina la arquitectura.
 if(brand==='generic'){
   delete st.vendors.sase;
   delete st.vendors.sdwan;
   delete st.vendors.ngfw;
 }else{
   st.vendors.sase=brand;
   if(brand==='Cato Networks')delete st.vendors.ngfw;
   st.vendors.sdwan=brand;
 }
}
function renderConnectivity(){const host=$('connectivity');if(!host)return;host.replaceChildren();let active=st.chosen.filter(x=>connectivityIds.has(x));if(!active.length){host.hidden=true;return}host.hidden=false;const title=document.createElement('strong');title.textContent='Arquitectura por fabricante';host.append(title);const sel=document.createElement('select');[['generic','Sin fabricante (referencia)'],['Cato Networks','Cato Networks'],['Fortinet','Fortinet']].forEach(([v,t])=>{const op=document.createElement('option');op.value=v;op.textContent=t;sel.append(op)});sel.value=st.connectivityVendor;sel.onchange=()=>{setConnectivityVendor(sel.value);render()};host.append(sel);const activeBrand=document.createElement('p');activeBrand.className='tiny';activeBrand.textContent='Topología activa: '+(st.connectivityVendor==='generic'?'Referencia genérica':st.connectivityVendor)+' · seleccionar otro fabricante reconstruye los nodos y enlaces.';host.append(activeBrand);if(active.includes('sdwan_only')&&st.connectivityVendor==='Cato Networks'){const tip=document.createElement('p');tip.textContent='Recomendación: explorar SASE de Cato para seguridad integrada; SD-WAN no implica inspección contratada.';host.append(tip)}for(const id of active){const note=document.createElement('p');note.className='tiny';note.textContent=CONNECTIVITY_RULES[id][st.connectivityVendor]?.label||CONNECTIVITY_RULES[id].generic.label;host.append(note)}}
function renderNeeds(){let root=$('needs');root.replaceChildren();for(const n of needDefs){let b=document.createElement('button');b.className='need '+(st.chosen.includes(n.id)?'active':'');b.innerHTML=`<span class="needico">${n.icon}</span><span><strong>${n.name}</strong><small>${n.desc}</small></span><span class="needcheck">${st.chosen.includes(n.id)?'✓':'+'}</span>`;b.onclick=()=>{st.chosen=st.chosen.includes(n.id)?st.chosen.filter(x=>x!==n.id):[...st.chosen,n.id];st.step=-1;st.focus=proposedCaps()[0]||null;render()};root.append(b)}}
function renderFilters(){for(const [id,arr,what] of [['domains',['Todos','Red','Usuario','Aplicaciones','Operación'],'domain'],['phases',['Todas','Prevenir','Detectar','Responder','Recuperar'],'phase']]){let host=$(id);host.replaceChildren();for(const item of arr){let b=document.createElement('button');b.className='chip '+(st[what]===item?'selected':'');b.textContent=item;b.onclick=()=>{st[what]=item;renderFilters();renderGraph()};host.append(b)}}}
function context(){return {sites:Math.max(0,Number($('branches').value)||0),users:Math.max(0,Number($('users').value)||0),remotes:Math.max(0,Number($('remote').value)||0),apps:$('appType').value};}
const strategicPhases=['Prevenir','Detectar','Responder','Recuperar'];
const contributions={ai_need_shadow:['Prevenir','Detectar'],ai_need_data:['Prevenir','Detectar'],ai_need_agent:['Detectar','Responder'],ai_need_prompt:['Prevenir','Detectar'],sophos_edr:['Detectar','Responder'],falcon_sensor:['Detectar'],cato_client:['Prevenir'],ai_sophos:['Prevenir','Detectar'],ai_guardian:['Detectar','Responder'],ai_cato:['Prevenir','Detectar'],epp:['Prevenir'],edr:['Detectar','Responder'],mfa:['Prevenir'],soc:['Detectar','Responder'],backup:['Recuperar'],ngfw:['Prevenir','Detectar'],sase:['Prevenir','Detectar'],sdwan:['Prevenir'],xdr:['Detectar'],siem:['Detectar'],dlp:['Prevenir','Detectar'],nac:['Prevenir'],waf:['Prevenir','Detectar'],ztna:['Prevenir'],iam:['Prevenir'],pam:['Prevenir','Detectar'],cnapp:['Prevenir','Detectar'],ddos:['Prevenir','Responder'],email:['Prevenir','Detectar']};
function renderStrategy(){const host=$('strategySummary');host.replaceChildren();const selected=proposedCaps().filter(k=>!infrastructure.has(k));for(const ph of strategicPhases){const applicable=selected.filter(k=>(contributions[k]||[caps[k]?.[2]]).includes(ph));const enabled=applicable.filter(k=>controlState(k)!=='excluido'&&(!k.startsWith('ai_need_')||aiReady(k.slice(8))));const box=document.createElement('div');box.className='strategy-phase'+(applicable.length&&!enabled.length?' missing':'');const title=document.createElement('b');title.textContent=ph;const note=document.createElement('small');note.textContent=applicable.length?enabled.length+'/'+applicable.length+' controles contemplados':'Sin control específico';box.append(title,note);box.title=enabled.map(k=>caps[k][0]).join(', ')||'No se infiere cobertura';host.append(box)}}
function positions(keys){let out={};const rank={internet:2,remote:0,branch:0,endpoint:0,server:0,cloud:1,email:1,sdwan:1,mfa:1,iam:1,switch:1,epp:1,ddos:1,ngfw:1,ztna:2,dlp:2,edr:2,nac:2,backup:2,waf:2,pam:2,sase:3,xdr:3,cnapp:3,siem:4,saas:4,app:4,soc:5};const buckets={};keys.forEach(k=>(buckets[rank[k]??2]??=[]).push(k));Object.entries(buckets).forEach(([col,group])=>{let x=94+Number(col)*175;group.forEach((key,i)=>{out[key]={x,y:80+(i+1)*455/(group.length+1)}})});return out}

// v0.8 — Simulador multisedes; las rutas son ejemplos pedagógicos, no tráfico capturado.
const mesh={mode:'site-saas',playing:false,token:0};
const meshModes=[
 ['ai-shadow','IA: Shadow AI','attack'],['ai-data','IA: archivo confidencial','attack'],['ai-agent','IA: agente ejecuta acción','attack'],['ai-prompt','IA: prompt injection','attack'],
 ['site-saas','Sede → SaaS · salida local','normal'],['site-site','Entre sedes · privado / Internet','normal'],['site-private','Sede → aplicación privada / DC','normal'],['remote-private','Remoto → app privada','normal'],
 ['ransomware','Ransomware en sede 3','attack'],['exfil','Exfiltración simulada','attack'],['access','Acceso sospechoso','attack'],['web','Solicitud web maliciosa','attack'],['ddos','Tráfico DDoS simulado','attack']
];
function isMesh(){return st.chosen.includes('ai_security')||st.chosen.includes('sase_sites')||st.chosen.includes('sdwan_only')||st.chosen.includes('sse_only')}
function meshBar(){if(st.chosen.includes('ai_security')&&!st.chosen.some(n=>connectivityIds.has(n))&&mesh.mode==='site-saas')mesh.mode=AI_RULES[aiActive()[0]]?.mode||'ai-data';let host=$('meshControls');if(!host){host=document.createElement('div');host.id='meshControls';host.className='mesh-toolbar';$('topology').parentElement.insertBefore(host,$('topology'))}host.replaceChildren();host.hidden=!isMesh();if(!isMesh())return;
 const lab=document.createElement('label');lab.textContent='Recorrido que deseas demostrar';host.append(lab);
 const sel=document.createElement('select');sel.id='meshMode';for(const [id,name] of meshModes){let o=document.createElement('option');o.value=id;o.textContent=name;if(id.startsWith('ai-'))o.disabled=!st.chosen.includes('ai_security');sel.append(o)}if(mesh.mode.startsWith('ai-')&&!st.chosen.includes('ai_security'))mesh.mode='site-saas';sel.value=mesh.mode;sel.onchange=()=>{mesh.mode=sel.value;mesh.token++;st.step=-1;renderGraph()};host.append(sel);
 const btn=document.createElement('button');btn.className='primary';btn.textContent='▶ Animar recorrido';btn.onclick=()=>animateMesh();host.append(btn);
 const hint=document.createElement('span');hint.className='mesh-hint';hint.id='meshHint';host.append(hint);
}
function renderMesh(){
 const svg=$('topology'),boxes=$('boxes'),links=$('links'),particles=$('particles');
 if($('backboneBackdrop'))$('backboneBackdrop').remove();if($('aiBackdrop'))$('aiBackdrop').remove();boxes.replaceChildren();links.replaceChildren();particles.replaceChildren();svg.removeAttribute('hidden');svg.style.display='block';$('empty').hidden=true;
 const c=context(),sase=st.chosen.includes('sase_sites')&&allCaps().includes('sase'),sse=!sase&&st.chosen.includes('sse_only')&&allCaps().includes('sase'),brand=st.connectivityVendor;
 const cato=(sase||sse||st.chosen.includes('sdwan_only'))&&brand==='Cato Networks',fortinet=brand==='Fortinet';
 const ransomware=st.chosen.includes('ransomware'),needEdr=ransomware&&allCaps().includes('edr')&&controlState('edr')!=='excluido';
 const needEpp=ransomware&&allCaps().includes('epp')&&controlState('epp')!=='excluido';
 const needBackup=ransomware&&allCaps().includes('backup')&&controlState('backup')!=='excluido';
 const needSoc=ransomware&&allCaps().includes('soc')&&controlState('soc')!=='excluido';
 const count=Math.min(4,Math.max(1,c.sites||1)),nodes={},routes=[];
 const add=(id,name,sub,x,y,kind='asset',symbol='◇',control='')=>{nodes[id]={id,name,sub,x,y,kind,symbol,control}};
 const edge=(a,b,t='trafico',label='')=>{if(nodes[a]&&nodes[b]&&!routes.some(r=>r.a===a&&r.b===b&&r.t===t))routes.push({a,b,t,label})};
 const distributed=cato&&count>=2;
 add('internet','INTERNET','Transporte última milla',470,52,'asset','◎');
 for(let i=0;i<count;i++){
  const id=i+1,y=110+i*390/Math.max(1,count-1),siteName=id===1?'Sede principal':'Sede '+id;
  add('s'+id,siteName,`LAN · ${Math.round(c.users/count)} usuarios aprox.`,105,y,'asset','▥');
  add('e'+id,cato?'Cato Socket':fortinet?'FortiGate':sse?'Acceso existente':'SD-WAN Edge',cato?'Borde Cato · túnel':fortinet?(allCaps().includes('ngfw')?'SD-WAN · NGFW incluido':'Secure SD-WAN'):'Transporte WAN',290,y,'edge','⇄','sdwan');
  edge('s'+id,'e'+id);
  edge('e'+id,'internet','wan','Última milla');
 }
 if(c.sites>count)add('extra',`+ ${c.sites-count} sedes`,'Mismo modelo de referencia',130,587,'asset','▥');
 if(cato){
  add('pop1',distributed?'PoP de destino':'PoP Cato compartido',sase||sse?'Seguridad integrada · Cato Cloud':'Conectividad Cato Cloud',545,205,'pop','☁','sase');
  if(distributed)add('pop2','PoP de origen','Conectividad geográfica ilustrativa',745,322,'pop','☁','sase');
 }else if(sase||sse)add('pop1',fortinet?'FortiSASE PoP':sse?'SSE Cloud':'SASE PoP','Servicios habilitados',585,217,'pop','☁','sase');
 else add('hub','Overlay SD-WAN','Rutas y políticas WAN',575,219,'pop','⇆','sdwan');
 add('saas','Aplicación SaaS','Destino público',967,134,'asset','☁');
 add('private','Aplicación privada / DC','Recurso alojado detrás de sede 1',967,346,'asset','▣');
 if(c.remotes>0)add('remote','Usuarios remotos',`${c.remotes} colaboradores`,995,60,'asset','♙');
 if(ransomware){
  if(needEpp)add('epp-node','EPP en PC sede 3','Protección preventiva',420,555,'security','⬡','epp');
  if(needEdr)add('edr-node','EDR en PC sede 3','Detección por comportamiento',575,555,'security','◉','edr');
  if(needBackup)add('backup-node','Backup / recuperación','Restauración condicionada',730,555,'security','↻','backup');
  if(needSoc)add('soc','SOC / MDR','Alerta y respuesta autorizada',994,555,'service','⚑','soc');
 }else if(allCaps().includes('soc')&&controlState('soc')!=='excluido')add('soc','SOC / MDR','Telemetría y respuesta',994,555,'service','⚑','soc');
 const aiPaths={},aiDemos={},aiLanes=[],aiPopZones=[];
 const endpointAI=aiActive().some(k=>!!aiVendor(k));
 const focusedAI=endpointAI&&st.chosen.every(n=>n==='ai_security');
 if(focusedAI){for(const id of Object.keys(nodes))delete nodes[id];routes.length=0;add('internet','INTERNET','Contexto de conectividad',1000,55,'asset','◎');}
 let laneBottom=focusedAI?110:630;

 for(const [index,k] of aiActive().entries()){
  const v=aiVendor(k),control='ai_need_'+k;
  if(!v||controlState(control)==='excluido')continue;
  const y=laneBottom+80,id='ai-'+k;laneBottom+=330;
  add(id,caps[v][0],AI_RULES[k].name,650,y,'security','✦',control);
  if(v==='ai_cato'){
   const pc='ai-pc-'+k,access='ai-access-'+k,pop='ai-pop-'+k,app='ai-app-'+k;
   delete nodes[id];
   aiPopZones.push({y:y-5});aiLanes.push({k,y:y-65,height:295,title:'CATO IA · AGENTE EN CADA PC → POP',note:'Usuarios de sede o remotos · conexión por Internet · detección en el PoP'});
   add(pc,'PC del colaborador','Agente por cada PC cubierto',135,y+40,'asset','▣','endpoint');
   if(controlState('cato_client')!=='excluido')add(access,'Cato Client','Agente instalado en el PC',365,y+40,'security','◉','cato_client');
   add(pop,'PoP Cato · IA','Punto de inspección',625,y+40,'pop','☁',control);
   add(id,'Cato AI Security','Motor IA dentro del PoP',855,y+40,'security','✦',control);
   add(app,k==='agent'?'Herramienta / MCP':'Servicio de IA',k==='prompt'?'Interacción IA cubierta':'Solo tráfico permitido',855,y+170,'asset','✦','saas');
   edge(pc,access,'trafico','Interacción del usuario o agente local');
   edge(access,'internet','wan','Última milla Internet');
   edge(access,pop,'tunnel','Conexión directa al PoP sobre Internet');
   edge(pop,id,'telemetria','Inspección IA dentro del PoP');
   edge(id,app,'trafico','Únicamente si la política permite');
   edge(id,access,'respuesta','Decisión de política desde el PoP');edge(access,pc,'respuesta','Resultado al usuario o agente local');
   aiPaths[k]=aiReady(k)?[pc,access,pop,id]:[];
   const attempt={shadow:'El usuario utiliza una herramienta de IA no autorizada desde su PC.',data:'El usuario intenta enviar datos sensibles en un prompt o archivo.',agent:'Un agente local intenta una acción con una herramienta o MCP cubierto.',prompt:'Una interacción cubierta contiene un intento simulado de prompt injection.'}[k];
   aiDemos[k]=aiReady(k)?[
    {a:pc,b:access,type:'attack',text:attempt+' Cato Client está instalado en ese equipo.'},
    {a:access,b:pop,type:'trafico',text:'El agente Cato Client conecta directamente con el PoP sobre Internet. No necesita SD-WAN, Socket ni SASE para sedes.'},
    {a:pop,b:id,type:'telemetria',text:'La detección e inspección de IA se representa dentro del PoP Cato, según canal, licencia y política compatibles.'},
    {a:id,b:access,type:'respuesta',text:'El PoP aplica la política correspondiente: registrar, advertir o bloquear según el control disponible. Solo lo permitido continúa al servicio de IA.'},
    {a:access,b:pc,type:'respuesta',text:'El PC recibe el resultado. La protección cubre esta interacción del usuario o agente local; no implica proteger por sí sola una aplicación propia de IA.'}
   ]:[];
  }else{
   const sophos=v==='ai_sophos',pc='ai-pc-'+k,sensor='ai-sensor-'+k,app='ai-app-'+k,consoleId='ai-console-'+k,agent='ai-agent-'+k,tool='ai-tool-'+k;
   delete nodes[id];
   aiLanes.push({k,y:y-65,height:295,title:sophos?'SOPHOS · ENDPOINT, EDR Y GOBIERNO DE IA':'CROWDSTRIKE · AGENTE, HERRAMIENTAS Y RUNTIME',note:AI_RULES[k].name});
   add(pc,'PC del colaborador','Endpoint del cliente',135,y+40,'asset','▣','endpoint');
   if(sophos){
    add(app,k==='data'?'Archivo / prompt':'Herramienta de IA',k==='data'?'Intento de compartir datos':'Uso de IA no autorizada',370,y+40,'asset','✦','saas');
    if(controlState('sophos_edr')!=='excluido')add(sensor,'Sophos EDR','Agente en el mismo PC',135,y+170,'security','◉','sophos_edr');
    add(consoleId,'Sophos Fusion','Consola de investigación',600,y+170,'service','⌕','sophos_edr');
    add(id,'Sophos AI Defense','Gobierno y políticas de IA',855,y+170,'security','✦',control);
    edge(pc,app,'trafico','Uso de IA desde el equipo');edge(pc,sensor,'telemetria','Señales del endpoint');edge(sensor,consoleId,'telemetria','Telemetría EDR');edge(consoleId,id,'telemetria','Contexto para gobierno de IA');edge(id,pc,'respuesta','Política según sensor y canal');
    aiPaths[k]=aiReady(k)?[pc,sensor,consoleId,id]:[];
    aiDemos[k]=[
     {a:pc,b:app,type:'attack',text:k==='data'?'El colaborador intenta enviar un archivo o prompt con datos sensibles.':'El colaborador abre una herramienta de IA no autorizada.'},
     {a:pc,b:sensor,type:'telemetria',text:'El agente Sophos EDR del equipo aporta señales del endpoint. Es la base mínima de esta propuesta MC.'},
     {a:sensor,b:consoleId,type:'telemetria',text:'La telemetría llega a Sophos Fusion para aportar contexto a la investigación.'},
     {a:consoleId,b:id,type:'telemetria',text:'AI Defense evalúa el uso de IA y el riesgo dentro del alcance de los sensores habilitados.'},
     {a:id,b:pc,type:'respuesta',text:'Se representa una política de registrar, advertir o bloquear según canal y configuración. No se garantiza bloqueo universal.'}
    ];
   }else{
    add(agent,'Agente de IA','Proceso en el endpoint',370,y+40,'asset','✦','endpoint');
    add(tool,'Herramienta / MCP','Intento de acción riesgosa',625,y+40,'asset','⚿','app');
    if(controlState('falcon_sensor')!=='excluido')add(sensor,'Falcon Sensor / EDR','Sensor en el mismo PC',135,y+170,'security','◉','falcon_sensor');
    add(id,'Falcon Guardian','Análisis del runtime',625,y+170,'security','♜',control);
    add(consoleId,'Consola Falcon','Investigación del evento',880,y+170,'service','⌕','falcon_sensor');
    edge(pc,agent,'trafico','Prompt del usuario');edge(agent,tool,'trafico','Llamada de herramienta');edge(agent,sensor,'telemetria','Actividad observada');edge(sensor,id,'telemetria','Contexto de endpoint y agente');edge(id,consoleId,'telemetria','Evento para investigación');edge(id,agent,'respuesta','Control según política soportada');
    aiPaths[k]=aiReady(k)?[pc,agent,sensor,id,consoleId]:[];
    aiDemos[k]=[
     {a:pc,b:agent,type:'trafico',text:'El usuario entrega una instrucción al agente de IA que se ejecuta en su endpoint.'},
     {a:agent,b:tool,type:'attack',text:'El agente intenta invocar una herramienta o MCP con una acción fuera de política. Es una simulación.'},
     {a:agent,b:sensor,type:'telemetria',text:'El sensor Falcon observa la ejecución del agente y su contexto en el equipo compatible.'},
     {a:sensor,b:id,type:'telemetria',text:'Guardian relaciona la instrucción, la herramienta y el comportamiento real del endpoint.'},
     {a:id,b:consoleId,type:'telemetria',text:'La consola Falcon presenta el evento y su contexto para investigación. No se infiere un SOC externo.'},
     {a:id,b:agent,type:'respuesta',text:'Se ilustra una acción de control disponible solo según agente, licencia y política compatibles; requiere validación.'}
    ];
   }
   if(!aiReady(k))aiDemos[k]=[];
  }
 }
 for(let i=1;i<=count;i++){
  if(cato){edge('e'+i,distributed&&i>Math.ceil(count/2)?'pop2':'pop1','tunnel','Túnel sobre Internet');}
  else if((sase||sse)&&!fortinet)edge('e'+i,'pop1','tunnel');
  else if(!sase&&!sse)edge('e'+i,'hub','tunnel');
 }
 if(cato){
  edge('internet','pop1','tunnel','Transporte Internet → PoP');
  if(distributed)edge('pop1','pop2','backbone','BACKBONE PRIVADO CATO · tránsito inter-PoP');
  if(distributed)edge('pop2','saas');edge('pop1','saas');edge('e1','private','trafico','DC alojado detrás de sede principal');
 }else if(sase||sse){edge('internet','pop1','tunnel');if(fortinet){edge('internet','saas','wan','Salida a SaaS por Internet');}else{edge('pop1','saas');edge('pop1','private');}}
 else{edge('hub','private');edge('hub','internet','wan','Salida a Internet');edge('internet','saas');}
 if(nodes.remote){edge('remote','internet','wan');edge('remote',cato?(distributed?'pop2':'pop1'):sase||sse?'pop1':'hub','tunnel');}if(nodes.e1)edge('e1','private','trafico','Acceso al DC de sede principal');
 if(ransomware){
  if(needEpp)edge('s3' in nodes?'s3':'s1','epp-node','telemetria','Agente en endpoint');
  if(needEdr){edge('s3' in nodes?'s3':'s1','edr-node','telemetria','Sensor EDR local');if(needSoc)edge('edr-node','soc','telemetria','Alerta de seguridad');}
  if(needBackup)edge('backup-node','s3' in nodes?'s3':'s1','respuesta','Recuperación posible');
  if(needSoc&&needEdr)edge('soc','edr-node','respuesta','Contención autorizada');
 }else if(nodes.soc)edge(sase||sse?'pop1':'hub','soc','telemetria');
 const represented=new Set(Object.values(nodes).map(n=>n.control));if(fortinet&&nodes.e1)represented.add('ngfw');
 const supplemental=allCaps().filter(k=>!infrastructure.has(k)&&!represented.has(k)&&!k.startsWith('ai_'));
 supplemental.forEach((k,i)=>add('cap-'+k,caps[k][0],'Control · alcance independiente',130+(i%6)*175,laneBottom+100+Math.floor(i/6)*95,'security',caps[k][7],k));
 for(const [a,b,t] of uniqueEdges()){
  const find=k=>Object.values(nodes).find(n=>n.control===k)?.id;
  const A=find(a),B=find(b);if(A&&B)edge(A,B,t);
 }
 if(cato&&!focusedAI){
  nodes.internet.x=430;nodes.internet.y=52;
  for(let i=1;i<=count;i++){const y=count===1?330:470-(i-1)*330/(count-1);nodes['s'+i].y=y;nodes['e'+i].y=y;}
  nodes.pop1.x=570;nodes.pop1.y=distributed?410:330;
  if(nodes.pop2){nodes.pop2.x=570;nodes.pop2.y=210;}
  nodes.saas.x=1000;nodes.saas.y=190;nodes.private.x=1000;nodes.private.y=440;
  if(nodes.remote){nodes.remote.x=1000;nodes.remote.y=60;}
 }
 renderTransportStory(cato&&!focusedAI,fortinet&&!focusedAI,distributed);
 const sourceSite=count>=3?'s3':'s'+count,sourceEdge=count>=3?'e3':'e'+count;
 const sourcePop=cato&&distributed&&Math.min(3,count)>Math.ceil(count/2)?'pop2':'pop1';
 const ingress=cato||sase||sse?(cato?[sourcePop,...(sourcePop==='pop2'?['pop1']:[])]:['pop1']):['hub'];
 const destination=cato||sase||sse?(cato?['pop1']:['pop1']):['hub'];
 // Las rutas operativas utilizan enlaces existentes; la capa maliciosa es un intento didáctico.
 let path=[],message='',detected=false,detector='',isAttack=meshModes.find(x=>x[0]===mesh.mode)?.[2]==='attack';
 switch(mesh.mode){
  case 'site-site':if(count<2){path=[];message='Selecciona al menos dos sedes para demostrar tránsito entre ubicaciones.';break;}path=cato?[sourceSite,sourceEdge,...ingress,'e1','s1']:[sourceSite,sourceEdge,'internet','e1','s1'];message=cato?'Acceso local por Internet hasta el PoP. Entre PoPs, el tráfico viaja por el BACKBONE PRIVADO CATO y sale hacia la sede principal. Distribución geográfica ilustrativa.':'FortiGate a FortiGate por túnel sobre INTERNET en esta plantilla. No se representa un backbone privado de Cato.';break;
  case 'site-private':path=cato?[sourceSite,sourceEdge,...ingress,'e1','private']:[sourceSite,sourceEdge,'internet','e1','private'];message=cato?'Aplicación privada detrás de sede principal: última milla por Internet, tránsito inter-PoP por backbone privado y entrega al DC.':'Acceso al DC mediante transporte INTERNET y FortiGate de destino en esta plantilla.';break;
  case 'remote-private':path=c.remotes?(cato?['remote',...(distributed?['pop2','pop1']:['pop1']),'e1','private']:['remote','internet',...destination,'internet','e1','private']):[];message=c.remotes?'El usuario remoto ingresa al servicio y alcanza una aplicación privada conectada por la sede principal.':'Configura al menos un usuario remoto para mostrar este recorrido.';break;
  case 'ransomware':{
   path=[sourceSite,...(needEdr?['edr-node',...(needSoc?['soc']:[])]:cato?[sourceEdge,...ingress,'e1','s1']:[sourceEdge,'internet','e1','s1'])];
   detector='edr';detected=needEdr;
   message=needEdr?'Ransomware simulado nace en el PC de la sede 3. El agente EDR local puede detectar el comportamiento; '+(needSoc?'la alerta se envía al SOC/MDR.':'no se incluye SOC/MDR para recepción gestionada.')+(needBackup?' Hay posibilidad de recuperación con respaldo.':' No se incluye respaldo.'): 'No se ha incluido EDR: se representa un intento de propagación hacia otra sede sin atribuir una detección inexistente.';
   break;}
  case 'ai-shadow':case 'ai-data':case 'ai-agent':case 'ai-prompt':{
   const k=Object.keys(AI_RULES).find(k=>AI_RULES[k].mode===mesh.mode);
   path=aiPaths[k]||[];detected=path.length>1;
   message=detected?AI_RULES[k].name+': '+AI_RULES[k].scope+' Resultado condicionado a despliegue y política; no se presupone integración SOC.':'Arquitectura incompleta: falta una alternativa, el control IA o su agente/sensor requerido. No se demuestra detección ni bloqueo.';break;
  }
  case 'exfil':path=fortinet?[sourceSite,sourceEdge,'internet',...(sase||sse?['pop1','internet']:[]),'saas']:[sourceSite,sourceEdge,...ingress,...(!cato&&!sase&&!sse?['internet']:[]),'saas'];detector='dlp';detected=false;message=detected?'DLP podría aplicar políticas al canal cubierto.':'No se demuestra DLP en esta ruta; un control fuera del recorrido no implica inspección.';break;
  case 'access':path=c.remotes?['remote','internet',...destination,'private']:[];detector='mfa';detected=false;message=detected?'MFA podría exigir autenticación adicional.':'No se demuestra MFA en este recorrido.';break;
  case 'web':path=['internet','saas'];detector='waf';detected=false;message=detected?'El WAF puede inspeccionar solicitudes cubiertas por su política.':'No se demuestra WAF en este recorrido.';break;
  case 'ddos':path=['internet','saas'];detector='ddos';detected=false;message=detected?'La mitigación DDoS puede tratar el tráfico según alcance contratado.':'No se demuestra mitigación DDoS en este recorrido.';break;
  default:path=fortinet?[sourceSite,sourceEdge,'internet',...(sase||sse?['pop1','internet']:[]),'saas']:[sourceSite,sourceEdge,...(cato?[sourcePop]:ingress),...(!cato&&!sase&&!sse?['internet']:[]),'saas'];message='Acceso sede a SaaS con conexión WAN y controles SASE según plataforma.';
 }
 path=path.filter(id=>nodes[id]);
 // Reglas de visualización de flujos: solo trayectos entre nodos conectados física/lógicamente.
 const connected=(a,b)=>routes.some(r=>(r.a===a&&r.b===b)||(r.b===a&&r.a===b));
 let validPath=path.length>1&&path.every((v,i)=>!i||connected(path[i-1],v));
 if(!validPath){message+=' Recorrido no disponible en la topología actual; no se inventan enlaces.';path=[];}
 if(cato&&!focusedAI){
  const backdrop=el('g',{id:'backboneBackdrop','aria-label':'Cato Cloud · backbone privado global'},null);svg.insertBefore(backdrop,links);
  el('rect',{x:440,y:95,width:440,height:405,rx:25,class:'cato-cloud-zone'},backdrop);
  const line=(text,x,y,cls)=>{const t=el('text',{x,y,class:cls},backdrop);t.textContent=text};
  line(distributed?'CATO PRIVATE BACKBONE':'CATO CLOUD · PoP LOCAL',460,128,'cato-cloud-title');
  line(distributed?'RED PRIVADA GLOBAL ENTRE PoPs':'Acceso al servicio desde Internet',460,152,'cato-cloud-sub');
  if(distributed){
   line('TRÁNSITO',635,285,'backbone-word');line('PRIVADO',635,315,'backbone-word backbone-word-main');
   line('PoP ↔ PoP',635,345,'cato-cloud-sub');line('Última milla: Internet',460,478,'cato-cloud-foot');
  }else line('Sin salto inter-PoP en este recorrido',460,478,'cato-cloud-foot');
 }
 const activeAIKey=Object.keys(AI_RULES).find(k=>AI_RULES[k].mode===mesh.mode),demo=aiDemos[activeAIKey]||[];
 const highlighted=new Set();for(let i=1;i<path.length;i++)highlighted.add([path[i-1],path[i]].sort().join('|'));
 for(const [i,r] of routes.entries()){
  const A=nodes[r.a],B=nodes[r.b],sx=A.x+(B.x>=A.x?52:-52),ex=B.x+(B.x>=A.x?-52:52),sy=A.y,ey=B.y;
  const d=r.t==='backbone'?`M${A.x} ${A.y+(B.y>A.y?34:-34)} L${B.x} ${B.y+(B.y>A.y?-34:34)}`:`M${sx} ${sy} C${(sx+ex)/2} ${sy} ${(sx+ex)/2} ${ey} ${ex} ${ey}`;
  r.d=d;r.svgId='mesh-wire-'+i;
  const lit=highlighted.has([r.a,r.b].sort().join('|'));
  if(r.t==='backbone'){
   el('path',{d,class:'backbone-aura'},links);el('path',{d,class:'backbone-tube'},links);el('path',{d,class:'backbone-rail'},links);
  }
  el('path',{d,id:r.svgId,class:'wire meshwire '+r.t+(lit?' meshlit':''),...(r.t==='telemetria'||r.t==='respuesta'||r.t==='trafico'?{'marker-end':'url(#arr-'+r.t+')'}:{})},links);
  if(r.t==='backbone')el('path',{d,class:'backbone-stream','aria-label':'Tránsito privado entre PoPs'},links);
 }
 for(let i=1;!demo.length&&i<path.length;i++){
  const route=routes.find(r=>(r.a===path[i-1]&&r.b===path[i])||(r.b===path[i-1]&&r.a===path[i]));
  if(route)el('path',{d:route.d,class:'meshroute '+(isAttack?'attack':route.t==='backbone'?'private-route':'normal')},links);
 }
 for(const lane of aiLanes){
  let backdrop=$('aiBackdrop');if(!backdrop){backdrop=el('g',{id:'aiBackdrop'});svg.insertBefore(backdrop,links)}const group=el('g',{class:'ai-lane'},backdrop);el('rect',{x:45,y:lane.y,width:1030,height:lane.height,rx:18},group);
  const title=el('text',{x:70,y:lane.y+25,class:'ai-lane-title'},group);title.textContent=lane.title;
  const note=el('text',{x:70,y:lane.y+46,class:'ai-lane-note'},group);note.textContent=lane.note;
 }
 for(const zone of aiPopZones){const group=el('g',{class:'ai-pop-zone'},$('aiBackdrop'));el('rect',{x:530,y:zone.y,width:425,height:115,rx:15},group);const label=el('text',{x:545,y:zone.y+103},group);label.textContent='INSPECCIÓN Y POLÍTICA EN EL MISMO PoP';}
 for(const n of Object.values(nodes)){
  const actor=caps[n.control]?.[1]|| (n.kind==='service'?'Operación':n.kind==='security'?(caps[n.control]?.[1]||'Usuario'):n.kind==='pop'||n.kind==='edge'?'Red':'Usuario');
  const filtered=(st.domain!=='Todos'&&actor!==st.domain&&n.kind!=='asset')||(st.phase!=='Todas'&&n.control&&!infrastructure.has(n.control)&&!(contributions[n.control]||[caps[n.control]?.[2]]).includes(st.phase));
  const g=el('g',{transform:`translate(${n.x},${n.y})`,'data-node-id':n.id,class:'node meshnode '+(filtered?'filtered':'')+(n.kind==='security'?' securitynode':'')},boxes);
  g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',n.name+' · '+n.sub);const tooltip=el('title',{},g);tooltip.textContent=n.name+' · '+n.sub;
  el('rect',{x:-64,y:-34,width:128,height:68,rx:12},g);
  const icon=el('text',{x:0,y:-12,'text-anchor':'middle',class:'symbol'},g);icon.textContent=n.symbol;
  const label=el('text',{x:0,y:7,'text-anchor':'middle',class:'nodename'},g);label.textContent=n.name.length>19?n.name.slice(0,18)+'…':n.name;
  const sub=el('text',{x:0,y:23,'text-anchor':'middle',class:'nodesub'},g);sub.textContent=n.sub.slice(0,25);
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.dispatchEvent(new Event('click'))}});
  g.addEventListener('click',()=>{const cap=n.control|| (n.kind==='service'?'soc':n.kind==='pop'?'sase':n.kind==='edge'?'sdwan':'branch');if(caps[cap]){st.focus=cap;renderDetail();}});
 }
 if(isAttack&&!demo.length&&nodes[sourceSite])el('circle',{cx:nodes[sourceSite].x-55,cy:nodes[sourceSite].y-26,r:9,class:'mesh-threat'},boxes);
 const warning=$('siteLimitNote');if(warning){warning.hidden=c.sites<=4;warning.textContent=c.sites>4?`Visualización representativa: se muestran 4 de ${c.sites} sedes. Las demás pueden aplicar el mismo modelo de conectividad y políticas; su rendimiento y dimensionamiento particular se validan técnicamente.`:'';}
 const hint=$('meshHint');if(hint)hint.textContent=(isAttack?'⚠ ATAQUE DIDÁCTICO · ':'✓ TRÁFICO LEGÍTIMO · ')+message;
 txt($('status'),`● ${c.sites} sedes · ${brand} · ${ransomware?'SASE + defensa ransomware integradas':'Conectividad'} · ${distributed?'Backbone entre PoPs diferenciados':'Sin tránsito inter-PoP obligatorio'}`);
 svg.setAttribute('viewBox',`0 0 1120 ${Math.max(610,...Object.values(nodes).map(n=>n.y+60))}`);$('simulate').disabled=false;$('step').disabled=false;mesh.current={path,nodes,routes,demo,isAttack,detected,message,mode:mesh.mode};renderAIStages(demo);renderTimeline();if(focusedAI)txt($('status'),activeAIKey&&aiVendor(activeAIKey)==='ai_cato'?'● CATO IA · PC → agente Cato Client → PoP · detección en el PoP · sin requisito SASE de sedes':'● LABORATORIO DE IA · Endpoint → sensor → análisis → política');
}
function renderTransportStory(cato,fortinet,distributed){
 let host=$('transportStory');if(!host){host=document.createElement('section');host.id='transportStory';$('meshControls').after(host)}
 host.replaceChildren();host.hidden=!cato&&!fortinet;if(host.hidden)return;host.className=cato?'transport-story cato-story':'transport-story internet-story';
 const title=document.createElement('strong');title.textContent=cato?'CATO · EL BACKBONE HACE LA DIFERENCIA':'FORTINET · TRANSPORTE POR INTERNET';
 const text=document.createElement('p');text.textContent=cato?'1 · Acceso por Internet al PoP   →   2 · Backbone privado entre PoPs   →   3 · Entrega a la sede o DC':'En esta plantilla, los túneles entre FortiGate y el acceso a FortiSASE utilizan Internet.';
 host.append(title,text);
 if(cato){const b=document.createElement('button');b.textContent=distributed?'▶ Ver el backbone en acción':'Un PoP local · sin tránsito inter-PoP';b.disabled=!distributed;b.onclick=()=>{mesh.mode='site-site';st.step=-1;renderGraph();animateMesh()};host.append(b)}
 const live=document.createElement('small');live.id='transportLive';live.textContent=cato?'La franja azul muestra la red privada. La distribución de PoPs es ilustrativa.':'Plantilla con transporte Internet; otras modalidades requieren un diseño específico.';host.append(live);
}
function renderAIStages(demo){
 let host=$('aiStages');if(!host){host=document.createElement('div');host.id='aiStages';$('meshControls').after(host)}
 host.replaceChildren();host.hidden=!demo.length;if(!demo.length)return;
 const status=document.createElement('p');status.id='aiStageStatus';status.textContent='Recorrido del endpoint · reproduce la secuencia o avanza por etapas';host.append(status);
 const list=document.createElement('div');list.className='ai-stage-list';demo.forEach((stage,i)=>{const b=document.createElement('button');b.className='ai-stage';b.textContent=(i+1)+' · '+({attack:'Intento riesgoso',trafico:'Actividad',telemetria:'Observación',respuesta:'Política'}[stage.type]);b.title=stage.text;b.onclick=()=>{st.step=i-1;animateAI(true)};list.append(b)});host.append(list);
}
function animateAI(single=false){
 const state=mesh.current,token=++mesh.token;const start=single?(st.step+1)%state.demo.length:0,finish=single?start+1:state.demo.length;
 $('particles').replaceChildren();document.querySelectorAll('.ai-node-active').forEach(n=>n.classList.remove('ai-node-active'));
 const color={attack:'#ff5267',trafico:'#21c8ed',telemetria:'#b38aff',respuesta:'#f8a454'};
 const dot=el('circle',{r:8,class:'ai-live-particle'},$('particles'));let began=null,last=-1;
 function tick(now){
  if(token!==mesh.token||!dot.isConnected){dot.remove();return}if(began===null)began=now;
  const elapsed=(now-began)/1250,index=start+Math.floor(elapsed),fraction=elapsed%1;
  if(index>=finish){dot.remove();document.querySelectorAll('.ai-node-active').forEach(n=>n.classList.remove('ai-node-active'));$('aiStageStatus').textContent=(single?'Etapa completada · ':'Recorrido completado · ')+state.message;return}
  const stage=state.demo[index],A=state.nodes[stage.a],B=state.nodes[stage.b];
  if(!A||!B){dot.remove();return}
  if(index!==last){last=index;st.step=index;dot.setAttribute('fill',color[stage.type]);$('aiStageStatus').textContent=(index+1)+'/'+state.demo.length+' · '+stage.text;log('IA · '+stage.text,stage.type==='attack');
   document.querySelectorAll('.ai-stage').forEach((b,i)=>{b.classList.toggle('active',i===index);b.classList.toggle('done',i<index)});
   document.querySelectorAll('[data-node-id]').forEach(n=>n.classList.toggle('ai-node-active',n.dataset.nodeId===stage.a||n.dataset.nodeId===stage.b));
  }
  dot.setAttribute('cx',A.x+(B.x-A.x)*fraction);dot.setAttribute('cy',A.y+(B.y-A.y)*fraction);requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
}
function animateMesh(single=false){if(!isMesh()||!mesh.current)return;if(mesh.current.demo?.length){animateAI(single);return;}const state=mesh.current,token=++mesh.token,segments=[];for(let i=0;i<state.path.length-1;i++){const A=state.nodes[state.path[i]],B=state.nodes[state.path[i+1]];const route=state.routes.find(r=>(r.a===state.path[i]&&r.b===state.path[i+1])||(r.b===state.path[i]&&r.a===state.path[i+1]));if(A&&B&&route)segments.push({A,B,route,reverse:route.a!==state.path[i]})}if(!segments.length){log('Este escenario no dispone de ruta aplicable con el contexto actual.',true);return}const dot=el('circle',{r:7,class:'mesh-particle '+(state.isAttack?'attack':'normal')},$('particles'));const duration=950;let started=null;function tick(now){if(token!==mesh.token||!dot.isConnected){dot.remove();return}if(started===null)started=now;let t=(now-started)/duration,idx=Math.floor(t),frac=t-idx;if(idx>=segments.length){dot.remove();log((state.isAttack?'AMENAZA SIMULADA: ':'TRÁFICO NORMAL: ')+state.message,state.isAttack);if(state.isAttack)log(state.detected?'Posible detección condicionada por controles y políticas habilitados.':'No se ha demostrado detección automática; revisar brechas.',!state.detected);return}const segment=segments[idx],wire=$(segment.route.svgId),point=wire?.getPointAtLength(wire.getTotalLength()*(segment.reverse?1-frac:frac));if(point){dot.setAttribute('cx',point.x);dot.setAttribute('cy',point.y)}dot.setAttribute('class','mesh-particle '+(state.isAttack?'attack':segment.route.t==='backbone'?'private-transit':'normal'));const note=$('transportLive');if(note)note.textContent=segment.route.t==='backbone'?'AHORA: TRÁNSITO POR EL BACKBONE PRIVADO CATO':segment.route.t==='wan'||segment.route.t==='tunnel'?'AHORA: ACCESO / TRANSPORTE SOBRE INTERNET':'AHORA: ENTREGA LOCAL O SERVICIO DE DESTINO';requestAnimationFrame(tick)}requestAnimationFrame(tick)}

function renderGraph(){mesh.token++;if($('backboneBackdrop'))$('backboneBackdrop').remove();if($('transportStory'))$('transportStory').hidden=true;if($('aiBackdrop'))$('aiBackdrop').remove();if($('aiStages'))$('aiStages').hidden=true;$('topology').setAttribute('viewBox','0 0 1120 610');meshBar();if(isMesh()){renderMesh();return;}const keys=allCaps(),svg=$('topology');$('empty').hidden=true;if(keys.length){svg.removeAttribute('hidden');svg.style.display='block'}else{svg.setAttribute('hidden','');svg.style.display='none'};$('simulate').disabled=!st.chosen.length;$('step').disabled=!st.chosen.length;let links=$('links'),boxes=$('boxes');links.replaceChildren();boxes.replaceChildren();$('particles').replaceChildren();if(!st.chosen.length){txt($('status'),'● INTERNET · Selecciona una necesidad para construir la arquitectura');} let pos=positions(keys),edgeList=uniqueEdges();edgeList.forEach(([a,b,t],i)=>{let A=pos[a],B=pos[b];if(!A||!B)return;let sx=A.x+(B.x>=A.x?62:-62),sy=A.y,ex=B.x+(B.x>=A.x?-62:62),ey=B.y;let d=`M${sx} ${sy} C${(sx+ex)/2} ${sy} ${(sx+ex)/2} ${ey} ${ex} ${ey}`;const p=el('path',{d,class:`wire ${t}`,id:'wire'+i,'marker-end':`url(#arr-${t})`},links);p.dataset.from=a;p.dataset.to=b;p.dataset.type=t});keys.forEach(k=>{const c=caps[k],p=pos[k];const shownByFilter=(st.domain==='Todos'||c[1]===st.domain)&&(st.phase==='Todas'||(contributions[k]||[c[2]]).includes(st.phase)||infrastructure.has(k));const g=el('g',{class:'node '+(!shownByFilter?' filtered':'')+(k===st.focus?'chosen':'')+(st.step>=0&&k===getScenario()?.detect?' dangerous':''),transform:`translate(${p.x},${p.y})`,tabindex:0,role:'button','aria-label':c[0]},boxes);el('rect',{x:-68,y:-43,width:136,height:86,rx:12},g);const symbol=el('text',{x:0,y:-10,'text-anchor':'middle',class:'symbol'},g);symbol.textContent=c[7];const name=el('text',{x:0,y:13,'text-anchor':'middle',class:'nodename'},g);name.textContent=c[0].length>19?c[0].slice(0,18)+'…':c[0];const sub=el('text',{x:0,y:30,'text-anchor':'middle',class:'nodesub'},g);sub.textContent=k==='branch'?`${Math.max(0,Number($('branches').value)||0)} sedes`:k==='remote'?`${Math.max(0,Number($('remote').value)||0)} usuarios remotos`:st.vendors[k]?(vendorBrand(st.vendors[k])||st.vendors[k]).slice(0,19):infrastructure.has(k)?'ACTIVO DEL ENTORNO':controlState(k)==='existente'?'CLIENTE · EXISTENTE':c[1]+' · '+c[2];
if(st.vendors[k]&&!infrastructure.has(k)){
 const b=vendorBrand(st.vendors[k]);
 // Marca identificada mediante texto; activos oficiales pendientes de homologación.
}const pick=()=>{st.focus=k;renderDetail();renderGraph()};g.addEventListener('click',pick);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}})});drawContextMarkers(boxes,pos,keys);txt($('status'),`● ${Math.max(0,Number($('branches').value)||0)} sedes · ${Math.max(0,Number($('users').value)||0)} usuarios · ${Math.max(0,Number($('remote').value)||0)} remotos · ${edgeList.length} enlaces de referencia`)}
function drawContextMarkers(root,pos,keys){const c=context();if(keys.includes('branch')&&pos.branch&&c.sites>0){const origin=pos.branch;const visible=Math.min(c.sites,4);for(let i=0;i<visible;i++){const offset=(i-(visible-1)/2)*39;const g=el('g',{class:'site-context'},root);el('rect',{x:origin.x-60+offset,y:origin.y+65,width:33,height:25,rx:5,class:'context-badge'},g);const t=el('text',{x:origin.x-43+offset,y:origin.y+81,'text-anchor':'middle',class:'context-site'},g);t.textContent=String(i+1)}if(c.sites>4){const t=el('text',{x:origin.x,y:origin.y+125,'text-anchor':'middle',class:'context-site'},root);t.textContent='+'+(c.sites-4)+' sedes adicionales'} }
if(keys.includes('endpoint')&&pos.endpoint){const p=pos.endpoint;const t=el('text',{x:p.x,y:p.y+58,'text-anchor':'middle',class:'context-site'},root);t.textContent=c.users+' usuarios declarados'}
if(keys.includes('saas')&&pos.saas){const p=pos.saas;const t=el('text',{x:p.x,y:p.y+57,'text-anchor':'middle',class:'context-site'},root);t.textContent=c.apps==='hybrid'?'SaaS + apps privadas':c.apps==='private'?'Apps privadas (revisar ruta)':'Aplicaciones SaaS'}
}
function getScenario(){return needDefs.find(n=>n.id===(st.chosen.includes(st.scenarioNeed)?st.scenarioNeed:st.chosen[0]))}
function renderDetail(){if(['sophos_edr','falcon_sensor','cato_client'].includes(st.focus)){$('detail').replaceChildren();for(const text of [caps[st.focus][0],caps[st.focus][3],caps[st.focus][4],caps[st.focus][6]]){const p=document.createElement('p');p.textContent=text;$('detail').append(p)}return;}if(st.focus?.startsWith('ai_need_')){const k=st.focus.slice(8);$('detail').replaceChildren();for(const value of [AI_RULES[k].name,aiVendor(k)?caps[aiVendor(k)][0]:'Alternativa pendiente',AI_RULES[k].scope,'Selecciona la alternativa desde Seguridad de IA. No se presupone una integración con SOC.']){const p=document.createElement('p');p.textContent=value;$('detail').append(p)}return;}const c=caps[st.focus],h=$('detail');h.replaceChildren();if(!c){h.innerHTML='<div class="detailicon">◇</div><h2>Selecciona una capacidad</h2><p>La arquitectura se construirá automáticamente a partir de la necesidad comercial.</p>';return}const add=(tag,value,klass)=>{let n=document.createElement(tag);n.textContent=value;if(klass)n.className=klass;h.append(n)};add('div',c[7],'detailicon');add('h2',c[0]);add('div',c[1]+' · '+c[2],'badge');add('h3','¿Qué hace?');add('p',c[3]);add('h3','Valor comercial');add('p',c[4]);add('h3','Momento comercial');add('p',c[5]);add('h3','Pregunta de descubrimiento');add('p',c[6]);if(infrastructure.has(st.focus)){add('h3','Elemento del entorno');add('p','Este elemento es parte de la infraestructura del cliente. No es una licencia o solución para excluir. Las capacidades de seguridad se agregan por separado.','tiny');return;}add('h3','Alternativas documentadas');let arr=matching(c[0],st.focus);if(!arr.length)add('p','No hay asociación directa homologada en el directorio.','tiny');else{for(const q of arr.slice(0,5)){let line=document.createElement('div');line.className='related';line.textContent=q.producto+' · '+q.fabricante;h.append(line)}}add('p','La vinculación fabricante-capacidad es orientativa y requiere homologación del portafolio.','tiny');const choice=document.createElement('select');choice.setAttribute('aria-label','Fabricante o producto para '+c[0]);const basic=document.createElement('option');basic.value='';basic.textContent='Arquitectura genérica (sin fabricante)';choice.append(basic);for(const q of arr){let opt=document.createElement('option');opt.value=q.producto+' · '+q.fabricante;opt.textContent=opt.value;choice.append(opt)}choice.value=st.vendors[st.focus]||'';if(choice.value){const b=vendorBrand(choice.value);if(b){const brandPanel=document.createElement('div');brandPanel.className='brandfallback';brandPanel.textContent=b;h.append(brandPanel);}}choice.onchange=()=>{
 const selected=choice.value;
 if(selected)st.vendors[st.focus]=selected;else delete st.vendors[st.focus];
 if(connectivityIds.size && st.chosen.some(n=>connectivityIds.has(n)) && ['sase','sdwan','ngfw'].includes(st.focus)){
   const brand=vendorBrand(selected);
   if(brand==='Fortinet'||brand==='Cato Networks')setConnectivityVendor(brand);
   else if(!selected)setConnectivityVendor('generic');
 }
 render();log('Alternativa para '+c[0]+': '+(selected||'genérica'));
};h.append(choice);add('p','La selección identifica una alternativa documental; NO confirma integración, licencia ni despliegue.','tiny')}
// Identidad visual: primero activos oficiales alojados localmente; nunca depender de un CDN.
// Si un logo no está instalado, se mantiene SIEMPRE la insignia tipográfica de la marca.
const brandIcons={
 'Sophos':'sophos','CrowdStrike':'crowdstrike','Fortinet':'fortinet',
 'Acronis':'acronis','Kaseya':'kaseya','Cato Networks':'cato',
 'Nexusguard':'nexusguard','Datto':'datto','Secureworks':'secureworks'
};
function vendorBrand(value){return Object.keys(brandIcons).find(k=>String(value||'').toLowerCase().includes(k.toLowerCase()))||''}
function iconUrl(brand){return brandIcons[brand]?'assets/brands/'+brandIcons[brand]+'.svg':''}
function drawVendorBadge(g,brand){
 if(!brand)return;
 const t=el('text',{x:0,y:-24,'text-anchor':'middle',class:'vendor-wordmark'},g);
 t.textContent=brand.length>15?brand.slice(0,14)+'…':brand;
 const img=el('image',{href:iconUrl(brand),x:-43,y:-38,width:86,height:26,preserveAspectRatio:'xMidYMid meet',class:'vendorlogo'},g);
 // Solo sustituye el rótulo cuando el archivo local realmente se carga.
 const probe=new Image();
 probe.onload=()=>{if(g.isConnected){t.style.display='none';img.style.display='block'}};
 probe.onerror=()=>{if(g.isConnected){img.remove();t.style.display='block'}};
 img.style.display='none';
 probe.src=iconUrl(brand);
}
function matching(name,id){return window.MC_CATALOGO.productos.filter(p=>window.MC_PORTFOLIO?.products.some(entry=>entry.id===p.id&&entry.caps.includes(id)))}
function renderActive(){let root=$('active');root.replaceChildren();let keys=allCaps();if(keys.length===1&&keys[0]==='internet'){root.innerHTML='<p class="tiny">Sin capacidades todavía.</p>';return}keys.forEach(k=>{let b=document.createElement('button');b.className='chip '+(st.focus===k?'selected':'');b.textContent=caps[k][0];b.onclick=()=>{st.focus=k;renderDetail();renderGraph()};root.append(b)})}
function renderCatalog(){let root=$('catalog');root.replaceChildren();const query=$('search').value.trim().toLowerCase();const brands=$('showBrands').checked;const active=allCaps();const related=new Set(active.flatMap(k=>matching('',k).map(p=>p.id)));let ps=window.MC_CATALOGO.productos.filter(p=>{let s=[p.fabricante,p.producto,p.actor,p.fortaleza,p.como_funciona,p.momento_comercial,p.cross_sell].join(' ').toLowerCase();return(!query||s.includes(query))&&(brands||related.has(p.id))});txt($('catalogCount')||document.createElement('span'),String(ps.length));if(!ps.length){root.innerHTML='<p class="tiny">No hay resultados en el filtro actual. Activa «Mostrar fabricantes» para consultar el directorio completo.</p>';return}for(const p of ps){let d=document.createElement('button');d.className='product';let t=document.createElement('b');t.textContent=p.producto;let m=document.createElement('small');m.textContent=p.fabricante+' · '+p.actor+' · '+p.fase_principal;let summary=document.createElement('span');summary.textContent=p.fortaleza||p.como_funciona||'';d.append(t,m,summary);d.onclick=()=>{const h=$('detail');h.replaceChildren();function field(label,value){const n=document.createElement('div');n.className='itemfield';const strong=document.createElement('strong');strong.textContent=label;const par=document.createElement('p');par.textContent=value||'No especificado en el directorio';n.append(strong,par);h.append(n)}field('PRODUCTO',p.producto);field('Fabricante',p.fabricante);field('Actor y fases',p.actor+' · '+p.fase_principal+(p.fase_secundaria?' / '+p.fase_secundaria:''));field('Cómo funciona',p.como_funciona);field('Valor comercial',p.fortaleza);field('Cliente ideal',p.cliente_ideal);field('Momento comercial',p.momento_comercial);field('Venta cruzada',p.cross_sell);field('Segmentos',p.segmentos.join(', '));field('Prioridad MC',p.prioridad_mc);field('Estado de la información','Dato importado del directorio; validación técnica pendiente.');const evaluate=document.createElement('button');evaluate.className='primary';evaluate.textContent='Agregar a evaluación de Preventa';evaluate.onclick=()=>{window.MC_PREVENTA?.addProduct(p.id);log('Producto agregado a evaluación: '+p.producto)};h.append(evaluate);window.scrollTo({top:0,behavior:'smooth'})};root.append(d)}}
function renderTimeline(){if(isMesh()&&mesh.current?.demo?.length){const root=$('timeline');root.replaceChildren();mesh.current.demo.forEach((stage,i)=>{const b=document.createElement('button');b.className='timelineitem';b.textContent=(i+1)+'. '+stage.text;b.onclick=()=>{st.step=i-1;animateAI(true)};root.append(b)});return;}const s=getScenario(),root=$('timeline');root.replaceChildren();if(!s){root.innerHTML='<p class="tiny">Selecciona una necesidad para habilitar la simulación.</p>';return}s.scenario.forEach((t,i)=>{let b=document.createElement('button');b.className='timelineitem '+(i===st.step?'current':i<st.step?'passed':'');let num=document.createElement('span');num.className='num';num.textContent=i+1;let desc=document.createElement('span');desc.textContent=t;b.append(num,desc);b.onclick=()=>{st.step=i;renderTimeline();renderGraph();record(i)};root.append(b)})}
function log(msg,crit=false){let box=document.createElement('p');box.className=crit?'alert':'';box.textContent=msg;$('log').prepend(box)}
function record(i){const s=getScenario();if(!s)return;if(evaluation().missing.includes(s.detect))log('La capacidad de detección de este escenario está excluida; no se demuestra detección por ese control.',true);log(`ETAPA ${i+1}: ${s.scenario[i]}`,i===2||i===3);txt($('status'),`● SIMULACIÓN DIDÁCTICA · ${s.name} · Paso ${i+1}/5`)}
function doStep(){if(isMesh()){animateMesh(true);return;}const s=getScenario();if(!s)return;st.step=(st.step+1)%s.scenario.length;renderTimeline();renderGraph();record(st.step);pulse()}
function pulse(){const edges=[...$('links').children];if(!edges.length)return;const e=edges[Math.min(st.step,edges.length-1)];if(!e||!e.getTotalLength)return;const particle=el('circle',{r:8,fill:st.step===2?'#ff5267':e.dataset.type==='telemetria'?'#b38aff':'#21c8ed'},$('particles'));let start=null,d=850;function animate(ts){if(!particle.isConnected)return;if(start===null)start=ts;let f=Math.min(1,(ts-start)/d),p=e.getPointAtLength(f*e.getTotalLength());particle.setAttribute('cx',p.x);particle.setAttribute('cy',p.y);if(f<1)requestAnimationFrame(animate);else particle.remove()}requestAnimationFrame(animate)}
async function play(){if(isMesh()){animateMesh();return;}if(st.playing||!getScenario())return;st.playing=true;$('simulate').disabled=true;st.step=-1;let token=st.chosen.join(',');for(let i=0;i<5&&st.playing&&token===st.chosen.join(',');i++){doStep();await new Promise(r=>setTimeout(r,1100))}st.playing=false;$('simulate').disabled=!allCaps().length}
function render(){renderNeeds();renderConnectivity();renderAI();renderFilters();renderStrategy();controlRender();coverageRender();renderGraph();renderDetail();renderActive();renderCatalog();renderTimeline();const s=getScenario();txt($('archTitle'),s?s.name+(st.chosen.length>1?` + ${st.chosen.length-1} necesidades`:''):'Tu laboratorio está listo');txt($('archCaption'),s?'Arquitectura de referencia generada automáticamente. No debes configurar conexiones.':'Selecciona una necesidad para construir una arquitectura automáticamente.');}
function serial(){return {smartArchitect:window.MC_SMART?.last||null,scenarioNeed:st.scenarioNeed||null,discovery:window.MC_PREVENTA?.state(),schema:'mc-cyberverse-0.9',ai:{enabled:{...ai.enabled},selected:{...ai.selected}},topology:isMesh()?mesh.current:null,trafficMode:mesh.mode,client:safe($('client').value),branches:Number($('branches').value)||0,users:Number($('users').value)||0,remote:Number($('remote').value)||0,appType:$('appType').value,needs:st.chosen,capabilities:allCaps(),capabilityEdges:uniqueEdges(),edges:isMesh()?mesh.current.routes.map(r=>[r.a,r.b,r.t]):uniqueEdges(),controlStates:Object.fromEntries([...new Set([...proposedCaps(),...Object.keys(st.overrides)])].map(k=>[k,controlState(k)])),vendors:st.vendors,connectivityVendor:st.connectivityVendor,coverage:evaluation(),createdAt:new Date().toISOString()}}
function restore(d){if(!d||!['mc-cyberverse-0.9','mc-cyberverse-0.5','mc-cyberverse-0.6.1','mc-cyberverse-0.6.3','mc-cyberverse-0.7','mc-cyberverse-0.8'].includes(d.schema)||!Array.isArray(d.needs)||d.needs.some(x=>x!=='sedes'&&!needDefs.find(n=>n.id===x)))throw Error('Diseño incompatible');ai.enabled=Object.fromEntries(Object.keys(AI_RULES).map(k=>[k,d.ai?.enabled?.[k]===true]));ai.selected=Object.fromEntries(Object.keys(AI_RULES).map(k=>[k,AI_RULES[k].vendors.includes(d.ai?.selected?.[k])?d.ai.selected[k]:'']));mesh.mode=meshModes.some(v=>v[0]===d.trafficMode)?d.trafficMode:'site-saas';st.connectivityVendor=['Cato Networks','Fortinet','generic'].includes(d.connectivityVendor)?d.connectivityVendor:'generic';st.chosen=[...new Set(d.needs.map(n=>n==='sedes'?'sase_sites':n))];st.overrides=(d.controlStates&&typeof d.controlStates==='object')?Object.fromEntries(Object.entries(d.controlStates).filter(([k,v])=>caps[k]&&!infrastructure.has(k)&&['propuesto','existente','excluido'].includes(v))):{};st.vendors=(d.vendors&&typeof d.vendors==='object')?Object.fromEntries(Object.entries(d.vendors).filter(([k,v])=>caps[k]&&typeof v==='string')):{};window.MC_PREVENTA?.restore(d.discovery);window.MC_SMART.last=d.smartArchitect||null;st.scenarioNeed=d.needs.includes(d.scenarioNeed)?d.scenarioNeed:null;st.step=-1;st.focus=proposedCaps()[0]||null;$('client').value=safe(d.client);for(const field of ['branches','users','remote'])$(field).value=Number.isFinite(d[field])?d[field]:0;$('appType').value=['saas','private','hybrid'].includes(d.appType)?d.appType:'saas';render()}
function report(){let d=serial();return `Seguridad de IA:\n${aiActive().map(k=>AI_RULES[k].name+': '+(aiVendor(k)?caps[aiVendor(k)][0]:'Pendiente')+' · '+controlState('ai_need_'+k)).join('\n')||'Sin necesidades de IA seleccionadas'}\n\nMC CYBERVERSE · PROPUESTA CONCEPTUAL\nCliente: ${d.client}\nSedes: ${d.branches} · Usuarios: ${d.users} · Remotos: ${d.remote} · Aplicaciones: ${d.appType}\nNecesidades:\n${st.chosen.map(k=>'- '+needDefs.find(n=>n.id===k)?.name).join('\n')||'Sin seleccionar'}\n\nCapacidades integradas automáticamente:\n${d.capabilities.map(k=>'- '+caps[k][0]+' ('+caps[k][1]+' / '+caps[k][2]+')').join('\n')||'Ninguna'}\n\nConexiones didácticas: ${d.edges.length}\nÍndice de cobertura ponderada: ${d.coverage.score===null?'No evaluado':d.coverage.score+'% (no representa nivel real de seguridad)'}\nControles excluidos: ${d.coverage.missing.map(k=>caps[k][0]).join(', ')||'Ninguno'}\nFabricantes seleccionados: ${Object.entries(d.vendors).map(([k,v])=>caps[k][0]+': '+v).join('; ')||'Sin especificar'}\n\nNOTA: Diseño preliminar educativo. No constituye ingeniería detallada, compatibilidad certificada, compromiso de funcionalidades, ni propuesta económica. Validar con Preventa y Producto según el cliente, fabricantes, licencias y alcance habilitado.`}
function download(filename,data,type){let u=URL.createObjectURL(new Blob([data],{type}));let a=document.createElement('a');a.href=u;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
$('new').onclick=()=>{if((st.chosen.length||window.MC_PREVENTA?.hasData())&&!confirm('¿Iniciar un nuevo cliente y limpiar el levantamiento actual? Descarga o guarda primero la información que necesites conservar.'))return;window.MC_PREVENTA?.clear();window.MC_SMART.last=null;$('smartPortfolioHost')?.replaceChildren();for(const id of ['branches','users','remote'])delete $(id).dataset.confirmed;$('smartInput').value='';$('smartInput').dispatchEvent(new Event('input'));$('client').value='';$('branches').value=0;$('users').value=0;$('remote').value=0;$('appType').value='saas';st.chosen=[];ai.enabled={};ai.selected={};st.overrides={};st.vendors={};st.connectivityVendor='generic';st.focus=null;st.step=-1;st.playing=false;$('log').textContent='Sin eventos. Selecciona una necesidad.';render()};$('simulate').onclick=play;$('step').onclick=doStep;$('resetSim').onclick=()=>{st.step=-1;st.playing=false;$('log').textContent='Simulación reiniciada.';renderGraph();renderTimeline()};for(const field of ['branches','users','remote','appType'])$(field).addEventListener('change',()=>{st.step=-1;st.playing=false;renderGraph();renderActive();renderDetail();});$('search').oninput=renderCatalog;$('showBrands').onchange=renderCatalog;$('save').onclick=()=>{try{localStorage.setItem('mc-cyberverse-v08',JSON.stringify(serial()));log('Diseño guardado en este navegador.')}catch{log('No se pudo guardar. Utiliza exportación JSON.',true)}};$('load').onclick=()=>{try{const data=localStorage.getItem('mc-cyberverse-v08');if(!data)throw Error('No hay diseño guardado');restore(JSON.parse(data));log('Diseño recuperado correctamente.')}catch(e){log('No se pudo recuperar: '+e.message,true)}};$('export').onclick=()=>download('mc-cyberverse-arquitectura-v0.9.json',JSON.stringify(serial(),null,2),'application/json');$('summary').onclick=()=>{$('modalTitle').textContent='Resumen comercial de arquitectura';$('modalBody').textContent=report();$('modal').showModal()};$('close').onclick=()=>$('modal').close();$('copy').onclick=()=>navigator.clipboard?.writeText(report()).then(()=>log('Resumen copiado.')).catch(()=>log('Selecciona y copia el texto manualmente.'));$('help').onclick=()=>{$('modalTitle').textContent='Cómo funciona el Laboratorio Dinámico';$('modalBody').textContent='1. Elige una o varias necesidades del cliente.\n2. Cyberverse genera automáticamente las capacidades y enlaces didácticos.\n3. Selecciona nodos para explicar su valor comercial.\n4. Ejecuta una simulación completa o por etapas.\n5. Consulta productos del directorio activando Mostrar fabricantes.\n6. Guarda en este navegador o exporta el JSON.\n\nNunca debes dibujar conexiones ni elegir protocolos para presentar un escenario.\n\nLa primera necesidad define la simulación; SD-WAN, SASE y SSE son escenarios distintos. Selecciona el fabricante para ver una plantilla específica.';$('modal').showModal()};
window.MC_HANDOFF_ENGINE={snapshot:serial,capabilities:caps,needs:needDefs,aiRules:AI_RULES,phases:strategicPhases,contributions};
render();

// Adaptador: solo incorpora necesidades al motor original; no dibuja topologías.
window.MC_SMART.mount = (()=>{
 const panel=document.createElement('section');panel.className='subpanel smart';panel.id='smartArchitect';
 const title=document.createElement('h2');title.textContent='SMART ARCHITECT — Describe la necesidad de tu cliente';
 const input=document.createElement('textarea');input.id='smartInput';input.maxLength=4000;input.rows=3;input.setAttribute('aria-label','Necesidad del cliente');
 const examples=document.createElement('div');examples.className='chipwrap';
 for(const example of ['El cliente tiene 4 sedes y quiere SASE','Necesitamos Wi-Fi seguro y controlar los equipos que entran a la red','Mi cliente tiene 8 sedes, está preocupado porque le secuestren la información con ransomware y necesita recuperar sus archivos','Tenemos 12 sedes, usuarios remotos, sufrimos ataques de phishing y queremos proteger nuestra información en aplicaciones de IA','Se cae mucho la página']){const b=document.createElement('button');b.className='chip';b.textContent=example;b.onclick=()=>{input.value=example;invalidate()};examples.append(b);}
 const analyze=document.createElement('button');analyze.id='smartAnalyze';analyze.className='primary';analyze.textContent='Diseñar solución';
 const view=document.createElement('button');view.id='smartBuild';view.className='outline';view.textContent='Ver arquitectura';view.disabled=true;
 const result=document.createElement('div');result.id='smartResult';result.setAttribute('aria-live','polite');let current=null;
 function invalidate(){current=null;view.disabled=true;result.replaceChildren();}
 input.oninput=invalidate;
 const canvas=()=>document.querySelector('.canvas');
 view.onclick=()=>canvas()?.scrollIntoView?.({behavior:'smooth',block:'start'});
 function line(host,label,value){const p=document.createElement('p'),b=document.createElement('strong');b.textContent=label+': ';p.append(b,document.createTextNode(value));host.append(p);}
 function portfolio(){
 const alternatives=MC_SMART.recommend(current,allCaps());current.recommendations=alternatives;
 const host=document.createElement('section');host.id='portfolioRecommendations';host.className='smart-portfolio';
 line(host,'Alternativas del portafolio MC',alternatives.length+' opciones relacionadas con los controles del diseño. Selecciona las que quieras evaluar con Preventa.');
 const extra=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Ver las demás alternativas';extra.append(summary);
 alternatives.forEach((item,index)=>{const product=window.MC_CATALOGO.productos.find(p=>p.id===item.id);if(!product)return;
 const card=document.createElement('div');card.className='smart-product';card.dataset.productId=product.id;
 line(card,product.producto,product.fabricante+(item.requested?' · mencionado en la solicitud':''));
 const text=document.createElement('p');text.textContent=product.fortaleza;card.append(text);
 const reason=document.createElement('small');reason.textContent='Para: '+[...item.capabilities.map(k=>caps[k][0]),...item.ai.map(k=>AI_RULES[k].name)].join(', ');card.append(reason);if(product.segmentos.length){const segments=document.createElement('small');segments.textContent='Segmentos de referencia: '+product.segmentos.join(', ');card.append(segments);}
 const use=document.createElement('button');use.className='outline';use.textContent='Usar en diseño';use.dataset.action='use';
 use.onclick=()=>{
 const entry=MC_PORTFOLIO.products.find(e=>e.id===item.id);
 const allowed=item.capabilities.filter(id=>allCaps().includes(id));const allowedAI=item.ai.filter(k=>ai.enabled[k]&&controlState('ai_need_'+k)!=='excluido');if(!allowed.length&&!allowedAI.length){line(card,'Pendiente','Los controles asociados están excluidos o ya no están activos. Revisa los controles del diseño.');return;}
 for(const id of allowed)if(controlState(id)!=='excluido')st.vendors[id]=product.producto+' · '+product.fabricante;
 if(item.ai.length){const vendor=entry.caps[0];for(const k of allowedAI)if(AI_RULES[k].vendors.includes(vendor))ai.selected[k]=vendor;mesh.mode=AI_RULES[item.ai.includes('data')?'data':item.ai[0]].mode;st.focus=vendor;}
 else {st.focus=item.capabilities[0]||st.focus;if(st.chosen.some(n=>connectivityIds.has(n))&&['Fortinet','Cato Networks'].includes(product.fabricante)&&item.capabilities.some(k=>['sdwan','sase'].includes(k)))setConnectivityVendor(product.fabricante);}
 window.MC_PREVENTA?.addProduct(product.id);render();use.textContent='Incluido para Preventa';log('Alternativa seleccionada desde Smart Architect: '+product.producto);canvas()?.scrollIntoView?.({behavior:'smooth',block:'start'});
 };card.append(use);
 if(product.requisitos){const note=document.createElement('small');note.textContent=product.requisitos;card.append(note);}
 (index<4?host:extra).append(card);
 });if(alternatives.length>4)host.append(extra);
 const gaps=proposedCaps().filter(k=>!infrastructure.has(k)&&!k.startsWith('ai_need_')&&!matching('',k).length);
 if(gaps.length)line(host,'Integraciones por confirmar',gaps.map(k=>caps[k][0]).join(', ')+'. Se muestran como capacidades genéricas; no se asigna un producto sin soporte en el directorio.');
 return host;
 }
 function apply(){
 st.chosen=MC_SMART.merge(st,current).chosen;for(const key of current.ai)ai.enabled[key]=true;
 for(const [key,id] of [['sites','branches'],['users','users'],['remotes','remote']]){const value=current.facts[key].value;if(value!==null){$(id).value=value;$(id).dataset.confirmed='true';}else if(!$(id).dataset.confirmed){$(id).value=0;$(id).title='Cantidad desconocida; cero indica sin dato confirmado';}}
 if(current.facts.private.value)$('appType').value=current.facts.cloud.value?'hybrid':'private';else if(current.facts.cloud.value)$('appType').value='saas';
 st.step=-1;st.playing=false;st.domain='Todos';st.phase='Todas';
 st.scenarioNeed=current.hits[0].id;
 if(current.hits.some(h=>h.id==='ransomware')){mesh.mode='ransomware';st.scenarioNeed='ransomware';}
 else if(current.ai.length)mesh.mode=AI_RULES[current.ai.includes('data')?'data':current.ai[0]].mode;
 else {const modes={datos:'exfil',identidad:'access',remoto:'remote-private',aplicaciones:'web',ddos:'ddos',sdwan_only:'site-saas',sase_sites:'site-saas'};mesh.mode=modes[st.scenarioNeed]||'site-saas';}
 window.MC_SMART.last=current;
 const objective=$('discovery_objective');if(objective&&!objective.value)objective.value=current.text;
 st.focus=needDefs.find(n=>n.id===st.scenarioNeed)?.caps.find(k=>!infrastructure.has(k))||proposedCaps()[0]||null;
 render();view.disabled=false;
 log('Smart Architect: solución diseñada, contexto actualizado y simulación preparada.');
 }
 analyze.onclick=()=>{result.replaceChildren();view.disabled=true;try{
 current=MC_SMART.analyze(input.value);
 if(current.canBuild){apply();line(result,'Solución diseñada',current.hits.map(h=>needDefs.find(n=>n.id===h.id).name).join(' + '));
 const data=[];for(const [k,label] of [['sites','sedes'],['users','usuarios'],['endpoints','equipos'],['remotes','usuarios remotos']])if(current.facts[k].value!==null)data.push(current.facts[k].value+' '+label);
 line(result,'Laboratorio actualizado',(data.join(' · ')||'Cantidades pendientes de confirmar')+'. '+(current.facts.sites.value>4?'Se muestran cuatro sedes representativas y se conserva el total. ':'')+'Controles y simulación listos debajo. Las alternativas de producto aparecen después del diagrama.');
 const simulate=document.createElement('button');simulate.id='smartSimulate';simulate.className='primary';simulate.textContent='▶ Simular solución';simulate.onclick=()=>{view.onclick();play()};result.append(simulate);let offers=$('smartPortfolioHost');if(!offers){offers=document.createElement('section');offers.id='smartPortfolioHost';offers.className='subpanel';canvas()?.after(offers);}offers.replaceChildren(portfolio());
 }else{$('smartPortfolioHost')?.replaceChildren();line(result,'Necesito una aclaración','No hay evidencia suficiente para diseñar una solución.');
 if(/cae|lenta|lento|satur|indisponib/.test(MC_SMART.normalize(current.text))){
 const choices=[['Hay evidencia de tráfico malicioso','Confirmamos un ataque DDoS.'],['Necesitamos respaldo y recuperación','Necesitamos recuperar los sistemas con copias de seguridad.']];
 for(const [label,answer] of choices){const b=document.createElement('button');b.className='chip';b.textContent=label;b.onclick=()=>{input.value+='\n'+answer;analyze.onclick()};result.append(b);}
 }
 line(result,'Para continuar',current.pending.filter(t=>!t.startsWith('Preventa')&&!t.startsWith('¿Cuántas')).join(' '));
 }
 if(current.corrections?.length)line(result,'Términos interpretados',current.corrections.map(c=>'«'+c.from+'» → «'+c.to+'»').join('; '));
 const detail=document.createElement('details');detail.id='smartExplanation';const summary=document.createElement('summary');summary.textContent='Ver interpretación, explicación y datos pendientes';detail.append(summary);
 line(detail,'Indicador interno heurístico',current.confidence+'; no es una probabilidad estadística.');
 for(const hit of current.hits)line(detail,needDefs.find(n=>n.id===hit.id).name,hit.risk+' Evidencia: '+hit.evidence.join(', '));
 const ids=[...new Set(current.hits.flatMap(h=>needDefs.find(n=>n.id===h.id).caps))];
 if(ids.length)line(detail,'Capacidades y motivo',ids.filter(k=>!infrastructure.has(k)).map(k=>caps[k][0]+': '+caps[k][4]).join(' · '));
 line(detail,'Datos',Object.entries(current.facts).map(([k,f])=>({sites:'Sedes',users:'Usuarios',endpoints:'Equipos',remotes:'Remotos',cloud:'Nube',private:'Aplicaciones privadas'}[k])+': '+(f.value===null?'desconocido':f.value)).join(' · '));
 if(current.hits.length)line(detail,'Recorrido de la solución',current.hits.map(h=>needDefs.find(n=>n.id===h.id).scenario.join(' ')).join(' '));
 line(detail,'Confirmar con Preventa',current.pending.join(' '));
 if(current.ai.length)line(detail,'Alternativas de IA','Selecciona una alternativa compatible en los controles de Seguridad de IA; la propuesta genérica no atribuye bloqueo a un fabricante pendiente.');
 result.append(detail);if(current.canBuild)view.onclick();
 }catch(e){line(result,'No se pudo completar el diseño',e.message);}};
 for(const id of ['branches','users','remote'])$(id).addEventListener('change',()=>{$(id).dataset.confirmed='true';});
 panel.append(title,input,examples,analyze,view,result);document.querySelector('main').prepend(panel);return true;
})();
})();




