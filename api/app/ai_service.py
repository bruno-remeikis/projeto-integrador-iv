from ai_connectors.ai_connector import AiConnector
from ai_connectors.googleai_connector import GoogleAiCoonnector

from models.UploadConfig import UploadConfig
from prompt_builders.PromptBuilder import PromptBuilder


ai_connector: AiConnector = GoogleAiCoonnector()

maxScore = 100


def processTest(prova: str, config: UploadConfig) -> str:
    promptBuilder: PromptBuilder = PromptBuilder.getPromptBuilder(config.testType)
    prompt = promptBuilder.processPrompt(prova, config)
    
    ai_response = ai_connector.ask(prompt)
    return ai_response
