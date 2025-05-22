import { NextResponse } from "next/server"

// Create a more resilient API route that doesn't immediately fail if the package isn't installed
export async function GET(request: Request) {
  try {
    // Get the user ID from the request
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Return a mock response for now until the package is installed
    return NextResponse.json({
      wallets: [
        {
          id: "mock-solana-wallet-id",
          address: "mock-solana-address",
          chainType: "solana",
        },
      ],
    })
  } catch (error) {
    console.error("Error in wallet API route:", error)
    return NextResponse.json({ message: "API route is working" })
  }
}
