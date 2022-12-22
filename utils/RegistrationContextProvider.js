'use client'

import { useState } from 'react'
import { OnboardingContext } from './OnboardingContext'

const OnboardingContextProvider = ({ children }) => {
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
    // console.log('Call reg')
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

export default OnboardingContextProvider
