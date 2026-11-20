"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 relative",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        "bg-[linear-gradient(90deg,transparent,rgb(var(--glitch-accent)/50%),transparent)]",
        "data-[orientation=vertical]:bg-[linear-gradient(180deg,transparent,rgb(var(--glitch-accent)/50%),transparent)]",
        "shadow-[0_0_4px_rgb(var(--glitch-accent)/30%)]",
        "before:absolute before:inset-0",
        "before:bg-[rgb(var(--glitch-border)/30%)]",
        className
      )}
      {...props}
    />
  )
}

export { Separator }