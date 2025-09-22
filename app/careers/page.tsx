"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  BookOpen,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  Target,
  Lightbulb,
  BookMarked,
  Video,
  ExternalLink,
  ChevronRight,
  Star,
  MapPin,
  Building,
} from "lucide-react"
import Link from "next/link"

// Mock career data
const CAREER_PATHS = [
  {
    id: 1,
    title: "Software Engineer",
    category: "Technology",
    stream: "Science",
    description: "Design, develop, and maintain software applications and systems",
    averageSalary: "₹8-25 LPA",
    experience: "Entry to Senior Level",
    growth: "High",
    skills: ["Programming", "Problem Solving", "System Design", "Debugging"],
    education: ["B.Tech Computer Science", "BCA", "MCA", "B.Sc Computer Science"],
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
    jobOutlook: "Excellent",
    workEnvironment: "Office/Remote",
    image: "/placeholder.svg?key=tech1",
  },
  {
    id: 2,
    title: "Doctor (MBBS)",
    category: "Healthcare",
    stream: "Science",
    description: "Diagnose and treat patients, provide medical care and health advice",
    averageSalary: "₹6-50 LPA",
    experience: "Entry to Senior Level",
    growth: "High",
    skills: ["Medical Knowledge", "Patient Care", "Communication", "Critical Thinking"],
    education: ["MBBS", "MD", "MS", "Diploma in Medicine"],
    companies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Private Practice"],
    jobOutlook: "Excellent",
    workEnvironment: "Hospital/Clinic",
    image: "/placeholder.svg?key=med1",
  },
  {
    id: 3,
    title: "Chartered Accountant",
    category: "Finance",
    stream: "Commerce",
    description: "Manage financial records, auditing, taxation, and business advisory",
    averageSalary: "₹6-30 LPA",
    experience: "Entry to Senior Level",
    growth: "High",
    skills: ["Accounting", "Taxation", "Auditing", "Financial Analysis"],
    education: ["CA", "B.Com", "M.Com", "CPA"],
    companies: ["Big 4 Firms", "Banks", "Corporations", "Government", "Practice"],
    jobOutlook: "Very Good",
    workEnvironment: "Office",
    image: "/placeholder.svg?key=fin1",
  },
  {
    id: 4,
    title: "Civil Services Officer",
    category: "Government",
    stream: "Arts",
    description: "Serve in administrative roles in government departments and public service",
    averageSalary: "₹7-20 LPA",
    experience: "Entry to Senior Level",
    growth: "Steady",
    skills: ["Leadership", "Public Administration", "Communication", "Policy Making"],
    education: ["Any Graduate Degree", "UPSC Preparation"],
    companies: ["IAS", "IPS", "IFS", "State Services", "Central Government"],
    jobOutlook: "Good",
    workEnvironment: "Government Office",
    image: "/placeholder.svg?key=gov1",
  },
  {
    id: 5,
    title: "Digital Marketing Manager",
    category: "Marketing",
    stream: "Commerce",
    description: "Plan and execute digital marketing campaigns across various platforms",
    averageSalary: "₹4-15 LPA",
    experience: "Entry to Senior Level",
    growth: "High",
    skills: ["SEO/SEM", "Social Media", "Content Marketing", "Analytics"],
    education: ["BBA", "MBA", "B.Com", "Digital Marketing Courses"],
    companies: ["Startups", "E-commerce", "Agencies", "Corporates"],
    jobOutlook: "Excellent",
    workEnvironment: "Office/Remote",
    image: "/placeholder.svg?key=mark1",
  },
  {
    id: 6,
    title: "Graphic Designer",
    category: "Creative",
    stream: "Arts",
    description: "Create visual concepts and designs for various media and platforms",
    averageSalary: "₹3-12 LPA",
    experience: "Entry to Senior Level",
    growth: "Moderate",
    skills: ["Design Software", "Creativity", "Typography", "Brand Identity"],
    education: ["B.Des", "BFA", "Diploma in Design", "Online Courses"],
    companies: ["Design Studios", "Advertising", "Media", "Freelance"],
    jobOutlook: "Good",
    workEnvironment: "Studio/Remote",
    image: "/placeholder.svg?key=des1",
  },
]

const SKILL_DEVELOPMENT = [
  {
    category: "Technical Skills",
    skills: [
      { name: "Programming", courses: 45, difficulty: "Intermediate", duration: "3-6 months" },
      { name: "Data Analysis", courses: 32, difficulty: "Beginner", duration: "2-4 months" },
      { name: "Web Development", courses: 38, difficulty: "Beginner", duration: "4-8 months" },
      { name: "Machine Learning", courses: 28, difficulty: "Advanced", duration: "6-12 months" },
    ],
  },
  {
    category: "Business Skills",
    skills: [
      { name: "Digital Marketing", courses: 42, difficulty: "Beginner", duration: "2-3 months" },
      { name: "Financial Analysis", courses: 25, difficulty: "Intermediate", duration: "3-5 months" },
      { name: "Project Management", courses: 35, difficulty: "Beginner", duration: "2-4 months" },
      { name: "Business Strategy", courses: 20, difficulty: "Advanced", duration: "4-6 months" },
    ],
  },
  {
    category: "Creative Skills",
    skills: [
      { name: "Graphic Design", courses: 40, difficulty: "Beginner", duration: "3-6 months" },
      { name: "Video Editing", courses: 30, difficulty: "Beginner", duration: "2-4 months" },
      { name: "Content Writing", courses: 35, difficulty: "Beginner", duration: "1-3 months" },
      { name: "Photography", courses: 25, difficulty: "Beginner", duration: "2-5 months" },
    ],
  },
]

