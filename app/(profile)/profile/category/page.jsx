import { Suspense } from 'react'
import RegisterStepCategory from './RegisterStepCategory'
import { TailSpinPreloader } from '@/app/components/Icons'
import { fetchData } from '@/app/modules/fetchData'
import { apiURL } from '@/app/modules/constants'

const fetchCatgories = async () => {
  const nextedCategories = {}
  const {
    success: catSuccess,
    errors: catErrors,
    data: categories
  } = await fetchData(`${apiURL}/v1/categories`, {
    next: { revalidate: 86400 }
  })
  if (!catSuccess)
    return {
      success: catSuccess,
      errors: catErrors,
      data: categories,
      nextedCategories
    }
  const Categories = []
  const Subcategories = []
  categories.map((cat) => {
    if (!cat.parent_id) {
      Categories.push(cat)
    } else {
      if (typeof nextedCategories[cat.parent_id] === 'undefined')
        nextedCategories[cat.parent_id] = []
      nextedCategories[cat.parent_id].push(cat)
    }
  })

  return {
    success: true,
    errors: [],
    categories: Categories,
    nextedCategories
  }
}

async function RegisterStepCategoryPage() {
  const { success, errors, categories, nextedCategories } =
    await fetchCatgories()

  return (
    <Suspense fallback={<TailSpinPreloader width={24} height={24} />}>
      <RegisterStepCategory
        catErrors={errors}
        categories={categories}
        nextedCategories={nextedCategories}
      />
    </Suspense>
  )
}

export default RegisterStepCategoryPage
