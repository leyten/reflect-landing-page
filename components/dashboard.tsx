"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings, BarChart3, Activity, Calendar } from "lucide-react"
import Link from "next/link"
import WalletInfo from "@/components/wallet-info"

export default function Dashboard() {
  const { ready, authenticated, user } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/")
    }
  }, [ready, authenticated, router])

  if (!ready || !authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-3xl font-medium text-zinc-900">
                Welcome, {user?.email?.address || user?.twitter?.username || "Trader"}
              </h1>
              <p className="text-zinc-500 mt-1">Here's your trading psychology overview</p>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-500 text-sm font-medium">Emotional Trades</h3>
                <BarChart3 className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-3xl font-medium text-red-500">42%</p>
              <p className="text-zinc-500 text-sm mt-1">-3% from last week</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-500 text-sm font-medium">Win Rate</h3>
                <Activity className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-3xl font-medium text-green-500">63%</p>
              <p className="text-zinc-500 text-sm mt-1">+5% from last week</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-500 text-sm font-medium">Trading Days</h3>
                <Calendar className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-3xl font-medium text-amber-500">18</p>
              <p className="text-zinc-500 text-sm mt-1">This month</p>
            </div>
          </div>

          {/* Wallet Information */}
          <div className="mb-8">
            <WalletInfo />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 mb-8">
            <h3 className="text-lg font-medium text-zinc-900 mb-4">Recent Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <p className="text-zinc-800 font-medium">You tend to overtrade after a winning streak</p>
                <p className="text-zinc-600 text-sm mt-1">
                  Consider setting a daily trade limit to avoid this pattern.
                </p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-zinc-800 font-medium">Your best trading hours are 10AM-12PM</p>
                <p className="text-zinc-600 text-sm mt-1">You have a 72% win rate during this time period.</p>
              </div>
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-zinc-800 font-medium">FOMO detected in 45% of your trades</p>
                <p className="text-zinc-600 text-sm mt-1">
                  Try implementing a pre-trade checklist to reduce impulsive decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f8d300]/10 rounded-xl p-6">
            <h3 className="text-lg font-medium text-zinc-900 mb-2">Recommendation</h3>
            <p className="text-zinc-700">
              Consider setting a 15-minute cooldown period after losses to reduce revenge trading impulses. This simple
              practice has helped traders reduce emotional decisions by up to 30%.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
