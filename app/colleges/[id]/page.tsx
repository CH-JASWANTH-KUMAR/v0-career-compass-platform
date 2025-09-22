"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  ExternalLink,
  GraduationCap,
  Building,
  Award,
  Calendar,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock detailed college data
const getCollegeDetails = (id: string) => ({
  id: Number.parseInt(id),
  name: "Delhi University",
  location: "New Delhi, Delhi",
  type: "Government",
  established: 1922,
  rating: 4.5,
  reviews: 1250,
  fees: "₹15,000 - ₹50,000",
  streams: ["Science", "Commerce", "Arts"],
  courses: ["B.Sc", "B.Com", "B.A", "M.Sc", "M.Com", "M.A"],
  cutoff: "85%",
  hostel: true,
  placement: "85%",
  images: [
    "/university-main-building.jpg",
    "/university-library-interior.png",
    "/university-campus-grounds.jpg",
    "/university-hostel.jpg",
  ],
  description:
    "The University of Delhi is a premier university of the country and is known for its high standards in teaching and research and attracts eminent scholars to its faculty.",
  highlights: ["NAAC A+ Grade", "Top Rankings", "Research Excellence", "Alumni Network"],
  contact: {
    phone: "+91-11-27666666",
    email: "info@du.ac.in",
    website: "www.du.ac.in",
    address: "University of Delhi, Delhi - 110007",
  },
  admissions: {
    process: "Merit-based admission through CUET",
    deadline: "June 30, 2024",
    documents: ["Class 12 Marksheet", "CUET Scorecard", "Category Certificate", "Character Certificate"],
    eligibility: "Minimum 60% in Class 12 for general category",
  },
  facilities: [
    { name: "Library", description: "Central library with 1.3 million books" },
    { name: "Sports Complex", description: "Multi-sport facilities and gymnasium" },
    { name: "Hostels", description: "Separate hostels for boys and girls" },
    { name: "Medical Center", description: "24/7 medical facilities" },
    { name: "Cafeteria", description: "Multiple dining options across campus" },
    { name: "Wi-Fi", description: "Campus-wide high-speed internet" },
  ],
  placements: {
    percentage: 85,
    averagePackage: "₹6.5 LPA",
    highestPackage: "₹25 LPA",
    topRecruiters: ["TCS", "Infosys", "Wipro", "Deloitte", "KPMG", "Amazon"],
  },
  courses_detailed: [
    {
      name: "Bachelor of Science (B.Sc)",
      duration: "3 years",
      fees: "₹15,000/year",
      seats: 500,
      specializations: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
    },
    {
      name: "Bachelor of Commerce (B.Com)",
      duration: "3 years",
      fees: "₹12,000/year",
      seats: 400,
      specializations: ["General", "Honours"],
    },
    {
      name: "Bachelor of Arts (B.A)",
      duration: "3 years",
      fees: "₹10,000/year",
      seats: 600,
      specializations: ["English", "Hindi", "History", "Political Science", "Economics"],
    },
  ],
  rankings: [
    { agency: "NIRF", rank: 12, category: "Overall" },
    { agency: "QS World", rank: 501, category: "Global" },
    { agency: "Times Higher Education", rank: 401, category: "World" },
  ],
})

export default function CollegeDetailPage() {
  const params = useParams()
  const college = getCollegeDetails(params.id as string)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/colleges" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Colleges</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={college.images[0] || "/placeholder.svg"}
                alt={college.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {college.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white">
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-16 h-16 rounded-lg bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                  +{college.images.length - 4}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{college.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {college.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {college.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    Est. {college.established}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{college.rating}</span>
                    <span className="text-muted-foreground">({college.reviews} reviews)</span>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {college.cutoff} Cutoff
                  </Badge>
                  {college.hostel && <Badge variant="outline">Hostel Available</Badge>}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{college.description}</p>

              <div className="flex flex-wrap gap-2">
                {college.highlights.map((highlight) => (
                  <Badge key={highlight} variant="secondary">
                    <Award className="w-3 h-3 mr-1" />
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Fees</span>
                  <span className="font-medium">{college.fees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Placement Rate</span>
                  <span className="font-medium">{college.placement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Package</span>
                  <span className="font-medium">{college.placements.averagePackage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Highest Package</span>
                  <span className="font-medium">{college.placements.highestPackage}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{college.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{college.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{college.contact.website}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{college.contact.address}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {college.courses_detailed.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{course.name}</span>
                      <Badge variant="outline">{course.duration}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-muted-foreground">Annual Fees</span>
                        <p className="font-medium">{course.fees}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Seats</span>
                        <p className="font-medium">{course.seats}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration</span>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Specializations</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {course.specializations.map((spec) => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admission Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Selection Process</h4>
                  <p className="text-muted-foreground">{college.admissions.process}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Application Deadline</h4>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{college.admissions.deadline}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                  <p className="text-muted-foreground">{college.admissions.eligibility}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Required Documents</h4>
                  <ul className="space-y-1">
                    {college.admissions.documents.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Placement Rate</span>
                      <span className="font-medium">{college.placements.percentage}%</span>
                    </div>
                    <Progress value={college.placements.percentage} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground">Average Package</span>
                      <p className="font-bold text-lg">{college.placements.averagePackage}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Highest Package</span>
                      <p className="font-bold text-lg">{college.placements.highestPackage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Recruiters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {college.placements.topRecruiters.map((recruiter) => (
                      <Badge key={recruiter} variant="outline" className="justify-center">
                        {recruiter}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {college.facilities.map((facility, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{facility.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{facility.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rankings" className="space-y-6">
            <div className="grid gap-4">
              {college.rankings.map((ranking, index) => (
                <Card key={index}>
                  <CardContent className="flex justify-between items-center p-6">
                    <div>
                      <h4 className="font-medium">{ranking.agency}</h4>
                      <p className="text-muted-foreground">{ranking.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">#{ranking.rank}</div>
                      <TrendingUp className="w-4 h-4 text-green-500 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>Reviews and ratings from current and former students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Reviews feature coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
