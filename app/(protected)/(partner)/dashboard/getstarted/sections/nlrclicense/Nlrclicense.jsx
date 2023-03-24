"use client"
import TextInput from "@/app/components/form/TextInput"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import ButtonNext from "@/app/components/form/ButtonNext"
import ButtonPrev from "@/app/components/form/ButtonPrev"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import usePartners from "@/hooks/usePartners"
import useProcessing from "@/hooks/useProcessing"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms, validities, license_type } from "@/app/modules/constants"
import {
  scrollToTop,
  validateExpiryDate,
  getValidityRange,
  ValidateField,
  fieldRequired,
  fieldName,
} from "@/app/modules/utilities"

function NlrcLicense() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const {
    partner,
    category,
    registerPartner,
    updatePartner,
    checkUpdateStatus,
    nextStage,
  } = usePartners()
  const { min_start_date, max_end_date, yesterday, tomorrow } =
    getValidityRange(validities.nlrc_lottery)

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    nlrc_license_type: "",
    nlrc_license_id: "",
    nlrc_issue_date: "",
    nlrc_expiry_date: "",
    nlrc_doc: {},
    nlrc_file: "",
  })
  const { title, subtitle, hand, fields } = forms["nlrclicense"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  const [isMasterData, setIsMasterData] = useState(false)
  useEffect(() => {
    if (category) {
      const Category =
        partner.master &&
        partner.sections[partner.master.category_uuid]?.nlrclicense &&
        category.category_uuid !== partner.master.category_uuid
          ? partner.master
          : category

      setIsMasterData(
        partner.master &&
          partner.sections[partner.master.category_uuid]?.nlrclicense &&
          category.category_uuid !== partner.master.category_uuid
      )
      setData({
        partner_uuid: Category?.partner_uuid,
        category_uuid: category?.category_uuid,
        nlrc_license_type: Category?.nlrc_license_type ?? "",
        nlrc_license_id: Category?.nlrc_license_id ?? "",
        nlrc_issue_date: Category?.nlrc_issue_date ?? "",
        nlrc_expiry_date: Category?.nlrc_expiry_date ?? "",
        nlrc_doc: Category?.nlrc_doc ?? {},
        nlrc_file: Category?.nlrc_file ?? "",
      })
    }
  }, [category])
  useEffect(() => {
    setForm("nlrclicense")
    setProcessing(false)
    scrollToTop("onboardinglayout")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!Util.isEmpty(fields)) {
      for (const field in fields) {
        if (field !== "nlrc_doc") {
          const error = ValidateField(field, "nlrclicense", data, category)
          if (error) {
            scrollToTop("onboardinglayout")
            return setError({
              [field]: error,
            })
          }
        }
      }
    }
    if (
      fieldRequired("nlrc_doc", "nlrclicense", category) &&
      Util.isEmpty(data.nlrc_doc) &&
      !data.nlrc_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        tin_file: `${fieldName("nlrc_doc", "nlrclicense")} is required`,
      })
    }
    if (data.nlrc_issue_date && data.nlrc_expiry_date) {
      const expiryError = validateExpiryDate(
        data.nlrc_issue_date,
        data.nlrc_expiry_date,
        validities.nlrc_lottery
      )
      if (expiryError) return setError({ nlrclicense: expiryError })
    }
    const result = await registerPartner("nlrclicense", data)

    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) return setError({ nlrclicense: result.error })
    }
    if (result.data?.partner) {
      updatePartner(result?.data?.partner)
      const newcategory = result.data?.partner.categories.find(
        (c) => c.category_uuid === category.category_uuid
      )
      newcategory.profile_stage.nlrclicense = "1"
      const { nextstage: NextStage } = nextStage(newcategory, partner)
      console.log({ NextStage })
      return setForm(NextStage)
    }
    // const { nextstage: NextStage } = nextStage(category, partner)
    // return setForm(NextStage)
    // if (NextStage === "review") return moveToNextForm(["review", true])
    // return moveToNextForm([NextStage])
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const [selectField, setSelectField] = useState(null)
  useEffect(() => {
    removeError(selectField)
    Validate(selectField)
  }, [selectField, data])

  const handleDateChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const Validate = (field) => {
    removeError(field)
    console.log({ category })
    const error = ValidateField(field, "nlrclicense", data, category)
    if (error)
      return setError({
        [field]: error,
      })
  }
  return (
    <div
      id="onboardingform"
      className="w3-animate-opacity pb-20 w-full max-w-[492px]"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["nlrclicense"]} />}
        </div>
        <SelectInput
          id="nlrc_license_type"
          label="License type"
          value={data.nlrc_license_type}
          onChange={(e) => {
            handleFormChange(e)
            setSelectField("nlrc_license_type")
          }}
          errors={errors}
          disabled={isMasterData}
        >
          <SelectInputOption value="" label="" />
          {license_type.map((ct) => (
            <SelectInputOption
              key={ct.value}
              value={ct.value}
              label={ct.label}
            />
          ))}
        </SelectInput>
        <TextInput
          id="nlrc_license_id"
          label="NLRC License ID"
          value={data.nlrc_license_id}
          onChange={handleFormChange}
          onBlur={() => Validate("nlrc_license_id")}
          errors={errors}
          disabled={isMasterData}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="nlrc_issue_date"
              label="Issue date"
              value={data.nlrc_issue_date}
              onChange={handleDateChange}
              onBlur={() => Validate("nlrc_issue_date")}
              errors={errors}
              min={new Date(min_start_date)}
              max={yesterday}
              disabled={isMasterData}
            />
          </div>
          <div className="">
            <DatePicker
              id="nlrc_expiry_date"
              label="Expiry date"
              value={data.nlrc_expiry_date}
              onChange={handleDateChange}
              onBlur={() => Validate("nlrc_expiry_date")}
              errors={errors}
              min={tomorrow}
              max={new Date(max_end_date)}
              disabled={isMasterData}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="nlrc_file"
            doc_id="nlrc_doc"
            label="NLRC Document"
            value={data.nlrc_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={isMasterData}
          />
        </FileInputWrapper>

        {!isMasterData && (
          <div className="mt-6">
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <div className="flex items-center gap-4">
                {/* <ButtonPrev
                  onClick={() => moveToPrevForm("nlrclicense")}
                  type="button"
                  label="Back"
                  outline="yes"
                  outlinecolor="border-white"
                /> */}
                <ButtonNext
                  type="submit"
                  label={checkUpdateStatus("nlrclicense") ? "Update" : "Next"}
                />
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default NlrcLicense
