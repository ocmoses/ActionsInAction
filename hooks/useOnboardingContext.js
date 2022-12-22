'use client'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { Util } from '../utils/utility'
import { useRouter } from 'next/navigation'

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const router = useRouter()
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
  const [requestSuccess, setRequestSuccess] = useState('')
  const [processing, setProcessing] = useState(false)
  const registerPartner = async (frm) => {
    const apiUrl =
      'https://amazonpartner.com.ng/amazon/public/api/v1/auth/register'
    const callbackurl =
      'https://digital-partner-portal-tau.vercel.app/onboarding/update'
    switch (frm) {
      case 'userinfo':
        setForm('companyinfo')
        break
      case 'companyinfo':
        setProcessing(true)

        const response = await axios(apiUrl, {
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
            if (response) {
              const {
                data: { data, success }
              } = response

              if (
                typeof data === 'object' &&
                data !== null &&
                !Util.isEmpty(data)
              ) {
                for (const error in data) {
                  if (
                    data[error].constructor === Array &&
                    data[error].length > 0
                  ) {
                    data[error].map((err) =>
                      setRequestError((oldState) => [...oldState, err])
                    )
                  } else {
                    setRequestError((oldState) => [
                      ...oldState,
                      data?.message ??
                        'An error occured. Please reach out to us if issue persists'
                    ])
                  }
                }
              } else {
                setRequestError((oldState) => [...oldState, message])
              }
            } else {
              setRequestError((oldState) => [...oldState, message])
            }
          })
          .finally(() => setProcessing(false))
        if (response) {
          const {
            data: { data, success }
          } = response
          if (success) {
            router.replace('/onboarding/register/validate')
            setRequestSuccess('Registration was successful.')
          }
        }
        break
    }
  }
  let errorTimeout = null
  useEffect(() => {
    if (requestError.length > 0) {
      clearTimeout(errorTimeout)
      errorTimeout = setTimeout(
        () =>
          setRequestError((oldState) => {
            oldState.shift()
            return [...oldState]
          }),
        10000
      )
    }
  }, [requestError])
  let successTimeout = null
  useEffect(() => {
    if (requestSuccess.length > 0) {
      clearTimeout(successTimeout)
      successTimeout = setTimeout(() => setRequestSuccess(''), 10000)
    }
  }, [requestSuccess])
  const resendEmail = async (email) => {
    const apiUrl =
      'https://amazonpartner.com.ng/amazon/public/api/v1/auth/register/resend-confirm-email-link'

    setProcessing(true)

    const response = await axios(apiUrl, {
      method: 'POST',
      headers: {
        apikey: 't7286gyfe987ffey87*Zzzht45334DSWTU'
      },
      data: {
        email: email
      }
    })
      .catch(({ message, response }) => {
        if (response) {
          const {
            data: { data }
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
        } else {
          console.log(message)
          setRequestError((oldState) => [...oldState, message])
        }
      })
      .finally(() => setProcessing(false))
    if (response) {
      const {
        data: { success }
      } = response
      if (success)
        setRequestSuccess(
          'Email was sent successfully. Please checnk your email'
        )
    }
  }
  return (
    <OnboardingContext.Provider
      value={{
        forms,
        form,
        requestError,
        requestSuccess,
        setRequestError,
        processing,
        setProcessing,
        setForm,
        roles,
        partnerInfo,
        setPartnerInfo,
        registerPartner,
        resendEmail
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
