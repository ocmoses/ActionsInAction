"use client"
import Image from "next/image"
import Link from "next/link"
import TextInput from "@/app/components/form/TextInput"
import Button from "@/app/components/form/Button"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import useLogout from "@/hooks/useLogout"
import useProcessing from "@/hooks/useProcessing"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useState, useEffect, use } from "react"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { NextEndPoints } from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"
import useApp from "@/hooks/useApp"

function Login({ params }) {
  const router = useRouter()
  const app = useApp()

  const { processing, setProcessing, setForm } = useProcessing()
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})
  const { clearStore } = useLogout()

  const [data, setData] = useState({
    email: process.env.NODE_ENV === "production" ? "" : "test@gmail.com",
    password: process.env.NODE_ENV === "production" ? "" : "Todoo45@222",
  })
  useEffect(() => {
    setForm(null)
    setProcessing(false)
    clearErrors()
  }, [])

  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!data.email) {
      return setError({ email: `Please enter your email address` })
    }
    if (!data.password) {
      return setError({ password: `Please enter your password` })
    }
    setProcessing(true)
    clearStore()
    const response = await fetch(NextEndPoints.LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    const result = await response.json()
    const { success, error, data: loginData } = result
    if (!loginData) {
      setProcessing(false)
      return setError({ login: "Authentication failed" })
    }
    if (!success) {
      setProcessing(false)
      return setError({ login: error })
    }

    const serverSession = {
      status: loginData?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User: loginData?.data,
    }
    app.setStoreStates(serverSession, loginData?.categories)
    const redirect =
      params && params?.length && params[0] !== "login"
        ? `/${params.join("/")}`
        : PageRoutes.getstarted
    return router.replace(redirect)
  }

  return (
    <>
      <form method="POST" onSubmit={handleLogin}>
        <div className="w3-animate-opacity pb-20 pt-[15vh] w-full max-w-[407px]">
          <h1 className="flex items-center gap-4 font-mtn-extrabold-italic  text-white">
            <span
              style={{
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: "40px",
              }}
            >
              Y’ello
            </span>
            <Image
              src="/assets/icons/yello-hand.svg"
              alt="Yello"
              priority
              width={36}
              height={36}
              className="h-auto animate-bounce"
            />
          </h1>
          <p
            className="font-hairline flex-wrap mb-16"
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#999999",
            }}
          >
            Welcome back! please enter your great details
          </p>
          <div className="mb-6">
            {errors && <FormErrors error={errors["login"]} />}
          </div>
          <>
            <TextInput
              id="email"
              label="Email address"
              value={data.email}
              onChange={handleFormChange}
              errors={errors}
            />
            <TextInput
              id="password"
              label="Password"
              type="Password"
              value={data.password}
              onChange={handleFormChange}
              errors={errors}
            />

            <Link
              href={`${PageRoutes.passwordreset}/reset`}
              className="inline-flex font-mtn-extralight  text-white text-start px-0 pb-1 mb-6"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                textDecorationLine: "underline",
              }}
            >
              Reset your password?
            </Link>
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button label="Continue" />
            )}
          </>
        </div>
      </form>
    </>
  )
}

export default Login
