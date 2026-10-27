"""MC Cyberverse V0.10.2: servicio web de demo didáctica sin datos reales."""
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE = Path(__file__).resolve().parent.parent / 'web'
root_path = os.getenv('ROOT_PATH', '')
app = FastAPI(title='MC Cyberverse', version='0.10.2', root_path=root_path, docs_url=None, redoc_url=None)

@app.get('/health')
def health():
    return {'status':'ok', 'service':'mc-cyberverse', 'version':'0.10.2'}

@app.get('/api/v1/info')
def info():
    return {'product':'MC Cyberverse', 'version':'0.10.2', 'mode':'demo', 'real_traffic':False}

@app.get('/')
def home():
    return FileResponse(BASE / 'index.html')

app.mount('/', StaticFiles(directory=BASE, html=True), name='static')
