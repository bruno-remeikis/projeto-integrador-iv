"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CorrectedTest, TestQuestion } from "@/models/CorrectedTest"; 
import TextareaAutosize from 'react-textarea-autosize';
import { PageTitle } from "@/components/PageTitle";
import { formatGrade, joinOrEmpty } from "@/utils/StringUtils";
import { IoIosArrowForward } from "react-icons/io";
import { useConfig } from "@/contexts/ConfigContext";

export default function DetailsPage() {
  
  const router = useRouter();
  const { config } = useConfig();
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
					<div className="md:flex gap-3">

						{config?.name &&
						<div className="form-group flex-1">
							<label>Aluno{Array.isArray(test?.nome_aluno) ? 's' : ''}</label>
							<input type="text" readOnly value={ joinOrEmpty(test?.nome_aluno) } />
						</div>}

						{config?.area && 
						<div className="form-group flex-1">
							<label>Área{Array.isArray(test?.area_conhecimento) ? 's' : ''} de Conhecimento</label>
							<input type="text" readOnly value={ joinOrEmpty(test?.area_conhecimento) + ', História, Geografia' } />
						</div>}

						<div className="form-group w-20">
							<label>Pontuação</label>
							<input type="text" readOnly value={ test !== undefined ? formatGrade(test?.pontuacao) : 'Erro' } />
						</div>

					</div>

					<div className="grid md:grid-cols-2 gap-3 md:gap-6">
						{test?.questoes?.map((q, i) =>
							<Question key={i} question={q} />
						)}
					</div>
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

	const [collapsed, setCollapsed] = useState<boolean>(true);

	function getScoreColor() {
		if(pontuacao === 1)
			return 'bg-green-400';
		if(pontuacao === 0)
			return 'bg-red-400';
		return 'bg-yellow-400';
	}

	return (
		<div>
			<div className={`${getScoreColor()} ${level === 0 ? 'shadow-md' : 'mb-2 border-white border-2'} p-2 md:p-3 border rounded-sm`}>
				<div className="form-group !pb-0 md:gap-2">
					<TextareaAutosize readOnly value={enunciado} className="bg-white bg-opacity-90" />
					{resposta &&
						<TextareaAutosize readOnly value={resposta} className="bg-white bg-opacity-90" />
					}
					{questoes &&
						<div>
							<button
								type="button"
								onClick={() => setCollapsed(prev => !prev)}
								className="flex items-center gap-1 text-white hover:opacity-75 transition-all"
								title={collapsed ? 'Expandir' : 'Colapsar'}
							>
								<IoIosArrowForward className={`${collapsed ? '' : 'rotate-90'} transition-all`} />
								<span className="mb-[2px]">{ collapsed ? 'ver questões' : 'esconder questões' }</span>
							</button>
							<div className={`${collapsed ? 'hidden' : ''}`}>
								{questoes.map((q, i) =>
									<Question key={i} question={q} level={level + 1} />
								)}
							</div>
						</div>
					}
					<div className="flex justify-end">
						<div className="flex items-center gap-2">
							<label className="text-white">{questoes ? 'Total' : 'Pontuação'}:</label>
							<input type="text" readOnly value={formatGrade(pontuacao)} className="w-16 bg-white bg-opacity-90" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}