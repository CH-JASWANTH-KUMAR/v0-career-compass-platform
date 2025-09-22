"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BookOpen, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ExamPortalCard } from "@/components/exam-portal-card"
import { AnimatedSection } from "@/components/animated-section"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ExternalLink from "@/components/external-link"

// Official exam data with real URLs
const EXAM_DATA = [
  {
    id: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination Main",
    category: "Engineering",
    registrationUrl: "https://jeemain.nta.nic.in/",
    admitCardUrl: "https://jeemain.nta.nic.in/",
    resultUrl: "https://jeemain.nta.nic.in/",
    websiteUrl: "https://jeemain.nta.nic.in/",
    registrationStart: "December 2024",
    registrationEnd: "January 2025",
    examDate: "January - April 2025",
    description: "National level entrance exam for admission to NITs, IIITs, and other engineering colleges",
    eligibility: ["12th Pass", "Physics, Chemistry, Maths", "Age: 17-25 years"],
    status: "upcoming" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination Advanced",
    category: "Engineering",
    registrationUrl: "https://jeeadv.ac.in/",
    admitCardUrl: "https://jeeadv.ac.in/",
    resultUrl: "https://jeeadv.ac.in/",
    websiteUrl: "https://jeeadv.ac.in/",
    registrationStart: "May 2025",
    registrationEnd: "May 2025",
    examDate: "May 2025",
    description: "Entrance exam for admission to Indian Institutes of Technology (IITs)",
    eligibility: ["JEE Main Qualified", "Top 2.5 lakh ranks", "Age: Under 25"],
    status: "upcoming" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    category: "Medical",
    registrationUrl: "https://neet.nta.nic.in/",
    admitCardUrl: "https://neet.nta.nic.in/",
    resultUrl: "https://neet.nta.nic.in/",
    websiteUrl: "https://neet.nta.nic.in/",
    registrationStart: "February 2025",
    registrationEnd: "March 2025",
    examDate: "May 2025",
    description: "National level entrance exam for MBBS, BDS, and other medical courses",
    eligibility: ["12th Pass", "Physics, Chemistry, Biology", "Age: 17-25 years"],
    status: "upcoming" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "upsc-cse",
    name: "UPSC CSE",
    fullName: "Civil Services Examination",
    category: "Government",
    registrationUrl: "https://upsconline.nic.in/",
    admitCardUrl: "https://upsconline.nic.in/",
    resultUrl: "https://upsc.gov.in/",
    websiteUrl: "https://upsc.gov.in/",
    registrationStart: "February 2025",
    registrationEnd: "March 2025",
    examDate: "June 2025",
    description: "Premier examination for recruitment to various Civil Services of Government of India",
    eligibility: ["Graduate Degree", "Age: 21-32 years", "Indian Citizen"],
    status: "upcoming" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission Combined Graduate Level",
    category: "Government",
    registrationUrl: "https://ssc.nic.in/",
    admitCardUrl: "https://ssc.nic.in/",
    resultUrl: "https://ssc.nic.in/",
    websiteUrl: "https://ssc.nic.in/",
    registrationStart: "March 2025",
    registrationEnd: "April 2025",
    examDate: "June - July 2025",
    description: "Recruitment exam for various Group B and Group C posts in Government departments",
    eligibility: ["Graduate Degree", "Age: 18-32 years", "Indian Citizen"],
    status: "upcoming" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    category: "Management",
    registrationUrl: "https://iimcat.ac.in/",
    admitCardUrl: "https://iimcat.ac.in/",
    resultUrl: "https://iimcat.ac.in/",
    websiteUrl: "https://iimcat.ac.in/",
    registrationStart: "August 2024",
    registrationEnd: "September 2024",
    examDate: "November 2024",
    description: "Entrance exam for admission to Indian Institutes of Management (IIMs)",
    eligibility: ["Graduate Degree", "50% marks", "Final year students eligible"],
    status: "completed" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    category: "Engineering",
    registrationUrl: "https://gate.iisc.ac.in/",
    admitCardUrl: "https://gate.iisc.ac.in/",
    resultUrl: "https://gate.iisc.ac.in/",
    websiteUrl: "https://gate.iisc.ac.in/",
    registrationStart: "August 2024",
    registrationEnd: "September 2024",
    examDate: "February 2025",
    description: "Entrance exam for M.Tech admissions and PSU recruitments",
    eligibility: ["B.Tech/B.E.", "Final year students eligible", "No age limit"],
    status: "open" as const,
    lastUpdated: "December 15, 2024",
  },
  {
    id: "clat",
    name: "CLAT",
    fullName: "Common Law Admission Test",
    category: "Law",
    registrationUrl: "https://consortiumofnlus.ac.in/",
    admitCardUrl: "https://consortiumofnlus.ac.in/",
    resultUrl: "https://consortiumofnlus.ac.in/",
    websiteUrl: "https://consortiumofnlus.ac.in/",
    registrationStart: "January 2025",
    registrationEnd: "March 2025",
    examDate: "May 2025",
    description: "Entrance exam for admission to National Law Universities",
    eligibility: ["12th Pass", "45% marks", "Age: Under 20 for UG"],
    status: "upcoming" as const,
    lastUpdated: "December 15, 2024",
  },
]

