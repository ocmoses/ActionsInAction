"use client"

import { useState } from "react"
import useProcessing from "@/hooks/useProcessing"
import Axios from "@/app/modules/axios"

const useRegistration = () => {
  const { setProcessing } = useProcessing()

  const [response, setResponse] = useState({
    success: false,
    error: null,
    data: null,
  })

  const register = async (url, formData) => {
    setProcessing(true)

    const result = await Axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: process.NEXT_PUBLIC_TIMEOUT,
    }).catch((e) => {
      return {
        success: false,
        error: `${e.message}. Please check you connection`,
        data: null,
      }
    })
    if (!result) {
      setProcessing(false)
      return { success: false, error: "Something went wrong", data: null }
    }
    console.log({ result })
    const { success, data } = result
    if (!success) {
      setProcessing(false)
      return { success: false, error: data.message, data: null }
    }
    return { success: true, error: null, data }
  }

  return { register }
}

export default useRegistration
