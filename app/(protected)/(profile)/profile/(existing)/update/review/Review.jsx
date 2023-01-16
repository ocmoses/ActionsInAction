"use client"
import UpdateReviewBox from "@/app/components/review/UpdateReviewBox"
import { useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import { forms } from "@/app/modules/constants"
import useProcessing from "@/hooks/useProcessing"

export default function Review() {
  const { processing, setProcessing, setForm } = useProcessing()
  const { title, subtitle, hand } = forms["updatereview"]
  useEffect(() => {
    setForm("updatereview")
    setProcessing(false)
  }, [])

  return (
    <>
      <RegisterStepHeader
        title={title}
        subtitle={subtitle}
        hand={hand}
        align="center"
      />
      <UpdateReviewBox />
    </>
  )
}
