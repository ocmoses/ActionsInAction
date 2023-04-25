import ScrollToTop from "react-scroll-to-top"

export default function Footer() {
  return (
    <>
      {/* Footer */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 justify-between items-start gap-6 pt-6 mb-[100px] w-full">
      <div className="w-full col-span-1 sm:col-span-3 md:col-span-1 pb-6">
        <Image
          priority
          src="/assets/pic/mtn-logo.svg"
          width={76.71}
          height={38.32}
          alt="MTN Nigeria Logo"
          className=" text-white min-w-[76px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
        />
      </div>
      <div className="w-full col-span-1 pb-6">
        <p className="inline-flex text-white font-mtn-bold mb-[25px] pb-[12px] border-b border-b-2 border-b-[#FFC30D]">
          Products
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Identity APIs
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Customer APIs
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Messaging APIs
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full col-span-1 pb-6">
        <p className="inline-flex text-white font-mtn-bold mb-[25px] pb-[12px] border-b border-b-2 border-b-[#FFC30D]">
          Quick Access
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              My Account
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Documentation
            </Link>
          </li>

          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Support
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Insights
            </Link>
          </li>
          <li>
            <Link
              href={PageRoutes.register}
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Become a partner
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full col-span-1 pb-6">
        <p className="inline-flex text-white font-mtn-bold mb-[25px] pb-[12px] border-b border-b-2 border-b-[#FFC30D]">
          About
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              About MTN
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              className="text-[#7C7D7F] hover:text-white/70"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="javascript:;"
              onClick={(e) => scrollToTop("supportsection")}
              className="text-[#7C7D7F] hover:text-white/70"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-1 w-fit sm:col-span-3 md:col-span-1 flex flex-row justify-end gap-6 pb-6 ">
        <Image
          priority
          src="/assets/illustrations/twitter.png"
          width={24}
          height={24}
          alt="Twitter"
          className="text-white min-w-[24px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
        />
        <Image
          priority
          src="/assets/illustrations/linkedin.png"
          width={24}
          height={24}
          alt="LinkedIn"
          className="text-white min-w-[24px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
        />
        <Image
          priority
          src="/assets/illustrations/youtube.png"
          width={24}
          height={24}
          alt="Youtube"
          className="text-white min-w-[24px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
        />
      </div>
    </div> */}
      {/* Copyrights */}
      <div className="flex flex-col max-w-[771px] text-[12px] leading-[19px] text-[#A2A2A2] mb-[70px]">
        © 2023 MTN Nigeria Communications PLC, All rights reserved.
      </div>
      {/* Footer nav */}
      {/* <div className="flex justify-between gap-4 w-full max-w-[521px]">
      <Link
        href="javascript:;"
        className="text-[13px] leading-[16px] sm:text-[15px] sm:leading-[18px] text-white hover:text-white/70"
      >
        Contact Us
      </Link>
      <Link
        href="javascript:;"
        className="text-[13px] leading-[16px] sm:text-[15px] sm:leading-[18px] text-white hover:text-white/70"
      >
        Copyright and Privacy
      </Link>
      <Link
        href="javascript:;"
        className="text-[13px] leading-[16px] sm:text-[15px] sm:leading-[18px] text-white hover:text-white/70"
      >
        Terms & Conditions
      </Link>
    </div> */}
      {/* <p className="text-[12px] absolute z-0 bottom-0 right-0 pb-3 pr-3">
      PROD: {apiURL}
    </p> */}
      <ScrollToTop
        smooth
        color="#FFCB03"
        className="flex justify-center items-center !border !border-white/40 !bg-[#111111] hover:!bg-[#313131]"
        style={{ zIndex: 11111 }}
      />
    </>
  )
}
