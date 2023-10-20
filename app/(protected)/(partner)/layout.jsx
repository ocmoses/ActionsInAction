"use client";
import RouteGuard from "../RouteGuard";
import { useState, useEffect } from "react";
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard";
import MenuBar from "@/app/components/dashboard/MenuBar";
import MobileMenuBar from "@/app/components/dashboard/MobileMenuBar";
import MainMenuSideDrawer from "@/app/components/dashboard/MainMenuSideDrawer";
import { OtherServicesPopUps } from "@/app/components/PopUps";
import Iframe from "@/app/components/otherservices/iframes";

function Layout({ children }) {
  ////////////////////////////////////////////////////////////////////////
  const [servicePopUp, setServicePopUp] = useState(false);
  const [iframe, setIframe] = useState(false);
  const openServicePopUp = (iframe) => {
    setServicePopUp(true);
    setIframe(iframe);
    //alert(iframe)
  };

  const closeServicePopUp = () => {
    setServicePopUp(false);
  };

  useEffect(() => {
   // openServicePopUp("DSM");
  });

  ////////////////////////////////////////////////////////////////////////

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <RouteGuard>
      {/* //================this is the popup==============================================================================================================*/}

      {servicePopUp && (
        <>
          {iframe == "DSM" && (
            <>
              <OtherServicesPopUps closeServicePopUp={closeServicePopUp} title="DSM Service Configuration">
                <Iframe url="http://10.1.29.123" />
              </OtherServicesPopUps>
            </>
          )}
        </>
      )}

    
        <div
          id="partnerdashboard"
          className="mx-auto flex flex-col h-full w-screen pb-[50px] bg-[#111111]"
        >
          <NavbarDashboard
            open={open}
            setOpen={setOpen}
            setMenuOpen={setMenuOpen}
          />
          <div className="flex h-full">
            <div
              className={` ${
                open ? "w-[250px]" : "w-[60px] "
              } hidden md:flex h-full py-[36px] px-3 duration-300`}
            >
              <div className="flex-1">
                <MenuBar open={open} />
              </div>
            </div>
            <div className="h-full flex-1 relative pb-[50px] bg-[#030303] grow scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
              {children}
            </div>
          </div>
          <MainMenuSideDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
            {menuOpen && <MobileMenuBar setMenuOpen={setMenuOpen} />}
          </MainMenuSideDrawer>
        </div>
      </RouteGuard>
    </>
  );
}
export default Layout;
