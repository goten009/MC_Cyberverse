'use strict';
(function(root){
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[-–]/g,' ').replace(/\s+/g,' ').trim();
// Distancia acotada solo para términos técnicos autorizados; no corrige palabras generales.
function distance(a,b){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=0;i<a.length;i++){let next=[i+1];for(let j=0;j<b.length;j++)next[j+1]=Math.min(next[j]+1,row[j+1]+1,row[j]+(a[i]===b[j]?0:1));row=next;}return row[b.length];}
function canonicalize(text){const corrections=[];let value=text;
 for(const [term,aliases] of Object.entries(root.MC_SMART_TERMS||{}))for(const alias of aliases){if(alias===term)continue;value=value.replace(new RegExp('\\b'+alias+'\\b','g'),match=>{corrections.push({from:match,to:term});return term;});}
 value=value.replace(/\b[a-z]{6,18}\b/g,word=>{if(Object.keys(root.MC_SMART_TERMS||{}).includes(word))return word;const matches=Object.keys(root.MC_SMART_TERMS||{}).filter(t=>t.length>=7&&Math.abs(t.length-word.length)<=1&&distance(word,t)<=1);if(matches.length===1){corrections.push({from:word,to:matches[0]});return matches[0];}return word;});
 return {value,corrections};
}
function analyze(input){
 if(typeof input!=='string'||!input.trim()||input.length>4000)throw Error('Escribe entre 1 y 4000 caracteres.');
 const canonical=canonicalize(normalize(input)), text=canonical.value, clauses=text.split(/[.!?;,]|\bpero\b|\baunque\b/), hits=[];
 function positive(c,start,matched){const before=c.slice(0,start);if(/no sabemos quien/.test(matched)||/^(?:sin soc|no tenemos soc)$/.test(matched))return true;
 if(/\bno (?:queremos|quiero|quieren) (?:sufrir|que|perder)/.test(before))return true;
 const gap=/\b(no tenemos|no tengo|no cuentan con|no contamos con|no hay|carecemos de|sin|faltan)\b.{0,30}$/.test(before)||/^(?:no tenemos|sin|faltan)\b/.test(matched);
 if(gap&&/backup|respaldo|copias de seguridad|monitoreo|proteccion|mfa|doble factor|soc|antivirus/.test(matched))return true;
 return !/\b(no|sin|nunca|ni)\b(?:\s+\w+){0,5}\s*$/.test(before)&&! /^(?:no|sin|nunca|ni)\b/.test(matched);
 }
 function evidence(phrases,patterns=[]){const found=[];for(const c of clauses){for(const phrase of phrases){const escaped=phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const re=new RegExp('(?:^|\\b)'+escaped+'(?:$|\\b)','g');let m;while((m=re.exec(c)))if(positive(c,m.index,m[0]))found.push(m[0]);}
 for(const pattern of patterns){const re=new RegExp(pattern,'g');let m;while((m=re.exec(c)))if(positive(c,m.index,m[0]))found.push(m[0]);}}
 return [...new Set(found)];}
 for(const r of root.MC_SMART_RULES){const found=evidence(r.phrases,r.patterns);if(found.length)hits.push({id:r.id,evidence:found,risk:r.risk,score:Math.min(5,found.length*2)});}
 const portfolioMatches=(root.MC_PORTFOLIO?.products||[]).map(entry=>({entry,found:evidence(entry.aliases.map(normalize))})).filter(m=>m.found.length);
 for(const {entry,found} of portfolioMatches)for(const id of entry.needs){if(!hits.some(h=>h.id===id)){const product=root.MC_CATALOGO?.productos.find(p=>p.id===entry.id);hits.push({id,evidence:found,risk:product?.fortaleza||'Evaluar la capacidad solicitada dentro del portafolio MC.',score:2});}}
 const ai=[];
 const aiMention=evidence(['chatgpt','copilot','gemini','claude','seguridad de ia','proteger la ia','proteger ia','uso de ia','ia no autorizada','ia generativa','shadow ia','usan ia','utilizan ia','ia sin permiso','aplicaciones de ia','herramientas de ia','shadow ai','inteligencia artificial','agentes de ia','prompt injection','herramientas de inteligencia artificial','aplicaciones de inteligencia artificial']);
 const aiProducts=portfolioMatches.filter(m=>m.entry.ai.length);
 const agentMention=evidence(['agentes de ia','agentes autonomos','agente de ia','agentes de inteligencia artificial']);
 const promptMention=evidence(['prompt injection','inyeccion de prompts','inyeccion de instrucciones']);
 if(aiMention.length||aiProducts.length||agentMention.length||promptMention.length){
 if(aiMention.length&&!agentMention.length&&!promptMention.length)ai.push('shadow');
 if(hits.some(h=>h.id==='datos')||evidence(['informacion en aplicaciones de ia','datos en chatgpt','archivos confidenciales']).length)ai.push('data');
 if(agentMention.length||aiProducts.some(m=>m.entry.id==='mc-ai-guardian'))ai.push('agent');
 if(promptMention.length)ai.push('prompt');
 if(!ai.length)ai.push('shadow');
 if(ai.includes('data')&&!hits.some(h=>h.id==='datos'))hits.push({id:'datos',evidence:aiMention,risk:'Controlar la exposición de información en canales de IA cubiertos.',score:2});
 if(!hits.some(h=>h.id==='ai_security'))hits.push({id:'ai_security',evidence:[...aiMention,...agentMention,...promptMention,...aiProducts.flatMap(m=>m.found)],risk:'Gobernar el riesgo de IA dentro del alcance documentado de cada alternativa.',score:2});
 }
 const words={una:1,un:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,doce:12};
 const facts={},pending=[];
 for(const [key,nouns] of Object.entries({sites:'sedes?|sucursales?|oficinas?',users:'usuarios?|empleados?',endpoints:'equipos?|endpoints?|computadores?',remotes:'usuarios? remotos?'})){
 const re=new RegExp('\\b(\\d+|'+Object.keys(words).join('|')+')\\s+(?:'+nouns+')\\b','g');let m,values=[];while((m=re.exec(text))){if(/\b(no|sin)\b(?:\s+\w+){0,3}\s*$/.test(text.slice(Math.max(0,m.index-12),m.index)))continue;values.push(words[m[1]]??Number(m[1]));}values=[...new Set(values)];facts[key]={value:values.length===1?values[0]:null,source:values.length===1?'explícito':'desconocido'};if(values.length>1)pending.push('Confirma cantidades contradictorias de '+key+'.');}
 facts.cloud={value:evidence(['aplicaciones en nube','aplicaciones saas']).length?true:null,source:'explícito o desconocido'};
 facts.private={value:evidence(['aplicaciones privadas','centro de datos','centros de datos']).length?true:null,source:'explícito o desconocido'};
 if(facts.sites.value===null)pending.push('¿Cuántas sedes tiene el cliente? La vista usará una sede representativa, no una cantidad confirmada.');
 if(evidence(['se cae mucho la pagina','se cae la pagina','se cae el portal','pagina esta lenta','portal esta lento','saturando el portal','pagina lenta']).length&&!hits.some(h=>h.id==='ddos'))pending.push('¿Hay evidencia de tráfico malicioso, fallas de infraestructura u otra causa de indisponibilidad?');
 if(!hits.length)pending.push('¿Qué actividad, activo o riesgo necesita proteger el cliente?');
 pending.push('Preventa debe confirmar productos, licencias, canales, integraciones y objetivos de recuperación.');
 return {text:input.trim(),productMentions:portfolioMatches.map(m=>m.entry.id),corrections:canonical.corrections,hits,ai,facts,pending,confidence:hits.length?(hits.every(h=>h.score>=4)?'Alta':'Media'):'Insuficiente',canBuild:hits.length>0};
}
function merge(current, result){
 if(!result.canBuild)throw Error('La interpretación requiere aclaraciones.');
 return {...current,chosen:[...new Set([...current.chosen,...result.hits.map(h=>h.id)])]};
}
function recommend(result,activeCaps=[]){
 return (root.MC_PORTFOLIO?.products||[]).map(entry=>{
 const ai=entry.ai.filter(k=>result.ai.includes(k));
 const capabilities=entry.ai.length?[]:entry.caps.filter(k=>activeCaps.includes(k));
 return {id:entry.id,capabilities,ai,requested:(result.productMentions||[]).includes(entry.id),source:entry.source};
 }).filter(item=>item.capabilities.length||item.ai.length).sort((a,b)=>Number(b.requested)-Number(a.requested)||Number(b.ai.length>0)-Number(a.ai.length>0)||a.id.localeCompare(b.id));
}
root.MC_SMART={analyze,normalize,merge,recommend};
})(typeof window==='undefined'?globalThis:window);
