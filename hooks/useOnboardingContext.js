'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { apiURL, forms, partnerFields, roles } from '@/app/modules/constants'
import { fetchData } from '@/app/modules/fetchData'
import {
  checkRegStatus,
  getPartner,
  partnerRegistration
} from '@/app/modules/partners'
import { Util } from '@/utils/utility'
import { signIn } from 'next-auth/react'
import { COUNTRIES } from '@/app/modules/countries'
import { STATES } from '@/app/modules/states'
import { BANKS } from '@/app/modules/banks'
import useLocalSession from '@/hooks/useLocalSession'

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const { loading, error, login, logout, session, updateSession } =
    useLocalSession()
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
      error,
      data: categories
    } = await fetchData(`${apiURL}/v1/categories`, {
      next: { revalidate: 86400 }
    })
    if (!success)
      setCategories({
        success: false,
        error,
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
      error: null,
      categories: Categories,
      allcategories: allCategories,
      nextedCategories
    })
    setIsFetching('category', false)
  }
  useEffect(() => {
    fetchCatgories()
  }, [])
  const updatePercentComplete = (data) => {
    const percent = data.percent_complete
    const stages = { ...data.profile_stage }
    if (percent) {
      setPartnerInfo((oldState) => ({
        ...oldState,
        progress: { ...oldState.progress, percent, stages }
      }))
    }
  }
  const LoginUser = async (data, redirect = false, callbackUrl = '/') => {
    setProcessing(true)
    const result = await signIn('credentials', {
      partnerid: data.partnerid,
      password: data.password,
      redirect: redirect,
      callbackUrl: callbackUrl
    })
    if (!result) {
      setProcessing(false)
      return { error: 'Something went wrong' }
    }
    if (!result?.ok) {
      setProcessing(false)
      if (result.error) return result
      else return { error: 'Something went wrong' }
    }

    //CHECK USER STATUS
    const partner = await getPartner(data.partnerid)

    if (partner.error) return partner
    if (partner.data) {
      setPartner(partner.data.user)
      console.log(partner.data.user)
      const partner_status = await checkRegStatus(partner)
      return { success: true, ...partner_status }
    }
    return { error: 'Something went wrong' }
  }
  const LoginPartner = async (data, redirect = false, callbackUrl = '/') => {
    setProcessing(true)
    const result = await login({
      partnerid: data.partnerid,
      password: data.password
    })
    if (!result) {
      setProcessing(false)
      return { error: 'Something went wrong' }
    }
    const { success, error, data: user } = result
    if (!success) {
      setProcessing(false)
      if (error) return { error: error }
      else return { error: 'Something went wrong' }
    }

    if (user) {
      setPartner(user)
      const partner_status = await checkRegStatus(user)
      return { success: true, ...partner_status }
    }
    return { error: 'Something went wrong' }
  }
  const registerPartner = async (frm, userdata) => {
    return partnerRegistration(frm, userdata, partnerInfo, setProcessing)
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
        BANKS,
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
        setPartnerInfo,
        setPartner,
        registerPartner,
        getPartner,
        resendEmail,
        LoginUser,
        LoginPartner,
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
