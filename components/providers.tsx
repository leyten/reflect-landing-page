"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import type { PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["email", "google", "twitter", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#f8d300",
          logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoTransparant-EFMqjstaAL9FZb6V7FEbMIIXa9gFEu.png",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets", // Create wallets for users without them
          solana: {
            enabled: true,
          },
        },
        supportedWallets: [{ walletName: "phantom" }, { walletName: "solflare" }],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
