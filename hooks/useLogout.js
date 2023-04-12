"use client"
import { logout, logoutAdmin } from "@/app/modules/utilities"
import { PageRoutes } from "@/app/modules/menu"

import usePartners from "@/hooks/usePartners"
import { useStoreActions, useStoreState } from "easy-peasy"
import store, { model, clearPersistStore } from "@/store"
import { useRouter } from "next/navigation"

export default function useLogout() {
  const router = useRouter()
  const actions = useStoreActions((action) => action)

  // const {
  //   setPartner,
  //   setPartners,
  //   setPartnerID,
  //   setCategory,
  //   setCategories,
  //   setPartnerCategories,
  // } = usePartners()

  const clearStore = () => {
    for (const store in model) {
      actions[store].clear()
    }
    clearPersistStore()
  }
  const Logout = async () => {
    actions.app.startLoading("logout")
    await logout()
    clearStore()
    actions.app.endLoading("logout")
    router.push(PageRoutes.home)
  }
  const LogoutAdmin = async () => {
    actions.app.startLoading("logout")
    await logoutAdmin()
    clearStore()
    actions.app.endLoading("logout")
    console.log("PageRoutes.adminlogin", PageRoutes.adminlogin)
    router.push(PageRoutes.adminlogin)
  }

  return { Logout, LogoutAdmin, logoutAdmin, clearStore }
}
useLogout
