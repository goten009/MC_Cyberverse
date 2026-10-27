let pw;try{pw=require(process.env.PLAYWRIGHT_MODULE||'playwright')}catch{pw=require('C:/Users/AORUS/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')}const {chromium}=pw;
const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});const page=await browser.newPage({viewport:{width:1600,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(process.env.TEST_URL||require('node:url').pathToFileURL(path.join(__dirname,'../web/index.html')).href);
const results=[];async function test(name,fn){await fn();results.push(name);console.log('PASS '+name)}
async function need(name){await page.locator('#needs button').filter({hasText:name}).click()}
async function save(){await page.locator('#save').click();return page.evaluate(()=>JSON.parse(localStorage.getItem('mc-cyberverse-v08')))}
async function snap(){return (await save()).topology}
const names={shadow:'Gobierno de Shadow AI',data:'Protección de datos en prompts y archivos',agent:'Seguridad de agentes autónomos',prompt:'Protección frente a prompt injection'};
await test('Internet inicial y versión',async()=>{assert.match(await page.title(),/0.10.2/);assert.match(await page.locator('#boxes').textContent(),/Internet/)});
await need('Uso seguro de inteligencia artificial');
await test('IA no agrega fabricantes implícitos',async()=>{const d=await save();assert(!d.capabilities.some(k=>['ai_sophos','ai_cato','ai_guardian'].includes(k)));assert(!Object.keys(d.topology.nodes).some(k=>k.startsWith('ai-')))});
for(const [key,name] of Object.entries(names)){
 await page.getByRole('checkbox',{name,exact:true}).check();
 await test(key+' pendiente no detecta ni cubre',async()=>{const d=await save();assert(d.coverage.missing.includes('ai_need_'+key));assert.equal(d.topology.detected,false)});
 const select=page.getByRole('combobox',{name:'Alternativa para '+name,exact:true});
 const values=await select.locator('option').evaluateAll(os=>os.map(o=>o.value).filter(Boolean));
 for(const vendor of values){
  await select.selectOption(vendor);
  await test(key+' / '+vendor+' ruta válida',async()=>{const t=await snap();assert(t.detected);assert(t.path.length>1);for(let i=1;i<t.path.length;i++)assert(t.routes.some(r=>(r.a===t.path[i-1]&&r.b===t.path[i])||(r.b===t.path[i-1]&&r.a===t.path[i])));if(vendor==='ai_cato'&&['data','shadow'].includes(key)){assert(t.path.some(k=>k.startsWith('ai-pop-')));assert(!t.routes.some(r=>r.t==='backbone'))}});
 }
 await test(key+' excluir retira control y detección',async()=>{await page.getByRole('combobox',{name:'Estado de '+name,exact:true}).selectOption('excluido');assert.equal((await snap()).detected,false);await page.getByRole('combobox',{name:'Estado de '+name,exact:true}).selectOption('existente');assert.equal((await snap()).detected,true)});
 await page.getByRole('checkbox',{name,exact:true}).uncheck();
}
await page.getByRole('checkbox',{name:names.data,exact:true}).check();await page.getByRole('combobox',{name:'Alternativa para '+names.data,exact:true}).selectOption('ai_cato');
await need('SASE para sedes');await need('Defensa contra ransomware');await page.locator('#branches').fill('8');await page.locator('#branches').dispatchEvent('change');await page.locator('#connectivity select').selectOption('Cato Networks');
await test('SASE + ransomware + IA; máximo 4 sedes',async()=>{const t=await snap();assert(t.nodes['edr-node']);assert(t.nodes['ai-data']);assert(t.nodes.pop2);assert.equal(Object.keys(t.nodes).filter(k=>/^s\d$/.test(k)).length,4);assert(t.nodes.extra)});
await test('Sede a sede usa backbone',async()=>{await page.locator('#meshMode').selectOption('site-site');const t=await snap();assert(t.path.includes('pop1')&&t.path.includes('pop2'));assert(t.path.length>1)});
await test('SaaS sale por PoP local',async()=>{await page.locator('#meshMode').selectOption('site-saas');const t=await snap();assert(t.path.includes('pop2'));assert(!t.path.includes('pop1'))});
await test('EDR excluido no detecta ransomware',async()=>{await page.locator('#meshMode').selectOption('ransomware');await page.getByRole('combobox',{name:'Estado de EDR',exact:true}).selectOption('excluido');assert.equal((await snap()).detected,false)});
await test('Cambio Fortinet reconstruye conectividad y conserva IA',async()=>{await page.locator('#connectivity select').selectOption('Fortinet');const t=await snap();assert.equal(t.nodes.e1.name,'FortiGate');assert.equal(t.nodes.pop1.name,'FortiSASE PoP');assert(t.nodes['ai-pop-data']);assert(!t.nodes.pop2)});
await test('Guardado y recuperación conserva decisiones IA',async()=>{const d=await save();await page.reload();await page.locator('#load').click();const restored=await save();assert.deepEqual(restored.ai,d.ai);assert.deepEqual(restored.needs,d.needs);assert.equal(restored.connectivityVendor,d.connectivityVendor)});
await test('Filtro de fase funciona en multisede',async()=>{await page.locator('#phases button').filter({hasText:'Recuperar'}).click();assert(await page.locator('.meshnode.filtered').count()>0)});
await page.locator('#phases button').filter({hasText:'Todas'}).click();await page.locator('#meshMode').selectOption('ai-data');await page.locator('#topology').screenshot({path:path.join(__dirname,'architecture.png')});
await test('Animación y SVG sin errores',async()=>{await page.locator('#simulate').click();assert(await page.locator('#particles circle').count()>0);assert.deepEqual(errors,[]);assert.equal(await page.locator('#links path').evaluateAll(xs=>xs.filter(x=>!Number.isFinite(x.getTotalLength())).length),0)});
await test('Diseño antiguo migra sin tres fabricantes implícitos',async()=>{await page.evaluate(()=>localStorage.setItem('mc-cyberverse-v08',JSON.stringify({schema:'mc-cyberverse-0.8',needs:['ai_security'],controlStates:{ai_sophos:'existente',ai_guardian:'existente',ai_cato:'existente'}})));await page.locator('#load').click();const d=await save();assert(!Object.keys(d.topology.nodes).some(k=>k.startsWith('ai-')));assert.equal(d.coverage.score,null)});
await test('Todas las necesidades conservan capacidades al combinarse',async()=>{for(const b of await page.locator('#needs button').all()){if(!((await b.getAttribute('class')).includes('active')))await b.click()}const d=await save();assert(d.capabilities.includes('backup'));assert(d.capabilities.includes('waf'));assert(d.capabilities.includes('cnapp'));assert(Object.values(d.topology.nodes).some(n=>n.control==='waf'));assert.deepEqual(errors,[])});
await test('SD-WAN Fortinet y recomendación Cato',async()=>{await page.evaluate(()=>localStorage.setItem('mc-cyberverse-v08',JSON.stringify({schema:'mc-cyberverse-0.9',needs:['sdwan_only'],connectivityVendor:'Fortinet',branches:4})));await page.locator('#load').click();assert.equal((await snap()).nodes.e1.name,'FortiGate');await page.locator('#connectivity select').selectOption('Cato Networks');assert.match(await page.locator('#connectivity').textContent(),/explorar SASE/)});
fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify({passed:results.length,tests:results,errors},null,2));await browser.close();console.log(results.length+' tests passed');
})().catch(e=>{console.error(e);process.exit(1)});

