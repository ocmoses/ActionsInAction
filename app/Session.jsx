"use client"
import { useStoreActions, useStoreRehydrated } from "easy-peasy"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useEffect, useState } from "react"

export default function Session({ children, serverSession }) {
  // const isRehydrated = true
  const isRehydrated = useStoreRehydrated()
  const actions = useStoreActions((action) => action)

  useEffect(() => {
    if (isRehydrated) {
      if (serverSession?.status === "authenticated") {
        if (serverSession?.User?.user)
          actions.users.setUser(serverSession?.User.user)
        if (serverSession?.User.partner)
          actions.partners.setPartner(serverSession?.User.partner)
        if (serverSession?.User.partners)
          actions.partners.setPartners(serverSession?.User.partners)
        if (serverSession?.User.partnerID)
          actions.partners.setPartnerID(serverSession?.User.partnerID)
      }
    }
  }, [isRehydrated])

  return (
    <>
      {isRehydrated ? (
        children
      ) : (
        <div className="flex w-screen h-screen justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )}
    </>
  )
}
