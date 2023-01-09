'use client'
import Image from 'next/image'
import NavbarProfile from '@/app/components/NavbarProfile'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { useSelectedLayoutSegments } from 'next/navigation'
import { profileMenu } from '@/app/modules/constants'
import { updateMenu } from '@/app/modules/constants'
import ProfileTabItem from '@/app/components/ProfileTabItem'
import UserAvartar from '@/app/components/UserAvartar'
import { useSession } from 'next-auth/react'
import { TailSpinPreloader } from '@/app/components/Icons'

export default function Layout({ children }) {
  const { form } = useOnboardingContext()
  const segments = useSelectedLayoutSegments()
  const currentPath = segments?.reverse()[0]
  // console.log("currentPath", currentPath)

  const { loading, status } = useSession()
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      )}

      {/* {status === 'authenticated' && ( */}
      <div className="flex flex-col h-screen w-screen bg-[#212121]">
        <div className="mb-0  w-full">
          <NavbarProfile />
        </div>
        <div className="flex flex-grow  bg-white/50 mx-5 mb-4 h-fit overflow-x-auto scrollbar scrollbar-thumb-[#212121] scrollbar-track-[#383838] scrollbar-w-[10px] relative rounded-lg">
          <div className="flex pt-2xl w-full h-full mx-auto justify-center ">
            <div className="flex justify-center items-center h-[75vh] overflow-hidden">
              <h1 className="text-white text-2xl">Partner Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}
