'use client'
import Image from 'next/image'
import NavbarProfile from '@/app/components/NavbarProfile'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { useEffect } from 'react'
import { RequestSuccess, RequestError } from '@/app/components/RequestResponse'
import { profileMenu } from '@/app/modules/constants'
import ProfileTabItem from '@/app/components/ProfileTabItem'

function Layout({ children }) {
  const { form, partnerInfo, requestError, requestSuccess } =
    useOnboardingContext()
  useEffect(() => {
    if (!partnerInfo.partnerid) console.log('Invalid session 1')
    else console.log(partnerInfo.partnerid)
  }, [])
  return (
    <>
      <div className="grid grid-cols-5 w-screen">
        <div className="flex flex-col col-span-5 md:col-span-4 overflow-x-auto scrollbar scrollbar-thumb-[#111111] scrollbar-track-[#212121] h-screen max-h-screen relative flex-1 px-4 md:px-6 ">
          <div className="mb-16">
            <NavbarProfile />
          </div>
          <div className="layout-center h-full mt-24">
            <div className="flex gap-[24px]">
              <div className="hidden sm:flex mr-[83px]">
                {form && profileMenu.includes(form) && (
                  <div className="flex justify-start flex-col items-end">
                    {profileMenu.map((menu) => (
                      <ProfileTabItem key={menu} menu={menu} form={form} />
                    ))}
                  </div>
                )}
              </div>
              <div>{children}</div>
            </div>
          </div>
          <RequestSuccess success={requestSuccess} />
          <RequestError errors={requestError} />
        </div>
        <div className="relative min-h-screen hidden md:flex">
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
    </>
  )
}

export default Layout
