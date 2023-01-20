import { apiURL } from '@/app/modules/constants'
import { setCookie } from 'cookies-next'
import { Encrypt, userData } from '@/app/modules/utilities'

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
      console.log('login_token', result.data.login_token)
      const authToken = data?.login_token?.access_token
      const maxAge = data?.login_token?.expires_in

      const User = userData(data)
      console.log('data', data)
      if (!authToken)
        return res
          .status(200)
          .json({ success, error: 'Invalid request', data: User })
      // SET COOKIES
      const encryptedAuthToken = Encrypt(authToken)
      const encryptedPartnerid = Encrypt(`${User.partnerid}`)
      const encryptedUserId = Encrypt(`${User.id}`)
      setCookie('auth-token', encryptedAuthToken, {
        req,
        res,
        maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
        httpOnly: true,
        signed: true,
        path: '/',
        sameSite: 'strict'
      })
      setCookie('partnerid', encryptedPartnerid, {
        req,
        res,
        maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
        httpOnly: true,
        signed: true,
        path: '/',
        sameSite: 'strict'
      })
      setCookie('user_id', encryptedUserId, {
        req,
        res,
        maxAge: maxAge ?? 60 * 30, // would expire after 15 minutes
        httpOnly: true,
        signed: true,
        path: '/',
        sameSite: 'strict'
      })
      res.status(200).json({ success, error: null, data: User })
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
