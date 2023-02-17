import CryptoJS from "crypto-js"
import { setCookie } from "cookies-next"
import moment from "moment"

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
export const validateExpiryDate = (issue_date, expiry_date, validity) => {
  console.log({ issue_date })
  console.log({ expiry_date })
  console.log({ validity })
  if (moment(issue_date).isSameOrAfter(expiry_date))
    return "Expiry date cannot be earlier than or equal to issue date"
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
    console.log({ period })
    console.log({ term })
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
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  },
}
export const scrollToTop = (id) => {
  var contentBody = document.getElementById(id ?? "partnerdashboard")
  if (contentBody) {
    contentBody.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}
export async function logout() {
  const response = await fetch("/api/users/logout")
  await response.json()
  return { success: true }
}
export function userData(data, partnerID) {
  if (!data?.partner && data?.partners?.length > 0) {
    if (partnerID) {
      const Partner = data.partners.find((p) => p.uuid === partnerID)
      if (!Util.isEmpty(Partner)) data.partner = { ...Partner }
    } else {
      data.partner = { ...data.partners[0] }
    }
  }
  // delete data.profile_status
  // delete data.percent_complete
  // delete data.profile_stage
  delete data.login_token
  return {
    // partners,
    partnerID,
    ...data,
  }
}
export const createHttpOnlyCookie = (data, req, res, partnerID) => {
  const authToken = data?.login_token?.access_token
  // const maxAge = data?.login_token?.expires_in
  const maxAge = 60 * 60 * 24
  const User = userData(data, partnerID)
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
    // if (User.partner.uuid) {
    //   const encryptedPartnerid = Encrypt(`${User.partner.uuid}`)
    //   setCookie("partnerid", encryptedPartnerid, {
    //     req,
    //     res,
    //     maxAge: maxAge ?? 60 * 60 * 24 * 365, // would expire after 15 minutes
    //     httpOnly: true,
    //     signed: true,
    //     path: "/",
    //     sameSite: "strict",
    //   })
    // }
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
