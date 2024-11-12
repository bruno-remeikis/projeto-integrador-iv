from prompt_builders.PromptBuilder import PromptBuilder
from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class WorkPromptBuilder(PromptBuilder):
    def __init__(self):
        super().__init__('Trabalho')
        
    def _getScoringCriteria(self):
        return "" #"Defina o valor deste campo de acordo com o criério de avaliação utilizado na redação do ENEM"
    
    def _buildPrompt(self, sb: StringBuilder, config: UploadConfig):
        sb.ln('- Deve ter o campo "title", contendo o titulo do trabalho;')
        sb.ln('- Identifique a área de conhecimento da avaliação e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;',
            config.area)
        sb.ln('- Deve ter o campo "parts", contendo uma lista de partes do trabalho. Quebre o trabalho em partes. Se houver apenas uma parte, grande apenas ela;')
        sb.ln('- Cada parte deve ter o campo "title", contendo o titulo da parte;')
        sb.ln('- Cada parte deve ter o campo "content", contendo o conteúdo da parte;')