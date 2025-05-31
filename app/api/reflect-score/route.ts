import { type NextRequest, NextResponse } from "next/server"
import type { ReflectScore } from "@/lib/types"

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
    // const score = calculateReflectScore(trades)

    // Mock score data based on wallet address for consistency
    const mockScore: ReflectScore = {
      total: 65 + (Number.parseInt(wallet.slice(-2), 16) % 30),
      emotionalControl: 70 + (Number.parseInt(wallet.slice(-3, -1), 16) % 25),
      riskConsistency: 60 + (Number.parseInt(wallet.slice(-4, -2), 16) % 30),
      tradePacing: 75 + (Number.parseInt(wallet.slice(-5, -3), 16) % 20),
      lossResponse: 65 + (Number.parseInt(wallet.slice(-6, -4), 16) % 25),
      selfCorrection: 80 + (Number.parseInt(wallet.slice(-7, -5), 16) % 15),
    }

    return NextResponse.json(mockScore)
  } catch (error) {
    console.error("Error calculating Reflect Score:", error)
    return NextResponse.json({ error: "Failed to calculate Reflect Score" }, { status: 500 })
  }
}
