"use client";
import { useState } from "react";
import MobileMenuBar from "@/app/components/dashboard/MobileMenuBar";
import MainMenuSideDrawer from "@/app/components/dashboard/MainMenuSideDrawer";

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {children}
      {/* <MainMenuSideDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        {menuOpen && <MobileMenuBar setMenuOpen={setMenuOpen} />}
      </MainMenuSideDrawer> */}
    </>
  );
}
export default Layout;
