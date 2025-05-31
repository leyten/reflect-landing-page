import { type NextRequest, NextResponse } from "next/server"
import type { WalletAnalytics } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const wallet = searchParams.get("wallet")

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Mock analytics data based on wallet address for consistency
    const hashValue = wallet.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const mockAnalytics: WalletAnalytics = {
      totalTrades: 50 + (hashValue % 200),
      totalVolume: 10000 + ((hashValue * 100) % 50000),
      winRate: 45 + (hashValue % 40),
      avgTradeSize: 500 + ((hashValue * 10) % 2000),
      tradingDays: 15 + (hashValue % 30),
    }

    return NextResponse.json(mockAnalytics)
  } catch (error) {
    console.error("Error in wallet-analytics API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
