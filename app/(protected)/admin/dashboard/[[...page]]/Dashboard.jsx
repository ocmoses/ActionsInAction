"use client"
import Image from "next/image"
import NavbarProfile from "@/app/components/NavbarProfile"

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col max-w-[837px] mx-auto">
        <div className="flex pt-2xl w-full h-full mx-auto justify-center ">
          <div className="flex justify-center items-center h-[75vh]">
            <h1 className="text-white text-2xl">ADMIN DASHBOARD</h1>
          </div>
        </div>
      </div>
    </>
  )
}
