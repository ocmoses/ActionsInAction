import CryptoJS from 'crypto-js'

export const Decrypt = (data) => {
  const decrypted = CryptoJS.AES.decrypt(
    data,
    CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTKEY}`),
    {
      iv: CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTIV}`),
      mode: CryptoJS.mode.CBC
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
      mode: CryptoJS.mode.CBC
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
  if (!date) return ''
  var d = new Date(date)

  return d.toLocaleDateString('en-NG')
}
export function inputDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return (
    d.getFullYear() +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + d.getDate()).slice(-2)
  )
}
export async function proxyFetch(url, options) {
  const response = await fetch('/api/fetch', {
    method: 'POST',
    body: JSON.stringify({
      url, // '/v1/categories',
      options //: { method: 'GET' }
    })
  })
  const { success, error, data } = await response.json()
  return { success, error, data }
}

export const isArray = (data) => {
  return Array.isArray(data)
}
export const isObject = (data) => {
  return typeof data === 'object' && data !== null && !Array.isArray(data)
}
export const isString = (data) => {
  return typeof data === 'string'
}
export const isNumber = (data) => {
  return typeof data === 'number'
}
export const isBoolean = (data) => {
  return typeof data === 'boolean'
}
