"use client"
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer"
import CategoryCard from "@/app/components/dashboard/CategoryCard"
import CategoryDetail from "@/app/components/dashboard/CategoryDetail"
import PartnerCategories from "@/app/components/dashboard/PartnerCategories"
import OnboardingLayout from "./OnboardingLayout"
import Button from "@/app/components/form/Button"
import useUsers from "@/hooks/useUsers"
import RemoteEndpoints from "@/app/modules/endpoints"
import Axios from "@/app/modules/axios"
import { useState, useEffect, useRef } from "react"
import {
  Util,
  AllowedCategories,
  filterPartner,
  filterCategory,
  getFinalApproval,
} from "@/app/modules/utilities"
import { TailSpinPreloader } from "@/app/components/Icons"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import Image from "next/image"
import { scrollToTop } from "@/app/modules/utilities"
import CallToAction from "./partners/CallToAction"

export default function GetStarted({ type }) {
  const {
    session: { user },
  } = useUsers()
  const {
    partner,
    category,
    categories,
    updatePartner,
    setValidationRules,
    setCurrentCategory,
    nextStage,
  } = usePartners()

  const [FinalApproval, setFinalApproval] = useState(false)
  useEffect(() => {
    const _finalApproval = getFinalApproval(partner)
    console.log({ _finalApproval })
    setFinalApproval(_finalApproval)
  }, [partner])
  // console.log({ FinalApproval })
  const [isOpen, setIsOpen] = useState(false)
  const [categoriesData, setCategoriesData] = useState([])
  const [partnerCategories, setPartnerCategories] = useState([])
  const [partnerActiveCategories, setPartnerActiveCategories] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const [tmpCat, setTmpCat] = useState(null)
  const [isOnboarding, setIsOnboarding] = useState(false)
  // const [allowedCategories, setAllowedCategories] = useState(false)

  const { setForm, setProcessing, setActiveCategory } = useProcessing()

  const [{ errors, setError, success, setSuccess, clearErrors }] =
    useErrors(null)

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
    filterPartner(partner, categoriesData)
    if (!Util.isEmpty(partner) && categoriesData?.length > 0) {
      if (partner.categories?.length > 0) {
        partner.categories.map((_category) => {
          const category = filterCategory(_category, partner)
          partnerActiveCat.push(category.uuid)
          const mainCategory = categoriesData.find(
            (c) => c.uuid === category.category_uuid
          )

          partnerCat.push({
            ...category,
            category_name: mainCategory?.category_name,
            validation: mainCategory?.validation,
          })
        })
      }
    }
    const newCatArray = categoriesData?.filter(
      (category) =>
        !partnerActiveCat.includes(category.uuid) &&
        partner.allowedCategories.includes(category.category_code)
    )
    setPartnerActiveCategories(newCatArray)
    setPartnerCategories(partnerCat)
  }, [partner, categoriesData, category])

  const toggleProgress = () => {
    setShowProgress((oldState) => !oldState)
  }
  const MainBox = useRef()
  const CategoryBox = useRef()

  const continueRegistration = (uuid) => {
    clearErrors()
    const category = partner?.categories?.find((cat) => cat.uuid === uuid)

    if (category) {
      //  CHECK IF MASTER DATA EXISTS
      const { nextstage: NextStage } = nextStage(category, partner)
      setCurrentCategory(category, partner)
      setIsOnboarding(true)
      setIsOpen(false)
      return setForm(NextStage)
    }
  }
  const scrollpage = () => {
    document.getElementById("portals").scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  const [isSaving, setIsSaving] = useState(false)
  const [contractStarted, setContractStarted] = useState(false)

  const finishApplication = async () => {
    if (isSaving) return
    clearErrors()
    setIsSaving(true)
    try {
      const result = await Axios.post(
        RemoteEndpoints.START_CONTRACT,
        { partner_uuid: partner?.uuid },
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
          },
          timeout: process.TIMEOUT,
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        }
      ).catch((error) => {
        console.log(error)
        setIsSaving(false)
        return setError({
          dashboard:
            "Unable to reach the server. Please check your connection and retry",
        })
      })
      setIsSaving(false)
      if (result) {
        const { success, data } = result
        if (success) {
          setContractStarted(true)
          updatePartner(data?.partner)
          setSuccess("Your application was submited successfully")
        } else {
          return setError({ dashboard: data.message })
        }
      } else {
        return setError({
          dashboard: "Cannot reach the server. Please check your connection",
        })
      }
    } catch (err) {
      console.log({ err })
      setIsSaving(false)
      return setError({
        dashboard:
          "Something went wrong. Please check your connection and try again",
      })
    }
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
                <h2 className="text-4xl mb-6 font-bold text-white text-center md:text-start">
                  Hello, {user.first_name}
                </h2>
              )}
              {partner?.onboarding_type === "new" && (
                <div>
                  {!partner?.categories?.length ? (
                    <>
                      <p className="mb-12 text-[#999999] max-w-[500px]">
                        Welcome to the MTN Partner Portal, {user.first_name}!
                        Explore advanced analytics, reporting, and dedicated
                        support to grow your business today.
                      </p>
                      <p className="text-[#999999] text-center md:text-start">
                        Choose a partner category that best suits your service
                      </p>
                    </>
                  ) : (
                    <p className="text-[#999999] text-center md:text-start">
                      {partner?.contract_status === "not_started" ? (
                        "Complete your setup to get started!"
                      ) : (
                        <>
                          {FinalApproval.partner ? (
                            <CallToAction
                              message={`<p className="text-[#FF9897] text-[16px] leading-[22px]">Your contract is ready, click here to sign</p>
                            <p className="text-[#999999] text-[14px] leading-[18px]">Describe the event and give further instructions if needed, include a call to action</p>`}
                              label="Take action"
                            />
                          ) : (
                            <CallToAction
                              message="Your application is currently being reviewed"
                              label=""
                            />
                          )}
                        </>
                      )}
                    </p>
                  )}
                </div>
              )}
              {partner?.onboarding_type === "migrated" && (
                <>
                  {partner?.is_login === "no" ? (
                    <>
                      <p className="mb-12 text-[#999999] max-w-[500px]">
                        Welcome to the MTN Partner Portal, {user.first_name}!
                        Explore advanced analytics, reporting, and dedicated
                        support to grow your business today.
                      </p>
                      <p className="text-[#999999] text-center md:text-start">
                        Review your details to get started
                      </p>
                    </>
                  ) : (
                    <p className="text-[#999999] text-center md:text-start">
                      {partner?.contract_status === "not_started" ? (
                        "Complete your setup to get started!"
                      ) : (
                        <>
                          {FinalApproval.partner ? (
                            <CallToAction
                              message={`<p className="text-[#FF9897] text-[16px] leading-[22px]">Your contract is ready, click here to sign</p>
                            <p className="text-[#999999] text-[14px] leading-[18px]">Describe the event and give further instructions if needed, include a call to action</p>`}
                              label="Take action"
                            />
                          ) : (
                            <CallToAction
                              message="Your application is currently being reviewed"
                              label=""
                            />
                          )}
                        </>
                      )}
                    </p>
                  )}
                </>
              )}

              {partnerCategories && (
                <PartnerCategories
                  partner={partner}
                  partnerCategories={partnerCategories}
                  type={type}
                  onclick={continueRegistration}
                  categories={categoriesData}
                  finalApproval={FinalApproval}
                />
              )}
              {success && (
                <div className="my-6">
                  <FormErrors success={success} align="center" />
                </div>
              )}
              {partner?.categories?.length > 0 &&
                !partner?.edittable &&
                partner?.contract_status === "not_started" && (
                  <div className="flex flex-col my-12 justify-center items-center">
                    {errors?.dashboard && (
                      <div className="my-6">
                        <FormErrors error={errors.dashboard} />
                      </div>
                    )}
                    {isSaving ? (
                      <TailSpinPreloader
                        width={40}
                        height={40}
                        fill="#efb703"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-start gap-3 w-full sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:w-auto">
                        {!contractStarted &&
                          partner?.contract_status === "not_started" &&
                          partnerCategories?.length > 0 &&
                          partnerActiveCategories?.length > 0 && (
                            <>
                              <Button
                                href="javascript:;"
                                onClick={(e) => scrollToTop("categoryselect")}
                                label="Add another category"
                                paddingclass="pl-4 pr-3 py-2 w-full animate-pulse hover:animate-none animate-pulse"
                                textsizecss="inline-flex text-[14px] whitespace-nowrap"
                                outline="yes"
                                icon="no"
                              />
                              <span className="text-white">OR</span>
                            </>
                          )}
                        <Button
                          onClick={finishApplication}
                          label="Finish Application"
                          paddingclass="pl-6 pr-3 py-2 w-full animate-pulse hover:animate-none animate-pulse"
                          textsizecss="inline-flex text-[14px] whitespace-nowrap"
                        />
                      </div>
                    )}
                  </div>
                )}
              {!contractStarted &&
                partner?.contract_status === "not_started" &&
                partnerActiveCategories?.length > 0 && (
                  <div
                    id="categoryselect"
                    className="flex max-w-lg text-center text-[#999999] mt-16 mb-6 mx-auto"
                  >
                    Dear {user.first_name}, please note that you can choose
                    multiple service categories. However, you will be required
                    to complete a selected category to enable you move to the
                    next category
                  </div>
                )}
              {!contractStarted &&
                partner?.contract_status === "not_started" &&
                partnerCategories?.length > 0 &&
                partnerActiveCategories?.length > 0 && (
                  <div
                    ref={CategoryBox}
                    onClick={toggleProgress}
                    className="mb-16 flex gap-3 items-center justify-center text-sm cursor-pointer"
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
              {!contractStarted &&
                partner?.contract_status === "not_started" &&
                !showProgress && (
                  <div className="grid lg:grid-cols-2 justify-center lg:justify-between gap-[24px] mb-16 w3-animate-opacity">
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
                          disabled={partner?.edittable}
                        />
                      ))}
                  </div>
                )}
            </div>
            <div className="flex flex-col mt-12">
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
                      src={"/assets/icons/graphics-2.png"}
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
                        Learn to monitor system performance by selecting
                        relevant metrics, collecting and analyzing data that
                        matters most to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-3.png"}
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
                        Build custom code tailored to your unique needs,
                        integrating with existing systems and creating powerful
                        new functionality from scratch.
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
