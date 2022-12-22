'use client'
import Image from 'next/image'
import Link from 'next/link'
import NavLinks from './NavLinks'
import { useSelectedLayoutSegments } from 'next/navigation'
function NavbarOnboarding() {
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  return (
    <header>
      <div className="container px-0 pt-3 pb-4 md:pt-3 md:pb-4 flex justify-between items-center gap-6 md:gap-10 lg:gap-16 w-full mx-auto border-b-zinc-500 border-b-2 max-w-[1400px] z-10">
        <Link href="/">
          <Image
            priority
            src="/assets/pic/mtn-logo.svg"
            width={80}
            height={40}
            alt="MTN Nigeria Logo"
            className=" text-white min-w-[80px] hover:text-mtn-300 hover:scale-[110%] transition-transform ease-in-out duration-500 cursor-pointer"
          />
        </Link>
        <div className="flex justify-end">
          {currentPath === 'onboarding' || currentPath === 'validate' ? (
            <div className="text-white flex items-center mr-0 md:mr-3"></div>
          ) : currentPath === 'login' ? (
            <div className="text-white flex items-center mr-0 md:mr-3">
              <p className="hidden sm:inline-flex">Don't have an account?</p>
              <Link
                href="/onboarding"
                className="text-white px-4 py-1 ml-4 rounded-full border-2 border-dotted border-mtn hover:border-white transition ease-in-out duration-500 hover:scale-[110%]"
              >
                Become a partner
              </Link>
            </div>
          ) : (
            <div className="text-white flex items-center mr-0 md:mr-3">
              <p className="hidden sm:inline-flex">Don't have an account?</p>
              <Link
                href="/onboarding"
                className="text-white px-4 py-1 ml-4 rounded-full border-2 border-dotted border-mtn hover:border-white transition ease-in-out duration-500 hover:scale-[110%]"
              >
                Become a partner
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavbarOnboarding
