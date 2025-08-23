import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ElevX - Hyper-personalized micro-learning',
  description: 'AI-powered micro-lessons for real behavioral change',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Temporary Tailwind CDN - replace with proper installation */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    elevx: {
                      navy: '#061427',
                      teal: '#00C2A3',
                      orange: '#FF6A00'
                    }
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className={`${inter.className} min-h-screen bg-elevx-navy text-elevx-text`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
