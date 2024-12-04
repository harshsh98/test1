import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xtmeckjiniaqlbchjmnx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bWVja2ppbmlhcWxiY2hqbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MzIzMTAsImV4cCI6MjA0NzQwODMxMH0.ndrr4EJBpGgXcyXKorago09gXbwKnaUl9RsG8WMZ-ek'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

