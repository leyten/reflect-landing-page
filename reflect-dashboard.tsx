"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useEffect, useRef, useState } from "react"

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

// Sample data for different timeframes
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

const heatmapData = [
  { time: "9AM", Mon: 2, Tue: 1, Wed: 3, Thu: 0, Fri: 4, Sat: 1, Sun: 0 },
  { time: "12PM", Mon: 3, Tue: 2, Wed: 1, Thu: 2, Fri: 3, Sat: 0, Sun: 1 },
  { time: "3PM", Mon: 1, Tue: 4, Wed: 2, Thu: 3, Fri: 2, Sat: 2, Sun: 0 },
  { time: "6PM", Mon: 0, Tue: 1, Wed: 0, Thu: 1, Fri: 1, Sat: 3, Sun: 2 },
]

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

const timelineEvents = [
  { week: "Week 1", score: 65, event: "Started tracking emotions" },
  { week: "Week 2", score: 68, event: "Reduced revenge trades by 40%" },
  { week: "Week 3", score: 70, event: "Implemented pause strategy" },
  { week: "Week 4", score: 72, event: "No revenge trades this week ✅" },
]

const pnlData = {
  day: { value: 1240, percentage: 3.2, isPositive: true },
  week: { value: 4850, percentage: 7.8, isPositive: true },
  month: { value: -2340, percentage: -1.5, isPositive: false },
  total: { value: 28750, percentage: 12.4, isPositive: true },
}

