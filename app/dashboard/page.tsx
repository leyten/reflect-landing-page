"use client"
import DashboardComponent from "@/components/dashboard"
import { Providers } from "@/components/providers"

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardComponent />
    </Providers>
  )
}
