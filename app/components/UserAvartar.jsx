import { TailSpinPreloader } from "@/app/components/Icons"
import Link from "next/link"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import useLogout from "@/hooks/useLogout"
import { useState } from "react"
import { useEffect } from "react"
import { PageRoutes } from "@/app/modules/menu"

export default function UserAvartar() {
  const { Logout } = useLogout()
  const { session } = useUsers()
  const { loading } = useApp()

  const [initial, setInitial] = useState("")
  const [showMenu, setShowMenu] = useState(false)

  const getInitials = () => {
    const firstName =
      session.user?.first_name !== "undefined" ? session.user.first_name : ""
    const lastName =
      session.user?.last_name !== "undefined" ? session.user.last_name : ""
    setInitial(`${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`)
  }
  useEffect(() => {
    getInitials()
  }, [session])

  const toggleProfileMenu = () => {
    setShowMenu((oldState) => !oldState)
  }
  return (
    <>
      <div className="z-10 flex items-center justify-between gap-3">
        {!session.status && <TailSpinPreloader width={32} height={32} />}
        <div className="relative">
          <div
            onClick={toggleProfileMenu}
            className="flex justify-end items-center cursor-pointer z-20"
          >
            <div className="flex justify-center items-center rounded-full w-[26px] h-[26px] bg-[#396587] text-white text-[12px] mr-2">
              <span>{initial}</span>
            </div>
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-[#999999]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-[#999999]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
          {showMenu && (
            <div className="absolute top-10 right-0 text-right w-[140px] bg-white/10 p-0 mt-3 rounded-lg shadow-lg w3-animate-opacity">
              <div className="w-full flex flex-col justify-start items-start">
                <Link
                  href={PageRoutes.dashboard}
                  className="w-full text-end text-[12px] text-mtn hover:bg-white/20 m-0 px-3 py-2"
                >
                  Dashboard
                </Link>
                <div
                  onClick={Logout}
                  className="w-full text-end cursor-pointer text-[12px] text-mtn hover:bg-white/20 m-0 px-3 py-2"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
