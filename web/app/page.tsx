"use client";

import { InputFile } from "@/components/InputFile";
import { FileTable } from "@/components/FileTable";
import { concatFileList } from "@/utils/FileListUtils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";

export default function HomePage() {
  const router = useRouter();
  const [files, setFiles] = useState<FileList>();

  function handleOnSelectFiles(newFiles: FileList) {
    const updatedFiles = concatFileList(files, newFiles);
    console.log("Arquivos selecionados:", updatedFiles);
    setFiles(updatedFiles);
  }

  async function handleCorrectTests() {
    if (!files) {
      alert("Faça upload de ao menos um arquivo");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      console.log(`Adicionando arquivo: ${files[i].name}`);
      formData.append("files", files[i]);
    }

    try {
      console.log("Enviando requisição de upload para o servidor...");

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Resposta recebida:", response);

      if (!response.ok) {
        console.error("Erro no status da resposta:", response.statusText);
        throw new Error("Erro ao fazer upload dos arquivos");
      }

      const result = await response.json();
      console.log("Resposta JSON recebida:", result);

      // Navegando para a página de provas, passando o resultado como parâmetro
      router.push(`/provas?data=${encodeURIComponent(JSON.stringify(result))}`);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Falha ao fazer upload dos arquivos");
    }
  }

  return (
    <div>
      <PageTitle>Upload de provas</PageTitle>
      <main>
        <div className="section">
          <InputFile onSelectFiles={handleOnSelectFiles} />
        </div>

        <div className="section">
          <FileTable data={files ? Array.from(files) : []} />
        </div>

        <div className="section flex justify-center">
          <button
            type="button"
            className="default-button"
            onClick={handleCorrectTests}
            disabled={!files || files.length === 0}
          >
            Corrigir provas com IA
          </button>
        </div>
      </main>
    </div>
  );
}
