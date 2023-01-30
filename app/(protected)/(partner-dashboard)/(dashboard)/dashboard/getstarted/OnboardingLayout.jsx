"use client"
import NavbarOnboarding from "@/app/components/dashboard/NavbarOnboarding"
import ProfileTabItem from "@/app/components/ProfileTabItem"
import useProcessing from "@/hooks/useProcessing"
import CompanyDetail from "./sections/companydetail/CompanyDetail"
import Compliance from "./sections/compliance/Compliance"
import Ncclicense from "./sections/ncclicense/Ncclicense"
import Nlrclicense from "./sections/nlrclicense/Nlrclicense"
import Indemnity from "./sections/indemnity/Indemnity"
import Shortcode from "./sections/shortcode/Shortcode"
import { profileMenu } from "@/app/modules/constants"
import { updateMenu } from "@/app/modules/constants"

export default function OnboardingLayout({
  inOnboarding,
  setIsOnboarding,
  setContinuedCategory,
}) {
  const { form } = useProcessing()
  return (
    <>
      <div className="absolute top-0 bottom-0 flex flex-col min-h-screen w-screen bg-[#030303]">
        <NavbarOnboarding
          inOnboarding={inOnboarding}
          setIsOnboarding={setIsOnboarding}
        />
        <div className="grid grid-cols-4 h-full w-full">
          <div className="col-span-1 flex justify-center  h-[110vh] mb-[10vh] py-[72px] px-4 scrollbar scrollbar-thumb-[#FFCB03] scrollbar-track-[#212121] scrollbar-w-[6px]">
            <div className="flex">
              {form && profileMenu.includes(form) && (
                <div className="flex justify-start flex-col items-end">
                  {profileMenu.map((menu) => (
                    <ProfileTabItem key={menu} menu={menu} form={form} />
                  ))}
                </div>
              )}
              {form && updateMenu.includes(form) && (
                <div className="flex justify-start flex-col items-end">
                  {updateMenu.map((menu) => (
                    <ProfileTabItem key={menu} menu={menu} form={form} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className=" col-span-3 flex w-full px-4 py-[72px] overflow-y-auto scrollbar scrollbar-thumb-[#111111] scrollbar-track-[#212121] scrollbar-w-[10px]">
            <div className="w-[80%] md:w-[60%] h-[110vh] mb-[10vh] flex justify-start items-start relative pb-12">
              {form === "companydetail" && <CompanyDetail />}
              {form === "compliance" && <Compliance />}
              {form === "ncclicense" && <Ncclicense />}
              {form === "nlrclicense" && <Nlrclicense />}
              {form === "indemnity" && <Indemnity />}
              {form === "shortcode" && <Shortcode />}
            </div>
          </div>
          {/* <div className="col-span-1 flex h-full bg-gray-600">Testing</div> */}
        </div>
      </div>
    </>
  )
}
