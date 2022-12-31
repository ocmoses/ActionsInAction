import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Seo from '../app/components/Seo'

export default function PartnerHome() {
  return (
    <>
      <Seo title="Welcome" />
      <main className="flex min-h-screen w-full">
        {/* <section className="min-h-screen bg-left-top bg-[url('/assets/pic/hero.png')] bg-cover"> */}
        <section className="min-h-screen bg-left-top bg-cover">
          <Image
            className=" -z-10"
            alt=""
            src="/assets/pic/hero.png"
            layout="fill"
            objectFit="cover"
          />
          <header className="text-yellow-300 z-10">Header</header>
          <div className="hero-section text-white z-10">Hero Section</div>
          <div className="main-body"></div>
        </section>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t"></footer>

      <style jsx>{`
        .hero {
          background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.9),
              transparent,
              transparent,
              rgba(0, 0, 0, 0.9)
            ),
            url('/assets/pic/hero.jpeg');
          background-size: 'cover';
          background-position: 'left center';
        }
        h1 {
          font-weight: 700;
        }
        p {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
