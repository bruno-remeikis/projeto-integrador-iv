import { CorrectedTestTable } from "@/components/CorrectedTestTable";
import { CorrectedTest } from "@/models/CorrectedTest";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const data: CorrectedTest[] = [
    {
        nome_aluno: 'Bruno Coutinho Remeikis',
        area_conhecimento: 'História',
        questoes: [
            {
                enunciado: 'O que é isso?',
                pontuacao: 1
            }
        ],
        pontuacao: 1
    }
]

export default function Provas() {
    return (
        <main className="p-3">
            <div className="flex gap-3 items-center">
                <Link href='/' className="default-button default-button-always-enabled">
                    <FiArrowLeft size={20} />
                </Link>
                <h2>Avaliações Corrigidas pela IA</h2>
            </div>

            <div className="section">
                <CorrectedTestTable data={data} />
            </div>
        </main>
    );
}