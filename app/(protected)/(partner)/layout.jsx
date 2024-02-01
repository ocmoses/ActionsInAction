"use client";
import React from 'react';
import RouteGuard from "../RouteGuard";
import { useState, useEffect } from "react";
import NavbarDashboard from "@/app/components/dashboard/NavbarDashboard";
import MenuBar from "@/app/components/dashboard/MenuBar";
import MobileMenuBar from "@/app/components/dashboard/MobileMenuBar";
import MainMenuSideDrawer from "@/app/components/dashboard/MainMenuSideDrawer";
import usePartners from "@/hooks/usePartners";
import { LicenseValidityTopAlert, LicenseRenewalForm, LicenseRenewalSuccess} from "@/app/components/dashboard/compliance/GracePeriodComponent";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import RemoteEndpoints from "@/app/modules/endpoints";
import { useStoreState } from "easy-peasy";
import PopUp from "@/app/components/PopUps";

 
function Layout({ children }) {
  let partnersData;
  if (typeof window !== 'undefined') {
    partnersData = JSON.parse(sessionStorage.getItem("partnersData"));
  } else {
    partnersData = null;
  }
  
  const { partner } = usePartners();
  const states = useStoreState((state) => state);

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [licenseValidityDaysLeft, setLicenseValidityDaysLeft] = useState(null);
  const [showLicenseValidityAlert, setShowLicenseValidityAlert] = useState(true);
  const [popUpLicenseRenewalForm, setPopUpLicenseRenewalForm] = useState(false);
  const [licenseRenewalSubmit, setLicenseRenewalSubmit] = useState(false);
  
  ////////////licenseValidityRemainder function////////////////////
  const licenseValidityRemainder = async () => {
    try {
      const licenseValidityRemainderResponse = await axios.get(
        `${RemoteEndpoints.PARTNER_LICENSE_VALIDITY_REMAINDER}${partnersData[0].uuid}`,

        {
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${states.users.token}`,
          },
        }
      );
      console.log("licenseValidityRemainderResponse", licenseValidityRemainderResponse);
      if ("license_validity_days" in licenseValidityRemainderResponse.data.data) {
        const daysLeft =licenseValidityRemainderResponse.data.data.license_validity_days;
        if (daysLeft <= 60) {
          setLicenseValidityDaysLeft(daysLeft);
        }
      }
    } catch (error) {
      console.log("The overall error", error);
    }
  };
  ////////////end licenseValidityRemainder function////////////////////
  useEffect(() => {
    licenseValidityRemainder();
    //console.log("partnersData.uuid", partnersData[0].uuid);
  }, [partner]);

  


  return (
    <>
      <RouteGuard>
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
              } hidden md:flex h-full duration-300`}
            >
              <div className="flex-1">
                <MenuBar
                  open={open}
                  openAction={() => setOpen(true)}
                  closeAction={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="h-full flex-1 relative pb-[50px] bg-[#030303] grow scrollbar scrollbar-thumb-[#030303] scrollbar-track-[#212121] scrollbar-w-[6px]">
              {licenseValidityDaysLeft != null && showLicenseValidityAlert && (
                <>
                  {popUpLicenseRenewalForm && (
                    <PopUp closePopUp={() => setPopUpLicenseRenewalForm(false)}>
                      {!licenseRenewalSubmit ? (
                        <LicenseRenewalForm
                          closePopUp={() => setPopUpLicenseRenewalForm(false)}
                          submitLicenseRenewal={() => setLicenseRenewalSubmit(true)}
                        /> 
                      ) : (
                        <LicenseRenewalSuccess
                          SuccessOk={() => setPopUpLicenseRenewalForm(false)}
                          startLicenseRenewal={() => setLicenseRenewalSubmit(false)}
                        />
                      )}
                    </PopUp>
                  )}

                  <LicenseValidityTopAlert
                    licenseValidityDaysLeft={licenseValidityDaysLeft}
                    partner={partner}
                    closeLicenseValidityAlert={() => setShowLicenseValidityAlert(false)}
                    popUpLicenseRenewalForm={() => setPopUpLicenseRenewalForm(true)}
                  />
                </>
              )}

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
