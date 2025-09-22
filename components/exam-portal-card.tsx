"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface ExamPortalCardProps {
  exam: {
    id: string
    name: string
    fullName: string
    category: string
    registrationUrl: string
    admitCardUrl?: string
    resultUrl?: string
    websiteUrl: string
    registrationStart?: string
    registrationEnd?: string
    examDate?: string
    description: string
    eligibility: string[]
    status: "upcoming" | "open" | "closed" | "completed"
    lastUpdated: string
  }
  delay?: number
}

export function ExamPortalCard({ exam, delay = 0 }: ExamPortalCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleExternalLink = (url: string, linkType: string) => {
    setIsLoading(true)

    // Show confirmation toast
    toast.info("You're leaving Career Compass — opening official site", {
      duration: 3000,
    })

    // Small delay to show the toast, then open link
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer")
      setIsLoading(false)
    }, 500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "closed":
        return "bg-red-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <CheckCircle className="w-4 h-4" />
      case "upcoming":
        return <Clock className="w-4 h-4" />
      case "closed":
      case "completed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

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
      <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{exam.category}</Badge>
              <Badge className={`text-white ${getStatusColor(exam.status)}`}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(exam.status)}
                  {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                </div>
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl">{exam.name}</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">{exam.fullName}</p>
          <p className="text-sm text-muted-foreground">{exam.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Important Dates */}
          {(exam.registrationStart || exam.registrationEnd || exam.examDate) && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Important Dates</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                {exam.registrationStart && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Registration Starts: {exam.registrationStart}</span>
                  </div>
                )}
                {exam.registrationEnd && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Registration Ends: {exam.registrationEnd}</span>
                  </div>
                )}
                {exam.examDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Exam Date: {exam.examDate}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Eligibility */}
          <div>
            <h4 className="font-medium text-sm mb-2">Eligibility</h4>
            <div className="flex flex-wrap gap-1">
              {exam.eligibility.map((criteria, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {criteria}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {exam.status === "open" && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full"
                  onClick={() => handleExternalLink(exam.registrationUrl, "registration")}
                  disabled={isLoading}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply/Register Now
                </Button>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {exam.admitCardUrl && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleExternalLink(exam.admitCardUrl!, "admit card")}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Admit Card
                  </Button>
                </motion.div>
              )}

              {exam.resultUrl && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleExternalLink(exam.resultUrl!, "results")}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Results
                  </Button>
                </motion.div>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => handleExternalLink(exam.websiteUrl, "official website")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Official Website
              </Button>
            </motion.div>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-muted-foreground pt-2 border-t">Last verified: {exam.lastUpdated}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
