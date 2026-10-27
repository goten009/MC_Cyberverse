"""Pruebas ASGI sin servidor, sockets ni dependencias de test adicionales."""
import asyncio
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from app.main import app
async def request(url):
    messages=[]
    async def receive():
        await asyncio.Event().wait()
    async def send(message): messages.append(message)
    await app({'type':'http','asgi':{'version':'3.0','spec_version':'2.4'},'http_version':'1.1','method':'GET','scheme':'http','path':url,'raw_path':url.encode(),'query_string':b'','root_path':'','headers':[],'server':('test',80),'client':('test',1)},receive,send)
    assert messages[0]['status']==200, messages
    return b''.join(m.get('body',b'') for m in messages)
async def main():
    assert json.loads(await request('/health'))['version']=='0.10.2'
    assert json.loads(await request('/api/v1/info'))['real_traffic'] is False
    assert b'MC CYBERVERSE' in await request('/')
    assert b'AI_RULES' in await request('/app.js')
    print('PASS 4 rutas ASGI: health, info, inicio, JavaScript')
asyncio.run(main())

