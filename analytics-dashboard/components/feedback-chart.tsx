"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ComposedChart,
} from "recharts"
import { format, eachDayOfInterval } from "date-fns"
import { ChartContainer } from "@/components/ui/chart"

interface FeedbackChartProps {
  data: Array<{
    date: string
    positive: number
    negative: number
    average: number
  }>
  startDate: Date
  endDate: Date
}

export function FeedbackChart({ data, startDate, endDate }: FeedbackChartProps) {
  const allDates = eachDayOfInterval({ start: startDate, end: endDate })

  const dataMap = new Map(data.map(item => [item.date, item]))

  const completeData = allDates.map(date => {
    const formattedDate = format(date, "MMM dd")
    const existingData = dataMap.get(formattedDate)
    return existingData || {
      date: formattedDate,
      positive: 0,
      negative: 0,
      average: 0
    }
  })

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Date
              </span>
              <span className="font-bold text-primary">{label}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Average CSAT
              </span>
              <span className="font-bold text-primary">
                {payload[2].value.toFixed(2)}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Positive
              </span>
              <span className="font-bold text-[var(--color-positive)]">
                {payload[0].value}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Negative
              </span>
              <span className="font-bold text-[var(--color-negative)]">
                {payload[1].value}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            positive: {
              label: "Positive Feedback",
              color: "hsl(var(--chart-1))",
            },
            negative: {
              label: "Negative Feedback",
              color: "hsl(var(--chart-2))",
            },
            average: {
              label: "Average CSAT",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={completeData}>
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="positive"
                name="Positive Feedback"
                fill="var(--color-positive)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                yAxisId="left"
                dataKey="negative"
                name="Negative Feedback"
                fill="var(--color-negative)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="average"
                name="Average CSAT"
                stroke="var(--color-average)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

