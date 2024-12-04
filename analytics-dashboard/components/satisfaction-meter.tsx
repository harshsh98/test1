"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SatisfactionMeterProps {
  average: number
  total: number
  positiveCount: number
  negativeCount: number
}

export function SatisfactionMeter({
  average,
  total,
  positiveCount,
  negativeCount,
}: SatisfactionMeterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Satisfaction</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="stroke-muted"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="10"
            />
            <circle
              className="stroke-primary"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="10"
              strokeDasharray={`${average * 2.83} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{average.toFixed(1)}%</span>
            <span className="text-sm text-muted-foreground">
              Based on {total} responses
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">
              {positiveCount}
            </div>
            <div className="text-xs text-muted-foreground">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">{negativeCount}</div>
            <div className="text-xs text-muted-foreground">Negative</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

