import useErrors from '@/hooks/useErrors'
import Axios from '@/app/modules/axios'
import { useState } from 'react'
const useLocalSession = () => {
  const [{ errors: error, setError, removeError, clearErrors }] = useErrors({})
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

        const encrypted = CryptoJS.AES.encrypt(
          data.authorisation.token,
          CryptoJS.enc.Utf8.parse(key),
          {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
          }
        )
        const token = encrypted.toString()
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
      setLoading(false)
      setSession(user)
      return { success, error, data: user }
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
  const updateSession = async (newSession) => {
    setLoading(true)
    setSession((oldSession) => ({ ...oldSession, ...newSession }))
  }

  return { loading, error, login, logout, session, setSession, updateSession }
}
export default useLocalSession
