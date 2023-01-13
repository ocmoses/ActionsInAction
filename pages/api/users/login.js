import { apiURL } from '@/app/modules/constants'
import { setCookie } from 'cookies-next'
import { Encrypt, EncryptObject } from '@/app/modules/utilities'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(200).json({ success: false, error: 'Invalid request method' })
      return
    }
    const body = JSON.parse(req.body)
    const response = await fetch(`${apiURL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    })
    const result = await response.json()
    if (response?.ok) {
      const { data, success } = result
      const status = data.profile_status
      const percent = data.percent_complete
      const stages = data.profile_stage

      delete data.profile_status
      delete data.percent_complete
      delete data.profile_stage

      const userData = {
        ...data,
        progress: {
          status,
          percent,
          stages
        }
      }
      // SET COOKIES
      const authToken = 'princemorpheusproductions'
      setCookie('auth-token', Encrypt(authToken), {
        req,
        res,
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true,
        signed: true,
        path: '/',
        sameSite: 'strict'
      })
      res.status(200).json({ success, error: null, data: userData })
      return
    } else {
      if (result?.data) {
        const { data, success } = result
        res.status(200).json({ success, error: data.message, data: null })
        return
      } else {
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
