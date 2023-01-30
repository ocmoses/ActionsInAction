"use client"
import { useEffect, useState, createContext, useContext } from "react"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { apiURL, forms, partnerFields, roles } from "@/app/modules/constants"
import { fetchData } from "@/app/modules/fetchData"
import {
  checkRegStatus,
  getPartner,
  partnerRegistration,
} from "@/app/modules/partners"
import { Util } from "@/utils/utility"
import { signIn } from "next-auth/react"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import { BANKS } from "@/app/modules/banks"

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const router = useRouter()
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  // console.log('currentPath', currentPath)
  const [partnerInfo, setPartnerInfo] = useState(partnerFields)
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
    financial: false,
    review: false,
  })
  const [reviewUpdateStatus, setReviewUpdateStatus] = useState({
    confirmcompanyinfo: false,
    contactperson: false,
    updatereview: false,
  })
  const setUpdateStatus = (type, key, status) => {
    if (type === "review") {
      if (reviewStatus[key] !== "undefined")
        setReviewStatus((oldState) => ({
          ...oldState,
          [key]: status,
        }))
    } else {
      if (reviewUpdateStatus[key] !== "undefined")
        setReviewUpdateStatus((oldState) => ({
          ...oldState,
          [key]: status,
        }))
    }
  }
  const checkUpdateStatus = (type, key) => {
    if (type === "review") {
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
    setIsFetching("category", true)
    const nextedCategories = {}
    const {
      success,
      error,
      data: categories,
    } = await fetchData(`${apiURL}/v1/categories`, {
      next: { revalidate: 86400 },
    })
    if (!success)
      setCategories({
        success: false,
        error,
        categories: [],
        allCategories: [],
        nextedCategories: {},
      })
    const Categories = []
    const allCategories = {}

    categories?.length > 0 &&
      categories.map((cat) => {
        allCategories[cat.id] = cat
        if (!cat.parent_id) {
          Categories.push(cat)
        } else {
          if (typeof nextedCategories[cat.parent_id] === "undefined")
            nextedCategories[cat.parent_id] = []
          nextedCategories[cat.parent_id].push(cat)
        }
      })
    setCategories({
      success: true,
      error: null,
      categories: Categories,
      allcategories: allCategories,
      nextedCategories,
    })
    setIsFetching("category", false)
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
        progress: { ...oldState.progress, percent, stages },
      }))
    }
  }

  const registerPartner = async (frm, userdata) => {
    return partnerRegistration(frm, userdata, partnerInfo, setProcessing)
  }
  const setPartner = (data) => {
    setPartnerInfo((oldState) => ({ ...oldState, ...data }))
  }
  return (
    <OnboardingContext.Provider
      value={
        {
          // COUNTRIES,
          // STATES,
          // BANKS,
          // fetching,
          // setIsFetching,
          // processing,
          // categories,
          // roles,
          // partnerInfo,
          // setPartnerInfo,
          // setPartner,
          // registerPartner,
          // getPartner,
          // reviewStatus,
          // reviewUpdateStatus,
          // checkUpdateStatus,
        }
      }
    >
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
