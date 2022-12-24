'use client'
import Image from 'next/image'
import React from 'react'
import NavbarOnboarding from '@/app/components/NavbarOnboarding'
import { RequestSuccess, RequestError } from '@/app/components/RequestResponse'

import { useOnboardingContext } from '@/hooks/useOnboardingContext'
function Layout({ children }) {
  const { requestError, requestSuccess } = useOnboardingContext()
  return (
    <div className="grid grid-cols-4 w-screen">
      <div className="relative flex flex-1 flex-col col-span-4 md:col-span-3 min-h-screen px-4 md:px-6 ">
        <NavbarOnboarding />
        <div className="layout-center">{children}</div>
        <RequestSuccess success={requestSuccess} />
        <RequestError errors={requestError} />
      </div>
      <div className="relative min-h-screen hidden md:flex">
        <Image
          className="h-full object-cover"
          src="/assets/pic/onboarding.png"
          alt=""
          width={872}
          height={1221}
        />
      </div>
    </div>
  )
}

export default Layout
