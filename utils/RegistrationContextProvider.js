'use client'

import { useState } from 'react'
import { OnboardingContext } from './OnboardingContext'

const OnboardingContextProvider = ({ children }) => {
  const [partnerInfo, setPartnerInfo] = useState({})
  const updatePartnerInfo = (partner) => {
    console.log('updatePartnerInfo')
    console.log('partner')
    console.log(partner)
    setPartnerInfo((oldState) => ({ ...oldState, ...partner }))
    console.log('partnerInfo')
    console.log(partnerInfo)
    registerPartner(partnerInfo)
    console.log('Call reg')
  }
  const registerPartner = (partnerInfo) => {
    console.log('registerPartner')
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
