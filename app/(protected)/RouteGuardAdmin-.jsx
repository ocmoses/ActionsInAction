"use client";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import { PageRoutes } from "@/app/modules/menu";
import useAdmins from "@/hooks/useAdmins";
import useLogout from "@/hooks/useLogout";

export default function RouteGuard({ children }) {
  const { session } = useAdmins();
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const dologout = useLogout();
  useEffect(() => {
    if (session) {
      if (session?.status === "unauthenticated") {
        const currentUrl = window.location.pathname;
        if (session?.user?.uuid) dologout.clearStore();
        if (currentUrl !== "/")
          router.push(`${PageRoutes.adminlogin}${currentUrl}`);
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

export default function RouteGuard({ children }) {
  const { session } = useAdmins();
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const dologout = useLogout();
  useEffect(() => {
    if (session) {
      if (session?.status === "unauthenticated") {
        const currentUrl = window.location.pathname;
        if (session?.user?.uuid) dologout.clearStore();
        if (currentUrl !== "/")
          router.push(`${PageRoutes.adminlogin}${currentUrl}`);
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