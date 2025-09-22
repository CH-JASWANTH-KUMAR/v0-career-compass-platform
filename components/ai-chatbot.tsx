"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Building,
  TrendingUp,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

const QUICK_SUGGESTIONS = [
  "What career is best for me?",
  "Find colleges for engineering",
  "How to start a business?",
  "What after 12th science?",
  "Best courses for commerce students",
  "Scholarship opportunities",
]

const SAMPLE_RESPONSES = {
  "what career is best for me": {
    content:
      "To recommend the best career for you, I'd need to understand your interests, skills, and goals better. Have you taken our career assessment quiz? It analyzes your preferences across different areas like:\n\n• Subject interests (Science, Commerce, Arts)\n• Work environment preferences\n• Skills and strengths\n• Career goals\n\nBased on your responses, I can suggest careers in fields like Technology, Healthcare, Finance, Creative Arts, or Entrepreneurship. Would you like to take the quiz now?",
    suggestions: ["Take Career Quiz", "Tell me about Technology careers", "What about Healthcare careers?"],
  },
  "find colleges for engineering": {
    content:
      "Great choice! Engineering offers excellent career prospects. Here are some top engineering colleges in India:\n\n🏛️ **Government Colleges:**\n• IITs (Indian Institutes of Technology)\n• NITs (National Institutes of Technology)\n• IIITs (Indian Institutes of Information Technology)\n\n🏢 **Private Colleges:**\n• BITS Pilani\n• VIT University\n• Manipal Institute of Technology\n\n**Admission Process:**\n• JEE Main & JEE Advanced for IITs\n• State entrance exams\n• Management quota seats\n\nWould you like me to help you find colleges in a specific location or specialization?",
    suggestions: ["Search Engineering Colleges", "JEE Preparation Tips", "Engineering Specializations"],
  },
  "how to start a business": {
    content:
      "Starting a business is an exciting journey! Here's a step-by-step approach:\n\n💡 **1. Idea Development**\n• Identify a problem you're passionate about solving\n• Research your target market\n• Validate your idea with potential customers\n\n📋 **2. Business Planning**\n• Create a business model\n• Develop a business plan\n• Analyze competitors\n\n💰 **3. Funding & Legal**\n• Determine funding needs\n• Register your business\n• Understand legal requirements\n\nOur entrepreneurship program can guide you through each step with practical modules and mentor support. Ready to start your entrepreneurial journey?",
    suggestions: ["Start Entrepreneurship Course", "Find Business Mentors", "Validate My Idea"],
  },
  default: {
    content:
      "I'm here to help you with career guidance, college recommendations, and entrepreneurship advice! I can assist you with:\n\n🎯 **Career Guidance**\n• Career assessments and recommendations\n• Skill development paths\n• Industry insights\n\n🏛️ **College Information**\n• College search and comparison\n• Admission requirements\n• Scholarship opportunities\n\n🚀 **Entrepreneurship**\n• Business idea validation\n• Startup guidance\n• Mentor connections\n\nWhat would you like to explore today?",
    suggestions: ["Take Career Quiz", "Find Colleges", "Start a Business", "Explore Scholarships"],
  },
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI Career Assistant. I'm here to help you with career guidance, college recommendations, and entrepreneurship advice. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: QUICK_SUGGESTIONS.slice(0, 4),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for specific keywords and return appropriate responses
    if (lowerMessage.includes("career") && (lowerMessage.includes("best") || lowerMessage.includes("recommend"))) {
      return SAMPLE_RESPONSES["what career is best for me"]
    }
    if (lowerMessage.includes("engineering") && lowerMessage.includes("college")) {
      return SAMPLE_RESPONSES["find colleges for engineering"]
    }
    if (
      lowerMessage.includes("business") ||
      lowerMessage.includes("startup") ||
      lowerMessage.includes("entrepreneur")
    ) {
      return SAMPLE_RESPONSES["how to start a business"]
    }
    if (lowerMessage.includes("12th") || lowerMessage.includes("after graduation")) {
      return {
        content:
          "After 12th, you have several exciting paths:\n\n📚 **Higher Education:**\n• Bachelor's degrees (B.Tech, B.Com, B.A, etc.)\n• Professional courses (CA, CS, Medical, etc.)\n• Diploma courses\n\n💼 **Career Paths:**\n• Science: Engineering, Medicine, Research\n• Commerce: Finance, Business, Accounting\n• Arts: Law, Journalism, Psychology\n\n🚀 **Alternative Paths:**\n• Skill-based courses\n• Entrepreneurship\n• Gap year for exploration\n\nWhat stream did you study in 12th? I can provide more specific guidance!",
        suggestions: ["Science Stream Options", "Commerce Stream Options", "Arts Stream Options"],
      }
    }
    if (lowerMessage.includes("scholarship")) {
      return {
        content:
          "There are many scholarship opportunities available! Here are some categories:\n\n🏛️ **Government Scholarships:**\n• National Scholarship Portal\n• State government scholarships\n• Minority scholarships\n\n🎓 **Merit-based:**\n• College-specific scholarships\n• Academic excellence awards\n• Competition-based scholarships\n\n💰 **Need-based:**\n• Income-based assistance\n• Fee waivers\n• Education loans with subsidies\n\n**Tips:**\n• Apply early and meet deadlines\n• Maintain good academic records\n• Prepare required documents\n\nWould you like help finding scholarships for a specific course or category?",
        suggestions: ["Government Scholarships", "Merit Scholarships", "Need-based Aid"],
      }
    }

    return SAMPLE_RESPONSES.default
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const response = generateResponse(message)
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.content,
          sender: "ai",
          timestamp: new Date(),
          suggestions: response.suggestions,
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => setIsOpen(true)} className="h-14 w-14 rounded-full shadow-lg" size="lg">
            <MessageCircle className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Card className={`shadow-2xl transition-all duration-300 ${isMinimized ? "w-80 h-16" : "w-96 h-[600px]"}`}>
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Bot className="w-5 h-5" />
              </motion.div>
              <CardTitle className="text-sm">AI Career Assistant</CardTitle>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Badge variant="secondary" className="text-xs bg-primary-foreground/20 text-primary-foreground">
                  Online
                </Badge>
              </motion.div>
            </div>
            <div className="flex items-center gap-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardHeader>

          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "calc(600px - 80px)", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="flex flex-col h-full p-0">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {message.sender === "ai" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                                {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                                <div className="flex-1">
                                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                                  {message.suggestions && (
                                    <motion.div
                                      className="flex flex-wrap gap-1 mt-3"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.5 }}
                                    >
                                      {message.suggestions.map((suggestion, index) => (
                                        <motion.div
                                          key={index}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: 0.7 + index * 0.1 }}
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="text-xs h-7 bg-background/50 hover:bg-background"
                                          >
                                            {suggestion}
                                          </Button>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <AnimatePresence>
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex justify-start"
                          >
                            <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                              <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4" />
                                <div className="flex gap-1">
                                  <motion.div
                                    className="w-2 h-2 bg-current rounded-full"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                                  />
                                  <motion.div
                                    className="w-2 h-2 bg-current rounded-full"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                  />
                                  <motion.div
                                    className="w-2 h-2 bg-current rounded-full"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="border-t p-3">
                    <motion.div
                      className="flex gap-1 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {[
                        { icon: Lightbulb, label: "Career", action: "Career guidance" },
                        { icon: Building, label: "Colleges", action: "Find colleges" },
                        { icon: TrendingUp, label: "Business", action: "Start business" },
                        { icon: BookOpen, label: "Learn", action: "Learning resources" },
                      ].map((item, index) => (
                        <motion.div key={item.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => handleSuggestionClick(item.action)}
                          >
                            {React.createElement(item.icon, { className: "w-3 h-3 mr-1" })}
                            {item.label}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Input Area */}
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about careers, colleges, or entrepreneurship..."
                        className="flex-1"
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
