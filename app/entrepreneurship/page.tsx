"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Lightbulb,
  Target,
  Users,
  Award,
  CheckCircle,
  Play,
  Calendar,
  MessageCircle,
  ExternalLink,
  Rocket,
  DollarSign,
  BarChart3,
  Building,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for entrepreneurship modules
const LEARNING_MODULES = [
  {
    id: 1,
    title: "Idea Generation & Validation",
    description: "Learn to identify problems, generate solutions, and validate your business ideas",
    duration: "2-3 weeks",
    difficulty: "Beginner",
    progress: 0,
    lessons: 8,
    icon: Lightbulb,
    color: "bg-yellow-500",
    topics: ["Problem Identification", "Market Research", "Customer Interviews", "MVP Development"],
  },
  {
    id: 2,
    title: "Business Model Design",
    description: "Create sustainable business models and understand revenue streams",
    duration: "3-4 weeks",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 10,
    icon: Target,
    color: "bg-blue-500",
    topics: ["Business Model Canvas", "Revenue Models", "Cost Structure", "Value Proposition"],
  },
  {
    id: 3,
    title: "Market Analysis & Strategy",
    description: "Analyze your market, competitors, and develop go-to-market strategies",
    duration: "2-3 weeks",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 7,
    icon: BarChart3,
    color: "bg-green-500",
    topics: ["Market Size", "Competitor Analysis", "Positioning", "Marketing Strategy"],
  },
  {
    id: 4,
    title: "Financial Planning",
    description: "Learn financial modeling, funding options, and investment basics",
    duration: "3-4 weeks",
    difficulty: "Advanced",
    progress: 0,
    lessons: 12,
    icon: DollarSign,
    color: "bg-purple-500",
    topics: ["Financial Projections", "Funding Sources", "Investment Terms", "Cash Flow"],
  },
  {
    id: 5,
    title: "Product Development",
    description: "Build prototypes, manage development cycles, and iterate based on feedback",
    duration: "4-6 weeks",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 15,
    icon: Rocket,
    color: "bg-red-500",
    topics: ["Prototyping", "Agile Development", "User Testing", "Product Launch"],
  },
  {
    id: 6,
    title: "Legal & Compliance",
    description: "Understand business registration, intellectual property, and legal requirements",
    duration: "2-3 weeks",
    difficulty: "Beginner",
    progress: 0,
    lessons: 6,
    icon: Building,
    color: "bg-indigo-500",
    topics: ["Business Registration", "IP Protection", "Contracts", "Compliance"],
  },
]

const MENTORS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    title: "Serial Entrepreneur",
    company: "TechStart Ventures",
    experience: "15+ years",
    expertise: ["E-commerce", "SaaS", "Mobile Apps"],
    rating: 4.9,
    sessions: 150,
    image: "/placeholder.svg?key=mentor1",
    bio: "Founded 3 successful startups, raised $50M+ in funding",
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Startup Advisor",
    company: "Innovation Hub",
    experience: "12+ years",
    expertise: ["FinTech", "HealthTech", "EdTech"],
    rating: 4.8,
    sessions: 200,
    image: "/placeholder.svg?key=mentor2",
    bio: "Former VP at leading tech company, now mentoring startups",
  },
  {
    id: 3,
    name: "Amit Patel",
    title: "Investment Partner",
    company: "Growth Capital",
    experience: "10+ years",
    expertise: ["Funding", "Growth Strategy", "Scaling"],
    rating: 4.7,
    sessions: 100,
    image: "/placeholder.svg?key=mentor3",
    bio: "Invested in 50+ startups, expertise in scaling businesses",
  },
]

const STARTUP_COMPETITIONS = [
  {
    id: 1,
    name: "National Startup Challenge",
    organizer: "Government of India",
    prize: "₹10 Lakhs",
    deadline: "March 15, 2024",
    category: "All Sectors",
    participants: "5000+",
    status: "Open",
  },
  {
    id: 2,
    name: "TechCrunch Startup Battlefield",
    organizer: "TechCrunch",
    prize: "$100,000",
    deadline: "April 30, 2024",
    category: "Technology",
    participants: "1000+",
    status: "Open",
  },
  {
    id: 3,
    name: "Social Impact Startup Awards",
    organizer: "Impact Foundation",
    prize: "₹5 Lakhs + Mentorship",
    deadline: "May 20, 2024",
    category: "Social Impact",
    participants: "2000+",
    status: "Open",
  },
]

const SUCCESS_STORIES = [
  {
    id: 1,
    founder: "Ankit Gupta",
    company: "EduTech Solutions",
    sector: "Education Technology",
    founded: "2022",
    valuation: "₹50 Crores",
    story: "Started with online tutoring platform, now serving 100K+ students",
    image: "/placeholder.svg?key=success1",
  },
  {
    id: 2,
    founder: "Sneha Reddy",
    company: "GreenTech Innovations",
    sector: "Clean Energy",
    founded: "2021",
    valuation: "₹30 Crores",
    story: "Developed solar solutions for rural areas, impacting 50K+ households",
    image: "/placeholder.svg?key=success2",
  },
]

