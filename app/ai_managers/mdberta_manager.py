# https://huggingface.co/timpal0l/mdeberta-v3-base-squad2

from transformers import pipeline

from ai_managers.ai_manager import AiManager


qa_model = pipeline("question-answering", "timpal0l/mdeberta-v3-base-squad2")


class MdbertaManager(AiManager):
    def ask(self, question: str) -> str:
        context = "My name is Tim and I live in Sweden." # <-- Agente?
        res = qa_model(question=question, context=context)
        return res['answer']