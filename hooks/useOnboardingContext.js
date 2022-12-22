'use client'
import { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import axios from 'axios'

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const forms = {
    userinfo: {
      form: 'userinfo',
      title: 'Get started',
      subtitle: "it'll only take a few minutes",
      required: [
        'first_name',
        'last_name',
        'email',
        'country',
        'countrycode',
        'telephone',
        'password',
        'password_confirmed'
      ]
    },
    companyinfo: {
      form: 'companyinfo',
      title: 'Your company and role',
      subtitle: "it'll only take a few minutes",
      required: ['company_name', 'company_role']
    }
  }
  const roles = [
    {
      slug: '',
      title: '-',
      priviledges: []
    },
    {
      slug: 'superadmin',
      title: 'Super Admin',
      priviledges: []
    },
    {
      slug: 'admin',
      title: 'Admin',
      priviledges: []
    }
  ]
  const [partnerInfo, setPartnerInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country: 'NG',
    countrycode: '234',
    telephone: '08120820076',
    password: '**********',
    password_confirmed: '**********',
    company_name: '',
    company_role: ''
  })
  const [form, setForm] = useState('userinfo')
  const registerPartner = (frm) => {
    console.log(form)
    console.log(partnerInfo)
    const regUrl =
      'https://amazonpartner.com.ng/amazon/public/api/v1/auth/register'
    switch (frm) {
      case 'userinfo':
        setForm('companyinfo')
        break
      case 'companyinfo':
        const callbackurl =
          'https://digital-partner-portal-tau.vercel.app/onboarding/login'
        axios(regUrl, {
          method: 'POST',
          data: {
            first_name: partnerInfo.first_name,
            last_name: partnerInfo.last_name,
            email: partnerInfo.email,
            country: partnerInfo.country,
            countrycode: partnerInfo.countrycode,
            telephone: partnerInfo.telephone,
            password: partnerInfo.password,
            password_confirmed: partnerInfo.password_confirmed,
            company_name: partnerInfo.company_name,
            company_role: partnerInfo.company_role,
            callbackurl: callbackurl
          }
        })
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log('error', error))
        break
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        forms,
        form,
        setForm,
        roles,
        partnerInfo,
        setPartnerInfo,
        registerPartner
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
