"use client";

import { CorrectedTestTable } from "@/components/CorrectedTestTable";
import { PageTitle } from "@/components/PageTitle";
import { useConfig } from "@/contexts/ConfigContext";
import { CorrectedTest } from "@/models/CorrectedTest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProvasPage() {

  const router = useRouter();
  const { config } = useConfig();

  const [tests, setTests] = useState<CorrectedTest[]>([]);

  useEffect(() => {
    const storedTests = sessionStorage.getItem('tests');

    if(!storedTests) {
      console.warn('Nenhuma avaliação foi encontrada para esta pagina');
      return;
    }

    try {
      const tests = JSON.parse(storedTests);
      setTests(tests);
    }
    catch (error) {
      console.error("Erro ao analisar os dados da query:", error);
    }

  }, []);

  function handleOnSelectRow(row: CorrectedTest) {
    if (!row.id) {
      const msg = "ID do teste não encontrado.";
      alert(msg);
      console.error(msg);
      return; 
    }
    router.push(`/provas/${row.id}`);
  }

  return (
    <div>
      <PageTitle goBackTo="/">Avaliações Corrigidas pela IA</PageTitle>
      <main>
        <div className="section">
          <CorrectedTestTable
            data={tests}
            config={config}
            onSelectRow={handleOnSelectRow}
          />
        </div>
      </main>
    </div>
  );
}
