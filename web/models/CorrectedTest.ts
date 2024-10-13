export type Question = {
    enunciado: string;
    resposta?: string;
    questoes?: Question[];
    pontuacao: number;
}

export type CorrectedTest = {
    area_conhecimento: string | string[];
    nome_aluno: string | string[];
    questoes: Question[];
    pontuacao: number;
}