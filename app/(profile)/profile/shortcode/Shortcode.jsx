"use client"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import { Util } from "@/utils/utility"
import useErrors from "@/hooks/useErrors"
import { ArrowRightCircle, TailSpinPreloader } from "@/app/components/Icons"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"

function Shortcode() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing,
  } = useOnboardingContext()

  const [data, setData] = useState({
    shortcode: "",
    shortcode_issue_date: "",
    shortcode_expiry_date: "",
    shortcode_price_issue_date: "",
    shortcode_price_expiry_date: "",
    shortcode_doc: "",
    shortcode_approval_doc: "",
  })
  const { title, subtitle, hand, required } = forms["shortcode"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        shortcode: partnerInfo.shortcode ?? "",
        shortcode_issue_date: partnerInfo.shortcode_issue_date ?? "",
        shortcode_expiry_date: partnerInfo.shortcode_expiry_date ?? "",
        shortcode_price_issue_date:
          partnerInfo.shortcode_price_issue_date ?? "",
        shortcode_price_expiry_date:
          partnerInfo.shortcode_price_expiry_date ?? "",
        shortcode_doc: partnerInfo.shortcode_doc ?? "",
        shortcode_approval_doc: partnerInfo.shortcode_approval_doc ?? "",
      })
    setForm("shortcode")
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
    registerPartner("shortcode", data)
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
        <TextInput
          id="shortcode"
          label="Short code"
          value={data.shortcode}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-6 items-center w-full">
          <div className="">
            <DatePicker
              id="shortcode_issue_date"
              label="Issue date"
              value={data.shortcode_issue_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className=" ">
            <DatePicker
              id="shortcode_expiry_date"
              label="Expiry date"
              value={data.shortcode_expiry_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 items-center w-full">
          <div className="">
            <DatePicker
              id="shortcode_price_issue_date"
              label="Princing Issue date"
              value={data.shortcode_price_issue_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="shortcode_price_expiry_date"
              label="Pricing Expiry date"
              value={data.shortcode_price_expiry_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="shortcode_doc"
            label="Short code document"
            value={data.shortcode_doc}
            onChange={handleFormChange}
            errors={errors}
          />
          <FileInput
            id="shortcode_approval_doc"
            label="NCC Pricing approval"
            value={data.shortcode_approval_doc}
            onChange={handleFormChange}
            errors={errors}
          />
        </FileInputWrapper>

        {processing ? (
          <TailSpinPreloader
            width={40}
            iconClass="mt-6"
            height={40}
            fill="#efb703"
          />
        ) : (
          <button
            type="submit"
            className="rounded-full mt-12 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Next <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </form>
    </div>
  )
}

export default Shortcode
