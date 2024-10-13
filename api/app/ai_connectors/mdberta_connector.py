# https://huggingface.co/timpal0l/mdeberta-v3-base-squad2

from transformers import pipeline

from ai_connectors.ai_connector import AiConnector


qa_model = pipeline("question-answering", "timpal0l/mdeberta-v3-base-squad2")


class MdbertaConnector(AiConnector):
    def ask(self, prompt: str) -> str:
        #context = "My name is Tim and I live in Sweden." # <-- Agente?
        res = qa_model(question=prompt, context="Eu sou um corretor de provas") #, context=context
        return res['answer']