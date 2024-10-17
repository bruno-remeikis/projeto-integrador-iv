from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json
import os

import file_processor as fp
import ai_service
from exceptions.InvalidFileExtensionError import InvalidFileExtensionError

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


@app.post('/upload')
async def upload_file_2(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        try:
            # Extrai texto do arquivo
            test_text: str = await fp.process_file(file)
            # Envia texto para IA
            test_result: str = ai_service.processTest(test_text)
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
