"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-up"
  delay?: number
  duration?: number
  threshold?: number
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold })

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-up":
        return isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-16"
      case "fade-in":
        return isVisible ? "opacity-100" : "opacity-0"
      case "slide-in":
        return isVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-16"
      case "scale-up":
        return isVisible ? "opacity-100 transform scale-100" : "opacity-0 transform scale-95"
      default:
        return isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-16"
    }
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all ${getAnimationClass()} ${className}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
