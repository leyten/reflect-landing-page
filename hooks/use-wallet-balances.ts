"use client"

import { useState, useEffect } from "react"

interface Token {
  mint: string
  symbol: string
  name: string
  decimals: number
  uiBalance: number
  balance: string
}

interface WalletBalances {
  sol: number
  tokens: Token[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useWalletBalances(walletAddress: string | undefined): WalletBalances {
  const [sol, setSol] = useState(0)
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshCounter, setRefreshCounter] = useState(0)

  useEffect(() => {
    if (!walletAddress) {
      return
    }

    const fetchBalances = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch SOL balance from our API route
        const solResponse = await fetch(`/api/solana-balance?wallet=${walletAddress}`)
        const solData = await solResponse.json()

        if (!solResponse.ok) {
          throw new Error(solData.error || "Failed to fetch SOL balance")
        }

        // Mock token data (in production, you'd fetch this from a token API)
        const mockTokens: Token[] = [
          {
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            symbol: "USDC",
            name: "USD Coin",
            decimals: 6,
            uiBalance: Math.random() * 1000 + 100,
            balance: "0",
          },
          {
            mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
            symbol: "USDT",
            name: "Tether USD",
            decimals: 6,
            uiBalance: Math.random() * 500 + 50,
            balance: "0",
          },
          {
            mint: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
            symbol: "BONK",
            name: "Bonk",
            decimals: 5,
            uiBalance: Math.random() * 10000000 + 1000000,
            balance: "0",
          },
        ]

        setSol(solData.balance)
        setTokens(mockTokens)
      } catch (err) {
        console.error("Error fetching wallet balances:", err)
        setError(err instanceof Error ? err.message : "Unknown error")

        // Set mock data on error
        const mockBalance = 1 + (Number.parseInt(walletAddress?.slice(-4) || "0", 16) % 100) / 10
        setSol(mockBalance)
        setTokens([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalances()
  }, [walletAddress, refreshCounter])

  const refetch = () => {
    setRefreshCounter((prev) => prev + 1)
  }

  return {
    sol,
    tokens,
    isLoading,
    error,
    refetch,
  }
}
