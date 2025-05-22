"use client"

import { Button } from "@/components/ui/button"
import { usePrivy } from "@privy-io/react-auth"
import { LogIn } from "lucide-react"
import WalletDropdown from "./wallet-dropdown"

export default function FinalCTA() {
  const { login, authenticated } = usePrivy()

  return (
    <section className="py-32 bg-[#f8d300]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-medium text-black mb-8 tracking-tight">Be your own edge.</h2>
        <p className="text-xl text-black/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Stop letting emotions dictate your trading results.{" "}
          {authenticated ? "Manage your wallet below." : "Sign up for early access."}
        </p>

        {authenticated ? (
          <div className="flex justify-center">
            <WalletDropdown />
          </div>
        ) : (
          <Button
            className="bg-black text-white hover:bg-black/90 px-8 py-6 text-base rounded-full transition-all duration-300 font-medium tracking-wide"
            onClick={login}
          >
            <span className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign Up Now
            </span>
          </Button>
        )}
      </div>
    </section>
  )
}
