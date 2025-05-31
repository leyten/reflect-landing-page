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
        // Fetch SOL balance
        const solResponse = await fetch(`https://api.mainnet-beta.solana.com`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [walletAddress],
          }),
        })

        const solData = await solResponse.json()
        if (solData.error) {
          throw new Error(solData.error.message)
        }

        const solBalance = solData.result.value / 1000000000 // Convert lamports to SOL

        // For demo purposes, we'll create some mock token data
        // In a real app, you would fetch this from an API
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

        setSol(solBalance)
        setTokens(mockTokens)
      } catch (err) {
        console.error("Error fetching wallet balances:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
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
