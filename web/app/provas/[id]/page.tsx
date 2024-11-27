"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CorrectedTest } from "@/models/CorrectedTest"; 
import { PageTitle } from "@/components/PageTitle";
import { formatGrade, joinOrEmpty } from "@/utils/StringUtils";
import { Tooltip } from "@/components/simple/Tooltip";
import { essayMock } from "@/mocks/CorrectedTestMocks";
import { Question } from "@/components/Question";
import { CorrectionTooltipDescription } from "@/components/CorrectionTooltipDescription";
import { correctionTypes } from "@/utils/CorrectionTypeUtils";
import { CorrectionOutput } from "@/components/CorrectionOutput";

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

  // Para testes
	if (id === 'teste') {
		setTest(essayMock);
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

  }, [router, id]);

  return (
		<div>
			<PageTitle goBackTo="/provas">Detalhes da Avaliação</PageTitle>
			<main>
				<div className="section">
					<div className="md:flex gap-3">

						{test?.nome_aluno !== undefined &&
						<div className="form-group flex-1">
							<label>Aluno{Array.isArray(test.nome_aluno) ? 's' : ''}</label>
							<input type="text" readOnly value={ joinOrEmpty(test?.nome_aluno) } />
						</div>}

						{test?.area_conhecimento !== undefined && 
						<div className="form-group flex-1">
							<label>Área{Array.isArray(test.area_conhecimento) ? 's' : ''} de Conhecimento</label>
							<input type="text" readOnly value={ joinOrEmpty(test?.area_conhecimento) + ', História, Geografia' } />
						</div>}

						{test?.theme !== undefined && 
						<div className="form-group flex-1">
							<label>Tema</label>
							<input type="text" readOnly value={test.theme} />
						</div>}

						<div className="form-group w-20">
							<label>Pontuação</label>
							<input type="text" readOnly value={ test !== undefined ? formatGrade(test?.pontuacao) : 'Erro' } />
						</div>

					</div>

					{test?.questoes !== undefined &&
					<div className="grid md:grid-cols-2 gap-3 md:gap-6">
						{test.questoes.map((q, i) =>
							<Question key={i} question={q} />
						)}
					</div>}

					{test?.essay !== undefined && test?.correction &&
					<CorrectionOutput text={test.essay} correction={test.correction} />}
				</div>
			</main>
		</div>
	);
}