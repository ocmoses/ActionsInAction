import Link from "next/link";
import { PageRoutes } from "@/app/modules/menu";
import Image from "next/image";
import ScrollToTop from "react-scroll-to-top";
import ContactUsPopUp from "@/app/components/PopUps"
import { useEffect, useState } from "react";

//function FooterTitleLink({ title }) {
//   return (
//     <p className="inline-flex text-white font-mtn-bold mb-[25px] pb-[12px] border-b-2 border-b-[#FFC30D]">
//       {title}
//     </p>
//   );
// }
// function FooterTopLink({ title, link }) {
//   return (
//     <li>
//       <Link href={link} className="text-[#7C7D7F] hover:text-white/70">
//         {title}
//       </Link>
//     </li>
//   );
// }

function FooterBottomLink({ title, link, target, openModalAction }) {
  
  return (
    <Link target={target} rel="noopener noreferrer"
      href={link}
      className="text-[13px] leading-[16px] sm:text-[15px] sm:leading-[18px] text-white hover:text-white/70"
      onClick={openModalAction}
    >
     <li> {title}</li>
    </Link>
  );
}

export default function Footer() {
  const [popContactUs, setPopContactUs] = useState(false)


const openModal = () =>{
  setPopContactUs(true)
}
const closeModal = () =>{
  setPopContactUs(false)
}




  return (
    <>
    
    {popContactUs && (
      <ContactUsPopUp closeModalAction={closeModal}>

      </ContactUsPopUp>
    )}
    
    <section className="w-screen">
        <div className="w-full min-h-[200px] border-t-1 border-white/10 ">
          <div className="px-10 py-10 items-center text-center">
            <Link href={PageRoutes.home}>
            <Image
              priority
              src="/assets/pic/mtn-logo.svg"
              width={76.71}
              height={38.32}
              alt="MTN Nigeria Logo"
              className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
            />
          </Link>

          <div className=" w-[670px]  py-5 text-center m-auto">
            <ul className="w-full flex justify-between gap-2 list-disc list-inside marker:text-mtn-600">
              <FooterBottomLink 
                title="Frequently Asked Question" 
                link={PageRoutes.faq}
                target=""
              />
              <FooterBottomLink 
                title="Contact Us"
                link="javascript:;"
                openModalAction={openModal}
                target=""
                />
              <FooterBottomLink 
                title="Terms of Use" 
                link={PageRoutes.termOfUse}
                target="_blank"
              />
              <FooterBottomLink 
                title="Privacy Policy" 
                link={PageRoutes.privacyNotice}
                target="_blank"
              />
            </ul>
        </div>

        <p>
        © 2022 MTN Nigeria Communications PLC, All rights reserved.
        </p>
          <div className="flex mx-auto items-center justify-center text-center gap-6 py-4">
            <Link target="_blank" rel="noopener noreferrer" href="https://twitter.com/MTNNG/">
              <Image
                priority
                src="/assets/illustrations/twitter.png"
                width={24}
                height={24}
                alt="Twitter"
                className="hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
              />
            </Link>
            <Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/MTNNG">
              <Image
                priority
                src="/assets/illustrations/linkedin.png"
                width={24}
                height={24}
                alt="LinkedIn"
                className="hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
              />
            </Link>
            <Link target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/MTNNG">
              <Image
                priority
                src="/assets/illustrations/youtube.png"
                width={24}
                height={24}
                alt="Youtube"
                className="hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
              />
            </Link>
        </div>

      
        </div>
      </div>







{/* Copyrights

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

      <div className="flex flex-col max-w-[850px] text-[12px] leading-[19px] text-[#A2A2A2] mb-[70px]">
        © 2022 MTN. All Rights Reserved
        <br />
        MTN(PTY) LTD is an authorised Financial Service Provider underwritten by
        GuardriskInsurance Company. FSPlicense number: 44774.
      </div>

      <div className="flex justify-between gap-4 w-full max-w-[521px] pb-20">
        <FooterBottomLink title="Contact Us" link="javascript:;" />
        <FooterBottomLink 
          title="Terms of Use" 
          link={PageRoutes.termOfUse}
        />
        <FooterBottomLink 
          title="Privacy Policy" 
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
    </>
  );
}
