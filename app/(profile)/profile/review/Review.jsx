"use client"
import ReviewBox from "@/app/components/review/ReviewBox"
import { useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"

export default function Review() {
  const { forms, setForm, setProcessing } = useOnboardingContext()
  const { title, subtitle, hand } = forms["review"]
  useEffect(() => {
    setForm("review")
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
