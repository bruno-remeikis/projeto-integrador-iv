'use client';

import { InputFile } from "@/components/InputFile";
import { FileTable } from "@/components/FileTable";
import { concatFileList } from "@/utils/FileListUtils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Provas() {
  const router = useRouter();

  const [files, setFiles] = useState<FileList>();

  function handleOnSelectFiles(newFiles: FileList) {
    const a = concatFileList(files, newFiles)
    setFiles(a);
  }

  function handleCorrectTests() {
    if(!files) {
      alert('Faça upload de ao menos um arquivo');
      return;
    }

    const formData = new FormData();
    for(let i = 0; i < files.length; i++)
      formData.append('files', files[i]);

    // fetch('http://localhost/', {
    //   method: 'POST',
    //   body: formData,
    // });

    router.push('provas');
  }

  return (
    <main className="p-3">
      <h2>Upload de provas</h2>
      
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
  );
}