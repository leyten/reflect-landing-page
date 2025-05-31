"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useSolanaWallets } from "@privy-io/react-auth/solana"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Settings, Wallet, Key, Copy, Check, ExternalLink, User, Mail, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const { user, logout, linkWallet, unlinkWallet } = usePrivy()
  const { wallets: solanaWallets, ready: walletsReady, exportWallet: exportSolWallet } = useSolanaWallets()
  const [showPrivateKey, setShowPrivateKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [exportingWallet, setExportingWallet] = useState<string | null>(null)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(id)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleExportWallet = async (walletAddress: string) => {
    try {
      setExportingWallet(walletAddress)

      // Find the Solana wallet
      const wallet = solanaWallets.find((w) => w.address === walletAddress)
      if (!wallet) throw new Error("Wallet not found")

      // Export Solana wallet private key
      const privateKey = await exportSolWallet(wallet)
    } catch (error) {
      console.error("Failed to export wallet:", error)
      alert("Failed to export wallet. Please try again.")
    } finally {
      setExportingWallet(null)
    }
  }

  const handleUnlinkWallet = async (walletAddress: string) => {
    try {
      await unlinkWallet(walletAddress)
    } catch (error) {
      console.error("Failed to unlink wallet:", error)
      alert("Failed to unlink wallet. Please try again.")
    }
  }

  const openSolanaExplorer = (address: string) => {
    window.open(`https://explorer.solana.com/address/${address}`, "_blank")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">Please connect your wallet to access settings</p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            User Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your account and wallet settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </CardTitle>
              <CardDescription>Your account details and authentication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.email && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <span className="text-sm text-gray-600">{user.email.address}</span>
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">User ID</span>
                </div>
                <span className="text-sm text-gray-600 font-mono">{formatAddress(user.id)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Created</span>
                </div>
                <span className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full" onClick={() => linkWallet()} disabled={!walletsReady}>
                  {!walletsReady ? "Discovering wallets..." : "Link Additional Wallet"}
                </Button>
                <Button variant="destructive" className="w-full" onClick={logout}>
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Solana Wallet Management
              </CardTitle>
              <CardDescription>Manage your Solana wallets and export private keys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Solana Wallets */}
                {!walletsReady && <div className="text-sm text-gray-500 mb-4">Discovering available wallets...</div>}
                {solanaWallets.length > 0 ? (
                  solanaWallets.map((wallet) => (
                    <div key={wallet.address} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant={wallet.walletClientType === "privy" ? "default" : "secondary"}>
                            {wallet.walletClientType === "privy" ? "Embedded" : "External"}
                          </Badge>
                          <span className="font-mono text-sm">{formatAddress(wallet.address)}</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => openSolanaExplorer(wallet.address)}>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="flex space-x-2">
                        {wallet.walletClientType === "privy" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExportWallet(wallet.address)}
                            disabled={exportingWallet === wallet.address}
                            className="flex items-center"
                          >
                            <Key className="w-3 h-3 mr-1" />
                            {exportingWallet === wallet.address ? "Exporting..." : "Export Private Key"}
                          </Button>
                        )}
                        {wallet.walletClientType !== "privy" && (
                          <Button size="sm" variant="destructive" onClick={() => handleUnlinkWallet(wallet.address)}>
                            Unlink
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No Solana wallets connected</p>
                    <Button variant="outline" className="mt-4" onClick={() => linkWallet()}>
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Private Key Display Modal */}
        {showPrivateKey && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Key className="w-5 h-5 mr-2" />
                  Private Key Export
                </CardTitle>
                <CardDescription className="text-red-600">
                  ⚠️ Keep this private key secure and never share it with anyone!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Private Key</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(showPrivateKey, "privatekey")}>
                      {copiedKey === "privatekey" ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <code className="text-xs break-all font-mono bg-white p-2 rounded block">{showPrivateKey}</code>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowPrivateKey(null)}>
                    Close
                  </Button>
                  <Button className="flex-1" onClick={() => copyToClipboard(showPrivateKey, "privatekey")}>
                    {copiedKey === "privatekey" ? "Copied!" : "Copy Key"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
