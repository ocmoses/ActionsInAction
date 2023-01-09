'use client'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import TextInput from '@/app/components/form/TextInput'
import FileInput from '@/app/components/form/FileInput'
import DatePicker from '@/app/components/form/DatePicker'
import FileInputWrapper from '@/app/components/form/FileInputWrapper'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { TailSpinPreloader } from '@/app/components/Icons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import Button from '@/app/components/form/Button'
import FormErrors from '@/app/components/FormErrors'

function Indemnity() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const [data, setData] = useState({
    indemnity_no: '',
    indemnity_issue_date: '',
    indemnity_expiry_date: '',
    indemnity_doc: ''
  })
  const { title, subtitle, hand, required } = forms['indemnity']
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        indemnity_no: partnerInfo.indemnity_no ?? '',
        indemnity_issue_date: partnerInfo.indemnity_issue_date ?? '',
        indemnity_expiry_date: partnerInfo.indemnity_expiry_date ?? '',
        indemnity_doc: partnerInfo.indemnity_doc ?? ''
      })
    setForm('indemnity')
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
    const result = await registerPartner('indemnity', data)
    if (result) {
      if (result?.error) setError('global', result.error)
    }
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const handleDateChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors['global']} />}
        </div>
        <TextInput
          id="indemnity_no"
          label="Professional indemnity insurance number"
          value={data.indemnity_no}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="indemnity_issue_date"
              label="Issue date"
              value={data.indemnity_issue_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="indemnity_expiry_date"
              label="Expiry date"
              value={data.indemnity_expiry_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="indemnity_doc"
            label="Professional indemnity insurance Document"
            value={data.indemnity_doc}
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

export default Indemnity
