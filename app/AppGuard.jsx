'use client'
import { TailSpinPreloader } from '@/app/components/Icons'
import { useStoreState } from 'easy-peasy'

export default function AppGuard({ children }) {
  const session = useStoreState((state) => state.users.session)
  console.log({ session })
  //   useEffect(() => {
  //     const session = useStoreState((state) => state.users.session)
  //     console.log({ session })
  //   }, [session])
  // const session = { status: 'authenticated' }
  return (
    <>
      {!session || session?.status !== 'authenticated' ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      ) : (
        children
      )}
    </>
  )
}
