"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface TradeFrequencyHeatmapProps {
  isVisible: boolean
}

// New trading frequency data structure
const tradeFrequencyData = [
  { hour: 9, mon: 5, tue: 2, wed: 8, thu: 1, fri: 10, sat: 3, sun: 0 },
  { hour: 10, mon: 7, tue: 4, wed: 6, thu: 3, fri: 8, sat: 2, sun: 1 },
  { hour: 11, mon: 9, tue: 6, wed: 4, thu: 5, fri: 7, sat: 0, sun: 0 },
  { hour: 12, mon: 12, tue: 8, wed: 7, thu: 6, fri: 9, sat: 1, sun: 2 },
  { hour: 13, mon: 8, tue: 10, wed: 9, thu: 4, fri: 6, sat: 0, sun: 0 },
  { hour: 14, mon: 6, tue: 7, wed: 11, thu: 8, fri: 5, sat: 2, sun: 1 },
  { hour: 15, mon: 10, tue: 9, wed: 5, thu: 7, fri: 4, sat: 3, sun: 0 },
  { hour: 16, mon: 11, tue: 5, wed: 3, thu: 9, fri: 12, sat: 4, sun: 2 },
]

// Days of the week
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]

export default function TradeFrequencyHeatmap({ isVisible }: TradeFrequencyHeatmapProps) {
  const [maxValue, setMaxValue] = useState(12)

  useEffect(() => {
    // Find the maximum value in the dataset for color scaling
    const max = Math.max(
      ...tradeFrequencyData.flatMap((row) => days.map((day) => row[day as keyof typeof row] as number)),
    )
    setMaxValue(max)
  }, [])

  // Function to get color based on value intensity
  const getColor = (value: number) => {
    if (value === 0) return "#f5f5f5"

    const intensity = value / maxValue

    if (intensity < 0.2) return "#fff9c4"
    if (intensity < 0.4) return "#ffee58"
    if (intensity < 0.6) return "#fdd835"
    if (intensity < 0.8) return "#ffb300"
    return "#ff8f00"
  }

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
      <CardContent className="p-4 h-full">
        <div className="h-full flex flex-col">
          {/* Legend */}
          <div className="flex justify-end mb-2 gap-1">
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-1">Low</span>
              {[0.2, 0.4, 0.6, 0.8, 1].map((intensity, i) => (
                <div key={i} className="w-3 h-3" style={{ backgroundColor: getColor(intensity * maxValue) }}></div>
              ))}
              <span className="ml-1">High</span>
            </div>
          </div>

          {/* Day labels */}
          <div className="flex mb-1">
            <div className="w-10 flex-shrink-0"></div>
            <div className="flex-1 grid grid-cols-7 gap-1">
              {dayLabels.map((day, i) => (
                <div key={i} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap grid */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col justify-between">
              {tradeFrequencyData.map((row, i) => (
                <div key={i} className="flex items-center mb-1 last:mb-0">
                  <div className="w-10 text-xs text-gray-500 font-medium text-right pr-2">{row.hour}:00</div>
                  <div className="flex-1 grid grid-cols-7 gap-1">
                    {days.map((day) => {
                      const value = row[day as keyof typeof row] as number
                      return (
                        <div
                          key={day}
                          className="aspect-square rounded-sm flex items-center justify-center transition-all duration-300 relative group"
                          style={{ backgroundColor: getColor(value) }}
                        >
                          {value > 0 && (
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-10 rounded-sm">
                              {value}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