const CAREER_RESOURCES = [
  {
    type: "Course",
    title: "Complete Web Development Bootcamp",
    provider: "Coursera",
    rating: 4.8,
    students: "50K+",
    duration: "12 weeks",
    price: "Free",
    category: "Technology",
  },
  {
    type: "Video",
    title: "Career in Data Science - Complete Guide",
    provider: "YouTube",
    rating: 4.6,
    students: "100K+",
    duration: "45 min",
    price: "Free",
    category: "Technology",
  },
  {
    type: "Article",
    title: "How to Become a Chartered Accountant in India",
    provider: "Career Guide",
    rating: 4.7,
    students: "25K+",
    duration: "10 min read",
    price: "Free",
    category: "Finance",
  },
  {
    type: "Course",
    title: "Digital Marketing Fundamentals",
    provider: "Google",
    rating: 4.5,
    students: "200K+",
    duration: "8 weeks",
    price: "Free",
    category: "Marketing",
  },
]

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStream, setSelectedStream] = useState("All Streams")
  const [activeTab, setActiveTab] = useState("explore")

  const categories = [
    "All Categories",
    "Technology",
    "Healthcare",
    "Finance",
    "Government",
    "Marketing",
    "Creative",
    "Engineering",
    "Education",
  ]
  const streams = ["All Streams", "Science", "Commerce", "Arts", "Vocational"]

  const filteredCareers = CAREER_PATHS.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || career.category === selectedCategory
    const matchesStream = selectedStream === "All Streams" || career.stream === selectedStream

    return matchesSearch && matchesCategory && matchesStream
  })

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
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Take Career Quiz
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Guidance Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore career paths, develop skills, and get personalized guidance for your professional journey
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="explore">Explore Careers</TabsTrigger>
            <TabsTrigger value="skills">Skill Development</TabsTrigger>
            <TabsTrigger value="resources">Learning Resources</TabsTrigger>
            <TabsTrigger value="guidance">Career Guidance</TabsTrigger>
          </TabsList>

          {/* Explore Careers Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search careers by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Career Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => (
                <Card key={career.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={career.image || "/placeholder.svg"}
                      alt={career.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{career.category}</Badge>
                      <Badge variant="outline">{career.stream}</Badge>
                    </div>
                    <CardTitle className="text-lg">{career.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>{career.averageSalary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span>{career.growth} Growth</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 text-purple-500" />
                        <span>{career.workEnvironment}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span>{career.jobOutlook}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {career.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {career.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{career.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link href={`/careers/${career.id}`}>
                      <Button className="w-full">
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skill Development Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Develop In-Demand Skills</h2>
              <p className="text-muted-foreground">Build skills that employers are looking for in today's job market</p>
            </div>

            {SKILL_DEVELOPMENT.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge
                            variant={
                              skill.difficulty === "Beginner"
                                ? "secondary"
                                : skill.difficulty === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {skill.difficulty}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Available Courses</span>
                            <span>{skill.courses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration</span>
                            <span>{skill.duration}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full bg-transparent">
                          <BookMarked className="w-4 h-4 mr-2" />
                          View Courses
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Learning Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Learning Resources</h2>
              <p className="text-muted-foreground">Curated courses, videos, and articles to boost your career</p>
            </div>

            <div className="grid gap-6">
              {CAREER_RESOURCES.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{resource.type}</Badge>
                          <Badge variant="secondary">{resource.category}</Badge>
                          {resource.type === "Course" && <BookMarked className="w-4 h-4 text-blue-500" />}
                          {resource.type === "Video" && <Video className="w-4 h-4 text-red-500" />}
                          {resource.type === "Article" && <BookOpen className="w-4 h-4 text-green-500" />}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                        <p className="text-muted-foreground mb-3">by {resource.provider}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{resource.students}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{resource.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-lg font-bold text-green-600">{resource.price}</div>
                        <Button>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Access
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Career Guidance Tab */}
          <TabsContent value="guidance" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Personalized Career Guidance</h2>
              <p className="text-muted-foreground">Get expert advice and personalized recommendations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Career Assessment</CardTitle>
                  <CardDescription>Take our comprehensive quiz to discover your ideal career path</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/profile">
                    <Button className="w-full">Start Assessment</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>1-on-1 Counseling</CardTitle>
                  <CardDescription>Book a session with our career counselors for personalized advice</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Book Session
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Career Roadmap</CardTitle>
                  <CardDescription>Get a step-by-step plan to achieve your career goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Create Roadmap
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Skill Gap Analysis</CardTitle>
                  <CardDescription>Identify skills you need to develop for your target career</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Analyze Skills
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>Industry Insights</CardTitle>
                  <CardDescription>Get latest trends and insights from various industries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Insights
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>Learn from students who achieved their career goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Read Stories
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Your Career Journey Progress</CardTitle>
                <CardDescription>Track your progress towards your career goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">75%</div>
                    <div className="text-sm text-muted-foreground">Profile Completion</div>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Skills Developed</div>
                    <Progress value={60} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-2">12</div>
                    <div className="text-sm text-muted-foreground">Courses Completed</div>
                    <Progress value={80} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
