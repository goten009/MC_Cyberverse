const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');const ctx={};ctx.window=ctx;vm.createContext(ctx);for(const f of ['catalogo.js','portfolio.js','smart-rules.js','smart.js'])vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../web',f),'utf8'),ctx);let count=0;
const cases=[
['el cliente tiene problemas con ramsomware',['ransomware']],
['Nos preocupa el ransonware',['ransomware']],
['Necesitamos protección contra ransomwere',['ransomware']],
['Mi cliente teme que le secuestren toda su información',['ransomware']],
['Le cifraron todos los documentos',['ransomware']],
['Piden un rescate por los datos',['ransomware']],
['Un empleado abre correos muy sospechosos',['correo']],
['Tenemos ataques de phising',['correo']],
['Los usuarios suben documentos de la empresa a chat gpt',['datos','ai_security']],
['Están pegando datos del cliente en ChatGPT',['datos','ai_security']],
['Las sucursales tienen cortes constantes de internet',['sdwan_only']],
['Necesitamos conectar nuestras oficinas',['sdwan_only']],
['Los empleados trabajan desde sus casas',['remoto']],
['Queremos controlar los accesos de los empleados',['identidad']],
['Quiero proteger el portal web de la empresa',['aplicaciones']],
['Necesitan monitorear las amenazas por la noche',['visibilidad']],
['Queremos recuperar toda nuestra información',['continuidad']],
['No tenemos copias de seguridad',['continuidad']],
['No contamos con backup',['continuidad']],
['No queremos sufrir ransomware',['ransomware']],
['12 sedes con problemas de conectividad, phising y documentos en chatgpt',['sdwan_only','correo','datos','ai_security']],
['No necesitamos ramsomware ni phising',[]],
['No tenemos problemas con ransomware',[]],
['Sin ataques de phishing',[]],
['No usamos chat gpt',[]],
['Se cae el portal de la empresa',[]],
['La página está lenta y no sabemos por qué',[]],
['El software de contabilidad está fallando',[]],
['Necesito organizar las oficinas',[]]
];
for(const [text,expected] of cases){const d=ctx.MC_SMART.analyze(text);if(expected.length)for(const id of expected)assert(d.hits.some(h=>h.id===id),text+' → falta '+id);else assert.equal(d.hits.length,0,text);count++;console.log('PASS '+text);}
assert(ctx.MC_SMART.analyze(cases[0][0]).corrections.some(c=>c.from==='ramsomware'&&c.to==='ransomware'));console.log('TOTAL '+count);
