import useProcessing from "@/hooks/useProcessing"
import useRegistration from "@/hooks/useRegistration"
import useErrors from "@/hooks/useErrors"
import RemoteEndpoints from "@/app/modules/endpoints"
import Axios from "@/app/modules/axios"
import useApp from "@/hooks/useApp"
import { PageRoutes } from "@/app/modules/menu"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { proxyFetch } from "@/app/modules/utilities"
import { userData } from "@/app/modules/utilities"
import { forms } from "@/app/modules/constants"
import { getCategories } from "@/app/modules/categories"
import { isArray } from "@/app/modules/utilities"

const usePartners = () => {
  const router = useRouter()
  const { setProcessing, tmpUserUUID, setTmpUserUUID } = useProcessing()
  const { register } = useRegistration()
  const app = useApp()

  const [{ setError, setSuccess }] = useErrors({})
  const actions = useStoreActions((action) => action)
  const states = useStoreState((state) => state)

  const { category, categories, partner } = states.partners
  const { setPartner, setPartners, updatePartner, setCategory, setPartnerID } =
    actions.partners
  const { setUser } = actions.users
  const { user } = states.users
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
    switch (frm) {
      // Existing partner flows
      case "partnerwelcome":
        setProcessing(true)
        const { error: partnerwelcomeError, data: partnerwelcome } =
          await fetchData(RemoteEndpoints.WELCOMEBACK, {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({
              partnerid: userdata.partnerid,
              email_type: userdata.email_type,
            }),
          })
        if (partnerwelcomeError) {
          setProcessing(false)
          return { success: false, error: partnerwelcomeError, data: null }
        }

        setUser(partnerwelcome.user)
        setPartners(partnerwelcome.partners)
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
        // setTmpUserUUID(null)
        const categories = await getCategories(process.env.NEXT_PUBLIC_APIKEY)
        const serverSession = {
          status: setpassword?.user?.uuid ? "authenticated" : "unauthenticated",
          User: setpassword,
        }
        app.setStoreStates(serverSession, categories)
        console.log({ serverSession })
        console.log({ categories })
        return
        if (userdata.type === "existing" || userdata.type === "new")
          // router.push(PageRoutes.login)
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
        setPartner(User.partner)
        setPartnerID(User.partner.uuid)
        setUser(User.user)
        router.push(`/onboarding/verify/${User.user.uuid}/new`)
        break
      case "category":
        const formDataCategory = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataCategory.append([field][i], d)
            )
          } else {
            formDataCategory.append(field, userdata[field])
          }
        }
        const responseCategory = await register(
          `${apiURL}/v1/auth/register/category`,
          formDataCategory
        )
        if (!responseCategory) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: categoryError, data: categoryData } = responseCategory
        if (categoryError) {
          return { success: false, error: categoryError, data: null }
        }
        setCurrentCategory(categoryData.category, categoryData.partner)
        updatePartner(categoryData.partner)
        setUpdateStatus("category", true)
        break
      case "companydetail":
        const formDataCompanydetail = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataCompanydetail.append([field][i], d)
            )
          } else {
            formDataCompanydetail.append(field, userdata[field])
          }
        }
        formDataCompanydetail.append("_method", "PUT")

        const responseCompanydetail = await register(
          `${apiURL}/v1/auth/register/companydetail`,
          formDataCompanydetail
        )
        if (!responseCompanydetail) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: companydetailError, data: companydetail } =
          responseCompanydetail
        if (companydetailError) {
          return { success: false, error: companydetailError, data: null }
        }
        updatePartner(companydetail.partner)
        console.log("companydetail", { category })
        setUpdateStatus("companydetail", true)
        break
      case "compliance":
        const formDataCompliance = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataCompliance.append([field][i], d)
            )
          } else {
            formDataCompliance.append(field, userdata[field])
          }
        }
        formDataCompliance.append("_method", "PUT")

        const responseCompliance = await register(
          `${apiURL}/v1/auth/register/compliance`,
          formDataCompliance
        )
        if (!responseCompliance) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: complianceError, data: compliance } = responseCompliance
        if (complianceError) {
          return { success: false, error: complianceError, data: null }
        }
        updatePartner(compliance.partner)
        setUpdateStatus("compliance", true)
        break

      case "ncclicense":
        const formDataNcclicense = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataNcclicense.append([field][i], d)
            )
          } else {
            formDataNcclicense.append(field, userdata[field])
          }
        }
        formDataNcclicense.append("_method", "PUT")

        const responseNcclicense = await register(
          `${apiURL}/v1/auth/register/ncclicense`,
          formDataNcclicense
        )
        if (!responseNcclicense) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: ncclicenseError, data: ncclicense } = responseNcclicense
        if (ncclicenseError) {
          return { success: false, error: ncclicenseError, data: null }
        }
        updatePartner(ncclicense.partner)
        setUpdateStatus("ncclicense", true)
        break
      case "nlrclicense":
        const formDataNlrclicense = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataNlrclicense.append([field][i], d)
            )
          } else {
            formDataNlrclicense.append(field, userdata[field])
          }
        }
        formDataNlrclicense.append("_method", "PUT")

        const responseNlrclicense = await register(
          `${apiURL}/v1/auth/register/nlrclicense`,
          formDataNlrclicense
        )
        if (!responseNlrclicense) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: nlrclicenseError, data: nlrclicense } =
          responseNlrclicense
        if (nlrclicenseError) {
          return { success: false, error: nlrclicenseError, data: null }
        }
        updatePartner(nlrclicense.partner)
        setUpdateStatus("nlrclicense", true)
        break
      case "shortcode":
        userdata["_method"] = "PUT"
        const responseShortcode = await Axios.post(
          `${apiURL}/v1/auth/register/shortcode`,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!responseShortcode) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: shortcodeError, data: shortcode } = responseShortcode
        if (shortcodeError) {
          return { success: false, error: shortcodeError, data: null }
        }
        // console.log({ shortcode })
        updatePartner(shortcode.partner)
        setUpdateStatus("shortcode", true)
        break
      case "indemnity":
        const formDataIndemnity = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataIndemnity.append([field][i], d)
            )
          } else {
            formDataIndemnity.append(field, userdata[field])
          }
        }
        formDataIndemnity.append("_method", "PUT")

        const responseIndemnity = await register(
          `${apiURL}/v1/auth/register/indemnity`,
          formDataIndemnity
        )
        if (!responseIndemnity) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: indemnityError, data: indemnity } = responseIndemnity
        if (indemnityError) {
          return { success: false, error: indemnityError, data: null }
        }
        updatePartner(indemnity.partner)
        setUpdateStatus("indemnity", true)
        break
      case "accountinfo":
        const formDataAccountinfo = new FormData()
        for (const field in userdata) {
          if (isArray(userdata[field])) {
            userdata[field].map((d, i) =>
              formDataAccountinfo.append([field][i], d)
            )
          } else {
            formDataAccountinfo.append(field, userdata[field])
          }
        }
        formDataAccountinfo.append("_method", "PUT")

        const responseAccountinfo = await register(
          `${apiURL}/v1/auth/register/accountinfo`,
          formDataAccountinfo
        )
        if (!responseAccountinfo) {
          return { success: false, error: "Something went wrong", data: null }
        }
        const { error: accountinfoError, data: accountinfo } =
          responseAccountinfo

        if (accountinfoError) {
          return { success: false, error: accountinfoError, data: null }
        }
        updatePartner(accountinfo.partner)
        setUpdateStatus("accountinfo", true)
        break
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
