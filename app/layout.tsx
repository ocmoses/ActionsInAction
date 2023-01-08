import '../styles/globals.css'
import Providers from './Providers'
import ResponsiveLabel from './components/ResponsiveLabel'
import { ReactNode } from 'react'
interface IProps {
  children: ReactNode
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head />
      <body>
        {process.env.NODE_ENV === 'development' && <ResponsiveLabel />}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
