"use client"
import Image from "next/image"
import Link from "next/link"
import MailOpened from "~/assets/icons/mail-opened.svg"
import FormErrors from "@/app/components/FormErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import { useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"

export default function Validate({ params: { resource } }) {
  const { processing, setProcessing, setForm } = useProcessing()
  const { partner, resendEmail } = usePartners()
  const [{ errors, success, clearErrors }] = useErrors({})
  useEffect(() => {
    setForm(null)
    setProcessing(false)
    clearErrors()
  }, [])
  let url = `/onboarding/validate/${partner.partnerid}/setpassword/`
  const path = resource && resource[0] ? resource[0] : "userinfo"
  switch (path) {
    case "userinfo":
      url = `/onboarding/validate/${partner.partnerid}/userinfo/`
      break
    case "setpassword":
      url = `/onboarding/validate/${partner.partnerid}/setpassword/`
      break
  }
  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <div className="flex justify-center mb-8">
          <Image
            src={MailOpened}
            priority
            width={72}
            height={72}
            alt=""
            className="h-auto"
          />
        </div>
        <h1 className="flex justify-center font-mtn-extrabold text-center text-white text-5xl">
          Check your email
        </h1>
        <div className="my-6">
          {processing && (
            <div className="flex justify-center">
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            </div>
          )}
          <>
            {errors && <FormErrors error={errors["validate"]} align="center" />}
            {success && <FormErrors success={success} align="center" />}
          </>
        </div>
        {partner.email && (
          <div className="font-mtn-extralight text-center text-white/70 mb-116 p-2">
            A confirmation email has been sent to your email <br />
            {/* {Util.obscureEmail(partner.email)}. <br /> */}
            Check your inbox and follow the instructions to get started.
          </div>
        )}

        {partner.email !== "" && (
          <div className="font-mtn-extralight text-center text-white/70 mb-16 p-2">
            Didn't receive our email?{" "}
            <span
              className="cursor-pointer text-lg text-white hover:text-gray-300"
              onClick={() => resendEmail(partner.email)}
            >
              Resend email
            </span>
          </div>
        )}
      </div>
      {/** 
       //? https//......com/onboarding/validate/{partnerid}/category // for new partner onboarding
        //! https//......com/onboarding/validate/{partnerid}/profile //? for existing partner onboarding 
      */}
      <Link
        href={`${url}`}
        className="block w3-animate-opacity w-full font-mtn-extralight cursor-pointer text-center text-white/70 mt-[100px] p-2"
      >
        [[DEV TOOL. Continue to next screen]]
      </Link>
    </>
  )
}
