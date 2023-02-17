"use client"
import Image from "next/image"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import useApp from "@/hooks/useApp"

export default function NavbarOnboarding() {
  const segments = useSelectedLayoutSegments()
  const currentPath = segments[0]
  const { setRouteloading } = useApp()

  const goToHome = () => {
    setRouteloading(true)
  }
  return (
    <header>
      <div className="container px-0 pt-3 pb-4 md:pt-3 md:pb-4 flex justify-between items-center gap-6 md:gap-10 lg:gap-16 w-full mx-auto border-b-[#333333] border-b-1 max-w-[1400px] z-10">
        <Link href="/" onClick={goToHome}>
          <Image
            priority
            src="/assets/pic/mtn-logo.svg"
            width={80}
            height={39}
            alt="MTN Nigeria Logo"
            className=" text-white min-w-[80px] h-auto hover:text-mtn-300 hover:scale-[110%] transition-transform ease-in-out duration-500 cursor-pointer"
          />
        </Link>
        <div className="flex justify-end">
          {currentPath === "login" ? (
            <div className="text-gray-400 text-md flex items-center gap-6 mr-0 md:mr-3">
              <p className="hidden sm:inline-flex">Don't have an account?</p>
              <Link
                href="/onboarding/register"
                onClick={() => setRouteloading(true)}
                className="text-white text-md hover:underline"
              >
                Become a partner
              </Link>
            </div>
          ) : (
            <div className="text-gray-400 text-md flex items-center gap-6 mr-0 md:mr-3">
              <p className="hidden sm:inline-flex">Already have an account?</p>
              <Link
                href="/login"
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
