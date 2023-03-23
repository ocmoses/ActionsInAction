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
import { scrollToTop, ValidateField, isString } from "@/app/modules/utilities"

function CompanyDetail() {
  const { processing, setProcessing, setForm, moveToNextForm } = useProcessing()
  const [{ errors, setError, removeError, clearErrors }] = useErrors(null)
  const {
    partner,
    category,
    registerPartner,
    updatePartner,
    checkUpdateStatus,
    nextStage,
  } = usePartners()
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
  const [isMasterData, setIsMasterData] = useState(false)
  useEffect(() => {
    const Category =
      partner.master &&
      partner.sections[partner.master.category_uuid]?.companydetail &&
      category.category_uuid !== partner.master.category_uuid
        ? partner.master
        : category
    setIsMasterData(
      partner.master &&
        partner.sections[partner.master.category_uuid]?.companydetail &&
        category.category_uuid !== partner.master.category_uuid
    )
    let tin_data = null
    let cac_data = null
    if (Category?.tin_data) {
      tin_data = isString(Category.tin_data)
        ? JSON.parse(Category.tin_data)
        : Category.tin_data
    }
    if (Category?.cac_data) {
      cac_data = isString(Category.cac_data)
        ? JSON.parse(Category.cac_data)
        : Category.cac_data
    }
    setData({
      partner_uuid: Category?.partner_uuid,
      category_uuid: category?.category_uuid,
      company_name: tin_data?.Name
        ? tin_data?.Name
        : Category?.company_name
        ? Category?.company_name
        : "",
      country: Category?.country ?? "NG",
      company_address: Category?.company_address ?? "",
      company_city: Category?.company_city ?? "",
      company_state: Category?.company_state ?? "",
      company_postcode: Category?.company_postcode ?? "",
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
    if (result.data?.partner) {
      updatePartner(result?.data?.partner)
      const newcategory = result.data?.partner.categories.find(
        (c) => c.category_uuid === category.category_uuid
      )
      newcategory.profile_stage.companydetail = "1"
      const { nextstage: NextStage } = nextStage(newcategory, partner)
      console.log({ NextStage })
      return setForm(NextStage)
    }
    // if (NextStage === "review") return moveToNextForm(["review", true])
    // return moveToNextForm([NextStage])
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
          disabled={isMasterData}
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
          disabled={isMasterData}
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
          disabled={isMasterData}
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
              disabled={isMasterData}
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
              disabled={isMasterData}
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
          disabled={isMasterData}
        />
        {!isMasterData && (
          <div className="mt-6">
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <ButtonNext
                label={checkUpdateStatus("companydetail") ? "Update" : "Next"}
              />
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default CompanyDetail
