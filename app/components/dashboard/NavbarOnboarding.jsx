"use client"
import usePartners from "@/hooks/usePartners"
import UserPercentage from "@/app/components/UserPercentage"

export default function NavbarOnboarding({
  setTmpCat,
  setIsOnboarding,
  scrollpage,
}) {
  const { partner, category } = usePartners()

  const cancelOnboarding = () => {
    setIsOnboarding(false)
    setTmpCat(null)
    scrollpage()
  }
  return (
    <header className=" flex justify-between items-center h-[64px] px-4 pt-4 pb-2 m-0 w-screen mx-auto z-20 border-b border-b-white/20 bg-[#030303]">
      <div
        onClick={cancelOnboarding}
        className="flex justify-start items-center text-md group cursor-pointer "
      >
        <div className="flex-1 flex items-center">
          <span className="text-[#999999] group-hover:!text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
        </div>
        {category?.category_name && (
          <div className="flex gap-5 justify-start  items-center text-white px-3 py-2">
            <span className="hidden sm:flex text-[#999999] group-hover:!text-white">
              Partner category:
            </span>
            <span className="font-bold">{category?.category_name}</span>
          </div>
        )}
      </div>
      <div className="flex justify-end items-center gap-3 text-white px-3">
        <div className="flex justify-end items-center gap-1 text-white">
          {category && (
            <UserPercentage
              size={22}
              thickness={2}
              textsize={8}
              percent={partner?.sections[category?.category_uuid].percent ?? 0}
              hidelabel={true}
            />
          )}
          <span className="flex text-white text-[12px] flex-nowrap">
            {partner?.sections[category?.category_uuid].percent ?? 0}%
            <span className="hidden sm:flex"> &nbsp;completed</span>
          </span>
        </div>
        <span
          onClick={cancelOnboarding}
          className="hidden sm:flex text-[12px] px-3 py-1 border hover:border-white/50 hover:text-white/50 border-white rounded-full cursor-pointer"
        >
          Exit
          {/* Save and exit */}
        </span>
      </div>
    </header>
  )
}
