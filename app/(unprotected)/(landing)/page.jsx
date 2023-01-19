"use client"
import Navbar from "@/app/components/Navbar"
import Link from "next/link"
import HeroBanner from "./HeroBanner"
import { ArrowRightCircle } from "@/app/components/Icons"
import Image from "next/image"

function LandingPage() {
  return (
    <>
      <main className="px-0 m-0 pb-2xl w-full relative overflow-hidden">
        <div className="relative z-50">
          <Navbar type="dashboard" />
        </div>
        <div className="hero-box w-screen h-full">
          <div className=" mt-20 mx-auto font-mtn max-w-[1220px] relative z-10">
            <div className="w-full md:w-3/4 xl:w-1/2">
              <h3 className="text-mtn text-xl md:text-3xl">
                MTN Digital Partner Portal
              </h3>
              <p className="text-white text-5xl  md:text-8xl font-mtn-extrabold">
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

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                {/* {session.status === 'unauthenticated' && ( */}
                <Link
                  href="/onboarding/register"
                  className="rounded-full flex justify-between items-center bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl pl-6 pr-3 py-2"
                >
                  <span className="flex-1">Become Partner</span>
                  <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
                </Link>
                {/* )} */}
                {/* {session.status === 'authenticated' && (
                <Link
                  href="/onboarding/register/companyinfo"
                  className="rounded-full flex justify-between items-center bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl pl-6 pr-3 py-2"
                >
                  <span className="flex-1">Continue Registration</span>
                  <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
                </Link>
              )} */}
                <button className="rounded-full bg-black/50 text-white border-2 border-mtn hover:border-mtn-300 transition ease-in-out 5000 text-xl px-10 py-2">
                  Discover Program
                </button>
              </div>
            </div>

            <div className="mt-20 mb-20">
              {/* <TrustBrands /> */}
              <p className="block text-2xl text-white mb-[64px]">
                Businesses who trusted us:
              </p>
              <div className="flex justify-between items-center w-full">
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
