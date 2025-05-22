"use client"

import { useState, useEffect } from "react"

interface AnimatedHeadlineProps {
  staticText: string
  changingWords: string[]
  interval?: number
}

export default function AnimatedHeadline({ staticText, changingWords, interval = 2500 }: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % changingWords.length)
        setIsAnimating(false)
      }, 500)
    }, interval)

    return () => clearInterval(intervalId)
  }, [changingWords.length, interval])

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center text-6xl md:text-7xl font-medium text-zinc-900 tracking-tight">
        <div className="text-left">{staticText}&nbsp;</div>
        <div className="w-[240px] text-left">
          <span
            className={`
              inline-block transition-all duration-300 ease-in-out
              ${isAnimating ? "opacity-0 transform -translate-y-8" : "opacity-100 transform translate-y-0"}
            `}
          >
            {changingWords[currentIndex]}.
          </span>
        </div>
      </div>
    </div>
  )
}
