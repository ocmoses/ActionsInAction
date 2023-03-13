"use client"
import NavbarOnboarding from "@/app/components/dashboard/NavbarOnboarding"
import ProfileTabItem from "@/app/components/ProfileTabItem"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import CompanyDetail from "@/app/(protected)/(partner)/dashboard/getstarted/sections/companydetail/CompanyDetail"
import Compliance from "@/app/(protected)/(partner)/dashboard/getstarted/sections/compliance/Compliance"
import Ncclicense from "@/app/(protected)/(partner)/dashboard/getstarted/sections/ncclicense/Ncclicense"
import Nlrclicense from "@/app/(protected)/(partner)/dashboard/getstarted/sections/nlrclicense/Nlrclicense"
import Indemnity from "@/app/(protected)/(partner)/dashboard/getstarted/sections/indemnity/Indemnity"
import Accountinfo from "@/app/(protected)/(partner)/dashboard/getstarted/sections/accountinfo/Accountinfo"
import Shortcode from "@/app/(protected)/(partner)/dashboard/getstarted/sections/shortcode/Shortcode"
import Review from "@/app/(protected)/(partner)/dashboard/getstarted/sections/review/Review"
import Complete from "@/app/(protected)/(partner)/dashboard/getstarted/sections/complete/Complete"
import { profileMenu } from "@/app/modules/constants"
import { useEffect } from "react"

export default function OnboardingLayout({
  setIsOnboarding,
  setTmpCat,
  scrollpage,
}) {
  const { form } = useProcessing()
  const { category } = usePartners()
  const validForms = category?.validation

  useEffect(() => {
    if (validForms) {
      validForms.review = "r"
    }
  }, [validForms])

  return (
    <>
      <div
        id="onboardinglayout"
        className="absolute top-0 left-0 flex flex-col items-start justify-start w-screen h-full overflow-y-auto bg-[#030303]  scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]"
      >
        {form !== "complete" && (
          <NavbarOnboarding
            setIsOnboarding={setIsOnboarding}
            setTmpCat={setTmpCat}
            scrollpage={scrollpage}
          />
        )}
        <div className="grid grid-cols-4 h-full w-full">
          <div className="col-span-1 hidden md:flex justify-center  h-full mb-[10vh] py-[72px] px-4">
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
          <div className="col-span-4 md:col-span-3 flex w-full px-4 py-[72px] ">
            <div className="w-full lg:w-[80%] h-full mb-[10vh] flex justify-start items-start relative pb-12">
              {form === "companydetail" && <CompanyDetail />}
              {form === "compliance" && <Compliance />}
              {form === "ncclicense" && <Ncclicense />}
              {form === "nlrclicense" && <Nlrclicense />}
              {form === "indemnity" && <Indemnity />}
              {form === "shortcode" && <Shortcode />}
              {form === "accountinfo" && <Accountinfo />}
              {form === "review" && <Review />}
              {form === "complete" && (
                <Complete
                  setIsOnboarding={setIsOnboarding}
                  setTmpCat={setTmpCat}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
