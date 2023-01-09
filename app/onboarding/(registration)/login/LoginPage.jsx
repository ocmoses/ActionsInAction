'use client'
import Image from 'next/image'
import Link from 'next/link'
import TextInput from '@/app/components/form/TextInput'
import { TailSpinPreloader } from '@/app/components/Icons'
import Button from '@/app/components/form/Button'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import useErrors from '@/hooks/useErrors'
import { useRouter } from 'next/navigation'
import FormErrors from '@/app/components/FormErrors'
import { getSession, useSession } from 'next-auth/react'

function Login() {
  const { processing, setProcessing, LoginUser } = useOnboardingContext()
  const [data, setData] = useState({
    partnerid: process.env.NODE_ENV === 'production' ? '' : '234218728',
    password: process.env.NODE_ENV === 'production' ? '' : 'Todoo45@222'
  })
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  const router = useRouter()
  const [session, setSession] = useState(null)

  useEffect(() => {
    setProcessing(false)
  }, [])

  useEffect(() => {
    const getSess = async () => {
      const Sess = await getSession()
      setSession(Sess)
      if (Sess?.user) {
        router.push('/')
      }
    }
    getSess()
  }, [])

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
      return setError('partnerid', `Please enter your Partner ID`)
    }
    if (!data.password) {
      return setError('password', `Please enter your password`)
    }
    const result = await LoginUser(data, false)
    if (result.error) return setError('login', result.error)

    const url = {
      userinfo: `/onboarding/register/userinfo`,
      companyinfo: `/onboarding/register/companyinfo`,
      category: `/profile/category`,
      companydetail: `/profile/companydetail`,
      compliance: `/profile/compliance`,
      ncclicense: `/profile/ncclicense`,
      nlrclicense: `/profile/nlrclicense`,
      shortcode: `/profile/shortcode`,
      indemnity: `/profile/indemnity`,
      accountinfo: `/profile/accountinfo`,
      dashboard: `/dashboard`
    }
    router.replace(`${url[result.nextstage]}`)
    return
  }

  return (
    <form method="POST" onSubmit={handleLogin}>
      <div className="w3-animate-opacity pb-20 pt-[15vh] w-full max-w-[607px]">
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
        <div className="mb-6">
          {errors && <FormErrors error={errors['login']} />}
        </div>
        {session?.user && (
          <TailSpinPreloader width={120} height={120} fill="#efb703" />
        )}
        {!session?.user && (
          <>
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
              className="inline-flex font-mtn-extralight  text-white text-start px-0 pb-1 mb-6"
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
              <Button label="Continue" />
            )}
          </>
        )}
      </div>
    </form>
  )
}

export default Login
