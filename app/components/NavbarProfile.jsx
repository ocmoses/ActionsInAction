"use client"
import Image from "next/image"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import UserPercentComplete from "@/app/components/UserPercentComplete"

function NavbarProfile() {
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
        <div className="flex justify-end">
          <UserPercentComplete />
        </div>
      </div>
    </header>
  )
}

export default NavbarProfile
