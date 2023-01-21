"use client"
import Image from "next/image"
import Link from "next/link"
import NavLinks from "./NavLinks"
import Button from "@/app/components/form/Button"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import useLogout from "@/hooks/useLogout"
import { useSelectedLayoutSegments } from "next/navigation"
import { TailSpinPreloader } from "@/app/components/Icons"

function Navbar() {
  const { Logout } = useLogout()
  const { session } = useUsers()
  const { loading } = useApp()

  return (
    <header>
      <div className="container px-0 pt-6 pb-10 md:pt-12 md:pb-16 mx-auto flex justify-between items-center max-w-[1220px]  z-10">
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
        {!session?.status && (
          <div className="flex justify-end">
            <TailSpinPreloader width={28} height={28} fill="#efb703" />
          </div>
        )}
        {session.status && session.status === "authenticated" && (
          <div className="flex justify-end">
            <div className="text-white flex items-center mr-0 md:mr-3">
              <div
                className="text-white text-sm cursor-pointer transition ease-in-out duration-500 hover:scale-[120%]"
                onClick={Logout}
              >
                {loading.logout ? (
                  <TailSpinPreloader width={28} height={28} fill="#efb703" />
                ) : (
                  "Logout"
                )}
              </div>
            </div>
          </div>
        )}
        {session.status === "unauthenticated" && (
          <div className="flex gap-3">
            <Button href="/onboarding/register" label="Register" />
            <Link
              href="/login"
              className="rounded-full text-white transition ease-in-out 5000 text-md md:text-lg lg:text-xl px-3 py-1 lg:py-3"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
