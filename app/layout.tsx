import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import PrivyProviderWrapper from "@/components/privy-provider"

export const metadata: Metadata = {
  title: "Reflect Dashboard",
  description: "AI-powered trading co-pilot for emotional traders",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <PrivyProviderWrapper>{children}</PrivyProviderWrapper>
      </body>
    </html>
  )
}
