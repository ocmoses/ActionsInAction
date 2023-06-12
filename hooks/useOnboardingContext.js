"use client"
import { useEffect, createContext, useContext } from "react"
import { apiURL } from "@/app/modules/constants"
import { fetchData } from "@/app/modules/fetchData"

const OnboardingContext = createContext()

export function OnboardingContextProvider({ children }) {
  const setIsFetching = (key, status) => {
    setFetching((oldState) => {
      if (status === true) return { ...oldState, [key]: true }
      delete oldState[key]
      return oldState
    })
  }
  const fetchCatgories = async () => {
    setIsFetching("category", true)
    const nextedCategories = {}
    const {
      success,
      error,
      data: categories,
    } = await fetchData(`${apiURL}/v1/categories`, {
      next: { revalidate: 86400 },
    })
    if (!success)
      setCategories({
        success: false,
        error,
        categories: [],
        allCategories: [],
        nextedCategories: {},
      })
    const Categories = []
    const allCategories = {}

    categories?.length > 0 &&
      categories.map((cat) => {
        allCategories[cat.id] = cat
        if (!cat.parent_id) {
          Categories.push(cat)
        } else {
          if (typeof nextedCategories[cat.parent_id] === "undefined")
            nextedCategories[cat.parent_id] = []
          nextedCategories[cat.parent_id].push(cat)
        }
      })
    setCategories({
      success: true,
      error: null,
      categories: Categories,
      allcategories: allCategories,
      nextedCategories,
    })
    setIsFetching("category", false)
  }
  useEffect(() => {
    fetchCatgories()
  }, [])

  return (
    <OnboardingContext.Provider value={{}}>
      {children}
    </OnboardingContext.Provider>
  )
}
export const useOnboardingContext = () => useContext(OnboardingContext)
