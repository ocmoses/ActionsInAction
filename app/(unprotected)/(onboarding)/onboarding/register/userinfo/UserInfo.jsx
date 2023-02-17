"use client"
import FormErrors from "@/app/components/FormErrors"
import Button from "@/app/components/form/Button"
import TextInput from "@/app/components/form/TextInput"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useUsers from "@/hooks/useUsers"
import { createRef, useEffect, useState } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import { CountrySelector } from "@/app/components/countrycode/selector"
import { COUNTRIES } from "@/app/components/countrycode/countries"
import { forms } from "@/app/modules/constants"
import { Util } from "@/utils/utility"
import { scrollToTop } from "@/app/modules/utilities"
import useApp from "@/hooks/useApp"

function UserInfo({ designations }) {
  const { setRouteloading } = useApp()

  const { processing, setProcessing, setForm } = useProcessing()
  const { partner, registerPartner } = usePartners()
  const { user } = useUsers()
  const { title, subtitle, hand, required } = forms["userinfo"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors({})

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    designation: "",
    countrycode: "234",
    country: "NG",
    telephone: "",
    password: "",
    password_confirmed: "",
  })

  useEffect(() => {
    setForm("userinfo")
    setProcessing(false)
    clearErrors()
    setRouteloading(false)
    scrollToTop("onboardinglayout")
  }, [])
  useEffect(() => {
    if (designations.error) setError({ userinfo: designations.error })
    else clearErrors()
  }, [designations])

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
      if (error) return scrollToTop("onboardinglayout")
    }
    if (!Util.validateEmail(data["email"])) {
      setError({ email: "Your email address is not valid" })
      return
    }
    if (data["password"].length < 8) {
      setError({ password: "Your password must be at least, 8 characters" })
      return
    }

    if (data["telephone"].length < 6 || data["telephone"].length > 11) {
      setError({ telephone: "Your telephone is not valid" })
      return
    }

    const result = await registerPartner("userinfo", data)
    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) return setError({ userinfo: result.error })
    }
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handleCountryChange = (val) => {
    setCountry(val)
    setCountrycode(() => {
      const country = COUNTRIES.find((option) => option.value === val)
      return country.code
    })
  }
  const myRef = createRef()
  const [isOpen, setIsOpen] = useState(false)
  const [country, setCountry] = useState(partner?.country ?? "NG")
  const [countrycode, setCountrycode] = useState(partner?.countrycode ?? "234")

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      country: country,
      countrycode: countrycode,
    }))
  }, [country, countrycode])

  return (
    <div
      id="onboardingform"
      className="w3-animate-opacity pb-20 w-full max-w-[492px]"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["userinfo"]} />}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <TextInput
            id="first_name"
            label="First name"
            value={data.first_name}
            onChange={handleFormChange}
            errors={errors}
          />
          <TextInput
            id="last_name"
            label="Last name"
            value={data.last_name}
            onChange={handleFormChange}
            errors={errors}
          />
        </div>

        <TextInput
          id="company_name"
          label="Company"
          value={data.company_name}
          onChange={handleFormChange}
          errors={errors}
        />
        <TextInput
          id="email"
          label="Email"
          value={data.email}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="flex justify-start items-center mb-0 w-full bg-[#212121] border-1 border-[#333333] rounded-xl">
          <div className=" ">
            <CountrySelector
              id={"countries"}
              ref={myRef}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={(val) => handleCountryChange(val)}
              selectedValue={COUNTRIES.find(
                (option) => option.value === country
              )}
              errors={errors}
            />
          </div>
          <div className=" flex-1 ">
            <TextInput
              id="telephone"
              label="Telephone"
              value={data.telephone}
              onChange={handleFormChange}
              border="border-0"
              bg="bg-transparent"
              margin="mb-0"
            />
          </div>
        </div>
        <div className="mb-6">
          {errors && <FormErrors error={errors["telephone"]} />}
        </div>

        <SelectInput
          id="designation"
          label="Designation"
          value={data.designation}
          onChange={handleFormChange}
          errors={errors}
        >
          <SelectInputOption value="" label="" />
          {designations?.data?.length > 0 &&
            designations.data.map((role) => (
              <SelectInputOption
                key={role.uuid}
                value={role.uuid}
                label={role.company_role}
              />
            ))}
        </SelectInput>
        <TextInput
          id="password"
          type="password"
          label="Choose a password"
          value={data.password}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className=" font-mtn-extralight text-white/70 text-start -mt-6 mb-6 p-2">
          Must include at least 8 characters, an uppercase letter, and a number
        </div>
        {/* <TextInput
          id="password_confirmed"
          type="password"
          label="Repeat your password"
          value={data.password_confirmed}
          onChange={handleFormChange}
          errors={errors}
        /> */}
        <div
          className=" text-white/70 text-start mb-12 p-2"
          style={{
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "16px",
          }}
        >
          By clicking "Start Application" I agree to MTN's{" "}
          <a
            href="#"
            className=" text-white hover:text-white border-b-1 border-b-white"
          >
            Terms of Use
          </a>
          ,
          <a
            href="#"
            className=" text-white hover:text-white border-b-1 border-b- border-b-white"
          >
            Privacy Policy
          </a>{" "}
          and to receive electronic communication about my accounts and services
          per Mtn's{" "}
          <a
            href="#"
            className=" text-white hover:text-white border-b-1 border-b- border-b-white"
          >
            Electronic Communications Agreement
          </a>
          .
        </div>
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button label="Start registration" />
        )}
      </form>
    </div>
  )
}

export default UserInfo
