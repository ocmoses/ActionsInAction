'use client'
import { createRef, useEffect, useState } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import TextInput from '@/app/components/form/TextInput'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'

function ExistingPartner() {
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
    <div className="w3-animate-opacity flex justify-center items-center  pb-20 w-full max-w-[520px]">
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
          <button
            type="submit"
            className="rounded-full mt-12 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Send confirmation email{' '}
            <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </form>
    </div>
  )
}

export default ExistingPartner
