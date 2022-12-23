'use client'
import Image from 'next/image'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import MailOpened from '~/assets/icons/mail-opened.svg'
import { RequestSuccess, RequestError } from '@/app/components/RequestResponse'
import { Util } from '@/utils/utility'

function Validate() {
  const { requestError, partnerInfo, requestSuccess, processing, resendEmail } =
    useOnboardingContext()
  const email = partnerInfo.email
  return (
    <>
      <div className="relative w3-animate-opacity pt-24 pb-20">
        {processing && (
          <div className="absolute z-50 top-0 right-0 bottom-0 left-0 bg-transparent"></div>
        )}

        <div className="flex justify-center mb-8">
          <Image src={MailOpened} priority width={72} height={72} alt="" />
        </div>
        <h1 className="flex justify-center font-mtn-extrabold text-center text-white text-5xl">
          Check your email
        </h1>
        {email && (
          <div className="flex justify-center text-gray-500 text-2xl mb-2">
            {Util.obscureEmail(email)}
          </div>
        )}

        <div className="font-mtn-extralight text-center text-white/70 mb-116 p-2">
          A confirmation email has been sent to your email address. Check your
          inbox and follow the instructions to get started.
        </div>

        {email !== '' && (
          <div className="font-mtn-extralight text-center text-white/70 mb-116 p-2">
            Didn't receive our email?{' '}
            <span
              className="cursor-pointer text-lg text-white hover:text-gray-300"
              onClick={() => resendEmail(email)}
            >
              Resend email
            </span>
          </div>
        )}
      </div>
      <RequestSuccess success={requestSuccess} />
      <RequestError errors={requestError} />
    </>
  )
}

export default Validate
