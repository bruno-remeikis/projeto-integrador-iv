from prompt_builders.PromptBuilder import PromptBuilder
from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class EssayPromptBuilder(PromptBuilder):
    def __init__(self):
        super().__init__('Redação') # Dissertativa-Argumentativa
        
    def _getScoringCriteria(self):
        #return "Defina o valor deste campo de acordo com o quão corretas estão as informações da redação e as regras gramáticais"
        return "Defina o valor deste campo de acordo com o criério de avaliação utilizado na redação do ENEM"
    
    def _buildPrompt(self, sb: StringBuilder, config: UploadConfig):
        sb.ln(f'- O tema da redação é "{config.theme}"',
            config.theme)
        sb.ln(f'- Deve ter o campo "theme". Tente identificar o tema da redação e o armazene no campo "theme". Caso ele não esteja explícito no texto, armazene `null`;',
            not config.theme)
        
        sb.ln('- Deve ter o campo "essay" armazenando redação redigida pelo autor;')
        
        sb.ln('- Deve ter o campo "correction" armazenando uma lista de objetos. Cada item da lista corresponderá a uma justificativa. Cada justificativa informará o motivo pelo qual você decrementará o valor da pontuação;')
        
        sb.ln('- Cada justificativa deve ter o campo "excerpt". Faça um recorte do trecho da redação que está incorreto e armazene nesse campo um json com os campos "start" e "end", armazenando os índices inicial e final, respectivamente, dos caracteres onde o trecho incorreto se encontra em "essay";')
        
        sb.ln('- Cada justificativa deve ter o campo "type" armazenando o tipo de erro. Os possíveis valores são: ')
        sb.il('"grammatical" (falha no domínio da escrita formal da língua nativa), ')
        sb.il('"theme" (falha ao compreender o tema e não fugir do que é proposto (caso haja tema bem definido)), ')
        sb.il('"point-of-view" (Falha ao selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista), ')
        sb.il('"argumentation" (falha no conhecimento dos mecanismos linguísticos necessários para a construção da argumentação) ou ')
        sb.il('"human-rights" (falha em respeitar aos direitos humanos);')
        
        sb.ln('- Cada justificativa deve ter o campo "reason" contendo uma descrição do por que você considerou o trecho como um erro;')
        
        sb.ln('- Cada justificativa deve ter o campo "decrement" contendo o valor que foi decrementado da pontuação principal por este erro;')