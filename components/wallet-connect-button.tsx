"use client"

import { Button } from "@/components/ui/button"
import { usePrivy } from "@/lib/privy"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function WalletConnectButton() {
  const { login, authenticated, logout, user, ready } = usePrivy()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    setIsLoggingOut(false)
  }

  if (!ready) {
    return (
      <Button disabled className="bg-gray-200 text-gray-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (authenticated && user?.wallet?.address) {
    const displayAddress = `${user.wallet.address.substring(0, 4)}...${user.wallet.address.substring(
      user.wallet.address.length - 4,
    )}`

    return (
      <Button
        onClick={handleLogout}
        className="bg-yellow-400 hover:bg-gray-900 text-black hover:text-white font-medium transition-colors duration-200"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Disconnecting...
          </>
        ) : (
          <>Disconnect {displayAddress}</>
        )}
      </Button>
    )
  }

  return (
    <Button
      onClick={login}
      className="bg-yellow-400 hover:bg-gray-900 text-black hover:text-white font-medium transition-colors duration-200"
    >
      Connect Wallet
    </Button>
  )
}
