import { apiURL } from '@/app/modules/constants'
import { getCookie } from 'cookies-next'
import { Decrypt } from '@/app/modules/utilities'

const fetchPlus = async (url, options = {}, retries, req, res) => {
  const authToken = getCookie('auth-token', { req, res })
  console.log('Decrypt')
  console.log(authToken)
  console.log(Decrypt(authToken))
  const Opts = options ?? {}
  const defaultHeaders = {
    apikey: `${process.env.APIKEY}`,
    'Content-Type': 'application/json',
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    Authorization: `Bearer ${Decrypt(authToken)}`
  }
  const defaultOptions = {
    method: Opts?.method ?? 'GET',
    headers: { ...defaultHeaders, ...Opts?.headers }
  }
  const Options = { ...defaultOptions, ...Opts }
  try {
    const response = await fetch(`${apiURL}${url}`, Options)
    const { success, data } = await response.json()
    if (response?.ok) {
      res.status(200).json({ success, error: null, data })
      return
    } else {
      if (data) {
        res.status(200).json({ success, error: data.message, data: null })
        return
      } else {
        if (retries > 0) return fetchPlus(url, options, retries - 1, req, res)

        res.status(200).json({
          success: false,
          error: `${response.status} ${response.statusText}`
        })
        return
      }
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message })
    return
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(200).json({ success: false, error: 'Invalid request method' })
      return
    }
    const { url, options, retries } = JSON.parse(req.body)
    return fetchPlus(url, options, retries, req, res)
  } catch (error) {
    res.status(200).json({ success: false, error: error.message })
    return
  }
}
