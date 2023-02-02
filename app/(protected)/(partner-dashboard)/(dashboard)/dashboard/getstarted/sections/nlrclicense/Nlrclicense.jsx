"use client"
import TextInput from "@/app/components/form/TextInput"
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
import { forms } from "@/app/modules/constants"
import { scrollToTop } from "@/app/modules/utilities"

function NlrcLicense() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const { partner, registerPartner } = usePartners()

  const [data, setData] = useState({
    nlrc_license_id: "",
    nlrc_issue_date: "",
    nlrc_expiry_date: "",
    nlrc_doc: "",
  })
  const { title, subtitle, hand, required } = forms["nlrclicense"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partner?.category)
      setData({
        nlrc_license_id: partner?.category?.nlrc_license_id ?? "",
        nlrc_issue_date: partner?.category?.nlrc_issue_date ?? "",
        nlrc_expiry_date: partner?.category?.nlrc_expiry_date ?? "",
        nlrc_doc: partner?.category?.nlrc_doc ?? "",
      })
  }, [partner?.category])
  useEffect(() => {
    setForm("nlrclicense")
    setProcessing(false)
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
    }
    const result = await registerPartner("nlrclicense", data)
    console.log({ result })
    if (result) {
      scrollToTop()
      if (result?.error) return setError({ nlrclicense: result.error })
    }
    moveToNextForm(["nlrclicense"])
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
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["nlrclicense"]} />}
        </div>
        <TextInput
          id="nlrc_license_id"
          label="NLRC License ID"
          value={data.nlrc_license_id}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="nlrc_issue_date"
              label="Issue date"
              value={data.nlrc_issue_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="nlrc_expiry_date"
              label="Expiry date"
              value={data.nlrc_expiry_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="nlrc_doc"
            label="NLRC Document"
            value={data.nlrc_doc}
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
                onClick={() => moveToPrevForm("nlrclicense")}
                type="button"
                label="Next"
                outline="yes"
                outlineColor="border-white"
              />
              <ButtonNext type="submit" label="Next" />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default NlrcLicense
