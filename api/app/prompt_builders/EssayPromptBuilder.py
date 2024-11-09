from prompt_builders.PromptBuilder import PromptBuilder
from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class EssayPromptBuilder(PromptBuilder):
    def __init__(self):
        super().__init__('Redação') # Dissertativa-Argumentativa
        
    def _getScoringCriteria(self):
        return "Defina o valor deste campo de acordo com o quão corretas estão as informações da redação e as regras gramáticais"
    
    def _buildPrompt(self, sb: StringBuilder, config: UploadConfig):
        #sb.ln('- Identifique a área de conhecimento da avaliação e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;',
        #    config.area)
        sb.ln(f'- O tema da redação é "{config.theme}"',
            config.theme)
        sb.ln(f'- Deve ter o campo "theme". Tente identificar o tema da redação e o armazene no campo "theme". Caso ele não esteja explícito no texto, armazene `null`;',
            not config.theme)
        sb.ln('- Deve ter o campo "essay" armazenando redação redigida pelo autor;')
        sb.ln('- Deve ter o campo "correction" armazenando uma lista de objetos. Cada item da lista corresponderá a uma justificativa. Cada justificativa informará o motivo pelo qual você decrementará o valor da pontuação;')
        sb.ln('- Cada justificativa deve ter o campo "excerpt" armazenando o trecho exato da redação que está incorredo;')
        sb.ln('- Cada justificativa deve ter o campo "type" armazenando o tipo de erro. Os possíveis valores são: "grammatical" (erros gramaticais), "reference" (referência da informação / informação incorreta), "other" (outro motivo);')
        sb.ln('- Cada justificativa deve ter o campo "reason" contendo uma descrição do por que você considerou o trecho como um erro;')
        sb.ln('- Cada justificativa deve ter o campo "decrement" contendo o valor que foi decrementado da pontuação principal por este erro;')