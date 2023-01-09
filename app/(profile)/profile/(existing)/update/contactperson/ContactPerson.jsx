'use client'
import { createRef, useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import TextInput from '@/app/components/form/TextInput'
import { CountrySelector } from '@/app/components/countrycode/selector'
import { COUNTRIES } from '@/app/components/countrycode/countries'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'

function ContactPerson() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()

  const { title, subtitle, hand, required } = forms['contactperson']
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    countrycode: '',
    telephone: ''
  })
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        first_name: partnerInfo.first_name ?? '',
        last_name: partnerInfo.last_name ?? '',
        email: partnerInfo.email ?? '',
        countrycode: partnerInfo.countrycode ?? '',
        telephone: partnerInfo.telephone ?? ''
      })
  }, [partnerInfo])
  useEffect(() => {
    setForm('contactperson')
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

    registerPartner('contactperson', data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const handleCountryChange = (val) => {
    setCountry(val)
    setCountrycode(() => {
      const country = COUNTRIES.find((option) => option.value === val)
      return country.code
    })
  }
  const myRef = createRef()
  const [isOpen, setIsOpen] = useState(false)
  const [country, setCountry] = useState(partnerInfo.country)
  const [countrycode, setCountrycode] = useState(partnerInfo.countrycode)
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[520px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <TextInput
            id="first_name"
            label="First name"
            value={data.first_name}
            onChange={handleFormChange}
            errors={errors}
          />
          <TextInput
            id="last_name"
            label="Last name"
            value={data.last_name}
            onChange={handleFormChange}
            errors={errors}
          />
        </div>
        <TextInput
          id="email"
          label="Email"
          value={data.email}
          onChange={handleFormChange}
          errors={errors}
        />
        <div className="flex justify-start items-center mb-0 w-full bg-[#212121] border-1 border-[#333333] rounded-xl">
          <div className=" ">
            <CountrySelector
              id={'countries'}
              ref={myRef}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={(val) => handleCountryChange(val)}
              selectedValue={COUNTRIES.find(
                (option) => option.value === country
              )}
              errors={errors}
            />
          </div>
          <div className=" flex-1 ">
            <TextInput
              id="telephone"
              label="Telephone"
              value={data.telephone}
              onChange={handleFormChange}
              border="border-0"
              bg="bg-transparent"
              margin="mb-0"
            />
          </div>
        </div>
        <div className="mb-6">
          {errors && typeof errors['telephone'] !== 'undefined' && (
            <div className="text-sm text-red-600 mt-2">
              {errors['telephone']}
            </div>
          )}
        </div>
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

export default ContactPerson
