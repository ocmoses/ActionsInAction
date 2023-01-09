'use client'
import Navbar from '@/app/components/Navbar'
import { ArrowRightCircle } from '@/app/components/Icons'
import HeroBanner from './HeroBanner'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function LandingPage() {
  const session = useSession()
  return (
    <main className="px-8 m-0 w-full relative">
      <div className="relative z-50">
        <Navbar type="dashboard" />
      </div>
      <div className="hero-box h-full overflow-hidden">
        <div className="container mt-20 mx-auto font-mtn max-w-[1400px] relative z-10">
          <div className="w-full md:w-3/4 xl:w-1/2">
            <h3 className="text-mtn text-xl md:text-3xl">
              MTN Digital Partner Portal
            </h3>
            <p className="text-white text-5xl  md:text-8xl font-mtn-extrabold">
              Your business,
              <br />
              our priority!
            </p>
            <div className="mt-6 md:mt-10 text-gray-200 text-opacity-4 w-full">
              <span className="text-2xl md:text-4xl font-mtn-bold">
                Connection to customers made easier
              </span>
              <p className="font-mtn-extralight text-md md:text-xl">
                Our program offers various types of partnership designed to fit
                your business model.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              {session.status === 'unauthenticated' && (
                <Link
                  href="/onboarding/register"
                  className="rounded-full flex justify-between items-center bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl pl-6 pr-3 py-2"
                >
                  <span className="flex-1">Become Partner</span>
                  <ArrowRightCircle iconClass="w-12 h-12 ml-4" />
                </Link>
              )}
              <button className="rounded-full bg-black/50 text-white border-2 border-mtn hover:border-mtn-300 transition ease-in-out 5000 text-xl px-10 py-2">
                Discover Program
              </button>
            </div>
            <div className="mt-20">{/* <TrustBrands /> */}</div>
          </div>
        </div>
        <div className=" z-0">
          <HeroBanner />
        </div>
      </div>
    </main>
  )
}
export default LandingPage
