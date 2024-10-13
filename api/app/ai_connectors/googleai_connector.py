import google.generativeai as genai
import os
from ai_connectors.ai_connector import AiConnector


genai.configure(api_key=os.environ["GOOGLEAI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")


class GoogleAiCoonnector(AiConnector):
    def ask(self, prompt: str) -> str:
        response = model.generate_content(prompt)
        return response.text