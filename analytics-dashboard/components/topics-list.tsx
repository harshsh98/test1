"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TopicsListProps {
  title: string
  topics: Array<{ topic: string; count: number }>
  type: "positive" | "negative" | "overall"
}

export function TopicsList({ title, topics, type }: TopicsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {item.topic.replace(/\./g, " ")}
              </span>
              <span
                className={`text-sm font-bold ${
                  type === "positive"
                    ? "text-green-500"
                    : type === "negative"
                    ? "text-red-500"
                    : "text-primary"
                }`}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

