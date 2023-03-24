"use client"
import RouteGuard from "../RouteGuard"
import { useState } from "react"
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard"
import MenuBar from "@/app/components/dashboard/MenuBar"
import MobileMenuBar from "@/app/components/dashboard/MobileMenuBar"
import MainMenuSideDrawer from "@/app/components/dashboard/MainMenuSideDrawer"

function Layout({ children }) {
  const [open, setOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <RouteGuard>
      <div
        id="partnerdashboard"
        className="mx-auto flex flex-col h-full w-screen pb-[50px] bg-[#111111]"
      >
        <NavbarDashboard
          open={open}
          setOpen={setOpen}
          setMenuOpen={setMenuOpen}
        />
        <div className="flex h-full scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
          <div
            className={` ${
              open ? "w-[250px]" : "w-[60px] "
            } hidden md:flex h-full py-[36px] px-3 duration-300`}
          >
            <div className="flex-1">
              <MenuBar open={open} />
            </div>
          </div>
          <div className="h-full flex-1 relative border-l border-l-white/20 bg-[#030303]">
            {children}
          </div>
        </div>
        <MainMenuSideDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
          {menuOpen && <MobileMenuBar setMenuOpen={setMenuOpen} />}
        </MainMenuSideDrawer>
      </div>
    </RouteGuard>
  )
}
export default Layout
