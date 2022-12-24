import '../styles/globals.css'
import { OnboardingContextProvider } from '@/hooks/useOnboardingContext'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <OnboardingContextProvider>{children}</OnboardingContextProvider>
      </body>
    </html>
  )
}
