"use client"
import { useState } from "react"
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard"
import MenuBar from "@/app/components/dashboard/MenuBar"

function Layout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className=" mx-auto flex flex-col h-full w-screen pb-[50px] bg-[#030303]">
      <NavbarDashboard open={open} setOpen={setOpen} />
      <div className="flex h-full scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
        <div className="w-fit">
          <div
            className={`flex-grow ${
              open ? "w-[250px]" : "w-[100px] "
            } flex h-full py-[36px] px-4 duration-300 `}
          >
            <MenuBar open={open} />
          </div>
        </div>
        <div className="h-full flex-1 relative">{children}</div>
      </div>
    </div>
  )
}
export default Layout
