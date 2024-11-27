import { CorrectionType } from "@/models/CorrectedTest"
import { CSSProperties } from "react"

type CorrectionTypeProps = {
    translation: string,
    highlightStyle: CSSProperties,
    tooltipStyle: CSSProperties,
}

export const correctionTypes: {[key in CorrectionType]: CorrectionTypeProps} = {
	grammatical: {
        translation: 'Domínio da língua',
        highlightStyle: { backgroundColor: 'rgb(252, 165, 165)' },
        tooltipStyle: { color: 'rgb(220, 38, 38)' },

    },
	theme: {
        translation: 'Compreensão da proposta',
        highlightStyle: { backgroundColor: 'rgb(147, 197, 253)' },
        tooltipStyle: { color: 'rgb(37, 99, 235)' },
    },
	defense: {
        translation: 'Organização e defesa',
        highlightStyle: { backgroundColor: 'rgb(134, 239, 172)' },
        tooltipStyle: { color: 'rgb(22, 163, 74)' },
    },
	argumentation: {
        translation: 'Conhecimentos linguísticos e argumentação',
        highlightStyle: { backgroundColor: 'rgb(253, 224, 71)' },
        tooltipStyle: { color: 'rgb(234, 179, 8)' },
    },
	intervention: {
        translation: 'Proposta de intervenção',
        highlightStyle: { backgroundColor: 'rgb(216, 180, 254)' },
        tooltipStyle: { color: 'rgb(147, 51, 234)' },
    },
    other: {
        translation: 'Correção',
        highlightStyle: { backgroundColor: 'rgb(252, 165, 165)' },
        tooltipStyle: { color: 'rgb(220, 38, 38)' },
    }
}