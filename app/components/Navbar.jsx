"use client";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Button from "@/app/components/form/Button";
import useApp from "@/hooks/useApp";
import useUsers from "@/hooks/useUsers";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import ProfileIcons from "@/app/components/ProfileIcons";
import { PageRoutes } from "@/app/modules/menu";

function Navbar() {
  const { session } = useUsers();
  const { setRouteloading } = useApp();
  const router = useRouter();
  const goToRegister = () => {
    setRouteloading(true);
    router.push(PageRoutes.register);
  };

  return (
    <div className="px-0 pt-6 pb-10 md:pt-12 md:pb-16 mx-auto flex justify-between items-center z-10 relative">
      <div className="flex items-center">
        <Link href={"./"} className="flex mr-20 items-center">
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
        <div className="flex gap-3">
          <Button onClick={goToRegister} label="Register" />
          <Link
            href="/login"
            className="rounded-full text-white transition ease-in-out 5000 text-md md:text-lg lg:text-xl px-3 py-1 lg:py-3"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