export default function EntrepreneurshipPage() {
  const [activeTab, setActiveTab] = useState("learn")
  const [ideaForm, setIdeaForm] = useState({
    problem: "",
    solution: "",
    target: "",
    competition: "",
  })

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle idea validation submission
    console.log("Idea submitted:", ideaForm)
  }

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
              <Link href="/careers">
                <Button variant="outline" size="sm">
                  Career Guidance
                </Button>
              </Link>
              <Link href="/colleges">
                <Button variant="outline" size="sm">
                  Find Colleges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Entrepreneurship Learning Path</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into successful businesses with our comprehensive entrepreneurship program
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="validate">Validate Idea</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="compete">Competitions</TabsTrigger>
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
          </TabsList>

          {/* Learning Modules Tab */}
          <TabsContent value="learn" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Structured Learning Path</h2>
              <p className="text-muted-foreground">
                Master entrepreneurship through our step-by-step modules designed for aspiring entrepreneurs
              </p>
            </div>

            {/* Progress Overview */}
            <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
                <CardDescription>Track your entrepreneurship journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">2/6</div>
                    <div className="text-sm text-muted-foreground">Modules Completed</div>
                    <Progress value={33} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">15</div>
                    <div className="text-sm text-muted-foreground">Lessons Finished</div>
                    <Progress value={60} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-2">8</div>
                    <div className="text-sm text-muted-foreground">Hours Learned</div>
                    <Progress value={40} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Modules */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEARNING_MODULES.map((module) => {
                const IconComponent = module.icon
                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge
                          variant={
                            module.difficulty === "Beginner"
                              ? "secondary"
                              : module.difficulty === "Intermediate"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {module.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{module.lessons} lessons</span>
                        <span>{module.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-sm">Topics Covered</h4>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {module.topics.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{module.topics.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button className="w-full">
                        {module.progress > 0 ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4 mr-2" />
                            Start Module
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Idea Validation Tab */}
          <TabsContent value="validate" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Validate Your Business Idea</h2>
              <p className="text-muted-foreground">
                Get structured feedback and validation for your startup idea through our guided process
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Idea Validation Tool
                  </CardTitle>
                  <CardDescription>Answer these questions to get feedback on your business idea</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleIdeaSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="problem">What problem are you solving?</Label>
                      <Textarea
                        id="problem"
                        placeholder="Describe the problem your idea addresses..."
                        value={ideaForm.problem}
                        onChange={(e) => setIdeaForm((prev) => ({ ...prev, problem: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solution">What is your solution?</Label>
                      <Textarea
                        id="solution"
                        placeholder="Explain your proposed solution..."
                        value={ideaForm.solution}
                        onChange={(e) => setIdeaForm((prev) => ({ ...prev, solution: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target">Who is your target audience?</Label>
                      <Textarea
                        id="target"
                        placeholder="Describe your ideal customers..."
                        value={ideaForm.target}
                        onChange={(e) => setIdeaForm((prev) => ({ ...prev, target: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="competition">What is your competitive advantage?</Label>
                      <Textarea
                        id="competition"
                        placeholder="How are you different from existing solutions..."
                        value={ideaForm.competition}
                        onChange={(e) => setIdeaForm((prev) => ({ ...prev, competition: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Target className="w-4 h-4 mr-2" />
                      Validate My Idea
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Validation Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Problem-Solution Fit</h4>
                          <p className="text-sm text-muted-foreground">
                            Verify that your solution addresses a real problem
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Market Size Analysis</h4>
                          <p className="text-sm text-muted-foreground">Assess the potential market opportunity</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Competitive Landscape</h4>
                          <p className="text-sm text-muted-foreground">Understand your competition and positioning</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Business Model Viability</h4>
                          <p className="text-sm text-muted-foreground">Evaluate revenue potential and sustainability</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        Conduct Customer Interviews
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Create Market Research Survey
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Rocket className="w-4 h-4 mr-2" />
                        Build MVP Prototype
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Connect with Expert Mentors</h2>
              <p className="text-muted-foreground">Get guidance from experienced entrepreneurs and industry experts</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENTORS.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.title}</p>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{mentor.bio}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{mentor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{mentor.sessions} sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{mentor.experience}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-sm">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Book Session
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">Want to Become a Mentor?</h3>
                <p className="text-muted-foreground mb-6">
                  Share your entrepreneurship experience and help the next generation of founders
                </p>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Apply as Mentor
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitions Tab */}
          <TabsContent value="compete" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Startup Competitions & Events</h2>
              <p className="text-muted-foreground">
                Participate in competitions to gain exposure, funding, and valuable feedback
              </p>
            </div>

            <div className="grid gap-6">
              {STARTUP_COMPETITIONS.map((competition) => (
                <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{competition.name}</h3>
                          <Badge variant={competition.status === "Open" ? "default" : "secondary"}>
                            {competition.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">Organized by {competition.organizer}</p>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">Prize Money</div>
                              <div className="font-medium">{competition.prize}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">Deadline</div>
                              <div className="font-medium">{competition.deadline}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">Category</div>
                              <div className="font-medium">{competition.category}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">Participants</div>
                              <div className="font-medium">{competition.participants}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Competition Preparation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Before Applying</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Research the competition thoroughly
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Prepare a compelling pitch deck
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Validate your business model
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Build a working prototype if possible
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">During Presentation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Tell a compelling story
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Focus on the problem and solution
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Show market traction and validation
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Be prepared for tough questions
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Success Stories</h2>
              <p className="text-muted-foreground">
                Get inspired by entrepreneurs who started their journey with Career Compass
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {SUCCESS_STORIES.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{story.company}</CardTitle>
                        <CardDescription>Founded by {story.founder}</CardDescription>
                      </div>
                      <Badge variant="secondary">{story.sector}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Founded</span>
                        <p className="font-medium">{story.founded}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Valuation</span>
                        <p className="font-medium text-green-600">{story.valuation}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{story.story}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">Share Your Success Story</h3>
                <p className="text-muted-foreground mb-6">
                  Inspire other aspiring entrepreneurs by sharing your journey and achievements
                </p>
                <Button>
                  <Star className="w-4 h-4 mr-2" />
                  Submit Your Story
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
