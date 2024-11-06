import { Button } from "@/components/ui/button"
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

type TooltipProps = {
    children: React.ReactNode,
    content: string;
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
                    <p>{ content }</p>
                </TooltipContent>}
                
            </UiTooltip>
        </TooltipProvider>
    )
}
