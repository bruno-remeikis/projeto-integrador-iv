export type TestQuestion = {
  enunciado: string;
  resposta?: string;
  questoes?: TestQuestion[];
  pontuacao: number;
};

export type CorrectedTest = {
  id: number;
  area_conhecimento: string | string[];
  nome_aluno: string | string[] | null;
  questoes: TestQuestion[];
  pontuacao: number;
};
