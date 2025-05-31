"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ImprovementTimelineProps {
  isVisible: boolean
}

const timelineEvents = [
  { week: "Week 1", score: 65, event: "Started tracking emotions" },
  { week: "Week 2", score: 68, event: "Reduced revenge trades by 40%" },
  { week: "Week 3", score: 70, event: "Implemented pause strategy" },
  { week: "Week 4", score: 72, event: "No revenge trades this week ✅" },
]

export default function ImprovementTimeline({ isVisible }: ImprovementTimelineProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Improvement Timeline</CardTitle>
        <CardDescription>Your journey to better trading psychology</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 py-2">
          {timelineEvents.map((event, i) => (
            <div key={i} className="flex items-start space-x-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-lg font-black text-black shadow-md">
                  {event.score}
                </div>
                {i < timelineEvents.length - 1 && <div className="w-1 h-12 bg-gray-200 mt-3 rounded-full"></div>}
              </div>
              <div className="flex-1 p-4 rounded-xl transition-colors duration-200 mt-1">
                <div className="text-lg font-bold text-gray-900">{event.week}</div>
                <div className="text-sm text-gray-600 mt-1 font-medium">{event.event}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
