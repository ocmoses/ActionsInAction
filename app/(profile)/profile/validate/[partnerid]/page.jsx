'use client'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { RequestSuccess, RequestError } from '@/app/components/RequestResponse'
import { useEffect } from 'react'
import { ArrowRightCircle } from '@/app/components/HeroIcons'
import { useRouter } from 'next/navigation'

function Validate({ params: { partnerid } }) {
  const { getPartner, partnerInfo, requestSuccess, requestError, processing } =
    useOnboardingContext()

  const router = useRouter()
  useEffect(() => {
    getPartner(partnerid)
  }, [partnerid])

  const continueRegistration = () => {
    router.replace('/profile/category')
  }
  return (
    <>
      <div className="relative w3-animate-opacity pt-24 pb-20">
        {processing && (
          <div className="absolute z-50 top-0 right-0 bottom-0 left-0 bg-transparent"></div>
        )}

        <div className="flex justify-center mb-[84px]">
          <div
            className="radial-progress text-2xl  text-mtn bg-[#333333] border-4 border-[#333]"
            style={{ '--value': 20, '--size': '99px', '--thickness': '12px' }}
          >
            0%
          </div>
        </div>
        <h1 className="flex justify-center gap-3 mtn-h1 text-white">
          Y'ello {partnerInfo.first_name}{' '}
          <span className="animate-bounce">👋</span>
        </h1>
        <div className="mb-16 p-2 mtn-h1-subtitle text-[#999999]">
          Please complete your application to get started
        </div>
        <div className="flex justify-center">
          <button
            onClick={continueRegistration}
            className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Get started <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        </div>
      </div>
      <RequestSuccess success={requestSuccess} />
      <RequestError errors={requestError} />
    </>
  )
}

export default Validate
