"use client"
import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useUsers from "@/hooks/useUsers"
import Button from "@/app/components/form/Button"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegisterValidation({ param }) {
  const [{ errors, setError, clearErrors }] = useErrors()
  const { processing, setProcessing, setForm } = useProcessing()
  const { partner, setPartner } = usePartners()
  const { user, updateUser } = useUsers()

  const router = useRouter()

  const [userQuery, setUserQuery] = useState(null)
  useEffect(() => {
    setForm(null)
    clearErrors()
    const getPartner = async (user_uuid) => {
      const response = await fetch("/api/users/cookie", {
        method: "POST",
        body: JSON.stringify(user_uuid),
      })
      const result = await response.json()
      setUserQuery(result)
    }
    const path = param && param[1] ? param[1] : "userinfo"
    if (!userQuery?.data) getPartner(param[0])
    if (userQuery?.error) {
      setError({ validate: userQuery.error })
    } else {
      if (userQuery?.data) {
        updateUser(userQuery.data.user)
        setPartner(userQuery.data.partner)
        console.log({ userQuery })
        console.log({ path })
        switch (path) {
          case "userinfo":
            router.replace("/dashboard")
            break
          case "setpassword":
            router.replace("/onboarding/setpassword")
            break
        }
      }
    }
  }, [param, userQuery])
  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div>
          {!errors.validate && !user?.uuid && (
            <div className="flex h-full w-full justify-center items-center">
              <TailSpinPreloader width={80} height={80} fill="#efb703" />
            </div>
          )}
          {!errors.validate && user?.uuid && (
            <>
              {partner.progress?.percent && (
                <div className="flex justify-center mb-12">
                  <div
                    className="radial-progress text-2xl  text-mtn bg-[#333333] border-4 border-[#333]"
                    style={{
                      "--value": partner.progress?.percent,
                      "--size": "99px",
                      "--thickness": "12px",
                    }}
                  >
                    {partner.progress?.percent}%
                  </div>
                </div>
              )}
              <h1 className="flex justify-center gap-3 mtn-h1 text-white">
                Y'ello {user.first_name}{" "}
                <span className="animate-bounce">👋</span>
              </h1>
              <div className="mb-4 text-center w-full p-2 mtn-h1-subtitle text-[#999999]">
                Please complete your application to get started
              </div>
              <div className="flex justify-center">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              </div>
            </>
          )}
          {errors.validate && (
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

              {errors.validate}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
