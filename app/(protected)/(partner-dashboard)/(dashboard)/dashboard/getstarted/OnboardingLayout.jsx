"use client"
import NavbarOnboarding from "@/app/components/dashboard/NavbarOnboarding"
import ProfileTabItem from "@/app/components/ProfileTabItem"
import useProcessing from "@/hooks/useProcessing"
import CompanyDetail from "./sections/companydetail/CompanyDetail"
import Compliance from "./sections/compliance/Compliance"
import Ncclicense from "./sections/ncclicense/Ncclicense"
import Nlrclicense from "./sections/nlrclicense/Nlrclicense"
import Indemnity from "./sections/indemnity/Indemnity"
import Accountinfo from "./sections/accountinfo/Accountinfo"

import Shortcode from "./sections/shortcode/Shortcode"
import { profileMenu } from "@/app/modules/constants"
import { updateMenu } from "@/app/modules/constants"
import { useEffect } from "react"

export default function OnboardingLayout({
  inOnboarding,
  setIsOnboarding,
  setContinuedCategory,
  setTmpCat,
}) {
  const { form } = useProcessing()
  // useEffect(() => {
  //   console.log({ form })
  // }, [form])
  return (
    <>
      <div className="absolute top-0 bottom-0 flex flex-col min-h-screen w-screen overflow-y-auto bg-[#030303]  scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
        <NavbarOnboarding
          inOnboarding={inOnboarding}
          setIsOnboarding={setIsOnboarding}
          setTmpCat={setTmpCat}
        />
        <div className="grid grid-cols-4 h-full w-full">
          <div className="col-span-1 flex justify-center  h-full mb-[10vh] py-[72px] px-4">
            <div className="flex">
              {form && profileMenu.includes(form) && (
                <div className="flex justify-start flex-col items-end">
                  {profileMenu.map((menu) => {
                    return <ProfileTabItem key={menu} menu={menu} form={form} />
                  })}
                </div>
              )}
              {form && updateMenu.includes(form) && (
                <div className="flex justify-start flex-col items-end">
                  {updateMenu.map((menu) => {
                    return <ProfileTabItem key={menu} menu={menu} form={form} />
                  })}
                </div>
              )}
            </div>
          </div>
          <div className=" col-span-3 flex w-full px-4 py-[72px] ">
            <div className="w-[80%] md:w-[60%] h-full mb-[10vh] flex justify-start items-start relative pb-12">
              {form === "companydetail" && <CompanyDetail />}
              {form === "compliance" && <Compliance />}
              {form === "ncclicense" && <Ncclicense />}
              {form === "nlrclicense" && <Nlrclicense />}
              {form === "indemnity" && <Indemnity />}
              {form === "shortcode" && <Shortcode />}
              {form === "accountinfo" && <Accountinfo />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
