import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider"
import './globals.css'
import { SessionProvider } from "next-auth/react"
import {NextUiProvider} from "@/components/providers/nextUi-provider";
import { ReactQueryProvider } from '@/components/providers/reactQuery-provider'
import { Toaster } from 'sonner';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Metid.io',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="no" suppressHydrationWarning>

      <body className={inter.className}>
      <ReactQueryProvider>
      <NextUiProvider>
      <SessionProvider refetchOnWindowFocus={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
        </NextUiProvider>
        </ReactQueryProvider>
        <Toaster position='top-right' richColors/>
        </body>
    </html>


  )
}
