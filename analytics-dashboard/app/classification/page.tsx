import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from '@/components/protected-route'

export default function ClassificationPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Classification</h1>
        <Card>
          <CardHeader>
            <CardTitle>Classification Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">Coming Soon</p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

