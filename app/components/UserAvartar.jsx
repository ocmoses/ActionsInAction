import { useSession } from "next-auth/react"
import { TailSpinPreloader } from "@/app/components/Icons"

export default function UserAvartar() {
  const session = useSession()
  // console.log('Avartar session', session)
  const intials = () => {
    const firstName = session.data?.user?.first_name[0]
    const lastName = session.data?.user?.last_name[0]
    return `${firstName}${lastName}`
  }
  return (
    <>
      <div className="absolute top-[16px] right-[24px] z-10 flex items-center justify-between gap-3">
        {session.status === "loading" && (
          <TailSpinPreloader width={32} height={32} />
        )}
        {session.data && (
          <>
            <div className="flex justify-center items-center rounded-full w-[32px] h-[32px] bg-[#030303] text-white">
              <span>{intials()}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="currentColor"
              className="w-6 h-4 text-white font-bold shadow-sm"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </>
        )}
      </div>
    </>
  )
}
