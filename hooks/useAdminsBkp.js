"use client"
import { useStoreActions, useStoreState } from "easy-peasy"

export default function useAdmins() {
  const states = useStoreState((action) => action.admins)
  const actions = useStoreActions((action) => action.admins)

  const setCurrentCategory = (category, partner) => {
    const baseCategory = categories?.find(
      (c) => c.uuid === category.category_uuid
    )
    category.category_name = baseCategory.category_name
    category.category_code = baseCategory.category_code
    category.validation = baseCategory.validation
    setCategory(category)
    setValidationRules(category)
  }

  return { ...states, ...actions }
}
