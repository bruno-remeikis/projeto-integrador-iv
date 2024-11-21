import { Correction } from "@/models/CorrectedTest";
import { correctionTypes } from "@/utils/CorrectionTypeUtils";
import { CorrectionTooltipDescription } from "./CorrectionTooltipDescription";
import { Tooltip } from "./simple/Tooltip";
import { CSSProperties } from "react";

type CorrectionOutputProps = {
  text: string;
  correction: Correction[];
  className?: string;
  style?: CSSProperties;
}

export function CorrectionOutput({ text, correction, className = '', style }: CorrectionOutputProps) {

  function render() {
    if (!text) {
      return '';
    }

    if (!correction) {
      return text;
    }

    // Processa a localização (índices) de cada trecho incorreto
    correction.forEach(c => {
      const start = text.indexOf(c.excerpt)
      c.excerptLocale = { start, end: start + c.excerpt.length };
    })

    // Guarda listas dos índices dos trechos incorretos
    const excerptStarts = correction?.flatMap(c => c.excerptLocale?.start);
    const excerptEnds = correction?.flatMap(c => c.excerptLocale?.end);

    const elements: React.ReactNode[] = [];
    let auxText = '';
    //let key = 0;

    function pushSimple(i: number) {
      elements.push(<span key={i}>{ auxText }</span>);
      auxText = '';
    }

    text.split('').forEach((char, i) => {

      if (char === '\n') {
        pushSimple(i);
        elements.push(<br key={`br-${i}`} />);
      }
      else if (excerptStarts.includes(i) && i !== 0) {
        pushSimple(i);
      }
      else if (excerptEnds.includes(i)) {
        const c = correction.filter(c => c.excerptLocale?.end === i)[0]; //! REAVALIAR [0]
        if (!c) {
          pushSimple(i);
        }
        else {
          const typeProps = correctionTypes[c.type];
          elements.push(
            <Tooltip key={i} content={<CorrectionTooltipDescription correction={c} />}>
              <span className="rounded cursor-help px-[0.15rem]" style={typeProps.highlightStyle}>{ auxText }</span>
            </Tooltip>
          );
          auxText = '';
        }
      }
      else if (i === text.length - 1) {
        pushSimple(i);
      }

      auxText += char;
    });
	  return elements;
  }

  return (
    <div className={`border p-2 rounded text-justify ${className}`} style={style}>
      { render() }	
    </div>
  )
}