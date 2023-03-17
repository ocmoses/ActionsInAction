"use client"
import "client-only"

import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import Axios from "@/app/modules/axios"
import RemoteEndpoints from "@/app/modules/endpoints"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import usePartners from "@/hooks/usePartners"

import { PageRoutes } from "@/app/modules/menu"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { NextEndPoints } from "@/app/modules/endpoints"
import { Util } from "@/app/modules/utilities"

export default function RegisterValidation({ params }) {
  const { processing, setProcessing } = useProcessing()
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})
  const [data, setData] = useState(null)
  const validating = useRef(false)
  const router = useRouter()
  const app = useApp()
  const users = useUsers()
  const { resendEmail } = usePartners()

  const ValidateEmailAndUser = async (params) => {
    console.log("ValidateEmailAndUser")
    console.log("params.type", params.type)
    setProcessing(true)
    try {
      let response = null

      const url = `${PageRoutes.setpassword}/${params.type}/${params.user_uuid}`
      response = await Axios.post(
        RemoteEndpoints.CHECK_EMAIL_VERIFICATION_LINK,
        { user_uuid: params.user_uuid },
        {
          timeout: process.TIMEOUT,
        }
      ).catch((e) => {
        setProcessing(false)
        return setError({
          validate: `${e.message}. Please check you connection`,
        })
      })
      if (response) {
        const { success, data } = response
        if (success) {
          return router.push(url)
        } else {
          setProcessing(false)
          return setError({
            validate: `${data.message}`,
          })
        }
      } else {
        setProcessing(false)
        return setError({
          validate: "Cannot reach the server. Please check your connection",
        })
      }
    } catch (err) {
      setProcessing(false)
      return setError({
        validate: "Something went wrong",
      })
    }
  }
  const ValidateNewUser = async () => {
    setProcessing(true)
    console.log("ValidateNewUser")
    try {
      clearErrors()
      // clearStore()
      const response = await fetch(NextEndPoints.VALIDATE_USER, {
        method: "POST",
        body: JSON.stringify({
          user_uuid: params.user_uuid,
          type: params.type,
        }),
      })
      console.log(1)
      if (response) {
        console.log(2)
        // setValidating(true)
        validating.current = true
        const result = await response.json()
        const { data: loginData } = result
        console.log({ loginData })

        if (!loginData) {
          console.log(3)
          setProcessing(false)
          return setError({ validate: "Authentication failed" })
        }

        if (loginData.error) {
          console.log(4)
          setProcessing(false)
          users.setTmpUser(loginData.data)
          if (loginData.data && loginData.data.email_verified === "yes") {
            console.log(5)
            return setError({
              validate: `Your email ${Util.obscureEmail(
                loginData.data.email
              )} is already verified. Please login to proceed`,
            })
          }
          return setError({ validate: loginData.error })
        }
        console.log(6)
        const serverSession = {
          status: loginData?.data?.user?.uuid
            ? "authenticated"
            : "unauthenticated",
          User: loginData?.data,
        }
        const categories = loginData?.categories

        app.setStoreStates(serverSession, categories, "validation")
        setData(serverSession)
        if (params.type === "new") {
          app.toggleGetstartedLink(true)
          return router.push(PageRoutes.getstarted)
        }
        app.toggleGetstartedLink(false)
        return router.push(PageRoutes.dashboard)
      } else {
        console.log(7)
        setProcessing(false)
        return setError({
          validate: "Cannot reach the server. Please check your connection",
        })
      }
    } catch (err) {
      console.log({ err })
      setProcessing(false)
      setError({ validate: JSON.stringify(err) })
    }
  }
  useEffect(() => {
    if (params?.type === "new") {
      ValidateNewUser()
    } else {
      ValidateEmailAndUser(params)
    }
  }, [])
  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div>
          {!errors?.validate && (
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

              <p className="text-center max-w-md">{errors.validate}</p>
              <div className="flex justify-between gap-3 font-mtn-extralight font-mtn text-center text-white/50 mb-16 p-0">
                <div
                  className="cursor-pointer text-[12px] text-white hover:text-gray-300 px-4 py-1 border border-white/30 rounded-full"
                  onClick={() => router.push(PageRoutes.login)}
                >
                  LOGIN TO PROCEED
                </div>
                {users?.tmpuser?.email !== "" &&
                  users?.tmpuser?.email_verified !== "yes" && (
                    <div
                      className="cursor-pointer text-[12px] text-white hover:text-gray-300 px-4 py-1 border border-white/30 rounded-full"
                      onClick={() =>
                        resendEmail(users?.tmpuser?.email, params.type)
                      }
                    >
                      RESEND VERIFICATION EMAIL
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
