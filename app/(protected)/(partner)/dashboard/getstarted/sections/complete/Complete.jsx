"use client"
import Image from "next/image"
import { useEffect } from "react"
import Button from "@/app/components/form/Button"
import useProcessing from "@/hooks/useProcessing"
import { scrollToTop } from "@/app/modules/utilities"

export default function Complete({ setIsOnboarding, setTmpCat }) {
  const { setProcessing, setForm } = useProcessing()
  useEffect(() => {
    setProcessing(false)
    scrollToTop("onboardinglayout")
  }, [])
  const cancelOnboarding = () => {
    setIsOnboarding(false)
    setTmpCat(null)
    setForm(null)
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-[15vh] w-full w3-animate-opacity pb-20  max-w-[492px]">
        <div className="flex justify-center mb-[84px]">
          <Image
            src={"/assets/icons/flag.svg"}
            alt="Thank you"
            width={72}
            height={72}
            priority
          />
        </div>
        <h1
          className="flex justify-center gap-3 mtn-h1 text-center text-white"
          style={{
            fontSize: "36px",
            lineHeight: "40px",
          }}
        >
          Thanks for providing your information
        </h1>
        <div className="mb-16 text-center w-full p-2 mtn-h1-subtitle text-[#999999] max-w-[480px]">
          Next, we'll review your application to ensure it meets our criteria.
          This will take 5-10 business days.
        </div>
        <div className="mt-3 pb-12 flex justify-center items-start w-full">
          <Button
            onClick={cancelOnboarding}
            type="button"
            label="Explore the portal "
          />
        </div>
      </div>
    </>
  )
}
