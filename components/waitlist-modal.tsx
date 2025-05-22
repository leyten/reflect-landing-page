"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { subscribeToWaitlist } from "@/app/actions"
import Image from "next/image"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  defaultEmail?: string
  hasEmail: boolean
}

export default function WaitlistModal({ isOpen, onClose, defaultEmail = "", hasEmail }: WaitlistModalProps) {
  const [email, setEmail] = useState(defaultEmail)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null)

  if (!isOpen) return null

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setResult(null)

    try {
      const result = await subscribeToWaitlist(formData)
      setResult(result)

      if (result.success) {
        // Close the modal after a successful submission after 2 seconds
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      setResult({ success: false, message: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex justify-center mb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoTransparant-EFMqjstaAL9FZb6V7FEbMIIXa9gFEu.png"
            alt="Reflect Logo"
            width={60}
            height={60}
            className="mb-2"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Join the Reflect Waitlist</h2>
        <p className="text-gray-600 text-center mb-6">
          Be the first to know when Reflect launches and get early access.
        </p>

        {result?.success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
            <p className="text-green-800">{result.message}</p>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            {hasEmail ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Would you like to join our waitlist with your email ({defaultEmail})?
                </p>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#f8d300] hover:bg-[#e6c400] text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Yes, Join Waitlist"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                    No, Thanks
                  </Button>
                </div>
                <input type="hidden" name="email" value={defaultEmail} />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f8d300] focus:border-transparent outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#f8d300] hover:bg-[#e6c400] text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </div>
            )}

            {result?.success === false && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{result.message}</p>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              We respect your privacy and will never share your email with third parties.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
