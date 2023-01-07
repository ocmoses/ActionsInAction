"use client"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
export default function Complete({ params }) {
  const { partnerInfo } = useOnboardingContext()
  console.log({ params })
  return (
    <>
      <div className="flex items-center w3-animate-opacity pb-20 w-full h-full max-w-[492px]">
        <div className="flex justify-center mb-[84px]">
          <div
            className="radial-progress text-2xl  text-mtn bg-[#333333] border-4 border-[#333]"
            style={{ "--value": 20, "--size": "99px", "--thickness": "12px" }}
          >
            0%
          </div>
        </div>
        <h1 className="flex justify-center gap-3 mtn-h1 text-white">
          Y'ello {partnerInfo.first_name}{" "}
          <span className="animate-bounce">👋</span>
        </h1>
        <div className="mb-16 text-center w-full p-2 mtn-h1-subtitle text-[#999999]">
          Please complete your application to get started
        </div>
        <div className="flex justify-center mt-6">
          <button href="" label="Get started" />
        </div>
      </div>
    </>
  )
}
