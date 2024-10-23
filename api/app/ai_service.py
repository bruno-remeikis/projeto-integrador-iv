from ai_connectors.ai_connector import AiConnector
from ai_connectors.googleai_connector import GoogleAiCoonnector
from pydantic import BaseModel

from utils.string_utils import StringBuilder


ai_connector: AiConnector = GoogleAiCoonnector()


class UploadConfig(BaseModel):
    name: bool = True
    area: bool = True
    prompt: str = ''


def processTest(prova: str, config: UploadConfig) -> str:
    print('config:')
    print(config)
    print(config.name)
    
    sb = StringBuilder()
    sb.ln('O texto entre "<<<INICIO>>>" e "<<<FIM>>>" é uma prova educacional.')
    sb.ln('Sua resposta deve ser um arquivo JSON, seguindo as seguintes regras:')
    sb.ln('- Identifique o nome de quem realizou a avaliação e guarde isto no campo "nome_aluno". Caso identifique mais de uma pessoa, seus nomes devem ficar em um array. Caso não identifique nome algum, guarde `null`;', condition=config.name)
    sb.ln('- Identifique a área de conhecimento da prova e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;', config.area)
    sb.ln('- Deve existir um campo "questoes", que será um array. Cada item deste array será um objeto correspondente a uma questão da prova educacional;')
    sb.ln('- Identifique na prova educacional o enunciado e a resposta de cada questão da prova. Estes devem estar contidos nos campos "enunciado" e "resposta", respectivamente. Cada uma das questões deve estar contida no array "questoes". Não faça nenhuma alteração no enunciado ou na resposta. Insira-os no JSON da forma como estão na prova educacional;')
    sb.ln('- Além dos campos citados no item acima, deve existir o campo "pontuacao", sendo ele um número decimal de 0 a 1. Defina o valor deste campo de acordo com o quão certa a resposta da questão está;')
    sb.ln('- Caso a questão possua subquestões, substitua o campo "resposta" por "questoes", que será, novamente, um array contendo cada uma das subquestões desta questão. Além disso, cada subquestão deve possuir o mesmo formato de uma questão;')
    sb.ln('- Caso a questão possua subquestões, o valor de seu campo "pontuacao" deve ser a média aritmétoca simples entre as pontuações de suas subquestões;')
    sb.ln('- Por fim, o JSON deve conter o campo "pontuacao", que deve ser a média aritmétoca simples entre as pontuações das questões.')
    sb.ln('Não inclua no JSON os trechos da prova que não se adequarem nos itens mencionados acima.')
    sb.ln('Sua resposta deve ser apenas o JSON plano. Não utilize quebras de linha ou "Fenced Code Blocks".', breaks=2)
    sb.ln(config.prompt, condition=(len(config.prompt) > 0), breaks=2)
    sb.ln('Prova educacional:')
    sb.ln('<<<INICIO>>>')
    sb.ln(prova)
    sb.ln('<<<FIM>>>')
    
    prompt = sb.toString()
    
    ai_response = ai_connector.ask(prompt)
    return ai_response