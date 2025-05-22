"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LogoItem {
  name: string
  image: string
  color: string
}

export default function PartnersMarquee() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const logos: LogoItem[] = [
    { name: "Phantom", image: "/images/logos/phantom.png", color: "from-purple-400 via-purple-500 to-purple-600" },
    { name: "Trojan", image: "/images/logos/trojan.png", color: "from-blue-400 via-blue-500 to-purple-600" },
    { name: "GMGN", image: "/images/logos/gmgn.png", color: "from-green-400 via-green-500 to-lime-600" },
    { name: "BullX", image: "/images/logos/bullx.png", color: "from-emerald-400 via-teal-500 to-teal-600" },
    { name: "Nova", image: "/images/logos/nova.png", color: "from-purple-400 via-fuchsia-500 to-pink-600" },
    { name: "Padre", image: "/images/logos/padre.png", color: "from-orange-400 via-orange-500 to-orange-600" },
    { name: "Axiom", image: "/images/logos/axiom.png", color: "from-gray-700 via-gray-800 to-gray-900" },
    { name: "Dexscreener", image: "/images/logos/dexscreener.png", color: "from-gray-700 via-gray-800 to-gray-900" },
    { name: "Photon", image: "/images/logos/photon.png", color: "from-cyan-400 via-blue-500 to-purple-600" },
    // New logos
    { name: "Boop", image: "/images/logos/boop.png", color: "from-blue-400 via-blue-500 to-cyan-600" },
    { name: "Moon", image: "/images/logos/moon.png", color: "from-lime-400 via-lime-500 to-yellow-300" },
    { name: "Bonk", image: "/images/logos/bonk.png", color: "from-orange-400 via-orange-500 to-amber-600" },
    { name: "Raydium", image: "/images/logos/raydium.png", color: "from-blue-400 via-indigo-500 to-purple-600" },
    { name: "Believe", image: "/images/logos/believe.png", color: "from-green-400 via-green-500 to-emerald-600" },
    { name: "Pump", image: "/images/logos/pump.png", color: "from-emerald-400 via-green-500 to-teal-600" },
  ]

  // Create duplicated arrays with many more logos to ensure seamless looping
  const duplicatedLogos1 = [...logos, ...logos, ...logos, ...logos]
  const duplicatedLogos2 = [...logos.slice(3), ...logos, ...logos, ...logos.slice(0, 3)]
  const duplicatedLogos3 = [...logos.slice(6), ...logos, ...logos, ...logos.slice(0, 6)]

  return (
    <section className="py-12 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">Use on any Top Trading Platform</h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto font-light">
            Reflect integrates seamlessly with the tools and platforms traders already use.
          </p>
        </div>

        <div className="relative mt-8 max-w-4xl mx-auto">
          <div className="border rounded-[2rem] overflow-hidden py-3">
            {/* First marquee row */}
            <div className="flex overflow-hidden py-1 gap-2 flex-row mb-2">
              <div
                className={`flex shrink-0 justify-around gap-2 animate-marquee-continuous flex-row ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {duplicatedLogos1.slice(0, 15).map((item, index) => (
                  <LogoBox key={`row1-${index}`} item={item} delay={index * 50} />
                ))}
              </div>
              <div
                className={`flex shrink-0 justify-around gap-2 animate-marquee-continuous flex-row ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {duplicatedLogos1.slice(0, 15).map((item, index) => (
                  <LogoBox key={`row1-dup-${index}`} item={item} delay={index * 50} />
                ))}
              </div>
            </div>

            {/* Second marquee row (reverse direction) */}
            <div className="flex overflow-hidden py-1 gap-2 flex-row mb-2">
              <div
                className={`flex shrink-0 justify-around gap-2 animate-marquee-reverse-continuous flex-row ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {duplicatedLogos2.slice(0, 15).map((item, index) => (
                  <LogoBox key={`row2-${index}`} item={item} delay={index * 50} />
                ))}
              </div>
              <div
                className={`flex shrink-0 justify-around gap-2 animate-marquee-reverse-continuous flex-row ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {duplicatedLogos2.slice(0, 15).map((item, index) => (
                  <LogoBox key={`row2-dup-${index}`} item={item} delay={index * 50} />
                ))}
              </div>
            </div>

            {/* Third marquee row */}
            <div className="flex overflow-hidden py-1 gap-2 flex-row">
              <div
                className={`flex shrink-0 justify-around gap-2 animate-marquee-continuous flex-row ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {duplicatedLogos3.slice(0, 15).map((item, index) => (
                  <LogoBox key={`row3-${index}`} item={item} delay={index * 50} />
                ))}
              </div>
              <div
                className={`flex shrink-0 justify-around gap-2 animate-marquee-continuous flex-row ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {duplicatedLogos3.slice(0, 15).map((item, index) => (
                  <LogoBox key={`row3-dup-${index}`} item={item} delay={index * 50} />
                ))}
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-white to-90%"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface LogoBoxProps {
  item: LogoItem
  delay: number
}

function LogoBox({ item, delay }: LogoBoxProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`relative w-16 h-16 md:w-20 md:h-20 cursor-pointer overflow-hidden rounded-2xl border p-3 md:p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative w-full h-full select-none">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={`${item.name} Logo`}
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className="object-contain pointer-events-none"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r opacity-70 blur-[20px] filter ${item.color}`}
      ></div>
    </div>
  )
}
