import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import PrivyProviderWrapper from "@/components/privy-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reflect",
  description:
    "Reflect is an AI co-pilot for emotional traders. It helps you make more money — or lose less — by interrupting the habits that sabotage your trades.",
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#f8d300]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PrivyProviderWrapper>{children}</PrivyProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
