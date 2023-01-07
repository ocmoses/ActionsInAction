import { Suspense } from "react"
import Category from "./Category"
import { TailSpinPreloader } from "@/app/components/Icons"

async function CategoryPage() {
  return (
    <Suspense fallback={<TailSpinPreloader width={24} height={24} />}>
      <Category />
    </Suspense>
  )
}

export default CategoryPage
