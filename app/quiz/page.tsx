"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { QuizQuestion } from "@/components/quiz-question"

export const questions = [
  // Section A: Student Profile
  {
    id: 1,
    section: "Student Profile",
    question: "What is your name?",
    type: "text" as const,
    placeholder: "Enter your full name",
  },
  {
    id: 2,
    section: "Student Profile",
    question: "What is your age?",
    type: "number" as const,
    placeholder: "Enter your age",
  },
  {
    id: 3,
    section: "Student Profile",
    question: "What is your gender?",
    type: "radio" as const,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "non-binary", label: "Non-binary" },
      { value: "prefer-not-to-say", label: "Prefer not to say" },
    ],
  },
  {
    id: 4,
    section: "Student Profile",
    question: "What is your institution name?",
    type: "text" as const,
    placeholder: "Enter your college/university name",
  },
  {
    id: 5,
    section: "Student Profile",
    question: "What is your degree program?",
    type: "radio" as const,
    options: [
      { value: "btech-cs", label: "B.Tech/B.E. in Computer Science / IT" },
      { value: "bsc-cs", label: "B.Sc. Computer Science" },
      { value: "bca", label: "BCA" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: 6,
    section: "Student Profile",
    question: "What is your current year of study?",
    type: "radio" as const,
    options: [
      { value: "1st", label: "1st Year" },
      { value: "2nd", label: "2nd Year" },
      { value: "3rd", label: "3rd Year" },
      { value: "final", label: "Final Year" },
    ],
  },
  // Section B: Background Knowledge
  {
    id: 7,
    section: "Background Knowledge",
    question: "Which of the following core subjects have you completed?",
    type: "checkbox" as const,
    options: [
      { value: "programming", label: "Programming in C/C++/Java" },
      { value: "dsa", label: "Data Structures and Algorithms" },
      { value: "dbms", label: "Database Management Systems" },
      { value: "os", label: "Operating Systems" },
      { value: "networks", label: "Computer Networks" },
      { value: "oop", label: "Object-Oriented Programming" },
      { value: "web-tech", label: "Web Technologies" },
    ],
  },
  {
    id: 8,
    section: "Background Knowledge",
    question: "Which programming languages do you know?",
    type: "checkbox" as const,
    options: [
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "cpp", label: "C/C++" },
      { value: "javascript", label: "JavaScript" },
      { value: "sql", label: "SQL" },
      { value: "mobile", label: "Kotlin / Swift" },
      { value: "none", label: "None" },
    ],
  },
  {
    id: 9,
    section: "Background Knowledge",
    question: "Have you worked on any technical projects?",
    type: "radio" as const,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: 10,
    section: "Background Knowledge",
    question: "How would you rate your technical proficiency overall?",
    type: "radio" as const,
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  },
  // Section C: Interests and Goals
  {
    id: 11,
    section: "Interests and Goals",
    question: "What are your top areas of interest in technology? (Select up to 3)",
    type: "checkbox" as const,
    maxSelections: 3,
    options: [
      { value: "web-dev", label: "Web Development" },
      { value: "mobile-dev", label: "Mobile App Development" },
      { value: "ai-ml", label: "Artificial Intelligence / Machine Learning" },
      { value: "data-science", label: "Data Science" },
      { value: "cloud", label: "Cloud Computing" },
      { value: "cybersecurity", label: "Cybersecurity" },
      { value: "game-dev", label: "Game Development" },
      { value: "iot", label: "IoT" },
      { value: "ui-ux", label: "UI/UX Design" },
      { value: "blockchain", label: "Blockchain" },
      { value: "competitive", label: "Competitive Programming" },
    ],
  },
  {
    id: 12,
    section: "Interests and Goals",
    question: "What is your career goal after graduation?",
    type: "radio" as const,
    options: [
      { value: "software-dev", label: "Software Developer" },
      { value: "data-scientist", label: "Data Scientist" },
      { value: "cybersecurity", label: "Cybersecurity Analyst" },
      { value: "ai-engineer", label: "AI/ML Engineer" },
      { value: "cloud-engineer", label: "Cloud/DevOps Engineer" },
      { value: "designer", label: "UI/UX Designer" },
      { value: "higher-studies", label: "Higher Studies (MS/M.Tech)" },
      { value: "startup", label: "Startup Founder" },
      { value: "undecided", label: "Not yet decided" },
    ],
  },
  {
    id: 13,
    section: "Interests and Goals",
    question: "What motivates you to take an add-on course?",
    type: "checkbox" as const,
    options: [
      { value: "job-prospects", label: "Improve job prospects" },
      { value: "higher-studies", label: "Prepare for higher studies" },
      { value: "certificate", label: "Earn a certificate" },
      { value: "trending-skill", label: "Learn a trending skill" },
      { value: "projects", label: "Work on real-world projects" },
    ],
  },
  // Section D: Learning Preferences & Constraints
  {
    id: 14,
    section: "Learning Preferences",
    question: "How many hours per week can you dedicate to an add-on course?",
    type: "radio" as const,
    options: [
      { value: "less-2", label: "Less than 2 hours" },
      { value: "2-4", label: "2–4 hours" },
      { value: "5-8", label: "5–8 hours" },
      { value: "more-8", label: "More than 8 hours" },
    ],
  },
  {
    id: 15,
    section: "Learning Preferences",
    question: "Preferred course format:",
    type: "radio" as const,
    options: [
      { value: "self-paced", label: "Self-paced (MOOC style)" },
      { value: "instructor-led", label: "Instructor-led online classes" },
      { value: "offline", label: "Offline classroom/workshop" },
      { value: "hybrid", label: "Hybrid (online + in-person)" },
    ],
  },
  {
    id: 16,
    section: "Learning Preferences",
    question: "Preferred course length:",
    type: "radio" as const,
    options: [
      { value: "1-2-weeks", label: "1–2 weeks" },
      { value: "1-month", label: "1 month" },
      { value: "2-3-months", label: "2–3 months" },
      { value: "flexible", label: "Flexible duration" },
    ],
  },
  {
    id: 17,
    section: "Learning Preferences",
    question: "Are you willing to pay for a course if it offers certification or internships?",
    type: "radio" as const,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "maybe", label: "Maybe, depends on value" },
    ],
  },
  {
    id: 18,
    section: "Learning Preferences",
    question: "Any challenges you face while learning online?",
    type: "checkbox" as const,
    options: [
      { value: "internet", label: "Internet issues" },
      { value: "time", label: "Lack of time" },
      { value: "choices", label: "Too many choices / confused" },
      { value: "language", label: "Difficulty understanding English content" },
    ],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
    }
  }, [router])

  const handleNext = () => {
    const currentAnswer = answers[questions[currentQuestion].id]
    const hasAnswer =
      currentAnswer &&
      ((typeof currentAnswer === "string" && currentAnswer.trim() !== "") ||
        (Array.isArray(currentAnswer) && currentAnswer.length > 0))

    if (hasAnswer) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        // Quiz completed, save answers and go to results
        localStorage.setItem("quizAnswers", JSON.stringify(answers))
        router.push("/results")
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleAnswerChange = (value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentAnswer = answers[questions[currentQuestion].id]
  const hasAnswer =
    currentAnswer &&
    ((typeof currentAnswer === "string" && currentAnswer.trim() !== "") ||
      (Array.isArray(currentAnswer) && currentAnswer.length > 0))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Course Recommendation Questionnaire</h1>
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2 text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardDescription>Please provide accurate information for better course recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <QuizQuestion
              question={questions[currentQuestion]}
              value={currentAnswer || (questions[currentQuestion].type === "checkbox" ? [] : "")}
              onChange={handleAnswerChange}
            />

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!hasAnswer}>
                {currentQuestion === questions.length - 1 ? "Get Recommendations" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
