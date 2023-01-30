"use client"
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer"
import CategoryCard from "@/app/components/dashboard/CategoryCard"
import CategoryDetail from "@/app/components/dashboard/CategoryDetail"
import OnboardingLayout from "./OnboardingLayout"

import useUsers from "@/hooks/useUsers"
import { useState, useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"

export default function GetStarted({ data }) {
  const {
    session: { user },
  } = useUsers()
  const { setCategories } = usePartners()
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategoriesData] = useState([])
  const [tmpCat, setTmpCat] = useState(null)
  const [isOnboarding, setIsOnboarding] = useState(false)
  const { setForm, form, formSteps, moveToNextForm } = useProcessing()

  useEffect(() => {
    const { success, data: categories } = data
    setCategoriesData(categories)
    setCategories(categories)
    setForm(null)
  }, [])
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
      <div className="max-w-[807px]  mx-auto px-20 pt-[72px]">
        {user?.first_name && (
          <h2 className="text-4xl font-bold text-white">
            Hello, {user.first_name}
          </h2>
        )}
        <p className="text-[#999999]">
          Choose a partner category that best suits your service
        </p>
        <div className="grid lg:grid-cols-2 gap-[24px] my-16">
          {categories &&
            categories.length &&
            categories.map((category) => (
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
      </div>
      <CategorySideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {tmpCat && (
          <CategoryDetail category={tmpCat} setIsOnboarding={setIsOnboarding} />
        )}
      </CategorySideDrawer>
    </>
  )
}
