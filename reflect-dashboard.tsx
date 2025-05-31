"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
import MainScoreCard from "./components/main-score-card"
import PnLCard from "./components/pnl-card"
import BehavioralSummaryCard from "./components/behavioral-summary-card"
import PsychologicalProfileCard from "./components/psychological-profile-card"
import SettingsCard from "./components/settings-card"
import PerformanceChart from "./components/performance-chart"
import TradeFrequencyHeatmap from "./components/trade-frequency-heatmap"

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
        <div ref={mainScoreAnimation.ref}>
          <MainScoreCard isVisible={mainScoreAnimation.isVisible} />
        </div>

        {/* PnL Card */}
        <PnLCard isVisible={mainScoreAnimation.isVisible} />

        {/* Update the grid containers to use grid with equal height rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Behavioral Summary */}
          <div ref={behavioralAnimation.ref} className="h-full">
            <BehavioralSummaryCard isVisible={behavioralAnimation.isVisible} />
          </div>

          {/* Psychological Profile */}
          <div ref={profileAnimation.ref} className="h-full">
            <PsychologicalProfileCard isVisible={profileAnimation.isVisible} />
          </div>

          {/* Settings */}
          <div ref={settingsAnimation.ref} className="h-full">
            <SettingsCard isVisible={settingsAnimation.isVisible} />
          </div>
        </div>

        {/* Visual Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div ref={chartAnimation.ref} className="h-full">
            <PerformanceChart isVisible={chartAnimation.isVisible} />
          </div>

          <div ref={heatmapAnimation.ref} className="h-full">
            <TradeFrequencyHeatmap isVisible={heatmapAnimation.isVisible} />
          </div>
        </div>
      </div>
    </div>
  )
}
