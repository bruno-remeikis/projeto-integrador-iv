import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

const typeStyle = {
    blank: '',
    info: 'bg-blue-500 text-blue-50 border-blue-600',
    warn: 'bg-yellow-500 text-white border-yellow-600',
    error: 'bg-red-500 text-red-50 border-red-600',
}

type TooltipProps = {
    children: React.ReactNode,
    content: string | React.ReactNode;
    type?: 'blank' | 'info' | 'warn' | 'error';
    className?: string;
}

export function Tooltip({ children, content, type, className = '' }: TooltipProps) {
    return (
        <TooltipProvider>
            <UiTooltip>

                <TooltipTrigger asChild>
                    { children }
                </TooltipTrigger>

                {content &&
                <TooltipContent className={`max-w-[50vw] ${type ? typeStyle[type] : ''} ${className}`}>
                    {typeof content === 'string'
                        ? <p /*className="text-justify"*/>{ content }</p>
                        : content }
                </TooltipContent>}
                
            </UiTooltip>
        </TooltipProvider>
    )
}
