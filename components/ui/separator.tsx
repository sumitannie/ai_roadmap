"use client"

import * as React from "react"

export function Separator({ className, orientation = "horizontal" as const }: { className?: string; orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={
        className ?? (orientation === "vertical" ? "w-px bg-slate-200" : "h-px bg-slate-200")
      }
    />
  )
}

export default Separator
