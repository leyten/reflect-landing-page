"use client"

import { useEffect, useState } from "react"
import { XAxis, YAxis, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts"

interface PnLData {
  time: number
  value: number
}

interface PnLLightweightChartProps {
  data: PnLData[]
  height?: number
}

export default function PnLLightweightChart({ data, height = 150 }: PnLLightweightChartProps) {
  const [isClient, setIsClient] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="w-full bg-gray-100 rounded animate-pulse" style={{ height }} />
  }

  // Convert data for recharts and split into positive/negative segments
  const chartData = data.map((item, index) => {
    const date = new Date(item.time * 1000)
    return {
      index,
      time: item.time,
      value: item.value,
      positiveValue: item.value >= 0 ? item.value : null,
      negativeValue: item.value < 0 ? item.value : null,
      displayTime: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fullTimestamp: date.toLocaleString(),
    }
  })

  return (
    <div className="w-full relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          onMouseMove={(e) => {
            if (e && e.activeTooltipIndex !== undefined) {
              setHoveredIndex(e.activeTooltipIndex)
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="displayTime"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            interval="preserveStartEnd"
          />
          <YAxis hide />

          {/* Zero reference line */}
          <ReferenceLine y={0} stroke="#e5e7eb" strokeWidth={1} />

          {/* Hover reference line */}
          {hoveredIndex !== null && (
            <ReferenceLine
              x={chartData[hoveredIndex]?.displayTime}
              stroke="#d1d5db"
              strokeDasharray="3 3"
              strokeOpacity={0.7}
            />
          )}

          {/* Positive area */}
          <Area
            type="monotone"
            dataKey="positiveValue"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#positiveGradient)"
            connectNulls={false}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#10b981",
            }}
          />

          {/* Negative area */}
          <Area
            type="monotone"
            dataKey="negativeValue"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#negativeGradient)"
            connectNulls={false}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#ef4444",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Custom tooltip */}
      {hoveredIndex !== null && (
        <div className="absolute top-2 left-2 bg-white p-2 border border-gray-200 rounded-lg shadow-md text-xs z-10">
          <div className={`font-bold ${chartData[hoveredIndex].value >= 0 ? "text-green-600" : "text-red-600"}`}>
            {chartData[hoveredIndex].value >= 0 ? "+" : ""}${Math.abs(chartData[hoveredIndex].value).toLocaleString()}
          </div>
          <div className="text-gray-500 mt-1">{chartData[hoveredIndex].fullTimestamp}</div>
        </div>
      )}
    </div>
  )
}
