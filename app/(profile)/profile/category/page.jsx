'use client'
import { useState, useEffect } from 'react'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import {
  ArrowRightCircle,
  ArrowDownCircle,
  CheckedIcon,
  UnCheckedHoverIcon,
  UnCheckedInactiveIcon,
  TailSpinPreloader,
  ExclamationTriangle
} from '@/app/components/HeroIcons'
import RegisterStepHeader from '@/app/components/RegisterStepHeader'
import { Util } from '@/utils/utility'
import Image from 'next/image'
import useFetch from '@/hooks/useFatch'
// import SelectCategoryForm from '../../../components/form/SelectCategoryForm'

function RegisterStepCategory() {
  const { forms, partnerInfo, registerPartner, SetError, processing } =
    useOnboardingContext()
  const [{ data: categories, loading: catLoading, errors: catErrors }] =
    useFetch('https://amazonpartner.com.ng/amazon/public/api/v1/categories')
  const [
    { data: subcategories, loading: subcatLoading, errors: subcatErrors }
  ] = useFetch(
    'https://amazonpartner.com.ng/amazon/public/api/v1/categories/sub-categories'
  )
  const [categorySub, setCategorySub] = useState({})
  useEffect(() => {
    const cSub = {}
    if (subcategories) {
      subcategories.map((s) => {
        s.id = 'sub-' + s.id
        if (typeof cSub[s.cid] === 'undefined') cSub[s.cid] = []
        cSub[s.cid].push(s)
      })
      setCategorySub(cSub)
    }
  }, [categories, subcategories])

  const [selectedCategory, setSelectedCategory] = useState([])
  const [data, setData] = useState(partnerInfo)
  const [openedTabs, setOpenedTabs] = useState([])
  const { title, subtitle, hand, required } = forms['category']
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedCategory.length === 0)
      SetError(`You must select at least one category`)
    else registerPartner('category', data)
  }
  const selectCategory = (c) => {
    if (hasSubcategory(c)) handleToggleTabs(c)
    else toggleChecked(c)
  }
  const hasSubcategory = (c) => typeof categorySub[c] !== 'undefined'
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
    <>
      {/* <SelectCategoryForm> */}
      <div className=" h-full flex items-start w3-animate-opacity pb-20">
        <form onSubmit={handleSubmit}>
          <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />

          {(catErrors?.length || subcatErrors?.length) && (
            <div className="flex">
              <ExclamationTriangle iconClass=" w-16 h-16 mr-4 text-gray-600" />
              <div>
                {catErrors?.length && (
                  <div className="mb-6">
                    <h4 className="font-bold text-[18px] mb-3 text-red-600">
                      An Error was encountered while fetching categories
                    </h4>
                    {catErrors?.map((error) => (
                      <div className="mb-2 text-white ">{error}</div>
                    ))}
                  </div>
                )}
                {!catErrors?.length && subcatErrors?.length && (
                  <div className="">
                    <h4 className="font-bold text-[18px] mb-3 text-red-600">
                      An Error was encountered while fetching categories
                    </h4>
                    {subcatErrors?.map((error) => (
                      <div className="mb-2 text-white ">{error}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {catLoading || subcatLoading ? (
            <TailSpinPreloader width={80} height={80} fill="#efb703" />
          ) : (
            <>
              {categories.map((c) => (
                <div
                  key={c.id}
                  className={`group/category mb-6 cursor-pointer rounded-lg ${
                    openedTabs.includes(c.id) || selectedCategory.includes(c.id)
                      ? 'bg-[#212121]'
                      : 'bg-[#111111] hover:bg-[#212121]'
                  }  py-[16px] px-[24px] w-full max-w-[607px]`}
                >
                  <div className="flex flex-col gap-4 justify-start items-start">
                    <div
                      onClick={() => selectCategory(c.id)}
                      className=" flex flex-1 gap-2"
                    >
                      <div className="flex justify-center items-center min-w-[49px] h-[49px] bg-[rgba(255, 255, 255, 0.1)] group-hover/category:bg-[#030303] rounded-full">
                        <Image
                          src={'/assets/icons/gift.svg'}
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
                          Non-core services or features that are beyond the
                          standard voice calls.
                        </div>
                      </div>
                      <div>
                        {hasSubcategory(c.id) ? (
                          <ArrowDownCircle
                            iconClass={`w-10 h-10 ${
                              openedTabs.includes(c.id)
                                ? 'text-[#FFCB03]'
                                : 'text-[#333333] group-hover/category:text-[#FFCB03]'
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
                    {categorySub[c.id]?.length > 0 && (
                      <div
                        className={`${
                          openedTabs.includes(c.id) ? 'grid' : 'hidden'
                        } grid-cols-1 sm:grid-cols-2 gap-5 transform ease-in-out duration-1000`}
                      >
                        {categorySub[c.id].map((sub) => (
                          <div
                            onClick={() => selectCategory(sub.id)}
                            className="group/subcategory flex gap-2 items-between bg-[#111111] p-[16px]"
                          >
                            <div className="flex flex-1 gap-4 flex-col items-start">
                              <h2 className="justify-start text-[14px] text-white">
                                {sub.sub_category_name}
                              </h2>
                              <div className="font-[12px] justify-start text-[#999999]">
                                Non-core services or features that are beyond
                                the standard voice calls.
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
              {selectedCategory.length > 0 && (
                <>
                  {processing ? (
                    <TailSpinPreloader width={40} height={40} fill="#efb703" />
                  ) : (
                    <button
                      type="submit"
                      className="rounded-full mt-12 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2 w3-animate-opacity"
                    >
                      Continue <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </form>
      </div>
      {/* </SelectCategoryForm> */}
    </>
  )
}

export default RegisterStepCategory
