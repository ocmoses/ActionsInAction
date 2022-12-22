'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useOnboardingContext } from '../../../../hooks/useOnboardingContext'
import {
  ArrowRightCircle,
  ExclamationCircle
} from '../../../components/HeroIcons'

function RegisterStepOne({ form, title, subtitle, required }) {
  // Local form state
  const { roles, partnerInfo, setPartnerInfo, registerPartner } =
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
    registerPartner('companyinfo')
  }
  const handleFormChange = (e) => {
    console.log(e.target.id)
    console.log(e.target.value)
    setData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value
    }))
  }

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
        <h1 className="flex items-center gap-4 pb-3 font-mtn-extrabold  text-white text-5xl">
          {title}
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
        <div className="relative z-0 mt-6 mb-6 w-full group p-2 bg-gray-900/80 border-1 border-gray-800 rounded-xl">
          <input
            type="text"
            id="company_name"
            value={data.company_name}
            className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
            placeholder=" "
            onChange={handleFormChange}
            autoComplete="new-password"
          />
          <label
            htmlFor="company_name"
            className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
          >
            Company name
          </label>
          {errors.company_name && (
            <div className="absolute right-0 top-[-4px] z-10">
              <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>

        <div className="relative z-0 mb-12 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
          <select
            id="company_role"
            className="form-select form-select-lg
      appearance-none
      px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
            aria-label=".form-select-lg"
            // value={data.company_role}
            defaultValue={data.company_role}
            onChange={handleFormChange}
          >
            {roles.map((role) => (
              <option key={role.slug} value={role.slug}>
                {role.title}
              </option>
            ))}
          </select>

          <label
            htmlFor="company_role"
            className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-5px] peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
          >
            Your role
          </label>
          {errors.company_role && (
            <div className="absolute right-0 top-[-4px] z-10">
              <ExclamationCircle iconClass="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>
        <div className="font-mtn-extralight text-[#999999] text-start mb-8 p-2">
          By clicking on the continue button below, I acknowledge that I'm
          legally authorised to enter into this agreement on the company’'
          behalf.
        </div>
        <button
          type="submit"
          className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
        >
          Continue <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
        </button>
      </form>
    </div>
  )
}

export default RegisterStepOne
