"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  BookOpen,
  DollarSign,
  TrendingUp,
  Users,
  Building,
  Target,
  CheckCircle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock detailed career data
const getCareerDetails = (id: string) => ({
  id: Number.parseInt(id),
  title: "Software Engineer",
  category: "Technology",
  stream: "Science",
  description:
    "Software engineers design, develop, test, and maintain software applications and systems. They work with programming languages, frameworks, and tools to create solutions that meet user needs and business requirements.",
  averageSalary: "₹8-25 LPA",
  experience: "Entry to Senior Level",
  growth: "High",
  skills: ["Programming", "Problem Solving", "System Design", "Debugging", "Version Control", "Testing"],
  education: ["B.Tech Computer Science", "BCA", "MCA", "B.Sc Computer Science"],
  companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Accenture"],
  jobOutlook: "Excellent",
  workEnvironment: "Office/Remote",
  image: "/placeholder.svg?key=tech-detail",

  detailedInfo: {
    responsibilities: [
      "Design and develop software applications",
      "Write clean, maintainable code",
      "Debug and troubleshoot issues",
      "Collaborate with cross-functional teams",
      "Participate in code reviews",
      "Stay updated with latest technologies",
    ],
    workingConditions: {
      environment: "Primarily office-based with remote work options",
      hours: "Standard 40-hour work week, may include occasional overtime",
      travel: "Minimal travel required",
      physicalDemands: "Sedentary work with extensive computer use",
    },
    careerPath: [
      { level: "Junior Developer", experience: "0-2 years", salary: "₹3-8 LPA" },
      { level: "Software Engineer", experience: "2-5 years", salary: "₹8-15 LPA" },
      { level: "Senior Engineer", experience: "5-8 years", salary: "₹15-25 LPA" },
      { level: "Tech Lead", experience: "8-12 years", salary: "₹25-40 LPA" },
      { level: "Engineering Manager", experience: "12+ years", salary: "₹40+ LPA" },
    ],
    industryTrends: [
      "Growing demand for AI/ML engineers",
      "Increased focus on cloud computing",
      "Rise of DevOps and automation",
      "Emphasis on cybersecurity",
      "Mobile-first development approach",
    ],
  },

  requiredSkills: [
    { name: "Programming Languages", level: 90, description: "Java, Python, JavaScript, C++" },
    { name: "Problem Solving", level: 85, description: "Analytical thinking and debugging" },
    { name: "System Design", level: 75, description: "Architecture and scalability" },
    { name: "Database Management", level: 70, description: "SQL, NoSQL databases" },
    { name: "Version Control", level: 80, description: "Git, SVN" },
    { name: "Testing", level: 65, description: "Unit testing, integration testing" },
  ],

  learningPath: [
    {
      phase: "Foundation",
      duration: "3-6 months",
      topics: ["Programming Basics", "Data Structures", "Algorithms", "Computer Science Fundamentals"],
      resources: ["Online Courses", "Coding Practice", "Books"],
    },
    {
      phase: "Intermediate",
      duration: "6-12 months",
      topics: ["Web Development", "Database Design", "Software Engineering", "Version Control"],
      resources: ["Projects", "Internships", "Bootcamps"],
    },
    {
      phase: "Advanced",
      duration: "12+ months",
      topics: ["System Design", "Cloud Computing", "DevOps", "Specialized Technologies"],
      resources: ["Industry Experience", "Certifications", "Open Source"],
    },
  ],

  salaryBreakdown: {
    fresher: "₹3-8 LPA",
    experienced: "₹8-15 LPA",
    senior: "₹15-25 LPA",
    factors: [
      "Company size and reputation",
      "Location (metro vs non-metro)",
      "Specialization (AI/ML, Full-stack, etc.)",
      "Educational background",
      "Certifications and skills",
    ],
  },
})

export default function CareerDetailPage() {
  const params = useParams()
  const career = getCareerDetails(params.id as string)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/careers" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Careers</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Save Career
              </Button>
              <Button size="sm">Start Learning Path</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img src={career.image || "/placeholder.svg"} alt={career.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <Badge variant="secondary" className="mb-2">
                  {career.category}
                </Badge>
                <h1 className="text-2xl font-bold">{career.title}</h1>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{career.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Salary: {career.averageSalary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Growth: {career.growth}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Environment: {career.workEnvironment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Outlook: {career.jobOutlook}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Required Education</h4>
                  <div className="space-y-1">
                    {career.education.map((edu) => (
                      <Badge key={edu} variant="outline" className="mr-1 mb-1">
                        {edu}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Top Employers</h4>
                  <div className="space-y-1">
                    {career.companies.slice(0, 5).map((company) => (
                      <div key={company} className="text-sm text-muted-foreground">
                        • {company}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">85%</div>
                  <p className="text-sm text-muted-foreground mb-4">Based on your profile</p>
                  <Progress value={85} className="mb-4" />
                  <Button className="w-full">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Personalized Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="path">Career Path</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {career.detailedInfo.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Working Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Environment</h4>
                    <p className="text-sm text-muted-foreground">{career.detailedInfo.workingConditions.environment}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Working Hours</h4>
                    <p className="text-sm text-muted-foreground">{career.detailedInfo.workingConditions.hours}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Travel Requirements</h4>
                    <p className="text-sm text-muted-foreground">{career.detailedInfo.workingConditions.travel}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Skills & Proficiency</CardTitle>
                <CardDescription>Skills needed for this career and their importance levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {career.requiredSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{skill.name}</h4>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} />
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="path" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Progression Path</CardTitle>
                <CardDescription>Typical career advancement opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {career.detailedInfo.careerPath.map((level, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{level.level}</h4>
                        <p className="text-sm text-muted-foreground">{level.experience}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{level.salary}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
                <CardDescription>Structured approach to develop required skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {career.learningPath.map((phase, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{phase.phase} Phase</h3>
                          <p className="text-sm text-muted-foreground">Duration: {phase.duration}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Topics to Learn</h4>
                          <div className="flex flex-wrap gap-1">
                            {phase.topics.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Learning Resources</h4>
                          <div className="flex flex-wrap gap-1">
                            {phase.resources.map((resource) => (
                              <Badge key={resource} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Salary Ranges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Fresher (0-2 years)</span>
                    <span className="font-medium">{career.salaryBreakdown.fresher}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Experienced (2-5 years)</span>
                    <span className="font-medium">{career.salaryBreakdown.experienced}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Senior (5+ years)</span>
                    <span className="font-medium">{career.salaryBreakdown.senior}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {career.salaryBreakdown.factors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Trends</CardTitle>
                <CardDescription>Current trends shaping this career field</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {career.detailedInfo.industryTrends.map((trend, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                      <span>{trend}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take the first step towards becoming a {career.title} with our personalized learning path and career
              guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning Path
              </Button>
              <Button size="lg" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Connect with Professionals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
