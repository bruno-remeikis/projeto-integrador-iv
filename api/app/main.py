from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json
import os

import file_processor as fp
import ai_service as ai
from exceptions import InvalidFileExtensionError

# Inicia API
app = FastAPI()

# Adiciona middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria diretório para os arquivos a serem armazenados temporariamente
os.makedirs(fp.TEMP_DIR, exist_ok=True)


@app.get('/')
async def index():
    return { "message": "Hello, World!!!!!" }


# Body type: Multipart / Form Data
@app.post('/upload')
async def upload_file(
    files: List[UploadFile] = File(...),
    name: bool = Form(default=True),
    area: bool = Form(default=True),
    prompt: str = Form(default='')
):
    config = ai.UploadConfig(name=name, area=area, prompt=prompt.strip())
    print('config 1:')
    print(config)
    print('chegou:')
    print(name)
    results = []
    for file in files:
        try:
            # Extrai texto do arquivo
            test_text: str = await fp.process_file(file)
            # Envia texto para IA
            test_result: str = ai.processTest(test_text, config)
            # Converte a resposta da IA de string para JSON
            json_test_result = json.loads(test_result)
            results.append(json_test_result)
        except InvalidFileExtensionError as e:
            results.append({
                "error": e.message,
                "file": e.filename
            })
        finally:
            if file.file is not None:
                file.file.close()
    return results


# Apenas extrai os textos dos arquivos e os retorna
@app.post('/dev/extract')
async def upload_file(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        try:
            # Extrai texto do arquivo
            test_text: str = await fp.process_file(file)
            # Converte a resposta da IA de string para JSON
            results.append(test_text)
        except InvalidFileExtensionError as e:
            results.append({
                "error": e.message,
                "file": e.filename
            })
        finally:
            if file.file is not None:
                file.file.close()
    return results



@app.get('/templates')
async def get_templates():
    templates = [
        'objective',
        'essay'
    ]
    return templates