import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './provider'
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ['latin'] })

// Metadaten für SEO und soziale Medien
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_DOMAIN || 'https://cms-testing-eefm2yiiy-goldjunge91s-projects.vercel.app'),
  title: {
    default: 'Tsafi CMS',
    template: '%s | Tsafi CMS',
  },
  description: 'Ein AI-gesteuertes Content Management System',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: process.env.NEXT_PUBLIC_BASE_DOMAIN || 'https://cms-testing-eefm2yiiy-goldjunge91s-projects.vercel.app',
    siteName: 'Tsafi CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsafi CMS',
    description: 'Ein AI-gesteuertes Content Management System',
  },
}

// Hauptlayout-Komponente
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="de" suppressHydrationWarning>
        <body className={inter.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </Provider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}