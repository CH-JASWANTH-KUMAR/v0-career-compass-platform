"use client"

import React from "react"

import { motion } from "framer-motion"
import { BookOpen, TrendingUp, Award, Users } from "lucide-react"

export function FloatingElements() {
  const elements = [
    { icon: BookOpen, delay: 0, x: "10%", y: "20%" },
    { icon: TrendingUp, delay: 2, x: "80%", y: "30%" },
    { icon: Award, delay: 4, x: "15%", y: "70%" },
    { icon: Users, delay: 6, x: "85%", y: "80%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {React.createElement(element.icon, {
            className: "w-16 h-16 text-primary/20",
          })}
        </motion.div>
      ))}
    </div>
  )
}
