"use client"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useUsers from "@/hooks/useUsers"
import usePartners from "@/hooks/usePartners"

export default function AppGuard({ children }) {
  const { session } = useUsers()
  const { partner, partners } = usePartners()
  const router = useRouter()
  useEffect(() => {
    // console.log({ session })
    // console.log({ partner })
    // console.log({ partners })
    if (session && session?.status === "unauthenticated") {
      const currentUrl = window.location.pathname
      router.push(`/login${currentUrl}`)
    }
  }, [session])
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
