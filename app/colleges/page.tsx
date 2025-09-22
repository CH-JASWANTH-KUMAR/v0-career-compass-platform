"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  MapPin,
  BookOpen,
  Star,
  Filter,
  Heart,
  Compass as Compare,
  GraduationCap,
  Building,
  DollarSign,
  Award,
} from "lucide-react"
import Link from "next/link"
import { ExternalLinkButton } from "@/components/external-link-button"

// Mock college data - in a real app, this would come from a database
const COLLEGES_DATA = [
  {
    id: 1,
    name: "Delhi University",
    location: "New Delhi, Delhi",
    type: "Government",
    established: 1922,
    rating: 4.5,
    fees: "₹15,000 - ₹50,000",
    streams: ["Science", "Commerce", "Arts"],
    courses: ["B.Sc", "B.Com", "B.A", "M.Sc", "M.Com", "M.A"],
    cutoff: "85%",
    hostel: true,
    placement: "85%",
    image: "/bustling-university-campus.png",
    description: "One of India's premier universities offering diverse undergraduate and postgraduate programs.",
    highlights: ["NAAC A+ Grade", "Top Rankings", "Research Excellence", "Alumni Network"],
  },
  {
    id: 2,
    name: "Jawaharlal Nehru University",
    location: "New Delhi, Delhi",
    type: "Government",
    established: 1969,
    rating: 4.3,
    fees: "₹10,000 - ₹30,000",
    streams: ["Arts", "Science"],
    courses: ["B.A", "M.A", "M.Sc", "Ph.D"],
    cutoff: "80%",
    hostel: true,
    placement: "75%",
    image: "/modern-university.png",
    description: "Renowned for social sciences and research programs with excellent faculty.",
    highlights: ["Research Focus", "International Recognition", "Diverse Programs", "Campus Life"],
  },
  {
    id: 3,
    name: "St. Xavier's College",
    location: "Mumbai, Maharashtra",
    type: "Private",
    established: 1869,
    rating: 4.4,
    fees: "₹25,000 - ₹75,000",
    streams: ["Science", "Commerce", "Arts"],
    courses: ["B.Sc", "B.Com", "B.A", "BMS", "BMM"],
    cutoff: "90%",
    hostel: false,
    placement: "90%",
    image: "/historic-college-building.jpg",
    description: "Premier autonomous college known for academic excellence and holistic development.",
    highlights: ["Autonomous Status", "Industry Connect", "Cultural Activities", "Alumni Success"],
  },
  {
    id: 4,
    name: "Loyola College",
    location: "Chennai, Tamil Nadu",
    type: "Private",
    established: 1925,
    rating: 4.2,
    fees: "₹20,000 - ₹60,000",
    streams: ["Science", "Commerce", "Arts"],
    courses: ["B.Sc", "B.Com", "B.A", "BBA", "BCA"],
    cutoff: "85%",
    hostel: true,
    placement: "80%",
    image: "/college-campus-with-gardens.jpg",
    description: "Jesuit institution focusing on value-based education and character formation.",
    highlights: ["Value Education", "Research Programs", "Sports Excellence", "Social Service"],
  },
  {
    id: 5,
    name: "Presidency University",
    location: "Kolkata, West Bengal",
    type: "Government",
    established: 1817,
    rating: 4.1,
    fees: "₹12,000 - ₹40,000",
    streams: ["Science", "Arts"],
    courses: ["B.Sc", "B.A", "M.Sc", "M.A"],
    cutoff: "82%",
    hostel: true,
    placement: "70%",
    image: "/heritage-university-building.jpg",
    description: "Historic institution with strong tradition in liberal arts and sciences.",
    highlights: ["Historic Legacy", "Notable Alumni", "Research Culture", "Academic Rigor"],
  },
  {
    id: 6,
    name: "Christ University",
    location: "Bangalore, Karnataka",
    type: "Private",
    established: 1969,
    rating: 4.3,
    fees: "₹30,000 - ₹80,000",
    streams: ["Science", "Commerce", "Arts"],
    courses: ["B.Sc", "B.Com", "B.A", "BBA", "BCA", "B.Tech"],
    cutoff: "88%",
    hostel: true,
    placement: "85%",
    image: "/modern-university-campus.png",
    description: "Deemed university known for innovative programs and industry partnerships.",
    highlights: ["Industry Partnerships", "Innovation Hub", "Global Exposure", "Skill Development"],
  },
]

const STATES = [
  "All States",
  "Delhi",
  "Maharashtra",
  "Tamil Nadu",
  "West Bengal",
  "Karnataka",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan",
  "Punjab",
  "Haryana",
]

