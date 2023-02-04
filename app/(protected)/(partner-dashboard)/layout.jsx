"use client"
import { useState } from "react"
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard"
import MenuBar from "@/app/components/dashboard/MenuBar"

function Layout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className=" mx-auto flex flex-col h-full w-screen pb-[50px] bg-[#111111]">
      <NavbarDashboard open={open} setOpen={setOpen} />
      <div className="flex h-full scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
        <div
          className={` ${
            open ? "w-[250px]" : "w-[100px] "
          } hidden md:flex h-full py-[36px] px-4 duration-300`}
        >
          <div className="flex-1">
            <MenuBar open={open} />
          </div>
        </div>
        <div className="h-full flex-1 relative border-l border-l-white/20 bg-[#030303]">
          {children}
        </div>
      </div>
    </div>
  )
}
export default Layout
