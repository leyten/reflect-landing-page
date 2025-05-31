"use client"

import { useState, useEffect } from "react"
import type { WalletAnalytics } from "@/lib/types"

export function useWalletAnalytics(walletAddress: string | null) {
  const [analytics, setAnalytics] = useState<WalletAnalytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!walletAddress) {
      setAnalytics(null)
      return
    }

    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/wallet-analytics?wallet=${walletAddress}`)

        if (!response.ok) {
          throw new Error("Failed to fetch wallet analytics")
        }

        const data = await response.json()
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Error fetching wallet analytics:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [walletAddress])

  return {
    analytics,
    loading,
    error,
    refetch: () => {
      if (walletAddress) {
        // Trigger refetch by updating a dependency
      }
    },
  }
}
