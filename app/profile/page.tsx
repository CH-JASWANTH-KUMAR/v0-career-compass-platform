"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, User, BookOpen, Brain, Target } from "lucide-react"
import Link from "next/link"

const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "interests",
    question: "Which subjects do you find most engaging?",
    type: "multiple",
    options: [
      "Mathematics and Problem Solving",
      "Science and Research",
      "Literature and Writing",
      "History and Social Studies",
      "Art and Creative Expression",
      "Business and Economics",
      "Technology and Programming",
      "Sports and Physical Activities",
    ],
  },
  {
    id: 2,
    category: "skills",
    question: "What are your strongest skills?",
    type: "multiple",
    options: [
      "Analytical Thinking",
      "Creative Problem Solving",
      "Communication",
      "Leadership",
      "Technical Skills",
      "Artistic Abilities",
      "Mathematical Reasoning",
      "Research and Investigation",
    ],
  },
  {
    id: 3,
    category: "career",
    question: "What type of work environment appeals to you most?",
    type: "single",
    options: [
      "Laboratory or Research Facility",
      "Corporate Office",
      "Creative Studio",
      "Outdoor/Field Work",
      "Hospital or Healthcare Setting",
      "Educational Institution",
      "Technology Company",
      "Government Office",
    ],
  },
  {
    id: 4,
    category: "goals",
    question: "What is your primary career goal?",
    type: "single",
    options: [
      "Make scientific discoveries",
      "Build a successful business",
      "Help people and society",
      "Create art or entertainment",
      "Solve complex problems",
      "Teach and educate others",
      "Work with technology",
      "Serve the government/public",
    ],
  },
  {
    id: 5,
    category: "learning",
    question: "How do you prefer to learn?",
    type: "single",
    options: [
      "Hands-on experiments",
      "Reading and research",
      "Group discussions",
      "Visual demonstrations",
      "Practical applications",
      "Creative projects",
      "Problem-solving exercises",
      "Real-world case studies",
    ],
  },
]

const STREAM_RECOMMENDATIONS = {
  science: {
    name: "Science Stream",
    description: "Perfect for analytical minds interested in research, medicine, and technology",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    careers: ["Doctor", "Engineer", "Researcher", "Scientist", "Pharmacist"],
    color: "bg-blue-500",
  },
  commerce: {
    name: "Commerce Stream",
    description: "Ideal for business-minded individuals interested in finance and economics",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    careers: ["CA", "Business Analyst", "Banker", "Entrepreneur", "Financial Advisor"],
    color: "bg-green-500",
  },
  arts: {
    name: "Arts/Humanities Stream",
    description: "Great for creative and socially conscious individuals",
    subjects: ["History", "Political Science", "Psychology", "Literature"],
    careers: ["Lawyer", "Journalist", "Psychologist", "Civil Servant", "Teacher"],
    color: "bg-purple-500",
  },
  vocational: {
    name: "Vocational Stream",
    description: "Perfect for hands-on learners interested in practical skills",
    subjects: ["Computer Applications", "Retail", "Tourism", "Agriculture"],
    careers: ["IT Specialist", "Hotel Manager", "Agricultural Officer", "Retail Manager"],
    color: "bg-orange-500",
  },
}

