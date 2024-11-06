#from prompt_builders.DiscursivePromptBuilder import DiscursivePromptBuilder # <- Necessário para instanciar classes dinamicamente

from abc import ABC, abstractmethod

from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class PromptBuilder(ABC):
    maxScore = 100
    
    def __init__(self, type):
        self.type: str = type
    
    @abstractmethod
    def _buildPrompt(self, sb: StringBuilder, config: UploadConfig):
        pass
    
    def processPrompt(self, prova: str, config: UploadConfig) -> str:
        sb = StringBuilder()
        sb.ln('O texto entre "<<<INICIO>>>" e "<<<FIM>>>" é uma avaliação educacional no estilo "' + self.type.lower() + '".')
        sb.ln('Sua resposta deve ser um arquivo JSON, seguindo as seguintes regras:')
        
        self._buildPrompt(sb, config)
        
        sb.ln('Não inclua no JSON os trechos da prova que não se adequarem nos itens mencionados acima.')
        sb.ln('Sua resposta deve ser apenas o JSON plano. Não utilize quebras de linha ou "Fenced Code Blocks".')
        sb.ln()
        sb.ln(config.prompt, condition=(config.prompt)) # Prompt adicional do usuário
        sb.ln()
        sb.ln('Prova educacional:')
        sb.ln('<<<INICIO>>>')
        sb.ln(prova)
        sb.ln('<<<FIM>>>')
        
        return sb.toString()
