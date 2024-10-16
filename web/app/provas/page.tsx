"use client";

import { CorrectedTestTable } from "@/components/CorrectedTestTable";
import { PageTitle } from "@/components/PageTitle";
import { CorrectedTest } from "@/models/CorrectedTest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Importando useSearchParams

export default function ProvasPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Usando useSearchParams para obter os parâmetros
  const [data, setData] = useState<CorrectedTest[]>([]);

  useEffect(() => {
    const dataParam = searchParams.get("data");

    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));

        // Processando os dados para garantir nome e calcular pontuação média
        const updatedData = parsedData.map((item: any, index: number) => {
          const nomeAluno = item.nomeAluno?.trim() || "Aluno Sem Nome"; // Nome padrão
          let pontuacao = 0;

          // Calcular a média da pontuação das questões, se houver
          if (item.questoes && item.questoes.length > 0) {
            const totalPontuacao = item.questoes.reduce(
              (acc: number, questao: any) => {
                return acc + (questao.nota || 0); // Considera 'nota' como o campo da pontuação da questão
              },
              0
            );
            pontuacao = totalPontuacao / item.questoes.length; // Média
          }

          return {
            ...item,
            nomeAluno,
            pontuacao,
            id: index + 1, // Adiciona um ID único baseado no índice
          };
        });
        console.log("Dados recebidos:", dataParam);

        setData(updatedData);
      } catch (error) {
        console.error("Erro ao analisar os dados da query:", error);
      }
    }
  }, [searchParams]);

  function handleOnSelectRow(row: CorrectedTest) {
    if (row.id) {
      router.push(`/provas/detalhes/${row.id}`);
    } else {
      console.error("ID do teste não encontrado.");
    }
  }

  return (
    <div>
      <PageTitle goBackTo="/">Avaliações Corrigidas pela IA</PageTitle>
      <main>
        <div className="section">
          {/* Verifica se há dados para evitar renderização de uma tabela vazia */}
          {data.length > 0 ? (
            <CorrectedTestTable data={data} onSelectRow={handleOnSelectRow} />
          ) : (
            <p>Nenhuma avaliação corrigida encontrada.</p> // Mensagem alternativa se não houver dados
          )}
        </div>
      </main>
    </div>
  );
}
