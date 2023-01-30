"use client"
import { logout } from "@/app/modules/utilities"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import usePartners from "@/hooks/usePartners"

const useLogout = () => {
  const { setUser } = useUsers()
  const {
    startLoading,
    endLoading,
    clearErrors,
    setForm,
    setProcessing,
    setActiveCategory,
    setFormSteps,
    moveToNextForm,
  } = useApp()
  const {
    setPartner,
    setPartners,
    setPartnerID,
    setCategory,
    setCategories,
    setPartnerCategories,
  } = usePartners()

  const Logout = async () => {
    startLoading("logout")
    await logout()
    setUser(null)
    setForm(null)

    clearErrors(null)
    setProcessing(null)
    setActiveCategory(null)
    setFormSteps(null)
    moveToNextForm(null)

    setPartner(null)
    setPartners(null)
    setPartnerID(null)
    setCategory(null)
    setCategories(null)
    setPartnerCategories(null)
    endLoading("logout")
  }

  return { Logout }
}
export default useLogout
