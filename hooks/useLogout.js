"use client"
import { logout } from "@/app/modules/utilities"
import { PageRoutes } from "@/app/modules/menu"

import usePartners from "@/hooks/usePartners"
import { useStoreActions, useStoreState } from "easy-peasy"
import store, { model } from "@/store"
import { useRouter } from "next/navigation"

export default function useLogout() {
  const router = useRouter()
  const actions = useStoreActions((action) => action)

  const {
    setPartner,
    setPartners,
    setPartnerID,
    setCategory,
    setCategories,
    setPartnerCategories,
  } = usePartners()

  const clearStore = () => {
    for (const store in model) {
      actions[store].clear()
    }
  }
  const Logout = async () => {
    // store.persist.clear().then(async () => {
    // console.log("Persisted state has been removed")
    actions.app.startLoading("logout")
    await logout()
    actions.app.endLoading("logout")
    clearStore()
    router.push(PageRoutes.home)
    // })
  }

  return { Logout, clearStore }
}
useLogout
