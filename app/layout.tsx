import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Esdeath Chatbox',
  description: 'Chat with Esdeath from Akame ga Kill',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

