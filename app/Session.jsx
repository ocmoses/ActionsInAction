"use client"
import { useStoreActions, useStoreRehydrated } from "easy-peasy"

export default function Session({ children, serverSession }) {
  const isRehydrated = useStoreRehydrated()
  if (isRehydrated) {
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
  }

  return <>{isRehydrated ? children : "Loaging..."}</>
}
