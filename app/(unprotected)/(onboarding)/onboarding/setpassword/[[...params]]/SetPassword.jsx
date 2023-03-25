"use client"
import Button from "@/app/components/form/Button"
import TextInput from "@/app/components/form/TextInput"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import useProcessing from "@/hooks/useProcessing"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import usePartners from "@/hooks/usePartners"
import useApp from "@/hooks/useApp"
import useLogout from "@/hooks/useLogout"
import { useEffect, useState } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"
import { NextEndPoints } from "@/app/modules/endpoints"
import { PageRoutes } from "@/app/modules/menu"
import { useRouter } from "next/navigation"

function SetPassword({ params: { params } }) {
  const { clearStore } = useLogout()
  const router = useRouter()
  const app = useApp()
  const { processing, setProcessing, setForm } = useProcessing()
  const { title, subtitle, hand, required } = forms["setpassword"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})
  const [data, setData] = useState({
    user_uuid: "",
    password: "",
    password_confirmed: "",
    type: "",
  })
  useEffect(() => {
    setData((oldState) => ({
      ...oldState,
      type: params?.length > 0 ? params[0] : "",
      user_uuid: params?.length > 1 ? params[1] : "",
    }))
    if (!params[0] || !params[1]) setError({ setpassword: "Invalid request" })
  }, [params])
  const { registerPartner } = usePartners()

  useEffect(() => {
    setForm("setpassword")
    setProcessing(false)
    clearErrors()
  }, [])

  const handleReset = async () => {
    clearErrors()
    clearStore()
    setProcessing(true)
    const response = await fetch(NextEndPoints.SETPASSWORD, {
      method: "POST",
      body: JSON.stringify({
        user_uuid: data.user_uuid,
        password: data.password,
        password_confirmed: data.password_confirmed,
        type: data.type,
      }),
    })
    const result = await response.json()
    const { data: loginData } = result
    if (!loginData) {
      setProcessing(false)
      return setError({ setpassword: "Authentication failed" })
    }
    if (!loginData.success) {
      setProcessing(false)
      return setError({ setpassword: loginData.error })
    }
    const serverSession = {
      status: loginData?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User: loginData?.data,
      type: "user",
    }
    app.setStoreStates(serverSession, loginData?.categories, "setpassword")
    // const redirect =
    //   data.type === "existing"
    //     ? PageRoutes.getstarted
    //     : PageRoutes.dashboard
    return router.push(PageRoutes.dashboard)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    let error = false
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!!!data[field]) {
          error = true
          setError({ [field]: `${required[field]} is required` })
        }
      }
      if (error) return
      if (data.password.length < 8) {
        setError({ password: "Your password must be at least, 8 characters" })
        return
      }
      if (data.password !== data.password_confirmed)
        return setError({
          password_confirmed: "Password confirmation mismatch",
        })
    }
    handleReset()
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit} className="">
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["setpassword"]} />}
        </div>
        <TextInput
          id="password"
          label="Enter your password"
          type="password"
          value={data.password}
          onChange={handleFormChange}
          errors={errors}
          margin="mb-1"
        />
        <div className="mb-6 text-[#999999]">
          Must be at least 8 characters, includes uppercase and lowercase
          letter, a number and a special character
        </div>
        <TextInput
          id="password_confirmed"
          type="password"
          label="Confirm your password"
          value={data.password_confirmed}
          onChange={handleFormChange}
          errors={errors}
        />
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button label={`Continue`} />
        )}
      </form>
    </div>
  )
}

export default SetPassword
