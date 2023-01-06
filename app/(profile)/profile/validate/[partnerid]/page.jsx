"use client"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { RequestSuccess, RequestError } from "@/app/components/RequestResponse"
import { useEffect } from "react"
import { ArrowRightCircle, TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import Head from "next/head"

function Validate({ params: { partnerid } }) {
  const {
    getPartner,
    setPartner,
    partnerInfo,
    requestSuccess,
    requestError,
    processing,
  } = useOnboardingContext()

  const router = useRouter()
  useEffect(() => {
    // GET PARTNER DETAIL
  }, [partnerid])

  const continueRegistration = () => {
    router.replace("/profile/category")
  }
  return (
    <>
      <div className="flex items-center w3-animate-opacity pb-20 w-full h-full max-w-[492px]">
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
          <div className="flex justify-center">
            <button
              onClick={continueRegistration}
              className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
            >
              Get started <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Validate
