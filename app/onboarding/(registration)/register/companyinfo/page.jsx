'use client'
import { useEffect, useState } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import SelectInput from '@/app/components/form/SelectInput'
import TextInput from '@/app/components/form/TextInput'
import { ArrowRightCircle } from '@/app/components/HeroIcons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { Util } from '@/utils/utility'

function RegisterStepCompanyInfo() {
  const {
    forms,
    roles,
    partnerInfo,
    registerPartner,
    SetError,
    ClearErrors,
    processing,
    setProcessing
  } = useOnboardingContext()
  const [data, setData] = useState(partnerInfo)
  const { title, subtitle, hand, required } = forms['companyinfo']

  const handleSubmit = (e) => {
    e.preventDefault()
    ClearErrors()
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!!!data[field]) {
          SetError(`${required[field]} is required`)
          return
        }
      }
    }
    registerPartner('companyinfo', data)
  }
  const handleFormChange = (e) => {
    setData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value
    }))
  }
  useEffect(() => {
    setProcessing(false)
  }, [])

  return (
    <>
      <div className="relative w3-animate-opacity pt-24 pb-20">
        <form onSubmit={handleSubmit}>
          <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
          <TextInput
            id="company_name"
            label="Company name"
            value={data.company_name}
            onChange={handleFormChange}
          />
          <SelectInput
            id="company_role"
            label="Company role"
            value={data.company_role}
            onChange={handleFormChange}
          >
            {roles.map((role) => (
              <option key={role.slug} value={role.slug}>
                {role.title}
              </option>
            ))}
          </SelectInput>
          <div className="font-mtn-extralight text-[#999999] text-start mb-8 p-2">
            By clicking on the continue button below, I acknowledge that I'm
            legally authorised to enter into this agreement on the company’'
            behalf.
          </div>

          {processing ? (
            <button className="rounded-full flex justify-between items-center text-black bg-gray-600 hover:bg-white transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2">
              Continue{' '}
              <ArrowRightCircle iconClass="w-6 h-6 ml-4 animate-spin" />
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
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
