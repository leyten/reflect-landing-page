"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TradeFrequencyHeatmapProps {
  isVisible: boolean
}

export default function TradeFrequencyHeatmap({ isVisible }: TradeFrequencyHeatmapProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-900">Trade Frequency</CardTitle>
        <CardDescription>When you trade most actively</CardDescription>
      </CardHeader>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {/* Header row with day labels */}
          <div className="grid grid-cols-8 gap-2 mb-2">
            <div className="text-xs text-gray-500 font-medium"></div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-xs text-gray-500 font-medium text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex-1 space-y-2">
            {["9AM", "11AM", "1PM", "3PM", "5PM"].map((time, timeIndex) => (
              <div key={time} className="grid grid-cols-8 gap-2 h-full">
                <div className="text-xs text-gray-500 font-medium flex items-center justify-end pr-2">{time}</div>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  // Generate random intensity values for demo
                  const intensity = Math.floor(Math.random() * 5)
                  const getColor = (value) => {
                    if (value === 0) return "#f8f9fa"
                    if (value === 1) return "#fef3c7"
                    if (value === 2) return "#fde68a"
                    if (value === 3) return "#fcd34d"
                    return "#eab308"
                  }

                  return (
                    <div
                      key={`${timeIndex}-${dayIndex}`}
                      className="rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-105 cursor-pointer shadow-sm"
                      style={{
                        backgroundColor: getColor(intensity),
                        color: intensity > 2 ? "#2d3436" : "#636e72",
                        minHeight: "2.5rem",
                      }}
                      title={`${time} ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex]}: ${intensity} trades`}
                    >
                      {intensity > 0 ? intensity : ""}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-4 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor:
                      level === 0
                        ? "#f8f9fa"
                        : level === 1
                          ? "#fef3c7"
                          : level === 2
                            ? "#fde68a"
                            : level === 3
                              ? "#fcd34d"
                              : "#eab308",
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
