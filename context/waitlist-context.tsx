"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePrivy } from "@privy-io/react-auth"
import WaitlistModal from "@/components/waitlist-modal"

interface WaitlistContextType {
  showWaitlistModal: () => void
  hideWaitlistModal: () => void
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined)

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const { user, authenticated, ready } = usePrivy()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasPrompted, setHasPrompted] = useState(false)

  // Check if the user has an email from Privy
  const userEmail = user?.email?.address || ""
  const hasEmail = !!userEmail

  // Show the waitlist modal when a user logs in
  useEffect(() => {
    if (ready && authenticated && user && !hasPrompted) {
      // Wait a moment before showing the modal to ensure a smooth login experience
      const timer = setTimeout(() => {
        setIsModalOpen(true)
        setHasPrompted(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [ready, authenticated, user, hasPrompted])

  // Store the prompted state in localStorage to avoid showing the modal on every page load
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const hasBeenPrompted = localStorage.getItem(`reflect-waitlist-prompted-${user.id}`)
      if (hasBeenPrompted) {
        setHasPrompted(true)
      }
    }
  }, [user])

  // Update localStorage when the user has been prompted
  useEffect(() => {
    if (typeof window !== "undefined" && hasPrompted && user) {
      localStorage.setItem(`reflect-waitlist-prompted-${user.id}`, "true")
    }
  }, [hasPrompted, user])

  const showWaitlistModal = () => setIsModalOpen(true)
  const hideWaitlistModal = () => setIsModalOpen(false)

  return (
    <WaitlistContext.Provider value={{ showWaitlistModal, hideWaitlistModal }}>
      {children}
      <WaitlistModal isOpen={isModalOpen} onClose={hideWaitlistModal} defaultEmail={userEmail} hasEmail={hasEmail} />
    </WaitlistContext.Provider>
  )
}

export function useWaitlist() {
  const context = useContext(WaitlistContext)
  if (context === undefined) {
    throw new Error("useWaitlist must be used within a WaitlistProvider")
  }
  return context
}
