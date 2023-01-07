"use client"
import Image from "next/image"
import NavbarProfile from "@/app/components/NavbarProfile"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { useSelectedLayoutSegments } from "next/navigation"
import { profileMenu } from "@/app/modules/constants"
import { updateMenu } from "@/app/modules/constants"
import ProfileTabItem from "@/app/components/ProfileTabItem"
import UserAvartar from "@/app/components/UserAvartar"

function Layout({ children }) {
  const { form } = useOnboardingContext()
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  // console.log("currentPath", currentPath)
  return (
    <div
      className={`grid ${
        currentPath === "review" ? "grid-cols-6" : "grid-cols-5"
      } w-screen`}
    >
      <div
        className={`flex flex-col  ${
          currentPath === "review"
            ? "col-span-6 md:col-span-5"
            : "col-span-5 md:col-span-4"
        }  overflow-x-auto scrollbar scrollbar-thumb-[#212121] scrollbar-track-[#383838] scrollbar-w-[10px] h-screen max-h-screen relative flex-1 px-4 md:px-6`}
      >
        <div className="mb-16  w-full">
          <NavbarProfile />
        </div>
        <div className="flex h-full pt-2xl w-full mx-auto justify-center ">
          {/* Steps menu */}
          <div className="hidden sm:flex mr-[64px]">
            {form && profileMenu.includes(form) && (
              <div className="flex justify-start flex-col items-end">
                {profileMenu.map((menu) => (
                  <ProfileTabItem key={menu} menu={menu} form={form} />
                ))}
              </div>
            )}
            {form && updateMenu.includes(form) && (
              <div className="flex justify-start flex-col items-end">
                {updateMenu.map((menu) => (
                  <ProfileTabItem key={menu} menu={menu} form={form} />
                ))}
              </div>
            )}
          </div>
          {/* End Steps menu */}
          <div className="flex">
            <div className="flex gap-[24px]">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative min-h-screen hidden md:flex">
        <UserAvartar />
        <Image
          className="h-full object-cover"
          src="/assets/pic/onboarding.png"
          priority
          alt=""
          width={872}
          height={1221}
        />
      </div>
    </div>
  )
}

export default Layout
