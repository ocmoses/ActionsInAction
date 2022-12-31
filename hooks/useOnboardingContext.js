'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { forms, partnerFields, roles } from '@/app/modules/constants'
import { register_partner, getPartner } from '@/app/modules/partners'
import { Util } from '@/utils/utility'
// import { useAppContext } from '@/hooks/useAppContext'

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const router = useRouter()
  const [partnerInfo, setPartnerInfo] = useState(partnerFields)
  const [form, setForm] = useState('userinfo')
  const [requestError, setRequestError] = useState([])
  const [requestSuccess, setRequestSuccess] = useState('')
  const [processing, setProcessing] = useState(false)
  const registerPartner = async (frm, data) => {
    const apiUrl =
      'https://amazonpartner.com.ng/amazon/public/api/v1/auth/register'
    const callbackurl =
      'https://digital-partner-portal-tau.vercel.app/profile/validate'

    switch (frm) {
      case 'userinfo':
        setProcessing(true)
        setPartner(data)
        setForm('companyinfo')
        router.push('/onboarding/register/companyinfo')
        break

      case 'companyinfo':
        setProcessing(true)
        const {
          success,
          data: result,
          errors
        } = await register_partner({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          country: data.country,
          countrycode: data.countrycode,
          telephone: data.telephone,
          password: data.password,
          password_confirmed: data.password_confirmed,
          company_name: data.company_name,
          company_role: data.company_role,
          callbackurl: callbackurl
        })

        if (success) {
          console.log(result)
          setPartner(data)
          router.replace('/onboarding/register/validate')
          // setRequestSuccess('Registration was successful.')
        } else {
          setProcessing(false)
          if (errors.length > 0) {
            errors.map((err) => {
              SetError(err)
            })
          }
        }
        break
      case 'category':
        setProcessing(true)
        setPartner(data)
        setForm('companydetail')
        router.push('/profile/companydetail')
        break

      case 'companydetail':
        setProcessing(true)
        setPartner(data)
        setForm('compliance')
        router.push('/profile/compliance')
        break
      case 'compliance':
        setProcessing(true)
        setPartner(data)
        setForm('ncclicense')
        router.push('/profile/ncclicense')
        break
      case 'ncclicense':
        setProcessing(true)
        setPartner(data)
        setForm('nlrclicense')
        router.push('/profile/nlrclicense')
        break

      case 'nlrclicense':
        setProcessing(true)
        setPartner(data)
        setForm('shortcode')
        router.push('/profile/shortcode')
        break
      case 'shortcode':
        setProcessing(true)
        setPartner(data)
        setForm('indemnity')
        router.push('/profile/indemnity')
        break
    }
  }

  const setPartner = (data) => {
    setPartnerInfo((oldState) => ({ ...oldState, ...data }))
  }
  const ClearErrors = () => {
    setRequestError([])
  }
  let errorTimeout = {}
  const SetError = (message) => {
    if (typeof message === 'string') {
      const uuid = uuidv4()
      const timeStamp = Date.now().toString()
      const rand = Math.floor(Math.random() * 1000000)
      const key = `${uuid}-${timeStamp}-${rand}`
      setRequestError((oldState) => {
        let duplicate = false
        oldState.map((os) => {
          if (os.message === message) duplicate = true
        })
        return duplicate ? oldState : [...oldState, { key, message }]
      })
      errorTimeout[key] = setTimeout(
        (key) => {
          setRequestError((oldState) => {
            if (oldState.length > 0) {
              const newState = oldState.filter((err) => err.key !== key)
              clearTimeout(errorTimeout[key])
              return newState
            }
            return []
          })
        },
        8000,
        key
      )
    } else if (message.constructor === Array && message.length > 0) {
      message.map((err) => {
        SetError(err)
      })
    }
  }
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
        SetError,
        ClearErrors,
        setRequestError,
        setRequestSuccess,
        processing,
        setProcessing,
        setForm,
        roles,
        partnerInfo,
        setPartner,
        registerPartner,
        getPartner,
        resendEmail
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
