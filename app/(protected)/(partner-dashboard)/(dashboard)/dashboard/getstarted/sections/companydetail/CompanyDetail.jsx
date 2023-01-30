"use client"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import TextInput from "@/app/components/form/TextInput"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import Button from "@/app/components/form/Button"
import usePartners from "@/hooks/usePartners"
import useProcessing from "@/hooks/useProcessing"

import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import { forms } from "@/app/modules/constants"

function CompanyDetail() {
  const { processing, setProcessing, setForm } = useProcessing()
  const [{ errors, setError, removeError, clearErrors }] = useErrors(null)
  const { partner, registerPartner } = usePartners()

  const { title, subtitle, hand, required } = forms["companydetail"]
  const [data, setData] = useState({
    company_name: "",
    country: "NG",
    company_address: "",
    company_city: "",
    company_state: "",
    company_postcode: "",
  })
  useEffect(() => {
    if (partner)
      setData({
        company_name: partner.company_name ?? "",
        country: partner.country ?? "NG",
        company_address: partner.company_address ?? "",
        company_city: partner.company_city ?? "",
        company_state: partner.company_state ?? "",
        company_postcode: partner.company_postcode ?? "",
      })
  }, [partner])
  useEffect(() => {
    setForm("companydetail")
    setProcessing(false)
  }, [])
  const [states, setStates] = useState([])
  useEffect(() => {
    setStates(
      data.country
        ? STATES.filter((state) => state.country_code === data.country)
        : []
    )
  }, [data.country])
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
    }

    const result = await registerPartner("companydetail", data)
    console.log({ result })
    if (result) {
      if (result?.error) return setError({ companydetail: result.error })
    }
    // setActiveCategory(category.uuid)
    // setCategory(category)
    // moveToNextForm("category")
    // setIsOnboarding(true)
    // setIsOpen(false)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <div className="w3-animate-opacity mx-auto w-full max-w-[440px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["companydetail"]} />}
        </div>
        <TextInput
          id="company_name"
          label="Company name"
          value={data.company_name}
          onChange={handleFormChange}
          errors={errors}
        />
        <SelectInput
          id="country"
          label="Select Country"
          value={data.country}
          onChange={handleFormChange}
          errors={errors}
        >
          {COUNTRIES.map((c) => (
            <SelectInputOption key={c.value} value={c.value} label={c.title} />
          ))}
        </SelectInput>

        <TextInput
          id="company_address"
          label="Company address"
          value={data.company_address}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="relative ">
            <TextInput
              id="company_city"
              label="City"
              value={data.company_city}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className="relative ">
            <SelectInput
              id="company_state"
              label="State"
              value={data.company_state}
              onChange={handleFormChange}
              errors={errors}
            >
              <SelectInputOption value="" label="" />
              {states.map((s) => (
                <SelectInputOption
                  key={s.state_code}
                  value={s.state_code}
                  label={s.state_name}
                />
              ))}
            </SelectInput>
          </div>
        </div>
        <TextInput
          id="company_postcode"
          label="Company postcode"
          value={data.company_postcode}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="mt-6">
          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <Button label="Next" />
          )}
        </div>
      </form>
    </div>
  )
}

export default CompanyDetail
