'use client'
import Image from 'next/image'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import MailOpened from '~/assets/icons/mail-opened.svg'
import { Util } from '@/utils/utility'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function Validate() {
  const { setForm, partnerInfo, processing, setProcessing, resendEmail } =
    useOnboardingContext()
  useEffect(() => {
    setForm(null)
    setProcessing(false)
  }, [])

  const searchParams = useSearchParams()

  const path = searchParams.get('path')

  return (
    <>
      <div className="w3-animate-opacity pb-20 w-full max-w-[520px]">
        {processing && (
          <div className="absolute z-50 top-0 right-0 bottom-0 left-0 bg-transparent"></div>
        )}

        <div className="flex justify-center mb-8">
          <Image
            src={MailOpened}
            priority
            width={72}
            height={72}
            alt=""
            className="h-auto"
          />
        </div>
        <h1 className="flex justify-center font-mtn-extrabold text-center text-white text-5xl">
          Check your email
        </h1>

        {partnerInfo.email && (
          <div className="font-mtn-extralight text-center text-white/70 mb-116 p-2">
            A confirmation email has been sent to{' '}
            {Util.obscureEmail(partnerInfo.email)}. <br />
            Check your inbox and follow the instructions to get started.
          </div>
        )}

        {partnerInfo.email !== '' && (
          <div className="font-mtn-extralight text-center text-white/70 mb-16 p-2">
            Didn't receive our email?{' '}
            <span
              className="cursor-pointer text-lg text-white hover:text-gray-300"
              onClick={() => resendEmail(partnerInfo.email)}
            >
              Resend email
            </span>
          </div>
        )}
      </div>

      <Link
        href={`${
          path ? '/profile/update/setpassword/' : '/profile/validate/PARTNER-ID'
        }`}
        className="block w3-animate-opacity w-full font-mtn-extralight cursor-pointer text-center text-white/70 mt-[100px] p-2"
      >
        [Fake email validation. Continue to next screen]
      </Link>
    </>
  )
}

export default Validate
