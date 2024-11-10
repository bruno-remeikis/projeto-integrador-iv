export type TestQuestion = {
  enunciado: string;
  resposta?: string;
  questoes?: TestQuestion[];
  pontuacao: number;
};

export type Excerpt = {
  start: number;
  end: number;
}

export type EssayCorrection = {
  excerpt: Excerpt;
  type: 'grammatical' | 'reference' | 'other';
  reason: string;
  decrement: number;
}

export type CorrectedTest = {
  // Controle
  id: number;

  // Geral
  area_conhecimento?: string | string[];
  nome_aluno?: string | string[] | null;
  pontuacao: number;
 
  // Discursiva
  questoes?: TestQuestion[];

  // Redação
  theme?: string;
  essay?: string;
  correction?: EssayCorrection[];
};