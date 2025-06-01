"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SettingsCardProps {
  isVisible: boolean
}

const settingsData = [
  { title: "Popup Sensitivity", subtitle: "Balanced", checked: true, type: "slider", value: [50] },
  { title: "URL Blocker", subtitle: "Enabled", checked: true, type: "switch" },
  { title: "Post-Trade Journal", subtitle: "Optional notes", checked: false, type: "switch" },
]

export default function SettingsCard({ isVisible }: SettingsCardProps) {
  const [sensitivityValue, setSensitivityValue] = useState([50])

  const getSensitivityLabel = (value: number) => {
    if (value <= 25) return "Low"
    if (value <= 75) return "Balanced"
    return "High"
  }

  const snapToStage = (value: number[]) => {
    const val = value[0]
    if (val <= 25) return [0]
    if (val <= 75) return [50]
    return [100]
  }

  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-300 h-full ${
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
                <div className="text-xs text-gray-500">
                  {setting.type === "slider" ? getSensitivityLabel(sensitivityValue[0]) : setting.subtitle}
                </div>
              </div>
              {setting.type === "slider" ? (
                <div className="flex items-center space-x-3">
                  {[
                    { value: 0, label: "Low" },
                    { value: 50, label: "Balanced" },
                    { value: 100, label: "High" },
                  ].map((stage) => (
                    <button
                      key={stage.value}
                      onClick={() => setSensitivityValue([stage.value])}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium ${
                        sensitivityValue[0] === stage.value
                          ? "bg-yellow-400 border-yellow-500 text-black shadow-lg"
                          : "bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                      title={stage.label}
                    >
                      {stage.label.charAt(0)}
                    </button>
                  ))}
                </div>
              ) : (
                <Switch defaultChecked={setting.checked} className="data-[state=checked]:bg-yellow-400" />
              )}
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
