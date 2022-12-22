'use client'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { Util } from '../utils/utility'

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
    telephone: '',
    password: '',
    password_confirmed: '',
    company_name: '',
    company_role: ''
  })
  const [form, setForm] = useState('userinfo')
  const [requestError, setRequestError] = useState([])
  const [processing, setProcessing] = useState(false)
  const registerPartner = async (frm) => {
    const regUrl =
      'https://amazonpartner.com.ng/amazon/public/api/v1/auth/register'
    const callbackurl =
      'https://digital-partner-portal-tau.vercel.app/onboarding/login'
    switch (frm) {
      case 'userinfo':
        setForm('companyinfo')
        break
      case 'companyinfo':
        setProcessing(true)

        const response = await axios(regUrl, {
          method: 'POST',
          headers: {
            apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU'
          },
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
          .catch(({ message, response }) => {
            const {
              data: { data, success }
            } = response
            if (!Util.isEmpty(data)) {
              for (const error in data) {
                if (data[error].length > 0) {
                  data[error].map((err) =>
                    setRequestError((oldState) => [...oldState, err])
                  )
                }
              }
            }
          })
          .finally(() => setProcessing(false))
        const {
          data: { data, success }
        } = response
        if (success) console.log('Success')
        break
    }
  }
  let timeout = null
  useEffect(() => {
    if (requestError.length > 0) {
      clearTimeout(timeout)
      timeout = setTimeout(
        () =>
          setRequestError((oldState) => {
            oldState.shift()
            return [...oldState]
          }),
        10000
      )
    }
  }, [requestError])
  return (
    <OnboardingContext.Provider
      value={{
        forms,
        form,
        requestError,
        setRequestError,
        processing,
        setProcessing,
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
