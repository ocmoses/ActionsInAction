"use client"
import { useState } from "react"
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard"
import MenuBar from "@/app/components/dashboard/MenuBar"

function Layout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex flex-col h-full w-screen bg-[#030303]">
      <NavbarDashboard open={open} setOpen={setOpen} />

      <div className="flex">
        <div
          className={` ${
            open ? "w-[250px]" : "w-[100px] "
          } flex h-fit min-h-screen py-[36px] px-4 duration-300 border-r border-r-white/20 bg-[#111111]`}
        >
          <div className="flex-1 flex-grow">
            <MenuBar open={open} />
          </div>
        </div>
        <div className="mx-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
export default Layout
