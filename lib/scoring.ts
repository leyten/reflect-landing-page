import type { TradeEvent, ReflectScore } from "./types"

export function calculateReflectScore(trades: TradeEvent[]): ReflectScore {
  if (trades.length === 0) {
    return {
      total: 50,
      emotionalControl: 50,
      riskConsistency: 50,
      tradePacing: 50,
      lossResponse: 50,
      selfCorrection: 50,
    }
  }

  const emotionalControl = calculateEmotionalControl(trades)
  const riskConsistency = calculateRiskConsistency(trades)
  const tradePacing = calculateTradePacing(trades)
  const lossResponse = calculateLossResponse(trades)
  const selfCorrection = calculateSelfCorrection(trades)

  const total = Math.round(
    0.25 * emotionalControl + 0.2 * riskConsistency + 0.2 * tradePacing + 0.2 * lossResponse + 0.15 * selfCorrection,
  )

  return {
    total: Math.max(0, Math.min(100, total)),
    emotionalControl,
    riskConsistency,
    tradePacing,
    lossResponse,
    selfCorrection,
  }
}

function calculateEmotionalControl(trades: TradeEvent[]): number {
  let score = 100
  const revengeTrades = countRevengeTrades(trades)

  // Deduct points for revenge trading
  score -= revengeTrades * 5

  return Math.max(0, Math.min(100, score))
}

function calculateRiskConsistency(trades: TradeEvent[]): number {
  const tradeSizes = trades.map((t) => t.valueUSD)
  const avgSize = tradeSizes.reduce((a, b) => a + b, 0) / tradeSizes.length
  const variance = tradeSizes.reduce((acc, size) => acc + Math.pow(size - avgSize, 2), 0) / tradeSizes.length
  const stdDev = Math.sqrt(variance)

  // Lower standard deviation = higher consistency score
  const consistencyRatio = stdDev / avgSize
  const score = Math.max(0, 100 - consistencyRatio * 100)

  return Math.max(0, Math.min(100, score))
}

function calculateTradePacing(trades: TradeEvent[]): number {
  let score = 100
  const tradeBursts = countTradeBursts(trades)

  // Deduct points for overtrading bursts
  score -= tradeBursts * 4

  return Math.max(0, Math.min(100, score))
}

function calculateLossResponse(trades: TradeEvent[]): number {
  let score = 100
  let consecutiveLosses = 0
  let maxConsecutiveLosses = 0

  for (const trade of trades) {
    if (trade.pnlUSD < 0) {
      consecutiveLosses++
      maxConsecutiveLosses = Math.max(maxConsecutiveLosses, consecutiveLosses)
    } else {
      consecutiveLosses = 0
    }
  }

  // Deduct points for long losing streaks
  score -= Math.max(0, maxConsecutiveLosses - 2) * 10

  return Math.max(0, Math.min(100, score))
}

function calculateSelfCorrection(trades: TradeEvent[]): number {
  // Compare recent behavior to older behavior
  const midpoint = Math.floor(trades.length / 2)
  const olderTrades = trades.slice(0, midpoint)
  const recentTrades = trades.slice(midpoint)

  if (olderTrades.length === 0 || recentTrades.length === 0) {
    return 75 // Default score if not enough data
  }

  const olderRevenge = countRevengeTrades(olderTrades)
  const recentRevenge = countRevengeTrades(recentTrades)

  // Improvement in revenge trading behavior
  const improvement = olderRevenge - recentRevenge
  const score = 75 + improvement * 5

  return Math.max(0, Math.min(100, score))
}

function countRevengeTrades(trades: TradeEvent[]): number {
  let revengeCount = 0

  for (let i = 1; i < trades.length; i++) {
    const prevTrade = trades[i - 1]
    const currentTrade = trades[i]

    // Check if current trade happened within 5 minutes of a loss
    const timeDiff = currentTrade.timestamp - prevTrade.timestamp
    const fiveMinutes = 5 * 60 * 1000

    if (prevTrade.pnlUSD < 0 && timeDiff < fiveMinutes && currentTrade.valueUSD > prevTrade.valueUSD * 1.5) {
      revengeCount++
    }
  }

  return revengeCount
}

function countTradeBursts(trades: TradeEvent[]): number {
  let burstCount = 0
  const thirtyMinutes = 30 * 60 * 1000

  for (let i = 0; i < trades.length; i++) {
    let tradesInWindow = 1
    const windowStart = trades[i].timestamp

    for (let j = i + 1; j < trades.length; j++) {
      if (trades[j].timestamp - windowStart < thirtyMinutes) {
        tradesInWindow++
      } else {
        break
      }
    }

    if (tradesInWindow > 5) {
      burstCount++
    }
  }

  return burstCount
}
