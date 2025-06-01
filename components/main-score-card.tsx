"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface MainScoreCardProps {
  isVisible: boolean
  walletAddress?: string
}

export default function MainScoreCard({ isVisible, walletAddress }: MainScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= 72) {
            clearInterval(interval)
            return 72
          }
          return prev + 1
        })
      }, 30)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card
      className={`mb-10 bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:scale-[1.01] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardContent className="p-8 text-center relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-transparent to-blue-50/30 animate-pulse duration-[6000ms]"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Reflect Score</h1>
          {walletAddress && (
            <div className="text-sm text-green-600 mb-2">
              Connected: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </div>
          )}
          <div className="text-7xl font-black text-gray-900 mb-2">
            {animatedScore}
            <span className="text-4xl text-gray-400">/100</span>
          </div>
          <p className="text-gray-600 mb-6 text-lg">Your emotional performance this week</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Emotional Control", value: 75 },
              { label: "Risk Discipline", value: 68 },
              { label: "Pattern Breaking", value: 82 },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-200 hover:bg-gray-100/80 hover:scale-105"
              >
                <div className="text-sm text-gray-600 mb-3 font-medium">{item.label}</div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Progress value={item.value} className="h-3 bg-gray-200 [&>div]:bg-yellow-500" />
                  </div>
                  <span className="text-lg font-bold text-yellow-500">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
