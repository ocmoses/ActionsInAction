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
import { MobileMenu } from "@/app/components/PopUps";

function Navbar() {
  const { session } = useUsers();
  const { setRouteloading } = useApp();
  const router = useRouter();
  const [popUpMobileMenu, setPopUpMobileMenu] = useState(false);

  const goToRegister = () => {
    setRouteloading(true);
    router.push(PageRoutes.register);
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
      {popUpMobileMenu && (
        <MobileMenu closeMobileMenu={closeMobileMenu}>
        </MobileMenu>
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
                className="rounded-full text-white transition ease-in-out 5000 text-md md:text-lg lg:text-xl px-3 py-1 lg:py-3"
              >
                Login
              </Link>
            </div>
          )}

          <div onClick={openMobileMenu} className=" bg-white/10 hover:bg-white/20 rounded-[5px] p-1 hidden  max-[700px]:block cursor-pointer transition-transform ease-in-out duration-500">
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
