"use client"
import "client-only"

import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import useLogout from "@/hooks/useLogout"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"

import { PageRoutes } from "@/app/modules/menu"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { NextEndPoints } from "@/app/modules/endpoints"
import { Util } from "@/app/modules/utilities"

export default function RegisterValidation({ url, err, params }) {
  const { processing, setProcessing } = useProcessing()
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})
  const [data, setData] = useState(null)
  const { clearStore } = useLogout()
  const router = useRouter()
  const app = useApp()
  const users = useUsers()

  const ValidateNewUser = async () => {
    setProcessing(true)
    try {
      clearErrors()
      clearStore()
      const response = await fetch(NextEndPoints.VALIDATE_USER, {
        method: "POST",
        body: JSON.stringify({
          user_uuid: params.user_uuid,
          type: params.type,
        }),
      })
      if (response) {
        const result = await response.json()
        const { data: loginData } = result
        if (!loginData) {
          setProcessing(false)
          return setError({ validate: "Authentication failed" })
        }
        if (loginData.error) {
          users.setTmpUser(loginData.data)
          if (loginData.data && loginData.data.email_verified === "yes") {
            return setError({
              validate: `Your email ${Util.obscureEmail(
                loginData.data.email
              )} is already verified. Please login to proceed`,
            })
          }
          return setError({ validate: loginData.error })
        }
        const serverSession = {
          status: loginData?.data?.user?.uuid
            ? "authenticated"
            : "unauthenticated",
          User: loginData?.data,
        }
        const categories = loginData?.categories

        app.setStoreStates(serverSession, categories)
        setData(serverSession)
        if (params.type === "new") {
          app.toggleGetstartedLink(true)
          return router.push(PageRoutes.getstarted)
        }
        app.toggleGetstartedLink(false)
        return router.push(PageRoutes.dashboard)
      } else {
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
    if (err) setError({ validate: err.message ?? err.messsage })
    if (params?.type === "new") {
      if (!processing) ValidateNewUser()
    } else {
      if (url) router.push(url)
    }
  }, [])
  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div>
          {((!data && !errors?.validate) || (data && errors?.validate)) && (
            <div className="flex h-full w-full justify-center items-center">
              <TailSpinPreloader width={120} height={120} fill="#efb703" />
            </div>
          )}
          {!data && errors?.validate && (
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
              <div className="font-mtn-extralight font-mtn text-center text-white/50 mb-16 p-0">
                <span
                  className="cursor-pointer text-sm text-white hover:text-gray-300"
                  onClick={() => router.push(PageRoutes.login)}
                >
                  LOGIN TO PROCEED
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
