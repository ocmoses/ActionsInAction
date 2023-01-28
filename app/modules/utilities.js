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
export async function logout() {
  const response = await fetch("/api/users/logout")
  await response.json()
  return { success: true }
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
export function userData(data, partnerID) {
  const partner_id = partnerID ? Decrypt(partnerID) : null
  const user = { ...data?.user }
  const partners = []
  if (data && data.partner) {
    data.partner.progress = {
      percent: data.percent_complete,
      stage: { ...data.profile_stage },
    }
  } else {
    const stages = [...data.profile_stage] ?? []

    if (data?.partners.length > 0) {
      data.partners.map((p) => {
        const stage = stages.find((s) => s.partner_uuid === p.uuid)
        if (stage) {
          const percent = stage.percentage
          delete stage.id
          delete stage.uuid
          delete stage.user_uuid
          delete stage.partner_uuid
          delete stage.percentage
          delete stage.created_at
          delete stage.updated_at
          p.progress = {
            percent,
            stage,
          }
        } else {
          p.progress = null
        }
        partners.push(p)
      })
    }
  }

  const partner = partner_id
    ? partners.find((p) => p.uuid === partner_id)
    : {
        ...data?.partner,
      }
  delete data.profile_status
  delete data.percent_complete
  delete data.profile_stage
  delete data.user
  delete data.partner
  delete data.partners
  delete data.login_token
  return {
    user,
    partner,
    partners,
    ...data,
  }
}
export const createHttpOnlyCookie = (data, req, res, partnerID) => {
  const authToken = data?.login_token?.access_token
  const maxAge = data?.login_token?.expires_in

  const User = userData(data, partnerID)
  if (authToken) {
    // SET COOKIES
    const encryptedAuthToken = Encrypt(authToken)

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

    setCookie("user_id", encryptedUserId, {
      req,
      res,
      maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
      httpOnly: true,
      signed: true,
      path: "/",
      sameSite: "strict",
    })
    if (User.partner.uuid) {
      const encryptedPartnerid = Encrypt(`${User.partner.uuid}`)
      setCookie("partnerid", encryptedPartnerid, {
        req,
        res,
        maxAge: maxAge ?? 60 * 60 * 24 * 365, // would expire after 15 minutes
        httpOnly: true,
        signed: true,
        path: "/",
        sameSite: "strict",
      })
    }
  }
  return { User, authToken }
}
export const getPath = (segments) => {
  if (!segments) return null
  const segment = segments.filter((seg) => !seg.includes("("))
  return segment.reverse().join("/")
}
