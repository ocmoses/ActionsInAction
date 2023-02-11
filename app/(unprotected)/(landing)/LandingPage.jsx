"use client"
import Navbar from "@/app/components/Navbar"
import Button from "@/app/components/form/Button"
import Image from "next/image"
import useApp from "@/hooks/useApp"
import { useEffect } from "react"

function LandingPage() {
  const { setRouteloading } = useApp()

  useEffect(() => {
    setRouteloading(false)
  })
  return (
    <>
      <main className="px-8 xl:px-0 m-0 pb-2xl w-full relative overflow-hidden">
        <div className="relative z-50">
          <Navbar />
        </div>
        <div className="hero-box w-full h-full">
          <div className=" mt-20 mx-auto font-mtn max-w-[1220px] relative z-10">
            <div className="w-full md:w-3/4 xl:w-1/2">
              <h3 className="text-mtn text-xl md:text-3xl">
                MTN Digital Partner Portal
              </h3>
              <p className="text-white text-5xl  md:text-6xl lg:text-8xl font-mtn-extrabold">
                Your business,
                <br />
                our priority!
              </p>
              <div className="mt-6 md:mt-10 text-gray-200 text-opacity-4 max-w-[516px]">
                <p className="font-mtn-extralight text-md md:text-xl">
                  Connection to customers made easier. Our program offers
                  various types of partnership designed to fit your business
                  model.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-4 mt-8">
                <Button label="Become Partner" />
                <Button
                  label="Discover program"
                  outline="yes"
                  outlinecolor="border-white/80"
                />
              </div>
            </div>

            <div className="mt-10 mb-10 md:mt-20 md:mb-20">
              {/* <TrustBrands /> */}
              <p className="block text-md md:text-2xl text-white/60 mb-4 md:mb-10">
                Businesses who trust us:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 md:flex justify-between items-center w-full">
                <Image
                  src="/assets/brand/jumia.svg"
                  width={122.67}
                  height={23}
                  alt=""
                />
                <Image
                  src="/assets/brand/Bolt.svg"
                  width={54.71}
                  height={31}
                  alt=""
                />
                <Image
                  src="/assets/brand/konga.svg"
                  width={93.03}
                  height={29}
                  alt=""
                />
                <Image
                  src="/assets/brand/seedbuilders.svg"
                  width={166.33}
                  height={35}
                  alt=""
                />
                <Image
                  src="/assets/brand/alt-school.svg"
                  width={45.88}
                  height={24.23}
                  alt=""
                />
                <Image
                  src="/assets/brand/softcom.svg"
                  width={121.76}
                  height={25}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          className="object-cover absolute top-0 w-screen"
          src="/assets/pic/hero.png"
          alt=""
          priority
          width={1465}
          height={1086}
        />
      </main>
    </>
  )
}
export default LandingPage
