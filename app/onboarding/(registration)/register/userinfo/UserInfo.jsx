'use client'
import { createRef, useEffect, useState } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { TailSpinPreloader } from '@/app/components/Icons'
import FormErrors from '@/app/components/FormErrors'
import { getSession, useSession } from 'next-auth/react'
import Button from '@/app/components/form/Button'
import { CountrySelector } from '@/app/components/countrycode/selector'
import { COUNTRIES } from '@/app/components/countrycode/countries'
import TextInput from '@/app/components/form/TextInput'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { Util } from '@/utils/utility'
import useErrors from '@/hooks/useErrors'
import { useRouter } from 'next/navigation'

function UserInfo() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing
  } = useOnboardingContext()
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    countrycode: '234',
    country: 'NG',
    telephone: '',
    password: '',
    password_confirmed: ''
  })
  const { title, subtitle, hand, required } = forms['userinfo']
  const [{ errors, setErrors, setError, removeError, clearErrors }] =
    useErrors(data)
  const [navigate, setNavigate] = useState(false)
  const router = useRouter()
  const [session, setSession] = useState(null)
  useEffect(() => {
    if (partnerInfo)
      setData({
        first_name: partnerInfo.first_name ?? '',
        last_name: partnerInfo.last_name ?? '',
        email: partnerInfo.email ?? '',
        countrycode: partnerInfo.countrycode ?? '234',
        country: partnerInfo.country ?? 'NG',
        telephone: partnerInfo.telephone ?? '',
        password: '',
        password_confirmed: ''
      })
  }, [partnerInfo])
  useEffect(() => {
    setForm('userinfo')
    setProcessing(false)
    setNavigate(false)
  })
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

  const handleSubmit = async (e) => {
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
    if (data['password'].length < 8) {
      setError('password', 'Your password must be at least, 8 characters')
      return
    }
    if (data['password'] !== data['password_confirmed']) {
      setError('password_confirmed', 'Password did not match')
      return
    }
    if (!Util.validateEmail(data['email'])) {
      setError('email', 'Your email address is not valid')
      return
    }
    const result = await registerPartner('userinfo', data, setError)
    if (result) {
      if (result?.error) return setError('login', result.error)
    }
    setNavigate(true)
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
  const [country, setCountry] = useState(partnerInfo.country ?? 'NG')
  const [countrycode, setCountrycode] = useState(
    partnerInfo.countrycode ?? '234'
  )

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      country: country,
      countrycode: countrycode
    }))
  }, [country, countrycode])

  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors['login']} />}
        </div>
        {session?.user && (
          <TailSpinPreloader width={120} height={120} fill="#efb703" />
        )}
        {navigate ? (
          <TailSpinPreloader width={80} height={80} fill="#efb703" />
        ) : (
          !session?.user && (
            <>
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
                {errors && <FormErrors error={errors['telephone']} />}
              </div>
              <TextInput
                id="password"
                type="password"
                label="Password"
                value={data.password}
                onChange={handleFormChange}
                errors={errors}
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
                errors={errors}
              />
              <div
                className=" text-white/70 text-start mb-12 p-2"
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
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
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              ) : (
                <Button label="Start registration" />
              )}
            </>
          )
        )}
      </form>
    </div>
  )
}

export default UserInfo
