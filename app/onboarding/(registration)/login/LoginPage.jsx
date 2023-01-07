"use client"
import Image from "next/image"
import Link from "next/link"
import TextInput from "@/app/components/form/TextInput"
import { TailSpinPreloader } from "@/app/components/Icons"
import Button from "@/app/components/form/Button"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import useErrors from "@/hooks/useErrors"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

function Login() {
  const { processing, setProcessing, LoginUser } = useOnboardingContext()
  const [data, setData] = useState({
    partnerid: "", //'234691599',
    password: "", //'Todoo45@222'
  })
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  const router = useRouter()
  useEffect(() => {
    setProcessing(false)
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
    if (!data.partnerid) {
      setError("partnerid", `Please enter your Partner ID`)
      return
    }
    if (!data.password) {
      setError("password", `Please enter your password`)
      return
    }
    const result = await LoginUser(data, "/", false)
    if (result?.error) setError("login", result.error)
  }
  // const session = useSession()
  // console.log('session', session)
  return (
    <form method="POST" onSubmit={handleLogin}>
      <div className="w3-animate-opacity pb-20 w-full max-w-[607px]">
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
          {errors && typeof errors["login"] !== "undefined" && (
            <div className="text-sm text-red-600 mt-2">{errors["login"]}</div>
          )}
        </div>
        <TextInput
          id="partnerid"
          label="Partner ID"
          value={data.partnerid}
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
          href="#"
          className="inline-flex font-mtn-extralight  text-white text-start px-0 pb-1 mb-6"
          style={{
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textDecorationLine: "underline",
          }}
        >
          Forgot your password?
        </Link>
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button label="Continue" />
        )}
      </div>
    </form>
  )
}

export default Login
