import type { Metadata } from 'next'
import './globals.css'
import AppWrapper from './components/AppWrapper'

export const metadata: Metadata = {
  title: 'NeuroMind Pro - Cognitive Enhancement Suite',
  description: 'Advanced Cognitive Assessment & Enhancement Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  )
}
