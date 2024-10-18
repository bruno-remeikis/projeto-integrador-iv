"use client";

import { InputFile } from "@/components/InputFile";
import { FileTable } from "@/components/FileTable";
import { concatFileList } from "@/utils/FileListUtils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { CorrectedTest } from "@/models/CorrectedTest";
import { Modal } from "@/components/Modal";
import { ProgressBar } from "@/components/ProgressBar";

export default function HomePage() {

  const router = useRouter();

  const [files, setFiles] = useState<FileList>();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  function handleOnSelectFiles(newFiles: FileList) {
    const updatedFiles = concatFileList(files, newFiles);
    setFiles(updatedFiles);
  }

  async function handleCorrectTests() {
    if (!files) {
      alert("Faça upload de ao menos um arquivo");
      return;
    }

    setProgress(0);
    setLoading(true);

    // Monta body da requisição
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Erro no status da resposta:", response.statusText);
        throw new Error("Erro ao fazer upload dos arquivos");
      }

      const result = await response.json()
      // Adiciona ID aos resultados
      const tests = result.map((t: CorrectedTest, i: number) => ({
        ...t,
        id: i + 1
      }));

      // Navegando para a página de provas, passando o resultado como parâmetro
      sessionStorage.setItem('tests', JSON.stringify(tests))
      router.push('/provas');
    }
    catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Falha ao fazer upload dos arquivos");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
        interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 70) {
                    clearInterval(interval);
                    return 70;
                }
                return prev + 2;
            });
        }, 60);
    }
    return () => clearInterval(interval);
}, [loading]);

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

      {loading &&
        <Modal>
          <span className="block mb-2 text-xl">{/*
            progress <= 20 ? 'Enviando provas' :
            progress <= 40 ? 'Analisando respostas' :
            'Corrigindo provas'
          */}
          Corrigindo provas
          </span>
          <ProgressBar progress={progress} />
        </Modal>
      }
    </div>
  );
}
