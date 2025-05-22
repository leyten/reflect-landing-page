"use client"

import { useState, useEffect } from "react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

// USDC token mint address on Solana
const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

export interface TokenBalance {
  mint: string
  balance: number
  decimals: number
  uiBalance: number
  symbol: string
}

export interface WalletBalances {
  sol: number
  tokens: TokenBalance[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useWalletBalances(address: string | undefined): WalletBalances {
  const [sol, setSol] = useState<number>(0)
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBalances = async () => {
    if (!address) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Connect to Solana mainnet
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, "confirmed")
      const publicKey = new PublicKey(address)

      // Fetch SOL balance
      const solBalance = await connection.getBalance(publicKey)
      setSol(solBalance / LAMPORTS_PER_SOL)

      // Fetch token accounts
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })

      // Process token accounts
      const tokenBalances: TokenBalance[] = tokenAccounts.value.map((account) => {
        const parsedInfo = account.account.data.parsed.info
        const mintAddress = parsedInfo.mint
        const balance = parsedInfo.tokenAmount.amount
        const decimals = parsedInfo.tokenAmount.decimals
        const uiBalance = parsedInfo.tokenAmount.uiAmount || 0

        // Determine token symbol (in a real app, you'd have a more complete token list)
        let symbol = "Unknown"
        if (mintAddress === USDC_MINT.toString()) {
          symbol = "USDC"
        }

        return {
          mint: mintAddress,
          balance: Number(balance),
          decimals,
          uiBalance,
          symbol,
        }
      })

      setTokens(tokenBalances)
    } catch (err) {
      console.error("Error fetching wallet balances:", err)
      setError("Failed to fetch balances")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBalances()
    // Set up a refresh interval (every 30 seconds)
    const intervalId = setInterval(fetchBalances, 30000)
    return () => clearInterval(intervalId)
  }, [address])

  return {
    sol,
    tokens,
    isLoading,
    error,
    refetch: fetchBalances,
  }
}
