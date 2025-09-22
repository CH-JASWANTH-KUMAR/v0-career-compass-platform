"use client"

import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children?: ReactNode
  className?: string
  delay?: number
  icon?: ReactNode
  title?: string
  description?: string
}

export function AnimatedCard({ children, className = "", delay = 0, icon, title, description }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <Card className={`border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${className}`}>
        {children || (
          <CardHeader>
            {icon && (
              <motion.div
                className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
            )}
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
      </Card>
    </motion.div>
  )
}
