"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setSuccessMessage("Login successful! Redirecting...")
      setTimeout(() => {
        router.push('/deflection')
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {successMessage && (
                  <p className="text-sm text-green-500 bg-green-50 border border-green-200 p-2 rounded">{successMessage}</p>
                )}
                {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => alert('Request Signup functionality not implemented')}>
              Request Signup
            </Button>
            <Button variant="outline" onClick={() => alert('Contact Us functionality not implemented')}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-muted p-8">
        <div className="text-center max-w-sm">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl font-bold">
            Welcome to AI Agent Builder Analytics
          </h1>
        </div>
      </div>
    </div>
  )
}

