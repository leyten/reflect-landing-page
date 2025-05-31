"use client"

import { createPrivy, type PrivyClientConfig } from "@privy-io/react-auth"
import { useEffect, useState } from "react"

// Configure Privy for Solana wallet connections
const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: "light",
    accentColor: "#f8d300",
    logo: "/images/LogoTransparent.png",
  },
  supportedChains: [
    {
      id: "solana",
      name: "Solana",
      rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
    },
  ],
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    noPromptOnSignature: true,
  },
}

export const { PrivyProvider, usePrivy } = createPrivy(privyConfig)

// Custom hook to get connected wallet address
export function useWalletAddress() {
  const { user, authenticated, ready } = usePrivy()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return

    if (authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address)
    } else {
      setWalletAddress(null)
    }

    setLoading(false)
  }, [user, authenticated, ready])

  return { walletAddress, loading, authenticated }
}
