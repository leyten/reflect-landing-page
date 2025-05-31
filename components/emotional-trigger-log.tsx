"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EmotionalTriggerLogProps {
  isVisible: boolean
}

const emotionalTriggers = [
  { timestamp: "11:23 AM", behavior: "Revenge Trade", insight: "After -$1,400 loss", severity: "high" },
  { timestamp: "2:45 PM", behavior: "FOMO Entry", insight: "Saw 15% pump on Twitter", severity: "medium" },
  { timestamp: "4:12 PM", behavior: "Healthy Pause", insight: "Stopped after 2 losses", severity: "positive" },
  {
    timestamp: "Yesterday 3:30 PM",
    behavior: "Oversize Position",
    insight: "Emotional after win streak",
    severity: "medium",
  },
]

export default function EmotionalTriggerLog({ isVisible }: EmotionalTriggerLogProps) {
  return (
    <Card
      className={`mb-8 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Emotional Trigger Log</CardTitle>
        <CardDescription>Recent behavioral patterns and insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emotionalTriggers.map((trigger, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-500 w-24 font-medium">{trigger.timestamp}</div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      trigger.severity === "high"
                        ? "bg-red-400"
                        : trigger.severity === "medium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                    }`}
                  ></div>
                  <div className="text-sm font-semibold text-gray-900">{trigger.behavior}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">{trigger.insight}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
