"use client";
import Image from "next/image";
import {NavLinksMobile} from "./NavLinks";

export default function PopUp({ closePopUp, children }) {
  return (
    <div
      id="modal_flyout"
      className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
      onClick={(e) => {
        e.target.id == "modal_flyout" && closePopUp();
      }}
    >
      <div
        id="actualModal"
        className="border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[550px]"
      >
        <div className="py-8 px-8">{children}</div>
      </div>
    </div>
  );
}





export const ContactUsSuccess = ({ closePopUp }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks, we’ll be in touch shortly
      </h2>
      <p className=" text-gray-400">
        We encourage you to sign up and explore the app while we get back to
        you. Setting up your partner portal account is free, no payment
        required.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};








export const PartnerContactUsSuccess = ({ closePopUp }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks, we’ll be in touch shortly
      </h2>
      <p className=" text-gray-400">
        We encourage you to check out our frequently asked questions to find
        answers to common issues.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};








export const MobileMenu = ({ closeMobileMenu }) => {
  return (
    <div
      id="mobile_menu_flyout"
      className="w-screen h-screen flex fixed z-50 top-0 left-0  bg-black/80 animate-[slide-left_1s_ease-in-out]"
      onClick={(e) => {
        e.target.id == "mobile_menu_flyout" && closeMobileMenu();
      }}
    >
      <div className="h-screen fixed  bg-[#000] inline-flex flex-col w-[250px] right-[0px]">
        <div className="py-5 px-5">
          <div
            onClick={closeMobileMenu}
            className=" bg-white/10 hover:bg-white/20 rounded-[5px] p-1 cursor-pointer transition-transform ease-in-out duration-500 float-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.3 5.71001C18.2075 5.61731 18.0976 5.54376 17.9766 5.49358C17.8557 5.4434 17.726 5.41757 17.595 5.41757C17.464 5.41757 17.3344 5.4434 17.2134 5.49358C17.0924 5.54376 16.9825 5.61731 16.89 5.71001L12 10.59L7.11001 5.70001C7.01743 5.60743 6.90752 5.53399 6.78655 5.48388C6.66559 5.43378 6.53594 5.40799 6.40501 5.40799C6.27408 5.40799 6.14443 5.43378 6.02347 5.48388C5.9025 5.53399 5.79259 5.60743 5.70001 5.70001C5.60743 5.79259 5.53399 5.9025 5.48388 6.02347C5.43378 6.14443 5.40799 6.27408 5.40799 6.40501C5.40799 6.53594 5.43378 6.66559 5.48388 6.78655C5.53399 6.90752 5.60743 7.01743 5.70001 7.11001L10.59 12L5.70001 16.89C5.60743 16.9826 5.53399 17.0925 5.48388 17.2135C5.43378 17.3344 5.40799 17.4641 5.40799 17.595C5.40799 17.7259 5.43378 17.8556 5.48388 17.9766C5.53399 18.0975 5.60743 18.2074 5.70001 18.3C5.79259 18.3926 5.9025 18.466 6.02347 18.5161C6.14443 18.5662 6.27408 18.592 6.40501 18.592C6.53594 18.592 6.66559 18.5662 6.78655 18.5161C6.90752 18.466 7.01743 18.3926 7.11001 18.3L12 13.41L16.89 18.3C16.9826 18.3926 17.0925 18.466 17.2135 18.5161C17.3344 18.5662 17.4641 18.592 17.595 18.592C17.7259 18.592 17.8556 18.5662 17.9766 18.5161C18.0975 18.466 18.2074 18.3926 18.3 18.3C18.3926 18.2074 18.466 18.0975 18.5161 17.9766C18.5662 17.8556 18.592 17.7259 18.592 17.595C18.592 17.4641 18.5662 17.3344 18.5161 17.2135C18.466 17.0925 18.3926 16.9826 18.3 16.89L13.41 12L18.3 7.11001C18.68 6.73001 18.68 6.09001 18.3 5.71001Z"
                fill="white"
              />
            </svg>
          </div>
          <br clear="all" />
          <ul>
            <NavLinksMobile />
          </ul>
        </div>
      </div>
    </div>
  );
};












export const BrdUpdatesSuccess = ({ closePopUp }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks, we’ll be in touch shortly
      </h2>
      <p className=" text-gray-400">
      We encourage you to sign up and explore the app while we get back to you. Setting up your partner portal account is free, no payment required.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};
