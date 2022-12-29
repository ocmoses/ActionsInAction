'use client'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import SelectInput from '@/app/components/form/SelectInput'
import TextInput from '@/app/components/form/TextInput'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { COUNTRIES } from '../../../modules/countries'
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

  const {
    forms,
    partnerInfo,
    setPartner,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const [data, setData] = useState(partnerInfo)
  const { title, subtitle, hand, required } = forms['compliance']
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

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
    registerPartner('compliance', data)
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
          id="rc_no"
          label="RC Number"
          value={data.rc_no}
          onChange={handleFormChange}
          errors={errors}
        />
        <TextInput
          id="tin"
          label="Tax identification number"
          value={data.company_address}
          onChange={handleFormChange}
          errors={errors}
        />

        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <button
            type="submit"
            className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Next <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </form>
    </div>
  )
}

export default RegisterStepCompliancePage
