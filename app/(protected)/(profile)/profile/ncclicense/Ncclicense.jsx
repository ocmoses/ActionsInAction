"use client"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import useErrors from "@/hooks/useErrors"
import Button from "@/app/components/form/Button"
import FormErrors from "@/app/components/FormErrors"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"
import useProcessing from "@/hooks/useProcessing"

function Ncclicense() {
  const { processing, setProcessing, setForm } = useProcessing()
  const { partnerInfo, registerPartner } = useOnboardingContext()

  const [data, setData] = useState({
    vas_license_id: "",
    ncc_issue_date: "",
    ncc_expiry_date: "",
    ncc_doc: "",
  })
  const { title, subtitle, hand, required } = forms["ncclicense"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        vas_license_id: partnerInfo.vas_license_id ?? "",
        ncc_issue_date: partnerInfo.ncc_issue_date ?? "",
        ncc_expiry_date: partnerInfo.ncc_expiry_date ?? "",
        ncc_doc: partnerInfo.ncc_doc ?? "",
      })
  }, [partnerInfo])
  useEffect(() => {
    setForm("ncclicense")
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
          setError(field, `${required[field]} is required`)
        }
      }
      if (error) return
    }
    const result = await registerPartner("ncclicense", data)
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
          {errors && <FormErrors error={errors["global"]} />}
        </div>
        <TextInput
          id="vas_license_id"
          label="VAS License ID"
          value={data.vas_license_id}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="ncc_issue_date"
              label="Issue date"
              value={data.ncc_issue_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="ncc_expiry_date"
              label="Expiry date"
              value={data.ncc_expiry_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="ncc_doc"
            label="NCC VAS License"
            value={data.ncc_doc}
            onChange={handleFormChange}
            errors={errors}
          />
        </FileInputWrapper>

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

export default Ncclicense
