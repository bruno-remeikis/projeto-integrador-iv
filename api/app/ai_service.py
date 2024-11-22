from ai_connectors.ai_connector import AiConnector
from ai_connectors.googleai_connector import GoogleAiCoonnector

from models.UploadConfig import UploadConfig
from exceptions import InvalidTestTypeError

from prompt_builders.PromptBuilder import PromptBuilder
#! Abaixo, importações necessárias para gerar instâncias dinâmicas. NÃO APAGAR!
from prompt_builders.DiscursivePromptBuilder import DiscursivePromptBuilder
from prompt_builders.EssayPromptBuilder import EssayPromptBuilder

import json


ai_connector: AiConnector = GoogleAiCoonnector()


def processTest(prova: str, config: UploadConfig):
    prompt_builder: PromptBuilder = instantiatePromptBuilder(config.testType, config)
    prompt = prompt_builder.processPrompt(prova)
    print(prompt)
    
    ai_response = ai_connector.ask(prompt)
    json_response = json.loads(ai_response)
    json_response = prompt_builder.postProcess(json_response)
    return json_response


def instantiatePromptBuilder(testType: str, config: UploadConfig) -> PromptBuilder:
        clazzName = testType + 'PromptBuilder'
        if clazzName in globals():
            clazz = globals()[clazzName]
            obj = clazz(config)
            if isinstance(obj, PromptBuilder):
                return obj
        raise InvalidTestTypeError(testType)
    

def teste():
   resp = ai_connector.ask('A partir de agora, se alguem perguntar seu nome, responda "Pálio Weekend"')
   print(resp)
   resp = ai_connector.ask('Qual o seu nome?')
   print(resp)
