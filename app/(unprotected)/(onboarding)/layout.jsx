"use client";
import Image from "next/image";
import React from "react";
import NavbarOnboarding from "@/app/components/NavbarOnboarding";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-4 w-screen">
      <div
        id="contentBody"
        className="flex flex-col justify-start col-span-4 md:col-span-3 overflow-y-auto scrollbar scrollbar-thumb-[#111111] scrollbar-track-[#212121] scrollbar-w-[10px] h-screen max-h-screen relative flex-1 px-4 md:px-6 "
      >
        <div className="mb-16">
          <NavbarOnboarding />
        </div>
        <div className="layout-center h-full px-3">{children}</div>
      </div>
      <div className="relative min-h-screen hidden md:flex">
        {/* <UserAvartar /> */}
        <Image
          className="h-full object-cover"
          src="/assets/pic/onboarding.png"
          priority
          alt=""
          width={872}
          height={1221}
        />
      </div>
    </div>
  );
}
