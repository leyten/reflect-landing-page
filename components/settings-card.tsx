"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
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
                <div className="w-32">
                  <div className="relative mb-2">
                    {/* Stage indicators */}
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span className={sensitivityValue[0] === 0 ? "text-yellow-600 font-bold" : ""}>Low</span>
                      <span className={sensitivityValue[0] === 50 ? "text-yellow-600 font-bold" : ""}>Bal</span>
                      <span className={sensitivityValue[0] === 100 ? "text-yellow-600 font-bold" : ""}>High</span>
                    </div>
                    {/* Stage dots */}
                    <div className="flex justify-between absolute -top-1 left-0 right-0">
                      <div
                        className={`w-2 h-2 rounded-full ${sensitivityValue[0] === 0 ? "bg-yellow-400" : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full ${sensitivityValue[0] === 50 ? "bg-yellow-400" : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full ${sensitivityValue[0] === 100 ? "bg-yellow-400" : "bg-gray-300"}`}
                      ></div>
                    </div>
                  </div>
                  <Slider
                    value={sensitivityValue}
                    onValueChange={(value) => setSensitivityValue(snapToStage(value))}
                    max={100}
                    step={1}
                    className="[&_[role=slider]]:bg-yellow-400 [&_[role=slider]]:border-yellow-400"
                  />
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
