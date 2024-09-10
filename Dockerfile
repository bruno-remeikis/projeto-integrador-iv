FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libmagic1 \
    poppler-utils \
    libreoffice \
    pandoc \
    && apt-get clean

WORKDIR /app

COPY requirements.txt .

#RUN python -m pip install --upgrade pip
RUN pip install --upgrade pip
#RUN pip install -r requirements.txt
#RUN pip install "unstructured[all-docs]"
RUN pip install unstructured[pdf]

COPY . .

CMD ["python", "main.py"]