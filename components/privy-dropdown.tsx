"use client"

import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth"
import { useSolanaWallets } from "@privy-io/react-auth/solana"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Wallet, LogOut } from "lucide-react"
import { useEffect } from "react"

export default function PrivyDropdown() {
  const { ready, authenticated, user } = usePrivy()
  const { login } = useLogin()
  const { logout } = useLogout()
  const { wallets, ready: walletsReady } = useSolanaWallets()

  // Log wallet information when ready
  useEffect(() => {
    if (walletsReady && wallets.length > 0) {
      console.log("Solana wallets:", wallets)
      wallets.forEach((wallet, index) => {
        console.log(`Wallet ${index + 1}:`, {
          address: wallet.address,
          walletClientType: wallet.walletClientType,
          connectorType: wallet.connectorType,
        })
      })
    }
  }, [wallets, walletsReady])

  if (!ready) {
    return (
      <Button variant="outline" disabled className="rounded-full">
        Loading...
      </Button>
    )
  }

  if (!authenticated) {
    return (
      <Button
        onClick={login}
        className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2 text-sm font-medium"
      >
        Connect Wallet
      </Button>
    )
  }

  const primaryWallet = wallets[0] // Most recently connected wallet
  const truncatedAddress = primaryWallet?.address
    ? `${primaryWallet.address.slice(0, 4)}...${primaryWallet.address.slice(-4)}`
    : "No wallet"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border border-black/10 hover:bg-white/90"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {truncatedAddress}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email?.address || "Connected User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{primaryWallet?.address}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {wallets.map((wallet, index) => (
          <DropdownMenuItem key={wallet.address} className="cursor-default">
            <Wallet className="w-4 h-4 mr-2" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">
                {wallet.walletClientType === "privy" ? "Embedded Wallet" : "External Wallet"}
              </span>
              <span className="text-xs text-muted-foreground">
                {`${wallet.address.slice(0, 8)}...${wallet.address.slice(-8)}`}
              </span>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
