"use client"

import { useState, useRef, useEffect } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { ChevronDown, Copy, ExternalLink, LogOut, Settings, RefreshCw } from "lucide-react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

export default function WalletDropdown() {
  const { logout } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()
  const [isOpen, setIsOpen] = useState(false)
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Find the Solana embedded wallet
  const solanaWallet = wallets.find((wallet) => {
    // Check if it's a Privy embedded wallet for Solana
    return (
      wallet.walletClientType === "privy" && wallet.chain === "solana" && wallet.address && wallet.address.length === 44
    )
  })

  const walletAddress = solanaWallet?.address || ""
  const truncatedAddress = walletAddress
    ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`
    : "Connect"

  // USDC token address on Solana
  const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

  const fetchSolanaBalance = async (address: string) => {
    try {
      setLoading(true)
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")
      const publicKey = new PublicKey(address)

      // Fetch SOL balance
      const balance = await connection.getBalance(publicKey)
      setSolBalance(balance / LAMPORTS_PER_SOL)

      // Fetch USDC balance
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })

        const usdcAccount = tokenAccounts.value.find((account) => account.account.data.parsed.info.mint === USDC_MINT)

        if (usdcAccount) {
          const usdcAmount = usdcAccount.account.data.parsed.info.tokenAmount.uiAmount
          setUsdcBalance(usdcAmount)
        } else {
          setUsdcBalance(0)
        }
      } catch (error) {
        console.error("Error fetching USDC balance:", error)
        setUsdcBalance(0)
      }
    } catch (error) {
      console.error("Error fetching Solana balance:", error)
      setSolBalance(0)
      setUsdcBalance(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (walletsReady && solanaWallet?.address) {
      fetchSolanaBalance(solanaWallet.address)
    }
  }, [walletsReady, solanaWallet])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
    }
  }

  const viewOnExplorer = () => {
    if (walletAddress) {
      window.open(`https://explorer.solana.com/address/${walletAddress}`, "_blank")
    }
  }

  const handleRefresh = () => {
    if (solanaWallet?.address) {
      fetchSolanaBalance(solanaWallet.address)
    }
  }

  if (!walletsReady) {
    return (
      <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg px-4 py-2">
        <span className="animate-pulse">Loading wallet...</span>
      </Button>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg px-4 py-2 flex items-center gap-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M18 8H6C4.89543 8 4 8.89543 4 10V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V10C20 8.89543 19.1046 8 18 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 8V6C16 4.89543 15.1046 4 14 4H10C8.89543 4 8 4.89543 8 6V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{truncatedAddress}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-gray-700 font-mono text-sm truncate flex-1">{walletAddress}</div>
              <button onClick={copyToClipboard} className="text-gray-500 hover:text-gray-700" aria-label="Copy address">
                <Copy className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">$</span>
                  <span className="font-medium">USDC</span>
                </div>
                <span className="font-medium">
                  {loading ? (
                    <span className="inline-block w-16 h-5 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    `$${usdcBalance?.toFixed(2) || "0.00"}`
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-xl">⊙</span>
                  <span className="font-medium">SOL</span>
                </div>
                <span className="font-medium">
                  {loading ? (
                    <span className="inline-block w-20 h-5 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    `${solBalance?.toFixed(4) || "0.0000"} SOL`
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md transition-colors"
                onClick={handleRefresh}
              >
                <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh Balance</span>
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md transition-colors"
                onClick={() => {
                  /* User settings functionality */
                }}
              >
                <Settings className="h-5 w-5" />
                <span>User Settings</span>
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md transition-colors"
                onClick={viewOnExplorer}
              >
                <ExternalLink className="h-5 w-5" />
                <span>View on Explorer</span>
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-md transition-colors"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
