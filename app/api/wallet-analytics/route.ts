import { type NextRequest, NextResponse } from "next/server"
import type { WalletAnalytics } from "@/lib/types"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const wallet = searchParams.get("wallet")

  if (!wallet) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
  }

  try {
    // For demo purposes, return mock data to avoid API issues
    // In production, uncomment the lines below to use real Moralis data

    // const transfers = await getWalletTransfers(wallet)
    // const trades = parseToTradeEvents(transfers, wallet)

    // Mock analytics data based on wallet address for consistency
    const mockAnalytics: WalletAnalytics = {
      totalTrades: 50 + (Number.parseInt(wallet.slice(-3), 16) % 200),
      totalVolume: 10000 + (Number.parseInt(wallet.slice(-4), 16) % 50000),
      winRate: 45 + (Number.parseInt(wallet.slice(-2), 16) % 40),
      avgTradeSize: 500 + (Number.parseInt(wallet.slice(-5, -3), 16) % 2000),
      tradingDays: 15 + (Number.parseInt(wallet.slice(-6, -4), 16) % 30),
    }

    return NextResponse.json(mockAnalytics)
  } catch (error) {
    console.error("Error fetching wallet analytics:", error)
    return NextResponse.json({ error: "Failed to fetch wallet analytics" }, { status: 500 })
  }
}
