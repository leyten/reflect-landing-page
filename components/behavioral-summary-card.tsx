"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BehavioralSummaryCardProps {
  isVisible: boolean
}

// Replace the behavioral data with advice data
const adviceData = [
  {
    text: "Take a break after consecutive losses",
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    icon: "⏸️",
    bgGradient: "from-yellow-50 to-yellow-100",
  },
  {
    text: "Consider reducing position sizes",
    color: "bg-gradient-to-r from-blue-400 to-blue-600",
    icon: "📉",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    text: "Set stop losses before entering trades",
    color: "bg-gradient-to-r from-green-400 to-green-600",
    icon: "🛡️",
    bgGradient: "from-green-50 to-green-100",
  },
  {
    text: "Review your trades on weekends",
    color: "bg-gradient-to-r from-purple-400 to-purple-600",
    icon: "📊",
    bgGradient: "from-purple-50 to-purple-100",
  },
]

export default function BehavioralSummaryCard({ isVisible }: BehavioralSummaryCardProps) {
  return (
    <Card
      className={`bg-gradient-to-br from-white via-gray-50/50 to-white shadow-xl border-0 rounded-3xl transition-all duration-700 delay-100 h-full hover:shadow-2xl hover:scale-[1.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader className="pb-2 pt-6 px-6 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <span className="mr-2 text-2xl">💡</span>
          Trading Advice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-6">
        {adviceData.map((item, i) => (
          <div
            key={i}
            className={`group relative flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg bg-gradient-to-r ${item.bgGradient} border border-gray-100/50 hover:border-gray-200`}
            style={{
              animationDelay: `${i * 200}ms`,
            }}
          >
            {/* Animated background glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/0 to-yellow-600/0 group-hover:from-yellow-400/10 group-hover:to-yellow-600/10 transition-all duration-300"></div>

            {/* Icon with bounce animation */}
            <div
              className={`relative z-10 w-8 h-8 ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <span className="group-hover:animate-bounce">{item.icon}</span>
            </div>

            {/* Text with slide effect */}
            <span className="relative z-10 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300 group-hover:translate-x-1">
              {item.text}
            </span>

            {/* Subtle arrow indicator */}
            <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-gray-400 text-sm">→</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
