"use client";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageRoutes } from "@/app/modules/menu";
import useAdmins from "@/hooks/useAdmins";
import useLogout from "@/hooks/useLogout";

export default function RouteGuard({ children }) {
  const { session } = useAdmins();
  const router = useRouter();
  const dologout = useLogout();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const path_name =
    typeof window !== "undefined" ? window.location.pathname : null;

  useEffect(() => {
    if (path_name) {
      const pathname = !path_name?.includes("/admin/login") ? path_name : "";
      setIsLoginPage(path_name?.includes("/admin/login"));
      const redirect = `${PageRoutes.adminlogin}${pathname}`;
      if (session?.status !== "authenticated") {
        if (session?.admin?.uuid) dologout.clearStore();
        if (pathname && pathname !== "/") {
          router.push(redirect);
        }
      } else {
        const path = path_name?.replace("/admin/login", "");
        router.push(path || "/admin/dashboard");
      }
    }
  }, [session, router]);
  return (
    <>
      {!path_name?.includes("/admin/login") &&
      session?.status !== "authenticated" ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <TailSpinPreloader width={72} height={72} fill="#efb703" />
        </div>
      ) : (
        children
      )}
    </>
  );
}
