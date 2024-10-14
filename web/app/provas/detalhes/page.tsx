'use client';

import { PageTitle } from "@/components/PageTitle";
import { CorrectedTest, TestQuestion } from "@/models/CorrectedTest"
import TextareaAutosize from 'react-textarea-autosize';

type DetailsPageProps = {
	test: CorrectedTest
}

export default function DetailsPage({ test }: DetailsPageProps) {
	return (
		<div>
			<PageTitle goBackTo="/provas">Detalhes da Avaliação</PageTitle>
			<main>
				<div className="section">
					<div className="form-group">
						<label>Aluno(s)</label>
						<input type="text" readOnly value="Bruno Coutinho Remeikis"/>
					</div>

					<div className="form-group">
						<label>Área de Conhecimento</label>
						<input type="text" readOnly value="História" />
					</div>

					<Question question={{
						enunciado: "Questão 1: Qual a capital do Brasil?",
						resposta: "A atual capital do Brasil é Braília.\nA primeira capital do Brasil foi Salvador",
						pontuacao: 1
					}} />

					<Question question={{
						enunciado: "Questão 2: Qual a capital do Brasil?",
						resposta: "A atual capital do Brasil é Braília.\nA primeira capital do Brasil foi Salvador",
						pontuacao: 1
					}} />

					<Question question={{
						enunciado: "Questão 3: Qual a capital do Brasil?",
						questoes: [
							{
								enunciado: 'Teste',
								resposta: 'Testado',
								pontuacao: 0.5
							}
						],
						pontuacao: 1
					}} />

					<Question question={{
						enunciado: "Questão 3: Qual a capital do Brasil?",
						questoes: [
							{
								enunciado: 'Teste',
								resposta: 'Testado',
								pontuacao: 0.5
							},
							{
								enunciado: 'Teste',
								resposta: 'Testado',
								pontuacao: 1
							},
							{
								enunciado: 'Teste',
								resposta: 'Testado',
								pontuacao: 0
							}
						],
						pontuacao: 0.5
					}} />

					<Question question={{
						enunciado: "Questão 4: Qual a capital do Brasil?",
						questoes: [
							{
								enunciado: 'Teste',
								questoes: [
									{
										enunciado: 'Teste',
										resposta: 'aaa',
										pontuacao: 0.5
									}
								],
								pontuacao: 0.5
							}
						],
						pontuacao: 0.5
					}} />
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

	// ${level % 2 === 0 ? 'bg-primary' : 'bg-orange-400'}
	return (
		<div className={`${getScoreColor()} ${level === 0 ? 'mb-3 md:mb-4 shadow-md' : 'border-white border-2'} p-2 md:p-3 border rounded-sm `}>
			<div className="form-group !pb-0 md:gap-2">
				<TextareaAutosize readOnly value={enunciado} />
				{resposta ?
					<TextareaAutosize readOnly value={resposta} />
					: null
				}
				{questoes
					? questoes.map(q => <Question question={q} level={level + 1} />)
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