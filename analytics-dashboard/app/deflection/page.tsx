"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { HelpCircle } from 'lucide-react'
import { ProtectedRoute } from '@/components/protected-route'

import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeflectionChart } from "@/components/deflection-chart"
import { TopicsList } from "@/components/topics-list"
import { getDeflectionCount, getDeflectionTopics } from "@/lib/api"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { LoadingAnimation } from '@/components/loading-animation'

export default function DeflectionPage() {
  const { dateRange, setDateRange, deflectionData, setDeflectionData } = useAnalytics()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (dateRange?.from && dateRange?.to && !deflectionData.count && !deflectionData.topics) {
      fetchData()
    }
  }, [dateRange, deflectionData])

  async function fetchData() {
    if (!dateRange?.from || !dateRange?.to) {
      setError("Please select a date range")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [countData, topicsData] = await Promise.all([
        getDeflectionCount(
          format(dateRange.from, "yyyy-MM-dd'T'HH:mm"),
          format(dateRange.to, "yyyy-MM-dd'T'HH:mm")
        ),
        getDeflectionTopics(
          format(dateRange.from, "yyyy-MM-dd'T'HH:mm"),
          format(dateRange.to, "yyyy-MM-dd'T'HH:mm")
        ),
      ])

      setDeflectionData({
        count: countData,
        topics: topicsData,
      })
    } catch (err) {
      setError("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const overallData = deflectionData.count?.results[0]
  const chartData = deflectionData.count?.results.slice(1).map((item) => ({
    date: format(new Date(item.startTime), "MMM dd"),
    deflected: item.deflected,
    handoffs: item.handoffs,
    deflectionRate: parseFloat(item.deflectionRate),
  }))

  const topicsData = deflectionData.topics?.results[0]

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Deflection Analytics</h1>
            <p className="text-muted-foreground">
              Track and analyze conversation deflection metrics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DateRangePicker date={dateRange} onChange={setDateRange} />
            <Button onClick={fetchData} disabled={loading}>
              {loading ? "Loading..." : "Fetch Data"}
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="relative">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
              <LoadingAnimation />
            </div>
          )}

          <div className="grid gap-6">
            {overallData && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Total Conversations</span>
                      <span className="text-2xl">{overallData.totalConversations}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Deflected</span>
                      <span className="text-2xl">{overallData.deflected}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Handoffs</span>
                      <span className="text-2xl">{overallData.handoffs}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Deflection Rate</span>
                      <span className="text-2xl">{overallData.deflectionRate}%</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            )}

            {chartData && chartData.length > 0 && (
              <div className="grid gap-6 grid-cols-1">
                <DeflectionChart data={chartData} />
              </div>
            )}

            {topicsData && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <TopicsList
                  title="Top Handoff Topics"
                  topics={topicsData.top3HandoffTopics.map((topic) => ({
                    topic: topic.current_topic,
                    count: topic.count,
                  }))}
                  type="negative"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

