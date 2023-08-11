"use client"
import { logout, logoutAdmin } from "@/app/modules/utilities"
import { PageRoutes } from "@/app/modules/menu"

import { useStoreActions, useStoreState } from "easy-peasy"
import { model, clearPersistStore } from "@/store"
import { useRouter } from "next/navigation"

export default function useLogout() {
  const router = useRouter()
  const actions = useStoreActions((action) => action)

  const clearStore = () => {
    for (const store in model) {
      actions[store].clear()
    }
    clearPersistStore();
    localStorage.clear();
  }
  const Logout = async () => {
    localStorage.clear();
    actions.app.startLoading("logout")
    await logout()
    clearStore()
    actions.app.endLoading("logout")
    router.push(PageRoutes.home)
  }
  const LogoutAdmin = async () => {
    localStorage.clear();
    actions.app.startLoading("logout")
    await logoutAdmin()
    clearStore()
    actions.app.endLoading("logout")
    if (typeof window !== "undefined") window.location = PageRoutes.adminlogin
    else router.push(PageRoutes.adminlogin)
    if (typeof window !== "undefined") window.location = PageRoutes.adminlogin
    else router.push(PageRoutes.adminlogin)
  }

  return { Logout, LogoutAdmin, logoutAdmin, clearStore }
}

