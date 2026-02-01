"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

export const TooltipProvider = TooltipPrimitive.Provider

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>
}

export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({ children, className, ...props }: any) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className={cn("rounded-md bg-slate-800 p-2 text-white text-sm", className)} sideOffset={6} {...props}>
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { TooltipPrimitive }
