"use client"
import NavbarOnboarding from "@/app/components/dashboard/NavbarOnboarding"
import ProfileTabItem from "@/app/components/ProfileTabItem"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import CompanyDetail from "./sections/companydetail/CompanyDetail"
import Compliance from "./sections/compliance/Compliance"
import Ncclicense from "./sections/ncclicense/Ncclicense"
import Nlrclicense from "./sections/nlrclicense/Nlrclicense"
import Indemnity from "./sections/indemnity/Indemnity"
import Accountinfo from "./sections/accountinfo/Accountinfo"
import Shortcode from "./sections/shortcode/Shortcode"
import Review from "./sections/review/Review"
import { profileMenu } from "@/app/modules/constants"
import { useEffect } from "react"

export default function OnboardingLayout({
  setIsOnboarding,
  setTmpCat,
  section,
}) {
  const { form } = useProcessing()
  const { category } = usePartners()
  const validForms = category?.validation

  useEffect(() => {
    if (validForms) {
      console.log({ validForms })
      validForms.review = "r"
    }
  }, [validForms])

  return (
    <>
      <div className="absolute top-0 bottom-0 flex flex-col min-h-screen w-screen overflow-y-auto bg-[#030303]  scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
        <NavbarOnboarding
          setIsOnboarding={setIsOnboarding}
          setTmpCat={setTmpCat}
        />
        <div className="grid grid-cols-4 h-full w-full">
          <div className="col-span-1 flex justify-center  h-full mb-[10vh] py-[72px] px-4">
            <div className="flex">
              {form &&
                validForms &&
                validForms[form] &&
                profileMenu.includes(form) && (
                  <div className="flex justify-start flex-col items-end">
                    {profileMenu.map((menu) => {
                      return (
                        <div key={menu}>
                          {(validForms[menu] === "r" ||
                            validForms[menu] === "o") && (
                            <ProfileTabItem menu={menu} form={form} />
                          )}
                        </div>
                      )
                    })}
                    {/* <ProfileTabItem menu={"review"} form={"review"} /> */}
                  </div>
                )}
            </div>
          </div>
          <div className=" col-span-3 flex w-full px-4 py-[72px] ">
            <div className="w-full lg:w-[80%] h-full mb-[10vh] flex justify-start items-start relative pb-12">
              {form === "companydetail" && <CompanyDetail />}
              {form === "compliance" && <Compliance />}
              {form === "ncclicense" && <Ncclicense />}
              {form === "nlrclicense" && <Nlrclicense />}
              {form === "indemnity" && <Indemnity />}
              {form === "shortcode" && <Shortcode />}
              {form === "accountinfo" && <Accountinfo />}
              {form === "review" && <Review />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
