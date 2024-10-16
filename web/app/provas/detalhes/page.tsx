"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CorrectedTest } from "@/models/CorrectedTest"; // Verifique se o caminho está correto

export default function DetailsPage() {
  const router = useRouter();
  const { testId } = router.query; // Obtém o testId da URL
  const [test, setTest] = useState<CorrectedTest | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de loading

  useEffect(() => {
    // Verifica se testId está disponível antes de chamar fetchTestData
    if (typeof testId === "string") {
      fetchTestData(testId);
    }
  }, [testId]);

  async function fetchTestData(id: string) {
    setLoading(true); // Define loading como true antes da busca
    try {
      const response = await fetch(`/api/tests/${id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }
      const data = await response.json();
      setTest(data);
    } catch (error) {
      console.error("Erro ao buscar dados do teste:", error);
    } finally {
      setLoading(false); // Define loading como false após a busca
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Exibe um carregando enquanto busca os dados
  }

  if (!test) {
    return <div>Nenhum dado encontrado para este teste.</div>; // Mensagem se não houver dados
  }

  return (
    <div>
      <h1>Detalhes da Avaliação</h1>
      <h2>Nome do Aluno: {test.nome_aluno || "Nome não disponível"}</h2>
      <h3>
        Área de Conhecimento: {test.area_conhecimento || "Área não disponível"}
      </h3>
      <div>
        {test.questoes.length > 0 ? (
          test.questoes.map((question, index) => (
            <div key={index}>
              <h4>{question.enunciado || "Enunciado não disponível"}</h4>
              <p>
                Pontuação: {question.pontuacao || "Pontuação não disponível"}
              </p>
              {question.resposta && <p>Resposta: {question.resposta}</p>}
            </div>
          ))
        ) : (
          <p>Nenhuma questão encontrada para este teste.</p>
        )}
        <h4>Pontuação Total: {test.pontuacao || "Pontuação não disponível"}</h4>
      </div>
    </div>
  );
}
