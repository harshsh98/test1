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

interface DeflectionChartProps {
  data: Array<{
    date: string
    deflected: number
    handoffs: number
    deflectionRate: number
  }>
}

export function DeflectionChart({ data }: DeflectionChartProps) {
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
                Deflection Rate
              </span>
              <span className="font-bold text-primary">
                {payload[2].value.toFixed(2)}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Deflected
              </span>
              <span className="font-bold text-[var(--color-deflected)]">
                {payload[0].value}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Handoffs
              </span>
              <span className="font-bold text-[var(--color-handoffs)]">
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
        <CardTitle>Deflection Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            deflected: {
              label: "Deflected",
              color: "hsl(var(--chart-1))",
            },
            handoffs: {
              label: "Handoffs",
              color: "hsl(var(--chart-2))",
            },
            deflectionRate: {
              label: "Deflection Rate",
              color: "hsl(var(--chart-3))",
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
                tickFormatter={(value) => `${value}`}
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
                dataKey="deflected"
                name="Deflected"
                fill="var(--color-deflected)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                yAxisId="left"
                dataKey="handoffs"
                name="Handoffs"
                fill="var(--color-handoffs)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="deflectionRate"
                name="Deflection Rate"
                stroke="var(--color-deflectionRate)"
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

