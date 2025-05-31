"use client"
import { useEffect, useRef, useState } from "react"
import MainScoreCard from "./components/main-score-card"
import PnLCard from "./components/pnl-card"
import BehavioralSummaryCard from "./components/behavioral-summary-card"
import PsychologicalProfileCard from "./components/psychological-profile-card"
import SettingsCard from "./components/settings-card"
import PerformanceChart from "./components/performance-chart"
import PrivyDropdown from "./components/privy-dropdown"
import { usePrivy } from "@privy-io/react-auth"
import { useSolanaWallets } from "@privy-io/react-auth/solana"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export default function ReflectDashboard() {
  const mainScoreAnimation = useScrollAnimation()
  const behavioralAnimation = useScrollAnimation()
  const profileAnimation = useScrollAnimation()
  const settingsAnimation = useScrollAnimation()
  const chartAnimation = useScrollAnimation()

  const { ready, authenticated, login } = usePrivy()
  const { wallets, ready: walletsReady } = useSolanaWallets()
  const primaryWallet = wallets?.[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img
              src="/images/LogoTransparent.png"
              alt="Reflect Logo"
              className="h-10 w-10 transition-transform duration-200 rounded-lg"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/images/bannerLarge.png" alt="Reflect Banner" className="h-8 transition-transform duration-200" />
          </div>
          <div className="flex items-center space-x-4">
            <PrivyDropdown />
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {!ready || !walletsReady ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-400 mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : !authenticated ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img src="/images/LogoTransparent.png" alt="Reflect Logo" className="h-24 w-24 mb-8" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Reflect</h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Connect your Solana wallet to see your personalized Reflect Score and trading analytics.
            </p>
            <Button
              onClick={login}
              className="bg-yellow-400 hover:bg-gray-900 text-black hover:text-white font-bold transition-colors duration-200 rounded-xl h-12 px-8"
            >
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            {/* Main Score Card */}
            <div ref={mainScoreAnimation.ref}>
              <MainScoreCard isVisible={mainScoreAnimation.isVisible} walletAddress={primaryWallet?.address} />
            </div>

            {/* PnL Card */}
            <PnLCard isVisible={mainScoreAnimation.isVisible} walletAddress={primaryWallet?.address} />

            {/* Update the grid containers to use grid with equal height rows */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Behavioral Summary */}
              <div ref={behavioralAnimation.ref} className="h-full">
                <BehavioralSummaryCard isVisible={behavioralAnimation.isVisible} />
              </div>

              {/* Psychological Profile */}
              <div ref={profileAnimation.ref} className="h-full">
                <PsychologicalProfileCard isVisible={profileAnimation.isVisible} />
              </div>

              {/* Settings */}
              <div ref={settingsAnimation.ref} className="h-full">
                <SettingsCard isVisible={settingsAnimation.isVisible} />
              </div>
            </div>

            {/* Visual Data Section - Performance Chart full width */}
            <div ref={chartAnimation.ref} className="mb-8">
              <PerformanceChart isVisible={chartAnimation.isVisible} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
