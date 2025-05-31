export interface TradeEvent {
  timestamp: number
  valueUSD: number
  pnlUSD: number
  tokenSymbol: string
  direction: "buy" | "sell"
  signature: string
}

export interface ReflectScore {
  total: number
  emotionalControl: number
  riskConsistency: number
  tradePacing: number
  lossResponse: number
  selfCorrection: number
}

export interface MoralisTransfer {
  signature: string
  slot: number
  blockTime: number
  from: string
  to: string
  amount: string
  mint: string
  decimals: number
}

export interface WalletAnalytics {
  totalTrades: number
  totalVolume: number
  winRate: number
  avgTradeSize: number
  tradingDays: number
}
