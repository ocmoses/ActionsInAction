'use client'
import AppGuard from '@/app/AppGuard'
import { TailSpinPreloader } from '@/app/components/Icons'
// import { useEffect } from 'react'
// import { useStoreState } from 'easy-peasy'
// import { useState } from 'react'

export default function Layout({ children }) {
  // const session = useStoreState((state) => state.users.session)
  // console.log({ session })
  //   useEffect(() => {
  //     const session = useStoreState((state) => state.users.session)
  //     console.log({ session })
  //   }, [session])
  return <AppGuard>{children}</AppGuard>
  // const session = { status: 'authenticated' }
  // return (
  //   <>
  //     {session?.status !== 'authenticated' ? (
  //       <TailSpinPreloader width={72} height={72} fill="#efb703" />
  //     ) : (
  //       children
  //     )}
  //   </>
  // )
}
