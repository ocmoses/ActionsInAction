'use client'
import { signIn, useSession } from 'next-auth/react'
import { apiURL } from '@/app/modules/constants'
import Image from 'next/image'
import Link from 'next/link'
import TextInput from '@/app/components/form/TextInput'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import useErrors from '@/hooks/useErrors'

function Login() {
  const { processing, setProcessing, SetError } = useOnboardingContext()
  const [data, setData] = useState({ partnerid: '', password: '' })
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    setProcessing(false)
  }, [])
  const Login = async (data) => {
    setProcessing(true)
    const result = await signIn('credentials', {
      partnerid: data.partnerid,
      password: data.password,
      redirect: false,
      callbackUrl: '/'
    })
    setProcessing(false)
    console.log('data', data)
    console.log('result', result)
    if (!result) {
      SetError('Something went wrong')
      return
    }
    if (!result?.ok) {
      if (result.error) SetError(result.error)
      else return SetError('Something went wrong')
    }
  }

  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!data.partnerid) {
      setError('partnerid', `Please enter your Partner ID`)
      return
    }
    if (!data.password) {
      setError('password', `Please enter your password`)
      return
    }
    await Login(data)
    const session = useSession()
    console.log('session', useSession)
  }
  return (
    <form method="POST" onSubmit={handleLogin}>
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
          type="Password"
          value={data.password}
          onChange={handleFormChange}
          errors={errors}
        />

        <Link
          href="#"
          className="inline-flex font-mtn-extralight  text-white text-start px-0 pb-1"
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
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <button
            type="submit"
            className="rounded-full mt-6 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Continue <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </div>
    </form>
  )
}

export default Login
