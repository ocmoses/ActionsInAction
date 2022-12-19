import Image from 'next/image'
import React from 'react'
import OnboardingContextProvider from '../../utils/RegistrationContextProvider'
import Navbar from '../components/Navbar'
function Layout({ children }) {
  return (
    <div className="grid grid-cols-4 w-screen">
      <div className="flex flex-col col-span-4 md:col-span-3 min-h-screen relative flex-1 px-4 md:px-6 ">
        <Navbar type="onboarding" />
        <div className="flex w-full md:w-1/2 mx-auto h-full justify-center items-center">
          <OnboardingContextProvider>{children}</OnboardingContextProvider>
        </div>
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
