"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
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
            href="https://discord.gg/usereflect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 hover:text-black transition-colors duration-300"
            aria-label="Join Discord"
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
              <circle cx="9" cy="12" r="1" />
              <circle cx="15" cy="12" r="1" />
              <path d="M7.5 7.2c3.5-1 5.5-1 9 0" />
              <path d="M7.5 16.8c3.5 1 5.5 1 9 0" />
              <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
              <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5" />
            </svg>
            <span className="sr-only">Join Discord</span>
          </a>
          <a
            href="https://x.com/use_reflect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 hover:text-black transition-colors duration-300"
            aria-label="Follow on X"
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
          <a
            href="https://dashboard.usereflect.io"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[140px] bg-black text-white hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 rounded-lg px-3 py-2 text-xs md:text-sm font-medium transition-colors duration-300 text-center md:px-0.5 md:w-28 leading-7 shadow"
          >
            Dashboard
          </a>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <a
            href="https://dashboard.usereflect.io"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[140px] md:w-[160px] bg-black text-white hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors duration-300 text-center"
          >
            Dashboard
          </a>
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
                href="https://discord.gg/usereflect"
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
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <path d="M7.5 7.2c3.5-1 5.5-1 9 0" />
                  <path d="M7.5 16.8c3.5 1 5.5 1 9 0" />
                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5" />
                </svg>
                Join Discord
              </a>
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
