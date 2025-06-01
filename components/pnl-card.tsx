"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface PnLCardProps {
  isVisible: boolean
  walletAddress?: string
}

const buyData = {
  day: { amount: 12450, trades: 8 },
  week: { amount: 48200, trades: 23 },
  month: { amount: 156800, trades: 89 },
  total: { amount: 1240000, trades: 1247 },
}

const sellData = {
  day: { amount: 13690, trades: 6 }, // Higher than buy for profit
  week: { amount: 53050, trades: 19 }, // Higher than buy for profit
  month: { amount: 154460, trades: 92 }, // Lower than buy for loss
  total: { amount: 1268750, trades: 1198 }, // Higher than buy for profit
}

// Calculate PnL correctly: sell - buy
const calculatePnL = (timeframe: string) => {
  const buy = buyData[timeframe as keyof typeof buyData]
  const sell = sellData[timeframe as keyof typeof sellData]
  const pnl = sell.amount - buy.amount
  const percentage = (pnl / buy.amount) * 100

  return {
    value: pnl,
    percentage: Number(percentage.toFixed(1)),
    isPositive: pnl >= 0,
  }
}

const winRates = {
  day: 68,
  week: 72,
  month: 45,
  total: 65,
}

export default function PnLCard({ isVisible, walletAddress }: PnLCardProps) {
  const [pnlTimeframe, setPnlTimeframe] = useState("day")

  const currentPnL = calculatePnL(pnlTimeframe)
  const currentBuy = buyData[pnlTimeframe as keyof typeof buyData]
  const currentSell = sellData[pnlTimeframe as keyof typeof sellData]
  const currentWinRate = winRates[pnlTimeframe as keyof typeof winRates]

  return (
    <Card
      className={`mb-10 bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trading Overview</h2>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            {["day", "week", "month", "total"].map((option) => (
              <button
                key={option}
                onClick={() => setPnlTimeframe(option)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  pnlTimeframe === option ? "bg-yellow-400 text-black" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {option === "total" ? "All Time" : option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main PnL Display */}
        <div className="text-center mb-8">
          <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-medium">
            {pnlTimeframe === "day"
              ? "Today's Performance"
              : pnlTimeframe === "week"
                ? "This Week's Performance"
                : pnlTimeframe === "month"
                  ? "This Month's Performance"
                  : "All Time Performance"}
          </div>
          <div className="flex items-baseline justify-center mb-2">
            <span className={`text-5xl font-black ${currentPnL.isPositive ? "text-green-500" : "text-red-500"}`}>
              {currentPnL.isPositive ? "+" : ""}${Math.abs(currentPnL.value).toLocaleString()}
            </span>
            <span className={`ml-3 text-2xl font-bold ${currentPnL.isPositive ? "text-green-500" : "text-red-500"}`}>
              {currentPnL.isPositive ? "+" : ""}
              {currentPnL.percentage}%
            </span>
          </div>
          <div className="text-gray-600 text-sm">Net Profit & Loss (Sell - Buy)</div>
        </div>

        {/* Buy/Sell Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Buy */}
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-red-700 font-semibold text-sm uppercase tracking-wide">Total Buy</div>
              <div className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                {currentBuy.trades} trades
              </div>
            </div>
            <div className="text-3xl font-black text-red-600 mb-1">${currentBuy.amount.toLocaleString()}</div>
            <div className="text-red-600 text-sm">
              Avg: ${Math.round(currentBuy.amount / currentBuy.trades).toLocaleString()} per trade
            </div>
          </div>

          {/* Total Sell */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-green-700 font-semibold text-sm uppercase tracking-wide">Total Sell</div>
              <div className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                {currentSell.trades} trades
              </div>
            </div>
            <div className="text-3xl font-black text-green-600 mb-1">${currentSell.amount.toLocaleString()}</div>
            <div className="text-green-600 text-sm">
              Avg: ${Math.round(currentSell.amount / currentSell.trades).toLocaleString()} per trade
            </div>
          </div>
        </div>

        {/* Win Rate Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-yellow-800 font-semibold text-sm uppercase tracking-wide mb-2">Win Rate</div>
              <div className="text-4xl font-black text-yellow-600 mb-1">{currentWinRate}%</div>
              <div className="text-yellow-700 text-sm">
                {Math.round((currentBuy.trades + currentSell.trades) * (currentWinRate / 100))} winning trades
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-800 font-semibold text-sm uppercase tracking-wide mb-2">Total Trades</div>
              <div className="text-3xl font-black text-yellow-600 mb-1">{currentBuy.trades + currentSell.trades}</div>
              <div className="text-yellow-700 text-sm">
                {Math.round((currentBuy.trades + currentSell.trades) * (1 - currentWinRate / 100))} losing trades
              </div>
            </div>
          </div>

          {/* Win Rate Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-yellow-700 mb-2">
              <span>Losses</span>
              <span>Wins</span>
            </div>
            <div className="h-3 bg-yellow-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${currentWinRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