const STREAMS = ["All Streams", "Science", "Commerce", "Arts", "Vocational"]
const COLLEGE_TYPES = ["All Types", "Government", "Private", "Deemed"]

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedStream, setSelectedStream] = useState("All Streams")
  const [selectedType, setSelectedType] = useState("All Types")
  const [feeRange, setFeeRange] = useState([0, 100000])
  const [hasHostel, setHasHostel] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [savedColleges, setSavedColleges] = useState<number[]>([])
  const [compareList, setCompareList] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredColleges = useMemo(() => {
    return COLLEGES_DATA.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesState = selectedState === "All States" || college.location.includes(selectedState)

      const matchesStream = selectedStream === "All Streams" || college.streams.includes(selectedStream)

      const matchesType = selectedType === "All Types" || college.type === selectedType

      const matchesHostel = !hasHostel || college.hostel

      const matchesRating = college.rating >= minRating

      return matchesSearch && matchesState && matchesStream && matchesType && matchesHostel && matchesRating
    })
  }, [searchQuery, selectedState, selectedStream, selectedType, hasHostel, minRating])

  const toggleSaved = (collegeId: number) => {
    setSavedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId],
    )
  }

  const toggleCompare = (collegeId: number) => {
    setCompareList((prev) => {
      if (prev.includes(collegeId)) {
        return prev.filter((id) => id !== collegeId)
      } else if (prev.length < 3) {
        return [...prev, collegeId]
      }
      return prev
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedState("All States")
    setSelectedStream("All Streams")
    setSelectedType("All Types")
    setFeeRange([0, 100000])
    setHasHostel(false)
    setMinRating(0)
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
              {compareList.length > 0 && (
                <Button variant="outline" size="sm">
                  <Compare className="w-4 h-4 mr-2" />
                  Compare ({compareList.length})
                </Button>
              )}
              <Button variant="outline" size="sm">
                Saved ({savedColleges.length})
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect College</h1>
          <p className="text-muted-foreground">
            Discover and compare colleges across India with detailed information and reviews
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search colleges by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStream} onValueChange={setSelectedStream}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Stream" />
              </SelectTrigger>
              <SelectContent>
                {STREAMS.map((stream) => (
                  <SelectItem key={stream} value={stream}>
                    {stream}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="College Type" />
              </SelectTrigger>
              <SelectContent>
                {COLLEGE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>

            {(searchQuery ||
              selectedState !== "All States" ||
              selectedStream !== "All Streams" ||
              selectedType !== "All Types" ||
              hasHostel ||
              minRating > 0) && (
              <Button variant="ghost" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Minimum Rating</Label>
                    <Slider
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                      max={5}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">{minRating.toFixed(1)} stars and above</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hostel"
                        checked={hasHostel}
                        onCheckedChange={(checked) => setHasHostel(checked as boolean)}
                      />
                      <Label htmlFor="hostel">Has Hostel Facility</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Showing {filteredColleges.length} colleges</p>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="fees">Lowest Fees</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="established">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* College Cards */}
          <div className="grid gap-6">
            {filteredColleges.map((college) => (
              <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-80 h-48 md:h-auto">
                    <img
                      src={college.image || "/placeholder.svg"}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{college.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
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
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{college.rating}</span>
                          </div>
                          <Badge variant="secondary">{college.cutoff} Cutoff</Badge>
                          {college.hostel && <Badge variant="outline">Hostel</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaved(college.id)}
                          className={savedColleges.includes(college.id) ? "text-red-500" : ""}
                        >
                          <Heart className={`w-4 h-4 ${savedColleges.includes(college.id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCompare(college.id)}
                          disabled={compareList.length >= 3 && !compareList.includes(college.id)}
                          className={compareList.includes(college.id) ? "bg-primary text-primary-foreground" : ""}
                        >
                          <Compare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{college.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Streams Offered</h4>
                        <div className="flex flex-wrap gap-1">
                          {college.streams.map((stream) => (
                            <Badge key={stream} variant="secondary" className="text-xs">
                              {stream}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Popular Courses</h4>
                        <div className="flex flex-wrap gap-1">
                          {college.courses.slice(0, 4).map((course) => (
                            <Badge key={course} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                          {college.courses.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{college.courses.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {college.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">{college.fees}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Placement: </span>
                          <span className="font-medium">{college.placement}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <ExternalLinkButton
                          href={`https://www.google.com/search?q=${encodeURIComponent(college.name + " official website")}`}
                          variant="outline"
                          size="sm"
                        >
                          Visit Website
                        </ExternalLinkButton>
                        <Link href={`/colleges/${college.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No colleges found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
