import type { TradeEvent, MoralisTransfer } from "./types"

const MORALIS_API_KEY = process.env.MORALIS_API_KEY
const MORALIS_BASE_URL = "https://solana-gateway.moralis.io"

export async function getWalletTransfers(walletAddress: string): Promise<MoralisTransfer[]> {
  if (!MORALIS_API_KEY) {
    throw new Error("MORALIS_API_KEY is not configured")
  }

  try {
    const response = await fetch(`${MORALIS_BASE_URL}/account/mainnet/${walletAddress}/transfers`, {
      headers: {
        "X-API-Key": MORALIS_API_KEY,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Moralis API error: ${response.status}`)
    }

    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error("Error fetching wallet transfers:", error)
    throw error
  }
}

export async function getWalletBalance(walletAddress: string) {
  if (!MORALIS_API_KEY) {
    throw new Error("MORALIS_API_KEY is not configured")
  }

  try {
    const response = await fetch(`${MORALIS_BASE_URL}/account/mainnet/${walletAddress}/balance`, {
      headers: {
        "X-API-Key": MORALIS_API_KEY,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Moralis API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching wallet balance:", error)
    throw error
  }
}

export function parseToTradeEvents(transfers: MoralisTransfer[], walletAddress: string): TradeEvent[] {
  const trades: TradeEvent[] = []

  // Group transfers by signature to identify complete trades
  const tradeGroups = new Map<string, MoralisTransfer[]>()

  transfers.forEach((transfer) => {
    if (!tradeGroups.has(transfer.signature)) {
      tradeGroups.set(transfer.signature, [])
    }
    tradeGroups.get(transfer.signature)!.push(transfer)
  })

  // Convert grouped transfers to trade events
  tradeGroups.forEach((groupTransfers, signature) => {
    const timestamp = groupTransfers[0].blockTime * 1000 // Convert to milliseconds

    // Determine if this is a buy or sell based on the direction of transfers
    const outgoing = groupTransfers.filter((t) => t.from === walletAddress)
    const incoming = groupTransfers.filter((t) => t.to === walletAddress)

    if (outgoing.length > 0 && incoming.length > 0) {
      // This looks like a swap/trade
      const direction = outgoing.length > incoming.length ? "sell" : "buy"

      // Estimate USD value (simplified - in production you'd need price data)
      const valueUSD = Math.random() * 10000 + 100 // Placeholder
      const pnlUSD = (Math.random() - 0.5) * 2000 // Placeholder

      trades.push({
        timestamp,
        valueUSD,
        pnlUSD,
        tokenSymbol: "SOL", // Simplified
        direction,
        signature,
      })
    }
  })

  return trades.sort((a, b) => a.timestamp - b.timestamp)
}
