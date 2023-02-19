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
  }, [])
  return (
    <>
      <main className="flex items-start px-8 xl:px-0 m-0 pb-2xl w-full relative bg-[url('/assets/pic/hero-bg.png')] bg-contain  sm:bg-right-top bg-no-repeat">
        <div className="w-full h-full">
          <div className="w-full h-full mx-auto max-w-[1158px] relative">
            <Navbar />
            <div className="font-mtn z-20 relative mt-[80px]">
              <div className="flex flex-col items-center w-full">
                <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                  MTN Partner Portal
                </h3>
                <div className="mx-auto max-w-[633px] text-[30px] sm:text-[40px] md:text-[80px] text-white text-center font-mtn-extrabold leading-[0.9] pb-5">
                  Hello partner, meet{" "}
                  <span className="text-[#FFCB03]">growth!</span>
                </div>

                <div className="text-white/70 max-w-[594px]">
                  <p className="font-mtn-extralight text-[14px] leading-[22px] sm:text-[18px] sm:leading-[28px] text-center">
                    Increase your revenue and reach millions of customers in
                    Nigeria with the MTN Partner Portal. Our range of offers and
                    services helps you grow your businesses and increase
                    performance.
                  </p>
                </div>
                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4 mt-8">
                  <Button
                    label="Partner with us"
                    className="rounded-full flex justify-between items-center px-[42px] py-2 text-black bg-mtn hover:bg-mtn-400 border-2 border-mtn"
                    noicon
                  />
                  <Button
                    label="Discover more"
                    className="rounded-full flex justify-between items-center px-[42px] py-2 bg-black/50 hover:bg-white/20 text-white border-2 border-white"
                    outline="yes"
                    outlinecolor="border-white/80"
                    noicon
                  />
                </div>
              </div>
              {/* PARTNER LOGOS */}
              <div className="pt-16 lg:pt-[200px]">
                {/* <TrustBrands /> */}
                <p className="flex justify-center text-[16px] sm:text-[20px] text-white/40 mb-4 md:mb-10">
                  Our Partners Who Love Us
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 flex md:flex justify-center sm:justify-between items-center w-full max-w-[1158px]">
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
              {/* Largest mobile phone user community
               */}
              <div className="w-full lg:max-w-[1158px]  pt-16 lg:pt-[150px] mb-20">
                <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                  The MTN Partner Experience
                </h3>
                <div className="max-w-[360px] sm:max-w-[505px] md:max-w-[685px] pb-5">
                  <p className="text-[40px] sm:text-[50px] md:text-[60px] text-white font-mtn-extrabold leading-[44px] md:leading-[54.3px] pb-5">
                    Largest mobile phone user community
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
                  <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] text-white/50 font-mtn-extralight text-[18px] leading-[24px] sm:text-[22px] sm:leading-[32px] pb-4 sm:pb-0">
                    Worry less about how to reach your customers. Reach millions
                    of people and bring life to your business goals.
                  </p>
                  <Button label="Get started" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div class="col-span-1 md:col-span-2">
                  <div class="flex flex-col items-end rounded-3xl overflow-hidden h-full bg-gradient-to-b from-[#1B1B1B] to-transparent">
                    <Image
                      src="/assets/illustrations/data-analytics-img.png"
                      alt=""
                      width={441}
                      height={382}
                      className=""
                    />
                    <div className="pl-12 pr-10 pb-6">
                      <p className="font-bold text-white text-[30px]">
                        Data analytics and insights
                      </p>
                      <p className="text-[22px] leading-[29px] text-white/60">
                        Insights into the behaviours that make up campaign
                        interactions and how those attributes impact the path to
                        conversion.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-span-1 md:col-span-3 flex flex-col space-y-20 h-full relative">
                  <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between rounded-3xl overflow-hidden h-fit bg-gradient-to-b from-[#1B1B1B] to-transparent">
                    <div className="px-10 py-8 flex items-center h-fit">
                      <div>
                        <p className="font-bold text-white text-[30px]">
                          Audience analysis
                        </p>
                        <p className="text-[21px] leading-[29px] text-white/60">
                          Get access to a 360-degree view of your audiences by
                          analysing data signals across user attributes and
                          behaviours.
                        </p>
                      </div>
                    </div>
                    <Image
                      src="/assets/illustrations/audience-analytics-img.png"
                      alt=""
                      width={257}
                      height={251}
                    />
                  </div>
                  <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between rounded-3xl overflow-hidden h-fit bg-gradient-to-b from-[#1B1B1B] to-transparent">
                    <div className="px-10 py-8 flex items-center h-fit">
                      <div>
                        <p className="font-bold text-white text-[30px]">
                          Audience analysis
                        </p>
                        <p className="text-[21px] leading-[29px] text-white/60">
                          Get access to a 360-degree view of your audiences by
                          analysing data signals across user attributes and
                          behaviours.
                        </p>
                      </div>
                    </div>
                    <Image
                      src="/assets/illustrations/campaign.png"
                      alt=""
                      width={287}
                      height={274}
                    />
                  </div>
                </div>
              </div>
              {/*  For Developers */}
              <div className="flex flex-col items-center w-full lg:max-w-[1158px]  pt-16 lg:pt-[150px] mb-20">
                <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                  For Developers
                </h3>
                <p className="text-[40px] sm:text-[50px] md:text-[60px] text-white font-mtn-extrabold leading-[44px] md:leading-[54.3px] pb-10 max-w-[687px] text-center">
                  Dynamic Sandbox environment
                </p>
                <Image
                  className=""
                  src="/assets/illustrations/sandbox.png"
                  alt=""
                  priority
                  width={969}
                  height={557.42}
                />
                <p className="max-w-[643px] md:-mt-10 text-[18px] leading-[26px] md:text-[25px] md:leading-[36px] text-white/60 text-center">
                  Developers love our sandbox environment that lets you test
                  software and run programs without affecting your platform.
                </p>
              </div>
            </div>
            {/* <div className="bg-image z-0 absolute top-0 w-screen h-full pt-20 bg-right-top overflow-hidden">
            <Image
              className="object-cover z-0 absolute top-0 w-screen bg-right-top pr-20 h-full"
              src="/assets/pic/hero.png"
              alt=""
              priority
              width={1465}
              height={1086}
            />
          </div> */}
          </div>
        </div>
      </main>
    </>
  )
}
export default LandingPage
