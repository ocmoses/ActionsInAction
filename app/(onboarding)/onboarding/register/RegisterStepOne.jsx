'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useOnboardingContext } from '../../../../utils/OnboardingContext'
import { ArrowRightCircle } from '../../../components/HeroIcons'

function RegisterStepOne() {
  // Local form state
  const { partnerInfo, updatePartnerInfo } = useOnboardingContext()
  const [data, setData] = useState(partnerInfo)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted')
    console.log(data)
    updatePartnerInfo(data)
  }
  const handleFormChange = (e) => {
    setData((initialData) => ({
      ...initialData,
      [e.target.id]: e.target.value
    }))
    console.log('handleFormChange')
    console.log(data)
  }
  console.log('Here')
  return (
    <div className="w3-animate-opacity pt-24 pb-20">
      <form onSubmit={handleSubmit}>
        <h1 className="flex items-center gap-4 font-mtn-extrabold  text-white text-5xl">
          <span>Get started</span>
          <Image
            src="/assets/icons/yello-hand.svg"
            alt="Yello"
            priority
            width={36}
            height={36}
            className="h-auto animate-bounce"
          />
        </h1>
        <p className="font-hairline font-mtn-extralight flex-wrap text-[18px] mb-16 text-white/70">
          it'll only take a few minutes
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 mb-6 w-full group p-2 bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="text"
              id="firstName"
              value={data.firstName}
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
              autoComplete="new-password"
            />
            <label
              htmlFor="firstName"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="text"
              id="lastName"
              value={data.lastName}
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
              autoComplete="new-password"
            />
            <label
              htmlFor="lastName"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              Last name
            </label>
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
          </div>

          <div className="relative z-0 mb-2 w-full group p-2  bg-gray-900/80 border-1 border-gray-800 rounded-xl">
            <input
              type="text"
              id="repassword"
              value={data.repassword}
              autoComplete="new-password"
              className="block px-4 pb-2.5 pt-4 w-full text-xl text-gray-200 bg-transparent rounded-lg border-0 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-gray-100 focus:outline-none focus:ring-1 focus:ring-mtn focus:border-gray-300 peer"
              placeholder=" "
              onChange={handleFormChange}
            />
            <label
              htmlFor="repassword"
              className="absolute text-lg text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-4 scale-130 top-1 z-10 origin-[0] bg-grey-700 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-700 peer-placeholder-shown:scale-140 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-130 peer-focus:-translate-y-5 left-1"
            >
              Retype password
            </label>
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
