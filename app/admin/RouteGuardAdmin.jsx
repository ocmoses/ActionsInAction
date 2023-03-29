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
  const segments = useSelectedLayoutSegments()
  const dologout = useLogout()

  const pathname = window.location.pathname
  const [isLoginPage, setIsLoginPage] = useState(false)

  useEffect(() => {
    setIsLoginPage(pathname.startsWith("/admin/login") ? true : false)
  }, [session, pathname])
  useEffect(() => {
    if (session) {
      if (!isLoginPage && session?.status === "unauthenticated") {
        const pathname = window.location.pathname
        const currentUrl = !pathname.startsWith("/admin/login") ? pathname : ""
        if (session?.user?.uuid) dologout.clearStore()
        console.log(
          'currentUrl.startsWith("/admin/login")',
          pathname.startsWith("/admin/login")
        )
        console.log({ pathname })
        console.log({ currentUrl })
        if (pathname !== "/") {
          router.push(`${PageRoutes.adminlogin}${pathname}`)
        }
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
