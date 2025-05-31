"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import PrivyDropdown from "./privy-dropdown"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = () => {
      setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoTransparant-EFMqjstaAL9FZb6V7FEbMIIXa9gFEu.png"
            alt="Reflect Logo"
            width={36}
            height={36}
            className="mr-3"
          />
          <span
            className={`font-medium text-lg tracking-tight text-zinc-900 ${scrolled ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          >
            Reflect
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-zinc-800 hover:text-black font-medium text-sm tracking-wide transition-colors duration-300"
          >
            Why Reflect
          </Link>
          <Link
            href="#faq"
            className="text-zinc-800 hover:text-black font-medium text-sm tracking-wide transition-colors duration-300"
          >
            FAQ
          </Link>
          <a
            href="https://x.com/use_reflect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 hover:text-black transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            <span className="sr-only">Follow on X</span>
          </a>
          <PrivyDropdown />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <PrivyDropdown />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="text-zinc-800 hover:text-black transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col py-4">
              <Link
                href="#features"
                className="px-6 py-3 text-zinc-800 hover:text-black font-medium text-sm tracking-wide transition-colors duration-300 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Reflect
              </Link>
              <Link
                href="#faq"
                className="px-6 py-3 text-zinc-800 hover:text-black font-medium text-sm tracking-wide transition-colors duration-300 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <a
                href="https://x.com/use_reflect"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-zinc-800 hover:text-black transition-colors duration-300 hover:bg-gray-50 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
                Follow on X
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
