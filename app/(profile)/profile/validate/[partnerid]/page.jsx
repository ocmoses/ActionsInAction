'use client'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/form/Button'

function Validate({ params: { partnerid } }) {
  const { partnerInfo, processing } = useOnboardingContext()

  const router = useRouter()
  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div>
          {processing && (
            <TailSpinPreloader
              width={40}
              iconClass="mt-6"
              height={40}
              fill="#efb703"
            />
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
          <div className="mb-16 text-center w-full p-2 mtn-h1-subtitle text-[#999999]">
            Please complete your application to get started
          </div>
          <div className="flex justify-center">
            <div className="mt-6">
              <Button
                onClick={() => router.replace('/profile/category')}
                label="Get stated"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Validate
