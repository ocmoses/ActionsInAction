import { useState } from 'react'
const useErrors = (data) => {
  const [errors, setErrors] = useState()
  const setError = (key, message) => {
    setErrors((oldState) => ({
      ...oldState,
      [key]: message
    }))
  }
  const removeError = (field) => {
    for (const f in errors) {
      if (f === field) {
        if (data[field] !== '') {
          setErrors((oldState) => {
            delete oldState[field]
            return oldState
          })
        }
      }
    }
  }
  const clearErrors = () => setErrors({})
  return [
    { errors, setErrors, setError, removeError, clearErrors },
    clearErrors
  ]
}

export default useErrors
