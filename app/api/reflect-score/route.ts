import { type NextRequest, NextResponse } from "next/server"
import type { ReflectScore } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const wallet = searchParams.get("wallet")

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Mock score data based on wallet address for consistency
    const hashValue = wallet.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const mockScore: ReflectScore = {
      total: 65 + (hashValue % 30),
      emotionalControl: 70 + (hashValue % 25),
      riskConsistency: 60 + ((hashValue * 2) % 30),
      tradePacing: 75 + ((hashValue * 3) % 20),
      lossResponse: 65 + ((hashValue * 4) % 25),
      selfCorrection: 80 + ((hashValue * 5) % 15),
    }

    // Ensure all values are within 0-100 range
    Object.keys(mockScore).forEach((key) => {
      if (key !== "total") {
        mockScore[key as keyof ReflectScore] = Math.max(0, Math.min(100, mockScore[key as keyof ReflectScore]))
      }
    })

    return NextResponse.json(mockScore)
  } catch (error) {
    console.error("Error in reflect-score API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
