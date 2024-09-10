from unstructured.partition.auto import partition
import pytesseract
from PIL import Image

from ai_managers.ai_manager import AiManager
from ai_managers.mdberta_manager import MdbertaManager


def get_file_extension(file_name: str):
    return file_name.split('.')[-1]#.lower()



def extract_text_from_doc(file_path: str) -> str:
    # Carrega o documento e extrai partes
    elements = partition(filename=file_path, languages=["portuguese", "english"], strategy="hi_res")

    # text_parts = []
    text = ''
    for element in elements:
        # text_parts.append(element.text)
        text += element.text.strip() + '\n'

    # print(text_parts)
    return text


def extract_text_from_image(file_path: str) -> str:
    image = Image.open(file_path)
    #pytesseract.pytesseract.tesseract_cmd = r'<full_path_to_your_tesseract_executable>'
    text = pytesseract.image_to_string(image)
    return text


if __name__ == '__main__':
    #file_name = 'redacao-o_narcisismo_e_a_cultura_das_selfies-karina_rossi.pdf'
    #file_name = 'redacao-nota-mil-enem-2023-rafaela-muller.jpg'
    #file_name = 'LSI - Atividade 1.pdf'
    file_name = 'Questionário de História.docx'
    path = 'resources/' + file_name
    extension = get_file_extension(file_name)
    
    text = ''
    if(extension in ('jpg', 'png')):
        text = extract_text_from_image(path)
    else:
        text = extract_text_from_doc(path)
    
    print('\n\n-- Texto extraído --')    
    print(text)
    
    aiManager: AiManager = MdbertaManager()
    ai_response = aiManager.ask("Quem é você?")
    print('\n\n-- Resposta da IA --')
    print(ai_response)