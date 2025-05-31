"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface PsychologicalProfileCardProps {
  isVisible: boolean
}

const profileData = [
  { label: "Emotional Reactivity", value: 78, level: "High" },
  { label: "Impulsiveness", value: 65, level: "Medium" },
  { label: "Risk Consistency", value: 72, level: "Good" },
]

export default function PsychologicalProfileCard({ isVisible }: PsychologicalProfileCardProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Your Profile</CardTitle>
        <Badge className="w-fit bg-yellow-400 text-black font-bold">Impulsive Strategist</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {profileData.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-2.5">
              <span className="text-gray-600 font-medium">{item.label}</span>
              <span className="font-bold text-gray-800">{item.level}</span>
            </div>
            <Progress value={item.value} className="h-3 bg-gray-200 [&>div]:bg-yellow-400" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
