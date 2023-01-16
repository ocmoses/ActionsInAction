"use client"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import TextInput from "@/app/components/form/TextInput"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import Button from "@/app/components/form/Button"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import { forms } from "@/app/modules/constants"
import { useStoreState, useStoreActions } from "easy-peasy"
import useProcessing from "@/hooks/useProcessing"

function CompanyDetail() {
  const { processing, setProcessing, setForm, form } = useProcessing()
  const { partnerInfo, registerPartner } = useOnboardingContext()

  const { title, subtitle, hand, required } = forms["companydetail"]
  const [data, setData] = useState({
    company_name: "",
    country: "",
    company_address: "",
    company_city: "",
    company_state: "",
    company_postcode: "",
  })
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        company_name: partnerInfo.company_name ?? "",
        country: partnerInfo.country ?? "",
        company_address: partnerInfo.company_address ?? "",
        company_city: partnerInfo.company_city ?? "",
        company_state: partnerInfo.company_state ?? "",
        company_postcode: partnerInfo.company_postcode ?? "",
      })
  }, [partnerInfo])
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
          setError(field, `${required[field]} is required`)
        }
      }
      if (error) return
    }

    const result = await registerPartner("companydetail", data)
    if (result) {
      if (result?.error) setError("global", result.error)
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
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["global"]} />}
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
