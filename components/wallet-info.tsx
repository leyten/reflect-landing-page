"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export default function WalletInfo() {
  const { ready: privyReady } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()
  const [solanaBalances, setSolanaBalances] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)

  // Find wallets that look like Solana wallets (by address format)
  const solanaWallets = wallets.filter(
    (wallet) =>
      wallet.address &&
      (wallet.address.length === 44 || // Solana addresses are typically 44 characters
        wallet.chainId?.includes("solana") ||
        wallet.type === "solana"),
  )

  const fetchSolanaBalance = async (address: string) => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")

      // Validate the address format before creating a PublicKey
      if (!address || address.length !== 44) {
        console.warn("Invalid Solana address format:", address)
        return 0
      }

      try {
        const publicKey = new PublicKey(address)
        const balance = await connection.getBalance(publicKey)
        return balance / LAMPORTS_PER_SOL
      } catch (err) {
        console.error("Error creating PublicKey or fetching balance:", err)
        return 0
      }
    } catch (error) {
      console.error("Error fetching Solana balance:", error)
      return 0
    }
  }

  const refreshBalances = async () => {
    if (!solanaWallets.length) return

    setLoading(true)
    const balances: Record<string, number> = {}

    for (const wallet of solanaWallets) {
      if (wallet.address) {
        try {
          balances[wallet.address] = await fetchSolanaBalance(wallet.address)
        } catch (e) {
          console.error("Error fetching balance for wallet:", wallet.address, e)
          balances[wallet.address] = 0
        }
      }
    }

    setSolanaBalances(balances)
    setLoading(false)
  }

  useEffect(() => {
    if (privyReady && walletsReady && solanaWallets.length > 0) {
      refreshBalances()
    }
  }, [privyReady, walletsReady, solanaWallets])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!privyReady || !walletsReady) {
    return <div className="animate-pulse">Loading wallet information...</div>
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-800 font-medium">Your Wallets</h3>
        <div className="flex gap-2">
          {solanaWallets.length > 0 && (
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
          )}
        </div>
      </div>

      {solanaWallets.length > 0 ? (
        <div className="space-y-4">
          {solanaWallets.map((wallet) => (
            <div key={wallet.address} className="border border-zinc-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-amber-500" />
                <span className="font-medium text-zinc-800">
                  {wallet.walletClientType === "privy" ? "Embedded Wallet" : wallet.walletClientType}
                </span>
                <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-1 rounded-full">Wallet</span>
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
      ) : (
        <div className="text-center py-8 border border-dashed border-zinc-200 rounded-lg">
          <p className="text-zinc-600 mb-4">No wallets found.</p>
          <p className="text-zinc-500 text-sm mb-6">Please refresh the page or try again later.</p>
        </div>
      )}
    </div>
  )
}
