"use client"

import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import WalletDropdown from "./wallet-dropdown"

export default function LoginButton() {
  const { login, authenticated, ready } = usePrivy()

  if (!ready) {
    return (
      <Button
        disabled
        className="flex items-center gap-2 bg-black text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm opacity-70"
      >
        <span className="animate-pulse">Loading...</span>
      </Button>
    )
  }

  if (authenticated) {
    return <WalletDropdown />
  }

  return (
    <Button
      onClick={login}
      className="flex items-center gap-2 bg-black text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm"
    >
      <LogIn className="h-4 w-4" />
      <span>Login</span>
    </Button>
  )
}
