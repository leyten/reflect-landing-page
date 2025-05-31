"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BehavioralSummaryCardProps {
  isVisible: boolean
}

const behavioralData = [
  { text: "Overtraded after losses (3 times)", color: "bg-red-400" },
  { text: "Healthy pause after 2 red trades", color: "bg-yellow-400" },
  { text: "Maintained consistent sizing", color: "bg-green-400" },
  { text: "Improved weekend discipline", color: "bg-blue-400" },
]

export default function BehavioralSummaryCard({ isVisible }: BehavioralSummaryCardProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-xl font-bold text-gray-900">This Week's Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-6">
        {behavioralData.map((item, i) => (
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
