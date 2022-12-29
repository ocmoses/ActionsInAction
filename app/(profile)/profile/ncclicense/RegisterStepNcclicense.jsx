'use client'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import TextInput from '@/app/components/form/TextInput'
import FileInput from '@/app/components/form/FileInput'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import {
  ArrowRightCircle,
  TailSpinPreloader,
  ExclamationTriangle
} from '@/app/components/HeroIcons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'

function RegisterStepCompliancePage() {
  useEffect(() => {
    // getPartner(partnerid)
    setProcessing(false)
  }, [])

  const { forms, partnerInfo, registerPartner, processing, setProcessing } =
    useOnboardingContext()

  const [data, setData] = useState(partnerInfo)
  const { title, subtitle, hand, required } = forms['ncclicense']
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

  const handleSubmit = (e) => {
    e.preventDefault()
    clearErrors()
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!!!data[field]) {
          setError(field, `${required[field]} is required`)
        }
      }
      if (!Util.isEmpty(errors)) return
    }
    registerPartner('ncclicense', data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[607px]">
      <form onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <TextInput
          id="vas_license"
          label="VAS License ID"
          value={data.vas_license}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-6 items-center w-full">
          <div className="relative ">
            <TextInput
              id="issue_date"
              label="Issue date"
              value={data.issue_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className="relative ">
            <TextInput
              id="expiry_date"
              label="Expiry date"
              value={data.expiry_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
        </div>
        <FileInput
          id="issue_date"
          label="Issue date"
          value={data.issue_date}
          onChange={handleFormChange}
          errors={errors}
        />

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
            className="rounded-full mt-6 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Next <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </form>
    </div>
  )
}

export default RegisterStepCompliancePage
