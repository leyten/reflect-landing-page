"use client"

import { useState, useRef, useEffect } from "react"
import { usePrivy, useWallets, useCreateWallet } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { ChevronDown, Copy, ExternalLink, LogOut, Settings } from "lucide-react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export default function WalletDropdown() {
  const { user, logout } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()
  const { createWallet } = useCreateWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<number | null>(1000) // Mocked for now
  const [loading, setLoading] = useState(false)
  const [walletError, setWalletError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [attemptedWalletCreation, setAttemptedWalletCreation] = useState(false)

  // Log wallets for debugging
  useEffect(() => {
    if (walletsReady) {
      console.log("Connected wallets:", wallets)
    }
  }, [wallets, walletsReady])

  // Find Solana wallets - prioritize explicit Solana wallets first
  const solanaWallets = wallets.filter(
    (wallet) =>
      wallet.chain === "solana" ||
      wallet.chainName?.toLowerCase() === "solana" ||
      (wallet.walletClientType === "privy" && wallet.address?.length === 44),
  )

  // Get the primary Solana wallet to display
  const solanaWallet = solanaWallets.length > 0 ? solanaWallets[0] : null

  // Only attempt to create a wallet once and only if truly needed
  useEffect(() => {
    const checkAndCreateWalletIfNeeded = async () => {
      // Only proceed if:
      // 1. Wallets are ready
      // 2. We haven't attempted wallet creation yet
      // 3. No Solana wallets exist
      if (walletsReady && !attemptedWalletCreation && solanaWallets.length === 0) {
        try {
          setAttemptedWalletCreation(true)
          console.log("No Solana wallets found, creating one automatically...")
          const wallet = await createWallet({
            solana: true,
          })
          console.log("Created Solana wallet:", wallet)
        } catch (error) {
          console.error("Error creating Solana wallet:", error)
          setWalletError(error instanceof Error ? error.message : "Failed to create wallet")
        }
      }
    }

    checkAndCreateWalletIfNeeded()
  }, [walletsReady, solanaWallets, createWallet, attemptedWalletCreation])

  const walletAddress = solanaWallet?.address || ""
  const truncatedAddress = walletAddress
    ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`
    : "Wallet"

  const fetchSolanaBalance = async (address: string) => {
    try {
      setLoading(true)
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")
      const publicKey = new PublicKey(address)
      const balance = await connection.getBalance(publicKey)
      setSolBalance(balance / LAMPORTS_PER_SOL)
    } catch (error) {
      console.error("Error fetching Solana balance:", error)
      setSolBalance(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (solanaWallet?.address) {
      fetchSolanaBalance(solanaWallet.address)
    }
  }, [solanaWallet])

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

  // Determine the button label based on state
  let buttonLabel = truncatedAddress
  if (!walletsReady) {
    buttonLabel = "Loading wallet..."
  } else if (!walletAddress) {
    buttonLabel = "Wallet"
  }

  // Determine if we have a usable Solana wallet
  const hasSolanaWallet = !!solanaWallet

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-4 py-2 flex items-center gap-2"
        disabled={!walletsReady}
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
        <span className={!walletsReady ? "animate-pulse" : ""}>{buttonLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            {hasSolanaWallet ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-gray-700 font-mono text-sm truncate flex-1">{walletAddress}</div>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Copy address"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 text-xl">$</span>
                      <span className="font-medium">USDC</span>
                    </div>
                    <span className="font-medium">${usdcBalance?.toFixed(2) || "0.00"}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 text-xl">⊙</span>
                      <span className="font-medium">SOL</span>
                    </div>
                    <span className="font-medium">
                      {loading ? "Loading..." : `${solBalance?.toFixed(4) || "0.0000"} SOL`}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
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
                </div>
              </>
            ) : (
              <div className="py-2 text-center text-gray-500 mb-4">
                {!walletsReady ? (
                  <p>Loading your Solana wallet...</p>
                ) : walletError ? (
                  <p>There was an issue with your Solana wallet. Please try again later.</p>
                ) : (
                  <p>No Solana wallet found. Please refresh the page or try again later.</p>
                )}
              </div>
            )}

            {/* Always show logout button */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-md transition-colors mt-3"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
