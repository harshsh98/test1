"use client"

import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { SatisfactionMeter } from "@/components/satisfaction-meter"
import { FeedbackChart } from "@/components/feedback-chart"
import { TopicsList } from "@/components/topics-list"
import { getFeedbackCount, getFeedbackTopics } from "@/lib/api"
import type { ApiResponse, FeedbackCount, FeedbackTopics } from "@/types/dashboard"

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedbackData, setFeedbackData] = useState<{
    count: ApiResponse<FeedbackCount> | null
    topics: ApiResponse<FeedbackTopics> | null
  }>({
    count: null,
    topics: null,
  })

  async function fetchData() {
    if (!date?.from || !date?.to) {
      setError("Please select a date range")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [countData, topicsData] = await Promise.all([
        getFeedbackCount(
          format(date.from, "yyyy-MM-dd'T'HH:mm"),
          format(date.to, "yyyy-MM-dd'T'HH:mm")
        ),
        getFeedbackTopics(
          format(date.from, "yyyy-MM-dd'T'HH:mm"),
          format(date.to, "yyyy-MM-dd'T'HH:mm")
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
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feedback Analytics</h1>
        <div className="flex items-center gap-4">
          <DateRangePicker date={date} onChange={setDate} />
          <Button onClick={fetchData} disabled={loading}>
            {loading ? "Loading..." : "Fetch Data"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md">
          {error}
        </div>
      )}

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

      {chartData && chartData.length > 0 && (
        <div className="mt-8">
          <FeedbackChart data={chartData} />
        </div>
      )}

      {topicsData && (
        <div className="mt-8">
          <TopicsList
            title="Top Overall Topics"
            topics={topicsData.top5Topics.map((topic) => ({
              topic,
              count: 0, // Count not provided in overall topics
            }))}
            type="overall"
          />
        </div>
      )}
    </div>
  )
}

