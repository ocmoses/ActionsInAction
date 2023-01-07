"use client"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import { Util } from "@/utils/utility"
import useErrors from "@/hooks/useErrors"
import { TailSpinPreloader } from "@/app/components/Icons"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import Button from "@/app/components/form/Button"

function Ncclicense() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing,
  } = useOnboardingContext()

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
    setForm("ncclicense")
    setProcessing(false)
  }, [])

  const handleSubmit = (e) => {
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
    registerPartner("ncclicense", data)
  }
  const handleFormChange = (e) => {
    console.log("e.target.id", e.target.id)
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
        <TextInput
          id="vas_license_id"
          label="VAS License ID"
          value={data.vas_license_id}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-6 items-center w-full">
          <div className="">
            <DatePicker
              id="ncc_issue_date"
              label="Issue date"
              value={data.ncc_issue_date}
              onChange={() => {}}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="ncc_expiry_date"
              label="Expiry date"
              value={data.ncc_expiry_date}
              onChange={() => {}}
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
