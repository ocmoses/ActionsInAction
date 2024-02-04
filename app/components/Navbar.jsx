"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavLinks from "./NavLinks";
import Button from "@/app/components/form/Button";
import useApp from "@/hooks/useApp";
import useUsers from "@/hooks/useUsers";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import ProfileIcons from "@/app/components/ProfileIcons";
import { PageRoutes } from "@/app/modules/menu";
import PopUp, { ContactUsSuccess, MobileMenu } from "@/app/components/PopUps";
import ContactUsForm from "@/app/components/contactus/ContactUsForm";

function Navbar() {
  const { session } = useUsers();
  const { setRouteloading } = useApp();
  const router = useRouter();
  const goToRegister = () => {
    setRouteloading(true);
    router.push(PageRoutes.register);
  };

  const [popUp, setPopUp] = useState(false);
  const [contactSubmit, setContactSubmit] = useState(false);
  const [popUpMobileMenu, setPopUpMobileMenu] = useState(false);

  const openPopUp = () => {
    setPopUp(true);
    setContactSubmit(false);
  };
  const closePopUp = () => {
    setPopUp(false);
  };

  const submitContact = () => {
    setContactSubmit(true);
  };

  const openMobileMenu = () => {
    setPopUpMobileMenu(true);
  };
  const closeMobileMenu = () => {
    setPopUpMobileMenu(false);
  };

  return (
    <>
      {/* //================this is the popup==============================================================================================================*/}
      {popUp && (
        <PopUp closePopUp={closePopUp}>
          {!contactSubmit ? (
            <ContactUsForm closePopUp={closePopUp} submitForm={submitContact} /> // If contactSubmit is false
          ) : (
            <ContactUsSuccess closePopUp={closePopUp} /> // If contactSubmit is true
          )}
        </PopUp>
      )}
      {/*//==============================================================================================================================*/}

      {/* //================this is the popup==============================================================================================================*/}
      {popUpMobileMenu && (
        <MobileMenu closeMobileMenu={closeMobileMenu}></MobileMenu>
      )}
      {/*//==============================================================================================================================*/}

      <div className="w-full max-w-[1158px] px-0 pt-6 pb-10 md:pt-12 md:pb-16 mx-auto z-50 relative  max-[700px]:border-b-1 max-[700px]:border-white/10 max-[700px]:pb-6">
        <div className="w-full mx-auto flex justify-between items-center max-[700px]:w-[96%]">
          <div className="flex items-center">
            <Link
              href={"./"}
              className="flex mr-20 items-center max-[400px]:mr-5"
            >
              <Image
                priority
                src="/assets/pic/mtn-logo.svg"
                width={76.71}
                height={38.32}
                alt="MTN Nigeria Logo"
                className=" text-white min-w-[76px] hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
              />
            </Link>
            <NavLinks />
          </div>
          {!session && (
            <div className="flex justify-end">
              <TailSpinPreloader width={28} height={28} fill="#efb703" />
            </div>
          )}
          {session && session.status === "authenticated" && (
            <div className="flex justify-end">
              <ProfileIcons />
            </div>
          )}
          {session && session.status === "unauthenticated" && (
            <div className="flex gap-3 max-[700px]:hidden">
              <Button onClick={goToRegister} label="Register" />
              <Link
                href="/login"
                className="rounded-full border-[1px] border-white/20 px-[30px]  text-white transition ease-in-out 5000 text-md md:text-lg lg:text-xl  py-1 lg:py-3"
              >
                Login
              </Link>
              <div className=" text-[#FFF] cursor-pointer p-2 group/help">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                {/*//===the help layer===========================================================================================================================*/}
                <div className="absolute w-[140px] min-h-[100px] ml-[-100px] mt-6 rounded-[5px] bg-[#1B1B1B] hidden group-hover/help:block animate-[slide-up-fade_1s_ease-in-out]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="19"
                    viewBox="0 0 32 19"
                    fill="none"
                    className=" absolute mt-[-15px] right-[10px]"
                  >
                    <path
                      d="M15.4851 0.785174C15.9222 0.323501 16.6945 0.309286 17.0962 0.75552L31.2674 16.4999C31.8181 17.1118 31.2813 18.0658 30.3843 18.0693L14.961 18.1307L1.1943 18.1858C0.312955 18.1894 -0.122659 17.268 0.466281 16.6461L15.4851 0.785174Z"
                      fill="#1B1B1B"
                    />
                  </svg>
                  <ul className=" flex flex-col gap-1 p-2">
                    <Link
                      href={PageRoutes.faq}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <li className="p-[10px] leading-[25px] text-white rounded-[5px] transition duration-[1s] ease-in-out hover:bg-white/10">
                        FAQ
                      </li>
                    </Link>
                    <li
                      onClick={openPopUp}
                      className="p-[10px] leading-[25px] text-white rounded-[5px] transition duration-[1s] ease-in-out hover:bg-white/10"
                    >
                      Contact Us
                    </li>
                  </ul>
                </div>
                {/*//==============================================================================================================================*/}
              </div>
            </div>
          )}

          <div
            onClick={openMobileMenu}
            className=" bg-white/10 hover:bg-white/20 rounded-[5px] p-1 hidden  max-[700px]:block cursor-pointer transition-transform ease-in-out duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 18H20M7 12H20M10 6H20"
                stroke="white"
                strokeWidth="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
