"use client"
import { useStoreActions, useStoreRehydrated } from "easy-peasy"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useEffect, useState } from "react"
import { Util, isObject } from "@/app/modules/utilities"

export default function Session({ children, serverSession, categories }) {
  const isRehydrated = useStoreRehydrated()
  const actions = useStoreActions((action) => action)
  // console.log({ serverSession })
  useEffect(() => {
    if (isRehydrated) {
      if (serverSession?.status === "authenticated") {
        if (serverSession?.User?.user)
          actions.users.setUser(serverSession?.User?.user)
        if (serverSession?.User?.partners?.length)
          actions.partners.setPartners(serverSession?.User?.partners)
        if (
          isObject(serverSession?.User?.partner) &&
          !Util.isEmpty(serverSession?.User?.partner)
        ) {
          actions.partners.setPartner(serverSession?.User?.partner)
          actions.partners.setPartnerCategories(
            serverSession?.User?.partner.categories
          )
        } else {
          if (serverSession?.User?.partners?.length) {
            actions.partners.setPartner(serverSession?.User?.partners[0])
            actions.partners.setPartnerCategories(
              serverSession?.User?.partners[0].categories
            )
          }
        }

        if (serverSession?.User?.partnerID)
          actions.partners.setPartnerID(serverSession?.User?.partnerID)

        actions.partners.setCategories(categories.data)
        if (categories.error) actions.apps.setError(categories.error)
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
