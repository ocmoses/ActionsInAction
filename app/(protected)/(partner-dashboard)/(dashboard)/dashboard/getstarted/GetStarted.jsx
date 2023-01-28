"use client"
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer"
import CategoryCard from "@/app/components/dashboard/CategoryCard"
import { useState, useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"

export default function GetStarted({ data }) {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [tempCat, setTempCat] = useState(null)

  useEffect(() => {
    const { success, data: categories } = data
    setCategories(categories)
  }, [])

  return (
    <>
      <div className="max-w-[807px]  mx-auto px-20 pt-[72px]">
        <h2 className="text-4xl font-bold text-white">Hello Morpheus</h2>
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
                tempCat={tempCat}
                setTempCat={setTempCat}
              />
            ))}
        </div>
      </div>
      <CategorySideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {tempCat && (
          <>
            <h1>{tempCat.category_name}</h1>
            <h1>{tempCat.short_description}</h1>
          </>
        )}
      </CategorySideDrawer>
    </>
  )
}
