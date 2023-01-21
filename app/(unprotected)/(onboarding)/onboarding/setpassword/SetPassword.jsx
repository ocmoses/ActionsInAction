"use client"
import { useEffect, useState } from "react"
import Button from "@/app/components/form/Button"
import { TailSpinPreloader } from "@/app/components/Icons"
import TextInput from "@/app/components/form/TextInput"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import useProcessing from "@/hooks/useProcessing"
import { Util } from "@/utils/utility"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import { forms } from "@/app/modules/constants"
import usePartners from "@/hooks/usePartners"

function SetPassword() {
  const { processing, setProcessing, setForm } = useProcessing()
  const { title, subtitle, hand, required } = forms["setpassword"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})
  const [data, setData] = useState({ password: "", password_confirmed: "" })
  const { registerPartner } = usePartners()

  useEffect(() => {
    setForm("setpassword")
    setProcessing(false)
    clearErrors()
  }, [])
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
      if (data["password"].length < 8) {
        setError({ password: "Your password must be at least, 8 characters" })
        return
      }
      if (data["password"] !== data["password_confirmed"]) {
        setError({ password_confirmed: "Password did not match" })
        return
      }
    }
    const result = await registerPartner("setpassword", data)
    if (result) {
      if (result?.error) setError({ setpassword: result.error })
    }
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
          Must include at least 8 characters, an uppercase letter, and a number
        </div>
        <TextInput
          id="password_confirmed"
          label="Repeat your password"
          type="password"
          value={data.password_confirmed}
          onChange={handleFormChange}
          errors={errors}
        />
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button label="Continue" />
        )}
      </form>
    </div>
  )
}

export default SetPassword
