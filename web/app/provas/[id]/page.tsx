"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CorrectedTest, TestQuestion } from "@/models/CorrectedTest"; 
import TextareaAutosize from 'react-textarea-autosize';
import { PageTitle } from "@/components/PageTitle";
import { joinOrEmpty } from "@/utils/StringUtils";

export default function DetailsPage() {
  
  const router = useRouter();
  const { id } = useParams(); // Obtém o id da URL
  
  const [test, setTest] = useState<CorrectedTest>();

  useEffect(() => {
    // Verifica se id está disponível antes de chamar fetchTestData
    if (!id || typeof id !== 'string') {
      console.warn('ID da avaliação não informado');
      return;
    }

    const storedTests = sessionStorage.getItem('tests');
    if (!storedTests) {
      router.push('/provas');
      return;
    }
      
    const tests = JSON.parse(storedTests);
    const test = tests.filter((t: CorrectedTest) => t.id === parseInt(id))[0];

    if(!test) {
      alert(`Não encontramos nenhuma avaliação com ID ${id}`);
      router.push('/provas');
      return;
    }

    setTest(test);

  }, [id]);

  return (
		<div>
			<PageTitle goBackTo="/provas">Detalhes da Avaliação</PageTitle>
			<main>
				<div className="section">
					<div className="form-group">
						<label>Aluno{Array.isArray(test?.nome_aluno) ? 's' : ''}</label>
						<input type="text" readOnly value={ joinOrEmpty(test?.nome_aluno) } />
					</div>

					<div className="form-group">
						<label>Área{Array.isArray(test?.area_conhecimento) ? 's' : ''} de Conhecimento</label>
						<input type="text" readOnly value={ joinOrEmpty(test?.area_conhecimento) } />
					</div>

          {test?.questoes?.map((q, i) =>
            <Question key={i} question={q} />
          )}
				</div>
			</main>
		</div>
	);
}

type QuestionProps = {
	question: TestQuestion,
	level?: number;
}

function Question({
	question: {
		enunciado,
		resposta,
		questoes,
		pontuacao
	},
	level = 0
}: QuestionProps) {

	function getScoreColor() {
		if(pontuacao === 1)
			return 'bg-green-400';
		if(pontuacao === 0)
			return 'bg-red-400';
		return 'bg-yellow-400';
	}

	return (
		<div className={`${getScoreColor()} ${level === 0 ? 'mb-3 md:mb-4 shadow-md' : 'border-white border-2'} p-2 md:p-3 border rounded-sm `}>
			<div className="form-group !pb-0 md:gap-2">
				<TextareaAutosize readOnly value={enunciado} />
				{resposta ?
					<TextareaAutosize readOnly value={resposta} />
					: null
				}
				{questoes
					? questoes.map((q, i) => <Question key={i} question={q} level={level + 1} />)
					: null
				}
				<div className="flex justify-end">
					<div className="flex items-center gap-2">
						<label className="text-white">{questoes ? 'Total' : 'Pontuação'}:</label>
						<input type="text" readOnly value={(pontuacao * 100) + '%'} className="w-16" />
					</div>
				</div>
			</div>
		</div>
	);
}