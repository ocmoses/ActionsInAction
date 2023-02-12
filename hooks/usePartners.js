import useProcessing from "@/hooks/useProcessing"
import useRegistration from "@/hooks/useRegistration"
import useErrors from "@/hooks/useErrors"
import RemoteEndpoints from "@/app/modules/endpoints"
import Axios from "@/app/modules/axios"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import { PageRoutes } from "@/app/modules/menu"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { proxyFetch, userData } from "@/app/modules/utilities"
import { forms } from "@/app/modules/constants"
import { getCategories } from "@/app/modules/categories"

const usePartners = () => {
  const router = useRouter()
  const { setProcessing, tmpUserUUID, setTmpUserUUID } = useProcessing()
  const { updateCategory } = useRegistration()
  const app = useApp()

  const [{ setError, setSuccess }] = useErrors({})
  const actions = useStoreActions((action) => action)
  const states = useStoreState((state) => state)

  const { category, categories } = states.partners
  const { setPartners, updatePartner, setCategory } = actions.partners
  const { setUser, setTmpUser } = actions.users
  const { user } = states.users
  const users = useUsers()
  const [validation, setValidation] = useState({
    required: [],
    optional: [],
    allForms: [],
  })
  const setValidationRules = (category) => {
    // console.log({ category })
    // console.log("validation", category)
    const required = []
    const optional = []
    const allForms = { required: [], optional: [], all: [] }
    if (category?.validation) {
      for (const validate in category.validation) {
        if (validate && forms[validate]) {
          if (forms[validate] && category.validation[validate] === "r") {
            required.push(forms[validate].label)
            allForms.required.push(validate)
            allForms.all.push(validate)
          } else if (category?.validation[validate] === "o") {
            optional.push(forms[validate].label)
            allForms.optional.push(validate)
            allForms.all.push(validate)
          }
        }
      }
    }
    const validated = { required, optional, allForms }
    setValidation(validated)
    actions.app.setFormSteps(validated)
    actions.app.setActiveCategory(category?.uuid)
    return validated
  }
  const completeOnboarding = (category) => {
    const currentCategory = categories?.find((c) => c.uuid === category.uuid)
    category.validation = currentCategory.validation
    setCategory(category)
    setValidationRules(category)
  }
  const getPartner = async (uuid) => {
    const result = await proxyFetch(`${apiURL}/v1/auth/partner-info/${uuid}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    })
    const { success, error, data } = result
    return { success, error, data }
  }
  const setCurrentCategory = (category, partner) => {
    const currentCategory = partner?.categories?.find(
      (c) => c.uuid === category.uuid
    )
    const baseCategory = categories?.find(
      (c) => c.uuid === currentCategory.category_uuid
    )
    currentCategory.validation = baseCategory.validation
    currentCategory.category_name = baseCategory.category_name
    setCategory(currentCategory)
    setValidationRules(currentCategory)
  }
  const checkUpdateStatus = (stage) => {
    const progress = category.profile_stage
    return progress[stage] && parseInt(progress[stage]) ? true : false
  }
  const checkRegStatus = async (partner) => {
    if (!partner?.progress) return null
    const { percent, stages } = partner.progress
    if (!(percent < 100)) return { percent, nextstage: "dashboard" }
    const Stages = [
      "userinfo",
      "companyinfo",
      "category",
      "companydetail",
      "compliance",
      "ncclicense",
      "nlrclicense",
      "shortcode",
      "indemnity",
      "accountinfo",
    ]
    const Pages = {
      userinfo: "/onboarding/userinfo",
      companyinfo: "/profile/companyinfo",
      category: "/profile/category",
      companydetail: "/profile/companydetail",
      compliance: "/profile/compliance",
      ncclicense: "/profile/ncclicense",
      nlrclicense: "/profile/nlrclicense",
      shortcode: "/profile/shortcode",
      indemnity: "/profile/indemnity",
      accountinfo: "/profile/accountinfo",
    }
    let nextstage = null
    Stages.map((stage) => {
      if (!nextstage && parseInt(stages[stage]) === 0) nextstage = Pages[stage]
    })
    if (!nextstage) nextstage = PageRoutes.dashboard
    return { percent, nextstage }
  }

  const registerPartner = async (frm, userdata) => {
    console.log({ userdata })
    console.log({ category })
    switch (frm) {
      // Existing partner flows
      case "partnerwelcome":
        setProcessing(true)
        const responsePartnerwelcome = await Axios.post(
          RemoteEndpoints.WELCOMEBACK,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!responsePartnerwelcome) {
          setProcessing(false)
          return { success: false, error: "Something went wrong", data: null }
        }

        const { success: successPartnerwelcome, data: partnerwelcome } =
          responsePartnerwelcome
        if (!successPartnerwelcome) {
          setProcessing(false)
          return { success: false, error: partnerwelcome.message, data: null }
        }
        if (!successPartnerwelcome) {
          setProcessing(false)
          return { success: false, error: partnerwelcome.message, data: null }
        }

        setTmpUser(partnerwelcome.user)
        setPartners(partnerwelcome.partners)
        router.push(
          `/onboarding/verify/${partnerwelcome.user.uuid}/${userdata.email_type}`
        )
        break
      case "setpassword":
        setProcessing(true)
        const responseSetpassword = await Axios.post(
          RemoteEndpoints.RESETPASSWORD,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!responseSetpassword) {
          setProcessing(false)
          return { success: false, error: "Something went wrong", data: null }
        }

        const { success: successSetpassword, data: setpassword } =
          responseSetpassword
        if (!successSetpassword) {
          setProcessing(false)
          return { success: false, error: setpassword.message, data: null }
        }
        setTmpUserUUID(null)
        const categories = await getCategories(process.env.NEXT_PUBLIC_APIKEY)
        const serverSession = {
          status: setpassword?.user?.uuid ? "authenticated" : "unauthenticated",
          User: setpassword,
        }
        app.setStoreStates(serverSession, categories)
        if (userdata.type === "existing" || userdata.type === "new")
          router.push(PageRoutes.getstarted)
        else router.push(PageRoutes.getstarted)
        break
      case "userinfo":
        setProcessing(true)
        // const { success, error, data } = await fetchData(
        //   RemoteEndpoints.USERINFO,
        //   {
        //     method: "POST",
        //     cache: "no-store",
        //     body: JSON.stringify({
        //       first_name: userdata.first_name,
        //       last_name: userdata.last_name,
        //       company_name: userdata.company_name,
        //       email: userdata.email,
        //       countrycode: userdata.countrycode,
        //       country: userdata.country,
        //       telephone: userdata.telephone,
        //       designation: userdata.designation,
        //       password: userdata.password,
        //       password_confirmed: userdata.password,
        //     }),
        //   }
        // )
        // if (error) {
        //   setProcessing(false)
        //   return { success, error, data }
        // }
        const responseUserinfo = await Axios.post(
          RemoteEndpoints.USERINFO,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!responseUserinfo) {
          setProcessing(false)
          return { success: false, error: "Something went wrong", data: null }
        }

        const { success: successUserinfo, data: userinfo } = responseUserinfo
        if (!successUserinfo) {
          setProcessing(false)
          return { success: false, error: userinfo.message, data: null }
        }
        const User = userData(userinfo)
        users.setTmpUser(User.user)
        router.push(`/onboarding/verify/${User.user.uuid}/new`)
        break
      case "category":
        setProcessing(true)
        const responseCategory = await Axios.post(
          RemoteEndpoints.CATEGORY,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!responseCategory) {
          setProcessing(false)
          return { success: false, error: "Something went wrong", data: null }
        }

        const { success: successCategory, data: categoryData } =
          responseCategory
        if (!successCategory) {
          setProcessing(false)
          return { success: false, error: categoryData.message, data: null }
        }
        setCurrentCategory(categoryData.category, categoryData.partner)
        updatePartner(categoryData.partner)
        setUpdateStatus("category", true)
        return { success: true, error: null, data: categoryData }
      case "companydetail":
        return updateCategory("companydetail", userdata)
      case "compliance":
        return updateCategory("compliance", userdata)
      case "ncclicense":
        return updateCategory("ncclicense", userdata)
      case "nlrclicense":
        return updateCategory("nlrclicense", userdata)
      case "shortcode":
        return updateCategory("shortcode", userdata)
      case "indemnity":
        return updateCategory("indemnity", userdata)
      case "accountinfo":
        return updateCategory("accountinfo", userdata)
    }
  }
  const registerPartnerRefactored = async (frm, userdata) => {
    console.log({ userdata })
    switch (frm) {
      // Existing partner flows
      case "partnerwelcome":
        setProcessing(true)
        const { success: partnerwelcomeSuccess, data: partnerwelcome } =
          await fetchData(RemoteEndpoints.WELCOMEBACK, {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({
              partnerid: userdata.partnerid,
              email_type: userdata.email_type,
            }),
          })
        if (!partnerwelcomeSuccess) {
          setProcessing(false)
          return { success: false, error: partnerwelcome.message, data: null }
        }

        users.setTmpUser(partnerwelcome.user)
        // setPartners(partnerwelcome.partners)
        router.push(
          `/onboarding/verify/${partnerwelcome.user.uuid}/${userdata.email_type}`
        )
        break
      case "setpassword":
        setProcessing(true)
        const { data: setpassword, error: setpasswordError } = await fetchData(
          RemoteEndpoints.RESETPASSWORD,
          {
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify({
              user_uuid: user?.uuid ?? tmpUserUUID,
              password: userdata.password,
              password_confirmed: userdata.password,
            }),
          }
        )
        if (setpasswordError) {
          setProcessing(false)
          return { success: false, error: setpasswordError, data: null }
        }
        setTmpUserUUID(null)
        const categories = await getCategories(process.env.NEXT_PUBLIC_APIKEY)
        const serverSession = {
          status: setpassword?.user?.uuid ? "authenticated" : "unauthenticated",
          User: setpassword,
        }
        app.setStoreStates(serverSession, categories)
        if (userdata.type === "existing" || userdata.type === "new")
          router.push(PageRoutes.getstarted)
        else router.push(PageRoutes.getstarted)
        break
      case "userinfo":
        setProcessing(true)
        const { success, error, data } = await fetchData(
          RemoteEndpoints.USERINFO,
          {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({
              first_name: userdata.first_name,
              last_name: userdata.last_name,
              company_name: userdata.company_name,
              email: userdata.email,
              countrycode: userdata.countrycode,
              country: userdata.country,
              telephone: userdata.telephone,
              designation: userdata.designation,
              password: userdata.password,
              password_confirmed: userdata.password,
            }),
          }
        )
        if (error) {
          setProcessing(false)
          return { success, error, data }
        }
        const User = userData(data)
        users.setTmpUser(User.user)
        router.push(`/onboarding/verify/${User.user.uuid}/new`)
        break
      case "category":
        const categoryResponse = updateCategory("category", userdata)
        if (categoryResponse.error) {
          setProcessing(false)
          return categoryResponse
        }
        const { data: categoryData } = categoryResponse
        setCurrentCategory(categoryData.category, categoryData.partner)
        updatePartner(categoryData.partner)
        // setUpdateStatus("category", true)
        return categoryResponse
        break
      case "companydetail":
        return updateCategory("companydetail", userdata)
      case "compliance":
        return updateCategory("compliance", userdata)
      case "ncclicense":
        return updateCategory("ncclicense", userdata)
      case "nlrclicense":
        return updateCategory("nlrclicense", userdata)
      case "shortcode":
        return updateCategory("shortcode", userdata)
      case "indemnity":
        return updateCategory("indemnity", userdata)
      case "accountinfo":
        return updateCategory("accountinfo", userdata)
    }
  }
  const setUpdateStatus = (stage) => {}
  const resendEmail = async (email, email_type) => {
    setProcessing(true)

    const { error: resendEmailError } = await fetchData(
      RemoteEndpoints.RESEND_CONFIRM_EMAIL_LINK,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          email,
          email_type,
        }),
      }
    )
    setProcessing(false)
    if (resendEmailError) {
      return setError({ verify: resendEmailError })
    }

    setSuccess("Email sent successfully")
  }

  return {
    ...states.partners,
    ...actions.partners,
    getPartner,
    updatePartner,
    registerPartner,
    checkRegStatus,
    setUpdateStatus,
    checkUpdateStatus,
    resendEmail,
    validation,
    setValidation,
    setValidationRules,
    completeOnboarding,
    setCurrentCategory,
  }
}
export default usePartners
