import '../styles/globals.css'
import { OnboardingContextProvider } from '@/hooks/useOnboardingContext'
import { AppContextProvider } from '@/hooks/useAppContext'
import ResponsiveLabel from './components/ResponsiveLabel'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <ResponsiveLabel />
        <AppContextProvider>
          <OnboardingContextProvider>{children}</OnboardingContextProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}
