from prompt_builders.PromptBuilder import PromptBuilder
from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class EssayPromptBuilder(PromptBuilder):
    def __init__(self):
        super().__init__('Redação') # Dissertativa-Argumentativa
        
    def _buildPrompt(self, sb: StringBuilder, config: UploadConfig):
        sb.ln('- Identifique o nome de quem realizou a avaliação e guarde isto no campo "nome_aluno". Caso identifique mais de uma pessoa, seus nomes devem ficar em um array. Caso não identifique nome algum, guarde `null`;',
            condition=config.name)
        #sb.ln('- Identifique a área de conhecimento da avaliação e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;',
        #    config.area)
        sb.ln(f'- O tema da redação é "{config.theme}"',
            config.theme)
        sb.ln(f'- Tente identificar o tema da redação e o armazene no campo "theme". Caso ele não esteja explícito no texto, armazene `null`;',
            not config.theme)
        sb.ln('- Guarde a redação no campo "redacao" do JSON')
        sb.ln(f'- Crie o campo "pontuacao", sendo ele um número decimal de 0 a {PromptBuilder.maxScore}. Defina o valor deste campo de acordo com o quão corretas estão as informações da redação e as regras gramáticais;')