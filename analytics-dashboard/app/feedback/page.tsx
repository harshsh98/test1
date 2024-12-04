"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { HelpCircle } from 'lucide-react'
import { ProtectedRoute } from '@/components/protected-route'

import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { SatisfactionMeter } from "@/components/satisfaction-meter"
import { FeedbackChart } from "@/components/feedback-chart"
import { TopicsList } from "@/components/topics-list"
import { getFeedbackCount, getFeedbackTopics } from "@/lib/api"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { LoadingAnimation } from "@/components/loading-animation"

export default function FeedbackPage() {
  const { dateRange, setDateRange, feedbackData, setFeedbackData } = useAnalytics()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (dateRange?.from && dateRange?.to && !feedbackData.count && !feedbackData.topics) {
      fetchData()
    }
  }, [dateRange, feedbackData])

  async function fetchData() {
    if (!dateRange?.from || !dateRange?.to) {
      setError("Please select a date range")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [countData, topicsData] = await Promise.all([
        getFeedbackCount(
          format(dateRange.from, "yyyy-MM-dd'T'HH:mm"),
          format(dateRange.to, "yyyy-MM-dd'T'HH:mm")
        ),
        getFeedbackTopics(
          format(dateRange.from, "yyyy-MM-dd'T'HH:mm"),
          format(dateRange.to, "yyyy-MM-dd'T'HH:mm")
        ),
      ])

      setFeedbackData({
        count: countData,
        topics: topicsData,
      })
    } catch (err) {
      setError("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const overallData = feedbackData.count?.results[0]
  const chartData = feedbackData.count?.results.slice(1).map((item) => ({
    date: format(new Date(item.startTime), "MMM dd"),
    positive: parseInt(item.positive_count),
    negative: parseInt(item.negative_count),
    average: item.average,
  }))

  const topicsData = feedbackData.topics?.results[0]

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Feedback Analytics</h1>
            <p className="text-muted-foreground">
              Analyze customer feedback and satisfaction metrics
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SatisfactionMeter
                  average={overallData.average}
                  total={parseInt(overallData.total)}
                  positiveCount={parseInt(overallData.positive_count)}
                  negativeCount={parseInt(overallData.negative_count)}
                />
                {topicsData && (
                  <>
                    <TopicsList
                      title="Top Positive Topics"
                      topics={topicsData.top3Positive.map((item) => ({
                        topic: item.topPositive || "",
                        count: item.count,
                      }))}
                      type="positive"
                    />
                    <TopicsList
                      title="Top Negative Topics"
                      topics={topicsData.top3Negative.map((item) => ({
                        topic: item.topNegative || "",
                        count: item.count,
                      }))}
                      type="negative"
                    />
                  </>
                )}
              </div>
            )}

            {chartData && chartData.length > 0 && dateRange?.from && dateRange?.to && (
              <div className="mt-8">
                <FeedbackChart
                  data={chartData}
                  startDate={dateRange.from}
                  endDate={dateRange.to}
                />
              </div>
            )}

            {topicsData && (
              <div className="mt-8">
                <TopicsList
                  title="Top Overall Topics"
                  topics={topicsData.top5Topics.map((topic) => ({
                    topic,
                    count: 0,
                  }))}
                  type="overall"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

