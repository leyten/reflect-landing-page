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
                <div className="w-40">
                  <div className="relative">
                    {/* Stage labels */}
                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-3">
                      <span
                        className={`transition-colors duration-200 ${sensitivityValue[0] === 0 ? "text-yellow-600" : ""}`}
                      >
                        Low
                      </span>
                      <span
                        className={`transition-colors duration-200 ${sensitivityValue[0] === 50 ? "text-yellow-600" : ""}`}
                      >
                        Balanced
                      </span>
                      <span
                        className={`transition-colors duration-200 ${sensitivityValue[0] === 100 ? "text-yellow-600" : ""}`}
                      >
                        High
                      </span>
                    </div>

                    {/* Custom track with stage indicators */}
                    <div className="relative h-2 bg-gray-100 rounded-full mb-1">
                      {/* Active track */}
                      <div
                        className="absolute h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-300"
                        style={{ width: `${sensitivityValue[0]}%` }}
                      />

                      {/* Stage dots */}
                      <div className="absolute inset-0 flex justify-between items-center px-1">
                        {[0, 50, 100].map((stage) => (
                          <div
                            key={stage}
                            className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                              sensitivityValue[0] === stage
                                ? "bg-yellow-400 border-yellow-500 shadow-lg scale-110"
                                : "bg-white border-gray-300 hover:border-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <Slider
                      value={sensitivityValue}
                      onValueChange={(value) => setSensitivityValue(snapToStage(value))}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:opacity-0 [&_.slider-track]:opacity-0 [&_.slider-range]:opacity-0"
                    />
                  </div>
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
