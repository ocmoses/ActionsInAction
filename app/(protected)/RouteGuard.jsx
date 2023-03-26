"use client"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { useEffect } from "react"
import useUsers from "@/hooks/useUsers"
import useLogout from "@/hooks/useLogout"

export default function RouteGuard({ children }) {
  const { session } = useUsers()
  const router = useRouter()
  const segments = useSelectedLayoutSegments()
  const dologout = useLogout()
  useEffect(() => {
    console.log({ session })
    if (session) {
      if (session?.status === "unauthenticated") {
        const currentUrl = window.location.pathname
        if (session?.user?.uuid) dologout.clearStore()
        if (currentUrl !== "/") router.push(`/login${currentUrl}`)
      }
    }
  }, [session, router])
  return (
    <>
      {!session || session?.status !== "authenticated" ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      ) : (
        children
      )}
    </>
  )
}
