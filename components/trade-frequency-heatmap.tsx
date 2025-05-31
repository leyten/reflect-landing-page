"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TradeFrequencyHeatmapProps {
  isVisible: boolean
}

export default function TradeFrequencyHeatmap({ isVisible }: TradeFrequencyHeatmapProps) {
  return (
    <Card
      className={`bg-white shadow-lg border-0 rounded-3xl transition-all duration-700 delay-200 h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-900">Trade Frequency</CardTitle>
        <CardDescription>When you trade most actively</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-between min-h-0">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Heatmap removed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
