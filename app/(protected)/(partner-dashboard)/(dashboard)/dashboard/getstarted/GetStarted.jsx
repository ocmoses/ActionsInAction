"use client"
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer"
import CategoryCard from "@/app/components/dashboard/CategoryCard"
import CategoryDetail from "@/app/components/dashboard/CategoryDetail"
import UserPercentage from "@/app/components/UserPercentage"
import Button from "@/app/components/form/Button"
import OnboardingLayout from "./OnboardingLayout"

import useUsers from "@/hooks/useUsers"
import { useState, useEffect, useRef } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import { Util, scrollToTop } from "@/app/modules/utilities"

import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"

export default function GetStarted({ data }) {
  const {
    session: { user },
  } = useUsers()
  const {
    categrories,
    partner,
    setCategories,
    validation,
    setCategory,
    completeOnboarding,
  } = usePartners()

  const [isOpen, setIsOpen] = useState(false)
  const [categoriesData, setCategoriesData] = useState([])
  const [partnerCategories, setPartnerCategories] = useState([])
  const [partnerActiveCategories, setPartnerActiveCategories] = useState([])

  const [showProgress, setShowProgress] = useState(false)
  const [tmpCat, setTmpCat] = useState(null)
  const [isOnboarding, setIsOnboarding] = useState(false)
  const { setForm, form, setFormSteps, moveToNextForm, setActiveCategory } =
    useProcessing()
  const [{ errors, setError, clearErrors }] = useErrors(null)
  useEffect(() => {
    if (data) {
      if (data?.success) {
        const { data: categories_data } = data
        setCategoriesData(categories_data)
        setCategories(categories_data)
      } else {
        setError({ getStaerted: data.message })
      }
    } else {
      setError({ getStaerted: "Something went wrong" })
    }
  }, [data])

  useEffect(() => {
    setForm(null)
    setShowProgress(false)
  }, [])
  useEffect(() => {
    const partnerCat = []
    const partnerActiveCat = []
    if (!Util.isEmpty(partner) && categoriesData?.length) {
      if (partner.categories?.length > 0) {
        partner.categories.map((category) => {
          partnerActiveCat.push(category.category_uuid)
          partnerCat.push({
            category_name: categoriesData.find(
              (c) => c.uuid === category.category_uuid
            )?.category_name,
            category_uuid: category.category_uuid,
            user_uuid: category.user_uuid,
            partner_uuid: category.partner_uuid,
            category_uuid: category.category_uuid,
            percentage: category.percentage,
          })
        })
      }
    }

    setShowProgress(true)
    const newCatArray = categoriesData.filter(
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
  useEffect(() => {
    showProgress &&
      MainBox.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    !showProgress &&
      CategoryBox.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
  }, [showProgress])

  const [continuedCategory, setContinuedCategory] = useState(null)
  useEffect(() => {
    if (continuedCategory) {
      console.log({ continuedCategory })
      completeOnboarding(continuedCategory)
      setFormSteps(validation)
      setActiveCategory(continuedCategory.uuid)
      setCategory(continuedCategory)
      moveToNextForm("category")
      setIsOnboarding(true)
      setIsOpen(false)
    }
  }, [continuedCategory])
  const contunueRegistration = (category_uuid) => {
    console.log("category_uuid", category_uuid)
    console.log(partner.categories)
    const category = partner?.categories?.find(
      (cat) => cat.category_uuid === category_uuid
    )
    console.log({ category })
    if (category) setContinuedCategory(category)
  }
  return (
    <>
      {isOnboarding && (
        <>
          <div className="fixed z-20 left-0 bottom-0 flex flex-col h-screen w-screen bg-[#030303]">
            <OnboardingLayout
              isOnboarding={isOnboarding}
              setIsOnboarding={setIsOnboarding}
            />
          </div>
        </>
      )}
      <div ref={MainBox} className="max-w-[807px]  mx-auto px-20 pt-[72px]">
        {user?.first_name && (
          <h2 className="text-4xl font-bold text-white">
            Hello, {user.first_name}
          </h2>
        )}
        <p className="text-[#999999]">
          Choose a partner category that best suits your service
        </p>
        {errors["category"] && (
          <div className="mb-6">
            <FormErrors error={errors["getStarted"]} />
          </div>
        )}
        {partnerCategories && (
          <div
            className={`flex flex-col gap-4 max-w-[837px] mt-16 w3-animate-opacity
           `}
          >
            {partnerCategories.map((progress) => (
              <div
                key={progress.category_uuid}
                className="flex flex-row justify-between gap-6 bg-[#111111] px-[20px] py-4 border border-white/10 rounded-xl"
              >
                <div className="flex gap-6 justify-start items-center">
                  <div className="flex justify-center items-center">
                    <UserPercentage
                      size={72}
                      thickness={2}
                      textsize={20}
                      percent={progress.percentage}
                    />
                  </div>
                  <div className="flex flex-col gap-0 justify-center items-start h-full">
                    <span className="text-sm text-[#999999]">In progress</span>
                    <span className="text-white font-bold">
                      {progress.category_name}
                    </span>
                  </div>
                </div>
                <div className="flex gap-6 justify-end items-center">
                  {progress.percentage < 100 ? (
                    <Button
                      onClick={() =>
                        contunueRegistration(progress.category_uuid)
                      }
                      label="Finish up"
                      noicon="yes"
                      textsizecss="text-[13px] md:text-sm"
                    />
                  ) : (
                    <Button
                      onClick={() =>
                        contunueRegistration(progress.category_uuid)
                      }
                      label="Detail"
                      outline="yes"
                      noicon="yes"
                      textsizecss="text-[13px] md:text-sm"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          ref={CategoryBox}
          onClick={toggleProgress}
          className="my-16 flex gap-3 items-center justify-center text-sm cursor-pointer"
        >
          {showProgress && (
            <>
              <span className="text-[#999999]">Explore other categories</span>
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
              <span className="text-[#999999]">Show less categories</span>
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
        {!showProgress && (
          <div className="grid lg:grid-cols-2 gap-[24px] my-16 w3-animate-opacity">
            {partnerActiveCategories &&
              partnerActiveCategories?.length &&
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
      <CategorySideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {tmpCat && (
          <CategoryDetail
            category={tmpCat}
            setIsOnboarding={setIsOnboarding}
            setIsOpen={setIsOpen}
          />
        )}
      </CategorySideDrawer>
    </>
  )
}
