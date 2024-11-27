"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

type ProgressBarProps = {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
//   const [progress, setProgress] = React.useState(13)

//   React.useEffect(() => {
//     const timer = setTimeout(() => setProgress(66), 500)
//     return () => clearTimeout(timer)
//   }, [])

  return <Progress value={progress} />
}
