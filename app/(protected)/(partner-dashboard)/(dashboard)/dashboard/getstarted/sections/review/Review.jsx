"use client"
import ReviewBox from "@/app/components/review/ReviewBox"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import { useEffect } from "react"
import { forms } from "@/app/modules/constants"
import useProcessing from "@/hooks/useProcessing"

export default function Review() {
  const { setProcessing, setForm } = useProcessing()

  const { title, subtitle, hand } = forms["review"]
  useEffect(() => {
    setForm("review")
    setProcessing(false)
  }, [])

  return (
    <div className="flex flex-col">
      <RegisterStepHeader
        title={title}
        subtitle={subtitle}
        hand={hand}
        align="center"
      />
      <ReviewBox />
    </div>
  )
}
