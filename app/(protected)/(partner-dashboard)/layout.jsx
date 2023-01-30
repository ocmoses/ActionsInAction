"use client"
import {
  useState,
  // ErrorBoundary
} from "react"
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard"
import MenuBar from "@/app/components/dashboard/MenuBar"
// import Error from "./error"

function Layout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    // <ErrorBoundary fallback={<Error />}>
    <div className="flex flex-col h-screen w-screen pb-[50px] bg-[#030303]">
      <NavbarDashboard open={open} setOpen={setOpen} />
      <div className="flex h-full">
        <div
          className={` ${
            open ? "w-[250px]" : "w-[100px] "
          } flex h-full py-[36px] px-4 duration-300 border-r border-r-white/20 bg-[#111111] scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]`}
        >
          <div className="flex-1">
            <MenuBar open={open} />
          </div>
        </div>
        <div className="mx-auto flex-1 relative h-full scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
          {children}
        </div>
      </div>
    </div>
    // </ErrorBoundary>
  )
}
export default Layout
