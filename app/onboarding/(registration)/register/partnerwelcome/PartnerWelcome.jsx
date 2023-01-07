'use client'
import { useEffect, useState } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { TailSpinPreloader } from '@/app/components/Icons'
import TextInput from '@/app/components/form/TextInput'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import Button from '@/app/components/form/Button'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'

export default function PartnerWelcome() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const [data, setData] = useState(partnerInfo)
  const { title, subtitle, hand, required } = forms['partnerwelcome']
  const [{ errors, setErrors, setError, removeError, clearErrors }] =
    useErrors(data)

  useEffect(() => {
    if (partnerInfo) setData(partnerInfo)
    setForm('partnerwelcome')
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
    registerPartner('partnerwelcome', data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="w3-animate-opacity flex justify-center items-center   pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit} className="">
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <TextInput
          id="partnerid"
          label="Enter partner ID or Email"
          value={data.partnerid}
          onChange={handleFormChange}
          errors={errors}
        />
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button label="Send confirmation email" />
        )}
      </form>
    </div>
  )
}
