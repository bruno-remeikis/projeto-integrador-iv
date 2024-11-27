import { Correction } from "@/models/CorrectedTest"
import { correctionTypes } from "@/utils/CorrectionTypeUtils"

type CorrectionTooltipDescriptionProps = {
  correction: Correction
}

export function CorrectionTooltipDescription({ correction }: CorrectionTooltipDescriptionProps) {
  
  const typeProps = correctionTypes[correction.type];

  return (
    <div>
      <div className="flex gap-1">
        <span className="text-gray-500">Competência:</span>
        <span style={typeProps.tooltipStyle}>{ typeProps.translation }</span>
      </div>

      <div className="flex gap-1">
        <span className="text-gray-500">Motivo:</span>
        <span>{ correction.reason }</span>
      </div>

      <div className="flex gap-1">
        <span className="text-gray-500">Pontuação:</span>
        <span>- { correction.decrement }</span>
      </div>
    </div>
  )
}