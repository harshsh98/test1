"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user && router.pathname === '/login') {
        router.push('/deflection')
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user && router.pathname === '/login') {
        router.push('/deflection')
      }
    })

    setData()

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

