'use client'
import { TailSpinPreloader } from '@/app/components/Icons'
import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AppGuard({ children }) {
  const session = useStoreState((state) => state.users.session)
  const router = useRouter()
  useEffect(() => {
    console.log({ session })
    if (session && session?.status === 'unauthenticated') {
      const currentUrl = window.location.pathname
      console.log({ currentUrl })
      router.push(`/login${currentUrl}`)
    }
  }, [session])
  return (
    <>
      {!session || session?.status !== 'authenticated' ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      ) : (
        children
      )}
    </>
  )
}
