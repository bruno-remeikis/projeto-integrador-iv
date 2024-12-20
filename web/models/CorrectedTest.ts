export type CorrectionType = 'grammatical' | 'theme' | 'defense' | 'argumentation' | 'intervention' | 'other';

export type Correction = {
  excerpt: string;
  excerptLocale?: ExcerptLocale;
  type: CorrectionType; //
  reason: string;
  decrement: number;
}

export type TestQuestion = {
  enunciado: string;
  resposta?: string;
  questoes?: TestQuestion[];
  pontuacao: number;
  correction: Correction[];
};

export type ExcerptLocale = {
  start: number;
  end: number;
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
  correction?: Correction[];
};