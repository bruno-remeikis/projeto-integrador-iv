from prompt_builders.PromptBuilder import PromptBuilder
from utils.string_utils import StringBuilder
from models.UploadConfig import UploadConfig


class DiscursivePromptBuilder(PromptBuilder):
    def __init__(self, config: UploadConfig):
        super().__init__(
            'Avaliação Dissertativa',
            scoringCriteria='Seu valor deve representar a média aritmética simples entre os campos "pontuacao" de todas as questões.',
            config=config,
        )
        
    def _buildPrompt(self, sb: StringBuilder):
        config = self.config
        
        sb.ln('- Identifique a área de conhecimento da avaliação e informe-a no campo "area_conhecimento" do JSON no formato de texto. Caso identifique mais de uma área de conhecimento, coloque os valores em array;',
            config.area)
        sb.ln('- Deve existir um campo "questoes", que será um array. Cada item deste array será um objeto correspondente a uma questão da prova educacional;')
        sb.ln('- Identifique na prova educacional o enunciado e a resposta de cada questão da prova. Estes devem estar contidos nos campos "enunciado" e "resposta", respectivamente. Cada uma das questões deve estar contida no array "questoes". Não faça nenhuma alteração no enunciado ou na resposta. Insira-os no JSON da forma como estão na prova educacional;')
        sb.ln(f'- Além dos campos citados no item acima, deve existir o campo "pontuacao", sendo ele um número decimal de 0 a {PromptBuilder.MAX_SCORE}. Defina o valor deste campo de acordo com o quão certa a resposta da questão está;')
        sb.ln('- Caso a questão possua subquestões, substitua o campo "resposta" por "questoes", que será, novamente, um array contendo cada uma das subquestões desta questão. Além disso, cada subquestão deve possuir o mesmo formato de uma questão;')
        sb.ln('- Caso a questão possua subquestões, o valor de seu campo "pontuacao" deve ser a média aritmétoca simples entre as pontuações de suas subquestões;')
        
        sb.ln('- Cada questão deve ter o campo "correction" armazenando uma lista de objetos. Cada item da lista corresponderá a uma justificativa. Cada justificativa guardará um ponto de melhoria em um trecho da questão;')
        sb.ln('- Cada justificativa deve ter o campo "excerpt", armazenando o trecho exato da questão que está incorreto ou pode ser melhorado;')
        # sb.il('- Cada justificativa deve ter o campo "type" armazenando o tipo de erro de acordo com as competências usadas na redação do ENEM. Os possíveis valores são: ')
        # sb.il('"grammatical" (domínio da escrita formal da língua nativa pode melhorar), ')
        # sb.il('"theme" (compreenção do tema e não fugir do que é proposto (caso haja tema bem definido) podem melhorar), ')
        # sb.il('"defense" (organização e/ou defesa pode(m) melhorar), ')
        # sb.il('"argumentation" (conhecimento dos mecanismos linguísticos necessários para a construção da argumentação podem melhorar) ou ')
        # sb.ln('"intervention" (proposta de intervenção pode melhorar);')
        # TODO: Resolver programaticamente ou adicionar tipos
        sb.ln('- Cada justificativa deve ter o campo "type" armazenando "other"')
        sb.ln('- Cada justificativa deve ter o campo "reason" contendo uma descrição de como o trecho pode melhorar;')
        sb.ln('- Cada justificativa deve ter o campo "decrement" contendo o valor que foi decrementado em "pontuacao";')
        