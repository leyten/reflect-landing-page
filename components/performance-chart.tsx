"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useState } from "react"

interface PerformanceChartProps {
  isVisible: boolean
}

// Sample data
const weeklyScoreData = [
  { day: "Mon", score: 68 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 65 },
  { day: "Thu", score: 78 },
  { day: "Fri", score: 72 },
  { day: "Sat", score: 75 },
  { day: "Sun", score: 72 },
]

const monthlyScoreData = [
  { day: "Jan", score: 65 },
  { day: "Feb", score: 68 },
  { day: "Mar", score: 70 },
  { day: "Apr", score: 72 },
  { day: "May", score: 75 },
  { day: "Jun", score: 73 },
]

const quarterlyScoreData = [
  { day: "Q1", score: 67 },
  { day: "Q2", score: 72 },
  { day: "Q3", score: 74 },
  { day: "Q4", score: 78 },
]

export default function PerformanceChart({ isVisible }: PerformanceChartProps) {
  const [timeframe, setTimeframe] = useState("weekly")

  const getTimeframeData = () => {
    switch (timeframe) {
      case "monthly":
        return monthlyScoreData
      case "quarterly":
        return quarterlyScoreData
      default:
        return weeklyScoreData
    }
  }

  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">Performance</CardTitle>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            {["weekly", "monthly", "quarterly"].map((option) => (
              <button
                key={option}
                onClick={() => setTimeframe(option)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  timeframe === option ? "bg-yellow-500 text-black" : "text-gray-600"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <CardDescription>Your Reflect Score over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "#f8d300",
            },
          }}
          className="h-[250px] mt-2 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getTimeframeData()} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                domain={[60, 80]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                width={40}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
                        <p className="text-sm font-medium text-gray-900">
                          Reflect Score: <span className="font-bold text-yellow-600">{payload[0].value}</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#eab308"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={{
                  fill: "#eab308",
                  strokeWidth: 2,
                  r: 5,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 7,
                  stroke: "#eab308",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
