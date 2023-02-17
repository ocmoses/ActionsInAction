"use client"
import { useEffect } from "react"
import useApp from "@/hooks/useApp"
import useLogout from "@/hooks/useLogout"
export default function Session({ children, serverSession, categories }) {
  const app = useApp()
  const { clearStore } = useLogout()
  useEffect(() => {
    clearStore()
    if (serverSession) {
      if (serverSession?.status === "authenticated") {
        app.setStoreStates(serverSession, categories)
      }
    }
  }, [serverSession])

  return <>{children}</>
}