// Generate more detailed PnL chart data
const generateDetailedPnlData = (timeframe) => {
  const now = new Date()

  if (timeframe === "day") {
    // Generate hourly data for today with some negative values
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i
      const value = Math.sin(i / 3) * 1000 + Math.random() * 500 - 200 + i * 50
      const date = new Date(now)
      date.setHours(hour, 0, 0, 0)
      return {
        time: `${hour}:00`,
        pnl: Math.round(value),
        pnlPos: value > 0 ? Math.round(value) : 0,
        pnlNeg: value < 0 ? Math.round(value) : 0,
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  } else if (timeframe === "week") {
    // Generate data for each hour of the past 7 days with some negative values
    return Array.from({ length: 7 * 8 }, (_, i) => {
      const day = Math.floor(i / 8)
      const hour = (i % 8) * 3
      const value = Math.sin(i / 5) * 2000 + Math.random() * 1000 - 500 + i * 30
      const date = new Date(now)
      date.setDate(date.getDate() - (6 - day))
      date.setHours(hour, 0, 0, 0)
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return {
        time: `${dayNames[date.getDay()]} ${hour}:00`,
        pnl: Math.round(value),
        pnlPos: value > 0 ? Math.round(value) : 0,
        pnlNeg: value < 0 ? Math.round(value) : 0,
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  } else if (timeframe === "month") {
    // Generate daily data for the past month with more negative values
    return Array.from({ length: 30 }, (_, i) => {
      const day = i + 1
      const value = Math.sin(i / 10) * 3000 + Math.cos(i / 5) * 2000 - 2000
      const date = new Date(now)
      date.setDate(date.getDate() - (30 - day))
      return {
        time: `${date.getMonth() + 1}/${date.getDate()}`,
        pnl: Math.round(value),
        pnlPos: value > 0 ? Math.round(value) : 0,
        pnlNeg: value < 0 ? Math.round(value) : 0,
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  } else {
    // Generate monthly data for the year with some negative values
    return Array.from({ length: 12 }, (_, i) => {
      const month = i
      const value = Math.sin(i / 2) * 5000 + Math.cos(i / 4) * 10000 + i * 1000 - (i < 3 ? 8000 : 0)
      const date = new Date(now)
      date.setMonth(month)
      date.setDate(15)
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return {
        time: monthNames[month],
        pnl: Math.round(value),
        pnlPos: value > 0 ? Math.round(value) : 0,
        pnlNeg: value < 0 ? Math.round(value) : 0,
        timestamp: date.toLocaleString(),
        isPositive: value > 0,
      }
    })
  }
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export default function ReflectDashboard() {
  const mainScoreAnimation = useScrollAnimation()
  const behavioralAnimation = useScrollAnimation()
  const profileAnimation = useScrollAnimation()
  const settingsAnimation = useScrollAnimation()
  const chartAnimation = useScrollAnimation()
  const heatmapAnimation = useScrollAnimation()
  const triggerAnimation = useScrollAnimation()
  const timelineAnimation = useScrollAnimation()

  const [animatedScore, setAnimatedScore] = useState(0)
  const [timeframe, setTimeframe] = useState("weekly")
  const [pnlTimeframe, setPnlTimeframe] = useState("day")
  const [detailedPnlData, setDetailedPnlData] = useState([])
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= 72) {
            clearInterval(interval)
            return 72
          }
          return prev + 1
        })
      }, 30)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setDetailedPnlData(generateDetailedPnlData(pnlTimeframe))
  }, [pnlTimeframe])

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img
              src="/images/LogoTransparent.png"
              alt="Reflect Logo"
              className="h-10 w-10 transition-transform duration-200 rounded-lg"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/images/bannerLarge.png" alt="Reflect Banner" className="h-8 transition-transform duration-200" />
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="ring-2 ring-yellow-400/20 transition-all duration-200">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-yellow-400 text-black font-semibold">0x4A</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 font-medium">0x4A...B7C2</span>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Main Score Card */}
        <Card
          ref={mainScoreAnimation.ref}
          className={`mb-10 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 ${
            mainScoreAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Reflect Score</h1>
            <div className="text-7xl font-black text-black mb-2">
              {animatedScore}
              <span className="text-4xl text-gray-400">/100</span>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Your emotional performance this week</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Emotional Control", value: 75 },
                { label: "Risk Discipline", value: 68 },
                { label: "Pattern Breaking", value: 82 },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 transition-shadow duration-200">
                  <div className="text-sm text-gray-600 mb-3 font-medium">{item.label}</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Progress value={item.value} className="h-3 bg-gray-200 [&>div]:bg-yellow-400" />
                    </div>
                    <span className="text-lg font-bold text-yellow-600">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PnL Card */}
        <Card
          className={`mb-10 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 ${
            mainScoreAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

              {/* PnL Graph */}
              <div className="flex flex-col items-center">
                <div className="w-full h-[150px] overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={detailedPnlData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      onMouseMove={(e) => {
                        if (e && e.activeTooltipIndex !== undefined) {
                          setActiveTooltipIndex(e.activeTooltipIndex)
                        }
                      }}
                      onMouseLeave={() => setActiveTooltipIndex(null)}
                    >
                      <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      {activeTooltipIndex !== null && (
                        <ReferenceLine
                          x={detailedPnlData[activeTooltipIndex]?.time}
                          stroke="#d1d5db"
                          strokeDasharray="3 3"
                          strokeOpacity={0.7}
                        />
                      )}
                      <XAxis
                        dataKey="time"
                        tick={{ fill: "#6b7280", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <ReferenceLine y={0} stroke="#e5e7eb" strokeWidth={1} />
                      <ChartTooltip
                        cursor={false}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const value = payload[0].value
                            const isPositive = value >= 0
                            const timestamp = payload[0].payload.timestamp
                            return (
                              <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
                                <p className={`text-lg font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                                  {isPositive ? "+" : ""}${Math.abs(value).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      {/* Positive values line (green) */}
                      <Line
                        type="monotone"
                        dataKey="pnlPos"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        isAnimationActive={true}
                        animationDuration={1000}
                        connectNulls={true}
                      />
                      {/* Negative values line (red) */}
                      <Line
                        type="monotone"
                        dataKey="pnlNeg"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        isAnimationActive={true}
                        animationDuration={1000}
                        connectNulls={true}
                      />
                      {/* Active dot layer */}
                      <Line
                        type="monotone"
                        dataKey="pnl"
                        stroke="transparent"
                        dot={false}
                        activeDot={({ cx, cy, stroke, dataKey, value, ...rest }) => {
                          const isPositive = value >= 0
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={6}
                              stroke={isPositive ? "#10b981" : "#ef4444"}
                              strokeWidth={2}
                              fill="#ffffff"
                              {...rest}
                            />
                          )
                        }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 text-center">
                  <div className="flex items-baseline justify-center">
                    <span
                      className={`text-3xl font-black ${pnlData[pnlTimeframe].isPositive ? "text-green-500" : "text-red-500"}`}
                    >
                      {pnlData[pnlTimeframe].isPositive ? "+" : ""}$
                      {Math.abs(pnlData[pnlTimeframe].value).toLocaleString()}
                    </span>
                    <span
                      className={`ml-2 text-lg font-bold ${pnlData[pnlTimeframe].isPositive ? "text-green-500" : "text-red-500"}`}
                    >
                      {pnlData[pnlTimeframe].isPositive ? "+" : ""}
                      {pnlData[pnlTimeframe].percentage}%
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Behavioral Summary */}
          <Card
            ref={behavioralAnimation.ref}
            className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 ${
              behavioralAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardHeader className="pb-2 pt-6 px-6">
              <CardTitle className="text-xl font-bold text-gray-900">This Week's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {[
                { text: "Overtraded after losses (3 times)", color: "bg-red-400" },
                { text: "Healthy pause after 2 red trades", color: "bg-yellow-400" },
                { text: "Maintained consistent sizing", color: "bg-green-400" },
                { text: "Improved weekend discipline", color: "bg-blue-400" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-4 p-3 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <div className={`w-3 h-3 ${item.color} rounded-full mt-1.5`}></div>
                  <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Psychological Profile */}
          <Card
            ref={profileAnimation.ref}
            className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 ${
              profileAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Your Profile</CardTitle>
              <Badge className="w-fit bg-yellow-400 text-black font-bold">Impulsive Strategist</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Emotional Reactivity", value: 78, level: "High" },
                { label: "Impulsiveness", value: 65, level: "Medium" },
                { label: "Risk Consistency", value: 72, level: "Good" },
              ].map((item, i) => (
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

          {/* Settings */}
          <Card
            ref={settingsAnimation.ref}
            className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-300 ${
              settingsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {[
                  { title: "Popup Sensitivity", subtitle: "Balanced", checked: true },
                  { title: "URL Blocker", subtitle: "Enabled", checked: true },
                  { title: "Post-Trade Journal", subtitle: "Optional notes", checked: false },
                ].map((setting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl transition-colors duration-200"
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{setting.title}</div>
                      <div className="text-xs text-gray-500">{setting.subtitle}</div>
                    </div>
                    <Switch defaultChecked={setting.checked} className="data-[state=checked]:bg-yellow-400" />
                  </div>
                ))}
              </div>
              <Button className="w-full bg-yellow-400 hover:bg-gray-900 text-black hover:text-white font-bold transition-colors duration-200 rounded-xl h-12">
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Visual Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card
            ref={chartAnimation.ref}
            className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 ${
              chartAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                        timeframe === option ? "bg-yellow-400 text-black" : "text-gray-600"
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
                className="h-[220px] mt-2 w-full"
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
                      stroke="#f8d300"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dot={{
                        fill: "#f8d300",
                        strokeWidth: 2,
                        r: 5,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 7,
                        stroke: "#f8d300",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card
            ref={heatmapAnimation.ref}
            className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 ${
              heatmapAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Trade Frequency Heatmap</CardTitle>
              <CardDescription>When you trade most actively</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mt-2">
                {heatmapData.map((row, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-12 text-xs text-gray-500 font-medium text-right">{row.time}</div>
                    <div className="flex space-x-2">
                      {Object.entries(row)
                        .slice(1)
                        .map(([day, value]) => (
                          <div
                            key={day}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform duration-200 shadow-sm"
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
                <div className="flex items-center space-x-3 mt-6">
                  <div className="w-12"></div>
                  <div className="flex space-x-2 text-xs text-gray-500 font-medium">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={i} className="w-8 text-center">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emotional Trigger Log */}
        <Card
          ref={triggerAnimation.ref}
          className={`mb-8 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-100 ${
            triggerAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

        {/* Improvement Timeline */}
        <Card
          ref={timelineAnimation.ref}
          className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 ${
            timelineAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
      </div>
    </div>
  )
}
