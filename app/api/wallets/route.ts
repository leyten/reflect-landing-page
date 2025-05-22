import { NextResponse } from "next/server"
import { PrivyClient } from "@privy-io/server-auth"

// Initialize Privy client with your app ID and secret
// Note: In a real app, you'd store these in environment variables
const privy = new PrivyClient({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID || "",
  // You'll need to add your Privy secret to your environment variables
  appSecret: process.env.PRIVY_APP_SECRET || "",
})

export async function GET(request: Request) {
  try {
    // Get the user ID from the request (you'll need to pass this from the client)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Fetch all Solana wallets for the user
    const wallets = []
    let nextCursor

    do {
      const result = await privy.walletApi.getWallets({
        chainType: "solana",
        cursor: nextCursor,
        // You can add additional filters here if needed
      })
      wallets.push(...result.data)
      nextCursor = result.nextCursor
    } while (nextCursor)

    // Filter wallets for the specific user if needed
    const userWallets = wallets.filter((wallet) => wallet.ownerId === userId)

    return NextResponse.json({ wallets: userWallets })
  } catch (error) {
    console.error("Error fetching Solana wallets:", error)
    return NextResponse.json({ error: "Failed to fetch wallets" }, { status: 500 })
  }
}
