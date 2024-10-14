import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent } from "react"
import { FiFilePlus } from "react-icons/fi"
import { twMerge } from "tailwind-merge"
 
type InputFileProps = {
  onSelectFiles: (files: any) => void
}

export function InputFile({ onSelectFiles }: InputFileProps) {
  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if(!files)
      return;
    onSelectFiles(files);
  }

  return (
    <div className="flex">
      <Label
        htmlFor="file-input"
        className="default-button default-button-always-enabled flex gap-2 items-center !pr-4"
      >
        <FiFilePlus size={30} />
        <span>Adicionar arquivo</span>
      </Label>
      <Input
        id="file-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  )
}