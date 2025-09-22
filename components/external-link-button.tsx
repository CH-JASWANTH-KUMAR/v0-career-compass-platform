"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ExternalLinkButtonProps {
  href: string
  children: ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
  confirmMessage?: string
}

export function ExternalLinkButton({
  href,
  children,
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  confirmMessage = "You're leaving Career Compass — opening official site",
}: ExternalLinkButtonProps) {
  const handleClick = () => {
    // Show confirmation toast
    toast.info(confirmMessage, {
      duration: 3000,
    })

    // Small delay to show the toast, then open link
    setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer")
    }, 500)
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button variant={variant} size={size} className={className} onClick={handleClick}>
        {children}
        {showIcon && <ExternalLink className="w-4 h-4 ml-2" />}
      </Button>
    </motion.div>
  )
}
