"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { useReflectScore } from "@/hooks/useReflectScore"

interface MainScoreCardProps {
  isVisible: boolean
  walletAddress?: string
}

export default function MainScoreCard({ isVisible, walletAddress }: MainScoreCardProps) {
  const { score, loading, error } = useReflectScore(walletAddress)
  const [animatedScore, setAnimatedScore] = useState(0)
  const targetScore = score?.total || 72

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval)
            return targetScore
          }
          return prev + 1
        })
      }, 30)
    }, 300)

    return () => clearTimeout(timer)
  }, [targetScore])

  const progressData = [
    { label: "Emotional Control", value: score?.emotionalControl || 75 },
    { label: "Risk Discipline", value: score?.riskConsistency || 68 },
    { label: "Pattern Breaking", value: score?.selfCorrection || 82 },
  ]

  return (
    <Card
      className={`mb-10 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardContent className="p-8 text-center">
        {loading && <div className="text-center text-gray-500">Loading your Reflect Score...</div>}

        {error && <div className="text-center text-red-500 text-sm">{error}</div>}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Reflect Score</h1>
        <div className="text-7xl font-black text-black mb-2">
          {animatedScore}
          <span className="text-4xl text-gray-400">/100</span>
        </div>
        <p className="text-gray-600 mb-6 text-lg">Your emotional performance this week</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressData.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 transition-shadow duration-200">
              <div className="text-sm text-gray-600 mb-3 font-medium">{item.label}</div>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <Progress value={item.value} className="h-3 bg-gray-200 [&>div]:bg-yellow-400" />
                </div>
                <span className="text-lg font-bold text-yellow-600">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
