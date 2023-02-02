"use client"
import "client-only"

import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useUsers from "@/hooks/useUsers"
import RemoteEndpoints, {
  NextEndPoints,
  EndPointHeaders,
} from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegisterValidation({ params }) {
  const [{ errors, setError, clearErrors }] = useErrors()
  const { processing, setProcessing, setForm } = useProcessing()
  const [validateError, setValidateErrors] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [count, setCount] = useState(0)

  console.log(params)

  const router = useRouter()
  // useEffect(() => {
  //   setValidateErrors(false)
  // }, [])
  // useEffect(() => {
  //   if (params.user_uuid) {
  //     router.push(params.data)
  //     setValidateErrors(false)
  //   } else {
  //     setValidateErrors(true)
  //     setError({ validate: params.error })
  //   }
  // }, [params])
  const ValidateEmailAndUser = async (payload) => {
    setProcessing(true)
    try {
      let url = ""
      let response = null
      switch (params.type) {
        case "existing":
        case "reset":
          // url = RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK
          response = await fetch(
            RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK,
            {
              method: "POST",
              headers: {
                // ...EndPointHeaders,
                apikey: `${process.env.NEXT_PUBLIC_APIKEY}`,
              },
              cache: "no-store",
              next: { revalidate: 0 },
              body: JSON.stringify({ user_uuid: payload.user_uuid }),
            }
          )
          break
        case "new":
          // url = NextEndPoints.VALIDATE_USER
          // url =  `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${payload.user_uuid}`
          response = await fetch(
            `${RemoteEndpoints.GET_USER_INFO_VALIDATED}/${payload.user_uuid}`,
            {
              cache: "no-store",
              next: { revalidate: 0 },
              headers: {
                // ...EndPointHeaders
                apikey: `${process.env.NEXT_PUBLIC_APIKEY}`,
              },
            }
          )
          break
      }
      switch (params.type) {
        case "existing":
        case "reset":
          url = `${PageRoutes.setpassword}/${params.type}`
          break
        case "new":
          url = PageRoutes.getstarted
          break
      }
      if (response) {
        const results = await response?.json()
        console.log({ results })
        const { success, data } = results
        if (results) {
          console.log({ data })
          console.log({ success })
          return router.push(url)
          if (success) {
            clearErrors()
            setProcessed(false)
            console.log({ url })
            // return router.push(url)
          } else {
            setProcessing(false)
            setProcessed(true)
            setError({ validate: data.message ?? "Something went wrong" })
          }
        } else {
          setProcessing(false)
          setProcessed(true)
          setError({ validate: "Something went wrong" })
        }
      } else {
        setProcessing(false)
        setProcessed(true)
        setError({ validate: "Unable to reach the server" })
      }
    } catch (err) {
      setProcessing(false)
      setProcessed(true)
      setError({ validate: JSON.stringify(err) })
    }
  }
  useEffect(() => {
    setForm(null)
    setProcessed(false)
    clearErrors()
    ValidateEmailAndUser(params)
  }, [params])

  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div>
          {processing && (
            <div className="flex h-full w-full justify-center items-center">
              <TailSpinPreloader width={120} height={120} fill="#efb703" />
            </div>
          )}
          {errors?.validate && (
            <div className="flex flex-col gap-6 h-[400px] w-full text-red-500 text-[15px] justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <p>{errors.validate}</p>
              <div className="font-mtn-extralight flex gap-5 justify-center text-white/70 mb-16 p-2">
                <span
                  className="cursor-pointer text-lg text-white hover:text-gray-300"
                  onClick={() => router.push(PageRoutes.login)}
                >
                  Login
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
