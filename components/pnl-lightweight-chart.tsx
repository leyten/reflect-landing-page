"use client"

import { useEffect, useRef, useState } from "react"
import { createChart, ColorType, type IChartApi, LineStyle } from "lightweight-charts"

interface PnLData {
  time: number
  value: number
}

interface PnLLightweightChartProps {
  data: PnLData[]
  height?: number
}

export default function PnLLightweightChart({ data, height = 150 }: PnLLightweightChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<IChartApi | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !chartRef.current) return

    // Remove existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove()
    }

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#6b7280",
        fontSize: 10,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: {
          visible: true,
          color: "#f0f0f0",
          style: LineStyle.Solid,
        },
      },
      timeScale: {
        visible: true,
        timeVisible: false,
        secondsVisible: false,
        borderColor: "#e5e7eb",
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#d1d5db",
          width: 1,
          style: LineStyle.Dashed,
        },
        horzLine: {
          visible: false,
        },
      },
      handleScroll: false,
      handleScale: false,
    })

    chartInstanceRef.current = chart

    // Split data into positive and negative segments
    const positiveData: Array<{ time: number; value: number | null }> = []
    const negativeData: Array<{ time: number; value: number | null }> = []

    data.forEach((point, index) => {
      if (point.value >= 0) {
        positiveData.push({ time: point.time, value: point.value })
        negativeData.push({ time: point.time, value: null })
      } else {
        positiveData.push({ time: point.time, value: null })
        negativeData.push({ time: point.time, value: point.value })
      }
    })

    // Add positive series (green)
    const positiveSeries = chart.addAreaSeries({
      topColor: "rgba(16, 185, 129, 0.2)",
      bottomColor: "rgba(16, 185, 129, 0.05)",
      lineColor: "#10b981",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: "#ffffff",
      crosshairMarkerBackgroundColor: "#10b981",
    })

    // Add negative series (red)
    const negativeSeries = chart.addAreaSeries({
      topColor: "rgba(239, 68, 68, 0.05)",
      bottomColor: "rgba(239, 68, 68, 0.2)",
      lineColor: "#ef4444",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: "#ffffff",
      crosshairMarkerBackgroundColor: "#ef4444",
    })

    // Add zero line
    const zeroLineSeries = chart.addLineSeries({
      color: "#e5e7eb",
      lineWidth: 1,
      lineStyle: LineStyle.Solid,
      crosshairMarkerVisible: false,
    })

    // Set data
    positiveSeries.setData(positiveData.filter((p) => p.value !== null) as Array<{ time: number; value: number }>)
    negativeSeries.setData(negativeData.filter((p) => p.value !== null) as Array<{ time: number; value: number }>)

    // Add zero line data
    if (data.length > 0) {
      zeroLineSeries.setData([
        { time: data[0].time, value: 0 },
        { time: data[data.length - 1].time, value: 0 },
      ])
    }

    // Fit content
    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartRef.current && chartInstanceRef.current) {
        chartInstanceRef.current.applyOptions({
          width: chartRef.current.clientWidth,
        })
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove()
        chartInstanceRef.current = null
      }
    }
  }, [data, height, isClient])

  if (!isClient) {
    return <div className="w-full bg-gray-100 rounded animate-pulse" style={{ height }} />
  }

  return <div ref={chartRef} className="w-full" style={{ height }} />
}
