"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import PnLLightweightChart from "./pnl-lightweight-chart"

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

// Generate more detailed PnL chart data with UNIX timestamps
const generateDetailedPnlData = (timeframe: string) => {
  const now = new Date()
  const baseTimestamp = Math.floor(now.getTime() / 1000)

  if (timeframe === "day") {
    // Generate hourly data for today with some negative values
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i
      const value = Math.sin(i / 3) * 1000 + Math.random() * 500 - 200 + i * 50
      const timestamp = baseTimestamp - (24 - i) * 3600 // 1 hour intervals
      return {
        time: timestamp,
        value: Math.round(value),
        displayTime: `${hour}:00`,
        timestamp: new Date(timestamp * 1000).toLocaleString(),
        isPositive: value > 0,
      }
    })
  } else if (timeframe === "week") {
    // Generate data for each 3-hour period of the past 7 days
    return Array.from({ length: 7 * 8 }, (_, i) => {
      const day = Math.floor(i / 8)
      const hour = (i % 8) * 3
      const value = Math.sin(i / 5) * 2000 + Math.random() * 1000 - 500 + i * 30
      const timestamp = baseTimestamp - (7 * 8 - i) * 3600 * 3 // 3 hour intervals
      const date = new Date(timestamp * 1000)
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return {
        time: timestamp,
        value: Math.round(value),
        displayTime: `${dayNames[date.getDay()]} ${hour}:00`,
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  } else if (timeframe === "month") {
    // Generate daily data for the past month
    return Array.from({ length: 30 }, (_, i) => {
      const value = Math.sin(i / 10) * 3000 + Math.cos(i / 5) * 2000 - 2000
      const timestamp = baseTimestamp - (30 - i) * 86400 // 1 day intervals
      const date = new Date(timestamp * 1000)
      return {
        time: timestamp,
        value: Math.round(value),
        displayTime: `${date.getMonth() + 1}/${date.getDate()}`,
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  } else {
    // Generate monthly data for the year
    return Array.from({ length: 12 }, (_, i) => {
      const value = Math.sin(i / 2) * 5000 + Math.cos(i / 4) * 10000 + i * 1000 - (i < 3 ? 8000 : 0)
      const timestamp = baseTimestamp - (12 - i) * 86400 * 30 // ~1 month intervals
      const date = new Date(timestamp * 1000)
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return {
        time: timestamp,
        value: Math.round(value),
        displayTime: monthNames[date.getMonth()],
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  }
}

export default function PnLCard({ isVisible, walletAddress }: PnLCardProps) {
  const [pnlTimeframe, setPnlTimeframe] = useState("day")
  const [detailedPnlData, setDetailedPnlData] = useState<any[]>([])

  useEffect(() => {
    setDetailedPnlData(generateDetailedPnlData(pnlTimeframe))
  }, [pnlTimeframe])

  // Convert data for lightweight charts
  const chartData = detailedPnlData.map((item) => ({
    time: item.time,
    value: item.value,
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

          {/* PnL Chart */}
          <div className="flex flex-col items-center">
            <div className="w-full h-[150px] overflow-hidden rounded-lg">
              <PnLLightweightChart data={chartData} height={150} />
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-baseline justify-center">
                <span
                  className={`text-3xl font-black ${pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "+" : ""}$
                  {Math.abs(pnlData[pnlTimeframe as keyof typeof pnlData].value).toLocaleString()}
                </span>
                <span
                  className={`ml-2 text-lg font-bold ${pnlData[pnlTimeframe as keyof typeof pnlData].isPositive ? "text-green-500" : "text-red-500"}`}
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

        {/* Win/Loss Ratio */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6">
          <div className="text-sm text-gray-600 mb-3 font-medium text-center">Win/Loss Ratio</div>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${pnlTimeframe === "month" ? 45 : 65}%` }}
                ></div>
              </div>
            </div>
            <span className="text-lg font-bold text-yellow-600">{pnlTimeframe === "month" ? "0.8" : "1.9"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
