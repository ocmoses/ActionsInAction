'use client'
import { useEffect, useState } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import TextInput from '@/app/components/form/TextInput'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { forms } from '@/app/modules/constants'

function SetPassword() {
  const { setForm, partnerInfo, registerPartner, processing, setProcessing } =
    useOnboardingContext()

  const [data, setData] = useState(partnerInfo)
  const { title, subtitle, hand, required } = forms['setpassword']
  const [{ errors, setErrors, setError, removeError, clearErrors }] =
    useErrors(data)

  useEffect(() => {
    if (partnerInfo) setData(partnerInfo)
    setForm('setpassword')
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
      if (data['password'].length < 8) {
        setError('password', 'Your password must be at least, 8 characters')
        return
      }
      if (data['password'] !== data['password_confirmed']) {
        setError('password_confirmed', 'Password did not match')
        return
      }
    }
    registerPartner('setpassword', data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit} className="">
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <TextInput
          id="password"
          label="Enter your password"
          type="password"
          value={data.password}
          onChange={handleFormChange}
          errors={errors}
          margin="mb-1"
        />
        <div className="mb-6 text-[#999999]">
          Must include at least 8 characters, an uppercase letter, and a number
        </div>
        <TextInput
          id="password_confirmed"
          label="Repeat your password"
          type="password"
          value={data.password_confirmed}
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
            Continue <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </form>
    </div>
  )
}

export default SetPassword