const CATEGORIES = ["All Categories", "Engineering", "Medical", "Government", "Management", "Law"]
const STATUSES = ["All Status", "open", "upcoming", "closed", "completed"]

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const filteredExams = EXAM_DATA.filter((exam) => {
    const matchesSearch =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || exam.category === selectedCategory
    const matchesStatus = selectedStatus === "All Status" || exam.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const openExams = EXAM_DATA.filter((exam) => exam.status === "open")
  const upcomingExams = EXAM_DATA.filter((exam) => exam.status === "upcoming")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Career Compass</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/colleges">
                <Button variant="outline" size="sm">
                  Find Colleges
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" size="sm">
                  Career Guidance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Competitive Exam Portals</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Direct access to official registration portals, admit cards, and results for major competitive exams
          </p>
        </AnimatedSection>

        {/* Important Notice */}
        <AnimatedSection delay={0.2}>
          <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Official Links Only</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    All exam links redirect to official government portals. Always verify URLs and never share personal
                    information on unofficial sites.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Quick Stats */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">{openExams.length}</div>
              <div className="text-sm text-muted-foreground">Registration Open</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{upcomingExams.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming Exams</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-1">{EXAM_DATA.length}</div>
              <div className="text-sm text-muted-foreground">Total Exams</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Official Links</div>
            </Card>
          </div>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection delay={0.4}>
          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search exams by name or description..."
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
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "All Status" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || selectedCategory !== "All Categories" || selectedStatus !== "All Status") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                    setSelectedStatus("All Status")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Showing {filteredExams.length} exam{filteredExams.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last updated: December 15, 2024</span>
            </div>
          </div>

          {/* Exam Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam, index) => (
              <ExamPortalCard key={exam.id} exam={exam} delay={index * 0.1} />
            ))}
          </div>

          {filteredExams.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No exams found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                    setSelectedStatus("All Status")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Additional Resources */}
        <AnimatedSection delay={0.6}>
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Official government portals for education and career guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "National Testing Agency",
                    url: "https://nta.ac.in/",
                    description: "Central testing agency for major exams",
                  },
                  {
                    name: "National Scholarship Portal",
                    url: "https://scholarships.gov.in/",
                    description: "Apply for government scholarships",
                  },
                  { name: "UGC India", url: "https://www.ugc.gov.in/", description: "University Grants Commission" },
                  {
                    name: "NIRF Rankings",
                    url: "https://www.nirfindia.org/",
                    description: "National Institutional Ranking Framework",
                  },
                  {
                    name: "AICTE",
                    url: "https://www.aicte-india.org/",
                    description: "All India Council for Technical Education",
                  },
                  {
                    name: "Ministry of Education",
                    url: "https://www.education.gov.in/",
                    description: "Government of India Education Portal",
                  },
                ].map((resource, index) => (
                  <motion.div key={resource.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 text-left justify-start bg-transparent"
                      onClick={() => {
                        toast.info("You're leaving Career Compass — opening official site")
                        setTimeout(() => {
                          window.open(resource.url, "_blank", "noopener,noreferrer")
                        }, 500)
                      }}
                    >
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {resource.name}
                          <ExternalLink className="w-3 h-3" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{resource.description}</div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
