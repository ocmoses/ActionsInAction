'use client'
import { OnboardingContextProvider } from '@/hooks/useOnboardingContext'
import { StoreProvider } from 'easy-peasy'
import store from '@/store'

export default function Providers({ children }) {
  return (
    <StoreProvider store={store}>
      <OnboardingContextProvider>{children}</OnboardingContextProvider>
    </StoreProvider>
  )
}
