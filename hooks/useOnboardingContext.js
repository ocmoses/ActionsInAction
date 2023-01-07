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
import { COUNTRIES } from '@/app/modules/countries'
import { STATES } from '@/app/modules/states'

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
  const [fetching, setFetching] = useState({})
  const [processing, setProcessing] = useState(false)
  const [categories, setCategories] = useState({})
  const [reviewStatus, setReviewStatus] = useState({
    companydetail: false,
    compliance: false,
    ncclicense: false,
    nlrclicense: false,
    shortcode: false,
    indemnity: false,
    accountinfo: false,
    review: false
  })
  const [reviewUpdateStatus, setReviewUpdateStatus] = useState({
    confirmcompanyinfo: false,
    contactperson: false,
    updatereview: false
  })
  const setUpdateStatus = (type, key, status) => {
    if (type === 'review') {
      if (reviewStatus[key] !== 'undefined')
        setReviewStatus((oldState) => ({
          ...oldState,
          [key]: status
        }))
    } else {
      if (reviewUpdateStatus[key] !== 'undefined')
        setReviewUpdateStatus((oldState) => ({
          ...oldState,
          [key]: status
        }))
    }
  }
  const checkUpdateStatus = (type, key) => {
    if (type === 'review') {
      if (reviewStatus[key]) return true
      return false
    } else {
      if (reviewUpdateStatus[key]) return true
      return false
    }
  }
  const setIsFetching = (key, status) => {
    setFetching((oldState) => {
      if (status === true) return { ...oldState, [key]: true }
      delete oldState[key]
      return oldState
    })
  }
  const fetchCatgories = async () => {
    setIsFetching('category', true)
    const nextedCategories = {}
    const {
      success,
      errors,
      data: categories
    } = await fetchData(`${apiURL}/v1/categories`, {
      next: { revalidate: 86400 }
    })
    if (!success)
      setCategories({
        success: false,
        errors,
        categories: [],
        allCategories: [],
        nextedCategories: {}
      })
    const Categories = []
    const allCategories = {}
    categories.map((cat) => {
      allCategories[cat.id] = cat
      if (!cat.parent_id) {
        Categories.push(cat)
      } else {
        if (typeof nextedCategories[cat.parent_id] === 'undefined')
          nextedCategories[cat.parent_id] = []
        nextedCategories[cat.parent_id].push(cat)
      }
    })
    setCategories({
      success: true,
      errors: [],
      categories: Categories,
      allcategories: allCategories,
      nextedCategories
    })
    setIsFetching('category', false)
  }
  useEffect(() => {
    fetchCatgories()
  }, [])
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
        // LoginUser(
        //   {
        //     partnerid: '234691599',
        //     password: 'Todoo45@222'
        //   },
        //   '/onboarding/register/companyinfo',
        //   false
        // )
        setUpdateStatus('review', 'userinfo', true)
        router.push('/onboarding/register/companyinfo')
        break
      case 'companyinfo':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'companyinfo', true)
        router.replace('/onboarding/register/validate')
        break
      case 'category':
        setProcessing(false)
        setPartner({ category_id: data })
        setUpdateStatus('review', 'category', true)
        router.push('/profile/companydetail')
        break
      case 'companydetail':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'companydetail', true)
        router.push('/profile/compliance')
        break
      case 'compliance':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'compliance', true)
        router.push('/profile/ncclicense')
        break
      case 'ncclicense':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'ncclicense', true)
        router.push('/profile/nlrclicense')
        break
      case 'nlrclicense':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'nlrclicense', true)
        router.push('/profile/shortcode')
        break
      case 'shortcode':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'shortcode', true)
        router.push('/profile/indemnity')
        break
      case 'indemnity':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'indemnity', true)
        router.push('/profile/accountinfo')
        break
      case 'accountinfo':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('review', 'accountinfo', true)
        router.push('/profile/review')
        break
      // Existing partner flows
      case 'partnerwelcome':
        setProcessing(true)
        setUpdateStatus('review', 'partnerwelcome', true)
        router.push('/onboarding/register/validate?path=pwd')
        break
      case 'setpassword':
        setProcessing(true)
        setUpdateStatus('updatereview', 'setpassword', true)
        router.push('/profile/update/welcome?path=companyinfo')
        break
      case 'confirmcompanyinfo':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('updatereview', 'confirmcompanyinfo', true)
        router.push('/profile/update/contactperson')
        break
      case 'contactperson':
        setProcessing(true)
        setPartner(data)
        setUpdateStatus('updatereview', 'contactperson', true)
        router.push('/profile/update/review')
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
        COUNTRIES,
        STATES,
        requestError,
        requestSuccess,
        SetError,
        ClearErrors,
        setRequestError,
        setRequestSuccess,
        fetching,
        setIsFetching,
        processing,
        setProcessing,
        setForm,
        categories,
        roles,
        partnerInfo,
        setPartner,
        registerPartner,
        getPartner,
        resendEmail,
        LoginUser,
        reviewStatus,
        reviewUpdateStatus,
        checkUpdateStatus
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
