"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import { useEffect, useState } from "react"

interface PnLCardProps {
  isVisible: boolean
  walletAddress?: string
}

const pnlData = {
  day: { value: 1240, percentage: 3.2, isPositive: true },
  week: { value: 4850, percentage: 7.8, isPositive: true },
  month: { value: -2340, percentage: -1.5, isPositive: false },
  total: { value: 28750, percentage: 12.4, isPositive: true },
}

const generateDetailedPnlData = (timeframe: string) => {
  const now = new Date()
  let rawData: Array<{ time: string; pnl: number; timestamp: string }> = []

  if (timeframe === "day") {
    rawData = Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now)
      date.setHours(i, 0, 0, 0)
      return {
        time: date.toISOString(),
        pnl: Math.sin(i / 3) * 1000 + Math.random() * 500 - 200 + i * 50,
        timestamp: date.toLocaleString(),
      }
    })
  } else if (timeframe === "week") {
    rawData = Array.from({ length: 7 * 4 }, (_, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - (6 - Math.floor(i / 4)))
      date.setHours((i % 4) * 6, 0, 0, 0)
      return {
        time: date.toISOString(),
        pnl: Math.sin(i / 5) * 2000 + Math.random() * 1000 - 500 + i * 30,
        timestamp: date.toLocaleString(),
      }
    })
  } else if (timeframe === "month") {
    rawData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - (30 - i))
      return {
        time: date.toISOString(),
        pnl: Math.sin(i / 10) * 3000 + Math.cos(i / 5) * 2000 - 2000,
        timestamp: date.toLocaleString(),
      }
    })
  } else {
    rawData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(now)
      date.setMonth(i)
      date.setDate(15)
      return {
        time: date.toISOString(),
        pnl: Math.sin(i / 2) * 5000 + Math.cos(i / 4) * 10000 + i * 1000 - (i < 3 ? 8000 : 0),
        timestamp: date.toLocaleString(),
      }
    })
  }

  return rawData.map((item) => ({
    ...item,
    pnl: Math.round(item.pnl),
    displayTime:
      timeframe === "day"
        ? new Date(item.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        : timeframe === "week" || timeframe === "month"
          ? new Date(item.time).toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : new Date(item.time).toLocaleDateString("en-US", { month: "short" }),
  }))
}

export default function PnLCard({ isVisible, walletAddress }: PnLCardProps) {
  const [pnlTimeframe, setPnlTimeframe] = useState("day")
  const [detailedPnlData, setDetailedPnlData] = useState<any[]>([])

  useEffect(() => {
    setDetailedPnlData(generateDetailedPnlData(pnlTimeframe))
  }, [pnlTimeframe])

  const positiveData = detailedPnlData.map((d) => ({
    ...d,
    pnl: d.pnl >= 0 ? d.pnl : null,
  }))

  const negativeData = detailedPnlData.map((d) => ({
    ...d,
    pnl: d.pnl < 0 ? d.pnl : null,
  }))

  return (
    <Card
      className={`mb-10 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profit & Loss</h2>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            {["day", "week", "month", "total"].map((option) => (
              <button
                key={option}
                onClick={() => setPnlTimeframe(option)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  pnlTimeframe === option ? "bg-yellow-400 text-black" : "text-gray-600"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Total Buy */}
          <div className="text-center">
            <div className="bg-green-50 rounded-2xl p-6">
              <div className="text-sm text-green-600 mb-2 font-medium">Total Buy</div>
              <div className="text-3xl font-black text-green-600">
                $
                {pnlTimeframe === "day"
                  ? "12,450"
                  : pnlTimeframe === "week"
                    ? "48,200"
                    : pnlTimeframe === "month"
                      ? "156,800"
                      : "1,240,000"}
              </div>
              <div className="text-xs text-green-500 mt-1">
                {pnlTimeframe === "day"
                  ? "8 trades"
                  : pnlTimeframe === "week"
                    ? "23 trades"
                    : pnlTimeframe === "month"
                      ? "89 trades"
                      : "1,247 trades"}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center">
            <div className="w-full h-[150px] overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={detailedPnlData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="displayTime"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <ReferenceLine y={0} stroke="#e5e7eb" strokeWidth={2} />

                  <ChartTooltip
                    cursor={{ stroke: "#d1d5db", strokeDasharray: "3 3" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const { pnl, timestamp } = payload[0].payload
                        if (pnl === null) return null
                        const isPositive = pnl >= 0
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
                            <p className={`text-lg font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                              {isPositive ? "+" : "-"}${Math.abs(pnl).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />

                  <Line
                    type="monotone"
                    data={positiveData}
                    dataKey="pnl"
                    stroke="url(#greenGradient)"
                    strokeWidth={3}
                    dot={false}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    data={negativeData}
                    dataKey="pnl"
                    stroke="url(#redGradient)"
                    strokeWidth={3}
                    dot={false}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-baseline justify-center">
                <span
                  className={`text-3xl font-black ${
                    pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "+" : "-"}$
                  {Math.abs(pnlData[pnlTimeframe as keyof typeof pnlData].value).toLocaleString()}
                </span>
                <span
                  className={`ml-2 text-lg font-bold ${
                    pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "+" : ""}
                  {pnlData[pnlTimeframe as keyof typeof pnlData].percentage}%
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {pnlTimeframe === "day"
                  ? "Today"
                  : pnlTimeframe === "week"
                    ? "This week"
                    : pnlTimeframe === "month"
                      ? "This month"
                      : "All time"}{" "}
                performance
              </p>
            </div>
          </div>

          {/* Total Sell */}
          <div className="text-center">
            <div className="bg-red-50 rounded-2xl p-6">
              <div className="text-sm text-red-600 mb-2 font-medium">Total Sell</div>
              <div className="text-3xl font-black text-red-600">
                $
                {pnlTimeframe === "day"
                  ? "11,210"
                  : pnlTimeframe === "week"
                    ? "43,350"
                    : pnlTimeframe === "month"
                      ? "159,140"
                      : "1,211,250"}
              </div>
              <div className="text-xs text-red-500 mt-1">
                {pnlTimeframe === "day"
                  ? "6 trades"
                  : pnlTimeframe === "week"
                    ? "19 trades"
                    : pnlTimeframe === "month"
                      ? "92 trades"
                      : "1,198 trades"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