export default function ProfilePage() {
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    class: "",
    location: "",
    interests: "",
  })
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | string[]>>({})
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleQuizAnswer = (questionId: number, answer: string | string[]) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const calculateRecommendation = () => {
    const scores = {
      science: 0,
      commerce: 0,
      arts: 0,
      vocational: 0,
    }

    // Simple scoring algorithm based on answers
    Object.entries(quizAnswers).forEach(([questionId, answer]) => {
      const answers = Array.isArray(answer) ? answer : [answer]

      answers.forEach((ans) => {
        if (
          ans.includes("Mathematics") ||
          ans.includes("Science") ||
          ans.includes("Research") ||
          ans.includes("Laboratory") ||
          ans.includes("Technical") ||
          ans.includes("scientific")
        ) {
          scores.science += 1
        }
        if (
          ans.includes("Business") ||
          ans.includes("Economics") ||
          ans.includes("Corporate") ||
          ans.includes("Financial") ||
          ans.includes("successful business")
        ) {
          scores.commerce += 1
        }
        if (
          ans.includes("Art") ||
          ans.includes("Creative") ||
          ans.includes("Literature") ||
          ans.includes("History") ||
          ans.includes("Help people") ||
          ans.includes("Creative projects")
        ) {
          scores.arts += 1
        }
        if (
          ans.includes("Technology") ||
          ans.includes("Practical") ||
          ans.includes("Hands-on") ||
          ans.includes("Physical Activities")
        ) {
          scores.vocational += 1
        }
      })
    })

    const recommendedStream = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b,
    )[0]

    setRecommendation(recommendedStream)
    setStep(3)
  }

  const renderProfileForm = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Create Your Profile
        </CardTitle>
        <CardDescription>Tell us about yourself to get personalized recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => setProfileData((prev) => ({ ...prev, age: e.target.value }))}
                placeholder="Your age"
                min="14"
                max="25"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Current Class</Label>
              <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, class: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10th">Class 10th</SelectItem>
                  <SelectItem value="11th">Class 11th</SelectItem>
                  <SelectItem value="12th">Class 12th</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profileData.location}
              onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="City, State"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Brief Description of Your Interests</Label>
            <Textarea
              id="interests"
              value={profileData.interests}
              onChange={(e) => setProfileData((prev) => ({ ...prev, interests: e.target.value }))}
              placeholder="Tell us what you're passionate about..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continue to Career Quiz
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  const renderQuiz = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Career Aptitude Quiz
        </CardTitle>
        <CardDescription>Answer these questions to discover your ideal stream and career path</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {QUIZ_QUESTIONS.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">
                {index + 1}
              </Badge>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">{question.question}</h3>

                {question.type === "single" ? (
                  <RadioGroup
                    value={(quizAnswers[question.id] as string) || ""}
                    onValueChange={(value) => handleQuizAnswer(question.id, value)}
                  >
                    <div className="grid md:grid-cols-2 gap-2">
                      {question.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="grid md:grid-cols-2 gap-2">
                    {question.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${question.id}-${option}`}
                          checked={((quizAnswers[question.id] as string[]) || []).includes(option)}
                          onCheckedChange={(checked) => {
                            const currentAnswers = (quizAnswers[question.id] as string[]) || []
                            if (checked) {
                              handleQuizAnswer(question.id, [...currentAnswers, option])
                            } else {
                              handleQuizAnswer(
                                question.id,
                                currentAnswers.filter((a) => a !== option),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setStep(1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <Button onClick={calculateRecommendation} disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}>
            Get My Recommendation
            <Target className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderResults = () => {
    if (!recommendation) return null

    const streamData = STREAM_RECOMMENDATIONS[recommendation as keyof typeof STREAM_RECOMMENDATIONS]

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Recommended Stream
            </CardTitle>
            <CardDescription>Based on your quiz responses, here's your personalized recommendation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 ${streamData.color} rounded-full mx-auto flex items-center justify-center`}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">{streamData.name}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{streamData.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="font-semibold mb-3">Core Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {streamData.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Career Opportunities</h3>
                <div className="flex flex-wrap gap-2">
                  {streamData.careers.map((career) => (
                    <Badge key={career} variant="outline">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/colleges">
                <Button size="lg">Find Colleges for {streamData.name}</Button>
              </Link>
              <Button size="lg" variant="outline">
                Explore Career Paths
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Research colleges offering {streamData.name}</li>
                <li>• Connect with alumni in your field</li>
                <li>• Explore scholarship opportunities</li>
                <li>• Start building relevant skills</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Free online courses</li>
                <li>• Career guidance videos</li>
                <li>• Industry expert interviews</li>
                <li>• Skill assessment tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 1-on-1 counseling sessions</li>
                <li>• Parent guidance workshops</li>
                <li>• Peer discussion groups</li>
                <li>• 24/7 chat support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
              <Progress value={progress} className="w-32" />
              <span className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        {step === 1 && renderProfileForm()}
        {step === 2 && renderQuiz()}
        {step === 3 && renderResults()}
      </main>
    </div>
  )
}
