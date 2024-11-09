"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CorrectedTest, TestQuestion } from "@/models/CorrectedTest"; 
import TextareaAutosize from 'react-textarea-autosize';
import { PageTitle } from "@/components/PageTitle";
import { formatGrade, joinOrEmpty } from "@/utils/StringUtils";
import { IoIosArrowForward } from "react-icons/io";

/*const palavras = [
	'Norberto Bobbio',
	'apresenta suas origens no passado',
	'Por conta dessa situação de registro irregular, os dois meninos sequer apresentam nomes, o que é impensável na sociedade contemporânea, uma vez que o nome de um indivíduo faz parte da construção integral da sua identidade.'
]*/

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

  }, [router, id]);

  function renderEssay() {
    //! FUNCIONA, MAS NÃO QUEBRA LINHAS
    /*
    const regex = new RegExp(`(${palavras.join('|')})`, 'g');
      const parts = text.split(regex); // Divide o texto em partes, mantendo as palavras a serem destacadas

      return parts.map((part, index) => 
      palavras.includes(part) ? (
          <span key={index} style={{ color: 'red', fontWeight: 'bold' }}>
            {part}
          </span>
        ) : (
          part
        )
      );
    */

    const text = test?.essay;

    if (!text) {
      return '';
    }

    if (!test?.correction) {
      return text;
    }

    console.log(test);

    //! QUEBRA LINHAS, MAS UTILIZA dangerouslySetInnerHTML
    /*
    const palavras: string[] = test.correction.flatMap(c => c.excerpt);
    // Escape regex special characters in keywords
    const escapedKeywords = palavras.map(keyword => keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    // Create a regex pattern with all keywords
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    // Replace matched keywords with wrapped spans
    const highlightedText = text.replace(regex, (match) => {
      return `<span class="text-red-500">${match}</span>`;
    });
    // Preserve line breaks
    return highlightedText.replace(/\n/g, '<br/>');
    */

    //! NÃO FUNFA
    /*
    // Escape regex special characters in excerpts
    const escapedExcerpts = test.correction.map(({ excerpt }) => excerpt.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    // Create a regex pattern with all excerpts
    const regex = new RegExp(`(${escapedExcerpts.join('|')})`, 'gi');
    // Split the input text based on the regex pattern
    const parts = text.split(regex);
    return parts.map((part, index) => escapedExcerpts.includes(part.toLowerCase())
      ? <span key={index} className="text-red-500">{part}</span>
      : <span key={index}>{part}</span> );
    */

    //! MEU TESTE
    /*
    test.correction.map(correction => {
      correction.excerpt
    });

    const paragraphs = text.split(/(\n)/);
    paragraphs.map((p, i) => {
      if (p === 'n') {
        return <br key={i} />
      }

    })
    */
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
					/*<div
						contentEditable
						className="border p-2 rounded"
					>
						{ testeee(test.essay) }
					</div>*/
					<div
						contentEditable
						className="border p-2 rounded"
						dangerouslySetInnerHTML={{ __html: renderEssay() }}
					/>
					/*<div
						contentEditable
						className="border p-2 rounded"
					>
						{ renderEssay() }	
					</div>*/}
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
		pontuacao,
	},
	level = 0
}: QuestionProps) {

	const [collapsed, setCollapsed] = useState<boolean>(true);

	function getScoreColor() {
		if(pontuacao === 100)
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