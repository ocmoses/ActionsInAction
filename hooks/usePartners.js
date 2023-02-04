import useProcessing from "@/hooks/useProcessing"
import useRegistration from "@/hooks/useRegistration"
import useErrors from "@/hooks/useErrors"
import RemoteEndpoints from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { proxyFetch } from "@/app/modules/utilities"
import { userData } from "@/app/modules/utilities"
import { forms } from "@/app/modules/constants"

const usePartners = () => {
  const router = useRouter()
  const { setProcessing } = useProcessing()
  const { register } = useRegistration()

  const [{ setError, setSuccess }] = useErrors({})
  const actions = useStoreActions((action) => action)
  const states = useStoreState((state) => state)

  const { category, partner } = states.partners
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
    return validated
  }
  const completeOnboarding = (category) => {
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
  const checkUpdateStatus = (type, key) => {
    if (type === "review") {
      if (reviewStatus[key]) return true
      return false
    } else {
      if (reviewUpdateStatus[key]) return true
      return false
    }
  }
  const checkRegStatus = async (partner) => {
    if (!partner?.progress) return null
    const { percent, stages, status } = partner.progress
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
        const {
          success: setpasswordSuccess,
          error: setpasswordError,
          data: setpassword,
        } = await fetchData(RemoteEndpoints.RESETPASSWORD, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            user_uuid: user.uuid,
            password: userdata.password,
            password_confirmed: userdata.password,
          }),
        })
        if (setpasswordError) {
          setProcessing(false)
          return { success: false, error: setpasswordError, data: null }
        }
        if (userdata.type === "existing" || userdata.type === "reset")
          router.push(PageRoutes.login)
        // if (userdata.type === "existing") router.push(PageRoutes.getstarted)
        else router.push(PageRoutes.dashboard)
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
        setProcessing(true)
        const { error: categoryError, data: categoryData } = await fetchData(
          `${apiURL}/v1/auth/register/category`,
          {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({
              partner_uuid: partner.uuid,
              category_uuid: userdata.category_uuid,
              user_uuid: user.uuid,
            }),
          }
        )
        if (categoryError) {
          setProcessing(false)
          return { success: false, error: categoryError, data: null }
        }
        updatePartner(categoryData.partner)
        setCategory(categoryData.category)
        // return { success: true, data: userdata, error: null } //!Renove
        setUpdateStatus("review", "category", true)
        return { success: true, error: null, data: categoryData }
        break
      case "companydetail":
        const { error: companydetailError, data: companydetail } =
          await register(`${apiURL}/v1/auth/register/companydetail`, userdata)
        if (companydetailError) {
          return { success: false, error: companydetailError, data: null }
        }
        console.log({ category })
        updatePartner(companydetail.partner)
        console.log({ category })
        setUpdateStatus("review", "companydetail", true)
        break
      case "compliance":
        const { error: complianceError, data: compliance } = await register(
          `${apiURL}/v1/auth/register/compliance`,
          userdata
        )
        if (complianceError) {
          return { success: false, error: complianceError, data: null }
        }
        updatePartner(compliance.partner)
        setUpdateStatus("review", "compliance", true)
        break

      case "ncclicense":
        const { error: ncclicenseError, data: ncclicense } = await register(
          `${apiURL}/v1/auth/register/ncclicense`,
          userdata
        )
        if (ncclicenseError) {
          return { success: false, error: ncclicenseError, data: null }
        }
        updatePartner(ncclicense.partner)
        setUpdateStatus("review", "ncclicense", true)
        break
      case "nlrclicense":
        const { error: nlrclicenseError, data: nlrclicense } = await register(
          `${apiURL}/v1/auth/register/nlrclicense`,
          userdata
        )
        if (nlrclicenseError) {
          return { success: false, error: nlrclicenseError, data: null }
        }
        updatePartner(nlrclicense.partner)
        setUpdateStatus("review", "nlrclicense", true)
        break
      case "shortcode":
        const { error: shortcodeError, data: shortcode } = await register(
          `${apiURL}/v1/auth/register/shortcode`,
          userdata
        )
        if (shortcodeError) {
          return { success: false, error: shortcodeError, data: null }
        }
        updatePartner(shortcode.partner)
        setUpdateStatus("review", "shortcode", true)
        break
      case "indemnity":
        const { error: indemnityError, data: indemnity } = await register(
          `${apiURL}/v1/auth/register/indemnity`,
          userdata
        )
        if (indemnityError) {
          return { success: false, error: indemnityError, data: null }
        }
        updatePartner(indemnity.partner)
        setUpdateStatus("review", "indemnity", true)
        break
      case "accountinfo":
        setProcessing(true)
        const {
          success: accountinfoSuccess,
          error: accountinfoError,
          data: accountinfo,
        } = await fetchData(`${apiURL}/v1/auth/register/accountinfo`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            partner_uuid: userdata.partner_uuid,
            category_uuid: userdata.category_uuid,
            account_name: userdata.account_name ?? "",
            account_no: userdata.account_no ?? "",
            bank: userdata.bank ?? "",
            audited_account_1: userdata.audited_account_1 ?? "",
            audited_account_2: userdata.audited_account_2 ?? "",
            audited_account_3: userdata.audited_account_3 ?? "",
            _method: "PUT",
          }),
        })
        if (accountinfoError) {
          setProcessing(false)
          return { success: false, error: accountinfoError, data: null }
        }
        updatePartner(accountinfo.partner)
        setUpdateStatus("review", "accountinfo", true)
        break

      case "companyinfo":
        setProcessing(true)
        const { error: companyinfoError, data: companyinfo } = await fetchData(
          `${apiURL}/v1/auth/register/companyinfo`,
          {
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify({
              partnerid: partner.partnerid,
              company_name: userdata.company_name,
              company_role: userdata.company_role,
            }),
          }
        )
        if (companyinfoError) {
          setProcessing(false)
          return { success: false, error: companyinfoError, data: null }
        }
        updatePartner(userdata)
        updatePercentComplete(companyinfo)
        setUpdateStatus("review", "companyinfo", true)
        router.push("/onboarding/register/validate")
        break

      case "confirmcompanyinfo":
        setProcessing(true)
        const {
          success: confirmcompanyinfoSuccess,
          error: confirmcompanyinfoError,
          data: confirmcompanyinfo,
        } = await fetchData(
          `${apiURL}/v1/existing-partner/confirm-companyinfo`,
          {
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify({
              partnerid: partner.partnerid,
              company_name: userdata.company_name ?? "",
              country: userdata.country ?? "",
              company_address: userdata.company_address ?? "",
              company_city: userdata.company_city ?? "",
              company_state: userdata.company_state ?? "",
              company_postcode: userdata.company_postcode ?? "",
            }),
          }
        )
        if (confirmcompanyinfoError) {
          setProcessing(false)
          return { success: false, error: confirmcompanyinfoError, data: null }
        }
        updatePartner(userdata)
        updatePercentComplete(confirmcompanyinfo)
        setUpdateStatus("updatereview", "confirmcompanyinfo", true)
        router.push("/profile/update/contactperson")
        break
      case "contactperson":
        setProcessing(true)
        const {
          success: contactpersonSuccess,
          error: contactpersonError,
          data: contactperson,
        } = await fetchData(`${apiURL}/v1/existing-partner/contact-person`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            partnerid: partner.partnerid,
            first_name: userdata.first_name ?? "",
            last_name: userdata.last_name ?? "",
            email: userdata.email ?? "",
            country: partner.country ?? "",
            countrycode: userdata.countrycode ?? "",
            telephone: userdata.telephone ?? "",
          }),
        })
        if (contactpersonError) {
          setProcessing(false)
          return { success: false, error: contactpersonError, data: null }
        }
        updatePartner(userdata)
        updatePercentComplete(contactperson)
        setUpdateStatus("updatereview", "contactperson", true)
        router.push("/profile/update/review")
        break
    }
  }
  const [reviewStatus, setReviewStatus] = useState({
    companydetail: false,
    compliance: false,
    ncclicense: false,
    nlrclicense: false,
    shortcode: false,
    indemnity: false,
    accountinfo: false,
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
  }
}
export default usePartners
