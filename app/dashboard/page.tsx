"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  MapPin,
  Target,
  Award,
  Lightbulb,
  Clock,
  DollarSign,
  ChevronRight,
  Bell,
  BookmarkIcon,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data - in real app, this would come from user profile/quiz results
  const userData = {
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    class: "12th",
    stream: "Science",
    quizCompleted: true,
    profileCompletion: 85,
  }

  const recommendations = {
    topStreams: [
      { name: "Computer Science Engineering", match: 92, icon: "💻" },
      { name: "Biotechnology", match: 87, icon: "🧬" },
      { name: "Mathematics", match: 83, icon: "📊" },
    ],
    colleges: [
      {
        id: 1,
        name: "IIT Delhi",
        location: "New Delhi",
        course: "Computer Science",
        fees: "₹2.5L/year",
        cutoff: "JEE Rank 150",
        distance: "280 km",
      },
      {
        id: 2,
        name: "BITS Pilani",
        location: "Pilani, Rajasthan",
        course: "Computer Science",
        fees: "₹4.5L/year",
        cutoff: "BITSAT 350+",
        distance: "180 km",
      },
      {
        id: 3,
        name: "NIT Jaipur",
        location: "Jaipur, Rajasthan",
        course: "Computer Science",
        fees: "₹1.8L/year",
        cutoff: "JEE Rank 2500",
        distance: "15 km",
      },
    ],
    careers: [
      {
        title: "Software Engineer",
        avgSalary: "₹8-15 LPA",
        growth: "High",
        skills: ["Programming", "Problem Solving", "Algorithms"],
      },
      {
        title: "Data Scientist",
        avgSalary: "₹10-20 LPA",
        growth: "Very High",
        skills: ["Statistics", "Python", "Machine Learning"],
      },
      {
        title: "Biotechnology Researcher",
        avgSalary: "₹6-12 LPA",
        growth: "Medium",
        skills: ["Research", "Lab Techniques", "Analysis"],
      },
    ],
  }

  const upcomingDeadlines = [
    { exam: "JEE Main 2024", date: "April 15, 2024", daysLeft: 45, type: "entrance" },
    { exam: "BITSAT 2024", date: "May 20, 2024", daysLeft: 80, type: "entrance" },
    { exam: "NEET 2024", date: "May 5, 2024", daysLeft: 65, type: "entrance" },
    { scholarship: "Merit Scholarship", date: "March 30, 2024", daysLeft: 30, type: "scholarship" },
  ]

  const entrepreneurshipProgress = {
    currentModule: "Idea Validation",
    completedModules: 3,
    totalModules: 8,
    badges: ["Innovator", "Problem Solver"],
    nextMilestone: "Business Plan Creation",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
              <p className="text-gray-600 mt-1">Here's your personalized career compass</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm">
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Saved Items
              </Button>
            </div>
          </div>

          {/* Profile Completion */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Profile Completion</h3>
                  <p className="text-blue-100">Complete your profile to get better recommendations</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold mb-2">{userData.profileCompletion}%</div>
                  <Progress value={userData.profileCompletion} className="w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Colleges Explored</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Target className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Career Matches</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Lightbulb className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Ideas Validated</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Streams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Your Top Stream Matches
                </CardTitle>
                <CardDescription>Based on your aptitude quiz results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.topStreams.map((stream, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{stream.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{stream.name}</h4>
                          <p className="text-sm text-gray-600">{stream.match}% match</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Progress value={stream.match} className="w-20 mr-4" />
                        <Button variant="outline" size="sm">
                          Explore
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Important dates you shouldn't miss</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">{deadline.exam || deadline.scholarship}</h4>
                          <p className="text-sm text-gray-600">{deadline.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={deadline.daysLeft <= 30 ? "destructive" : "secondary"}>
                          {deadline.daysLeft} days left
                        </Badge>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            {/* Top College Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Top College Recommendations
                </CardTitle>
                <CardDescription>Colleges that match your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.colleges.map((college) => (
                    <div key={college.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{college.name}</h4>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {college.location} • {college.distance}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{college.course}</Badge>
                            <Badge variant="outline">{college.fees}</Badge>
                            <Badge variant="outline">{college.cutoff}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Compare
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/colleges/${college.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/colleges">View All Colleges</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            {/* Career Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Career Recommendations
                </CardTitle>
                <CardDescription>Careers that align with your interests and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.careers.map((career, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{career.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600 flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {career.avgSalary}
                            </span>
                            <Badge
                              variant={
                                career.growth === "Very High"
                                  ? "default"
                                  : career.growth === "High"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {career.growth} Growth
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/careers/${index + 1}`}>Explore</Link>
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/careers">Explore All Careers</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entrepreneurship" className="space-y-6">
            {/* Entrepreneurship Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Entrepreneurship Journey
                </CardTitle>
                <CardDescription>Your progress in the entrepreneurship learning path</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">
                        {entrepreneurshipProgress.completedModules}/{entrepreneurshipProgress.totalModules} modules
                      </span>
                    </div>
                    <Progress
                      value={(entrepreneurshipProgress.completedModules / entrepreneurshipProgress.totalModules) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Current Module</h4>
                    <p className="text-blue-800">{entrepreneurshipProgress.currentModule}</p>
                    <Button size="sm" className="mt-3">
                      Continue Learning
                    </Button>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Badges Earned</h4>
                    <div className="flex gap-2">
                      {entrepreneurshipProgress.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Next Milestone</h4>
                    <p className="text-gray-600 mb-3">{entrepreneurshipProgress.nextMilestone}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/entrepreneurship">View Details</Link>
                    </Button>
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
