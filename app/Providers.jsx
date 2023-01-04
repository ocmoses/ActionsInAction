'use client'
import { SessionProvider } from 'next-auth/react'
import { OnboardingContextProvider } from '@/hooks/useOnboardingContext'
import { AppContextProvider } from '@/hooks/useAppContext'

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AppContextProvider>
        <OnboardingContextProvider>{children}</OnboardingContextProvider>
      </AppContextProvider>
    </SessionProvider>
  )
}
