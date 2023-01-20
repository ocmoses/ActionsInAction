import CryptoJS from "crypto-js"
import { setCookie } from "cookies-next"

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
export function userData(data) {
  const status = data.profile_status ?? null
  const percent = data.percent_complete ?? null
  const stages = { ...data.profile_stage } ?? {}
  const user = { ...data?.user }
  const partner = {
    ...data?.partner,
    progress: {
      status,
      percent,
      stages,
    },
  }
  delete data.profile_status
  delete data.percent_complete
  delete data.profile_stage
  delete data.user
  delete data.partner
  delete data.login_token
  return {
    user,
    partner,
    ...data,
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
export const scrollToTop = () => {
  var contentBody = document.getElementById("contentBody")
  contentBody.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
export const createHttpOnlyCookie = (data, req, res) => {
  const authToken = data?.login_token?.access_token
  const maxAge = data?.login_token?.expires_in

  const User = userData(data)
  // console.log("userData User", User)
  if (authToken) {
    // SET COOKIES
    const encryptedAuthToken = Encrypt(authToken)
    const encryptedPartnerid = Encrypt(`${User.partner.uuid}`)
    const encryptedUserId = Encrypt(`${User.user.uuid}`)
    setCookie("auth-token", encryptedAuthToken, {
      req,
      res,
      maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })
    setCookie("partnerid", encryptedPartnerid, {
      req,
      res,
      maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })
    setCookie("user_id", encryptedUserId, {
      req,
      res,
      maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })
  }
  return { User, authToken }
}
