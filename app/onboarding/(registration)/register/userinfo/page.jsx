'use client'
import { createRef, useEffect, useState } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { ArrowRightCircle } from '@/app/components/HeroIcons'
import { CountrySelector } from '@/app/components/countrycode/selector'
import { COUNTRIES } from '@/app/components/countrycode/countries'
import TextInput from '@/app/components/form/TextInput'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { RequestSuccess, RequestError } from '@/app/components/RequestResponse'

function RegisterStepUserInfo() {
  const {
    forms,
    partnerInfo,
    processing,
    setProcessing,
    setPartnerInfo,
    registerPartner,
    setRequestError,
    requestError,
    requestSuccess
  } = useOnboardingContext()
  const [data, setData] = useState(partnerInfo)
  const [errors, setErrors] = useState({})
  const { title, subtitle, hand, required } = forms['userinfo']

  useEffect(() => {
    if (partnerInfo) setData(partnerInfo)
    setProcessing(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let errorFound = false
    if (required) {
      required.map((field) => {
        if (errors[field]) errorFound = true
      })
      if (errorFound) {
        setRequestError((oldState) => [
          ...oldState,
          'Please provide required information to proceed'
        ])
        return
      }
    }

    registerPartner('userinfo')
  }
  const handleFormChange = (e) => {
    setData((initialData) => ({
      ...initialData,
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

  useEffect(() => {
    setData((initialData) => ({
      ...initialData,
      country: country,
      countrycode: countrycode
    }))
  }, [country, countrycode])

  useEffect(() => {
    if (required) {
      required.map((field) => {
        if (data[field] === '')
          setErrors((oldState) => ({ ...oldState, [field]: true }))
        else setErrors((oldState) => ({ ...oldState, [field]: false }))
      })
    }
    setPartnerInfo((oldState) => ({ ...oldState, ...data }))
  }, [data])

  return (
    <>
      <div className="w3-animate-opacity pt-24 pb-20">
        <form onSubmit={handleSubmit}>
          <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              id="first_name"
              label="First name"
              value={data.first_name}
              onChange={handleFormChange}
            />
            <TextInput
              id="last_name"
              label="Last name"
              value={data.last_name}
              onChange={handleFormChange}
            />
          </div>
          <TextInput
            id="email"
            label="Email"
            value={data.email}
            onChange={handleFormChange}
          />
          <div className="grid grid-cols-3 items-center mb-6 w-full bg-[#212121] border-1 border-[#333333] rounded-xl">
            <div className="relative ">
              <CountrySelector
                id={'countries'}
                ref={myRef}
                open={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onChange={(val) => handleCountryChange(val)}
                selectedValue={COUNTRIES.find(
                  (option) => option.value === country
                )}
              />
            </div>
            <div className="relative col-span-2 flex-1 ">
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
          <TextInput
            id="password"
            type="password"
            label="Password"
            value={data.password}
            onChange={handleFormChange}
          />
          <div className=" font-mtn-extralight text-white/70 text-start -mt-6 mb-6 p-2">
            Must include at least 8 characters, an uppercase letter, and a
            number
          </div>
          <TextInput
            id="password_confirmed"
            type="password"
            label="Repeat your password"
            value={data.password_confirmed}
            onChange={handleFormChange}
          />
          <div
            className=" text-white/70 text-start mb-12 p-2"
            style={{
              fontFamily: 'MTN Brighter Sans',
              fontStyle: 'normal',
              fontWeight: 400,
              // fontSize: '12px',
              lineHeight: '16px'
            }}
          >
            By clicking "Start Application" I agree to MTN's{' '}
            <a
              href="#"
              className=" text-white hover:text-white border-b-1 border-b-white"
            >
              Terms of Use
            </a>
            ,
            <a
              href="#"
              className=" text-white hover:text-white border-b-1 border-b- border-b-white"
            >
              Privacy Policy
            </a>{' '}
            and to receive electronic communication about my accounts and
            services per Mtn's{' '}
            <a
              href="#"
              className=" text-white hover:text-white border-b-1 border-b- border-b-white"
            >
              Electronic Communications Agreement
            </a>
            .
          </div>
          {processing ? (
            <button className="rounded-full flex justify-between items-center text-black bg-gray-600 hover:bg-white transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2">
              Start registration{' '}
              <ArrowRightCircle iconClass="w-6 h-6 ml-4 animate-spin" />
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
            >
              Start registration <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
            </button>
          )}
        </form>
      </div>
      <RequestSuccess success={requestSuccess} />
      <RequestError errors={requestError} />
    </>
  )
}

export default RegisterStepUserInfo
