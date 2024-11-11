import { CSSProperties } from "react"

type CorrectionTypeProps = {
    translation: string,
    highlightStyle: CSSProperties, //'bg-red-500',
    tooltipStyle: CSSProperties,
}

export const correctionTypes: {[key: string]: CorrectionTypeProps} = {
	grammatical: {
        translation: 'Gramatical',
        highlightStyle: { backgroundColor: 'rgba(255, 0, 0, 0.5)' },
        tooltipStyle: { color: 'red' },

    },
	reference: {
        translation: 'Referência',
        highlightStyle: { backgroundColor: 'rgba(0, 0, 255, 0.5)' },
        tooltipStyle: { color: 'blue' },
    },
	other: {
        translation: 'Outro',
        highlightStyle: { backgroundColor: 'rgba(255, 127, 0, 0.5)' },
        tooltipStyle: { color: 'orange' },
    }
}