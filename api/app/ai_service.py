from ai_connectors.ai_connector import AiConnector
from ai_connectors.mdberta_connector import MdbertaConnector
from ai_connectors.googleai_connector import GoogleAiCoonnector


ai_connector: AiConnector = GoogleAiCoonnector() #MdbertaConnector()

PROMPT_TEMPLATE = """O texto entre "<<<INICIO>>>" e "<<<FIM>>>" é uma prova educacional.
Sua resposta deve ser um arquivo JSON, seguindo as seguintes regras:
- Tente buscar se o nome de quem fez a prova, se não houver essa informação pode devolver "nome_aluno": "Aluno,
- Identifique a área de conhecimento da prova e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;
- Deve existir um campo "questoes", que será um array. Cada item deste array será um objeto correspondente a uma questão da prova educacional;
- Identifique na prova educacional o enunciado e a resposta de cada questão da prova. Estes devem estar contidos nos campos "enunciado" e "resposta", respectivamente. Cada uma das questões deve estar contida no array "questoes". Não faça nenhuma alteração no enunciado ou na resposta. Insira-os no JSON da forma como estão na prova educacional;
- Além dos campos citados no item acima, deve existir o campo "pontuacao", sendo ele um número decimal de 0 a 1. Defina o valor deste campo de acordo com o quão certa a resposta da questão está;
- Caso a questão possua subquestões, substitua o campo "resposta" por "questoes", que será, novamente, um array contendo cada uma das subquestões desta questão. Além disso, cada subquestão deve possuir o mesmo formato de uma questão.
Não inclua no JSON os trechos da prova que não se adequarem nos itens mencionados acima.
Sua resposta deve ser apenas o JSON plano. Não utilize quebras de linha ou "Fenced Code Blocks".

Prova educacional:
<<<INICIO>>>
{prova}
<<<FIM>>>"""


def processTest(prova: str) -> str:
    prompt = PROMPT_TEMPLATE.format(prova=prova)
    ai_response = ai_connector.ask(prompt)
    return ai_response