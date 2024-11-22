from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import traceback

import file_processor as fp
import ai_service as ai
from models.UploadConfig import UploadConfig
from exceptions import InvalidFileExtensionError, InvalidTestTypeError
from prompt_builders.PromptBuilder import PromptBuilder

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


def buildErrorResponse(e: Exception):
    traceback.print_exc()
    return {
        'status': 'error',
        'error': str(e)
    }


@app.get('/')
async def index():
    return { "message": "API is running..." }


# Body type: Multipart / Form Data
@app.post('/upload')
async def upload_file(
    files: List[UploadFile] = File(...),
    testType: str = Form(default=''),
    name: bool = Form(default=True),
    area: bool = Form(default=True),
    prompt: str = Form(default=''),
    theme: str = Form(default=''),
):
    config = UploadConfig(name=name, area=area, prompt=prompt.strip(), testType=testType, theme=theme)
    results = []
    for file in files:
        try:
            # Extrai texto do arquivo
            test_text: str = await fp.process_file(file)
            # Envia texto para IA
            json_ai_response = ai.processTest(test_text, config)
            # Converte a resposta da IA de string para JSON
            results.append(json_ai_response)
        except InvalidTestTypeError as e:
            print("Try to:\n" +
                 "\t1.  Import the PromptBuilder child class at ai_service.py\n" +
                f"\t\tExample: `from prompt_builders import {testType}PromptBuilder`\n" +
                f"\t2.  Create the {testType}PromptBuilder class")
            return buildErrorResponse(e)
        except Exception as e:
            return buildErrorResponse(e)
        finally:
            if file.file is not None:
                file.file.close()
    print(results)
    return {
        'status': 'ok',
        'results': results,
    }


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
        except Exception as e:
            traceback.print_exc()
            return str(e)
        finally:
            if file.file is not None:
                file.file.close()
    return results


"""
@app.get('/templates')
async def get_templates():
    templates = [
        'objective',
        'essay'
    ]
    return templates
"""


@app.get('/teste')
async def teste():
    ai.teste()