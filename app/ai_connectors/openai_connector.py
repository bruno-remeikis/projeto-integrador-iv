from openai import OpenAI

from ai_connectors.ai_connector import AiConnector


client = OpenAI()
OPENAI_MODEL = "babbage-002" #"gpt-4o-mini"


class OpenAiConnnector(AiConnector):
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