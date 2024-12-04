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
import { ChartContainer } from "@/components/ui/chart"

interface SurveyChartProps {
  data: Array<{
    date: string
    totalSurveys: number
    positiveCount: number
    negativeCount: number
    averageRating: number
    completionRate: number
  }>
}

export function SurveyChart({ data }: SurveyChartProps) {
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
                Total Surveys
              </span>
              <span className="font-bold text-primary">
                {payload[0].value}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Average Rating
              </span>
              <span className="font-bold text-[var(--color-averageRating)]">
                {payload[3].value.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Completion Rate
              </span>
              <span className="font-bold text-[var(--color-completionRate)]">
                {payload[4].value.toFixed(2)}%
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
        <CardTitle>Survey Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            totalSurveys: {
              label: "Total Surveys",
              color: "hsl(var(--chart-1))",
            },
            positiveCount: {
              label: "Positive Responses",
              color: "hsl(var(--chart-2))",
            },
            negativeCount: {
              label: "Negative Responses",
              color: "hsl(var(--chart-3))",
            },
            averageRating: {
              label: "Average Rating",
              color: "hsl(var(--chart-4))",
            },
            completionRate: {
              label: "Completion Rate",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
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
                dataKey="totalSurveys"
                name="Total Surveys"
                fill="var(--color-totalSurveys)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                yAxisId="left"
                dataKey="positiveCount"
                name="Positive Responses"
                fill="var(--color-positiveCount)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                yAxisId="left"
                dataKey="negativeCount"
                name="Negative Responses"
                fill="var(--color-negativeCount)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageRating"
                name="Average Rating"
                stroke="var(--color-averageRating)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="completionRate"
                name="Completion Rate"
                stroke="var(--color-completionRate)"
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

