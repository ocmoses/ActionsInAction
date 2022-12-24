'use client'
import Image from 'next/image'
import NavbarProfile from '@/app/components/NavbarProfile'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { useEffect, useState } from 'react'
import { getCategories } from '@/app/modules/categories'

function Layout({ children }) {
  const { partnerInfo } = useOnboardingContext()
  const categories = getCategories()
  useEffect(() => {
    if (!partnerInfo.partnerid) console.log('Invalid session 1')
    else console.log(partnerInfo.partnerid)
  }, [])
  const [test, setTest] = useState('Morpheus')
  return (
    <div className="grid grid-cols-4 w-screen">
      <div className="flex flex-col col-span-4 md:col-span-3 min-h-screen relative flex-1 px-4 md:px-6 ">
        <NavbarProfile />
        <div className="layout-center">{children}</div>
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
