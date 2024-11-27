import { CorrectedTest } from "@/models/CorrectedTest";

const essay = "Norberto Bobbio, cientista político italiano, afirma que a democracia é um processo que tem, em seu cerne, o objetivo de garantia a representatividade política de todas as pessoas. Para que o mecanismo democrático funcione, então, é fundamental apresentar uma rede estatal que dê acesso a diversos recursos, como alimentação, moradia, educação, segurança, saúde e participação eleitoral. Contudo, muitos brasileiros, por não terem uma certidão de nascimento, são privados desses direitos básicos e têm seus próprios papéis de cidadãos invisibilizados. Logo, deve-se discutir as raízes históricas desse problema e as suas consequências nocivas.\n\n Primeiramente, vê-se que o apagamento social gerado pela falta de registro civil apresenta suas origens no passado. Para o sociólogo Karl Marx, as desigualdades são geradas por condições econômicas anteriores ao nascimento de cada ser, de forma que, infelizmente, nem todos recebam as mesmas oportunidades financeiras e sociais ao longo da vida. Sob esse viés, o materialismo histórico de Marx é válido para analisar o drama dos que vivem sem certificado de nascimento no Brasil, pois é provável que eles pertençam a linhagens familiares que também não tiveram acesso ao registro. Assim, a desigualdade social continua sendo perpetuada, afetando grupos que já foram profundamente atingidos pelas raízes coloniais e patriarcais da nação. Dessa forma, é essencial que o governo quebre esse ciclo que exclui, sobretudo, pobres, mulheres, indígenas e pretos.\n\n Além disso, nota-se que esse processo injusto cria chagas profundas na democracia nacional. No livro “Vidas Secas”, de Graciliano Ramos, é apresentada a história de uma família sertaneja que luta para sobreviver sem apoio estatal. Nesse contexto, os personagens Fabiano e Sinhá Vitória têm dois filhos que não possuem certidão de nascimento. Por conta dessa situação de registro irregular, os dois meninos sequer apresentam nomes, o que é impensável na sociedade contemporânea, uma vez que o nome de um indivíduo faz parte da construção integral da sua identidade. Ademais, as crianças retratadas na obra são semelhantes a muitas outras do Brasil que não usufruem de políticas públicas da infância e da adolescência devido à falta de documentos, o que precisa ser modificado urgentemente para que se estabeleça uma democracia realmente participativa tal qual aquela prevista por Bobbio.\n\n Portanto, o registro civil deve ser incentivado de maneira mais efetiva no país. O Estado criará um mutirão nacional intitulado “Meu Registro, Minha Identidade”. Esse projeto funcionará por meio da união entre movimentos sociais, comunidades locais e órgãos governamentais municipais, estaduais e federais, visto que é necessária uma ação coletiva visando a consolidação da cidadania brasileira. Com o trabalho desses agentes, serão enviados profissionais a todas as cidades em busca de pessoas que, finalmente, terão suas certidões de nascimento confeccionadas, além de receberem acompanhamento e incentivo para a realização de cadastro em outros serviços importantes do sistema nacional. Por conseguinte, o Brasil estará agindo ativamente para reparar suas injustiças históricas e para solidificar sua democracia, de maneira que os seus cidadãos sejam vistos igualmente.";

export const essayMock: CorrectedTest = {
    id: 0,
    pontuacao: 100,
    essay,
    theme: 'Teste de Sistema',
    nome_aluno: 'Fulano da Silva',
    correction: [
        {
            excerpt: { start: 0, end: 15 },
            type: 'grammatical',
            reason: 'Tá errado e pronto!',
            decrement: 1
        }, {
            excerpt: { start: 181, end: 387 },
            type: 'reference',
            reason: 'Tá errado e pronto!',
            decrement: 1
        }, {
            excerpt: { start: 600, end: 700 },
            type: 'other',
            reason: 'Tá errado e pronto!',
            decrement: 1
        },
    ]
}