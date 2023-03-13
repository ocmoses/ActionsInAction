"use client"
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer"
import CategoryCard from "@/app/components/dashboard/CategoryCard"
import CategoryDetail from "@/app/components/dashboard/CategoryDetail"
import PartnerCategories from "@/app/components/dashboard/PartnerCategories"
import OnboardingLayout from "./OnboardingLayout"
import useUsers from "@/hooks/useUsers"
import { useState, useEffect, useRef } from "react"
import { Util } from "@/app/modules/utilities"

import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import Image from "next/image"

export default function GetStarted({ type }) {
  const {
    session: { user },
  } = useUsers()
  const {
    categories,
    partner,
    setValidationRules,
    setCurrentCategory,
    nextStage,
  } = usePartners()
  const [isOpen, setIsOpen] = useState(false)
  const [categoriesData, setCategoriesData] = useState([])
  const [partnerCategories, setPartnerCategories] = useState([])
  const [partnerActiveCategories, setPartnerActiveCategories] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const [tmpCat, setTmpCat] = useState(null)
  const [isOnboarding, setIsOnboarding] = useState(false)

  const {
    setForm,
    setProcessing,
    setFormSteps,
    moveToNextForm,
    setActiveCategory,
  } = useProcessing()
  const [{ errors, clearErrors }] = useErrors(null)
  useEffect(() => {
    setCategoriesData(categories)
  }, [categories])

  const [validation, setValidation] = useState({
    required: [],
    optional: [],
    allForms: [],
  })

  useEffect(() => {
    setActiveCategory(tmpCat)
    const validation = setValidationRules(tmpCat)
    setValidation(validation)
  }, [tmpCat])

  useEffect(() => {
    setForm(null)
    setShowProgress(false)
    setProcessing(false)
  }, [])
  useEffect(() => {
    const partnerCat = []
    const partnerActiveCat = []
    if (!Util.isEmpty(partner) && categoriesData?.length > 0) {
      if (partner.categories?.length > 0) {
        partner.categories.map((category) => {
          partnerActiveCat.push(category.uuid)
          const mainCategory = categoriesData.find(
            (c) => c.uuid === category.category_uuid
          )
          partnerCat.push({
            category_name: mainCategory?.category_name,
            uuid: category.uuid,
            user_uuid: category.user_uuid,
            partner_uuid: category.partner_uuid,
            uuid: category.uuid,
            percentage: category.percentage,
            validation: mainCategory?.validation,
          })
        })
      }
    }
    const newCatArray = categoriesData?.filter(
      (category) => !partnerActiveCat.includes(category.uuid)
    )
    setPartnerActiveCategories(
      partnerActiveCat.length ? newCatArray : categoriesData
    )
    setPartnerCategories(partnerCat)
  }, [partner, categoriesData])

  const toggleProgress = () => {
    setShowProgress((oldState) => !oldState)
  }
  const MainBox = useRef()
  const CategoryBox = useRef()

  const continueRegistration = (uuid) => {
    clearErrors()
    const category = partner?.categories?.find((cat) => cat.uuid === uuid)
    if (category) {
      setCurrentCategory(category, partner)
      const { nextstage: NextStage } = nextStage(category)
      setIsOnboarding(true)
      setIsOpen(false)
      console.log({ NextStage })
      if (NextStage === "review") return moveToNextForm(["review", true])
      moveToNextForm([NextStage, true])
    }
  }
  const scrollpage = () => {
    document.getElementById("portals").scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  return (
    <>
      {isOnboarding && (
        <>
          <div className="fixed z-20 left-0 bottom-0 flex flex-col h-full w-screen bg-[#030303]">
            <OnboardingLayout
              isOnboarding={isOnboarding}
              setIsOnboarding={setIsOnboarding}
              setTmpCat={setTmpCat}
              scrollpage={scrollpage}
            />
          </div>
        </>
      )}
      {!isOnboarding && (
        <div id="getstarted" ref={MainBox} className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-10 w-full max-w-[837px] px-6 mx-auto">
            <div className="w-full pt-[72px]">
              {user?.first_name && (
                <h2 className="text-4xl font-bold text-white text-center md:text-start">
                  Hello, {user.first_name}
                </h2>
              )}
              <p className="text-[#999999] text-center md:text-start">
                Choose a partner category that best suits your service
              </p>
              {errors && errors["category"] && (
                <div className="mb-6">
                  <FormErrors error={errors["getStarted"]} />
                </div>
              )}
              {partnerCategories && (
                <PartnerCategories
                  partnerCategories={partnerCategories}
                  type={type}
                  onClick={continueRegistration}
                />
                // <div
                //   className={`flex flex-col gap-4 max-w-[837px] mt-16 w3-animate-opacity`}
                // >
                //   {partnerCategories.map(
                //     (progress) =>
                //       progress.category_name && (
                //         <div
                //           onClick={() => continueRegistration(progress.uuid)}
                //           key={progress.uuid}
                //           className="flex flex-col cursor-pointer items-center md:flex-row justify-between gap-6 cursor bg-[#111111] p-[24px] border border-white/10 rounded-xl"
                //         >
                //           <div className="flex flex-col justify-start sm:flex-row sm:justify-center gap-6 items-center">
                //             <div className="flex justify-center items-center">
                //               <UserPercentage
                //                 size={86}
                //                 thickness={2}
                //                 textsize={20}
                //                 percent={progress.percentage}
                //               />
                //             </div>
                //             <div className="flex flex-col gap-0 justify-center items-center sm:items-start h-full">
                //               <span className="text-sm text-[#999999]">
                //                 In progress
                //               </span>
                //               <span className="text-white text-center md:text-left font-bold">
                //                 {progress.category_name}
                //               </span>
                //             </div>
                //           </div>
                //           <div className="sm:hidden md:flex gap-6 justify-center md:justify-end items-center">
                //             {progress.percentage < 100 ? (
                //               <Button
                //                 label="Finish up"
                //                 noicon="yes"
                //                 textsizecss="text-[13px] md:text-sm"
                //               />
                //             ) : (
                //               <div className="flex justify-center">
                //                 <Button
                //                   onClick={() =>
                //                     continueRegistration(progress.uuid)
                //                   }
                //                   label="Detail"
                //                   outline="yes"
                //                   noicon="yes"
                //                   textsizecss="text-[13px] md:text-sm"
                //                 />
                //               </div>
                //             )}
                //           </div>
                //         </div>
                //       )
                //   )}
                // </div>
              )}

              {partnerCategories?.length > 0 &&
                partnerActiveCategories?.length > 0 && (
                  <div
                    ref={CategoryBox}
                    onClick={toggleProgress}
                    className="my-16 flex gap-3 items-center justify-center text-sm cursor-pointer"
                  >
                    {showProgress && (
                      <>
                        <span className="text-[#999999]">
                          Explore other categories
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#FFCB03]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </>
                    )}
                    {!showProgress && (
                      <>
                        <span className="text-[#999999]">
                          Show less categories
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#FFCB03]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                )}
              {!showProgress && (
                <div className="grid lg:grid-cols-2 justify-center lg:justify-between gap-[24px] my-16 w3-animate-opacity">
                  {partnerActiveCategories &&
                    partnerActiveCategories?.length > 0 &&
                    partnerActiveCategories.map((category) => (
                      <CategoryCard
                        key={category.uuid}
                        category={category}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        tmpCat={tmpCat}
                        setTmpCat={setTmpCat}
                      />
                    ))}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg text-center lg:text-start text-white font-bold mb-8">
                Learn how to use
              </h3>
              <div className="flex flex-col items-center lg:items-between ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-1.png"}
                      height={147}
                      width={259}
                      className="w-full"
                      alt=""
                    />
                    <div className="flex flex-col p-[24px] bg-[#111111]  items-center lg:items-start justify-start max-w-md">
                      <h4 className="text-lg text-white mb-3 text-center lg:text-start">
                        Read the documentation
                      </h4>
                      <p className="text-sm text-[#999999] text-center lg:text-start">
                        Explore our guides, API references and code examples
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-1.png"}
                      height={147}
                      width={259}
                      className="w-full"
                      alt=""
                    />
                    <div className="flex flex-col p-[24px] bg-[#111111]  items-center lg:items-start justify-start max-w-md">
                      <h4 className="text-lg text-white mb-3 text-center lg:text-start">
                        Discover the right Metrics
                      </h4>
                      <p className="text-sm text-[#999999] text-center lg:text-start">
                        Talk to our partner portal team and learn more about
                        what you can do
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-1.png"}
                      height={147}
                      width={259}
                      className="w-full"
                      alt=""
                    />
                    <div className="flex flex-col p-[24px] bg-[#111111]  items-center lg:items-start justify-start max-w-md">
                      <h4 className="text-lg text-white mb-3 text-center lg:text-start">
                        Write Custom Codes
                      </h4>
                      <p className="text-sm text-[#999999] text-center lg:text-start">
                        Talk to our partner portal team and learn more about
                        what you can do
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CategorySideDrawer
              setTmpCat={setTmpCat}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              {tmpCat && isOpen && (
                <CategoryDetail
                  category={tmpCat}
                  setIsOnboarding={setIsOnboarding}
                  setIsOpen={setIsOpen}
                  validation={validation}
                />
              )}
            </CategorySideDrawer>
          </div>
        </div>
      )}
    </>
  )
}
