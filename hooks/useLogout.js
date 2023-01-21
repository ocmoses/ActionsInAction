"use client"
import { logout } from "@/app/modules/utilities"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import usePartners from "@/hooks/usePartners"

const useLogout = () => {
  const { setUser } = useUsers()
  const { startLoading, endLoading } = useApp()
  const { setPartners, setPartner, setPartnerID } = usePartners()

  const Logout = async () => {
    startLoading("logout")
    await logout()
    setUser(null)
    setPartners(null)
    setPartner(null)
    setPartnerID(null)
    endLoading("logout")
  }

  return { Logout }
}
export default useLogout
