"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { DateRange } from 'react-day-picker'
import { ApiResponse, DeflectionCount, DeflectionTopics, FeedbackCount, FeedbackTopics, SurveyCount, SurveyTopics } from '@/types/dashboard'

interface AnalyticsContextType {
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  deflectionData: {
    count: ApiResponse<DeflectionCount> | null
    topics: ApiResponse<DeflectionTopics> | null
  }
  setDeflectionData: (data: {
    count: ApiResponse<DeflectionCount> | null
    topics: ApiResponse<DeflectionTopics> | null
  }) => void
  feedbackData: {
    count: ApiResponse<FeedbackCount> | null
    topics: ApiResponse<FeedbackTopics> | null
  }
  setFeedbackData: (data: {
    count: ApiResponse<FeedbackCount> | null
    topics: ApiResponse<FeedbackTopics> | null
  }) => void
  surveyData: {
    count: ApiResponse<SurveyCount> | null
    topics: ApiResponse<SurveyTopics> | null
  }
  setSurveyData: (data: {
    count: ApiResponse<SurveyCount> | null
    topics: ApiResponse<SurveyTopics> | null
  }) => void
  fetchDataIfNeeded: (page: 'deflection' | 'feedback' | 'surveys') => Promise<void>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [deflectionData, setDeflectionData] = useState<{
    count: ApiResponse<DeflectionCount> | null
    topics: ApiResponse<DeflectionTopics> | null
  }>({ count: null, topics: null })
  const [feedbackData, setFeedbackData] = useState<{
    count: ApiResponse<FeedbackCount> | null
    topics: ApiResponse<FeedbackTopics> | null
  }>({ count: null, topics: null })
  const [surveyData, setSurveyData] = useState<{
    count: ApiResponse<SurveyCount> | null
    topics: ApiResponse<SurveyTopics> | null
  }>({ count: null, topics: null })

  const fetchDataIfNeeded = useCallback(async (page: 'deflection' | 'feedback' | 'surveys') => {
    if (!dateRange?.from || !dateRange?.to) return

    let data
    switch (page) {
      case 'deflection':
        if (!deflectionData.count || !deflectionData.topics) {
          // Fetch deflection data
        }
        break
      case 'feedback':
        if (!feedbackData.count || !feedbackData.topics) {
          // Fetch feedback data
        }
        break
      case 'surveys':
        if (!surveyData.count || !surveyData.topics) {
          // Fetch survey data
        }
        break
    }
  }, [dateRange, deflectionData, feedbackData, surveyData])

  return (
    <AnalyticsContext.Provider
      value={{
        dateRange,
        setDateRange,
        deflectionData,
        setDeflectionData,
        feedbackData,
        setFeedbackData,
        surveyData,
        setSurveyData,
        fetchDataIfNeeded,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

