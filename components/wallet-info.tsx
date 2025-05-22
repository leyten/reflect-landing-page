"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export default function WalletInfo() {
  const { user, ready } = usePrivy()
  const { wallets } = useWallets()
  const [solanaBalances, setSolanaBalances] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)

  const fetchSolanaBalance = async (address: string) => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")
      const publicKey = new PublicKey(address)
      const balance = await connection.getBalance(publicKey)
      return balance / LAMPORTS_PER_SOL
    } catch (error) {
      console.error("Error fetching Solana balance:", error)
      return 0
    }
  }

  const refreshBalances = async () => {
    if (!wallets.length) return

    setLoading(true)
    const balances: Record<string, number> = {}

    for (const wallet of wallets) {
      if (wallet.chainName === "solana" && wallet.address) {
        balances[wallet.address] = await fetchSolanaBalance(wallet.address)
      }
    }

    setSolanaBalances(balances)
    setLoading(false)
  }

  useEffect(() => {
    if (ready && wallets.length > 0) {
      refreshBalances()
    }
  }, [ready, wallets])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!ready || !user) {
    return <div className="animate-pulse">Loading wallet information...</div>
  }

  if (wallets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-800 font-medium">Your Wallets</h3>
        </div>
        <p className="text-zinc-600 mb-4">No wallets connected yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-800 font-medium">Your Wallets</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshBalances}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div key={wallet.address} className="border border-zinc-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5 text-amber-500" />
              <span className="font-medium text-zinc-800">
                {wallet.walletClientType === "privy" ? "Embedded Wallet" : wallet.walletClientType}
              </span>
              {wallet.chainName && (
                <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-1 rounded-full">{wallet.chainName}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="text-zinc-500 text-sm truncate flex-1">
                {wallet.address?.slice(0, 8)}...{wallet.address?.slice(-6)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(wallet.address || "")}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy address</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                <a
                  href={`https://explorer.solana.com/address/${wallet.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View on explorer</span>
                </a>
              </Button>
            </div>

            <div className="bg-zinc-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-zinc-600 text-sm">Balance</span>
                <span className="font-medium">
                  {loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    `${solanaBalances[wallet.address || ""] || 0} SOL`
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
