'use client'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Session({ children }) {
  const session = useSession()
  const { setPartnerInfo } = useOnboardingContext()
  useEffect(() => {
    if (session.status === 'authenticated') {
      console.log(session.data.user)
      setPartnerInfo((oldState) => ({ ...oldState, ...session.data.user }))
    }
  }, [session.status])
  //   console.log({ session })
  return <>{children}</>
}
