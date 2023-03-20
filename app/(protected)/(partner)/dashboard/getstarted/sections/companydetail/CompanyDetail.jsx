"use client"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import TextInput from "@/app/components/form/TextInput"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import ButtonNext from "@/app/components/form/ButtonNext"
import usePartners from "@/hooks/usePartners"
import useProcessing from "@/hooks/useProcessing"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import { forms } from "@/app/modules/constants"
import { scrollToTop, ValidateField } from "@/app/modules/utilities"

function CompanyDetail() {
  const { processing, setProcessing, setForm, moveToNextForm } = useProcessing()
  const [{ errors, setError, removeError, clearErrors }] = useErrors(null)
  const { category, registerPartner, checkUpdateStatus, nextStage } =
    usePartners()
  const { nextstage: NextStage } = nextStage(category)
  const { title, subtitle, hand, fields } = forms["companydetail"]
  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    company_name: "",
    country: "NG",
    company_address: "",
    company_city: "",
    company_state: "",
    company_postcode: "",
  })
  useEffect(() => {
    setData({
      partner_uuid: category?.partner_uuid,
      category_uuid: category?.category_uuid,
      company_name: category?.company_name ?? "",
      country: category?.country ?? "NG",
      company_address: category?.company_address ?? "",
      company_city: category?.company_city ?? "",
      company_state: category?.company_state ?? "",
      company_postcode: category?.company_postcode ?? "",
    })
  }, [category])

  useEffect(() => {
    setForm("companydetail")
    setProcessing(false)
    scrollToTop("onboardinglayout")
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
    if (!Util.isEmpty(fields)) {
      for (const field in fields) {
        const error = ValidateField(field, "companydetail", data, category)
        if (error) {
          scrollToTop("onboardinglayout")
          return setError({
            [field]: error,
          })
        }
      }
    }

    const result = await registerPartner("companydetail", data)
    if (result?.error) {
      scrollToTop("onboardinglayout")
      return setError({ companydetail: result.error })
    }
    if (NextStage === "review") return moveToNextForm(["review", true])
    moveToNextForm(["companydetail"])
  }
  const [selectField, setSelectField] = useState(null)
  useEffect(() => {
    removeError(selectField)
    Validate(selectField)
  }, [selectField, data])

  const handleFormChange = (e) => {
    const field = e.target.id
    setData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }))
  }
  const Validate = (field) => {
    removeError(field)
    const error = ValidateField(field, "companydetail", data, category)
    if (error)
      return setError({
        [field]: error,
      })
  }
  return (
    <div className="w3-animate-opacity mx-auto w-full max-w-[440px]">
      {/* <div className="p-2 text-white">{JSON.stringify(category)}</div> */}
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
          onBlur={() => Validate("company_name")}
          errors={errors}
        />
        <SelectInput
          id="country"
          label="Select Country"
          value={data.country}
          onChange={(e) => {
            handleFormChange(e)
            setSelectField("country")
          }}
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
          onBlur={() => Validate("company_address")}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="relative ">
            <TextInput
              id="company_city"
              label="City"
              value={data.company_city}
              onChange={handleFormChange}
              onBlur={() => Validate("company_city")}
              errors={errors}
            />
          </div>
          <div className="relative ">
            <SelectInput
              id="company_state"
              label="State"
              value={data.company_state}
              onChange={(e) => {
                handleFormChange(e)
                setSelectField("company_state")
              }}
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
          onBlur={() => Validate("company_postcode")}
          errors={errors}
        />
        <div className="mt-6">
          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <ButtonNext
              label={checkUpdateStatus("companydetail") ? "Update" : "Next"}
            />
          )}
        </div>
      </form>
    </div>
  )
}

export default CompanyDetail
