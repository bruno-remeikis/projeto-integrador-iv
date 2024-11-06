from fastapi import UploadFile
from unstructured.partition.auto import partition
import pytesseract

from PIL import Image
import os

from exceptions import InvalidFileExtensionError


TEMP_DIR = 'tempfiles'


def get_filename_extension(file_name: str) -> str:
    return file_name.split('.')[-1]#.lower()


async def extract_text_from_doc(file_path: str) -> str: # file_path: str
    elements = partition(filename=file_path) #, languages=["portuguese", "english"], strategy="hi_res"

    text = ''
    for element in elements:
        text += element.text.strip() + '\n'

    return text


def extract_text_from_image(file_path: str) -> str:
    image = Image.open(file_path)
    #pytesseract.pytesseract.tesseract_cmd = r'<full_path_to_your_tesseract_executable>'
    text = pytesseract.image_to_string(image)
    return text


async def save_file(file_path: str, file: UploadFile):
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
        

def remove_file(file_path: str):
    os.remove(file_path)


async def process_file(file: UploadFile) -> str:
    file_name = file.filename
    file_extension = get_filename_extension(file_name)
    temp_file_path = f"{TEMP_DIR}/{file_name}"
    
    await save_file(temp_file_path, file)
    
    text = ''
    try:
        if file_extension in ('pdf', 'docx', 'txt'):
            text = await extract_text_from_doc(temp_file_path)
        elif file_extension in ('jpg', 'png', 'jpeg'): # 'gif', 'bmp'
            text = extract_text_from_image(file)
        else:
            raise InvalidFileExtensionError(file_name, file_extension)
    finally:
        remove_file(temp_file_path)
    
    return text