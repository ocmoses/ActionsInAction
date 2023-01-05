"use client"
import { useEffect, useState } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import TextInput from "@/app/components/form/TextInput"
import { ArrowRightCircle, TailSpinPreloader } from "@/app/components/Icons"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import { Util } from "@/utils/utility"
import useErrors from "@/hooks/useErrors"

function RegisterStepCompanyInfo() {
  const {
    forms,
    setForm,
    roles,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing,
  } = useOnboardingContext()
  const [data, setData] = useState({
    company_name: "",
    company_role: "",
  })
  const { title, subtitle, hand, required } = forms["companyinfo"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

  useEffect(() => {
    if (partnerInfo)
      setData({
        company_name: "",
        company_role: "",
      })
    setForm("companyinfo")
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
    registerPartner("companyinfo", data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <>
      <div className="w3-animate-opacity pb-20 w-full max-w-[607px]">
        <form onSubmit={handleSubmit}>
          <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
          <TextInput
            id="company_name"
            label="Company name"
            value={data.company_name}
            onChange={handleFormChange}
            errors={errors}
          />
          <SelectInput
            id="company_role"
            label="Company role"
            value={data.company_role}
            onChange={handleFormChange}
            errors={errors}
          >
            <SelectInputOption value="" label="" />
            {roles.map((role) => (
              <SelectInputOption
                key={role.slug}
                value={role.slug}
                label={role.title}
              />
            ))}
          </SelectInput>
          <div className="font-mtn-extralight text-[#999999] text-start mb-8 p-2">
            By clicking on the continue button below, I acknowledge that I'm
            legally authorised to enter into this agreement on the company’'
            behalf.
          </div>

          {processing ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <button
              type="submit"
              className="rounded-full mt-12 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
            >
              Continue <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default RegisterStepCompanyInfo
