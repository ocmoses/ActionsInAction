import { signOut, useSession } from 'next-auth/react'
import { TailSpinPreloader } from '@/app/components/Icons'
import Link from 'next/link'

export default function UserAvartar() {
  const session = useSession()
  const intials = () => {
    const firstName =
      session.data?.user?.first_name !== 'undefined'
        ? session.data.user.first_name
        : ''
    const lastName =
      session.data?.user?.last_name !== 'undefined'
        ? session.data.user.last_name
        : ''
    return `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`
  }
  return (
    <>
      <div className="absolute top-[16px] right-[24px] z-10 flex items-center justify-between gap-3">
        {session.status === 'loading' && (
          <TailSpinPreloader width={32} height={32} />
        )}
        {session.data && (
          <div className="relative">
            <div className="flex justify-end items-center">
              <div className="flex justify-center items-center rounded-full w-[32px] h-[32px] bg-[#030303] text-white">
                <span>{intials()}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3.5}
                stroke="currentColor"
                className="w-6 h-4 text-white font-bold shadow-sm cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div className="text-right w-[120px]">
              <span
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className="cursor-pointer"
              >
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
