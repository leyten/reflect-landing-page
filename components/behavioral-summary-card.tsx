"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BehavioralSummaryCardProps {
  isVisible: boolean
}

// Replace the behavioral data with advice data
const adviceData = [
  { text: "Take a break after consecutive losses", color: "bg-yellow-500" },
  { text: "Consider reducing position sizes", color: "bg-blue-500" },
  { text: "Set stop losses before entering trades", color: "bg-green-500" },
  { text: "Review your trades on weekends", color: "bg-purple-500" },
]

export default function BehavioralSummaryCard({ isVisible }: BehavioralSummaryCardProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-xl font-bold text-gray-900">Trading Advice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-6">
        {adviceData.map((item, i) => (
          <div
            key={i}
            className="flex items-start space-x-4 p-3 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            <div className={`w-3 h-3 ${item.color} rounded-full mt-1.5`}></div>
            <span className="text-sm text-gray-700 font-medium">{item.text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
