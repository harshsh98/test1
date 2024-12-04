export interface FeedbackCount {
  startTime: string
  endTime: string
  positive_count: string
  negative_count: string
  total: string
  average: number
}

export interface TopicItem {
  topPositive?: string
  topNegative?: string
  count: number
}

export interface FeedbackTopics {
  startTime: string
  endTime: string
  top3Positive: TopicItem[]
  top3Negative: TopicItem[]
  top5Topics: string[]
}

export interface DeflectionCount {
  startTime: string
  endTime: string
  totalConversations: number
  handoffs: number
  deflected: number
  deflectionRate: string
}

export interface DeflectionTopic {
  current_topic: string
  count: number
}

export interface DeflectionTopics {
  startTime: string
  endTime: string
  top3HandoffTopics: DeflectionTopic[]
}

export interface SurveyCount {
  startTime: string
  endTime: string
  total_surveys: string
  positive_count: string
  negative_count: string
  average_rating: number
  skipped_surveys: string
  total_submitted: number
  completion_rate: number
}

export interface SurveyType {
  surveyType: string
  avg_rating: number
}

export interface SurveyTopic {
  current_topic: string
  count: number
}

export interface SurveyTopics {
  startTime: string
  endTime: string
  top2SurveyTypes: SurveyType[]
  bottom2SurveyTypes: SurveyType[]
  top3PositiveTopics: SurveyTopic[]
  top3NegativeTopics: SurveyTopic[]
  top5Topics: string[]
}

export interface ApiResponse<T> {
  status: number
  results: T[]
}

