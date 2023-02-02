"use client"
import ReviewBox from "@/app/components/review/ReviewBox"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import { useEffect } from "react"
import { forms } from "@/app/modules/constants"
import { useStoreState, useStoreActions } from "easy-peasy"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import useProcessing from "@/hooks/useProcessing"

export default function Review() {
  const { setProcessing, setForm } = useProcessing()

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
