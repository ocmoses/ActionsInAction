'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { apiURL, forms, partnerFields, roles } from '@/app/modules/constants'
import { fetchData } from '@/app/modules/fetchData'
import { checkRegStatus, getPartner } from '@/app/modules/partners'
import { Util } from '@/utils/utility'
import { signIn } from 'next-auth/react'
import { COUNTRIES } from '@/app/modules/countries'
import { STATES } from '@/app/modules/states'
import { BANKS } from '@/app/modules/banks'
import { signOut, useSession } from 'next-auth/react'

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const session = useSession()
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
  //
  // onboarding/register/validate
  // onboarding/validate/234577726  // registration callback url
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
  const registerPartner = async (frm, userdata) => {
    console.log({ session })
    switch (frm) {
      case 'userinfo':
        setProcessing(true)
        const { success, error, data } = await fetchData(
          `${apiURL}/v1/auth/register/userinfo`,
          {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({
              first_name: userdata.first_name,
              last_name: userdata.last_name,
              email: userdata.email,
              countrycode: userdata.countrycode,
              country: userdata.country,
              telephone: userdata.telephone,
              password: userdata.password,
              password_confirmed: userdata.password_confirmed
            })
          }
        )
        if (error) {
          setProcessing(false)
          return { success, error, data }
        }
        const result = await LoginUser(
          {
            partnerid: data.user.partnerid,
            password: userdata.password
          },
          false,
          '/onboarding/register/companyinfo'
        )

        if (result.success) {
          setUpdateStatus('review', 'userinfo', true)
          router.push('/onboarding/register/companyinfo')
          return
        }
        break
      case 'companyinfo':
        setProcessing(true)
        const {
          success: cIsuccess,
          error: cIerror,
          data: companyinfo
        } = await fetchData(`${apiURL}/v1/auth/register/companyinfo`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            company_name: userdata.company_name,
            company_role: userdata.company_role
          })
        })
        if (cIerror) {
          setProcessing(false)
          return { success: false, error: cIerror, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(companyinfo)
        setUpdateStatus('review', 'companyinfo', true)
        router.push('/onboarding/register/validate')
        break
      case 'category':
        setProcessing(true)
        const {
          success: catSuccess,
          error: catError,
          data: category
        } = await fetchData(`${apiURL}/v1/auth/register/category`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            category_id: userdata
          })
        })
        if (catError) {
          setProcessing(false)
          return { success: false, error: catError, data: null }
        }
        setPartner({ category_id: userdata })
        updatePercentComplete(category)
        setUpdateStatus('review', 'category', true)
        router.push('/profile/companydetail')
        break
      case 'companydetail':
        setProcessing(true)
        const {
          success: comDetSuccess,
          error: comDetError,
          data: companydetail
        } = await fetchData(`${apiURL}/v1/auth/register/companydetail`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            company_name: userdata.company_name,
            country: userdata.country,
            company_address: userdata.company_address,
            company_city: userdata.company_city,
            company_state: userdata.company_state,
            company_postcode: userdata.company_postcode
          })
        })
        if (comDetError) {
          setProcessing(false)
          return { success: false, error: comDetError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(companydetail)
        setUpdateStatus('review', 'companydetail', true)
        router.push('/profile/compliance')
        break
      case 'compliance':
        setProcessing(true)
        const {
          success: complianceSuccess,
          error: complianceError,
          data: compliance
        } = await fetchData(`${apiURL}/v1/auth/register/compliance`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            rc_no: userdata.rc_no ?? '',
            tin_no: userdata.tin_no ?? '',
            tin_doc: userdata.tin_doc ?? '',
            memart_doc: userdata.memart_doc ?? '',
            cac_doc: userdata.cac_doc ?? ''
          })
        })
        if (complianceError) {
          setProcessing(false)
          return { success: false, error: complianceError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(compliance)
        setUpdateStatus('review', 'compliance', true)
        router.push('/profile/ncclicense')
        break
      case 'ncclicense':
        setProcessing(true)
        const {
          success: ncclicenseSuccess,
          error: ncclicenseError,
          data: ncclicense
        } = await fetchData(`${apiURL}/v1/auth/register/ncclicense`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            vas_license_id: userdata.vas_license_id ?? '',
            ncc_issue_date: userdata.ncc_issue_date ?? '',
            ncc_expiry_date: userdata.ncc_expiry_date ?? '',
            ncc_doc: userdata.ncc_doc ?? ''
          })
        })

        if (ncclicenseError) {
          setProcessing(false)
          return { success: false, error: ncclicenseError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(ncclicense)
        setUpdateStatus('review', 'ncclicense', true)
        router.push('/profile/nlrclicense')
        break
      case 'nlrclicense':
        setProcessing(true)
        const {
          success: nlrclicenseSuccess,
          error: nlrclicenseError,
          data: nlrclicense
        } = await fetchData(`${apiURL}/v1/auth/register/nlrclicense`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            nlrc_license_id: userdata.nlrc_license_id ?? '',
            nlrc_issue_date: userdata.nlrc_issue_date ?? '',
            nlrc_expiry_date: userdata.nlrc_expiry_date ?? '',
            nlrc_doc: userdata.nlrc_doc ?? ''
          })
        })
        if (nlrclicenseError) {
          setProcessing(false)
          return { success: false, error: nlrclicenseError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(nlrclicense)
        setUpdateStatus('review', 'nlrclicense', true)
        router.push('/profile/shortcode')
        break
      case 'shortcode':
        setProcessing(true)
        const {
          success: shortcodeSuccess,
          error: shortcodeError,
          data: shortcode
        } = await fetchData(`${apiURL}/v1/auth/register/shortcode`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            shortcode: userdata.shortcode ?? '',
            shortcode_issue_date: userdata.shortcode_issue_date ?? '',
            shortcode_expiry_date: userdata.shortcode_expiry_date ?? '',
            shortcode_price_issue_date:
              userdata.shortcode_price_issue_date ?? '',
            shortcode_price_expiry_date:
              userdata.shortcode_price_expiry_date ?? '',
            shortcode_doc: userdata.shortcode_doc ?? '',
            shortcode_approval_doc: userdata.shortcode_approval_doc ?? ''
          })
        })
        if (shortcodeError) {
          setProcessing(false)
          return { success: false, error: shortcodeError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(shortcode)
        setUpdateStatus('review', 'shortcode', true)
        router.push('/profile/indemnity')
        break
      case 'indemnity':
        setProcessing(true)
        const {
          success: indemnitySuccess,
          error: indemnityError,
          data: indemnity
        } = await fetchData(`${apiURL}/v1/auth/register/indemnity`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            indemnity_no: userdata.indemnity_no ?? '',
            indemnity_issue_date: userdata.indemnity_issue_date ?? '',
            indemnity_expiry_date: userdata.indemnity_expiry_date ?? '',
            indemnity_doc: userdata.indemnity_doc ?? ''
          })
        })
        if (indemnityError) {
          setProcessing(false)
          return { success: false, error: indemnityError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(indemnity)
        setUpdateStatus('review', 'indemnity', true)
        router.push('/profile/accountinfo')
        break
      case 'accountinfo':
        setProcessing(true)
        const {
          success: accountinfoSuccess,
          error: accountinfoError,
          data: accountinfo
        } = await fetchData(`${apiURL}/v1/auth/register/accountinfo`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            account_name: userdata.account_name ?? '',
            account_no: userdata.account_no ?? '',
            bank: userdata.bank ?? '',
            audited_account_1: userdata.audited_account_1 ?? '',
            audited_account_2: userdata.audited_account_2 ?? '',
            audited_account_3: userdata.audited_account_3 ?? ''
          })
        })
        if (accountinfoError) {
          setProcessing(false)
          return { success: false, error: accountinfoError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(accountinfo)
        setUpdateStatus('review', 'accountinfo', true)
        router.push('/profile/review')
        break
      // Existing partner flows
      case 'partnerwelcome':
        setProcessing(true)
        const {
          success: partnerwelcomeSuccess,
          error: partnerwelcomeError,
          data: partnerwelcome
        } = await fetchData(`${apiURL}/v1/existing-partner/welcome-back`, {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: userdata.partnerid
          })
        })
        if (partnerwelcomeError) {
          setProcessing(false)
          return { success: false, error: partnerwelcomeError, data: null }
        }

        const partner = await getPartner(userdata.partnerid)
        if (partner.error) return partner
        if (partner.data) {
          const user = {
            ...partner.data.user,
            progress: {
              percent: partner.data.percent_complete,
              stages: { ...partner.data.profile_stage }
            }
          }
          setPartner(user)
        }
        setPartner(userdata)
        updatePercentComplete(partnerwelcome)
        setUpdateStatus('review', 'partnerwelcome', true)
        router.push('/onboarding/register/partnerwelcome/validate')
        break
      case 'setpassword':
        setProcessing(true)
        const {
          success: setpasswordSuccess,
          error: setpasswordError,
          data: setpassword
        } = await fetchData(`${apiURL}/v1/existing-partner/setup-password`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            password: userdata.password,
            password_confirmed: userdata.password_confirmed
          })
        })
        if (setpasswordError) {
          setProcessing(false)
          return { success: false, error: setpasswordError, data: null }
        }
        // setPartner(userdata)
        updatePercentComplete(setpassword)
        setUpdateStatus('updatereview', 'setpassword', true)
        router.push('/profile/update/welcome?path=companyinfo')
        break
      case 'confirmcompanyinfo':
        setProcessing(true)
        const {
          success: confirmcompanyinfoSuccess,
          error: confirmcompanyinfoError,
          data: confirmcompanyinfo
        } = await fetchData(
          `${apiURL}/v1/existing-partner/confirm-companyinfo`,
          {
            method: 'PUT',
            cache: 'no-store',
            body: JSON.stringify({
              partnerid: partnerInfo.partnerid,
              company_name: userdata.company_name ?? '',
              country: userdata.country ?? '',
              company_address: userdata.company_address ?? '',
              company_city: userdata.company_city ?? '',
              company_state: userdata.company_state ?? '',
              company_postcode: userdata.company_postcode ?? ''
            })
          }
        )
        if (confirmcompanyinfoError) {
          setProcessing(false)
          return { success: false, error: confirmcompanyinfoError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(confirmcompanyinfo)
        setUpdateStatus('updatereview', 'confirmcompanyinfo', true)
        router.push('/profile/update/contactperson')
        break
      case 'contactperson':
        setProcessing(true)
        const {
          success: contactpersonSuccess,
          error: contactpersonError,
          data: contactperson
        } = await fetchData(`${apiURL}/v1/existing-partner/contact-person`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            partnerid: partnerInfo.partnerid,
            first_name: userdata.first_name ?? '',
            last_name: userdata.last_name ?? '',
            email: userdata.email ?? '',
            country: partnerInfo.country ?? '',
            countrycode: userdata.countrycode ?? '',
            telephone: userdata.telephone ?? ''
          })
        })
        if (contactpersonError) {
          setProcessing(false)
          return { success: false, error: contactpersonError, data: null }
        }
        setPartner(userdata)
        updatePercentComplete(contactperson)
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
