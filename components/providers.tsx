"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import type { PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren) {
  const router = useRouter()

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
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: false,
        },
        supportedWallets: [{ walletName: "phantom" }, { walletName: "solflare" }],
      }}
      onSuccess={() => router.push("/dashboard")}
    >
      {children}
    </PrivyProvider>
  )
}
