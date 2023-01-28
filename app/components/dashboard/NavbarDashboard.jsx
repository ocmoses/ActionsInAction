"use client"
import Image from "next/image"
import Link from "next/link"
import MenuIcom from "@/public/assets/icons/menu.svg"

function NavbarDashboard({ open, setOpen }) {
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
        <div className="flex flex-grow justify-start text-[#666666] px-3 py-2">
          Search for transactions, users, pages...
        </div>
      </div>
      <div className="flex justify-end text-white px-3">icons</div>
    </header>
  )
}

export default NavbarDashboard
