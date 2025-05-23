"use client"

import type React from "react"

import { PrivyProvider } from "@privy-io/react-auth"

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
        appearance: {
          theme: "light",
          accentColor: "#f8d300",
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
