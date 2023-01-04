'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { apiURL, forms, partnerFields, roles } from '@/app/modules/constants'
import { fetchData } from '@/app/modules/fetchData'
import { getPartner } from '@/app/modules/partners'
import { Util } from '@/utils/utility'
import { signIn } from 'next-auth/react'
// import { useAppContext } from '@/hooks/useAppContext'

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const router = useRouter()
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  // console.log('currentPath', currentPath)
  const [partnerInfo, setPartnerInfo] = useState(partnerFields)
  const [form, setForm] = useState(null)
  const [requestError, setRequestError] = useState([])
  const [requestSuccess, setRequestSuccess] = useState('')
  const [processing, setProcessing] = useState(false)
  const LoginUser = async (data, redirect = '/', replace = true) => {
    setProcessing(true)
    const result = await signIn('credentials', {
      partnerid: data.partnerid,
      password: data.password,
      redirect: replace,
      callbackUrl: redirect
    })

    if (!result) {
      setProcessing(false)
      return SetError('Something went wrong')
    }
    if (!result?.ok) {
      setProcessing(false)
      if (result.error) SetError(result.error)
      else return SetError('Something went wrong')
    }
    // if (replace) router.replace(redirect)
    // else router.push(redirect)
    console.log('Signin', { data, redirect, replace, result })
    return result
  }
  const registerPartner = async (frm, data) => {
    switch (frm) {
      case 'userinfo':
        setProcessing(true)
        setPartner(data)

        // const { success, errors, user } = await fetchData(
        //   `${apiURL}/v1/auth/register/userinfo`,
        //   {
        //     method: 'POST',
        //     cache: 'no-store',
        //     body: JSON.stringify({
        //       first_name: data.first_name,
        //       last_name: data.last_name,
        //       email: data.email,
        //       countrycode: data.countrycode,
        //       country: data.country,
        //       telephone: data.telephone,
        //       password: data.password,
        //       password_confirmed: data.password_confirmed
        //     })
        //   }
        // )
        // setProcessing(false)
        // console.log('userinfo', { success, errors, user })
        // if (errors) {
        //   SetError(errors)
        // }
        LoginUser(
          {
            partnerid: '234691599',
            password: 'Todoo45@222'
          },
          '/onboarding/register/companyinfo',
          false
        )
        // router.replace('/onboarding/register/companyinfo')
        break

      case 'companyinfo':
        setProcessing(true)
        setPartner(data)
        router.replace('/onboarding/register/validate')
        break
      case 'category':
        setProcessing(false)
        setPartner(data)
        router.push('/profile/companydetail')
        break

      case 'companydetail':
        setProcessing(true)
        setPartner(data)
        router.push('/profile/compliance')
        break
      case 'compliance':
        setProcessing(true)
        setPartner(data)
        router.push('/profile/ncclicense')
        break
      case 'ncclicense':
        setProcessing(true)
        setPartner(data)
        router.push('/profile/nlrclicense')
        break

      case 'nlrclicense':
        setProcessing(true)
        setPartner(data)
        router.push('/profile/shortcode')
        break
      case 'shortcode':
        setProcessing(true)
        setPartner(data)
        router.push('/profile/indemnity')
        break

      // Existing partner flows
      case 'partnerwelcome':
        setProcessing(true)
        router.push('/onboarding/register/validate?path=pwd')
        break
      case 'setpassword':
        setProcessing(true)
        router.push('/profile/update/welcome?path=companyinfo')
        break
      case 'confirmcompanyinfo':
        setProcessing(true)
        router.push('/profile/update/contactperson')
        break
      case 'contactperson':
        setProcessing(true)
        router.push('/profile/update/contactperson')
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
        resendEmail,
        LoginUser
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
