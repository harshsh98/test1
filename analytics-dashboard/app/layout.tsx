import { Sidebar } from '@/components/sidebar'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'
import { UserProfile } from "@/components/user-profile";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AnalyticsProvider>
              <div className="flex min-h-screen bg-background text-foreground">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <header className="p-4 flex justify-end">
                    <UserProfile />
                  </header>
                  <main className="flex-1 p-6">{children}</main>
                </div>
              </div>
            </AnalyticsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

