'use client'
import ReviewBox from '@/app/components/review/ReviewBox'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { forms } from '@/app/modules/constants'

export default function Review() {
  const { setForm, setProcessing } = useOnboardingContext()
  const { title, subtitle, hand } = forms['review']
  useEffect(() => {
    setForm('review')
    setProcessing(false)
  }, [])

  return (
    <>
      <h3 className="text-center text-[#FFCB03] uppercase ">
        One last thing...
      </h3>
      <RegisterStepHeader
        title={title}
        subtitle={subtitle}
        hand={hand}
        align="center"
      />
      <ReviewBox />
    </>
  )
}
