from prompt_builders.PromptBuilder import PromptBuilder
from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class DiscursivePromptBuilder(PromptBuilder):
    def __init__(self):
        super().__init__('Prova Dissertativa')
        
    def _buildPrompt(self, sb: StringBuilder, config: UploadConfig):
        sb.ln('- Identifique o nome de quem realizou a avaliação e guarde isto no campo "nome_aluno". Caso identifique mais de uma pessoa, seus nomes devem ficar em um array. Caso não identifique nome algum, guarde `null`;',
            condition=config.name)
        sb.ln('- Identifique a área de conhecimento da avaliação e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;',
            config.area)
        sb.ln('- Deve existir um campo "questoes", que será um array. Cada item deste array será um objeto correspondente a uma questão da prova educacional;')
        sb.ln('- Identifique na prova educacional o enunciado e a resposta de cada questão da prova. Estes devem estar contidos nos campos "enunciado" e "resposta", respectivamente. Cada uma das questões deve estar contida no array "questoes". Não faça nenhuma alteração no enunciado ou na resposta. Insira-os no JSON da forma como estão na prova educacional;')
        sb.ln(f'- Além dos campos citados no item acima, deve existir o campo "pontuacao", sendo ele um número decimal de 0 a {PromptBuilder.maxScore}. Defina o valor deste campo de acordo com o quão certa a resposta da questão está;')
        sb.ln('- Caso a questão possua subquestões, substitua o campo "resposta" por "questoes", que será, novamente, um array contendo cada uma das subquestões desta questão. Além disso, cada subquestão deve possuir o mesmo formato de uma questão;')
        sb.ln('- Caso a questão possua subquestões, o valor de seu campo "pontuacao" deve ser a média aritmétoca simples entre as pontuações de suas subquestões;')
        sb.ln('- Por fim, o JSON deve conter o campo "pontuacao", que deve ser a média aritmétoca simples entre as pontuações das questões.')