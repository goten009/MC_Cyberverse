'use strict';
(()=>{
const $=id=>document.getElementById(id),engine=window.MC_HANDOFF_ENGINE;
const defs=[['salesOwner','Comercial responsable','input',120],['clientContact','Contacto del cliente','input',160],['sector','Sector / actividad','input',160],['objective','Objetivo y resultado esperado','textarea',3000],['environment','Herramientas e infraestructura actuales','textarea',3000],['sitesDetail','Detalle de sedes, ubicaciones y conectividad','textarea',3000],['applications','Aplicaciones, datos y canales que deben cubrirse','textarea',3000],['additionalTools','Otras herramientas que el cliente quiere evaluar (una por línea)','textarea',2000],['constraints','Restricciones, presupuesto de referencia y plazo','textarea',3000],['nextStep','Próximo paso acordado con el cliente','textarea',2000],['notes','Observaciones para Preventa','textarea',4000]];
let productIds=[],current=null;
const clean=(value,max=4000)=>typeof value==='string'?value.replace(/\u0000/g,'').slice(0,max):'';
function state(){return {fields:Object.fromEntries(defs.map(([id,,,max])=>[id,clean($('discovery_'+id).value,max)])),products:[...productIds]}}
function restore(data){for(const [id,,,max] of defs)$('discovery_'+id).value=clean(data?.fields?.[id],max);productIds=[...new Set((Array.isArray(data?.products)?data.products:[]).filter(id=>window.MC_CATALOGO.productos.some(p=>p.id===id)))];current=null;$('handoffDialog').close();renderProducts()}
function renderProducts(){const root=$('evaluationProducts');root.replaceChildren();const title=document.createElement('h3');title.textContent='Productos agregados desde el catálogo';root.append(title);if(!productIds.length){const p=document.createElement('p');p.className='tiny';p.textContent='Abre una ficha del catálogo y pulsa «Agregar a evaluación de Preventa». Las alternativas elegidas en la arquitectura también se incluirán.';root.append(p)}for(const id of productIds){const p=window.MC_CATALOGO.productos.find(p=>p.id===id),row=document.createElement('div');row.className='evaluation-product';const label=document.createElement('span');label.textContent=p.producto+' · '+p.fabricante;const remove=document.createElement('button');remove.className='outline';remove.textContent='Quitar';remove.setAttribute('aria-label','Quitar '+p.producto);remove.onclick=()=>{productIds=productIds.filter(x=>x!==id);renderProducts()};row.append(label,remove);root.append(row)}}
for(const [id,label,type,max] of defs){const wrap=document.createElement('label');wrap.textContent=label;const field=document.createElement(type);field.id='discovery_'+id;field.maxLength=max;field.setAttribute('aria-label',label);if(type==='textarea')field.rows=3;wrap.append(field);$('discoveryFields').append(wrap)}
window.MC_PREVENTA={state,restore,clear:()=>restore(null),hasData:()=>productIds.length>0||Object.values(state().fields).some(Boolean),addProduct:id=>{if(window.MC_CATALOGO.productos.some(p=>p.id===id)&&!productIds.includes(id)){productIds.push(id);renderProducts()}}};
const statusName={propuesto:'Evaluar en propuesta',existente:'Declarado existente por el cliente',excluido:'Excluido de esta propuesta'};
function collect(){
 const d=engine.snapshot(),discovery=state(),pending=[],tools=[],seen=new Set(),recommended=d.coverage.recommended;
 const status=id=>d.controlStates[id]||'propuesto';
 const add=(name,vendor,mode,origin,reason)=>{const key=[name.toLowerCase(),vendor.toLowerCase(),mode].join('|');if(seen.has(key))return;seen.add(key);tools.push({name,vendor,status:mode,origin,reason})};
 for(const id of discovery.products){const p=window.MC_CATALOGO.productos.find(p=>p.id===id);add(p.producto,p.fabricante,'propuesto','Selección explícita del catálogo','Interés del cliente por evaluar')}
 const connectivity=d.needs.some(n=>['sase_sites','sdwan_only','sse_only'].includes(n));
 if(connectivity){
  if(d.connectivityVendor==='generic')pending.push('Definir fabricante y modalidad de conectividad con Preventa.');
  else if(d.connectivityVendor==='Cato Networks'){
   if(recommended.includes('sase'))add('Cato SASE / SSE Cloud','Cato Networks',status('sase'),'Arquitectura de conectividad','Servicios de acceso y seguridad según modalidad seleccionada');
   if(recommended.includes('sdwan'))add('Cato Socket / conectividad de sedes','Cato Networks',status('sdwan'),'Arquitectura de conectividad','Modelo de acceso de sedes; validar cantidad de equipos y enlaces');
  }else if(d.connectivityVendor==='Fortinet'){
   if(recommended.includes('sdwan')||recommended.includes('ngfw'))add('FortiGate Secure SD-WAN / NGFW','Fortinet',status(recommended.includes('sdwan')?'sdwan':'ngfw'),'Arquitectura de conectividad','Dimensionar funciones, enlaces y licencias');
   if(recommended.includes('sase'))add('FortiSASE','Fortinet',status('sase'),'Arquitectura de conectividad','Validar modalidad de acceso y alcance');
  }
 }
 const aiNeeds=[];
 for(const [id,rule] of Object.entries(engine.aiRules)){
  if(!d.needs.includes('ai_security')||!d.ai.enabled[id])continue;
  const vendor=d.ai.selected[id],cap='ai_need_'+id,mode=status(cap);
  const row={need:rule.name,alternative:vendor?engine.capabilities[vendor]?.[0]||'Pendiente':'Pendiente',status:mode,scope:rule.scope};aiNeeds.push(row);
  if(vendor)add(row.alternative,vendor==='ai_sophos'?'Sophos':vendor==='ai_guardian'?'CrowdStrike':'Cato Networks',mode,'Necesidad de IA',rule.name);else pending.push('Definir alternativa para '+rule.name+'.');
 }
 if(d.needs.includes('ai_security')&&!aiNeeds.length)pending.push('Precisar las necesidades de IA: no se han seleccionado necesidades específicas.');
 for(const [id,name,vendor] of [['sophos_edr','Sophos EDR','Sophos'],['falcon_sensor','Falcon Sensor / EDR','CrowdStrike'],['cato_client','Cato Client · agente por PC','Cato Networks']])if(recommended.includes(id))add(name,vendor,status(id),'Dependencia de la arquitectura IA','Base necesaria para la modalidad de IA seleccionada');
 for(const [id,value] of Object.entries(d.vendors))if(recommended.includes(id)&&!['sase','sdwan','ngfw'].includes(id)){
  const parts=value.split(' · ');add(parts[0],parts.slice(1).join(' · ')||'Por confirmar',status(id),'Alternativa de capacidad',engine.capabilities[id][0]);
 }
 const controls=recommended.map(id=>({id,name:engine.capabilities[id][0],domain:engine.capabilities[id][1],phases:engine.contributions[id]||[engine.capabilities[id][2]],status:status(id),gap:d.coverage.missing.includes(id)}));
 for(const control of controls)if(control.gap)pending.push('Revisar brecha: '+control.name+' (exclusión, alternativa o dependencia faltante).');
 for(const [id,label] of defs)if(!discovery.fields[id].trim()&&!['additionalTools','notes'].includes(id))pending.push('Confirmar: '+label.toLowerCase()+'.');
 if(!tools.some(t=>t.status==='propuesto')&&!discovery.fields.additionalTools.trim())pending.push('Confirmar las herramientas concretas que el cliente quiere evaluar; las capacidades genéricas no equivalen a productos seleccionados.');
 if(d.client==='Empresa Demo')pending.push('Reemplazar «Empresa Demo» por el nombre confirmado del cliente antes de entregar.');
 pending.push('Validar cantidades de equipos/licencias, sistemas operativos, enlaces, integraciones y alcance de los productos.');
 const strategy=engine.phases.map(phase=>({phase,controls:controls.filter(c=>c.phases.includes(phase)).map(c=>({name:c.name,status:c.status,gap:c.gap}))}));
 return {schema:'mc-cyberverse-handoff-1',id:'CV-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+crypto.randomUUID().slice(0,8),generatedAt:new Date().toISOString(),appVersion:'0.9.4',client:{name:d.client,users:d.users,sites:d.branches,remoteUsers:d.remote,applicationType:d.appType},discovery,needs:d.needs.map(id=>engine.needs.find(n=>n.id===id).name),aiNeeds,tools,controls,strategy,pending:[...new Set(pending)],architecture:d};
}
function lines(data){
 const missing='Pendiente de confirmar',f=data.discovery.fields;
 return [
 'MC CYBERVERSE · ENTREGA A PREVENTA',
 'Referencia: '+data.id,'Generado: '+new Date(data.generatedAt).toLocaleString('es-CO',{timeZone:'America/Bogota'})+' · America/Bogota',
 'Estado: levantamiento comercial para validación técnica','Versión: '+data.appVersion,'',
 '1. CLIENTE Y ALCANCE','Cliente: '+data.client.name,'Comercial: '+(f.salesOwner||missing),'Contacto: '+(f.clientContact||missing),'Sector: '+(f.sector||missing),
 'Usuarios totales: '+data.client.users,'Usuarios remotos (subconjunto del total): '+data.client.remoteUsers,'Sedes / sitios: '+data.client.sites,'Aplicaciones: '+({saas:'SaaS / Internet',private:'Privadas',hybrid:'SaaS y privadas'}[data.client.applicationType]),
 'Detalle de sedes: '+(f.sitesDetail||missing),'',
 '2. OBJETIVO Y NECESIDADES','Resultado esperado: '+(f.objective||missing),...data.needs.map(n=>'- '+n),'',
 '3. HERRAMIENTAS A EVALUAR Y ESTADO DECLARADO',...(data.tools.length?data.tools.map(t=>'- '+t.name+' | '+t.vendor+' | '+statusName[t.status]+' | '+t.origin+' | '+t.reason):['Sin productos concretos seleccionados.']),
 'Herramientas adicionales solicitadas:',f.additionalTools||'No registradas.','',
 '4. ENTORNO ACTUAL',f.environment||missing,'Aplicaciones, datos y canales:',f.applications||missing,'',
 '5. NECESIDADES DE IA Y MODALIDAD',...(data.aiNeeds.length?data.aiNeeds.map(n=>'- '+n.need+' | '+n.alternative+' | '+statusName[n.status]+'\n  Alcance: '+n.scope):['No seleccionadas.']),
 ...(data.tools.some(t=>t.name.includes('Cato Client'))?['Cato IA por endpoint: PC → Cato Client → PoP; inspección en el PoP. No exige SASE de sedes.']:[]),'',
 '6. CONTROLES DE LA ARQUITECTURA',...data.controls.map(c=>'- '+c.name+' | '+c.domain+' | '+c.phases.join(', ')+' | '+statusName[c.status]+(c.gap?' | Brecha pendiente':'')),'',
 '7. LECTURA ESTRATÉGICA',...data.strategy.map(s=>s.phase+': '+(s.controls.length?s.controls.map(c=>c.name+' ['+statusName[c.status]+(c.gap?'; brecha':'')+']').join('; '):'Sin control específico contemplado en esta selección.')),
 'Esta lectura describe la propuesta; no certifica el nivel de seguridad del cliente.','',
 '8. RESTRICCIONES Y PRÓXIMO PASO','Restricciones / plazo / presupuesto: '+(f.constraints||missing),'Próximo paso: '+(f.nextStep||missing),'Observaciones: '+(f.notes||'No registradas.'),'',
 '9. PENDIENTES PARA PREVENTA',...data.pending.map(p=>'- '+p),'',
 '10. ALCANCE DEL DOCUMENTO','Levantamiento comercial y arquitectura conceptual. No es una cotización, dimensionamiento final ni garantía de compatibilidad. Los elementos existentes son declaraciones del cliente por validar. Las cantidades corresponden a contexto comercial y no equivalen automáticamente a licencias. El expediente JSON conserva la configuración y la topología completa.'
 ].join('\n');
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function html(data){return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escapeHTML(data.client.name)+' · Entrega a Preventa</title><style>body{font:14px/1.6 Arial,sans-serif;color:#142d37;max-width:950px;margin:36px auto;padding:0 28px}header{border-bottom:4px solid #008d77;padding-bottom:16px}h1{font-size:25px;margin:0}pre{font:13px/1.65 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere}button{background:#00765f;color:white;border:0;border-radius:7px;padding:12px 18px;cursor:pointer}section{margin-top:25px}h2{font-size:16px;color:#006e61;border-bottom:1px solid #ccddd8;padding-bottom:8px}p{white-space:pre-wrap;overflow-wrap:anywhere}@media print{button{display:none}body{margin:0;padding:0;max-width:none}h2{break-after:avoid}section{break-inside:auto}@page{size:A4;margin:18mm}}</style></head><body><header><h1>MC CYBERVERSE · Entrega a Preventa</h1><p>'+escapeHTML(data.client.name)+' · '+escapeHTML(data.id)+'</p><button id="printReport">Imprimir / guardar como PDF</button></header>'+lines(data).split(/\n(?=\d+\. )/).map((block,i)=>{if(i===0)return '<pre>'+escapeHTML(block)+'</pre>';const [heading,...rest]=block.split('\n');return '<section><h2>'+escapeHTML(heading)+'</h2><p>'+escapeHTML(rest.join('\n'))+'</p></section>'}).join('')+'<script>document.getElementById("printReport").addEventListener("click",()=>window.print());<\/script></body></html>'}
function download(name,data,type){const url=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
$('generateHandoff').onclick=()=>{
 const errors=[];if(!$('client').value.trim())errors.push('Escribe el nombre del cliente.');
 for(const [id,label,max,min] of [['users','usuarios',999999,1],['branches','sedes',99,0],['remote','usuarios remotos',999999,0]]){const value=$(''+id).value,n=Number(value);if(value===''||!Number.isInteger(n)||n<min||n>max)errors.push('Revisa '+label+': debe ser un entero entre '+min+' y '+max+'.')}
 if(Number($('remote').value)>Number($('users').value))errors.push('Los usuarios remotos no pueden superar el total de usuarios.');
 if(!engine.snapshot().needs.length)errors.push('Selecciona al menos una necesidad del cliente.');
 $('handoffErrors').textContent=errors.join(' ');if(errors.length){$('handoffErrors').scrollIntoView({block:'center'});return}
 current=collect();$('handoffPreview').textContent=lines(current);$('handoffDialog').showModal();
};
$('closeHandoff').onclick=()=>$('handoffDialog').close();
for(const [id,extension,mime,build] of [['downloadHandoffText','txt','text/plain;charset=utf-8',lines],['downloadHandoffHTML','html','text/html;charset=utf-8',html],['downloadHandoffJSON','json','application/json',d=>JSON.stringify(d,null,2)]])$(id).onclick=()=>{if(current)download('MC-CYBERVERSE-Preventa-'+current.id+'.'+extension,build(current),mime)};
renderProducts();
})();
