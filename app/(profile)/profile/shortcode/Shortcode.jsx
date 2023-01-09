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

function Shortcode() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const [data, setData] = useState({
    shortcode: '',
    shortcode_issue_date: '',
    shortcode_expiry_date: '',
    shortcode_price_issue_date: '',
    shortcode_price_expiry_date: '',
    shortcode_doc: '',
    shortcode_approval_doc: ''
  })
  const { title, subtitle, hand, required } = forms['shortcode']
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        shortcode: partnerInfo.shortcode ?? '',
        shortcode_issue_date: partnerInfo.shortcode_issue_date ?? '',
        shortcode_expiry_date: partnerInfo.shortcode_expiry_date ?? '',
        shortcode_price_issue_date:
          partnerInfo.shortcode_price_issue_date ?? '',
        shortcode_price_expiry_date:
          partnerInfo.shortcode_price_expiry_date ?? '',
        shortcode_doc: partnerInfo.shortcode_doc ?? '',
        shortcode_approval_doc: partnerInfo.shortcode_approval_doc ?? ''
      })
  }, [partnerInfo])
  useEffect(() => {
    setForm('shortcode')
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
    const result = await registerPartner('shortcode', data)
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
          id="shortcode"
          label="Short code"
          value={data.shortcode}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="shortcode_issue_date"
              label="Issue date"
              value={data.shortcode_issue_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
          <div className=" ">
            <DatePicker
              id="shortcode_expiry_date"
              label="Expiry date"
              value={data.shortcode_expiry_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="shortcode_price_issue_date"
              label="Princing Issue date"
              value={data.shortcode_price_issue_date}
              onChange={handleDateChange}
              errors={errors}
            />
          </div>
          <div className="">
            <DatePicker
              id="shortcode_price_expiry_date"
              label="Pricing Expiry date"
              value={data.shortcode_price_expiry_date}
              onChange={handleDateChange}
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

export default Shortcode
