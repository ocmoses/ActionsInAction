"use client"
import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import Button from "@/app/components/form/Button"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterValidation({ partnerquery, path }) {
  const [{ errors, setError }] = useErrors()
  const { processing, setProcessing, setForm } = useProcessing()
  const { partner, setPartner } = usePartners()

  const router = useRouter()

  useEffect(() => {
    setForm(null)
    if (partnerquery.error) setError({ validate: partnerquery.error })
    else setPartner(partnerquery.data.user)
  }, [partnerquery])
  console.log(partner)
  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div>
          {!errors.validate && !partner.partnerid && (
            <div className="flex h-full w-full justify-center items-center">
              <TailSpinPreloader width={80} height={80} fill="#efb703" />
            </div>
          )}
          {!errors.validate && partner.partnerid && (
            <>
              <div className="flex justify-center mb-[84px]">
                <div
                  className="radial-progress text-2xl  text-mtn bg-[#333333] border-4 border-[#333]"
                  style={{
                    "--value": 20,
                    "--size": "99px",
                    "--thickness": "12px",
                  }}
                >
                  0%
                </div>
              </div>
              <h1 className="flex justify-center gap-3 mtn-h1 text-white">
                Y'ello {partner.first_name}{" "}
                <span className="animate-bounce">👋</span>
              </h1>
              <div className="mb-16 text-center w-full p-2 mtn-h1-subtitle text-[#999999]">
                Please complete your application to get started
              </div>
              <div className="flex justify-center">
                <div className="mt-6">
                  <Button
                    onClick={() =>
                      path === "mtn"
                        ? router.replace("/onboarding/setpassword")
                        : router.replace("/profile/category")
                    }
                    label="Get stated"
                  />
                </div>
              </div>
            </>
          )}
          {errors.validate && (
            <div className="flex flex-col gap-6 h-[400px] w-full text-red-500 text-[15px] justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              {errors.validate}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
