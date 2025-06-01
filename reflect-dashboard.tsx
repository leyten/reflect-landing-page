"use client"
import { useEffect, useRef, useState } from "react"
import MainScoreCard from "./components/main-score-card"
import PnLCard from "./components/pnl-card"
import BehavioralSummaryCard from "./components/behavioral-summary-card"
import PsychologicalProfileCard from "./components/psychological-profile-card"
import SettingsCard from "./components/settings-card"
import PerformanceChart from "./components/performance-chart"
import { usePrivy } from "@privy-io/react-auth"
import { useSolanaWallets } from "@privy-io/react-auth/solana"
import PrivyDropdown from "./components/privy-dropdown"

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
const generateDetailedPnlData = (timeframe: "day" | "week" | "month" | "year") => {
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
  const { authenticated } = usePrivy()
  const { wallets } = useSolanaWallets()
  const primaryWallet = wallets[0]
  const mainScoreAnimation = useScrollAnimation()
  const behavioralAnimation = useScrollAnimation()
  const profileAnimation = useScrollAnimation()
  const settingsAnimation = useScrollAnimation()
  const chartAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-yellow-50/40 relative overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large Floating Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-yellow-300/40 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-blue-300/35 to-blue-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-green-300/30 to-green-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-300/25 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-pink-500/15 rounded-full blur-2xl animate-pulse delay-4000"></div>

        {/* Moving Gradient Waves */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-200/20 via-transparent to-blue-200/20 animate-pulse duration-[10000ms]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-green-200/15 via-transparent to-purple-200/15 animate-pulse duration-[12000ms] delay-2000"></div>
        </div>

        {/* Enhanced Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234,179,8,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,179,8,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "float 20s ease-in-out infinite",
          }}
        ></div>

        {/* Floating Particles - More Visible */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-yellow-400/60 rounded-full animate-bounce shadow-lg`}
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: `${2000 + i * 300}ms`,
            }}
          ></div>
        ))}

        {/* Floating Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent h-px animate-pulse"
            style={{
              width: `${200 + i * 50}px`,
              left: `${i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 1500}ms`,
              animationDuration: `${4000 + i * 500}ms`,
              transform: `rotate(${i * 15}deg)`,
            }}
          ></div>
        ))}

        {/* Pulsing Circles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute border border-yellow-400/20 rounded-full animate-ping"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${20 + i * 15}%`,
              top: `${40 + i * 8}%`,
              animationDelay: `${i * 2000}ms`,
              animationDuration: `${3000 + i * 1000}ms`,
            }}
          ></div>
        ))}
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/60 px-6 py-5 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img
              src="/images/LogoTransparent.png"
              alt="Reflect Logo"
              className="h-10 w-10 transition-transform duration-300 rounded-lg hover:scale-110 hover:rotate-3"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/images/bannerLarge.png"
              alt="Reflect Banner"
              className="h-8 transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="flex items-center space-x-4">
            <PrivyDropdown />
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-10 z-10">
        {/* Main Score Card */}
        <div ref={mainScoreAnimation.ref}>
          <MainScoreCard isVisible={mainScoreAnimation.isVisible} walletAddress={primaryWallet?.address} />
        </div>

        {/* PnL Card */}
        <PnLCard isVisible={mainScoreAnimation.isVisible} walletAddress={primaryWallet?.address} />

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

        {/* Visual Data Section - Performance Chart full width */}
        <div ref={chartAnimation.ref} className="mb-8">
          <PerformanceChart isVisible={chartAnimation.isVisible} />
        </div>
      </div>
    </div>
  )
}
