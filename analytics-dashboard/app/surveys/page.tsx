"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { HelpCircle } from 'lucide-react'
import { ProtectedRoute } from '@/components/protected-route'

import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SurveyChart } from "@/components/survey-chart"
import { TopicsList } from "@/components/topics-list"
import { getSurveyCount, getSurveyTopics } from "@/lib/api"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { LoadingAnimation } from "@/components/loading-animation"

export default function SurveysPage() {
  const { dateRange, setDateRange, surveyData, setSurveyData } = useAnalytics()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (dateRange?.from && dateRange?.to && !surveyData.count && !surveyData.topics) {
      fetchData()
    }
  }, [dateRange, surveyData])

  async function fetchData() {
    if (!dateRange?.from || !dateRange?.to) {
      setError("Please select a date range")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [countData, topicsData] = await Promise.all([
        getSurveyCount(
          format(dateRange.from, "yyyy-MM-dd'T'HH:mm"),
          format(dateRange.to, "yyyy-MM-dd'T'HH:mm")
        ),
        getSurveyTopics(
          format(dateRange.from, "yyyy-MM-dd'T'HH:mm"),
          format(dateRange.to, "yyyy-MM-dd'T'HH:mm")
        ),
      ])

      setSurveyData({
        count: countData,
        topics: topicsData,
      })
    } catch (err) {
      setError("Failed to fetch data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const overallData = surveyData.count?.results[0]
  const chartData = surveyData.count?.results.slice(1).map((item) => ({
    date: format(new Date(item.startTime), "MMM dd"),
    totalSurveys: parseInt(item.total_surveys),
    positiveCount: parseInt(item.positive_count),
    negativeCount: parseInt(item.negative_count),
    averageRating: item.average_rating,
    completionRate: item.completion_rate,
  }))

  const topicsData = surveyData.topics?.results[0]

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Survey Analytics</h1>
            <p className="text-muted-foreground">
              Analyze survey responses and completion rates
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
                      <span className="text-sm font-medium text-muted-foreground">Total Surveys</span>
                      <span className="text-2xl">{overallData.total_surveys}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Average Rating</span>
                      <span className="text-2xl">{overallData.average_rating.toFixed(2)}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
                      <span className="text-2xl">{overallData.completion_rate.toFixed(2)}%</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Skipped Surveys</span>
                      <span className="text-2xl">{overallData.skipped_surveys}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            )}

            {chartData && chartData.length > 0 && (
              <div className="mt-8">
                <SurveyChart data={chartData} />
              </div>
            )}

            {topicsData && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                <TopicsList
                  title="Top Survey Types"
                  topics={topicsData.top2SurveyTypes.map((item) => ({
                    topic: item.surveyType,
                    count: item.avg_rating,
                  }))}
                  type="positive"
                />
                <TopicsList
                  title="Bottom Survey Types"
                  topics={topicsData.bottom2SurveyTypes.map((item) => ({
                    topic: item.surveyType,
                    count: item.avg_rating,
                  }))}
                  type="negative"
                />
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

