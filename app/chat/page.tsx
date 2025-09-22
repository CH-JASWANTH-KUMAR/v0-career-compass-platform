"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, BookOpen, Lightbulb, Building, TrendingUp, MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

const FEATURED_PROMPTS = [
  {
    icon: Lightbulb,
    title: "Career Guidance",
    description: "Get personalized career recommendations",
    prompt: "What career path would be best for me based on my interests and skills?",
  },
  {
    icon: Building,
    title: "College Search",
    description: "Find the perfect college for your goals",
    prompt: "Help me find colleges for computer science engineering in India",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurship",
    description: "Learn how to start your own business",
    prompt: "I have a business idea for an education app. How do I validate and develop it?",
  },
  {
    icon: BookOpen,
    title: "Skill Development",
    description: "Discover skills to boost your career",
    prompt: "What skills should I learn to become a data scientist?",
  },
]

const SAMPLE_CONVERSATIONS = [
  {
    title: "Choosing Between Engineering and Medicine",
    preview: "I'm confused between engineering and medicine. Can you help me decide?",
    tags: ["Career Choice", "Science Stream"],
  },
  {
    title: "Best Colleges for Commerce Students",
    preview: "What are the top colleges for B.Com and what are the admission requirements?",
    tags: ["College Search", "Commerce"],
  },
  {
    title: "Starting a Tech Startup",
    preview: "I want to start a tech startup. What are the first steps I should take?",
    tags: ["Entrepreneurship", "Technology"],
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Career Assistant. I'm here to provide personalized guidance on careers, colleges, and entrepreneurship. What would you like to explore today?",
      sender: "ai",
      timestamp: new Date(),
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

    // Enhanced response logic with more detailed answers
    if (lowerMessage.includes("career") && (lowerMessage.includes("best") || lowerMessage.includes("recommend"))) {
      return {
        content:
          "To provide the best career recommendations, I'd love to learn more about you! Here's what I consider:\n\n🎯 **Your Interests:**\n• What subjects do you enjoy most?\n• What activities make you lose track of time?\n• Do you prefer working with people, data, or creative projects?\n\n💪 **Your Strengths:**\n• Are you more analytical or creative?\n• Do you enjoy problem-solving or helping others?\n• Are you comfortable with technology?\n\n🎓 **Your Background:**\n• What stream are you in (Science/Commerce/Arts)?\n• What's your current education level?\n\nBased on this information, I can suggest careers in:\n• **Technology**: Software development, data science, cybersecurity\n• **Healthcare**: Medicine, nursing, biotechnology\n• **Business**: Finance, marketing, consulting\n• **Creative**: Design, content creation, media\n• **Social Impact**: Education, NGO work, public service\n\nWould you like to take our detailed career assessment quiz for personalized recommendations?",
        suggestions: [
          "Take Career Quiz",
          "Tell me about Technology careers",
          "Explore Healthcare options",
          "Business career paths",
        ],
      }
    }

    if (lowerMessage.includes("engineering") || lowerMessage.includes("computer science")) {
      return {
        content:
          "Engineering is an excellent choice with diverse opportunities! Let me break down the options:\n\n🖥️ **Computer Science Engineering:**\n• **Top Colleges**: IITs, NITs, BITS Pilani, VIT, SRM\n• **Specializations**: AI/ML, Cybersecurity, Web Development, Mobile Apps\n• **Career Paths**: Software Engineer, Data Scientist, Product Manager\n• **Average Salary**: ₹6-25 LPA (varies by company and skills)\n\n⚙️ **Other Engineering Branches:**\n• **Mechanical**: Automotive, aerospace, manufacturing\n• **Electrical**: Power systems, electronics, automation\n• **Civil**: Construction, infrastructure, urban planning\n• **Chemical**: Process industries, pharmaceuticals\n\n📋 **Admission Process:**\n• **JEE Main**: For NITs, IIITs, and state colleges\n• **JEE Advanced**: For IITs (top 2.5 lakh JEE Main qualifiers)\n• **State Exams**: KCET, EAMCET, WBJEE, etc.\n• **Private Exams**: BITSAT, VITEEE, SRMJEEE\n\n💡 **Preparation Tips:**\n• Strong foundation in Physics, Chemistry, Mathematics\n• Regular practice with previous year papers\n• Time management and problem-solving skills\n\nWhich engineering branch interests you most? I can provide more specific guidance!",
        suggestions: [
          "Computer Science details",
          "JEE preparation tips",
          "Engineering college comparison",
          "Alternative to engineering",
        ],
      }
    }

    if (
      lowerMessage.includes("business") ||
      lowerMessage.includes("startup") ||
      lowerMessage.includes("entrepreneur")
    ) {
      return {
        content:
          'Entrepreneurship is an exciting path! Here\'s a comprehensive roadmap:\n\n💡 **Phase 1: Idea Development (Weeks 1-4)**\n• Identify problems you\'re passionate about solving\n• Research your target market and customers\n• Validate your idea through surveys and interviews\n• Study successful businesses in your domain\n\n📊 **Phase 2: Business Planning (Weeks 5-8)**\n• Create a business model canvas\n• Develop a detailed business plan\n• Analyze competitors and market positioning\n• Define your unique value proposition\n\n🛠️ **Phase 3: MVP Development (Weeks 9-16)**\n• Build a minimum viable product (MVP)\n• Test with early users and gather feedback\n• Iterate based on user insights\n• Establish basic operations and processes\n\n💰 **Phase 4: Funding & Growth (Month 4+)**\n• Bootstrap or seek external funding\n• Angel investors, VCs, or government schemes\n• Scale your operations and team\n• Focus on customer acquisition and retention\n\n🎓 **Learning Resources:**\n• Online courses: Coursera, edX, Udemy\n• Books: "Lean Startup", "Zero to One"\n• Startup communities and networking events\n• Mentorship programs\n\n**Government Support:**\n• Startup India initiative\n• MUDRA loans for small businesses\n• Incubation centers in colleges\n\nWhat type of business are you considering? I can provide more targeted advice!',
        suggestions: [
          "Validate my business idea",
          "Find startup mentors",
          "Government startup schemes",
          "Tech startup guide",
        ],
      }
    }

    if (lowerMessage.includes("12th") || lowerMessage.includes("after") || lowerMessage.includes("graduation")) {
      return {
        content:
          "Great question! Your path after 12th depends on your stream and interests:\n\n🔬 **Science Stream Options:**\n• **Engineering**: B.Tech/B.E in various specializations\n• **Medical**: MBBS, BDS, BAMS, Nursing\n• **Pure Sciences**: B.Sc in Physics, Chemistry, Biology, Mathematics\n• **Emerging Fields**: Biotechnology, Environmental Science, Data Science\n\n💼 **Commerce Stream Options:**\n• **Professional Courses**: CA, CS, CMA\n• **Management**: BBA, B.Com, Hotel Management\n• **Finance**: Banking, Insurance, Investment Analysis\n• **Entrepreneurship**: Start your own business\n\n🎨 **Arts/Humanities Options:**\n• **Law**: 5-year integrated LLB programs\n• **Media**: Journalism, Mass Communication, Film Studies\n• **Social Sciences**: Psychology, Sociology, Political Science\n• **Creative Fields**: Fine Arts, Design, Literature\n\n🚀 **Alternative Paths:**\n• **Skill-based Courses**: Digital Marketing, Web Development, Graphic Design\n• **Diploma Programs**: Shorter duration, industry-focused\n• **Gap Year**: Explore interests, internships, skill development\n• **Study Abroad**: International universities and programs\n\n**Decision Framework:**\n1. **Passion**: What genuinely interests you?\n2. **Aptitude**: What are you naturally good at?\n3. **Market Demand**: What careers have good prospects?\n4. **Lifestyle**: What kind of work-life balance do you want?\n\nWhich stream are you from? I can provide more specific guidance based on your background!",
        suggestions: ["Science stream careers", "Commerce opportunities", "Arts career paths", "Skill-based courses"],
      }
    }

    // Default response
    return {
      content:
        "I'm here to help you navigate your career journey! I can assist you with:\n\n🎯 **Career Guidance**\n• Personalized career recommendations based on your interests and skills\n• Industry insights and job market trends\n• Skill development roadmaps\n• Career transition advice\n\n🏛️ **College & Education**\n• College search and comparison\n• Admission requirements and processes\n• Scholarship opportunities\n• Course recommendations\n\n🚀 **Entrepreneurship**\n• Business idea validation\n• Startup planning and execution\n• Funding options and investor connections\n• Mentorship and networking\n\n📚 **Learning Resources**\n• Online courses and certifications\n• Skill assessment tools\n• Industry-specific training programs\n• Career development workshops\n\nWhat specific area would you like to explore? Feel free to ask me anything about your career, education, or entrepreneurship goals!",
      suggestions: [
        "Career assessment",
        "Find colleges",
        "Start a business",
        "Skill development",
        "Scholarship search",
      ],
    }
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

    // Simulate AI processing time
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
      1500 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const hasMessages = messages.length > 1

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Career Compass</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Bot className="w-3 h-3" />
                AI Assistant
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasMessages && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">AI Career Assistant</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized guidance on careers, colleges, and entrepreneurship. Ask me anything about your future!
              </p>
            </div>

            {/* Featured Prompts */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {FEATURED_PROMPTS.map((prompt, index) => {
                const IconComponent = prompt.icon
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
                    onClick={() => handlePromptClick(prompt.prompt)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{prompt.title}</CardTitle>
                          <CardDescription>{prompt.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            {/* Sample Conversations */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Conversations</h2>
              <div className="space-y-3">
                {SAMPLE_CONVERSATIONS.map((conversation, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePromptClick(conversation.preview)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{conversation.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{conversation.preview}</p>
                          <div className="flex gap-1">
                            {conversation.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <MessageCircle className="w-4 h-4 text-muted-foreground ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <CardTitle>AI Career Assistant</CardTitle>
              <Badge variant="secondary" className="text-xs">
                Online
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {message.sender === "ai" && <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                        {message.sender === "user" && <User className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          {message.suggestions && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs h-8 bg-background/50 hover:bg-background"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about careers, colleges, entrepreneurship, or anything else..."
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
