"use client";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import React, { useEffect } from "react";
import useUsers from "@/hooks/useUsers";
import useLogout from "@/hooks/useLogout";

export default function RouteGuard({ children }) {
 
  const { session } = useUsers();
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const dologout = useLogout();

  

  useEffect(() => {
      const currentUrl = window.location.pathname;
      const auth0Data = JSON.parse(sessionStorage.getItem("auth0Data"));
      
      if (auth0Data==null) {
        if (session?.user?.uuid) dologout.clearStore();
        if (currentUrl !== "/") router.push(`/login${currentUrl}`);
        
      } else {
        sessionStorage.setItem("loginResult", JSON.stringify(null));
        sessionStorage.setItem("partnerLoginOtpStatus", JSON.stringify(null));
        
        if (session) {
          if (session?.status === "unauthenticated") {
            if (session?.user?.uuid) dologout.clearStore();
            if (currentUrl !== "/") router.push(`/login${currentUrl}`);
          }
        }
      }
    
  }, [session, router]);
  return (
    <>
      {!session || session?.status !== "authenticated" ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      ) : (
        children
      )}
    </>
  );
}
