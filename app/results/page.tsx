"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import {questions} from "../quiz/page"
import axios from "axios"
import { Loader2 } from "lucide-react";

interface Course {
  id: number
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  rating: number
  students: number
  price: string
  tags: string[]
  image: string
}

const courses: Course[] = [
  {
    id: 1,
    title: "Complete Full Stack Web Development with MERN",
    description: "Master React, Node.js, Express, MongoDB and build industry-ready projects with placement assistance",
    instructor: "Priya Sharma",
    duration: "120 hours",
    level: "Beginner to Advanced",
    rating: 4.8,
    students: 45000,
    price: "₹4,999",
    tags: ["Web Development", "React", "Node.js", "MongoDB", "JavaScript"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning with Python",
    description: "Complete data science course covering pandas, numpy, scikit-learn, and real industry projects",
    instructor: "Rajesh Kumar",
    duration: "80 hours",
    level: "Intermediate",
    rating: 4.7,
    students: 32000,
    price: "₹6,999",
    tags: ["Python", "Data Science", "Machine Learning", "Analytics", "AI"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Android App Development with Kotlin",
    description: "Build modern Android apps with Kotlin, Firebase, and publish to Google Play Store",
    instructor: "Anita Desai",
    duration: "60 hours",
    level: "Beginner to Intermediate",
    rating: 4.6,
    students: 28000,
    price: "₹3,999",
    tags: ["Android", "Kotlin", "Mobile Development", "Firebase"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Cloud Computing with AWS & DevOps",
    description: "Master AWS services, Docker, Kubernetes and become a certified cloud professional",
    instructor: "Vikram Singh",
    duration: "100 hours",
    level: "Intermediate to Advanced",
    rating: 4.9,
    students: 25000,
    price: "₹8,999",
    tags: ["AWS", "Cloud Computing", "DevOps", "Docker", "Kubernetes"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Cybersecurity & Ethical Hacking Bootcamp",
    description: "Learn penetration testing, network security, and ethical hacking with hands-on labs",
    instructor: "Arjun Mehta",
    duration: "90 hours",
    level: "Intermediate",
    rating: 4.5,
    students: 18000,
    price: "₹7,499",
    tags: ["Cybersecurity", "Ethical Hacking", "Network Security", "Penetration Testing"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "UI/UX Design Masterclass with Figma",
    description: "Complete design course covering user research, wireframing, prototyping and design systems",
    instructor: "Sneha Patel",
    duration: "70 hours",
    level: "Beginner to Advanced",
    rating: 4.8,
    students: 22000,
    price: "₹5,499",
    tags: ["UI/UX", "Design", "Figma", "Prototyping", "User Research"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Blockchain Development & Smart Contracts",
    description: "Learn Solidity, Ethereum, Web3.js and build decentralized applications (DApps)",
    instructor: "Rohit Agarwal",
    duration: "85 hours",
    level: "Advanced",
    rating: 4.4,
    students: 12000,
    price: "₹9,999",
    tags: ["Blockchain", "Solidity", "Ethereum", "Web3", "Smart Contracts"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Digital Marketing & SEO Mastery",
    description: "Complete digital marketing course covering SEO, SEM, social media marketing and analytics",
    instructor: "Kavya Reddy",
    duration: "50 hours",
    level: "Beginner",
    rating: 4.6,
    students: 35000,
    price: "₹2,999",
    tags: ["Digital Marketing", "SEO", "SEM", "Social Media", "Analytics"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ResultsPage() {
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [loading,setLoading] = useState(true)



  useEffect(() => {
    // Check if user is logged in and has quiz answers
    const userData = localStorage.getItem("user");
    let quizAnswers = localStorage.getItem("quizAnswers");
    // quizAnswers=JSON.parse(quizAnswers)
    const userSelecetedResponse = [];

    if (!userData || !quizAnswers) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(userData));
    const answers = JSON.parse(quizAnswers);

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i].question;
      const answer = answers[i+1];
      userSelecetedResponse.push({ question, answer });
    }
    const apiData= JSON.stringify(userSelecetedResponse, null, 2);

    async function fetchRecommendations() {
      const response =await axios.post(
        "http://localhost:5000/recommendations",
        apiData
      );

      console.log("Response from backend:", response);
      const data = response.data.recommendations;
      setRecommendedCourses(data);
      setLoading(false);
    }
    fetchRecommendations();

  }, [router])

  const handleRetakeQuiz = () => {
    localStorage.removeItem("quizAnswers")
    router.push("/quiz")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("quizAnswers")
    router.push("/")
  }

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-gray-600 text-lg font-medium">
            Fetching your data, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Personalized Course Recommendations</h1>
          <p className="text-lg text-gray-600 mb-4">
            Hi {user.name || "there"}! Based on your quiz responses, here are the perfect courses for you.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleRetakeQuiz} variant="outline">
              Retake Quiz
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* <div className="aspect-video bg-gray-200 relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoVsKImVceToevBBSP9LIBAyQq8_BsZqf5Og&s"
                  }}
                />
                <Badge className="absolute top-2 right-2 bg-green-500">Recommended</Badge>
              </div> */}
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{course.instructor}</span>
                    <span className="text-2xl font-bold text-green-600">{course.price}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <Award className="w-4 h-4" />
                    <span>{course.level}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full mt-4">Enroll Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Why These Courses?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our recommendation algorithm analyzed your learning goals, interests, experience level, available time,
                and preferred learning style to suggest these courses. Each course is carefully selected to match your
                profile and help you achieve your learning objectives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
