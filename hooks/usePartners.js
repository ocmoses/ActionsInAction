import useProcessing from "@/hooks/useProcessing"
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
  const [{ setError, setSuccess }] = useErrors({})
  const actions = useStoreActions((action) => action)
  const states = useStoreState((state) => state)

  const { partner, category } = states.partners
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
        setCategory(categoryData.category)
        setPartner(categoryData.partner)
        // return { success: true, data: userdata, error: null } //!Renove
        setUpdateStatus("review", "category", true)
        return { success: true, error: null, data: categoryData }
        break
      case "companydetail":
        setProcessing(true)
        const categories = states.partners.categories
        const { error: companydetailError, data: companydetail } =
          await fetchData(`${apiURL}/v1/auth/register/companydetail`, {
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify({
              partner_uuid: userdata.partner_uuid,
              category_uuid: userdata.category_uuid,
              company_name: userdata.company_name,
              country: userdata.country,
              company_address: userdata.company_address,
              company_city: userdata.company_city,
              company_state: userdata.company_state,
              company_postcode: userdata.company_postcode,
            }),
          })
        if (companydetailError) {
          setProcessing(false)
          return { success: false, error: companydetailError, data: null }
        }
        updatePartner(companydetail.partner)
        setUpdateStatus("review", "companydetail", true)
        return { success: true, error: null, data: null }
        break
      case "compliance":
        setProcessing(true)
        const {
          success: complianceSuccess,
          error: complianceError,
          data: compliance,
        } = await fetchData(`${apiURL}/v1/auth/register/compliance`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            partner_uuid: userdata.partner_uuid,
            category_uuid: userdata.category_uuid,
            rc_no: userdata.rc_no ?? "",
            tin_no: userdata.tin_no ?? "",
            tin_doc: userdata.tin_doc ?? "",
            memart_doc: userdata.memart_doc ?? "",
            cac_doc: userdata.cac_doc ?? "",
          }),
        })
        if (complianceError) {
          setProcessing(false)
          return { success: false, error: complianceError, data: null }
        }
        updatePartner(compliance.partner)
        setUpdateStatus("review", "compliance", true)
        break
      case "ncclicense":
        setProcessing(true)
        const {
          success: ncclicenseSuccess,
          error: ncclicenseError,
          data: ncclicense,
        } = await fetchData(`${apiURL}/v1/auth/register/ncclicense`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            partner_uuid: userdata.partner_uuid,
            category_uuid: userdata.category_uuid,
            vas_license_id: userdata.vas_license_id ?? "",
            ncc_issue_date: userdata.ncc_issue_date ?? "",
            ncc_expiry_date: userdata.ncc_expiry_date ?? "",
            ncc_doc: userdata.ncc_doc ?? "",
          }),
        })

        if (ncclicenseError) {
          setProcessing(false)
          return { success: false, error: ncclicenseError, data: null }
        }
        updatePartner(ncclicense.partner)
        setUpdateStatus("review", "ncclicense", true)
        break
      case "nlrclicense":
        setProcessing(true)
        const {
          success: nlrclicenseSuccess,
          error: nlrclicenseError,
          data: nlrclicense,
        } = await fetchData(`${apiURL}/v1/auth/register/nlrclicense`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            partner_uuid: userdata.partner_uuid,
            category_uuid: userdata.category_uuid,
            nlrc_license_id: userdata.nlrc_license_id ?? "",
            nlrc_issue_date: userdata.nlrc_issue_date ?? "",
            nlrc_expiry_date: userdata.nlrc_expiry_date ?? "",
            nlrc_doc: userdata.nlrc_doc ?? "",
          }),
        })
        if (nlrclicenseError) {
          setProcessing(false)
          return { success: false, error: nlrclicenseError, data: null }
        }
        updatePartner(nlrclicense.partner)
        setUpdateStatus("review", "nlrclicense", true)
        break
      case "shortcode":
        setProcessing(true)
        const {
          success: shortcodeSuccess,
          error: shortcodeError,
          data: shortcode,
        } = await fetchData(`${apiURL}/v1/auth/register/shortcode`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            partner_uuid: userdata.partner_uuid,
            category_uuid: userdata.category_uuid,
            shortcode: userdata.shortcode ?? "",
            shortcode_issue_date: userdata.shortcode_issue_date ?? "",
            shortcode_expiry_date: userdata.shortcode_expiry_date ?? "",
            shortcode_price_issue_date:
              userdata.shortcode_price_issue_date ?? "",
            shortcode_price_expiry_date:
              userdata.shortcode_price_expiry_date ?? "",
            shortcode_doc: userdata.shortcode_doc ?? "",
            shortcode_approval_doc: userdata.shortcode_approval_doc ?? "",
          }),
        })
        // if (shortcodeError) {
        //   setProcessing(false)
        //   return { success: false, error: shortcodeError, data: null }
        // }
        updatePartner(userdata)
        setUpdateStatus("review", "shortcode", true)
        break
      case "indemnity":
        setProcessing(true)
        const {
          success: indemnitySuccess,
          error: indemnityError,
          data: indemnity,
        } = await fetchData(`${apiURL}/v1/auth/register/indemnity`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            partner_uuid: userdata.partner_uuid,
            category_uuid: userdata.category_uuid,
            indemnity_no: userdata.indemnity_no ?? "",
            indemnity_issue_date: userdata.indemnity_issue_date ?? "",
            indemnity_expiry_date: userdata.indemnity_expiry_date ?? "",
            indemnity_doc: userdata.indemnity_doc ?? "",
          }),
        })
        if (indemnityError) {
          setProcessing(false)
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
          method: "PUT",
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
