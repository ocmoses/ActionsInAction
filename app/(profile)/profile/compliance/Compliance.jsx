"use client"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"

import TextInput from "@/app/components/form/TextInput"
import { Util } from "@/utils/utility"
import useErrors from "@/hooks/useErrors"

import { ArrowRightCircle, TailSpinPreloader } from "@/app/components/Icons"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import FileInput from "@/app/components/form/FileInput"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"

function Compliance() {
  const {
    forms,
    setForm,
    partnerInfo,
    setPartner,
    registerPartner,
    processing,
    setProcessing,
  } = useOnboardingContext()

  const [data, setData] = useState({
    rc_no: "",
    tin_no: "",
    tin_doc: "",
    memart_doc: "",
    cac_doc: "",
  })
  const { title, subtitle, hand, required } = forms["compliance"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        rc_no: partnerInfo.rc_no ?? "",
        tin_no: partnerInfo.tin_no ?? "",
        tin_doc: partnerInfo.tin_doc ?? "",
        memart_doc: partnerInfo.memart_doc ?? "",
        cac_doc: partnerInfo.cac_doc ?? "",
      })
    setForm("compliance")
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
    registerPartner("compliance", data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[607px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <TextInput
          id="rc_no"
          label="RC Number"
          value={data.rc_no}
          onChange={handleFormChange}
          errors={errors}
        />
        <TextInput
          id="tin_no"
          label="Tax identification number"
          value={data.tin_no}
          onChange={handleFormChange}
          errors={errors}
        />
        <FileInputWrapper>
          <FileInput
            id="tin_doc"
            label="TIN Document"
            value={data.tin_doc}
            onChange={handleFormChange}
            errors={errors}
          />
          <FileInput
            id="memart_doc"
            label="Memart certificate"
            value={data.memart_doc}
            onChange={handleFormChange}
            errors={errors}
          />
          <FileInput
            id="cac_doc"
            label="CAC Registration Certificate"
            value={data.cac_doc}
            onChange={handleFormChange}
            errors={errors}
          />
        </FileInputWrapper>
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
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

export default Compliance
