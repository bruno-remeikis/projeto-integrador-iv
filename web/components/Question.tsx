import { TestQuestion } from "@/models/CorrectedTest";
import { formatGrade } from "@/utils/StringUtils";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import TextareaAutosize from 'react-textarea-autosize';
import { CorrectionOutput } from "./CorrectionOutput";

type QuestionProps = {
	question: TestQuestion,
	level?: number;
}

export function Question({
	question: {
		enunciado,
		resposta,
		questoes,
		pontuacao,
		correction,
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
					<CorrectionOutput style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }} text={resposta} correction={correction || []} />}

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
					</div>}

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