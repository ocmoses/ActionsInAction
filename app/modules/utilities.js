import CryptoJS from "crypto-js"
import { setCookie } from "cookies-next"
import moment from "moment"
import { NextEndPoints } from "./endpoints"
import {
  categoryCombination,
  complianceRequirements,
  approvalFields,
  fieldCounts,
  stages,
  departments,
} from "@/app/modules/constants"
import Image from "next/image"

export const Decrypt = (data) => {
  const decrypted = CryptoJS.AES.decrypt(
    data,
    CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTKEY}`),
    {
      iv: CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTIV}`),
      mode: CryptoJS.mode.CBC,
    }
  )
  return CryptoJS.enc.Utf8.stringify(decrypted).toString()
}
export const Encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(
    data,
    CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTKEY}`),
    {
      iv: CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTIV}`),
      mode: CryptoJS.mode.CBC,
    }
  )
  return encrypted.toString()
}
export function EncryptObject(data) {
  if (!data || !isObject(data)) return data
  const newObj = {}
  for (const key in data) {
    if (isString(data[key])) newObj[key] = Encrypt(data[key])
    else newObj[key] = data[key]
  }
  return newObj
}
export function DecryptObject(data) {
  if (!data || !isObject(data)) return data
  const newObj = {}
  for (const key in data) {
    if (isString(data[key])) newObj[key] = Decrypt(data[key])
    else newObj[key] = data[key]
  }
  return newObj
}
export function outputDate(date) {
  if (!date) return ""
  var d = new Date(date)

  return d.toLocaleDateString("en-NG")
}
export function inputDate(date) {
  if (!date) return ""
  const d = new Date(date)
  return (
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2)
  )
}
export const getValidityTerm = (validity) => {
  if (validity) {
    const Validity = validity.split(" ")
    const period = parseInt(Validity[0])
    const unit = Validity[1]?.trim() ?? "years"
    let term = "years"
    switch (unit.toLowerCase()) {
      case "y":
      case "year":
      case "years":
      case "yr":
      case "yrs":
        term = "years"
        break
      case "q":
      case "quarter":
      case "quarters":
      case "qtr":
      case "qtrs":
        term = "quarters"
        break
      case "m":
      case "month":
      case "months":
      case "mth":
      case "mths":
        term = "months"
        break
      case "d":
      case "day":
      case "days":
      case "dy":
      case "dys":
        term = "days"
        break
      case "w":
      case "week":
      case "weeks":
      case "wk":
      case "wks":
        term = "weeks"
        break
      case "h":
      case "hour":
      case "hours":
      case "hr":
      case "hrs":
        term = "hours"
        break
      case "min":
      case "minute":
      case "minutes":
      case "mn":
      case "mns":
        term = "minutes"
        break
      case "s":
      case "second":
      case "seconds":
      case "sec":
      case "secs":
        term = "seconds"
        break
    }
    return { period, term }
  }
  return null
}
export const validateExpiryDate = (issue_date, expiry_date, validity) => {
  const today = moment().format("YYYY-MM-DD")
  if (moment(issue_date).isSameOrAfter(today))
    return "Issue date entry cannot be today or later"
  if (moment(expiry_date).isSameOrBefore(today))
    return "Expiry date entry cannot be today or earlier"
  if (moment(issue_date).isSameOrAfter(expiry_date))
    return "Expiry date cannot be earlier than or equal to issue date"
  if (validity) {
    const { period, term } = getValidityTerm(validity)
    if (period) {
      const expected_end_date = moment(issue_date)
        .add(period, term)
        .format("YYYY MM DD")

      if (moment(expiry_date).isAfter(expected_end_date))
        return (
          "Expiry date cannot be beyond " +
          moment(expected_end_date).format("DD/MM/YYYY")
        )
    }
  }
  return null
}
export const getValidityRange = (validity) => {
  const today = moment().format("YYYY-MM-DD")
  if (validity) {
    const { period, term } = getValidityTerm(validity)
    if (period) {
      const min_start_date = moment(today)
        .subtract(period, term)
        .format("YYYY MM DD")

      const max_end_date = moment(today).add(period, term).format("YYYY MM DD")
      var Yesterday = new Date()
      var Today = new Date()
      var Tomorrow = new Date()
      Yesterday.setDate(Yesterday.getDate() - 1)
      Today.setDate(Today.getDate())
      Tomorrow.setDate(Tomorrow.getDate() + 1)
      return {
        min_start_date,
        max_end_date,
        yesterday: Yesterday,
        today: Today,
        tomorrow: Tomorrow,
      }
    }
  }
  return null
}
export async function proxyFetch(url, options) {
  try {
    const response = await fetch("/api/fetch", {
      method: "POST",
      body: JSON.stringify({
        url, // '/v1/categories',
        options, //: { method: 'GET' }
      }),
    })
    const { success, error, data } = await response.json()
    return { success, error, data }
  } catch (err) {
    return { success: null, error: err.message, data: null }
  }
}
export const isArray = (data) => {
  return Array.isArray(data)
}
export const isObject = (data) => {
  return typeof data === "object" && data !== null && !Array.isArray(data)
}
export const isString = (data) => {
  return typeof data === "string"
}
export const isNumber = (data) => {
  return typeof data === "number"
}
export const isBoolean = (data) => {
  return typeof data === "boolean"
}
export const Util = {
  get_time: (date) => {
    return new Date(date).toLocaleTimeString()
  },
  isEmpty: (obj) => {
    if (!obj || typeof obj === "undefined") return true
    return Object.keys(obj).length === 0
  },
  obscureEmail: (email) => {
    var splitEmail = email.split("@")
    var domain = splitEmail[1]
    var name = splitEmail[0]
    const ln = Math.floor(name.length / 3)
    let ast = ""
    for (let i = 0; i < name.length - ln; i++) {
      ast += "*"
    }
    return name.substring(0, ln).concat(ast).concat("@").concat(domain)
  },
  validateEmail: (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  },
}
export const scrollToTop = (id) => {
  var element = document.getElementById(id ?? "partnerdashboard")
  if (element) element.scrollIntoView({ behavior: "smooth" })
}
export async function logout() {
  const response = await fetch(NextEndPoints.LOGOUT)
  await response.json()
  return { success: true }
}
export async function logoutAdmin() {
  const response = await fetch(NextEndPoints.LOGOUT_ADMIN)
  await response.json()
  return { success: true }
}
export function userData(data, partnerID, categories) {
  if (data?.partners?.length > 0) {
    data?.partners.map((p) => {
      p = filterPartner(p, categories)
    })
    if (!data?.partner && data?.partners?.length > 0) {
      if (partnerID) {
        const Partner = data.partners.find((p) => p.uuid === partnerID)
        if (!Util.isEmpty(Partner)) data.partner = { ...Partner }
      } else {
        data.partner = { ...data.partners[0] }
      }
    }
  }
  delete data.login_token
  return {
    partnerID,
    ...data,
  }
}
export const set_admin_token = (token, uuid, req, res) => {
  if (!token || !uuid) return null
  // console.log({ token })
  const maxAge = 60 * 60 * 24
  if (token) {
    // SET COOKIES
    // const encryptedAuthToken = Encrypt(token)
    // const encryptedUserId = Encrypt(uuid)
    // const decryptedAuthToken = Decrypt(encryptedAuthToken)
    const encryptedAuthToken = token
    const encryptedUserId = uuid
    setCookie("token", encryptedAuthToken, {
      req,
      res,
      maxAge: maxAge ?? 60 * 60 * 24, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })

    setCookie("uuid", encryptedUserId, {
      req,
      res,
      maxAge: maxAge ?? 60 * 60 * 24, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })
    return encryptedAuthToken
  }
  return null
}
export const createHttpOnlyCookie = (data, req, res, partnerID, categories) => {
  const authToken = data?.login_token?.access_token
  // const maxAge = data?.login_token?.expires_in
  const maxAge = 60 * 60 * 24
  const User = userData(data, partnerID, categories)
  // console.log({ User })
  if (authToken) {
    // SET COOKIES
    const encryptedAuthToken = Encrypt(authToken)

    const encryptedUserId = Encrypt(`${User.user.uuid}`)
    setCookie("auth-token", encryptedAuthToken, {
      req,
      res,
      maxAge: maxAge ?? 60 * 60 * 24, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })

    setCookie("user_id", encryptedUserId, {
      req,
      res,
      maxAge: maxAge ?? 60 * 60 * 24, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })
  }
  return { User, authToken }
}
export const getPath = (segments) => {
  if (!segments) return null
  const segment = segments.filter((seg) => !seg.includes("("))
  return segment.reverse().join("/")
}
export const sanitizeSegments = (segments) => {
  if (!segments) return null
  return segments.filter((seg) => !seg.includes("("))
}
export const getInitials = (fullname) => {
  if (!fullname) return ""
  const Names = fullname.split(" ")
  const firstName = Names[0] ?? ""
  const lastName = Names[1] ?? ""
  const initials = `${firstName ? firstName[0] : ""}${
    lastName ? lastName[0] : ""
  }`
  return initials
}
export const getPartnerInitials = (company_name) => {
  if (!company_name) return ""
  const Names = company_name.split(" ")
  const firstName = Names[0] ?? ""
  return `${firstName ? firstName[0] : ""}`
}
export const getFileSize = (size) => {
  if (size < 1024) return { size, unit: "kb" }
  if (size >= 1024 && size < 1024 * 1024)
    return { size: size / 1024, unit: "mb" }
  if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024)
    return { size: size / 1024 / 1024, unit: "gb" }
  if (size >= 1024 * 1024 * 1024 && size < 1024 * 1024 * 1024 * 1024)
    return { size: size / 1024 / 1024 / 1024, unit: "tb" }
}
export const getFileSizeText = (size) => {
  if (size < 1024) return `${Math.ceil(size * 100) / 100}B`
  if (size < 1024 * 1024) return `${Math.ceil((size / 1024) * 100) / 100}KB`
  if (size < 1024 * 1024 * 1024)
    return `${Math.ceil((size / 1024 / 1024) * 100) / 100}MB`
  if (size < 1024 * 1024 * 1024 * 1024)
    return `${Math.ceil((size / 1024 / 1024 / 1024) * 100) / 100}GB`
  if (size < 1024 * 1024 * 1024 * 1024 * 1024)
    return `${Math.ceil((size / 1024 / 1024 / 1024 / 1024) * 100) / 100}TB`
}
export const getNextStage = (category, partner) => {
  if (!category?.profile_stage) return { nextstage: null }
  if (!category?.validation) return { nextstage: null }
  const progress = category.profile_stage
  const validation = category.validation
  let nextstage = null
  const Stages = stages
  const filled = []
  const required = []
  Stages.map((stage) => {
    if (
      validation[stage] &&
      (validation[stage] == "r" || validation[stage] == "o")
    ) {
      required.push(stage)
      if (
        partner?.master &&
        partner.master.profile_stage[stage] &&
        parseInt(partner.master.profile_stage[stage]) === 1
      ) {
        if (!filled.includes(stage)) filled.push(stage)
      } else if (progress[stage] && parseInt(progress[stage]) === 1) {
        if (!filled.includes(stage)) filled.push(stage)
      }
    }
  })
  if (filled.length === 0) {
    nextstage = "compliance"
  } else {
    required.map((stage) => {
      if (!nextstage && !filled.includes(stage)) {
        nextstage = stage
      }
    })
  }
  if (!nextstage) nextstage = "review"

  return { nextstage }
}
export const AllowedCategories = (category_codes) => {
  const combi = categoryCombination.filter((srv) =>
    category_codes?.every((r) => srv.includes(r))
  )
  const Combination = []
  combi.map((c) => {
    Combination.push(...c)
  })
  const possible = [...new Set(Combination)]
  return possible.filter((p) => !category_codes?.includes(p))
}
export const getApprovalStages = (partner) => {
  if (!partner) return
  const status = {}
  if (partner.categories?.length > 0) {
    partner.categories?.map((category) => {
      if (category) {
        const cuuid = category.category_uuid
        // console.log({ cuuid })
        status[cuuid] = {
          approved: 0,
          rejected: 0,
          count: 0,
          status: "pending",
        }
        for (const stage in complianceRequirements) {
          if (!status[cuuid][stage])
            status[cuuid][stage] = {
              approved: 0,
              rejected: 0,
              count: 0,
              status: "pending",
            }
          for (const field in complianceRequirements[stage]) {
            if (partner.approvalStages[cuuid])
              if (
                field in approvalFields &&
                approvalFields[field].approval &&
                cuuid in partner.approvalStages &&
                stage in partner.approvalStages[cuuid]
              ) {
                for (const _dept in partner.approvalStages[cuuid][stage]) {
                  if (!status[cuuid][stage][_dept])
                    status[cuuid][stage][_dept] = {
                      approved: 0,
                      rejected: 0,
                      count: 0,
                      status: "pending",
                    }
                  if (
                    partner.approvalStages[cuuid] &&
                    partner.approvalStages[cuuid][stage] &&
                    _dept in partner.approvalStages[cuuid][stage]
                  ) {
                    status[cuuid].count++
                    status[cuuid][stage].count++
                    status[cuuid][stage][_dept].count++

                    if (field in partner.approvalStages[cuuid][stage][_dept]) {
                      if (
                        partner.approvalStages[cuuid][stage][_dept][field] ===
                        "rejected"
                      ) {
                        status[cuuid].rejected++
                        status[cuuid][stage].rejected++
                        status[cuuid][stage][_dept].rejected++
                      }
                      if (
                        partner.approvalStages[cuuid][stage][_dept][field] ===
                        "approved"
                      ) {
                        status[cuuid].approved++
                        status[cuuid][stage].approved++
                        status[cuuid][stage][_dept].approved++
                      }
                    }
                  }

                  // CUUID
                  if (
                    status[cuuid].approved === 0 &&
                    status[cuuid].rejected === 0
                  )
                    status[cuuid].status = "pending"
                  if (
                    (status[cuuid].approved > 0 ||
                      status[cuuid].rejected > 0) &&
                    status[cuuid].rejected === 0
                  )
                    status[cuuid].status = "processing"

                  if (status[cuuid].approved === status[cuuid].count)
                    status[cuuid].status = "approved"

                  if (status[cuuid].rejected > 0)
                    status[cuuid].status = "rejected"

                  // STAGE
                  if (
                    status[cuuid][stage].approved === 0 &&
                    status[cuuid][stage].rejected === 0
                  )
                    status[cuuid][stage].status = "pending"
                  if (
                    (status[cuuid][stage].approved > 0 ||
                      status[cuuid][stage].rejected > 0) &&
                    status[cuuid][stage].rejected === 0
                  )
                    status[cuuid][stage].status = "processing"

                  if (
                    status[cuuid][stage].approved === status[cuuid][stage].count
                  )
                    status[cuuid][stage].status = "approved"

                  if (status[cuuid][stage].rejected > 0)
                    status[cuuid][stage].status = "rejected"
                  // DEPT
                  if (
                    status[cuuid][stage][_dept].approved === 0 &&
                    status[cuuid][stage][_dept].rejected === 0
                  )
                    status[cuuid][stage][_dept].status = "pending"
                  if (
                    (status[cuuid][stage][_dept].approved > 0 ||
                      status[cuuid][stage][_dept].rejected > 0) &&
                    status[cuuid][stage][_dept].rejected === 0
                  )
                    status[cuuid][stage][_dept].status = "processing"

                  if (
                    status[cuuid][stage][_dept].approved ===
                    status[cuuid][stage][_dept].count
                  )
                    status[cuuid][stage][_dept].status = "approved"

                  if (status[cuuid][stage][_dept].rejected > 0)
                    status[cuuid][stage][_dept].status = "rejected"
                }
              }
          }
        }
      }
    })
  }
  // console.log({ fieldCounts })
  // console.log({ status: JSON.stringify(status) })
  return status
}

