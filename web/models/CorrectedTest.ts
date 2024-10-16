export type TestQuestion = {
  enunciado: string;
  resposta?: string;
  questoes?: TestQuestion[];
  pontuacao: number;
};

export type CorrectedTest = {
  id: string;
  area_conhecimento: string | string[];
  nome_aluno: string | string[];
  questoes: TestQuestion[];
  pontuacao: number;
};
