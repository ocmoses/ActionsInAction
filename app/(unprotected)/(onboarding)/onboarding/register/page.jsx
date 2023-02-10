"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRightCircle } from "@/app/components/Icons"
import { PageRoutes } from "@/app/modules/menu"

export default function Register() {
  const router = useRouter()
  const registerUserInfo = () => {
    router.push(PageRoutes.registerUserinfo)
  }
  const partnerWelcome = () => {
    router.push(PageRoutes.partnerwelcome)
  }
  return (
    <div className="mx-auto w3-animate-opacity pb-20">
      <h1 className="flex items-center font-mtn-extrabold mb-6  text-white text-4xl">
        <span className="mr-3">Choose your registration type</span>
      </h1>
      <p className="font-hairline font-mtn-extralight text-xl mb-8 text-white">
        How would you like to join our platform?
      </p>
      <div
        onClick={registerUserInfo}
        className="flex flex-col gap-8 group p-2 mb-8 cursor-pointer"
      >
        <div className="flex flex-col gap-3 px-8 pt-6 md:pt-10 w-full aspect-[5/2] rounded-2xl overflow-hidden bg-gradient-to-br from-mtn to-mtn/10 hover:bg-mtn/70  transition-none sm:transition-color ease-in-out duration-700 relative">
          <div className="translate-y-0 sm:translate-y-6 group-hover:translate-y-0 transition-none sm:transition ease-in-out duration-700">
            <h1 className="text-lg sm:text-2xl font-mtn-bold w-[65%]">
              New Partner
            </h1>
            <p className="text-sm sm:text-lg w-[65%] font-mtn-extralight">
              Create a fresh account for your company profile
            </p>
          </div>
          <ArrowRightCircle iconClass="w-10 h-10 mt-4 md:mt-6 -translate-x-[200%] group-hover:translate-x-0 transition-none md:transition ease-in-out duration-1000" />
          <Image
            priority
            src="/assets/icons/partner-guy.svg"
            width={161}
            height={129}
            alt="MTN Nigeria Logo"
            className="absolute bottom-0 w-[110px] md:w-[175px] h-auto right-0 group-hover:scale-[120%] origin-bottom-right transition-none md:transition-transform ease-in-out duration-1000 cursor-pointer"
          />
        </div>
      </div>
      <div
        onClick={partnerWelcome}
        className="flex flex-col gap-8 group p-2  cursor-pointer"
      >
        <div className="flex flex-col gap-3 px-8 pt-6 md:pt-10 w-full aspect-[5/2] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-600 to-mtn/10 hover:bg-black/70  transition-none sm:transition-color ease-in-out duration-700 relative">
          <div className="translate-y-0 sm:translate-y-6 group-hover:translate-y-0 transition-none sm:transition ease-in-out duration-700">
            <h1 className="text-lg sm:text-2xl text-white font-mtn-bold w-[65%]">
              Existing Partner
            </h1>
            <p className="text-sm sm:text-lg text-white w-[65%] font-mtn-extralight">
              Get started immediately with your partner details
            </p>
          </div>
          <ArrowRightCircle iconClass="w-10 h-10 text-mtn mt-4 md:mt-6 -translate-x-[200%] group-hover:translate-x-0 transition-none md:transition ease-in-out duration-1000" />
          <Image
            priority
            src="/assets/icons/partner-existing.png"
            width={140}
            height={132}
            alt="MTN Nigeria Logo"
            className="absolute -bottom-8 w-[110px] md:w-[175px] h-auto -right-8 group-hover:scale-[120%] origin-bottom-right transition-none md:transition-transform ease-in-out duration-1000 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