export const filterPartner = (partnerInfo, Categories) => {
  if (partnerInfo) {
    const categories = Categories?.data ? Categories?.data : Categories
    const partnercategories = partnerInfo?.categories?.sort((s1, s2) =>
      s1.id < s2.id ? -1 : s1.id > s2.id ? 1 : 0
    )
    if (!(categories?.length > 0)) return partnerInfo
    const registeredCategories = []
    const sections = {}
    let masterset = false
    let edittable = false
    partnerInfo.master = null
    partnerInfo.approvalStages = {}
    partnerInfo.approvalCount = {}
    partnerInfo.statuscounts = {
      approved: 0,
      rejected: 0,
      pending: 0,
    }
    const PartnerCategories = []
    if (partnercategories) {
      if (partnercategories?.length > 0) {
        partnercategories?.map((category, index) => {
          if (category) {
            const sysCategory = categories?.find(
              (c) => c.uuid === category.category_uuid
            )
            category.position = index + 1
            if (category.status === "open") edittable = true
            if (sysCategory) {
              category.category_name = sysCategory.category_name
              category.category_code = sysCategory.category_code
              category.icon = sysCategory.icon
              category.validation = sysCategory.validation
              registeredCategories.push(sysCategory.category_code)
            }
            const validation = category.validation
            sections[category.category_uuid] = {
              status: category.status,
              status_date: category.status_date,
            }
            // Build master category
            for (const section in complianceRequirements) {
              if (validation && validation[section]) {
                if (
                  validation[section] === "r" ||
                  validation[section] === "o"
                ) {
                  for (const key in complianceRequirements[section]) {
                    if (
                      typeof sections[category.category_uuid][section] ===
                      "undefined"
                    ) {
                      sections[category.category_uuid][section] = {
                        fields: {},
                        status: null,
                        completed: false,
                      }
                    }
                    if (section === "shortcode")
                      sections[category.category_uuid][section].fields[
                        "shortcodes"
                      ] = category["shortcodes"]

                    sections[category.category_uuid][section].fields[key] =
                      category[key]
                  }
                  sections[category.category_uuid][section].completed =
                    category.profile_stage[section] === "1"
                  sections[category.category_uuid][section].status =
                    validation[section]
                }
              }
            }

            // APPROVALS
            const approvals = category.compliance_approvals
            const cuuid = category.category_uuid
            if (approvals?.length > 0) {
              approvals.map((approval) => {
                if (approval?.admin_department) {
                  const dept = approval?.admin_department
                  if (!partnerInfo.approvalStages[cuuid])
                    partnerInfo.approvalStages[cuuid] = {}

                  if (
                    !partnerInfo.approvalStages[cuuid][approval?.category_stage]
                  )
                    partnerInfo.approvalStages[cuuid][
                      approval?.category_stage
                    ] = {}

                  if (
                    !partnerInfo.approvalStages[cuuid][
                      approval?.category_stage
                    ][dept]
                  )
                    partnerInfo.approvalStages[cuuid][approval?.category_stage][
                      dept
                    ] = {}
                  partnerInfo.approvalStages[cuuid][approval?.category_stage][
                    dept
                  ][approval?.field] = approval?.status

                  if (approval?.status === "rejected") {
                    if (
                      !partnerInfo.approvalStages[cuuid][
                        approval?.category_stage
                      ][dept].rejections
                    )
                      partnerInfo.approvalStages[cuuid][
                        approval?.category_stage
                      ][dept].rejections = {}
                    if (
                      !partnerInfo.approvalStages[cuuid][
                        approval?.category_stage
                      ][dept].rejections[approval?.field]
                    )
                      partnerInfo.approvalStages[cuuid][
                        approval?.category_stage
                      ][dept].rejections[approval?.field] = []
                    partnerInfo.approvalStages[cuuid][approval?.category_stage][
                      dept
                    ].rejections[approval?.field].push(approval?.feedback)
                  }
                  if (!partnerInfo.approvalCount[approval?.category_stage]) {
                    partnerInfo.approvalCount[approval?.category_stage] = {
                      approved: 0,
                      rejected: 0,
                      pending: 0,
                    }
                    if (approval?.status === "approved") {
                      partnerInfo.approvalCount[approval?.category_stage]
                        .approved++
                      partnerInfo.statuscounts.approved++
                    } else if (approval?.status === "rejected") {
                      partnerInfo.approvalCount[approval?.category_stage]
                        .rejected++
                      partnerInfo.statuscounts.rejected++
                    } else {
                      partnerInfo.approvalCount[approval?.category_stage]
                        .pending++
                      partnerInfo.statuscounts.pending++
                    }
                  }
                }
              })
            }

            // END APPROVALS]

            if (!masterset && category.status !== "open") {
              sections[category.category_uuid].master = true
              category.master = true
              partnerInfo.master = category
              masterset = true
            }
          }
          PartnerCategories.push(category)
        })
        partnerInfo.categories = PartnerCategories
        partnerInfo?.categories?.map((category) => {
          if (category) {
            if (
              partnerInfo.master &&
              category.category_uuid !== partnerInfo.master.category_uuid
            ) {
              const profile_stage = {
                ...category.profile_stage,
              }
              for (const pstage in partnerInfo.master.profile_stage) {
                if (partnerInfo.master.profile_stage[pstage])
                  profile_stage[pstage] =
                    partnerInfo.master.profile_stage[pstage]
              }
              category.profile_stage = profile_stage
            }
          }
        })
      }
      partnerInfo.sections = sections
      partnerInfo.edittable = edittable
      partnerInfo.allowedCategories = AllowedCategories(registeredCategories)
      partnerInfo.compliance_status = getApprovalStages(partnerInfo)
    }
  }
  return partnerInfo
}
export const filterCategory = (category, partnerInfo) => {
  if (!category) return category
  if (!partnerInfo) return category
  // return category
  const validations = []
  for (const validation in category.validation) {
    if (
      category.validation[validation] === "r" ||
      category.validation[validation] === "o"
    )
      validations.push(validation)
  }
  if (
    partnerInfo?.master &&
    partnerInfo?.master?.category_uuid !== category.category_uuid
  ) {
    const completed = {}
    const sections = partnerInfo.sections
    for (const cuuid in sections) {
      for (const section in sections[cuuid]) {
        if (
          cuuid !== category.category_uuid &&
          validations.includes(section) &&
          sections[cuuid][section].completed
        )
          completed[section] = sections[cuuid][section].fields
      }
    }
    if (!Util.isEmpty(completed)) {
      for (const section in completed) {
        for (const field in completed[section]) {
          category[field] = completed[section][field]
        }
      }
    }
  }

  const approvals = category.compliance_approvals
  const feedbacks = category.compliance_feedbacks
  category.approvedFields = {}
  category.approvedStages = {}
  if (approvals?.length > 0) {
    approvals.map((approval) => {
      if (approval?.admin_department) {
        if (!category.approvedFields[category.category_uuid])
          category.approvedFields[category.category_uuid] = {}

        if (
          !category.approvedFields[category.category_uuid][
            approval?.admin_department
          ]
        )
          category.approvedFields[category.category_uuid][
            approval?.admin_department
          ] = {}
        category.approvedFields[category.category_uuid][
          approval?.admin_department
        ][approval?.field] = approval?.status

        if (!category.approvedStages[category.category_uuid])
          category.approvedStages[category.category_uuid] = {}
        if (
          !category.approvedStages[category.category_uuid][
            approval?.category_stage
          ]
        )
          category.approvedStages[category.category_uuid][
            approval?.category_stage
          ] = {}
        category.approvedStages[category.category_uuid][
          approval?.category_stage
        ][approval?.field] = approval?.status
      }
    })
  }
  category.feedbacks = {}
  if (feedbacks?.length > 0) {
    feedbacks.map((feedback) => {
      if (!category.feedbacks[feedback?.category_stage])
        category.feedbacks[feedback?.category_stage] = []
      category.feedbacks[feedback?.category_stage].push(feedback)
    })
  }
  return category
}
export const getStatuses = (status, counts) => {
  let bg =
    status === "approved"
      ? "bg-[#18291F]"
      : status === "processing" || status === "corrected"
      ? "bg-[#2D200A]"
      : status === "rejected"
      ? "bg-[#361513]"
      : "bg-white/10"
  let textcolor =
    status === "approved"
      ? "text-[#97CDAD]"
      : status === "processing" || status === "corrected"
      ? "text-[#F9D89A]"
      : status === "rejected"
      ? "text-[#FF9897]"
      : "text-white"
  let iconcolor =
    status === "approved"
      ? "text-[#2C9958]"
      : status === "processing" || status === "corrected"
      ? "text-[#F3AF33]"
      : status === "rejected"
      ? "text-[#FE2E2D]"
      : "text-[#999999]"
  let icon =
    status === "approved" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[12px] h-[12px]"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ) : status === "processing" || status === "corrected" ? (
      <Image src="/assets/icons/processing.svg" width={12} height={12} alt="" />
    ) : status === "rejected" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[12px] h-[12px]"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[12px] h-[12px]"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
          clipRule="evenodd"
        />
      </svg>
    )
  // let currected = counts?.corrected > 0
  let text =
    status === "approved"
      ? "Approved"
      : status === "processing"
      ? "In review"
      : status === "rejected"
      ? `${counts?.rejected} ${counts?.rejected > 1 ? "issues" : "issue"}`
      : status === "corrected"
      ? `${counts?.corrected} ${counts?.corrected > 1 ? "actions" : "action"}`
      : "Pending"

  return { bg, textcolor, iconcolor, icon, text }
}
export const partnerApprovals = (partner, category) => {
  const Approvals = partner?.approvalStages[category.category_uuid]
  let stageApprovals = {}
  let stageFields = {}
  console.log({ Approvals })
  stages.map((stage) => {
    stageApprovals[stage] =
      Approvals && Approvals[stage] ? Approvals[stage] : {}
    stageFields[stage] =
      fieldCounts && fieldCounts[stage] ? fieldCounts[stage] : {}
    if (stage === "shortcodex") {
      let Fields = {}
      category?.shortcodes?.map((shortcode) => {
        for (const dpt in stageFields[stage]) {
          if (dpt !== "count") {
            if (!Fields[dpt]) Fields[dpt] = []
            // console.log({ "stageFields[stage][dpt]": stageFields[stage][dpt] })
            if (stageFields[stage][dpt]?.fields) {
              stageFields[stage][dpt].fields.map((f) => {
                // console.log({ f })
                // console.log({
                //   "`${f}-${shortcode.uuid}`": `${f}-${shortcode.uuid}`,
                // })
                if (!f.split("-")?.length === 1)
                  Fields[dpt].push(`${f}-${shortcode.uuid}`)
              })
              // stageFields[stage][dpt].fields = Fields[dpt]
            }
          }
        }
        // console.log({ Fields })
      })

      for (const _dpt in stageFields[stage]) {
        if (_dpt !== "count") {
          // stageFields[stage][_dpt].fields = Fields[_dpt]

          // console.log({ _dpt, "Fields[_dpt]": Fields[_dpt] })
          stageFields[stage][_dpt].fields =
            Fields[_dpt] && Fields[_dpt].length > 0 ? [...Fields[_dpt]] : []
          // console.log({
          //   _dpt,
          //   "stageFields[stage][_dpt].fields": stageFields[stage][_dpt].fields,
          // })
        }
      }
    }
  })
  // console.log({ stageFields: stageFields })
  // console.log({ category })
  const StageApprovals = {}
  if (!Util.isEmpty(stageFields)) {
    for (const _stage in stageFields) {
      if (!StageApprovals[_stage])
        StageApprovals[_stage] = {
          counts: {
            pending: 0,
            approved: 0,
            rejected: 0,
            corrected: 0,
            count: 0,
          },
        }

      for (const _dept in stageFields[_stage]) {
        if (stageFields[_stage][_dept]?.fields?.length > 0) {
          stageFields[_stage][_dept].fields.map((field) => {
            if (!StageApprovals[_stage][_dept])
              StageApprovals[_stage][_dept] = {
                counts: {
                  pending: 0,
                  approved: 0,
                  rejected: 0,
                  rejections: [],
                  corrected: 0,
                  count: 0,
                },
              }
            if (
              Approvals &&
              _stage in Approvals &&
              Approvals[_stage] &&
              _dept in Approvals[_stage] &&
              Approvals[_stage][_dept] &&
              field in Approvals[_stage][_dept]
            ) {
              // console.log({
              //   StageApprovalsStageApprovals: StageApprovals[_stage],
              // })
              StageApprovals[_stage][_dept][field] =
                Approvals[_stage][_dept][field]

              // console.log({
              //   "fieldapproval: Approvals[_stage][_dept][field]":
              //     Approvals[_stage][_dept][field],
              // })
              switch (Approvals[_stage][_dept][field]) {
                case "approved":
                  StageApprovals[_stage].counts.approved++
                  StageApprovals[_stage][_dept].counts.approved++
                  break
                case "rejected":
                  StageApprovals[_stage].counts.rejected++
                  StageApprovals[_stage][_dept].counts.rejected++
                  // StageApprovals[_stage][_dept].rejections[field].push()
                  break
                case "corrected":
                  StageApprovals[_stage].counts.corrected++
                  StageApprovals[_stage][_dept].counts.corrected++
                  break
              }
            } else {
              StageApprovals[_stage][_dept][field] = "pending"
              StageApprovals[_stage].counts.pending++
              StageApprovals[_stage][_dept].counts.pending++
            }
            StageApprovals[_stage].counts.count++
            StageApprovals[_stage][_dept].counts.count++
          })
          if (
            StageApprovals[_stage][_dept]?.counts?.approved ===
            StageApprovals[_stage][_dept]?.counts?.count
          )
            StageApprovals[_stage][_dept].counts.status = "approved"
          else if (
            StageApprovals[_stage][_dept]?.counts?.pending ===
            StageApprovals[_stage][_dept]?.counts?.count
          )
            StageApprovals[_stage][_dept].counts.status = "pending"
          else if (
            StageApprovals[_stage][_dept]?.counts?.rejected ===
              StageApprovals[_stage][_dept]?.counts?.count ||
            StageApprovals[_stage][_dept]?.counts?.rejected > 0
          )
            StageApprovals[_stage][_dept].counts.status = "rejected"
          else if (
            StageApprovals[_stage][_dept]?.counts?.corrected ===
              StageApprovals[_stage][_dept]?.counts?.count ||
            StageApprovals[_stage][_dept]?.counts?.corrected > 0
          )
            StageApprovals[_stage][_dept].counts.status = "corrected"
          else StageApprovals[_stage][_dept].counts.status = "processing"
        }
      }
      if (
        StageApprovals[_stage]?.counts.approved ===
        StageApprovals[_stage]?.counts.count
      )
        StageApprovals[_stage].counts.status = "approved"
      else if (
        StageApprovals[_stage]?.counts.pending ===
        StageApprovals[_stage]?.counts.count
      )
        StageApprovals[_stage].counts.status = "pending"
      else if (
        StageApprovals[_stage]?.counts.rejected ===
          StageApprovals[_stage]?.counts.count ||
        StageApprovals[_stage]?.counts.rejected > 0
      )
        StageApprovals[_stage].counts.status = "rejected"
      else if (
        StageApprovals[_stage]?.counts.corrected ===
          StageApprovals[_stage]?.counts.count ||
        StageApprovals[_stage]?.counts.corrected > 0
      )
        StageApprovals[_stage].counts.status = "corrected"
      else StageApprovals[_stage].counts.status = "processing"
    }
  }
  return StageApprovals
}
export const getstages = (category, categories) => {
  if (!category || !categories) return
  const baseCategory = categories?.find(
    (c) => c.uuid === category.category_uuid
  )
  if (!baseCategory) return
  category.category_name = baseCategory.category_name
  category.category_code = baseCategory.category_code
  category.icon = baseCategory.icon
  category.validation = baseCategory.validation

  const filled = []
  const forms = []
  if (!stages?.length) return
  stages.map((stage) => {
    if (
      category?.profile_stage &&
      stage in category?.profile_stage &&
      category?.profile_stage[stage] === "1"
    )
      filled.push(stage)
    if (
      (typeof category?.validation !== "undefined" &&
        stage in category?.validation &&
        category?.validation[stage] === "r") ||
      category?.validation[stage] === "o"
    )
      forms.push(stage)
  })
  return { forms, filled }
}
export const ValidateField = (field, stage, data, category) => {
  const value = data[field]
  fieldRequired(field, stage, category)
  if (!value && fieldRequired(field, stage, category))
    return `${fieldName(field, stage)} is required`
}
export const fieldRequired = (field, stage, category) => {
  const categories = complianceRequirements[stage][field]?.categories
  return (
    category.category_code &&
    categories?.length > 0 &&
    categories?.includes(category.category_code)
  )
}
export const fieldName = (field, stage) => {
  return complianceRequirements[stage][field].title
}
