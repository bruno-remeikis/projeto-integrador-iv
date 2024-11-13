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

  function renderEssay() {
    const text = test?.essay;

    if (!text) {
      return '';
    }

    if (!test?.correction) {
      return text;
    }

    // Processa a localização (índices) de cada trecho incorreto
    test.correction.forEach(c => {
      const start = text.indexOf(c.excerpt)
      c.excerptLocale = { start, end: start + c.excerpt.length };
    })

    // Guarda listas dos índices dos trechos incorretos
    const excerptStarts = test.correction?.flatMap(c => c.excerptLocale?.start);
    const excerptEnds = test.correction?.flatMap(c => c.excerptLocale?.end);

    const elements: React.ReactNode[] = [];
    let auxText = '';
    //let key = 0;

    function pushSimple(i: number) {
      elements.push(<span key={i}>{ auxText }</span>);
      auxText = '';
    }

    text.split('').forEach((char, i) => {

      if (char === '\n') {
        pushSimple(i);
        elements.push(<br key={`br-${i}`} />);
      }
      else if (excerptStarts.includes(i) && i !== 0) {
        pushSimple(i);
      }
      else if (excerptEnds.includes(i)) {
        const correction = test?.correction?.filter(c => c.excerptLocale?.end === i)[0]; //! REAVALIAR [0]
        if (!correction) {
          pushSimple(i);
        }
        else {
          const typeProps = correctionTypes[correction.type];
          elements.push(
            <Tooltip key={i} content={<CorrectionTooltipDescription correction={correction} />}>
              <span className={`rounded cursor-help`} style={typeProps.highlightStyle}>{ auxText }</span>
            </Tooltip>
          );
          auxText = '';
        }
      }
      else if (i === text.length - 1) {
        pushSimple(i);
      }

      auxText += char;
    });
	  return elements;
  }

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

					{test?.essay !== undefined &&
					<div
						//contentEditable
						className="border p-2 rounded text-justify"
					>
						{ renderEssay() }	
					</div>}
				</div>
			</main>
		</div>
	);
}