'use client'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import SelectInput from '@/app/components/form/SelectInput'
import TextInput from '@/app/components/form/TextInput'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { COUNTRIES } from '@/app/modules/countries'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'

function CompanyInfo() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const { title, subtitle, hand, required } = forms['confirmcompanyinfo']
  const [data, setData] = useState(partnerInfo)
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo) setData(partnerInfo)
    setForm('confirmcompanyinfo')
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

    registerPartner('confirmcompanyinfo', data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[520px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <TextInput
          id="company_name"
          label="Company name"
          value={data.company_name}
          onChange={handleFormChange}
          errors={errors}
        />
        <SelectInput
          id="country"
          label="Select Country"
          value={data.country}
          onChange={handleFormChange}
          errors={errors}
        >
          {COUNTRIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.title}
            </option>
          ))}
        </SelectInput>

        <TextInput
          id="company_address"
          label="Company address"
          value={data.company_address}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-6 justify-start w-full">
          <div className="relative ">
            <TextInput
              id="company_city"
              label="City"
              value={data.company_city}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className="relative ">
            <SelectInput
              id="company_state"
              label="State"
              value={data.company_state}
              onChange={handleFormChange}
              errors={errors}
            >
              <option></option>
            </SelectInput>
          </div>
        </div>
        <TextInput
          id="company_postcode"
          label="Postal code"
          value={data.company_postcode}
          onChange={handleFormChange}
          errors={errors}
        />
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

export default CompanyInfo
