"use client"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import FormErrors from "@/app/components/FormErrors"
import ButtonNext from "@/app/components/form/ButtonNext"
import ButtonPrev from "@/app/components/form/ButtonPrev"
import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms, validities } from "@/app/modules/constants"
import {
  scrollToTop,
  validateExpiryDate,
  getValidityRange,
} from "@/app/modules/utilities"

function Indemnity() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const { category, registerPartner, checkUpdateStatus, nextStage } =
    usePartners()
  const { nextstage: NextStage } = nextStage(category)
  const { min_start_date, max_end_date, yesterday, tomorrow } =
    getValidityRange(validities.indemnity)

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    indemnity_no: "",
    indemnity_issue_date: "",
    indemnity_expiry_date: "",
    indemnity_doc: "",
  })
  const { title, subtitle, hand, required } = forms["indemnity"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

  useEffect(() => {
    if (category)
      setData({
        partner_uuid: category?.partner_uuid,
        category_uuid: category?.category_uuid,
        indemnity_no: category?.indemnity_no ?? "",
        indemnity_issue_date: category?.indemnity_issue_date ?? "",
        indemnity_expiry_date: category?.indemnity_expiry_date ?? "",
        indemnity_doc: category?.indemnity_doc ?? "",
      })
  }, [category])
  useEffect(() => {
    setForm("indemnity")
    setProcessing(false)
    scrollToTop("onboardinglayout")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    let error = false
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (category?.validation.indemnity === "r" && !!!data[field]) {
          error = true
          setError({ [field]: `${required[field]} is required` })
        }
      }
      if (error) return scrollToTop("onboardinglayout")
    }
    if (
      category?.validation.indemnity === "r" &&
      !data.indemnity_doc &&
      !data.indemnity_doc.length &&
      !data.indemnity_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({ indemnity: `Indemnity document is required` })
    }

    const expiryError = validateExpiryDate(
      data.indemnity_issue_date,
      data.indemnity_expiry_date,
      validities.indemnity
    )
    if (expiryError) return setError({ indemnity: expiryError })

    const result = await registerPartner("indemnity", data)
    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) return setError({ indemnity: result.error })
    }
    if (NextStage === "review") return moveToNextForm(["review", true])
    moveToNextForm(["indemnity"])
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
  return (
    <div
      id="onboardingform"
      className="w3-animate-opacity pb-20 w-full max-w-[492px]"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["indemnity"]} />}
        </div>
        <TextInput
          id="indemnity_no"
          label="Professional indemnity insurance number"
          value={data.indemnity_no}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="indemnity_issue_date"
              label="Issue date"
              value={data.indemnity_issue_date}
              onChange={handleDateChange}
              errors={errors}
              min={new Date(min_start_date)}
              max={yesterday}
            />
          </div>
          <div className="">
            <DatePicker
              id="indemnity_expiry_date"
              label="Expiry date"
              value={data.indemnity_expiry_date}
              onChange={handleDateChange}
              errors={errors}
              min={tomorrow}
              max={new Date(max_end_date)}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="indemnity_file"
            doc_id="indemnity_doc"
            label="Professional indemnity insurance Document"
            value={data.indemnity_doc}
            onChange={handleFormChange}
            errors={errors}
          />
        </FileInputWrapper>

        <div className="mt-6">
          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <div className="flex items-center gap-4">
              <ButtonPrev
                onClick={() => moveToPrevForm("indemnity")}
                type="button"
                label="Back"
                outline="yes"
                outlinecolor="border-white"
              />
              <ButtonNext
                type="submit"
                label={checkUpdateStatus("indemnity") ? "Update" : "Next"}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Indemnity
