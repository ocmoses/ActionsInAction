'use client'
import Image from 'next/image'
import React from 'react'
import NavbarOnboarding from '@/app/components/NavbarOnboarding'
import UserAvartar from '@/app/components/UserAvartar'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
// import { useSession } from 'next-auth/react'
import { TailSpinPreloader } from '@/app/components/Icons'
import { useEffect } from 'react'

function Layout({ children }) {
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  // console.log("currentPath", currentPath)

  // const session = useSession()
  const router = useRouter()

  const exclude = ['companyinfo']
  // useEffect(() => {
  //   if (
  //     exclude.includes(currentPath) &&
  //     session.status !== 'loading' &&
  //     session.status !== 'authenticated'
  //   ) {
  //     router.push('/onboarding/login')
  //   }
  // }, [session.status])
  // console.log(currentPath)
  return (
    <>
      {/* {session.status === 'loading' && (
        <div className="flex justify-center items-center h-screen">
          <TailSpinPreloader width={120} height={120} fill="#efb703" />
        </div>
      )} */}

      <div className="grid grid-cols-4 w-screen">
        <div className="flex flex-col justify-start col-span-4 md:col-span-3 overflow-x-auto scrollbar scrollbar-thumb-[#111111] scrollbar-track-[#212121] scrollbar-w-[10px] h-screen max-h-screen relative flex-1 px-4 md:px-6 ">
          <div className="mb-16">
            <NavbarOnboarding />
          </div>
          <div className="layout-center h-full px-3">{children}</div>
        </div>
        <div className="relative min-h-screen hidden md:flex">
          <UserAvartar />
          <Image
            className="h-full object-cover"
            src="/assets/pic/onboarding.png"
            priority
            alt=""
            width={872}
            height={1221}
          />
        </div>
      </div>
    </>
  )
}

export default Layout
