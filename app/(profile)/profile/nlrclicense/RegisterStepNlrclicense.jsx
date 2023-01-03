'use client'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import TextInput from '@/app/components/form/TextInput'
import FileInput from '@/app/components/form/FileInput'
import DatePicker from '@/app/components/form/DatePicker'
import FileInputWrapper from '@/app/components/form/FileInputWrapper'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'

function RegisterStepNlrcLicense() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const [data, setData] = useState(partnerInfo)
  const { title, subtitle, hand, required } = forms['nlrclicense']
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo) setData(partnerInfo)
    setForm('nlrclicense')
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
    registerPartner('nlrclicense', data)
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
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <TextInput
          id="nlrc_license_id"
          label="NLRC License ID"
          value={data.nlrc_license_id}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-6 items-center w-full">
          <div className="">
            <DatePicker
              id="nlrc_issue_date"
              label="Issue date"
              value={data.nlrc_issue_date}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="nlrc_expiry_date"
              label="Expiry date"
              value={data.nlrc_expiry_date}
              onChange={handleFormChange}
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

export default RegisterStepNlrcLicense
