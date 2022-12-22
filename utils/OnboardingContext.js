import { useState } from 'react'
import { createContext } from 'react'

const OnboardingContext = createContext({
  partnerInfo: {},
  updatePartnerInfo(partner) {},
  registerPartner(partnerInfo) {}
})

export const OnboardingContextProvider = ({ children }) => {
  const [partnerInfo, setPartnerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repassword: ''
  })
  const updatePartnerInfo = (partner) => {
    setPartnerInfo((oldState) => ({ ...oldState, ...partner }))
    registerPartner(partnerInfo)
  }
  const registerPartner = (partnerInfo) => {
    console.log(partnerInfo)
  }
  return (
    <OnboardingContext.Provider
      value={{
        partnerInfo,
        updatePartnerInfo,
        registerPartner
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export default OnboardingContext
