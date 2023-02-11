"use client"
import { TailSpinPreloader } from "@/app/components/Icons"
import useApp from "@/hooks/useApp"

export default function RouteLoader() {
  const { routeloading } = useApp()
  console.log({ routeloading })
  return (
    <>
      {routeloading && (
        <div className="fixed left-6 bottom-4 flex justify-center items-center">
          <TailSpinPreloader width={32} height={32} fill="#efb703" />
        </div>
      )}
    </>
  )
}
