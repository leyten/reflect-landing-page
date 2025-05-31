"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface SettingsCardProps {
  isVisible: boolean
}

const settingsData = [
  { title: "Popup Sensitivity", subtitle: "Balanced", checked: true },
  { title: "URL Blocker", subtitle: "Enabled", checked: true },
  { title: "Post-Trade Journal", subtitle: "Optional notes", checked: false },
]

export default function SettingsCard({ isVisible }: SettingsCardProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {settingsData.map((setting, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 rounded-xl transition-colors duration-200">
              <div>
                <div className="text-sm font-semibold text-gray-900">{setting.title}</div>
                <div className="text-xs text-gray-500">{setting.subtitle}</div>
              </div>
              <Switch defaultChecked={setting.checked} className="data-[state=checked]:bg-yellow-400" />
            </div>
          ))}
        </div>
        <Button className="w-full bg-yellow-400 hover:bg-gray-900 text-black hover:text-white font-bold transition-colors duration-200 rounded-xl h-12">
          Export Data
        </Button>
      </CardContent>
    </Card>
  )
}
