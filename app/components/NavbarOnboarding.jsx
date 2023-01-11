'use client'
import Image from 'next/image'
import Link from 'next/link'
// import { useSession } from 'next-auth/react'
import { useSelectedLayoutSegments } from 'next/navigation'
import UserPercentComplete from '@/app/components/UserPercentComplete'
function NavbarOnboarding() {
  // const session = useSession()
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  return (
    <header>
      <div className="container px-0 pt-3 pb-4 md:pt-3 md:pb-4 flex justify-between items-center gap-6 md:gap-10 lg:gap-16 w-full mx-auto border-b-[#333333] border-b-1 max-w-[1400px] z-10">
        <Link href="/">
          <Image
            priority
            src="/assets/pic/mtn-logo.svg"
            width={80}
            height={39}
            alt="MTN Nigeria Logo"
            className=" text-white min-w-[80px] h-auto hover:text-mtn-300 hover:scale-[110%] transition-transform ease-in-out duration-500 cursor-pointer"
          />
        </Link>
        {/* {session.data ? (
          <div className="flex justify-end">
            <UserPercentComplete />
          </div>
        ) : ( */}
        <div className="flex justify-end">
          {currentPath === 'login' ? (
            <div className="text-gray-400 text-md flex items-center gap-6 mr-0 md:mr-3">
              <p className="hidden sm:inline-flex">Don't have an account?</p>
              <Link
                href="/onboarding/register"
                className="text-white text-md hover:underline"
              >
                Become a partner
              </Link>
            </div>
          ) : (
            <div className="text-gray-400 text-md flex items-center gap-6 mr-0 md:mr-3">
              <p className="hidden sm:inline-flex">Already have an account?</p>
              <Link
                href="/onboarding/login"
                className="text-white text-md hover:underline"
              >
                Login
              </Link>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </header>
  )
}

export default NavbarOnboarding
