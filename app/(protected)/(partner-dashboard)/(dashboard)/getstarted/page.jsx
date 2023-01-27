"use client"
import SideDrawer from "@/app/components/SideDrawer"
import SideBar from "./SideBar"
import { useState } from "react"

function TrustBrands() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <p> Those who trusted us:</p>
      <button
        className="bg-green-600 text-white rounded px-4 py-1"
        onClick={() => setIsOpen(true)}
      >
        open
      </button>
      <SideBar />
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
      </SideDrawer>
    </>
  )
}

export default TrustBrands
