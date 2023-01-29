import Image from "next/image"

export default function CategoryCard({
  category,
  isOpen,
  setIsOpen,
  tmpCat,
  setTmpCat,
}) {
  const selectCategory = (cat) => {
    if (tmpCat) {
      if (tmpCat.uuid === cat.uuid) {
        setTmpCat(null)
        setIsOpen(false)
      } else {
        setTmpCat(cat)
        setIsOpen(true)
      }
    } else {
      setTmpCat(cat)
      setIsOpen(true)
    }
  }
  return (
    <div
      onClick={() => selectCategory(category)}
      className="flex gap-6 w-full max-w-[406.5px] min-h-[140px] text-white px-6 py-4 bg-[#111111] block cursor-pointer hover:bg-white/10 hover:shadow-2xl rounded-md"
    >
      <div>
        <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
          {category.icon && (
            <Image src={category.icon} alt="" width={24} height={24} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-2 py-3">
        <p className="font-bold my-0">{category.category_name}</p>
        <p className="text-[#999999] my-0 text-sm">
          {category.short_description}
        </p>
      </div>
    </div>
  )
}
