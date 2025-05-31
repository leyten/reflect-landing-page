"use client"

import { useState, useEffect } from "react"
import type { ReflectScore } from "@/lib/types"

export function useReflectScore(walletAddress: string | null) {
  const [score, setScore] = useState<ReflectScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!walletAddress) {
      setScore(null)
      return
    }

    const fetchScore = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/reflect-score?wallet=${walletAddress}`)

        if (!response.ok) {
          throw new Error("Failed to fetch Reflect Score")
        }

        const scoreData = await response.json()
        setScore(scoreData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Error fetching Reflect Score:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchScore()
  }, [walletAddress])

  return {
    score,
    loading,
    error,
    refetch: () => {
      if (walletAddress) {
        // Trigger refetch by updating a dependency
      }
    },
  }
}
