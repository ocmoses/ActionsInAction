"use client"
import ReviewBox from "@/app/components/review/ReviewBox"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import { useEffect } from "react"
import { forms } from "@/app/modules/constants"
import { useStoreState, useStoreActions } from "easy-peasy"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"

export default function Review() {
  const actions = useStoreActions((action) => action)
  const state = useStoreState((state) => state)
  const { setForm } = actions.forms
  const {
    users: user,
    forms: { form },
  } = state

  const { setProcessing } = useOnboardingContext()
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
