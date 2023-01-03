'use client'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { OnboardingContextProvider } from '@/hooks/useOnboardingContext'
import { AppContextProvider } from '@/hooks/useAppContext'
import ResponsiveLabel from './components/ResponsiveLabel'

interface IProps {
  children: React.ReactNode
  session: any
}
export default function RootLayout({ children, session }: IProps) {
  return (
    <html>
      <head />
      <body>
        {process.env.NODE_ENV === 'development' && <ResponsiveLabel />}
        <SessionProvider session={session}>
          <AppContextProvider>
            <OnboardingContextProvider>{children}</OnboardingContextProvider>
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
