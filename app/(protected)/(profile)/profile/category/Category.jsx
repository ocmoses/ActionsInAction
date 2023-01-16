"use client"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import Image from "next/image"
import Button from "@/app/components/form/Button"
import FormErrors from "@/app/components/FormErrors"
import useErrors from "@/hooks/useErrors"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { useState, useEffect } from "react"
import {
  ArrowDownCircle,
  CheckedIcon,
  UnCheckedHoverIcon,
  UnCheckedInactiveIcon,
  TailSpinPreloader,
} from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"
import { useStoreState, useStoreActions } from "easy-peasy"
import useProcessing from "@/hooks/useProcessing"

function Category() {
  const { processing, setProcessing, setForm, form } = useProcessing()

  const {
    partnerInfo,
    registerPartner,
    fetching,
    categories: categoryData,
  } = useOnboardingContext()
  const { error: catError, categories, nextedCategories } = categoryData
  const [error, setError] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState([])
  const [categoryID, setCategoryID] = useState([])
  const [openedTabs, setOpenedTabs] = useState([])
  const { title, subtitle, hand, required } = forms["category"]
  useEffect(() => {
    if (partnerInfo) setSelectedCategory(partnerInfo.category_id ?? [])
  }, [partnerInfo])
  useEffect(() => {
    setForm("category")
    setProcessing(false)
  }, [])
  useEffect(() => {
    const data = []
    selectedCategory?.map((s) => {
      if (nextedCategories && !nextedCategories[s]) data.push(s)
      setCategoryID(data)
    })
  }, [selectedCategory])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (selectedCategory.length === 0)
      return setError(`You must select at least one category`)
    setProcessing(true)
    const result = await registerPartner("category", categoryID)
    if (result) {
      if (result?.error) setError(result.error)
    }
  }
  const selectCategory = (c) => {
    if (hasSubcategory(c)) handleToggleTabs(c)
    else toggleChecked(c)
  }
  const hasSubcategory = (c) => typeof nextedCategories[c] !== "undefined"
  const toggleChecked = (c) => {
    setSelectedCategory((prevState) =>
      selectedCategory.includes(c)
        ? prevState.filter((t) => t !== c)
        : [...prevState, c]
    )
  }
  const handleToggleTabs = (id) => {
    setOpenedTabs((prevState) => {
      return openedTabs.includes(id)
        ? prevState.filter((t) => t !== id)
        : [...prevState, id]
    })
  }
  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">{error && <FormErrors error={error} />}</div>
        {fetching.category && (
          <TailSpinPreloader width={36} height={36} fill="#efb703" />
        )}
        {catError && (
          <div className="flex">
            <div className="mb-6">
              <h4 className="font-bold text-[18px] mb-3 text-red-600">
                An Error was encountered while fetching categories
              </h4>
              <div className="mb-2 text-white ">{catError}</div>
            </div>
          </div>
        )}

        {categories?.map((c) => (
          <div
            key={c.id}
            className={`group/category mb-6 cursor-pointer rounded-lg ${
              openedTabs.includes(c.id) || selectedCategory.includes(c.id)
                ? "bg-[#212121]"
                : "bg-[#111111] hover:bg-[#212121]"
            }  py-[16px] px-[24px] w-full max-w-[607px]`}
          >
            <div className="flex flex-col gap-4 justify-start items-start">
              <div
                onClick={() => selectCategory(c.id)}
                className=" flex flex-1 gap-2"
              >
                <div className="flex justify-center items-center min-w-[49px] h-[49px] bg-[rgba(255, 255, 255, 0.1)] group-hover/category:bg-[#030303] rounded-full">
                  <Image
                    src={"/assets/icons/gift.svg"}
                    width={20.1}
                    height={20.1}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="mtn-h1-subtitle justify-start text-white">
                    {c.category_name}
                  </h2>
                  <div className="font-[14px] text-[#999999] justify-start">
                    Non-core services or features that are beyond the standard
                    voice calls.
                  </div>
                </div>
                <div>
                  {hasSubcategory(c.id) ? (
                    <ArrowDownCircle
                      iconClass={`w-10 h-10 ${
                        openedTabs.includes(c.id)
                          ? "text-[#FFCB03]"
                          : "text-[#333333] group-hover/category:text-[#FFCB03]"
                      } `}
                    />
                  ) : selectedCategory.includes(c.id) ? (
                    <CheckedIcon width={24} height={24} />
                  ) : (
                    <>
                      <UnCheckedInactiveIcon
                        iconClass="block group-hover/category:hidden"
                        width={24}
                        height={24}
                      />
                      <UnCheckedHoverIcon
                        iconClass="hidden group-hover/category:block"
                        width={24}
                        height={24}
                      />
                    </>
                  )}
                </div>
              </div>
              {nextedCategories && nextedCategories[c.id]?.length > 0 && (
                <div
                  className={`${
                    openedTabs.includes(c.id) ? "grid" : "hidden"
                  } grid-cols-1 sm:grid-cols-2 gap-5 transform ease-in-out duration-1000`}
                >
                  {nextedCategories[c.id].map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => selectCategory(sub.id)}
                      className="group/subcategory flex gap-2 items-between bg-[#111111] p-[16px]"
                    >
                      <div className="flex flex-1 gap-4 flex-col items-start">
                        <h2 className="justify-start text-[14px] text-white">
                          {sub.sub_category_name}
                        </h2>
                        <div className="font-[12px] justify-start text-[#999999]">
                          Non-core services or features that are beyond the
                          standard voice calls.
                        </div>
                      </div>

                      <div className="">
                        {selectedCategory.includes(sub.id) ? (
                          <CheckedIcon width={24} height={24} />
                        ) : (
                          <>
                            <UnCheckedInactiveIcon
                              iconClass="block group-hover/subcategory:hidden"
                              width={24}
                              height={24}
                            />
                            <UnCheckedHoverIcon
                              iconClass="hidden group-hover/subcategory:block"
                              width={24}
                              height={24}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {categoryID?.length > 0 && (
          <div className="mt-6">
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button label="Continue" />
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default Category
