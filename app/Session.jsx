"use client"
import { useEffect } from "react"
import useApp from "@/hooks/useApp"

export default function Session({ children, serverSession, categories }) {
  const app = useApp()
  useEffect(() => {
    if (serverSession) {
      if (serverSession?.status === "authenticated") {
        app.setStoreStates(serverSession, categories)
      }
    }
  }, [serverSession])

  return <>{children}</>
}
