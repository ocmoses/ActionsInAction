"use client"
import Image from "next/image"
import Link from "next/link"
import MenuIcom from "@/public/assets/icons/menu.svg"
import useUsers from "@/hooks/useUsers"
import ProfileIcons from "@/app/components/ProfileIcons"

function NavbarDashboard({ open, setOpen }) {
  const { session } = useUsers()
  return (
    <header className=" flex justify-between items-center h-[64px] px-4 m-0 w-full mx-auto z-10 border-b border-b-white/20">
      <div className="flex items-center">
        <div className="flex justify-between items-center w-[250px] py-2 px-3 border-r-0 border-r-white/20">
          <Link href="/">
            <Image
              priority
              src="/assets/pic/mtn-logo.svg"
              width={60}
              height={29.25}
              alt="MTN Nigeria Logo"
              className=" text-white h-auto hover:text-mtn-300 hover:scale-[110%] transition-transform ease-in-out duration-500 cursor-pointer"
            />
          </Link>{" "}
          <span
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-white"
          >
            <Image src={MenuIcom} width={24} height={24} alt="" />
          </span>
        </div>
        <div className="hidden md:flex flex-grow justify-start text-[#666666] px-3 py-2">
          Search for transactions, users, pages...
        </div>
      </div>
      <div className="flex justify-end text-white px-2 gap-2 items-center">
        {session && session.status === "authenticated" && <ProfileIcons />}
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" w-8 h=8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
      </div>
    </header>
  )
}

export default NavbarDashboard
