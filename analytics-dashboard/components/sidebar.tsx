"use client"

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, MessageSquare, ClipboardList, Tags, Sun, Moon } from 'lucide-react'
import { useTheme } from "next-themes"
import { UserProfile } from './user-profile'

const sidebarItems = [
  { name: 'Deflection', icon: BarChart, href: '/deflection' },
  { name: 'Feedback', icon: MessageSquare, href: '/feedback' },
  { name: 'Surveys', icon: ClipboardList, href: '/surveys' },
  { name: 'Classification', icon: Tags, href: '/classification' },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 1500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsExpanded(false);
  }, []);

  if (pathname === '/login') return null

  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen bg-background/80 backdrop-blur-md border-r border-border transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } rounded-r-3xl`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-full flex-col">
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 hover:bg-primary/10 ${
                    pathname === item.href ? 'bg-primary/20' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {isExpanded && <span className="ml-4">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center w-full hover:bg-primary/10 rounded-md px-4 py-3 ${
              isExpanded ? 'justify-start' : 'justify-center'
            }`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {isExpanded && <span className="ml-4">Toggle Theme</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

