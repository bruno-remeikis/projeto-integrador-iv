from openai import OpenAI

from ai_managers.ai_manager import AiManager


client = OpenAI()
OPENAI_MODEL = "babbage-002" #"gpt-4o-mini"


class OpenAiManager(AiManager):
    def ask(self, question: str) -> str:
        completion = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                #{"role": "system", "content": "You are a helpful assistant."}, # <-- AGENTE?
                {
                    "role": "user",
                    "content": question
                }
            ]
        )
        response = completion.choices[0].message
        return response