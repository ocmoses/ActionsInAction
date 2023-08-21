import Link from "next/link";
import { PageRoutes } from "@/app/modules/menu";
import Image from "next/image";
import ScrollToTop from "react-scroll-to-top";

function FooterTitleLink({ title }) {
  return (
    <p className="inline-flex text-white font-mtn-bold mb-[25px] pb-[12px] border-b-2 border-b-[#FFC30D]">
      {title}
    </p>
  );
}
function FooterTopLink({ title, link }) {
  return (
    <li>
      <Link href={link} className="text-[#7C7D7F] hover:text-white/70">
        {title}
      </Link>
    </li>
  );
}

function FooterBottomLink({ title, link }) {
  return (
    <Link target="_blank" rel="noopener noreferrer"
      href={link}
      className="text-[13px] leading-[16px] sm:text-[15px] sm:leading-[18px] text-white hover:text-white/70"
    >
      {title}
    </Link>
  );
}

export default function Footer() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 justify-between items-start gap-6 pt-6 mb-[100px] w-full">
        <div className="w-full col-span-1 sm:col-span-3 md:col-span-1 pb-6">
        <Link href={PageRoutes.home}>
          <Image
            priority
            src="/assets/pic/mtn-logo.svg"
            width={76.71}
            height={38.32}
            alt="MTN Nigeria Logo"
            className=" text-white min-w-[76px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
          />
          </Link>
        </div>
        <div className="w-full col-span-1 pb-6">
          <FooterTitleLink title="Products" />

          <ul className="flex flex-col gap-4">
            <FooterTopLink title="Identity APIs" link="javascript:;" />
            <FooterTopLink title="Customer APIs" link="javascript:;" />
            <FooterTopLink title="Messaging APIs" link="javascript:;" />
          </ul>
        </div>
        <div className="w-full col-span-1 pb-6">
          <FooterTitleLink title="Quick Access" />
          <ul className="flex flex-col gap-4">
            <FooterTopLink title="My Account" link={PageRoutes.login} />
            <FooterTopLink title="Documentation" link="javascript:;" />
            <FooterTopLink title="Support" link="javascript:;" />
            <FooterTopLink title="Insights" link="javascript:;" />
            <FooterTopLink
              title="Become a partner"
              link={PageRoutes.register}
            />
          </ul>
        </div>
        <div className="w-full col-span-1 pb-6">
          <FooterTitleLink title="About" />
          <ul className="flex flex-col gap-4">
            <FooterTopLink title="About MTN" link="javascript:;" />
            <FooterTopLink title="Community" link="javascript:;" />
            <FooterTopLink title="Contact Us" link="javascript:;" />
            <FooterTopLink 
              title="FAQ" 
              link={PageRoutes.faq}
            />
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
      </div>

      {/* Copyrights */}
      <div className="flex flex-col max-w-[850px] text-[12px] leading-[19px] text-[#A2A2A2] mb-[70px]">
        © 2022 MTN. All Rights Reserved
        <br />
        MTN(PTY) LTD is an authorised Financial Service Provider underwritten by
        GuardriskInsurance Company. FSPlicense number: 44774.
      </div>

      {/* Footer nav */}
      <div className="flex justify-between gap-4 w-full max-w-[521px] pb-20">
        <FooterBottomLink title="Contact Us" link="javascript:;" />
        <FooterBottomLink 
          title="Terms of Use" 
          link={PageRoutes.termOfUse}
        />
        <FooterBottomLink 
          title="Privacy Notice" 
          link={PageRoutes.privacyNotice}
        />
      </div>

      {/* <p className="text-[12px] absolute z-0 bottom-0 right-0 pb-3 pr-3">
      PROD: {apiURL}
      </p> */}

      <ScrollToTop
        smooth
        color="#FFCB03"
        className="flex justify-center items-center !border !border-white/40 !bg-[#111111] hover:!bg-[#313131]"
        style={{ zIndex: 11111 }}
      />
    </section>
  );
}
