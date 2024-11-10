import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

type TooltipProps = {
    children: React.ReactNode,
    content: string | React.ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
    return (
        <TooltipProvider>
            <UiTooltip>

                <TooltipTrigger asChild>
                    { children }
                </TooltipTrigger>

                {content &&
                <TooltipContent>
                    {typeof content === 'string'
                        ? <p>{ content }</p>
                        : content }
                </TooltipContent>}
                
            </UiTooltip>
        </TooltipProvider>
    )
}
