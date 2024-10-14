'use client';

import { CorrectedTestTable } from "@/components/CorrectedTestTable";
import { PageTitle } from "@/components/PageTitle";
import { CorrectedTest } from "@/models/CorrectedTest";
import { useRouter } from "next/navigation";

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

export default function ProvasPage() {
    const router = useRouter();

    function handleOnSelectRow(row: CorrectedTest) {
        router.push('/provas/detalhes');
    }

    return (
        <div>
            <PageTitle goBackTo="/">Avaliações Corrigidas pela IA</PageTitle>
            <main>
                <div className="section">
                    <CorrectedTestTable data={data} onSelectRow={handleOnSelectRow} />
                </div>
            </main>
        </div>
    );
}