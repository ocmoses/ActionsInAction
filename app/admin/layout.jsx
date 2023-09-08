"use client";
import RouteGuardAdmin from "./RouteGuardAdmin";
import { useState } from "react";
import NavbarAdminDashboard from "@/app/components/dashboard/NavbarAdminDashboard";
import AdminMenuBar from "@/app/components/dashboard/AdminMenuBar";
import MobileMenuBar from "@/app/components/dashboard/MobileMenuBar";
import MainMenuSideDrawer from "@/app/components/dashboard/MainMenuSideDrawer";
import useAdmins from "@/hooks/useAdmins";
import useApp from "@/hooks/useApp";
import GlobalErrors from "@/app/components/GlobalErrors";

function Layout({ children }) {
  const { isLoggedIn } = useAdmins();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { globalerrors } = useApp();
  console.log({ globalerrors });
  return (
    <RouteGuardAdmin>
      <div
        id="admindashboard"
        className="mx-auto flex flex-col h-full w-screen pb-[50px] bg-[#111111]"
      >
        <NavbarAdminDashboard
          open={open}
          setOpen={setOpen}
          setMenuOpen={setMenuOpen}
        />
        <div className="flex h-full">
          {isLoggedIn && (
            <div
              className={` ${
                open ? "w-[250px]" : "w-[60px] "
              } hidden md:flex h-full py-[36px] px-3 duration-300`}
            >
              <div className="flex-1">
                <AdminMenuBar open={open} />
              </div>
            </div>
          )}
          <div className="h-full flex-1 relative pb-[50px] bg-[#030303] grow scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
            <GlobalErrors />
            {children}
          </div>
        </div>
        <MainMenuSideDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
          {menuOpen && <MobileMenuBar setMenuOpen={setMenuOpen} />}
        </MainMenuSideDrawer>
      </div>
    </RouteGuardAdmin>
  );
}
export default Layout;
