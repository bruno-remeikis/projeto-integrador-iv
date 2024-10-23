"use client";

import { InputFile } from "@/components/InputFile";
import { FileTable } from "@/components/FileTable";
import { FileListUtils } from "@/utils/FileListUtils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/PageTitle";
import { CorrectedTest } from "@/models/CorrectedTest";
import { Modal } from "@/components/Modal";
import { ProgressBar } from "@/components/ProgressBar";
import { Switch } from "@/components/Switch";
import { GoGear } from "react-icons/go";
import { useConfig } from "@/contexts/ConfigContext";

export default function HomePage() {

  const router = useRouter();
  const { config, setConfig } = useConfig();

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
    formData.append('prompt', config.prompt.trim());
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

  function openConfigModal() {
    setConfigModalVisible(true);
  }

  function closeConfigModal() {
    setConfigModalVisible(false);
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
      <PageTitle>Upload de provas</PageTitle>

      <main>
        <div className="section">
          <InputFile onSelectFiles={handleOnSelectFiles} />
        </div>

        <div className="section">
          <FileTable data={files ? Array.from(files) : []} onRemoveFile={handleOnRemoveFile} />
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
            Corrigir provas com IA
          </button>
        </div>
      </main>

      {/* Carregamento */}
      <Modal visible={loading}>
        <span className="block mb-2 text-xl">{/*
          progress <= 20 ? 'Enviando provas' :
          progress <= 40 ? 'Analisando respostas' :
          'Corrigindo provas'
        */}
          Corrigindo provas
        </span>
        <ProgressBar progress={progress} />
      </Modal>

      {/* Configurações */}
      <Modal
        visible={configModalVisivle}
        setVisible={setConfigModalVisible}
        overlayClassName="relative"
      >
        <h3 className="text-center">Configurações</h3>
        <div className="mt-3">
          <h4 className="mb-1">Campos</h4>
          <div className="flex flex-col gap-2">
            <Switch
              id='switch-nome'
              label="Nome do(s) aluno(s)"
              checked={config.name}
              setChecked={(value) => setConfig(prev => ({...prev, name: value}))}
            />
            <Switch
              id='switch-area-conhecimento'
              label="Área(s) de conhecimento"
              checked={config.area}
              setChecked={value => setConfig(prev => ({...prev, area: value}))}
            />
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="area-prompt">Prompt</label>
          <textarea
            id='area-prompt'
            rows={4}
            cols={40}
            value={config.prompt}
            onChange={e => setConfig(prev => ({ ...prev, prompt: e.target.value }))}
          />
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <button className="button flat-button" onClick={closeConfigModal}>Concluir</button>
        </div>
      </Modal>
    </div>
  );
}
