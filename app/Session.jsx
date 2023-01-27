"use client"
import { useStoreActions } from "easy-peasy"

export default function Session({ children, serverSession }) {
  const actions = useStoreActions((action) => action)
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

  return <>{children}</>
}
