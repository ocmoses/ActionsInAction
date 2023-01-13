import useErrors from '@/hooks/useErrors'
import Axios from '@/app/modules/axios'
import { useState } from 'react'
import {
  checkRegStatus,
  getPartner,
  partnerRegistration
} from '@/app/modules/partners'
import { Encrypt, Decrypt } from '@/app/modules/utilities'

const useLocalSession = () => {
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState({})

  const login = async (logindata) => {
    clearErrors()
    setLoading(true)
    const { success, data } = await Axios.post(
      '/v1/auth/login',
      logindata
    ).catch((error) => {
      setError(error.message)
      setLoading(true)
    })
    if (success && data.user?.id) {
      if (data.authorisation?.token) {
        Axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.authorisation.token}`

        const token = Encrypt(data.authorisation.token)
        localStorage.setItem('_sess', token)
        localStorage.setItem('_ttl', data.authorisation.ttl)
      }
      const user = {
        ...data.user,
        progress: {
          status: data.profile_status,
          percent: data.percent_complete,
          stages: { ...data.profile_stage }
        }
      }
      if (user) {
        const partner_status = await checkRegStatus(user)
        setLoading(false)
        // setPartner(user)
        updateSession(user)
        return { success: true, error: null, ...partner_status }
      }
      return { error: 'Something went wrong' }
    } else {
      setError(data.message)
      setLoading(true)
    }
  }
  const logout = async () => {
    localStorage.removeItem('_sess')
    localStorage.removeItem('_ttl')
    setLoading(true)
    const response = await Axios.get('/user/logout')
    if (response?.success) {
      Axios.defaults.headers.common['Authorization'] = null
      setLoading(false)
    }
    return { success: true, error: null, data: null }
  }
  const getUser = async (userid) => {
    const result = await fetchData(`${apiURL}/v1/auth/partner-info/${userid}`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    return result
  }
  const checkUser = async () => {
    const _token = localStorage.getItem('_sess') ?? null
    const ttl = localStorage.getItem('_ttl') ?? null
    if (token) {
      const token = Decrypt(_token)
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const user = await getUser()
      if (user) {
        setLoading(false)
      } else {
        LogoutUser()
      }
    }
  }
  const updateSession = async (newSession) => {
    setLoading(true)
    setSession((oldSession) => ({ ...oldSession, ...newSession }))
  }

  return {
    loading,
    errors,
    login,
    logout,
    Decrypt,
    Encrypt,
    getUser,
    checkUser,
    session,
    setSession,
    updateSession
  }
}
export default useLocalSession
