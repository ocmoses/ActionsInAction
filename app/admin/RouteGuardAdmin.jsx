"use client"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { useEffect, useState } from "react"
import { PageRoutes } from "@/app/modules/menu"
import useAdmins from "@/hooks/useAdmins"
import useLogout from "@/hooks/useLogout"

export default function RouteGuard({ children }) {
  const { session } = useAdmins()
  const router = useRouter()
  const dologout = useLogout()
  // const segments = useSelectedLayoutSegments()
  // console.log({ segments })
  const [isLoginPage, setIsLoginPage] = useState(false)

  useEffect(() => {
    const path_name = window.location.pathname
    const pathname = !path_name.includes("/admin/login") ? path_name : ""
    setIsLoginPage(path_name.includes("/admin/login"))
    const redirect = `${PageRoutes.adminlogin}${pathname}`
    if (!session || session?.status !== "authenticated") {
      if (!isLoginPage && session?.status === "unauthenticated") {
        if (session?.user?.uuid) dologout.clearStore()
        if (pathname && pathname !== "/") {
          router.push(redirect)
        }
      }
    } else {
      if (path_name.includes("/admin/login")) {
        const path = path_name.replace("/admin/login", "")
        router.push(path ? path : "/admin/dashboard")
      }
    }
  }, [session, router])
  return (
    <>
      {!isLoginPage && (!session || session?.status !== "authenticated") ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      ) : (
        children
      )}
    </>
  )
}
