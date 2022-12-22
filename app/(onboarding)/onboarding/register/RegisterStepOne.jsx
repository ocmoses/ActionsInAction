'use client'
import Image from 'next/image'
import { createRef, useEffect, useState } from 'react'
import { useOnboardingContext } from '../../../../hooks/useOnboardingContext'
import {
  ArrowRightCircle,
  ExclamationCircle
} from '../../../components/HeroIcons'
import { CountrySelector } from '../../../components/countrycode/selector'
import { COUNTRIES } from '../../../components/countrycode/countries'

function RegisterStepOne({ form, title, subtitle, required }) {
  // Local form state
  const { partnerInfo, setPartnerInfo, registerPartner } =
    useOnboardingContext()
  const [data, setData] = useState(partnerInfo)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (partnerInfo) setData(partnerInfo)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let errorFound = false
    if (required) {
      required.map((field) => {
        if (errors[field]) errorFound = true
      })
      if (errorFound) {
        console.log('errorFound')
        setErrors((oldState) => ({ ...oldState, submit: true }))
        return
      } else {
        console.log('No errorFound')
        setErrors((oldState) => ({ ...oldState, submit: false }))
      }
    }
    registerPartner('userinfo')
  }
  const handleFormChange = (e) => {
    console.log(e.target.id)
    console.log(e.target.value)
    setData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value
    }))
  }
  const handleCountryChange = (val) => {
    setCountry(val)
    setCountrycode(() => {
      const country = COUNTRIES.find((option) => option.value === val)
      console.log(country)
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
    <div className="w3-animate-opacity pt-24 pb-20">
      <form onSubmit={handleSubmit}>
        <h1 className="flex items-center gap-4 font-mtn-extrabold  text-white text-5xl">
          <span>{title}</span>
          <Image
            src="/assets/icons/yello-hand.svg"
            alt="Yello"
            priority
            width={36}
            height={36}
            className="h-auto animate-bounce"
          />
        </h1>
        <p className="font-hairline font-mtn-extralight flex-wrap text-[18px] mb-6 text-white/70">
          {subtitle}
        </p>
        {errors.submit && (
          <div className="flex gap-3 mb-4 items-center">
            <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
            <span className="text-red-400">
              Some required information are missing
            </span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 mb-6 w-full group p-2 bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="text"
              id="first_name"
              value={data.first_name}
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
              autoComplete="new-password"
            />
            <label
              htmlFor="first_name"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              First name
            </label>
            {errors.first_name && (
              <div className="absolute right-0 top-[-4px] z-10">
                <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
              </div>
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="text"
              id="last_name"
              value={data.last_name}
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
              autoComplete="new-password"
            />
            <label
              htmlFor="last_name"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              Last name
            </label>
            {errors.first_name && (
              <div className="absolute right-0 top-[-4px] z-10">
                <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
              </div>
            )}
          </div>
        </div>
        <div className="relative z-0 mb-12 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
          <input
            type="text"
            id="email"
            value={data.email}
            className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
            placeholder=" "
            onChange={handleFormChange}
            autoComplete="new-password"
          />
          <label
            htmlFor="email"
            className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
          >
            Email address
          </label>
          {errors.email && (
            <div className="absolute right-0 top-[-4px] z-10">
              <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>
        <div className="z-10 mb-12 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
          <div className="grid grid-cols-3 items-center">
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
              <input
                type="text"
                id="telephone"
                value={data.telephone}
                className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
                placeholder=" "
                onChange={handleFormChange}
                autoComplete="new-password"
              />
              <label
                htmlFor="telephone"
                className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-10px] peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
              >
                Telephone
              </label>
              {errors.telephone && (
                <div className="absolute right-0 top-[-4px] z-10">
                  <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 mb-2 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="password"
              id="password"
              value={data.password}
              autoComplete="new-password"
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
            />
            <label
              htmlFor="password"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              Password
            </label>
            {errors.password && (
              <div className="absolute right-0 top-[-4px] z-10">
                <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
              </div>
            )}
          </div>

          <div className="relative z-0 mb-2 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="text"
              id="password_confirmed"
              value={data.password_confirmed}
              autoComplete="new-password"
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
            />
            <label
              htmlFor="password_confirmed"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              Retype password
            </label>
            {errors.password_confirmed && (
              <div className="absolute right-0 top-[-4px] z-10">
                <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
              </div>
            )}
          </div>
        </div>
        <div className=" font-mtn-extralight text-white/70 text-start mb-12 p-2">
          Must include at least 8 characters, an uppercase letter, and a number
        </div>
        <div className="font-mtn-extralight text-white/70 text-start mb-12 p-2">
          By clicking "Start Application" I agree to MTN's{' '}
          <a
            href="#"
            className=" text-white hover:text-mtn-400 border-b-1 border-b-mtn"
          >
            Terms of Use
          </a>
          ,
          <a
            href="#"
            className=" text-white hover:text-mtn-400 border-b-1 border-b- border-b-mtn"
          >
            Privacy Policy
          </a>{' '}
          and to receive electronic communication about my accounts and services
          per Mtn's{' '}
          <a
            href="#"
            className=" text-white hover:text-mtn-400 border-b-1 border-b- border-b-mtn"
          >
            Electronic Communications Agreement
          </a>
          .
        </div>
        <button
          type="submit"
          className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
        >
          Start registration <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
        </button>
      </form>
    </div>
  )
}

export default RegisterStepOne
