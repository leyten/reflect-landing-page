"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useSolanaWallets } from "@privy-io/react-auth/solana"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, Copy, Check, Settings, ExternalLink, LogOut, RefreshCw } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useWalletBalances } from "@/hooks/use-wallet-balances"

export default function PrivyDropdown() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { wallets, ready: walletsReady } = useSolanaWallets()
  const [copySuccess, setCopySuccess] = useState(false)

  const primaryWallet = wallets[0]
  const { sol, tokens, isLoading, error, refetch } = useWalletBalances(primaryWallet?.address)

  // Find USDC token balance
  const usdcToken = tokens.find((token) => token.symbol === "USDC")
  const usdcBalance = usdcToken?.uiBalance || 0

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const formatShortAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-4)}`
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const openSolanaExplorer = (address: string) => {
    window.open(`https://explorer.solana.com/address/${address}`, "_blank")
  }

  if (!ready || !walletsReady) {
    return (
      <div className="fixed-width-container">
        <Button
          disabled
          className="w-[160px] bg-black text-white hover:bg-black focus:bg-black active:bg-black rounded-lg px-4 py-2 text-sm font-medium"
        >
          Loading...
        </Button>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="fixed-width-container">
        <Button
          onClick={login}
          className="w-[160px] bg-black text-white hover:bg-black focus:bg-black active:bg-black rounded-lg px-4 py-2 text-sm font-medium"
        >
          Log In
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed-width-container">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-[160px] bg-black text-white hover:bg-black focus:bg-black active:bg-black rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                <span>{primaryWallet ? formatAddress(primaryWallet.address) : "No Wallet"}</span>
              </div>
              <ChevronDown className="w-4 h-4 ml-2" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-mono">
                {primaryWallet ? formatShortAddress(primaryWallet.address) : "No wallet"}
              </span>
              {primaryWallet && (
                <button
                  onClick={() => copyToClipboard(primaryWallet.address)}
                  className="p-1 hover:bg-gray-100 rounded focus:outline-none"
                  title="Copy address"
                >
                  {copySuccess ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Balances</span>
              <button
                onClick={() => refetch()}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none"
                disabled={isLoading}
                title="Refresh balances"
              >
                <RefreshCw className={`w-4 h-4 text-gray-500 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {error ? (
              <div className="text-xs text-red-500 mb-2">Error loading balances</div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">$</span>
                    <span className="text-sm">USDC</span>
                  </div>
                  <span className="text-sm font-medium">
                    {isLoading ? <span className="text-gray-400">Loading...</span> : `$${usdcBalance.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">◎</span>
                    <span className="text-sm">SOL</span>
                  </div>
                  <span className="text-sm font-medium">
                    {isLoading ? <span className="text-gray-400">Loading...</span> : `${sol.toFixed(4)} SOL`}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 space-y-2">
            <Link href="/settings">
              <button className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center focus:outline-none">
                <Settings className="w-4 h-4 mr-2" />
                User Settings
              </button>
            </Link>

            <button
              onClick={() => primaryWallet && openSolanaExplorer(primaryWallet.address)}
              className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center focus:outline-none"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </button>

            <button
              onClick={logout}
              className="w-full bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center focus:outline-none"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
