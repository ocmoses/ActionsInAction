'use client'
import { SessionProvider } from 'next-auth/react'
import { OnboardingContextProvider } from '@/hooks/useOnboardingContext'
import { AppContextProvider } from '@/hooks/useAppContext'
import Session from './Session'

export default function Providers({ children }) {
  return (
    <SessionProvider refetchOnWindowFocus={true}>
      <AppContextProvider>
        <OnboardingContextProvider>
          <Session>{children}</Session>
        </OnboardingContextProvider>
      </AppContextProvider>
    </SessionProvider>
  )
}
