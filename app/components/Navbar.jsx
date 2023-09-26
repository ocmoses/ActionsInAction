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
import PopUp, { ContactUsSuccess,MobileMenu } from "@/app/components/PopUps";
import ContactUsForm from "@/app/components/contactus/ContactUsForm";
function Navbar() {
  const { session } = useUsers();
  const { setRouteloading } = useApp();
  const router = useRouter();
  const [popUpMobileMenu, setPopUpMobileMenu] = useState(false);

  const goToRegister = () => {
    setRouteloading(true);
    router.push(PageRoutes.register);
  };

  const [popUp, setPopUp] = useState(false);
  const [contactSubmit, setContactSubmit] = useState(false);
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
            <ContactUsForm closePopUp={closePopUp}  submitForm={submitContact}/>    // If contactSubmit is false
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
              <div className=" text-[#888888] cursor-pointer p-2 group/help">
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
                <div className="absolute w-[320px] min-h-[300px] ml-[-280px] rounded-[5px] bg-[#111111] border-1 border-white/20 hidden group-hover/help:block">
                  <div className="p-2 pt-0 flex flex-col gap-3">
                    <h2 className="text-white h-[50px]  border-b border-b-white/20 leading-[50px]">
                      Help and support
                    </h2>

                    <Link
                      href={PageRoutes.faq}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <div className="flex flex-row gap-3 justify-center w-full min-h-[120px] rounded-[5px] p-2 text-[14px]  hover:bg-white/10">
                        <div>
                          <Image
                            priority
                            src="/assets/icons/ChatCircleText.png"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div>
                          <h3 className="text-white">Frequently asked questions</h3>
                          <p>
                            If you have general questions , check out our FAQs where
                            you might find the answer you're after even quicker.
                          </p>
                        </div>
                        <div>
                          <Image
                            priority
                            src="/assets/icons/CaretRight.png"
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                    </Link>
                    <div
                      className="flex flex-row gap-3 justify-center  w-full min-h-[120px] rounded-[5px] p-2 text-[14px] hover:bg-white/10"
                      onClick={openPopUp}
                    >
                      <div>
                        <Image
                          priority
                          src="/assets/icons/EnvelopeSimple.png"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <h3 className="text-white">Contact us</h3>
                        <p>
                          Let us know what problem you are facing. We’ll be in touch
                          shortly.
                        </p>
                      </div>
                      <div>
                        <Image
                          priority
                          src="/assets/icons/CaretRight.png"
                          width={30}
                          height={30}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*//==============================================================================================================================*/}
              </div>
              <Button onClick={goToRegister} label="Register" />
              <Link
                href="/login"
                className="rounded-full text-white transition ease-in-out 5000 text-md md:text-lg lg:text-xl px-3 py-1 lg:py-3"
              >
                Login
              </Link>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
