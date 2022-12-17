import { createContext, useContext } from 'react'

export const OnboardingContext = createContext({
  partnerInfo: {},
  updatePartnerInfo(partner) {},
  registerPartner(partnerInfo) {}
})

export const useOnboardingContext = () => useContext(OnboardingContext)
