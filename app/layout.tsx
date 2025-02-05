import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shinkaigyotti',
  description: 'You Want To Be A Shinkaigyo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
