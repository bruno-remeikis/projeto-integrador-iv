"use client";

import { InputFile } from "@/components/InputFile";
import { FileTable } from "@/components/FileTable";
import { FileListUtils } from "@/utils/FileListUtils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { CorrectedTest } from "@/models/CorrectedTest";
import { Modal } from "@/components/modal/Modal";
import { ProgressBar } from "@/components/simple/ProgressBar";
import { GoGear } from "react-icons/go";
import { useConfig } from "@/contexts/ConfigContext";
import { ConfigModal } from "@/components/modal/ConfigModal";
import { testTypes } from "@/models/TestType";
import { TestType } from "@/models/Config";

export default function HomePage() {

  const router = useRouter();
  const { config } = useConfig();

  const [files, setFiles] = useState<FileList>();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [configModalVisivle, setConfigModalVisible] = useState<boolean>(false);

  function handleOnSelectFiles(newFiles: FileList) {
    const updatedFiles = FileListUtils.concat(files, newFiles);
    setFiles(updatedFiles);
  }

  function handleOnRemoveFile(file: File) {
    setFiles(prev => prev ? FileListUtils.remove(prev, file) : prev);
  }

  async function handleCorrectTests() {
    if (!files) {
      alert("Faça upload de ao menos um arquivo");
      return;
    }

    setProgress(0);
    setLoading(true);

    // Monta body da requisição
    const formData = new FormData()
    formData.append('name', config.name.toString());
    formData.append('area', config.area.toString());
    formData.append('theme', config.autoTheme ? '' : config.theme.toString().trim());
    formData.append('prompt', config.prompt.trim());
    formData.append('testType', config.testTypeKey);
    for (let i = 0; i < files.length; i++)
      formData.append("files", files[i]);

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

      if (result.status === 'error') {
        console.error("Erro ao fazer upload:", result.error);
        alert(result.error);
        return;
      }

      // Adiciona ID aos resultados
      const tests: CorrectedTest[] = result.results.map((t: CorrectedTest, i: number) => ({
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

  function openConfigModal() {
    setConfigModalVisible(true);
  }

  // Faz um carregamento fake ao carregar resposta da API
  useEffect(() => {
    const fakeLimit = 90;
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= fakeLimit) {
            clearInterval(interval);
            return fakeLimit;
          }
          return prev + 2;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div>
      <PageTitle>Upload de Avaliações</PageTitle>

      <main>
        <div className="section">
          <InputFile onSelectFiles={handleOnSelectFiles} />
        </div>

        <div className="section">
          <FileTable data={files ? Array.from(files) : []} onRemoveFile={handleOnRemoveFile} />
        </div>

        <div className="flex flex-col items-center mb-8">
          <div>
            <span className="text-gray-700">Tipo de avaliação: </span>
            <span
              className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition-all"
              onClick={openConfigModal}
            >
              { testTypes[config.testTypeKey].name.toLowerCase() }
            </span>
          </div>
          <span
            className="text-xs text-gray-500 hover:text-blue-500 cursor-pointer transition-all"
            onClick={openConfigModal}
          > 
            Clique parar alterar
          </span>
        </div>

        <div className="section flex justify-center gap-3">
          <button className="button flex items-center gap-2" onClick={openConfigModal}>
            <GoGear size={20} />
            Configurações
          </button>
          <button
            className="primary-button"
            onClick={handleCorrectTests}
            disabled={!files || files.length === 0}
          >
            Corrigir avaliações com IA
          </button>
        </div>
      </main>

      {/* Carregamento */}
      <Modal visible={loading}>
        <span className="block mb-2 text-xl">{/*
          progress <= 20 ? 'Enviando avaliações' :
          progress <= 40 ? 'Analisando respostas' :
          'Corrigindo avaliações'
        */}
          Corrigindo avaliações
        </span>
        <ProgressBar progress={progress} />
      </Modal>

      {/* Configurações */}
      <ConfigModal visible={configModalVisivle} setVisible={setConfigModalVisible} />
    </div>
  );
}
