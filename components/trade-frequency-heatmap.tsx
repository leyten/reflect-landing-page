"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TradeFrequencyHeatmapProps {
  isVisible: boolean
}

const heatmapData = [
  { time: "9AM", Mon: 2, Tue: 1, Wed: 3, Thu: 0, Fri: 4, Sat: 1, Sun: 0 },
  { time: "12PM", Mon: 3, Tue: 2, Wed: 1, Thu: 2, Fri: 3, Sat: 0, Sun: 1 },
  { time: "3PM", Mon: 1, Tue: 4, Wed: 2, Thu: 3, Fri: 2, Sat: 2, Sun: 0 },
  { time: "6PM", Mon: 0, Tue: 1, Wed: 0, Thu: 1, Fri: 1, Sat: 3, Sun: 2 },
]

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
      <CardContent className="pb-4">
        <div className="space-y-2 mt-1">
          {heatmapData.map((row, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-10 text-xs text-gray-500 font-medium text-right">{row.time}</div>
              <div className="flex space-x-1">
                {Object.entries(row)
                  .slice(1)
                  .map(([day, value]) => (
                    <div
                      key={day}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-transform duration-200 shadow-sm"
                      style={{
                        backgroundColor:
                          value === 0 ? "#f5f5f5" : value <= 2 ? "#fef3cd" : value <= 3 ? "#f8d300" : "#e6c200",
                        color: value > 2 ? "#000" : "#666",
                      }}
                    >
                      {value || ""}
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-2 mt-4">
            <div className="w-10"></div>
            <div className="flex space-x-1 text-xs text-gray-500 font-medium">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="w-6 text-center">
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
