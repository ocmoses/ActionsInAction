"use client"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import FileInput from "@/app/components/form/FileInput"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import TextInput from "@/app/components/form/TextInput"
import Button from "@/app/components/form/Button"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"
import useProcessing from "@/hooks/useProcessing"

function Compliance() {
  const { processing, setProcessing, setForm } = useProcessing()
  const { partnerInfo, registerPartner } = useOnboardingContext()

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
  }, [partnerInfo])
  useEffect(() => {
    setForm("compliance")
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
    const result = await registerPartner("compliance", data)
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
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["global"]} />}
        </div>
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

export default Compliance
