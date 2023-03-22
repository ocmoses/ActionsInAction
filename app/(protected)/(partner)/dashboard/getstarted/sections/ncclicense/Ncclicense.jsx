"use client"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import useErrors from "@/hooks/useErrors"
import ButtonNext from "@/app/components/form/ButtonNext"
import ButtonPrev from "@/app/components/form/ButtonPrev"
import FormErrors from "@/app/components/FormErrors"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import usePartners from "@/hooks/usePartners"
import useProcessing from "@/hooks/useProcessing"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms, validities } from "@/app/modules/constants"
import {
  scrollToTop,
  validateExpiryDate,
  getValidityRange,
  ValidateField,
  fieldRequired,
  fieldName,
} from "@/app/modules/utilities"

function Ncclicense() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const { partner, category, registerPartner, checkUpdateStatus, nextStage } =
    usePartners()
  const { nextstage: NextStage } = nextStage(category, partner)
  const { min_start_date, max_end_date, yesterday, tomorrow } =
    getValidityRange(validities.ncc)

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    vas_license_id: "",
    ncc_issue_date: "",
    ncc_expiry_date: "",
    ncc_doc: {},
    ncc_file: "",
  })
  const { title, subtitle, hand, fields } = forms["ncclicense"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  const [isMasterData, setIsMasterData] = useState(false)
  useEffect(() => {
    const Category =
      partner.master &&
      partner.sections[partner.master.category_uuid]?.ncclicense &&
      category.category_uuid !== partner.master.category_uuid
        ? partner.master
        : category
    setIsMasterData(
      partner.master &&
        partner.sections[partner.master.category_uuid]?.ncclicense &&
        category.category_uuid !== partner.master.category_uuid
    )
    if (category)
      setData({
        partner_uuid: Category?.partner_uuid ?? "",
        category_uuid: category?.category_uuid ?? "",
        vas_license_id: Category?.vas_license_id ?? "",
        ncc_issue_date: Category?.ncc_issue_date ?? "",
        ncc_expiry_date: Category?.ncc_expiry_date ?? "",
        ncc_doc: Category?.ncc_doc ?? {},
        ncc_file: Category?.ncc_file ?? "",
      })
  }, [category])
  useEffect(() => {
    setForm("ncclicense")
    setProcessing(false)
    scrollToTop("onboardinglayout")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!Util.isEmpty(fields)) {
      for (const field in fields) {
        if (field !== "ncc_doc") {
          const error = ValidateField(field, "ncclicense", data, category)
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
      fieldRequired("ncc_doc", "ncclicense", category) &&
      Util.isEmpty(data.ncc_doc) &&
      !data.ncc_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        ncc_file: `${fieldName("ncc_doc", "ncclicense")} is required`,
      })
    }
    if (data.ncc_issue_date && data.ncc_expiry_date) {
      const expiryError = validateExpiryDate(
        data.ncc_issue_date,
        data.ncc_expiry_date,
        validities.ncc
      )
      if (expiryError) return setError({ ncc_issue_date: expiryError })
    }

    const result = await registerPartner("ncclicense", data)
    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) return setError({ ncclicense: result.error })
    }
    if (NextStage === "review")
      return moveToNextForm(["review", category, true])
    moveToNextForm([NextStage, category, true])
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handleDateChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const Validate = (field) => {
    removeError(field)
    const error = ValidateField(field, "ncclicense", data, category)
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
          {errors && <FormErrors error={errors["ncclicense"]} />}
        </div>
        <TextInput
          id="vas_license_id"
          label="VAS License ID"
          value={data.vas_license_id}
          onChange={handleFormChange}
          onBlur={() => Validate("vas_license_id")}
          errors={errors}
          disabled={isMasterData}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="ncc_issue_date"
              label="Issue date"
              value={data.ncc_issue_date}
              onChange={handleDateChange}
              onBlur={() => Validate("ncc_issue_date")}
              errors={errors}
              min={new Date(min_start_date)}
              max={yesterday}
              disabled={isMasterData}
            />
          </div>
          <div className="">
            <DatePicker
              id="ncc_expiry_date"
              label="Expiry date"
              value={data.ncc_expiry_date}
              onChange={handleDateChange}
              onBlur={() => Validate("ncc_expiry_date")}
              errors={errors}
              min={tomorrow}
              max={new Date(max_end_date)}
              disabled={isMasterData}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="ncc_file"
            doc_id="ncc_doc"
            label="NCC VAS License"
            value={data.ncc_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={isMasterData}
          />
        </FileInputWrapper>

        <div className="mt-6">
          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <div className="flex items-center gap-4">
              <ButtonPrev
                onClick={() => moveToPrevForm("ncclicense")}
                type="button"
                label="Back"
                outline="yes"
                outlinecolor="border-white"
              />
              <ButtonNext
                type="submit"
                label={checkUpdateStatus("ncclicense") ? "Update" : "Next"}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Ncclicense
