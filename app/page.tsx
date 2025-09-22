"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, BookOpen, TrendingUp, Award, MapPin, Clock, Star } from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedSection } from "@/components/animated-section"
import { motion } from "framer-motion"

export default function HomePage() {
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
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-bold text-foreground">Career Compass</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-6">
              {[
                { href: "/colleges", label: "Colleges" },
                { href: "/careers", label: "Careers" },
                { href: "/entrepreneurship", label: "Entrepreneurship" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "#", label: "About" },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Link href="/profile">
                  <Button size="sm">Get Started</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="secondary" className="mb-6">
              Trusted by 50,000+ Students
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Discover Your Path:
            <motion.span
              className="text-primary block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              College, Career & Entrepreneurship
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Navigate your future with personalized guidance. From choosing the right stream to finding your dream
            college or starting your own venture.
          </motion.p>

          {/* Main Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/profile">
                <Button size="lg" className="text-lg px-8 py-6">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Career & College Guidance
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/entrepreneurship">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Entrepreneurship Path
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Link href="/colleges">
              <Input
                placeholder="Search colleges, courses, or careers..."
                className="pl-12 py-6 text-lg bg-card border-2 border-border focus:border-primary cursor-pointer"
                readOnly
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={15000} suffix="+" />
              </div>
              <div className="text-muted-foreground">Colleges Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={50000} suffix="+" />
              </div>
              <div className="text-muted-foreground">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-muted-foreground">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={1000} suffix="+" />
              </div>
              <div className="text-muted-foreground">Mentors Available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guidance from stream selection to career success
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard
              delay={0.1}
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Personalized Career Quiz"
              description="AI-powered assessment to find your perfect stream and career path"
            />

            <AnimatedCard
              delay={0.2}
              icon={<MapPin className="w-6 h-6 text-secondary" />}
              title="College Search & Compare"
              description="Find and compare colleges near you with detailed information and reviews"
            />

            <AnimatedCard
              delay={0.3}
              icon={<TrendingUp className="w-6 h-6 text-accent" />}
              title="Entrepreneurship Hub"
              description="Learn to validate ideas, build prototypes, and connect with mentors"
            />

            <AnimatedCard
              delay={0.4}
              icon={<Award className="w-6 h-6 text-primary" />}
              title="Scholarship Tracker"
              description="Never miss scholarship deadlines with personalized notifications"
            />

            <AnimatedCard
              delay={0.5}
              icon={<Clock className="w-6 h-6 text-secondary" />}
              title="Admission Timeline"
              description="Stay on track with important dates and application deadlines"
            />

            <AnimatedCard
              delay={0.6}
              icon={<Star className="w-6 h-6 text-accent" />}
              title="Alumni Connect"
              description="Connect with successful alumni for mentorship and guidance"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Shape Your Future?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of students who have found their path with Career Compass
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/profile">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Start Your Journey
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">Career Compass</span>
                </div>
                <p className="text-muted-foreground">
                  Empowering students with personalized career and college guidance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Platform</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="/profile" className="hover:text-foreground transition-colors">
                      Career Quiz
                    </Link>
                  </li>
                  <li>
                    <Link href="/colleges" className="hover:text-foreground transition-colors">
                      College Search
                    </Link>
                  </li>
                  <li>
                    <Link href="/entrepreneurship" className="hover:text-foreground transition-colors">
                      Entrepreneurship
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-foreground transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Mentorship
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Success Stories
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Career Compass. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  )
}
