import { Suspense } from 'react'
import RegisterStepCategory from './RegisterStepCategory'
import { TailSpinPreloader } from '@/app/components/HeroIcons'
import { fetchData } from '@/app/modules/fetchData'
const fetchCatgories = async () => {
  const nextedCategories = {}
  const {
    success: catSuccess,
    errors: catErrors,
    data: categories
  } = await fetchData(
    'https://amazonpartner.com.ng/amazon/public/api/v1/categories',
    { cache: 'no-store' }
  )
  if (!catSuccess)
    return {
      success: catSuccess,
      errors: catErrors,
      data: categories,
      nextedCategories
    }
  const {
    success: subcatSuccess,
    errors: subcatErrors,
    data: subcategories
  } = await fetchData(
    'https://amazonpartner.com.ng/amazon/public/api/v1/categories/sub-categories',
    { cache: 'no-store' }
  )
  if (!subcatSuccess)
    return {
      success: subcatSuccess,
      errors: subcatErrors,
      data: subcategories,
      nextedCategories
    }

  if (subcategories) {
    subcategories.map((s) => {
      s.id = 'sub-' + s.id
      if (typeof nextedCategories[s.cid] === 'undefined')
        nextedCategories[s.cid] = []
      nextedCategories[s.cid].push(s)
    })
  }
  return {
    success: true,
    errors: [],
    categories,
    subcategories,
    nextedCategories
  }
}

async function RegisterStepCategoryPage() {
  const { success, errors, categories, subcategories, nextedCategories } =
    await fetchCatgories()
  console.log('categories', categories)
  console.log('subcategories', subcategories)
  console.log('nextedCategories', nextedCategories)
  return (
    <Suspense fallback={<TailSpinPreloader />}>
      <RegisterStepCategory
        catErrors={errors}
        categories={categories}
        // subcategories={subcategories}
        nextedCategories={nextedCategories}
      />
    </Suspense>
  )
}

export default RegisterStepCategoryPage
