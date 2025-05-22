"use client"

import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginButton() {
  const { login, logout, authenticated, user } = usePrivy()

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-zinc-800 hover:text-black hover:bg-zinc-100"
          asChild
        >
          <Link href="/dashboard">
            {user.twitter?.profileImageUrl ? (
              <Image
                src={user.twitter.profileImageUrl || "/placeholder.svg"}
                alt="Profile"
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
            <span className="hidden md:inline">
              {user.twitter?.username || user.email?.address?.split("@")[0] || "Dashboard"}
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center gap-2 border-zinc-200 text-zinc-800 hover:text-black hover:bg-zinc-100"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    )
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
