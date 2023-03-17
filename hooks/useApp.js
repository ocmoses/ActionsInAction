"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
import { Util, isObject, filterPartner } from "@/app/modules/utilities"

const useApp = () => {
  const states = useStoreState((state) => state)
  const actions = useStoreActions((action) => action)

  const appStates = states.app
  const appActions = actions.app

  const setStoreStates = (serverSession, categories, source) => {
    console.log(source, categories)
    if (categories?.error) setError({ global: categories.error })
    if (serverSession?.status === "authenticated") {
      if (serverSession?.User?.user.uuid) {
        serverSession.User.user.status = "authenticated"
        actions.users.setUser(serverSession.User.user)
        if (serverSession?.User?.partners?.length) {
          const PartnersAccounts = serverSession.User.partners.map((partner) =>
            filterPartner(partner, categories?.data)
          )
          actions.partners.setPartners(PartnersAccounts)
        }
        if (
          isObject(serverSession?.User?.partner) &&
          !Util.isEmpty(serverSession?.User?.partner)
        ) {
          // filter partner info hook to add other data before commiting to store
          const partnerInfo = filterPartner(
            serverSession?.User?.partner,
            categories
          )
          actions.partners.setPartner(partnerInfo)
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
        if (categories.error) actions.app.setError(categories.error)
      }
    }
  }

  return { ...appStates, ...appActions, setStoreStates }
}

export default useApp
