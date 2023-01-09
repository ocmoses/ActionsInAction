'use client'
import Image from 'next/image'
import Link from 'next/link'
import NavLinks from './NavLinks'
import { signOut, useSession } from 'next-auth/react'
import { TailSpinPreloader } from '@/app/components/Icons'
import { useSelectedLayoutSegments } from 'next/navigation'
function Navbar({ type }) {
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  const session = useSession()
  return (
    <header>
      {type === 'dashboard' ? (
        <div className="container px-0 pt-6 pb-10 md:pt-12 md:pb-16 mx-auto flex justify-between items-center max-w-[1400px] z-10">
          <div className="flex gap-6 md:gap-10 items-center">
            <Link href="/">
              <Image
                priority
                src="/assets/pic/mtn-logo.svg"
                width={96}
                height={47}
                alt="MTN Nigeria Logo"
                className=" text-white min-w-[96px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500 cursor-pointer"
              />
            </Link>
            <NavLinks />
          </div>
          {session.status === 'loading' && (
            <div className="flex justify-end">
              <TailSpinPreloader width={28} height={28} fill="#efb703" />
            </div>
          )}
          {session.status === 'authenticated' && (
            <div className="flex justify-end">
              <div className="text-white flex items-center mr-0 md:mr-3">
                <div
                  className="text-white cursor-pointer px-4 py-1 ml-4 rounded-full border-2 border-dotted border-mtn hover:border-white transition ease-in-out duration-500 hover:scale-[110%]"
                  onClick={signOut}
                >
                  Logout
                </div>
              </div>
            </div>
          )}
          {session.status === 'unauthenticated' && (
            <div className="flex">
              <Link
                href="/onboarding/register"
                className="rounded-full bg-mtn hidden lg:inline-flex hover:bg-mtn-duration-500 transition ease-in-out 5000 text-md md:text-lg lg:text-xl mr-2 px-6 py-1 lg:mr-4 lg:px-12 lg:py-3"
              >
                Register
              </Link>
              <Link
                href="/onboarding/login"
                className="rounded-full text-white border-[1px] border-mtn hover:border-mtn-300 transition ease-in-out 5000 text-md md:text-lg lg:text-xl mr-2 px-6 py-1 lg:mr-4 lg:px-12 lg:py-3"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      ) : type === 'user-dashboard' ? (
        <div className="container px-0 pt-0 pb-10 md:pt-12 md:pb-16 mx-auto flex justify-between items-center max-w-[1400px] z-10">
          <div className="flex gap-6 md:gap-10 items-center">
            <Link href="/">
              <Image
                priority
                src="/assets/pic/mtn-logo.svg"
                width={96}
                height={47}
                alt="MTN Nigeria Logo"
                className=" text-white min-w-[96px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500 cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex"></div>
        </div>
      ) : (
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
          {session.status === 'loading' && (
            <div className="flex justify-end">
              <TailSpinPreloader width={28} height={28} fill="#efb703" />
            </div>
          )}
          {session.status === 'authenticated' && (
            <div className="flex justify-end">
              <div className="text-white flex items-center mr-0 md:mr-3">
                <p className="hidden sm:inline-flex">Don't have an account?</p>
                <Link
                  href="r"
                  className="text-white px-4 py-1 ml-4 rounded-full border-2 border-dotted border-mtn hover:border-white transition ease-in-out duration-500 hover:scale-[110%]"
                  onClick={signOut}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
          {session.status !== 'unauthenticated' && (
            <div className="flex justify-end">
              {currentPath === 'login' ? (
                <div className="text-white flex items-center mr-0 md:mr-3">
                  <p className="hidden sm:inline-flex">
                    Don't have an account?
                  </p>
                  <Link
                    href="/onboarding/register"
                    className="text-white px-4 py-1 ml-4 rounded-full border-2 border-dotted border-mtn hover:border-white transition ease-in-out duration-500 hover:scale-[110%]"
                  >
                    Become a partner
                  </Link>
                </div>
              ) : (
                <div className="text-white flex items-center mr-0 md:mr-3">
                  <p className="hidden sm:inline-flex">
                    Already have an account?
                  </p>
                  <Link
                    href="/onboarding/login"
                    className="text-white px-4 py-1 ml-4 rounded-full border-2 border-dotted border-mtn hover:border-white transition ease-in-out duration-500 hover:scale-[110%]"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
