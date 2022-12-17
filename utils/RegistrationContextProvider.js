'use client'

import { useState } from 'react'
import { OnboardingContext } from './OnboardingContext'

const OnboardingContextProvider = ({ children }) => {
  const [partnerInfo, setPartnerInfo] = useState({})
  const updatePartnerInfo = (partner) => {
    console.log(partnerInfo)
    setPartnerInfo([...partnerInfo, ...partner])
  }
  const registerPartner = (partnerInfo) => {
    partner.id = uuid()
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

export default OnboardingContextProvider
