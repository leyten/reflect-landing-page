"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import AnimatedHeadline from "@/components/animated-headline"
import WhyUseReflect from "@/components/features"
import FAQ from "@/components/faq"
import AnimatedSection from "@/components/animated-section"
import PartnersMarquee from "@/components/partners-marquee"
import { useState } from "react"

export default function Home() {
  const changingWords = ["smarter", "better", "clearer", "calmer"]
  const [timeframe, setTimeframe] = useState("day")
  const [copied, setCopied] = useState(false)

  const dashboardData = {
    day: {
      emotionalTrades: "42%",
      rationalTrades: "58%",
      winRate: "63%",
      fearBased: "32%",
      fomo: "45%",
      revenge: "18%",
      recommendation: "Consider setting a 15-minute cooldown period after losses to reduce revenge trading impulses.",
    },
    week: {
      emotionalTrades: "38%",
      rationalTrades: "62%",
      winRate: "67%",
      fearBased: "28%",
      fomo: "40%",
      revenge: "15%",
      recommendation:
        "Your win rate improves when you trade during market hours with higher volume. Consider focusing on these periods.",
    },
    month: {
      emotionalTrades: "35%",
      rationalTrades: "65%",
      winRate: "71%",
      fearBased: "25%",
      fomo: "32%",
      revenge: "12%",
      recommendation:
        "You've shown consistent improvement in emotional control. Continue practicing mindfulness before major trades.",
    },
  }

  const currentData = dashboardData[timeframe]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("4XvgyT7bzc9fYVZpg4xn9YMmV33g3QxX6oJUa8WwxBLV")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8d300] via-white via-25% to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-32 md:pt-28 md:pb-40">
        <div className="container px-4 mx-auto">
          <AnimatedSection animation="fade-in" duration={1000}>
            <div className="max-w-4xl mx-auto mb-20">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TekstBannerTransparent-1foxVMvSdbntkkeikTK2IhgTfJO661.png"
                alt="Reflect"
                width={600}
                height={180}
                className="mx-auto mb-16"
                priority
              />
              <div className="mb-16">
                <AnimatedHeadline staticText="Trade" changingWords={changingWords} />
              </div>
              <p className="text-xl md:text-2xl text-zinc-700 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide text-center">
                Reflect is an AI co-pilot for emotional traders. It helps you make more money — or lose less — by
                interrupting the habits that sabotage your trades.
              </p>
              {/* Contract Address Bar */}
              <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/80 shadow-xl max-w-fit mx-auto">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-black tracking-wide">$REFLECT CA:</span>
                  <code className="text-xs font-mono text-black bg-white/80 px-2 py-1 rounded-lg border border-gray-200">
                    4XvgyT7bzc9fYVZpg4xn9YMmV33g3QxX6oJUa8WwxBLV
                  </code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center w-7 h-7 bg-black hover:bg-black/90 rounded-lg transition-all duration-200 hover:scale-110 shadow-md"
                  title="Copy contract address"
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Notification Examples */}
          <div className="max-w-5xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Notification 1 */}
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f8d300]/20 to-[#f8d300]/20 via-white/30 rounded-xl blur-xl transform -translate-y-2"></div>
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 group h-[160px]">
                    <div className="px-4 py-3 flex items-center">
                      <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 bg-[#f8d300] flex items-center justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo4-xmuSqqlYV0yitR15gpbjsAwq29LEUq.png"
                          alt="Reflect Logo"
                          width={28}
                          height={28}
                          className="rounded-lg"
                        />
                      </div>
                      <span className="text-zinc-900 font-medium text-sm">REFLECT</span>
                      <div className="ml-auto text-xs text-zinc-500">Just now</div>
                    </div>
                    <div className="px-4 pb-3">
                      <h3 className="text-zinc-900 text-base font-medium mb-1 leading-tight">
                        Down $3,482 in the last 6 trades.
                      </h3>
                      <p className="text-zinc-600 text-xs mb-3">This could be tilt. Consider taking a break.</p>
                      <div className="flex justify-end">
                        <button className="px-4 py-1 text-xs bg-[#f8d300] text-black rounded-full hover:bg-[#f8d300]/90 transition-all duration-300 group-hover:shadow-glow">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Notification 2 */}
              <AnimatedSection animation="fade-up" delay={400}>
                <div className="transform transition-all duration-300 hover:scale-105 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f8d300]/20 to-[#f8d300]/20 via-white/30 rounded-xl blur-xl transform -translate-y-2"></div>
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 group h-[160px]">
                    <div className="px-4 py-3 flex items-center">
                      <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 bg-[#f8d300] flex items-center justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo4-xmuSqqlYV0yitR15gpbjsAwq29LEUq.png"
                          alt="Reflect Logo"
                          width={28}
                          height={28}
                          className="rounded-lg"
                        />
                      </div>
                      <span className="text-zinc-900 font-medium text-sm">REFLECT</span>
                      <div className="ml-auto text-xs text-zinc-500">2m ago</div>
                    </div>
                    <div className="px-4 pb-3">
                      <h3 className="text-zinc-900 text-base font-medium mb-1 leading-tight">
                        This trade is 3.5x your average size.
                      </h3>
                      <p className="text-zinc-600 text-xs mb-3">High conviction, or an emotional reaction?</p>
                      <div className="flex justify-end">
                        <button className="px-4 py-1 text-xs bg-[#f8d300] text-black rounded-full hover:bg-[#f8d300]/90 transition-all duration-300 group-hover:shadow-glow">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Notification 3 */}
              <AnimatedSection animation="fade-up" delay={600}>
                <div className="transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f8d300]/20 to-[#f8d300]/20 via-white/30 rounded-xl blur-xl transform -translate-y-2"></div>
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 group h-[160px]">
                    <div className="px-4 py-3 flex items-center">
                      <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 bg-[#f8d300] flex items-center justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo4-xmuSqqlYV0yitR15gpbjsAwq29LEUq.png"
                          alt="Reflect Logo"
                          width={28}
                          height={28}
                          className="rounded-lg"
                        />
                      </div>
                      <span className="text-zinc-900 font-medium text-sm">REFLECT</span>
                      <div className="ml-auto text-xs text-zinc-500">5m ago</div>
                    </div>
                    <div className="px-4 pb-3">
                      <h3 className="text-zinc-900 text-base font-medium mb-1 leading-tight">
                        It seems you're revenge trading.
                      </h3>
                      <p className="text-zinc-600 text-xs mb-3">This behavior often leads to poor outcomes.</p>
                      <div className="flex justify-end">
                        <button className="px-4 py-1 text-xs bg-[#f8d300] text-black rounded-full hover:bg-[#f8d300]/90 transition-all duration-300 group-hover:shadow-glow">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <PartnersMarquee />

          {/* Trading Dashboard Preview */}
          <div className="mb-24"></div>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f8d300]/20 to-[#f8d300]/20 via-white/30 rounded-[2rem] blur-3xl transform -translate-y-4"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-4">
                      Trading Insights
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight text-zinc-900">
                      Understand your trading psychology
                    </h3>
                    <p className="text-zinc-600 mb-6 font-light leading-relaxed">
                      Reflect analyzes your trading patterns and provides personalized insights to help you identify
                      emotional triggers and improve your decision-making.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                      <Button
                        className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-5 text-sm font-medium"
                        asChild
                      >
                        <a
                          href="https://x.com/use_reflect"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                          </svg>
                          Follow for Updates
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-100 flex justify-between items-center">
                        <h4 className="font-medium text-zinc-900">Trading Psychology Analysis</h4>
                        <div className="flex space-x-1">
                          <button
                            className={`px-2 py-1 text-xs rounded-md ${timeframe === "day" ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
                            onClick={() => setTimeframe("day")}
                          >
                            Day
                          </button>
                          <button
                            className={`px-2 py-1 text-xs rounded-md ${timeframe === "week" ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
                            onClick={() => setTimeframe("week")}
                          >
                            Week
                          </button>
                          <button
                            className={`px-2 py-1 text-xs rounded-md ${timeframe === "month" ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
                            onClick={() => setTimeframe("month")}
                          >
                            Month
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between mb-4">
                          <div className="text-center">
                            <div className="text-xs text-zinc-500 mb-1">Emotional Trades</div>
                            <div className="text-xl font-medium text-red-500">{currentData.emotionalTrades}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-zinc-500 mb-1">Rational Trades</div>
                            <div className="text-xl font-medium text-green-500">{currentData.rationalTrades}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-zinc-500 mb-1">Win Rate</div>
                            <div className="text-xl font-medium text-amber-500">{currentData.winRate}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs font-medium text-zinc-700">Fear-Based Decisions</div>
                            <div className="text-xs text-zinc-500">{currentData.fearBased}</div>
                          </div>
                          <div className="w-full bg-zinc-100 rounded-full h-2">
                            <div
                              className="bg-blue-400 h-2 rounded-full"
                              style={{ width: currentData.fearBased }}
                            ></div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs font-medium text-zinc-700">FOMO Trades</div>
                            <div className="text-xs text-zinc-500">{currentData.fomo}</div>
                          </div>
                          <div className="w-full bg-zinc-100 rounded-full h-2">
                            <div className="bg-purple-400 h-2 rounded-full" style={{ width: currentData.fomo }}></div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs font-medium text-zinc-700">Revenge Trading</div>
                            <div className="text-xs text-zinc-500">{currentData.revenge}</div>
                          </div>
                          <div className="w-full bg-zinc-100 rounded-full h-2">
                            <div className="bg-red-400 h-2 rounded-full" style={{ width: currentData.revenge }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhyUseReflect />

      <FAQ />
    </div>
  )
}
