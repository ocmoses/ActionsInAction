'use client'
import Image from 'next/image'
import Link from 'next/link'
import TextInput from '@/app/components/form/TextInput'
import { ArrowRightCircle } from '@/app/components/HeroIcons'
import { useState } from 'react'

function Login() {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({ partnerid: '', password: '' })
  const handleFormChange = (e) => {
    // removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <form>
      <div className="w3-animate-opacity pb-20 w-full max-w-[607px]">
        <h1 className="flex items-center gap-4 font-mtn-extrabold-italic  text-white">
          <span
            style={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '36px',
              lineHeight: '40px'
            }}
          >
            Y’ello
          </span>
          <Image
            src="/assets/icons/yello-hand.svg"
            alt="Yello"
            priority
            width={36}
            height={36}
            className="h-auto animate-bounce"
          />
        </h1>
        <p
          className="font-hairline flex-wrap mb-16"
          style={{
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#999999'
          }}
        >
          Welcome back! please enter your great details
        </p>
        <TextInput
          id="partnerid"
          label="Partner ID"
          value={data.partnerid}
          onChange={handleFormChange}
          errors={errors}
        />
        <TextInput
          id="password"
          label="Password"
          value={data.password}
          onChange={handleFormChange}
          errors={errors}
        />

        <Link
          href="#"
          className="inline-flex font-mtn-extralight  text-white text-start mb-12 px-0 pb-1"
          style={{
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            textDecorationLine: 'underline'
          }}
        >
          Forgot your password?
        </Link>

        <button className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2">
          Continue <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
        </button>
      </div>
    </form>
  )
}

export default Login
