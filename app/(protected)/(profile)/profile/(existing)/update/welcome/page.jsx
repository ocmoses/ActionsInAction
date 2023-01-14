'use client'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { TailSpinPreloader } from '@/app/components/Icons'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Button from '@/app/components/form/Button'

export default function Welcome() {
  const { processing, setProcessing, setForm } = useOnboardingContext()
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  console.log('Welcome page')
  console.log({ path })
  useEffect(() => {
    setForm('')
    setProcessing(false)
  }, [])
  return (
    <>
      <div className="relative w3-animate-opacity pt-24 pb-20">
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
          Welcome back
          <span className="animate-bounce">👋</span>
        </h1>
        <div className="mb-16 text-center w-full p-2 mtn-h1-subtitle text-[#999999]">
          Please complete your application to get started
        </div>
        <div className="flex justify-center mt-6">
          <Button
            href={`${
              path ? '/profile/update/companyinfo/' : '/profile/category'
            }`}
            label=" Get started"
          />
        </div>
      </div>
    </>
  )
}
